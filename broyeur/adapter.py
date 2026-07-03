"""
Adaptateur : convertit les livrables markdown des agents de sourcing en
objets Product prêts pour le broyeur.

Format markdown attendu par produit (bloc séparé par '---') :

    ## Nom du produit
    - source: flippa
    - category: garden
    - price_sell: 1000
    - price_source_ali: 250
    - competitors_type: dropshippers_weak_sites
    - sells_in_search: true
    - legal_eu: true
    - not_available_on_generic_channels: yes

Champs absents -> None (le broyeur gère et peut forcer un review).
Ce format reste lisible pour toi tout en étant parsable proprement.
"""

from __future__ import annotations
import re
from pathlib import Path
from broyeur.broyeur import Product

_BOOL = {"true": True, "false": False, "yes": True, "no": False}


def _coerce(key: str, val: str):
    val = val.strip()
    if val.lower() in _BOOL and key not in ("not_available_on_generic_channels",):
        return _BOOL[val.lower()]
    # champs numériques
    if key in ("price_sell", "price_source_ali", "net_margin_pct", "trend_spike_pct"):
        try:
            return float(val)
        except ValueError:
            return None
    if key in ("distinct_sources",):
        try:
            return int(val)
        except ValueError:
            return 1
    return val


def parse_markdown(md: str) -> list[Product]:
    products: list[Product] = []
    blocks = re.split(r"\n---+\n", md)
    for block in blocks:
        lines = [l for l in block.strip().splitlines() if l.strip()]
        if not lines:
            continue
        name = None
        fields: dict = {}
        for line in lines:
            h = re.match(r"^#+\s*(.+)$", line)
            if h:
                name = h.group(1).strip()
                continue
            kv = re.match(r"^-\s*([a-z_]+)\s*:\s*(.+)$", line, re.IGNORECASE)
            if kv:
                key = kv.group(1).strip().lower()
                fields[key] = _coerce(key, kv.group(2))
        if name:
            fields["product_name"] = name
            # ne garder que les clés connues de Product
            allowed = Product.__dataclass_fields__.keys()
            fields = {k: v for k, v in fields.items() if k in allowed}
            products.append(Product(**fields))
    return products


def parse_file(path: str | Path) -> list[Product]:
    return parse_markdown(Path(path).read_text(encoding="utf-8"))
