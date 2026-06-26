#!/usr/bin/env python3
"""Create a new mono-product Shopify boutique folder from templates."""

from __future__ import annotations

import argparse
import re
import shutil
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
BOUTIQUES_DIR = ROOT / "boutiques"
TEMPLATES_DIR = ROOT / "templates"

FILES = {
    "intake.md": "new-boutique-intake.template.md",
    "research-brief.md": "research-brief-template.md",
    "brand-tokens.json": "brand-tokens-template.json",
    "sitemap.md": "sitemap-template.md",
    "shopify-build-brief.md": "shopify-build-brief-template.md",
    "qa-checklist.md": "qa-checklist-template.md",
    "project-state.md": "project-state-template.md",
    "creative-ads-brief.md": "creative-ads-brief-template.md",
    "tracking-plan.md": "tracking-plan-template.md",
}

GO_LIVE = """# Go-live Checklist

- [ ] Gate 0 validee par Hakim.
- [ ] Gate 1 validee par Hakim.
- [ ] Gate 2 validee par Hakim.
- [ ] Gate 3 validee par Hakim.
- [ ] Domaine connecte.
- [ ] Paiements actifs.
- [ ] Livraison configuree.
- [ ] Pages legales publiees.
- [ ] Contact visible.
- [ ] Produit actif et publie.
- [ ] Checkout teste.
- [ ] Tracking verifie.
- [ ] Merchant Center pret.
- [ ] CAC break-even relu.
- [ ] Aucun blocage GMC ouvert.
- [ ] Budget publicitaire valide par Hakim.
- [ ] Plan de suivi J+1/J+3/J+7 pret.
"""

SHOT_LIST = """# Shot List

| Image | Role de vente | Brief / prompt | Statut |
|---|---|---|---|
| Hero | desir + clarte | produit en contexte, benefice visible, pas de texte incruste | a produire |
| Usage | projection | scene client avant/apres usage quotidien | a produire |
| Detail produit | preuve/comprehension | gros plan utile sur materiau, mecanisme ou variante | a produire |
| Comparaison | justification | difference vs alternative standard sans denigrer | a produire |
| Reassurance | livraison/garantie | colis, support, garantie ou element de confiance reel | a produire |
"""


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
    return value or "boutique"


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
    parser = argparse.ArgumentParser(description="Create a Shopify boutique workspace.")
    parser.add_argument("name", help="Project or boutique name")
    args = parser.parse_args()

    folder = unique_path(BOUTIQUES_DIR / slugify(args.name))
    folder.mkdir(parents=True)
    (folder / "content").mkdir()
    (folder / "assets").mkdir()

    for output_name, template_name in FILES.items():
        shutil.copyfile(TEMPLATES_DIR / template_name, folder / output_name)

    (folder / "shot-list.md").write_text(SHOT_LIST, encoding="utf-8")
    (folder / "go-live-checklist.md").write_text(GO_LIVE, encoding="utf-8")

    print(folder.relative_to(ROOT))
    print("Next: confirm Gate 0 in project-state.md, fill intake.md, then produce research-brief.md.")


if __name__ == "__main__":
    main()
