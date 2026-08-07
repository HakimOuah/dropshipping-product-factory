# Research Run

## Identite

- Run : recherche large (flux broyeur)
- Dossier : 2026-07-03-recherche-large-2
- Date : 2026-07-03
- Responsable orchestration : Codex
- Pays cible : FR/BE/CH/LU
- Langue : francais
- Business : SASU / OH Ventures
- Canal prioritaire : Google Shopping + Google Search
- Objectif : 50-60 idees brutes multi-plateformes, broyeur sur 100 %, Excel de controle, STOP avant Semrush

## Statut obligatoire des outils

| Outil | Statut | Preuve / limite | Impact |
|---|---|---|---|
| Google Sheet obligatoire | bloque apres tentative | export CSV gid=0 a retourne HTML Google "Impossible d'ouvrir le fichier"; app Google Drive/Sheets non disponible via tool_search | fallback TSV rempli; report natif reste a faire |
| Sous-agents sourcing | bloque | 4 agents lances puis timeouts longs + interruption sans final; sessions fermees | sourcing repris localement avec web |
| Kloow | non demarre | etape 5 seulement apres validation Hakim | conforme STOP etape 4 |
| Semrush France | non demarre | etape 5 seulement | aucun GO final a ce stade |
| Google Trends France | non demarre | etape 5 pour idees retenues | tendances Pinterest seulement en sourcing |
| Google Shopping/Search | utilise indirectement | prix marche via Amazon/Cdiscount/VEVOR/Europages/Flippa/Pinterest + comparables web; ads live non garanties | score canal preliminaire |
| AliExpress Computer Use | non demarre | etape 6 apres validation | price_source_ali vide; margin_ratio_missing attendu |

## Anti-doublon

- Google Sheet consulte : tentative export CSV bloquee.
- Historique local consulte : products/ existants, history-export.csv 2026-06-26, candidates/fallback/research-run 2026-07-03-recherche-large.
- Produits exclus : walking pad, mobilier transformable, salle de bain LED/douche, robots piscine/menage, litiere chat, brasero plancha, voliere XXL, sauna, serre, fauteuil releveur, wallbox, kegerator, statue XXL, luminaires design et neons deja vus, etc.

## Sourcing multi-plateformes

| Plateforme | Idees gardees |
|---|---:|
| bigbuy | 3 |
| amazon_movers | 8 |
| europages | 8 |
| vevor | 8 |
| cdiscount | 8 |
| flippa | 6 |
| pinterest_trends | 9 |
| dotmarket | 0 |
| temu | 0 |

Total : 50 idees uniques.

## Limites de sourcing

- Sous-agents multi_agent_v1 lances sur Bigbuy, Amazon Movers, Europages et Vevor; les quatre sessions sont restees running apres deux waits longs et interruption, puis ont ete fermees. Blocage delegation documente.
- Google Sheet: export CSV gid=0 tente; Google a retourne une page HTML 'Impossible d'ouvrir le fichier pour le moment'. Fallback TSV local rempli.
- Bigbuy: acces direct bigbuy.eu/fr bloque par robots.txt et beaucoup de miroirs low-ticket; 3 idees gardees seulement, compensation autorisee.
- Dotmarket: page consultee; idees physiques eligibles exposees etaient soit deja vues (luminaires/neons), soit bannies (CBD/complements), soit sous ticket (ballons silencieux). 0 candidat garde.
- Amazon Movers: pages category Amazon renvoient 503 a l'ouverture, signaux reconstruits via snippets Amazon + presse shopping.
- Temu: non utilise; total de candidats atteint sans dernier recours.

## Broyeur

- Commande : `python -m broyeur.run --input researches/2026-07-03-recherche-large-2/candidates.md --format md`
- Resultat : 50 produits -> 0 shortlist / 19 review / 31 reject.
- Hard filters au broyeur : 0.
- Lecture : sans price_source_ali, tous les candidats ont `margin_ratio_missing`; le plafond en review est attendu.

## Top classement

| Rang | Produit | Score | Source | Decision | Raison |
|---:|---|---:|---|---|---|
| 1 | Vitrine cabinet de curiosites laiton et verre | 66 | pinterest_trends | review | margin_ratio_missing |
| 2 | Bar cart laiton et verre style antique | 63 | pinterest_trends | review | margin_ratio_missing |
| 3 | Panneaux muraux opalescents holographiques Extra Celestial | 62 | pinterest_trends | review | margin_ratio_missing |
| 4 | Paravent decoratif a arches et rayures circuscore | 62 | pinterest_trends | review | margin_ratio_missing |
| 5 | Tapisserie murale Adire Afrohemian grand format | 62 | pinterest_trends | review | margin_ratio_missing |
| 6 | Tableau mural fine art grand format personnalisable | 61 | flippa | review | margin_ratio_missing |
| 7 | Cloison acoustique mobile design pour bureau maison | 60 | flippa | review | margin_ratio_missing |
| 8 | Niche chien isolee XXL design quatre saisons | 60 | flippa | review | margin_ratio_missing |
| 9 | Banc exterieur beton bois design pour terrasse | 59 | europages | review | margin_ratio_missing |
| 10 | Escalier meunier gain de place bois et metal | 59 | cdiscount | review | margin_ratio_missing |
| 11 | Groupe de recuperation fluides frigorigenes HVAC 1 HP | 59 | vevor | review | margin_ratio_missing |
| 12 | Jardiniere acier corten XXL modulable | 59 | europages | review | margin_ratio_missing |

## Livraison et STOP

| Exigence | Statut |
|---|---|
| 50-60 idees collectees | OK - 50 |
| candidates.md format broyeur | OK |
| Broyeur execute sur 100 % | OK - broyeur-results.json |
| Excel de controle | OK - ideas.xlsx |
| Google Sheet | BLOQUE - fallback TSV rempli |
| Kloow/Semrush | STOP avant etape 5 |
| AliExpress | STOP avant etape 6 |
