# Broyeur Summary — Run 2026-07-03

## Execution

- Commande : python3 -m broyeur.run --input researches/2026-07-03-recherche-hebdomadaire-high-ticket-google-ads-france/candidates.md --format md
- Date : 2026-07-03
- Candidats passes : 55 / 55 (100%)
- Sortie JSON : broyeur-results.json

## Recap decisions

| Decision  | Nb  | Explication |
|-----------|-----|-------------|
| shortlist | 0   | Normal : price_source_ali vide -> margin_ratio_missing force en review les scores >= 70 |
| review    | 29  | Scores 55-69 ou force_review (margin_ratio_missing / legal_eu_unverified) |
| reject    | 26  | Scores < 55 ou hard filter elimine |

## Note sur les 0 shortlist

C'est voulu. Sans price_source_ali, le flag margin_ratio_missing force automatiquement tous les produits
a score >= 70 en review (cf. broyeur/broyeur.py : force review if margin_ratio_missing).
Le broyeur applique exactement le comportement attendu decrit dans docs/research-run-protocol.md.

## Top 10 en review (scores les plus hauts)

| Rang | Produit | Score | Flags |
|------|---------|-------|-------|
| 1 | Sauna infrarouge 2 places en pin massif | 69 | margin_ratio_missing |
| 2 | Abri de piscine bas tunnel couverture alu | 69 | margin_ratio_missing |
| 3 | Mobilier lounge exterieur resine tressee 5 pieces | 69 | margin_ratio_missing |
| 4 | Fauteuil zero gravite electrique releveur | 69 | margin_ratio_missing |
| 5 | Fauteuil de massage Shiatsu 4D electrique | 66 | margin_ratio_missing |
| 6 | Fauteuil suspendu cocon oeuf en rotin naturel | 64 | margin_ratio_missing |
| 7 | Balancelle 3 places avec store et coussins epais | 64 | margin_ratio_missing |
| 8 | Portique gym exterieur adulte acier galvanise | 63 | margin_ratio_missing |
| 9 | Swing suspendu terrasse en macrame naturel XXL | 63 | margin_ratio_missing |
| 10 | Lit baldaquin adulte metal forge 160x200 | 62 | margin_ratio_missing |

## Hard filters declenches

Aucun rejet par hard filter (ticket_too_low, ticket_too_high, banned_google, illegal_eu, excluded_categories, institutional_dominance).
Tous les rejets sont dus aux scores < 55.

## Produits rejetes les plus proches du seuil (score 50-54)

- Kayak gonflable biplace : 54 (channel + competition corrects mais source europages = 6pts)
- Fumoir BBQ professionnel offset : 54 (idem)
- Cabine de douche hammam 90x90 : 53 (shopping non confirme = 12 au lieu de 15)
- Paddle gonflable 320cm : 53
- Table de billard convertible : 53

## Produits rejetes evidents (score < 45)

- Station meteo sans fil connectee (38) : source temu, competition semi_brands, niche semi-commodity
- Spa de nage mural contre-courant (36) : prix 1850 EUR rejet ticket (> 2000 exclu — ici 1850 OK mais ticket=0 car hors palier 1500)
- Trampoline 366cm (44) : semi_brands, source pinterest_trends mais produit tres banalisé
- Voliere interieure perroquet (42) : pas de shopping confirme
