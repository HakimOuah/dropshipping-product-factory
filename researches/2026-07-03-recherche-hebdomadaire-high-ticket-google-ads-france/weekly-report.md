# Weekly Report — Run 2026-07-03

## Semaine

- Dates : 2026-07-03
- Feuille Google Sheet : BLOQUE — fallback google-sheet-fallback.tsv cree dans le dossier run
- Produits bruts collectes : 55
- Produits passes au broyeur : 55 (100%)
- En review (scores 55-69) : 29
- En rejet (scores < 55 ou hard filter) : 26
- En shortlist (score >= 70) : 0 (normal — price_source_ali vide, margin_ratio_missing force review)
- GO : 0 — validation Hakim requise avant Semrush
- MAYBE : 0 — idem
- NO-GO : 0 — idem

---

## Classement Top 10 — produits a valider par Hakim

| Rang | Produit | Score broyeur | Canal | Verdict broyeur | Angle |
|---:|---|---:|---|---|---|
| 1 | Sauna infrarouge 2 places en pin massif | 69 | Shopping+Search | review (margin_ratio_missing) | Wellness thermique maison — dropshippers faibles |
| 2 | Abri de piscine bas tunnel couverture alu | 69 | Shopping+Search | review (margin_ratio_missing) | Niche yes — peu de concurrents sérieux |
| 3 | Mobilier lounge exterieur resine tressee 5 pieces | 69 | Shopping+Search | review (margin_ratio_missing) | Source flippa — rentabilité prouvée |
| 4 | Fauteuil zero gravite electrique releveur | 69 | Shopping+Search | review (margin_ratio_missing) | Source flippa — senior/mobilite |
| 5 | Fauteuil de massage Shiatsu 4D electrique | 66 | Shopping+Search | review (margin_ratio_missing) | Amazon Movers — demande confirmee |
| 6 | Fauteuil suspendu cocon oeuf en rotin naturel | 64 | Shopping+Search | review (margin_ratio_missing) | Garden premium — dropshippers_weak |
| 7 | Balancelle 3 places avec store et coussins epais | 64 | Shopping+Search | review (margin_ratio_missing) | Dotmarket source + multi-sources |
| 8 | Portique gym exterieur adulte acier galvanise | 63 | Shopping+Search | review (margin_ratio_missing) | Europages + multi-sources — sport outdoor |
| 9 | Swing suspendu terrasse en macrame naturel XXL | 63 | Shopping+Search | review (margin_ratio_missing) | Pinterest signal — deco jardin tendance |
| 10 | Lit baldaquin adulte metal forge 160x200 | 62 | Shopping+Search | review (margin_ratio_missing) | Pinterest signal — chambre premium |

---

## Produits rejetes les plus evidents

| Produit | Score | Raison |
|---|---|---|
| Trottinette electrique adulte pro | 61 review | not_available_on_generic_channels: commodity — disponible Temu/Amazon/partout |
| Spa de nage mural contre-courant | 36 | Ticket 1850 EUR hors palier sweet spot (score ticket = 0), competition faible |
| Station meteo connectee | 38 | Source temu (3pts max) + semi_brands + prix 279 EUR bas |
| Trampoline 366cm | 44 | Semi_brands dominants + produit tres banalisé en France |
| Voliere perroquet africain | 42 | Shopping non confirme + niche tres etroite |
| Niche chien grande race XXL | 46 | Source temu risque + prix 259 faible |
| Jeu de flechettes electronique | 46 | Source temu + prix 299 faible |

---

## Plateformes les plus utiles ce run

| Plateforme | Nb idees | Qualite signal | Nb en review >= 60 |
|---|---|---|---|
| flippa | 6 | Excellent (business prouve — 12pts source) | 4 |
| amazon_movers | 7 | Bon (demande confirmee — 9pts) | 4 |
| dotmarket | 5 | Bon (business FR prouve — 12pts source) | 4 |
| bigbuy | 7 | Correct (catalogue EU — 6pts) | 3 |
| cdiscount | 7 | Correct (marche FR — 6pts) | 3 |
| europages | 7 | Correct (fournisseurs EU — 6pts) | 2 |
| pinterest_trends | 5 | Bon signal visuel (9pts) | 2 |
| vevor | 8 | Faible pour high-ticket sweet spot (beaucoup de rejet) | 0 |
| temu | 3 | Tres faible (risque commodity + 3pts source) | 0 |

---

## Limites rencontrees

- Google Sheet : BLOQUE — pas de navigateur. Fallback TSV cree.
- Google Trends France : non execute — Etape 5 post-validation Hakim.
- Semrush : non execute — Etape 5 post-validation Hakim.
- AliExpress : non execute — Etape 6 post-validation Hakim.
- SERP live : non crawlee en live — estimations basees sur knowledge base produits/marches France.
- Anti-doublon complet : impossible (Google Sheet inaccessible). Verification locale uniquement (aucun historique local = premier run).
- Plateformes web (BigBuy, Vevor, Flippa...) : non crawlees live. Idees basees sur connaissance catalogue plateforme.

---

## Statut des outils

| Outil | Statut ce run |
|---|---|
| Google Sheet | BLOQUE — fallback TSV cree dans le run |
| Broyeur | EXECUTE — 55/55 candidats, sortie JSON et summary dans le run |
| ideas.xlsx | CREE — colonnes completes, code couleur decision |
| Kloow / Semrush | NON DEMARRE — etape 5 apres validation Hakim |
| AliExpress | NON DEMARRE — etape 6 apres validation Hakim |

---

## Note sur les scores

Tous les produits sont en review ou reject car price_source_ali est vide (attendu a ce stade).
Le flag margin_ratio_missing force en review tous les produits qui seraient sinon shortlist (>= 70).
Les scores refletent uniquement : ticket, competition, canal, source_signal, niche_defensibility.
Apres que Hakim valide une liste, les prix AliExpress seront remplis, le broyeur relance, et les vraies shortlists emergeront.

---

## Recommandation claire pour Hakim

STATUT : A VALIDER HAKIM avant Semrush et AliExpress.

Aucun produit ne peut etre present comme GO final a ce stade. Le bon statut est "a valider Hakim avant Semrush/AliExpress".

**Action requise :**

1. Consulter ideas.xlsx (ou google-sheet-fallback.tsv) et valider/rejeter les produits en review.
2. Pour les retenus : lancer Kloow/Semrush France (Etape 5) pour valider le volume France >= 7000/mois.
3. Pour les produits passes Semrush : AliExpress Computer Use en serie pour remplir price_source_ali.
4. Relancer le broyeur avec les prix ali pour obtenir la vraie shortlist.

**Top 5 recommandes par Hermes pour validation prioritaire :**

1. Sauna infrarouge 2 places en pin massif (score 69 — wellness premium, dropshippers faibles, niche defendable)
2. Abri de piscine bas tunnel couverture alu (score 69 — niche yes, peu de concurrents serieux)
3. Fauteuil zero gravite electrique releveur (score 69 — source flippa business prouve, senior/mobilite)
4. Fauteuil de massage Shiatsu 4D electrique (score 66 — Amazon Movers = demande confirmee)
5. Mobilier lounge exterieur resine tressee 5 pieces (score 69 — source flippa + multi-sources)

**Plateforme manquante a explorer au prochain run :** Temu produit moins utile — privilegier plus de recherches flippa/dotmarket/amazon_movers.
