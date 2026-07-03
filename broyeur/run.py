"""
CLI du broyeur.

Usage :
    python -m broyeur.run --input produits.json
    python -m broyeur.run --input livrable.md --format md
    python -m broyeur.run --input produits.json --shortlist-only

Sortie : JSON sur stdout (résultats triés par score décroissant),
et récap lisible sur stderr.
"""

from __future__ import annotations
import argparse
import json
import sys
from pathlib import Path

from broyeur.broyeur import Broyeur, Product
from broyeur.adapter import parse_file


def load_json(path: Path) -> list[Product]:
    data = json.loads(path.read_text(encoding="utf-8"))
    if isinstance(data, dict):
        data = [data]
    allowed = Product.__dataclass_fields__.keys()
    out = []
    for row in data:
        out.append(Product(**{k: v for k, v in row.items() if k in allowed}))
    return out


def main():
    ap = argparse.ArgumentParser(description="DropPilot — broyeur de scoring produit")
    ap.add_argument("--input", required=True, help="fichier .json ou .md")
    ap.add_argument("--format", choices=["json", "md"], default=None)
    ap.add_argument("--shortlist-only", action="store_true")
    args = ap.parse_args()

    path = Path(args.input)
    fmt = args.format or ("md" if path.suffix.lower() in (".md", ".markdown") else "json")

    products = parse_file(path) if fmt == "md" else load_json(path)

    broyeur = Broyeur()
    results = broyeur.evaluate_batch(products)
    results.sort(key=lambda r: (r.score is not None, r.score or 0), reverse=True)

    if args.shortlist_only:
        results = [r for r in results if r.decision == "shortlist"]

    print(json.dumps([r.to_dict() for r in results], ensure_ascii=False, indent=2))

    # récap lisible sur stderr
    counts = {"shortlist": 0, "review": 0, "reject": 0}
    for r in broyeur.evaluate_batch(products):
        counts[r.decision] += 1
    print(
        f"\n[broyeur] {len(products)} produits -> "
        f"{counts['shortlist']} shortlist / {counts['review']} review / {counts['reject']} reject",
        file=sys.stderr,
    )


if __name__ == "__main__":
    main()
