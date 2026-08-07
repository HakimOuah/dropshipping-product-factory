# Research Run

## Identite

- Run : recherche hebdomadaire generaliste france nouvelle complete
- Date : 2026-06-26
- Responsable orchestration : Codex
- Pays cible : France
- Langue : francais
- Business : SASU / OH Ventures
- Canal prioritaire : Google Shopping + Google Search
- Objectif minimum : 20 a 50 idees brutes, 5 produits scores, 1 a 3 theses prioritaires

## Statut obligatoire des outils

| Outil | Statut | Preuve / limite | Impact |
|---|---|---|---|
| Google Sheet obligatoire | rempli | Google Sheet ouvert sous compte Hakim; onglet `Feuille 4` cree et rempli avec 5 lignes scorees; TSV local rempli en copie | livraison validee avec feuille + fallback TSV |
| Kloow | utilise | App Mac Kloow ouverte, compte Hakimohb Plan Pro, Semrush puis Ahrefs lances | protocole respecte |
| Semrush France | bloque | Semrush visible `Available`, Launch ouvre Kloow Browser puis erreur `ERR_HTTP2_PROTOCOL_ERROR` sur `semrush.com/init-seoc-session` apres reload | fallback Ahrefs applique |
| Ahrefs France | utilise | Kloow app -> recherche `ahrefs` -> Launch -> Kloow Browser `app.ahrefs.com/keywords-explorer`, base France | volumes/KD/CPC France utilises |
| Google Trends France | utilise | pytrends `geo=FR`, `today 5-y`, fichier `trends-france-finalists.json` | tendances prises en compte |
| Google Shopping/Search | utilise | SERP/Ahrefs SF et benchmarks concurrents publics; Shopping potentiel note par intent/categorie | canal qualifie, pas de capture exhaustive |
| AliExpress Computer Use | bloque | tentative en serie demarree sur `fr.aliexpress.com/w/wholesale-shampouineuse.html`; Computer Use refuse l'URL et stoppe la session | fournisseur plafonne; aucun GO autorise |

## Anti-doublon Google Sheet

- URL : https://docs.google.com/spreadsheets/d/1L-SLQrpzEIK07eBUqS1Q9C6sbl398TU8e5Xm4DK7JAU/edit?gid=1520651928#gid=1520651928
- Nom de feuille creee : Feuille 4
- Feuilles historiques consultees : `recherche 2026-06-25` via export local `researches/2026-06-26-recherche-hebdomadaire-generaliste-france/history-export.csv`
- Produits deja analyses : table console extensible; table basse relevable/extensible; bureau assis-debout; armoire miroir LED; paroi douche italienne; colonne douche thermostatique; escalier/rampe chien; miroir LED; rideau thermique; fontaine a eau chat; tapis de marche pliable/walking pad.
- Limites : Google Sheet accessible et onglet `Feuille 4` rempli; le renommage de l'onglet n'a pas ete fait pour eviter une nouvelle erreur UI; fallback TSV rempli localement.

## Idees brutes

