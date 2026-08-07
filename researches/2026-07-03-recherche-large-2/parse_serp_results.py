#!/usr/bin/env python3
import json
import math
import re
import unicodedata
from pathlib import Path

from collect_google_serp import RAW_DIR, RUN_DIR, slugify, load_products, load_sheet_rows

WORKBOOK = RUN_DIR / "combined-ideas-final.xlsx"
OUT_JSON = RUN_DIR / "serp_analysis_results.json"
OUT_TSV = RUN_DIR / "serp_analysis_results.tsv"

INSTITUTIONAL_PATTERNS = [
    "amazon",
    "cdiscount",
    "manomano",
    "leroy merlin",
    "leroymerlin",
    "darty",
    "fnac",
    "decathlon",
    "but",
    "conforama",
    "ikea",
    "castorama",
    "norauto",
    "boulanger",
    "maisons du monde",
    "bricomarche",
    "bricomarché",
    "brico depot",
    "brico dépôt",
    "la redoute",
    "laredoute",
    "auchan",
    "truffaut",
    "gifi",
    "alinea",
    "alinéa",
    "carrefour",
    "e.leclerc",
    "leclerc",
    "jardiland",
    "nature & decouvertes",
    "nature et decouvertes",
    "bricorama",
    "mr bricolage",
    "weldom",
    "aliexpress",
    "rakuten",
    "ebay",
    "kaufland",
]

IGNORE_PATTERNS = [
    "google",
    "smarketer",
    "yteo",
    "channable",
    "adference",
    "producthero",
    "feed manager",
    "feed-price",
    "kelkoo",
    "klarna",
    "seo minion",
    "wikipedia",
    "support.google",
    "policies.google",
    "youtube",
]

NON_SHOP_DOMAINS = [
    "wikipedia.org",
    "support.google",
    "google.com",
    "google.fr",
    "milkdecoration.com",
]


def norm(value: str) -> str:
    value = unicodedata.normalize("NFKD", value or "").encode("ascii", "ignore").decode("ascii")
    return re.sub(r"\s+", " ", value.lower()).strip()


def clean(value: str) -> str:
    return re.sub(r"\s+", " ", (value or "").replace("\u202f", " ").replace("\xa0", " ")).strip()


def is_institutional(name: str) -> bool:
    n = norm(name)
    return any(p in n for p in INSTITUTIONAL_PATTERNS)


def is_ignored(name: str) -> bool:
    n = norm(name)
    return any(p in n for p in IGNORE_PATTERNS)


def price_to_float(value: str):
    s = clean(value)
    match = re.search(r"(\d[\d\s]*)(?:[,.](\d{1,2}))?\s*€", s)
    if not match:
        return None
    whole = re.sub(r"\s+", "", match.group(1))
    frac = match.group(2) or "0"
    return float(f"{whole}.{frac[:2]}")


def format_price(value: float) -> str:
    if value is None or math.isnan(value):
        return ""
    if abs(value - round(value)) < 0.01:
        return f"{int(round(value))} EUR"
    return f"{value:.2f} EUR"


def unique_keep_order(values):
    seen = set()
    out = []
    for value in values:
        key = norm(value)
        if not key or key in seen:
            continue
        seen.add(key)
        out.append(value)
    return out


def line_attr(line: str, key: str) -> str:
    marker = f"|{key}="
    if marker not in line:
        return ""
    part = line.split(marker, 1)[1]
    next_marker = part.find("|")
    return part if next_marker == -1 else part[:next_marker]


