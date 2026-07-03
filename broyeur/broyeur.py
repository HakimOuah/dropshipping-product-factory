"""
DropPilot — Broyeur : moteur de scoring produit.

Deux étages :
  1. hard_filters  -> rejet binaire immédiat
  2. scoring       -> total /100 sur les survivants, puis décision

Le moteur lit scoring_config.yaml (source de vérité des seuils/pondérations).
Aucune règle n'est codée en dur ici : tout vient du YAML, pour que tu puisses
ajuster les seuils sans toucher au code.
"""

from __future__ import annotations
import yaml
from dataclasses import dataclass, field
from pathlib import Path
from typing import Any

CONFIG_PATH = Path(__file__).parent / "scoring_config.yaml"


# ------------------------------------------------------------------
# Modèle produit — les champs attendus en entrée (voir README).
# Les None signalent une donnée non renseignée -> peut déclencher un
# force_review plutôt qu'un score faussement confiant.
# ------------------------------------------------------------------
@dataclass
class Product:
    product_name: str
    source: str                       # flippa, dotmarket, amazon_movers, pinterest_trends, bigbuy, europages, vevor, cdiscount, temu
    category: str                     # ex: home_decoration, garden, baby, toys, beauty...
    price_sell: float | None = None   # prix de vente marché observé (EUR)
    price_source_ali: float | None = None  # coût d'achat (AliExpress ou fournisseur)
    net_margin_pct: float | None = None    # marge nette estimée (%)
    competitors_type: str | None = None    # dropshippers_weak_sites | dropshippers_mixed | few_or_none | semi_brands | institutional
    sells_in_search: bool | None = None
    sells_in_shopping: bool | None = None
    big_retailer_same_product: bool = False
    legal_eu: bool | None = None
    not_available_on_generic_channels: str | None = None  # yes | partial | commodity
    is_seasonal: bool = False
    trend_spike_pct: float = 0.0
    entry_barrier: str | None = None   # low | medium | high
    many_big_brands: bool = False
    aliexpress_available: bool = True
    eu_supplier_required: bool = False
    distinct_sources: int = 1          # sur combien de sources distinctes le produit a été vu

    @property
    def margin_ratio(self) -> float | None:
        if self.price_sell and self.price_source_ali and self.price_source_ali > 0:
            return round(self.price_sell / self.price_source_ali, 2)
        return None


@dataclass
class Result:
    product_name: str
    decision: str                      # shortlist | review | reject
    score: int | None
    rejected_by: str | None = None     # id du hard filter si rejet direct
    breakdown: dict[str, int] = field(default_factory=dict)
    penalties: dict[str, int] = field(default_factory=dict)
    flags: list[str] = field(default_factory=list)

    def to_dict(self) -> dict[str, Any]:
        return {
            "product_name": self.product_name,
            "decision": self.decision,
            "score": self.score,
            "rejected_by": self.rejected_by,
            "breakdown": self.breakdown,
            "penalties": self.penalties,
            "flags": self.flags,
        }


