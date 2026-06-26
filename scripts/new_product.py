#!/usr/bin/env python3
"""Create a new product research folder from repository templates."""

from __future__ import annotations

import argparse
import re
import shutil
from datetime import date
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
PRODUCTS_DIR = ROOT / "products"
TEMPLATES_DIR = ROOT / "templates"

FILES = {
    "raw-findings.md": "product-candidate-template.md",
    "google-demand.md": "google-demand-template.md",
    "scorecard.md": "product-scorecard-template.md",
    "suppliers.md": "supplier-analysis-template.md",
    "competitors.md": "competitor-analysis-template.md",
    "business-economics.md": "business-economics-template.md",
    "offer-brand.md": "offer-brand-brief-template.md",
    "decision-brief.md": "decision-brief-template.md",
    "project-state.md": "project-state-template.md",
}


def slugify(value: str) -> str:
    value = value.lower()
    value = (
        value.replace("é", "e")
        .replace("è", "e")
        .replace("ê", "e")
        .replace("à", "a")
        .replace("â", "a")
        .replace("ù", "u")
        .replace("û", "u")
        .replace("î", "i")
        .replace("ï", "i")
        .replace("ô", "o")
        .replace("ç", "c")
    )
    value = re.sub(r"[^a-z0-9]+", "-", value).strip("-")
    return value or "produit"


def unique_path(path: Path) -> Path:
    if not path.exists():
        return path
    counter = 2
    while True:
        candidate = path.with_name(f"{path.name}-{counter}")
        if not candidate.exists():
            return candidate
        counter += 1


def main() -> None:
    parser = argparse.ArgumentParser(description="Create a product research workspace.")
    parser.add_argument("name", help="Product name or research theme")
    args = parser.parse_args()

    folder = unique_path(PRODUCTS_DIR / f"{date.today().isoformat()}-{slugify(args.name)}")
    folder.mkdir(parents=True)

    for output_name, template_name in FILES.items():
        shutil.copyfile(TEMPLATES_DIR / template_name, folder / output_name)

    print(folder.relative_to(ROOT))
    print("Next: fill raw-findings.md, verify Google Sheet anti-duplicates, then run Google Demand.")


if __name__ == "__main__":
    main()