| Produit | Source | Probleme/desir | Canal pressenti | Statut anti-doublon | Decision |
|---|---|---|---|---|---|
| Shampouineuse portable injecteur-extracteur | Ahrefs Kloow + Google Trends | Nettoyer taches canapé/tapis/siège voiture sans louer une machine | Both | Non présent dans historique local/Sheet 2026-06-25 | Shortlist |
| Robot piscine sans fil | Ahrefs Kloow + Trends | Nettoyer piscine sans câble ni effort | Shopping | Non présent dans historique local/Sheet 2026-06-25 | Shortlist |
| Litière automatique chat | Ahrefs Kloow + Trends | Réduire corvée litière et odeurs | Both | Non présent dans historique local/Sheet 2026-06-25 | Shortlist |
| Déshumidificateur d'air compact | Ahrefs Kloow + Trends | Réduire humidité, odeurs, condensation | Both | Non présent dans historique local/Sheet 2026-06-25 | Shortlist |
| Aspirateur robot laveur | Ahrefs Kloow + Trends | Automatiser aspiration + lavage sols | Shopping | Non présent dans historique local/Sheet 2026-06-25 | Shortlist |
| Nettoyeur vapeur canapé | Ahrefs Kloow | Nettoyer canapé/textile par vapeur | Both | Non présent | Coupe: doublon fonctionnel avec shampouineuse, garde comme variante |
| Enrouleur tuyau mural automatique | Ahrefs Kloow | Ranger tuyau arrosage sans noeuds | Shopping | Non présent | Coupe: volume exact 200 FR |
| Désherbeur thermique | Ahrefs Kloow | Désherber sans produits chimiques | Shopping | Non présent | Coupe: volume 2.5K, panier/marge limite |
| Pompe à chaleur piscine | Ahrefs Kloow | Chauffer piscine hors-sol | Search/Shopping | Non présent | Coupe: volume exact 1.0K, produit lourd/technique |
| Brise-vue rétractable | Ahrefs Kloow | Créer intimité balcon/terrasse | Shopping | Non présent | Coupe: volume 500 FR |
| Moustiquaire porte magnétique | Ahrefs Kloow | Protéger porte des insectes | Shopping | Non présent | Coupe: volume 200 FR, panier faible |
| Douche solaire jardin | Ahrefs Kloow | Se rincer dehors/piscine | Shopping | Non présent | Coupe: volume 80 FR |
| Vidéoprojecteur portable | Ahrefs Kloow | Cinéma maison mobile | Shopping | Non présent | Coupe: volume 2.3K exact, SAV électronique |
| Serrure connectée | Ahrefs Kloow | Accès maison sans clé | Search/Shopping | Non présent | Coupe: volume 6.5K, sécurité/responsabilité |
| Alarme maison sans fil | Ahrefs Kloow | Sécuriser logement | Search | Non présent | Coupe: volume 1.1K exact et CPC $1.60 |
| Caméra surveillance solaire | Ahrefs Kloow | Surveiller extérieur sans câble | Shopping | Non présent | Coupe: volume 800 exact, privacy/sécurité |
| Table basse relevable/extensible premium | Historique Google Sheet | Petit salon multifonction | Shopping | Déjà analysé 2026-06-25 | Coupe anti-doublon |
| Table console extensible | Historique Google Sheet | Recevoir en petit espace | Both | Déjà analysé 2026-06-25 | Coupe anti-doublon |
| Bureau assis-debout compact premium | Historique Google Sheet | Télétravail ergonomique | Both | Déjà analysé 2026-06-25 | Coupe anti-doublon |
| Armoire miroir LED salle de bain | Historique Google Sheet | Rangement + lumière salle de bain | Both | Déjà analysé 2026-06-25 | Coupe anti-doublon |
| Paroi douche italienne 8mm | Historique Google Sheet | Upgrade salle de bain | Shopping | Déjà analysé 2026-06-25 | Coupe anti-doublon |
| Colonne douche thermostatique | Historique Google Sheet | Confort douche | Both | Déjà analysé 2026-06-25 | Coupe anti-doublon |
| Escalier / rampe chien design | Historique Google Sheet | Aider chien petit/senior | Both | Déjà analysé 2026-06-25 | Coupe anti-doublon |
| Miroir LED salle de bain simple | Historique Google Sheet | Lumière/design salle de bain | Shopping | Déjà analysé 2026-06-25 | Coupe anti-doublon |
| Rideau thermique isolant premium | Historique Google Sheet | Réduire froid/bruit sans travaux | Search | Déjà analysé 2026-06-25 | Coupe anti-doublon |
| Fontaine à eau chat | Historique Google Sheet | Hydratation chat | Shopping | Déjà analysé 2026-06-25 | Coupe anti-doublon/rincé |
| Tapis de marche pliable / walking pad | Historique local products | Marcher en télétravail | Both | Déjà recherché 2026-06-26 | Coupe anti-doublon |
| Hamac sur pied pliable | Brainstorm saisonnier | Détente jardin sans arbres | Shopping | Non présent | Coupe: non validé Ahrefs, saisonnier |
| Cave à vin compacte | Brainstorm maison premium | Stocker vin en appartement | Shopping | Non présent | Coupe: non validé Ahrefs, SAV froid |
| Kit irrigation goutte-à-goutte solaire | Brainstorm jardin | Arroser automatiquement balcon/jardin | Search/Shopping | Non présent | Coupe: panier faible |
| Poubelle automatique cuisine tri | Brainstorm maison | Tri + cuisine plus propre | Shopping | Non présent | Coupe: marché basique/saturé |
| Robot lave-vitre | Brainstorm maison | Nettoyer baies vitrées sans effort | Shopping | Non présent | Coupe: risque chute/SAV, non validé Ahrefs |

## Shortlist a scorer

Minimum attendu : 5 produits, sauf si moins de 5 survivent apres exclusions documentees.

