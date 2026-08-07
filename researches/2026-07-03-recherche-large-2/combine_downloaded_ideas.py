#!/usr/bin/env python3
from __future__ import annotations

import csv
import re
import unicodedata
import zipfile
import xml.etree.ElementTree as ET
from pathlib import Path

NS = {"a": "http://schemas.openxmlformats.org/spreadsheetml/2006/main"}
RUN_DIR = Path(__file__).resolve().parent
INPUTS = [
    (Path("/Users/Hakim/Downloads/ideas.xlsx"), "ideas.xlsx"),
    (Path("/Users/Hakim/Downloads/ideas (1).xlsx"), "ideas (1).xlsx"),
]

DUPLICATE_CANONICAL = {
    "fauteuil oeuf suspendu double en osier synthetique": "Fauteuil suspendu cocon oeuf en rotin naturel",
    "station electrique portable lifepo4 1024 wh": "Generateur solaire portable 1000W LiFePO4",
    "hamac suspendu xl avec barre et support premium": "Hamac de luxe avec support bois teck 2 places",
    "niche chien isolee xxl design quatre saisons": "Niche chien isolee thermique grande race XXL",
    "station meteo wifi pro avec anemometre et pluviometre": "Station meteo sans fil connectee pro 5 capteurs",
}


def colnum(cell: str) -> int:
    letters = "".join(ch for ch in cell if ch.isalpha())
    n = 0
    for ch in letters:
        n = n * 26 + ord(ch.upper()) - 64
    return n


def read_xlsx(path: Path) -> list[list[str]]:
    with zipfile.ZipFile(path) as zf:
        shared: list[str] = []
        if "xl/sharedStrings.xml" in zf.namelist():
            root = ET.fromstring(zf.read("xl/sharedStrings.xml"))
            for si in root.findall("a:si", NS):
                shared.append("".join(t.text or "" for t in si.findall(".//a:t", NS)))
        root = ET.fromstring(zf.read("xl/worksheets/sheet1.xml"))
    rows: list[list[str]] = []
    for row in root.findall(".//a:sheetData/a:row", NS):
        vals: dict[int, str] = {}
        for cell in row.findall("a:c", NS):
            idx = colnum(cell.attrib.get("r", "A1")) - 1
            cell_type = cell.attrib.get("t")
            v = cell.find("a:v", NS)
            inline = cell.find("a:is", NS)
            value = ""
            if cell_type == "s" and v is not None:
                value = shared[int(v.text or 0)]
            elif cell_type == "inlineStr" and inline is not None:
                value = "".join(t.text or "" for t in inline.findall(".//a:t", NS))
            elif v is not None:
                value = v.text or ""
            vals[idx] = value
        if vals:
            rows.append([vals.get(i, "") for i in range(max(vals) + 1)])
    return rows


def slug(value: str) -> str:
    value = unicodedata.normalize("NFKD", value).encode("ascii", "ignore").decode().lower()
    value = re.sub(r"[^a-z0-9]+", " ", value)
    return " ".join(value.split())


def to_bool(value: str) -> str:
    v = str(value).strip().lower()
    if v in {"1", "true", "yes", "oui"}:
        return "true"
    if v in {"0", "false", "no", "non"}:
        return "false"
    return str(value).strip()


def to_num(value: str) -> str:
    v = str(value).strip().replace(",", ".")
    if not v:
        return ""
    try:
        f = float(v)
    except ValueError:
        return str(value).strip()
    return str(int(f)) if f.is_integer() else str(f)


def extract_rows(path: Path, source_file: str) -> list[dict[str, str]]:
    rows = read_xlsx(path)
    header_idx = next(i for i, row in enumerate(rows) if row and row[0].strip().lower() == "produit")
    headers = [h.strip() for h in rows[header_idx]]
    out = []
    for row in rows[header_idx + 1 :]:
        if not row or not row[0].strip():
            continue
        rec = {headers[i]: row[i] if i < len(row) else "" for i in range(len(headers))}
        out.append(
            {
                "produit": rec.get("produit", "").strip(),
                "plateforme(s)": rec.get("plateforme(s)", "").strip(),
                "categorie": rec.get("categorie", "").strip(),
                "prix marche EUR": to_num(rec.get("prix marche EUR", "")),
                "competitors_type": rec.get("competitors_type", "").strip(),
                "sells_in_search": to_bool(rec.get("sells_in_search", "")),
                "sells_in_shopping": to_bool(rec.get("sells_in_shopping", "")),
                "legal_eu": to_bool(rec.get("legal_eu", "")),
                "defendabilite niche": rec.get("defendabilite niche", "").strip(),
                "distinct_sources": to_num(rec.get("distinct_sources", "")),
                "score broyeur": to_num(rec.get("score broyeur", "")),
                "decision": rec.get("decision", "").strip(),
                "rejete par hard filter": (rec.get("rejete par hard filter", "") or rec.get("rejete par (hard filter)", "")).strip(),
                "flags": rec.get("flags", "").strip(),
                "raison de rejet": rec.get("raison courte", "") or rec.get("raison de rejet", ""),
                "angle/notes": rec.get("angle/notes", "").strip(),
                "sources URLs": rec.get("sources URLs", "").strip(),
                "recommandation": rec.get("recommandation Hermes", "").strip(),
                "fichier source": source_file,
                "doublon retire": "",
            }
        )
    return out


def main() -> None:
    rows: list[dict[str, str]] = []
    for path, label in INPUTS:
        rows.extend(extract_rows(path, label))

    kept: list[dict[str, str]] = []
    removed: list[dict[str, str]] = []
    seen_exact: set[str] = set()
    canonical_seen: set[str] = set()
    name_to_row: dict[str, dict[str, str]] = {}

    for row in rows:
        key = slug(row["produit"])
        canonical = DUPLICATE_CANONICAL.get(key, row["produit"])
        canonical_key = slug(canonical)
        if key in seen_exact or canonical_key in canonical_seen:
            row["doublon retire"] = canonical
            removed.append(row)
            continue
        seen_exact.add(key)
        canonical_seen.add(canonical_key)
        name_to_row[canonical_key] = row
        kept.append(row)

    # If a canonical row comes after a duplicate, this dataset still keeps first occurrence.
    kept.sort(key=lambda r: (-(float(r["score broyeur"]) if r["score broyeur"] else -1), r["produit"].lower()))

    headers = [
        "produit",
        "plateforme(s)",
        "categorie",
        "prix marche EUR",
        "competitors_type",
        "sells_in_search",
        "sells_in_shopping",
        "legal_eu",
        "defendabilite niche",
        "distinct_sources",
        "score broyeur",
        "decision",
        "rejete par hard filter",
        "flags",
        "raison de rejet",
        "angle/notes",
        "sources URLs",
        "recommandation",
        "fichier source",
        "doublon retire",
    ]

    for filename, data in [("combined-ideas.tsv", kept), ("combined-duplicates-removed.tsv", removed)]:
        with (RUN_DIR / filename).open("w", newline="", encoding="utf-8") as f:
            writer = csv.DictWriter(f, fieldnames=headers, delimiter="\t")
            writer.writeheader()
            writer.writerows(data)

    print(f"input_rows={len(rows)} kept={len(kept)} removed={len(removed)}")
    for r in removed:
        print(f"removed: {r['produit']} -> {r['doublon retire']}")


if __name__ == "__main__":
    main()