def parse_offer_entries(text: str, source: str):
    lines = text.splitlines()
    entries = []

    for idx, line in enumerate(lines):
        desc = line_attr(line, "desc")
        if "Vendu par" not in desc:
            continue
        merchant = clean(desc.split("Vendu par", 1)[1])
        if not merchant or is_ignored(merchant):
            continue
        block_start = max(0, idx - 24)
        for j in range(idx - 1, max(-1, idx - 28), -1):
            prev_desc = line_attr(lines[j], "desc")
            if " à chez " in prev_desc or "Vendu par" in prev_desc:
                block_start = j
                break
        window = lines[block_start:idx]
        prices = []
        title = ""
        for prev in reversed(window):
            value = line_attr(prev, "value") or line_attr(prev, "title")
            if "frais de port" in clean(value).lower():
                continue
            price = price_to_float(value)
            if price:
                prices.append(price)
            if not title:
                prev_title = line_attr(prev, "title")
                if prev_title and len(clean(prev_title)) > 12 and "filtre " not in clean(prev_title).lower():
                    title = clean(prev_title)
        price = min(prices) if prices else None
        entries.append(
            {
                "merchant": merchant,
                "price": price,
                "title": title[:180],
                "source": source,
            }
        )

    for line in lines:
        title = line_attr(line, "title")
        if "Prix actuel" not in title or "Accéder" not in title:
            continue
        price = price_to_float(title)
        if not price:
            continue
        after = re.split(r"Prix actuel\s*:\s*[\d\s\u202f,.]+ ?€\.", title, maxsplit=1)
        merchant = ""
        if len(after) == 2:
            merchant = clean(after[1].split(". Accéder", 1)[0].split(". Note", 1)[0].split(". Plus de prix", 1)[0])
        if not merchant or is_ignored(merchant):
            continue
        product_title = clean(title.split("Prix actuel", 1)[0])
        entries.append(
            {
                "merchant": merchant,
                "price": price,
                "title": product_title[:180],
                "source": source,
            }
        )

    deduped = []
    seen = set()
    for entry in entries:
        key = (norm(entry["merchant"]), round(entry["price"] or -1, 2), norm(entry["title"])[:80])
        if key in seen:
            continue
        seen.add(key)
        deduped.append(entry)
    return deduped


def parse_search_sites(text: str):
    sites = []
    for line in text.splitlines():
        desc = clean(line_attr(line, "desc"))
        if "https://" not in desc:
            continue
        lower = desc.lower()
        if any(domain in lower for domain in NON_SHOP_DOMAINS):
            continue
        match = re.search(r"https?://(?:www\.)?([^/\s›]+)", desc)
        if not match:
            continue
        domain = match.group(1).lower()
        if any(skip in domain for skip in ["google.", "gstatic.", "support.", "schema.org"]):
            continue
        label = display_from_domain(domain)
        sites.append(label)
    return unique_keep_order(sites)


def display_from_domain(domain: str) -> str:
    domain = domain.lower().strip()
    known = {
        "amazon.fr": "Amazon.fr",
        "cdiscount.com": "Cdiscount",
        "manomano.fr": "ManoMano.fr",
        "leroymerlin.fr": "Leroy Merlin",
        "but.fr": "BUT",
        "conforama.fr": "Conforama",
        "ikea.com": "IKEA",
        "castorama.fr": "Castorama",
        "laredoute.fr": "La Redoute",
        "maisonsdumonde.com": "Maisons du Monde",
        "fnac.com": "Fnac",
        "darty.com": "Darty",
        "decathlon.fr": "Decathlon",
        "boulanger.com": "Boulanger",
    }
    for needle, label in known.items():
        if needle in domain:
            return label
    return domain


def merchant_list(entries, limit=14):
    out = []
    for e in entries:
        if not e.get("merchant") or is_ignored(e["merchant"]):
            continue
        price = f" ({format_price(e['price'])})" if e.get("price") else ""
        out.append(f"{e['merchant']}{price}")
    return unique_keep_order(out)[:limit]


def choose_prices(entries, market_price):
    prices = [e["price"] for e in entries if e.get("price")]
    if not prices:
        return []
    if market_price:
        low = max(20, market_price * 0.25)
        high = market_price * 3.5
        filtered = [p for p in prices if low <= p <= high]
        if len(filtered) >= 3:
            return filtered
    return prices


def load_market_prices():
    rows = load_sheet_rows(WORKBOOK, "Produits valides")
    prices = {}
    header_seen = False
    for row_idx, values in rows:
        row = [values.get(i, "") for i in range(12)]
        if row and row[0] == "Produit":
            header_seen = True
            continue
        if header_seen and row[0] and row[10]:
            try:
                prices[row_idx] = float(row[3])
            except Exception:
                prices[row_idx] = None
    return prices


