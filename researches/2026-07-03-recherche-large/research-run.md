# Research Run

## Identite

- Run : recherche large (flux broyeur)
- Date : 2026-07-03
- Responsable orchestration : Claude Code (8 sous-agents de sourcing en parallèle)
- Pays cible : FR/BE/CH/LU
- Langue : francais
- Business : SASU / OH Ventures
- Canal prioritaire : Google Shopping + Google Search
- Objectif : 50-60 idees brutes multi-plateformes, broyeur sur 100 %, Excel de controle, STOP avant Semrush

## Statut obligatoire des outils

| Outil | Statut | Preuve / limite | Impact |
|---|---|---|---|
| Google Sheet obligatoire | tente | acces Drive OK en lecture ; ajout d'onglet au Sheet natif impossible via l'outil → fallback TSV rempli (40 lignes) | report en ligne a faire |
| Kloow | non demarre | etape 5, apres validation Hakim | conforme au protocole broyeur-first |
| Semrush France | non demarre | etape 5, apres validation Hakim (seuil >= 7 000/mois) | aucun GO possible a ce stade |
| Google Trends France | non demarre | etape 5 | — |
| Google Shopping/Search | utilise (indirect) | prix marche et SERP via WebSearch/WebFetch + comparateurs (idealo, prix.net, leDenicheur) ; annonces Ads live non observables | sells_in_search omis quand non verifiable |
| AliExpress Computer Use | non demarre | etape 6, apres validation Semrush | margin_ratio absent → scores plafonnes en review (attendu) |

## Anti-doublon

- Historique consulte : runs 2026-06-25 (export Sheet local) + 2026-06-26 (6 produits scores + ~20 coupes)
- Produits exclus des briefs agents : aspirateur robot laveur, shampouineuse, nettoyeur vapeur, robot piscine, pompe a chaleur piscine, litiere chat, fontaine chat, rampe chien, deshumidificateur, walking pad, bureau assis-debout, console extensible, table relevable, armoire/miroir LED, paroi douche, colonne douche, rideau thermique, enrouleur tuyau, desherbeur, brise-vue, moustiquaire, douche solaire, videoprojecteur, serrure connectee, alarme, camera solaire, miroir LED antibuee (exemple)
- Resultat : 0 doublon dans les 40 candidats

## Sourcing multi-plateformes (etape 2)

| Plateforme | Idees livrees | Quota 5-10 | Limites principales |
|---|---:|---|---|
| Europages | 8 | OK | annonces Ads non observables |
| Cdiscount | 7 | OK | Datadome, top-ventes reconstitue via index |
| Amazon Movers | 8 | OK | amazon.fr 503, reconstitue via WebSearch |
| Dotmarket | 6 | OK | chiffres listings sous NDA |
| Flippa | 7 | OK | listings derriere login, extraits via snippets |
| Vevor | 7 | OK | catalogue accessible |
| Pinterest Trends | 8 | OK | trends.pinterest.com non fetchable, rapports Predicts utilises |
| Bigbuy | 6 | OK | bigbuy.eu 403, explore via index Google |
| Temu | 0 | volontaire | dernier recours, non necessaire (57 idees) |

Total : 57 idees brutes → 40 produits uniques apres dedoublonnage croise (10 produits multi-sources, bonus distinct_sources).

## Broyeur (etape 3)

- Commande : `python -m broyeur.run --input researches/2026-07-03-recherche-large/candidates.md --format md`
- Resultat : 40 produits → 0 shortlist / 9 review / 31 reject (sortie complete : `broyeur-results.json`)
- Lecture : sans price_source_ali (etape 6), marge = 0/25 pts pour tous → plafond ~75, decisions pessimistes par design. Aucun rejet hard filter (pre-filtres agents efficaces). Le classement est le signal.

## Top du classement (review >= 55)

| Rang | Produit | Score | Sources |
|---:|---|---:|---|
| 1 | Statue decorative XXL en resine (95-130 cm) | 69 | bigbuy |
| 2 | Voliere XXL pour perroquets | 64 | flippa + europages + cdiscount |
| 3 | Brasero plancha acier corten | 61 | flippa + europages + amazon + pinterest + bigbuy |
| 4 | Meuble bar Art Deco noir et dore | 59 | pinterest_trends |
| 5 | Aire de jeux / cabane enfant bois XXL | 58 | amazon + europages |
| 6 | Billot de boucher / ilot central bois massif | 58 | pinterest_trends |
| 7 | Borne de recharge murale 7,4 kW | 57 | dotmarket |
| 8 | Tireuse a biere a fut (kegerator) | 56 | flippa |
| 9 | Fauteuil releveur electrique 2 moteurs | 55 | bigbuy + cdiscount |

Liste complete des 40 : `ideas.xlsx` (trie par score) et `candidates.md`.

## Produits coupes

Aucun coupe par hard filter au broyeur. Coupes en amont par les agents (documentees dans `sourcing/*.md`) : pergola bioclimatique (Temu + >2000), fendeuse de buches (Leroy Merlin prix casse), sauna tonneau (>2000), spa gonflable et clim mobile (grandes enseignes), cheminee bioethanol, cave a vin (Darty/Boulanger), poulailler, table travertin et tete de lit rotin (Maisons du Monde/BUT), CBD/complements/vapotage/arbalete (categories exclues).

## Livraison finale du run

| Exigence | Statut |
|---|---|
| 50-60 idees brutes collectees | OK — 57 collectees, 40 uniques |
| Broyeur execute sur 100 % des candidats | OK — broyeur-results.json |
| Excel de controle produit | OK — ideas.xlsx |
| Google Sheet cree/rempli ou blocage declare | TENTE — fallback google-sheet-fallback.tsv rempli (40 lignes), report en ligne a faire |
| Kloow/Semrush | non demarre (etape 5, apres validation Hakim, seuil >= 7 000/mois FR) |
| AliExpress | non demarre (etape 6) |
| Decision | STOP — en attente validation Hakim sur ideas.xlsx |
