#!/usr/bin/env python3
"""Create a weekly product research run workspace."""

from __future__ import annotations

import argparse
import re
import shutil
from datetime import date
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
RESEARCHES_DIR = ROOT / "researches"
TEMPLATES_DIR = ROOT / "templates"


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
    return value or "recherche"


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
    parser = argparse.ArgumentParser(description="Create a full product research run workspace.")
    parser.add_argument("theme", help="Research theme, niche, or broad direction")
    args = parser.parse_args()

    run_date = date.today().isoformat()
    folder = unique_path(RESEARCHES_DIR / f"{run_date}-{slugify(args.theme)}")
    folder.mkdir(parents=True)

    shutil.copyfile(TEMPLATES_DIR / "research-run-template.md", folder / "research-run.md")
    shutil.copyfile(TEMPLATES_DIR / "product-research-request-template.md", folder / "request.md")
    shutil.copyfile(TEMPLATES_DIR / "weekly-report-template.md", folder / "weekly-report.md")

    (folder / "google-sheet-fallback.tsv").write_text(
        "produit\tsource\tprix fournisseur livre\tfournisseur AliExpress\tURL fournisseur\tcommandes AliExpress\tnote produit AliExpress\tnotation vendeur AliExpress\tdelai livraison AliExpress\texpedie depuis Europe\tprix de vente probable\tmarge estimee\tShopping Score\tSearch Score\tBusiness Score\tscore total\tcanal recommande\tconcurrents DTC comparables\tangle marketing\tthese de differenciation\trisques\tcondition de GO\tverdict\n",
        encoding="utf-8",
    )

    print(folder.relative_to(ROOT))
    print("Next: follow docs/research-run-protocol.md, create/fill the Google Sheet, then hunt 20-50 ideas.")


if __name__ == "__main__":
    main()