def analyze_product(product, market_price):
    search_path = RAW_DIR / f"{product['row']:02d}-{slugify(product['keyword'])}-search.txt"
    shopping_path = RAW_DIR / f"{product['row']:02d}-{slugify(product['keyword'])}-shopping.txt"
    if not search_path.exists() or not shopping_path.exists():
        return {
            **product,
            "blocked": True,
            "shopping_competitors": "SERP bloquée",
            "search_competitors": "SERP bloquée",
            "has_institutional": "SERP bloquée",
            "institutionals": "SERP bloquée",
            "non_institutionals": "SERP bloquée",
            "avg_price": "SERP bloquée",
            "price_range": "SERP bloquée",
        }

    search_text = search_path.read_text(encoding="utf-8", errors="ignore")
    shopping_text = shopping_path.read_text(encoding="utf-8", errors="ignore")
    blocked = (
        "Nos systèmes ont détecté un trafic exceptionnel" in search_text
        or "Nos systèmes ont détecté un trafic exceptionnel" in shopping_text
        or "google.com/sorry" in search_text
        or "google.com/sorry" in shopping_text
    )
    if blocked:
        return {
            **product,
            "blocked": True,
            "shopping_competitors": "SERP bloquée",
            "search_competitors": "SERP bloquée",
            "has_institutional": "SERP bloquée",
            "institutionals": "SERP bloquée",
            "non_institutionals": "SERP bloquée",
            "avg_price": "SERP bloquée",
            "price_range": "SERP bloquée",
        }

    shopping_entries = parse_offer_entries(shopping_text, "shopping")
    search_entries = parse_offer_entries(search_text, "search")
    search_sites = parse_search_sites(search_text)

    shopping_merchants = merchant_list(shopping_entries)
    search_merchants = unique_keep_order(merchant_list(search_entries, 8) + search_sites[:8])[:14]

    all_names = []
    for e in shopping_entries + search_entries:
        if e.get("merchant"):
            all_names.append(e["merchant"])
    all_names += search_sites
    all_names = [x for x in unique_keep_order(all_names) if not is_ignored(x)]

    institutionals = [x for x in all_names if is_institutional(x)]
    non_institutionals = [x for x in all_names if not is_institutional(x)]
    non_institutionals = [x for x in non_institutionals if not is_ignored(x)]

    prices = choose_prices(shopping_entries + search_entries, market_price)
    if prices:
        avg = sum(prices) / len(prices)
        avg_price = format_price(round(avg, 2))
        price_range = f"{format_price(min(prices))} - {format_price(max(prices))}"
    else:
        avg_price = "pas de prix exploitable"
        price_range = "pas de prix exploitable"

    return {
        **product,
        "blocked": False,
        "shopping_competitors": " ; ".join(shopping_merchants) if shopping_merchants else "pas de Shopping",
        "search_competitors": " ; ".join(search_merchants) if search_merchants else "pas de résultat exploitable",
        "has_institutional": "OUI" if institutionals else "NON",
        "institutionals": " ; ".join(unique_keep_order(institutionals)[:12]) if institutionals else "",
        "non_institutionals": " ; ".join(unique_keep_order(non_institutionals)[:14]) if non_institutionals else "",
        "avg_price": avg_price,
        "price_range": price_range,
    }


def main():
    products = load_products()
    market_prices = load_market_prices()
    results = [analyze_product(product, market_prices.get(product["row"])) for product in products]
    OUT_JSON.write_text(json.dumps(results, ensure_ascii=False, indent=2), encoding="utf-8")
    headers = [
        "row",
        "product",
        "keyword",
        "shopping_competitors",
        "search_competitors",
        "has_institutional",
        "institutionals",
        "non_institutionals",
        "avg_price",
        "price_range",
    ]
    with OUT_TSV.open("w", encoding="utf-8") as f:
        f.write("\t".join(headers) + "\n")
        for r in results:
            f.write("\t".join(clean(str(r.get(h, ""))) for h in headers) + "\n")
    print(json.dumps({"rows": len(results), "blocked": sum(1 for r in results if r["blocked"])}, ensure_ascii=False))


if __name__ == "__main__":
    main()
