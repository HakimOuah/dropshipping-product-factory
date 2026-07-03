# Research Run Protocol

Ce protocole est le point d'entree obligatoire quand Hakim demande : "lance une nouvelle recherche produit".

Depuis l'integration du broyeur, le flux est **broyeur-first** : on collecte large sur toutes les plateformes, le broyeur trie, Hakim controle la liste dans un Excel, puis Semrush valide la demande en aval. Le scoring vit dans `broyeur/scoring_config.yaml` (source de verite — ne pas modifier sans accord d'Hakim).

## Vue d'ensemble

1. Sourcing multi-plateformes → 50-60 idees (`agents/sourcing-agent.md`).
2. Broyeur → hard filters + score /100 sur 100 % des candidats.
3. Excel de controle → toutes les idees + verdicts → **validation Hakim (STOP)**.
4. Validation demande des retenus : Semrush France via Kloow (serie) + Trends + SERP.
5. Sourcing couts AliExpress (serie) → `price_source_ali` → re-broyeur → shortlist reelle (≥ 70).
6. Deep dive (concurrents, business economics) → decision briefs → **Gate 0**.

## Etape 1 — Creer le run

```bash
python3 scripts/new_research.py "theme de recherche"
```

Puis consulter l'historique Google Sheet (feuilles `recherche YYYY-MM-DD`) pour l'anti-doublon.

## Etape 2 — Sourcing multi-plateformes

Suivre `agents/sourcing-agent.md` :

- 5 a 10 idees par plateforme, compensation autorisee entre plateformes, total 50-60 ;
- pre-filtres hard appliques des la collecte (ticket, categories exclues, dominance enseigne) ;
- `price_sell` = prix marche observe (Google Shopping France) ;
- `price_source_ali` laisse vide (sourcing couts en etape 5) ;
- livrable : `researches/<run>/candidates.md` au format broyeur.

## Etape 3 — Broyeur

```bash
python -m broyeur.run --input researches/<run>/candidates.md --format md
```

Ne pas utiliser `--shortlist-only` a ce stade : sans cout fournisseur, le garde-fou `margin_ratio_missing` plafonne tout en `review` — c'est voulu. Le broyeur sert ici de filtre dur + classement. Conserver la sortie JSON dans le dossier du run.

## Etape 4 — Excel de controle (validation Hakim)

Produire `researches/<run>/ideas.xlsx` avec TOUTES les idees (y compris rejetees), colonnes :

produit · plateforme(s) · categorie · prix marche EUR · competitors_type · sells_in_search · sells_in_shopping · legal_eu · defendabilite niche · distinct_sources · score broyeur · decision · rejete par (hard filter) · flags · angle/notes.

Mettre a jour le Google Sheet obligatoire (ou remplir `google-sheet-fallback.tsv` + declarer le blocage).

**STOP : attendre la validation d'Hakim avant l'etape 5.**

## Etape 5 — Validation demande (Semrush en aval)

Pour les idees retenues par Hakim uniquement :

- Semrush France via l'application Mac Kloow (protocole ci-dessous), en serie ;
- croiser avec Google Trends France (5 ans) et la SERP/Shopping ;
- repere de volume du flux high-ticket : cluster transactionnel France ≥ 2 000-5 000 recherches/mois (cf. handoff `scoring_config.yaml`). L'ancien seuil 10 000 appartient au flux Google-first historique, pas au flux broyeur.

## Etape 6 — Sourcing couts + re-broyeur

- AliExpress via Computer Use, en serie, un produit a la fois ;
- remplir `price_source_ali` (et `net_margin_pct` si calculable) dans un `candidates-enriched.md` ;
- relancer le broyeur : la shortlist ≥ 70 devient reelle ;
- pour chaque produit shortliste : creer `products/YYYY-MM-DD-<produit>` avec `scripts/new_product.py`.

## Etape 7 — Deep dive et decision

Concurrents DTC/specialises (marketplaces en reperes), business economics SASU, theses de differenciation → `decision-brief.md` par produit → weekly report → s'arreter a **Gate 0**.

## Minimum acceptable

| Point de controle | Minimum |
|---|---|
| Idees brutes | 50-60, 5-10 par plateforme ou compensation documentee |
| Broyeur | execute sur 100 % des candidats, sortie conservee dans le run |
| Excel de controle | produit et transmis a Hakim avant toute validation Semrush |
| Google Sheet | feuille creee/remplie ou blocage explicite + fallback TSV |
| Kloow/Semrush | tente/utilise en etape 5 si acces disponible |
| AliExpress | tente en serie pour chaque produit valide par Hakim |
| Decision | decision briefs + weekly report, arret a Gate 0 |

Un run qui analyse un seul produit sans demande explicite d'Hakim est incomplet.

## Kloow / Semrush / Ahrefs

Pour Hakim, l'acces Kloow/Semrush doit etre considere comme attendu en etape 5, sauf instruction contraire ou blocage reel.

Regles :

- ouvrir l'application Mac Kloow, pas un site web Kloow dans un navigateur ;
- si l'ecran de connexion apparait, cliquer sur `Login` ;
- chercher `semrush` dans la recherche interne Kloow ;
- cliquer sur `Launch` sur la carte Semrush ;
- utiliser la fenetre `Kloow Browser` qui s'ouvre ;
- regler la base sur France ;
- relever volume, CPC, intent, KD et variations ;
- ne pas utiliser de donnees United States ;
- si Semrush est absent, indisponible, en maintenance ou bloque, retourner dans l'application Mac Kloow, chercher `ahrefs`, cliquer sur `Launch`, puis utiliser Ahrefs comme fallback France ;
- si Semrush et Ahrefs bloquent, documenter le blocage dans `research-run.md`, `google-demand.md` et le rapport final.

## Google Sheet

La feuille Google Sheet obligatoire n'est pas un nice-to-have. La livraison finale doit dire :

- feuille creee et remplie avec nom exact ;
- ou blocage d'acces explicite + fichier local de fallback.

Si aucune tentative Google Sheet n'a ete faite, le run est invalide.

## AliExpress

AliExpress est toujours serialise :

- un produit a la fois ;
- une seule fenetre/navigateur ;
- pas de sous-agents en parallele ;
- si CAPTCHA ou blocage : declarer le blocage et ne pas inventer les donnees.

## Prompt recommande pour nouvelle conversation

```text
Refere-toi au repo GitHub HakimOuah/dropshipping-product-factory ou au clone local /Users/Hakim/Documents/New project.
Lance une NOUVELLE RECHERCHE PRODUIT COMPLETE (flux broyeur), pas l'analyse d'un seul produit.
Suis docs/research-run-protocol.md : sourcing multi-plateformes (5 a 10 idees par plateforme, 50-60 au total, format broyeur), broyeur sur 100 % des candidats, Excel de controle ideas.xlsx, puis STOP — attends ma validation avant Semrush.
Ne modifie pas broyeur/scoring_config.yaml.
```