class Broyeur:
    def __init__(self, config_path: Path = CONFIG_PATH):
        with open(config_path, "r", encoding="utf-8") as f:
            self.cfg = yaml.safe_load(f)

    # ---------------- étage 1 : hard filters ----------------
    def _hard_filters(self, p: Product) -> str | None:
        m = self.cfg["meta"]
        ex = self.cfg["hard_filters"]

        if p.price_sell is not None:
            # floor standard, sauf marge exceptionnelle qui abaisse le plancher
            floor = m["ticket_floor"]
            mr = p.margin_ratio
            if mr is not None and mr >= m.get("exceptional_margin_ratio", 10):
                floor = m.get("exceptional_margin_floor", 80)
            if p.price_sell < floor:
                return "ticket_too_low"
        if p.price_sell is not None and p.price_sell > m["ticket_reject_above"]:
            return "ticket_too_high"
        if p.category in ("adult", "weapons"):
            return "banned_google"
        if p.legal_eu is False:
            return "illegal_eu"

        # exclusions catégorielles — SAUF override baby/toys traité après
        excluded = {"beauty", "clothing", "jewelry", "food", "computing",
                    "workwear", "car_motorbike_generic"}
        if p.category in excluded:
            return "excluded_categories"

        if p.big_retailer_same_product:
            return "institutional_dominance"

        # override baby/toys : garde si high-ticket + marge, sinon rejet
        if p.category in ("baby", "toys"):
            mr = p.margin_ratio
            if not (p.price_sell and p.price_sell >= 400 and mr and mr >= 4):
                return "baby_toys_low_value"

        return None

    # ---------------- étage 2 : scoring ----------------
    def _score(self, p: Product) -> Result:
        b: dict[str, int] = {}
        flags: list[str] = []

        # ticket
        ps = p.price_sell or 0
        if 600 <= ps <= 900:
            b["ticket"] = 20
        elif 400 <= ps < 600:
            b["ticket"] = 15
        elif 900 < ps <= 1500:
            b["ticket"] = 13
        elif 250 <= ps < 400:
            b["ticket"] = 10
        elif 150 <= ps < 250:
            b["ticket"] = 6
        else:
            b["ticket"] = 0

        # marge
        mr = p.margin_ratio
        if mr is None:
            b["margin_ratio"] = 0
            flags.append("margin_ratio_missing")
        elif mr >= 5:
            b["margin_ratio"] = 25
        elif mr >= 4:
            b["margin_ratio"] = 20
        elif mr >= 3:
            b["margin_ratio"] = 14
        elif mr >= 2:
            b["margin_ratio"] = 6
        else:
            b["margin_ratio"] = 0
        # garde-fou marge nette
        if p.net_margin_pct is not None and p.net_margin_pct < 20:
            b["margin_ratio"] = min(b["margin_ratio"], 6)

        # concurrence
        comp_map = {
            "dropshippers_weak_sites": 20,
            "dropshippers_mixed": 14,
            "few_or_none": 10,
            "semi_brands": 6,
            "institutional": 0,
        }
        b["competition"] = comp_map.get(p.competitors_type, 0)

        # canal / GMC
        if p.sells_in_search and p.sells_in_shopping:
            b["channel"] = 15
        elif p.sells_in_search:
            b["channel"] = 12
        elif p.sells_in_shopping:
            b["channel"] = 6
        else:
            b["channel"] = 0

        # signal source
        src_map = {
            "flippa": 12, "dotmarket": 12,
            "amazon_movers": 9, "pinterest_trends": 9,
            "bigbuy": 6, "europages": 6, "vevor": 6, "cdiscount": 6,
            "temu": 3,
        }
        src_pts = src_map.get(p.source, 0)
        if p.distinct_sources >= 2:
            src_pts = min(src_pts + 4, 16)
        b["source_signal"] = src_pts

        # défendabilité niche
        nd_map = {"yes": 8, "partial": 4, "commodity": 0}
        b["niche_defensibility"] = nd_map.get(p.not_available_on_generic_channels, 0)

        # ---- malus ----
        pen: dict[str, int] = {}
        if p.is_seasonal or p.trend_spike_pct > 300:
            pen["seasonal"] = 10
        if p.entry_barrier == "low" and p.many_big_brands:
            pen["low_entry_barrier"] = 8
        if (not p.aliexpress_available) and p.eu_supplier_required:
            pen["hard_to_source"] = 6

        total = sum(b.values()) - sum(pen.values())
        total = max(0, min(100, total))

        # ---- décision ----
        if p.legal_eu is None:
            flags.append("legal_eu_unverified")

        if total >= 70:
            decision = "shortlist"
        elif total >= 55:
            decision = "review"
        else:
            decision = "reject"

        # force review si flag critique
        if decision == "shortlist" and ("legal_eu_unverified" in flags or "margin_ratio_missing" in flags):
            decision = "review"

        return Result(
            product_name=p.product_name,
            decision=decision,
            score=total,
            breakdown=b,
            penalties=pen,
            flags=flags,
        )

    # ---------------- API publique ----------------
    def evaluate(self, p: Product) -> Result:
        rejected = self._hard_filters(p)
        if rejected:
            return Result(
                product_name=p.product_name,
                decision="reject",
                score=None,
                rejected_by=rejected,
            )
        return self._score(p)

    def evaluate_batch(self, products: list[Product]) -> list[Result]:
        return [self.evaluate(p) for p in products]