| Rang | Produit | Pourquoi il survit | Canal pressenti | Dossier produit |
|---:|---|---|---|---|
| 1 | Shampouineuse portable injecteur-extracteur | Ahrefs France >=10K sur parent/exact + intent achat/comparaison; non doublon historique | Both | `products/2026-06-26-shampouineuse-portable-injecteur-extracteur` |
| 2 | Robot piscine sans fil | Ahrefs France >=10K sur parent/exact + intent achat/comparaison; non doublon historique | Shopping | `products/2026-06-26-robot-piscine-sans-fil` |
| 3 | Litière automatique chat | Ahrefs France >=10K sur parent/exact + intent achat/comparaison; non doublon historique | Both | `products/2026-06-26-litiere-automatique-chat` |
| 4 | Déshumidificateur d'air compact | Ahrefs France >=10K sur parent/exact + intent achat/comparaison; non doublon historique | Both | `products/2026-06-26-deshumidificateur-air-compact` |
| 5 | Aspirateur robot laveur | Ahrefs France >=10K sur parent/exact + intent achat/comparaison; non doublon historique | Shopping | `products/2026-06-26-aspirateur-robot-laveur` |

## Produits coupes

| Produit | Raison de coupe | Verrou bloque |
|---|---|---|
| Nettoyeur vapeur canapé | doublon fonctionnel avec shampouineuse, garde comme variante | Anti-doublon |
| Enrouleur tuyau mural automatique | volume exact 200 FR | Demande France / risque / panier |
| Désherbeur thermique | volume 2.5K, panier/marge limite | Demande France / risque / panier |
| Pompe à chaleur piscine | volume exact 1.0K, produit lourd/technique | Demande France / risque / panier |
| Brise-vue rétractable | volume 500 FR | Demande France / risque / panier |
| Moustiquaire porte magnétique | volume 200 FR, panier faible | Demande France / risque / panier |
| Douche solaire jardin | volume 80 FR | Demande France / risque / panier |
| Vidéoprojecteur portable | volume 2.3K exact, SAV électronique | Demande France / risque / panier |
| Serrure connectée | volume 6.5K, sécurité/responsabilité | Demande France / risque / panier |
| Alarme maison sans fil | volume 1.1K exact et CPC $1.60 | Demande France / risque / panier |
| Caméra surveillance solaire | volume 800 exact, privacy/sécurité | Demande France / risque / panier |
| Table basse relevable/extensible premium | Anti-doublon | Anti-doublon |
| Table console extensible | Anti-doublon | Anti-doublon |
| Bureau assis-debout compact premium | Anti-doublon | Anti-doublon |
| Armoire miroir LED salle de bain | Anti-doublon | Anti-doublon |
| Paroi douche italienne 8mm | Anti-doublon | Anti-doublon |
| Colonne douche thermostatique | Anti-doublon | Anti-doublon |
| Escalier / rampe chien design | Anti-doublon | Anti-doublon |
| Miroir LED salle de bain simple | Anti-doublon | Anti-doublon |
| Rideau thermique isolant premium | Anti-doublon | Anti-doublon |
| Fontaine à eau chat | Anti-doublon/rincé | Anti-doublon |
| Tapis de marche pliable / walking pad | Anti-doublon | Anti-doublon |
| Hamac sur pied pliable | non validé Ahrefs, saisonnier | Demande France / risque / panier |
| Cave à vin compacte | non validé Ahrefs, SAV froid | Demande France / risque / panier |
| Kit irrigation goutte-à-goutte solaire | panier faible | Demande France / risque / panier |
| Poubelle automatique cuisine tri | marché basique/saturé | Demande France / risque / panier |
| Robot lave-vitre | risque chute/SAV, non validé Ahrefs | Demande France / risque / panier |

## Livraison finale du run

| Exigence | Statut |
|---|---|
| 20 a 50 idees brutes collectees | OK - 32 idees brutes |
| Google Sheet cree/rempli ou blocage declare | OK - onglet `Feuille 4` rempli + fallback TSV |
| Semrush France via Kloow tente/utilise si autorise | OK - Semrush tente, bloque HTTP2; Ahrefs fallback utilise |
| Google Trends France verifie | OK - pytrends FR 5 ans |
| 5 produits scores ou raison documentee | OK - 5 produits scores |
| AliExpress tente pour chaque produit score | Bloque - premier acces AliExpress via Computer Use refuse par politique URL; blocage applique aux 5, aucune donnee inventee |
| DTC/specialises separes des marketplaces | OK dans competitors.md / decision briefs |
| Scorecards et decision briefs produits | OK |
| Weekly report final | OK |

## Gate 0

Gate 0 non validee. Aucun produit n'est GO. Les MAYBE exigent validation humaine et reprise fournisseur/AliExpress avant Phase 1.
