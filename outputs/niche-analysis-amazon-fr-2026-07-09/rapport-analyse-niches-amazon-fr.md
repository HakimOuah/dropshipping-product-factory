# Analyse de niches e-commerce dropshipping FR - export Ahrefs Amazon.fr

- Source : `amazon.fr-organic-keywords-subdomains-fr-_2026-07-09_19-21-08.csv`
- Lignes brutes : 1 815; lignes après déduplication normalisée : 1 776.
- Déduplication : conservation de la variante au plus fort volume pour les requêtes normalisées, ex. `glaciere electrique` / `glacière électrique`.
- Volume commercial : reclassification conservatrice. La colonne Ahrefs `Commercial=True` est quasi universelle dans ce fichier, donc les requêtes IP, ambiguës, informationnelles ou hors-sujet sont exclues du commercial quand nécessaire.
- Les volumes ci-dessous restent des volumes de mots-clés du CSV, pas une taille de marché totale.

## Tableau récapitulatif

| Niche | Archétype (mono-produit décliné / univers lifestyle) | Vol. total | Vol. commercial | % commercial | KD moyen | CPC moyen | Nb mots-clés exploitables | Fit produit (flag) | Verdict |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Accessoires tech/audio | Univers accessoires commoditisé | 736 100 | 736 100 | 100% | 4.3 | 0.15 | 58 | ELIM: électronique/CE + SAV + marketplace | Disqualifiée malgré volume |
| Plage/camping/jardin saisonnier | Univers lifestyle outdoor | 505 300 | 505 300 | 100% | 0.1 | 0.19 | 63 | PENAL: saisonnier + bulky + outillage/jouet CE | À éviter en mono-marque généraliste |
| Outillage/bricolage | Univers équipement | 366 400 | 366 400 | 100% | 0.3 | 0.16 | 32 | ELIM: lourd/motorisé + ManoMano/Leroy | Disqualifiée |
| Beauté cheveux/ongles/coiffeuse | Univers beauté accessoire | 365 800 | 365 800 | 100% | 0.5 | 0.15 | 38 | PENAL: cosmétique/électrique/meuble + retours | Trop risquée sans sous-niche stricte |
| Papeterie créative & coloriage kawaii | Univers lifestyle créatif | 363 600 | 342 600 | 94% | 1.3 | 0.16 | 33 | OK: léger/giftable/deep catalog; IP à filtrer | TOP: meilleure balance volume/fit |
| Froid/ventilation nomade | Mono-produit décliné | 312 600 | 312 600 | 100% | 0.3 | 0.14 | 15 | ELIM/PENAL: électrique, lourd, saisonnier | Disqualifiée pour dropship léger |
| Anti-insectes maison & été | Mono-problème décliné | 285 700 | 285 700 | 100% | 1.4 | 0.11 | 25 | OK-: léger, douleur forte; saisonnier + électrique/biocide | TOP mais saisonnalité forte |
| Rangement & porte-accessoires maison | Univers maison fonctionnel | 285 300 | 285 300 | 100% | 2.0 | 0.18 | 39 | OK-/PENAL: quelques produits lourds et enseignes maison | À tester seulement sous-angle léger |
| Sextoys/adulte intime | Univers mature | 271 500 | 271 500 | 100% | 5.3 | 0.31 | 9 | PENAL: paiement/ads, body-contact, électronique | Volume fort mais risque opérationnel |
| Gadgets cuisine & vaisselle | Univers cuisine fonctionnel | 237 800 | 237 800 | 100% | 0.3 | 0.15 | 22 | PENAL: électrique/food-contact/poids | À éviter sauf accessoires non-électriques |
| Accessoires voiture | Univers accessoires auto | 233 200 | 233 200 | 100% | 0.8 | 0.14 | 30 | ELIM/PENAL: sécurité, électrique, lourd | Disqualifiée |
| Déco murale & lumières | Univers déco maison | 203 700 | 203 700 | 100% | 2.3 | 0.15 | 21 | OK-/PENAL: fragile/électrique + enseignes déco | Possible mais pas prioritaire |
| Événementiel, cartes & cadeaux | Univers occasion/giftable | 242 500 | 201 500 | 83% | 1.7 | 0.16 | 27 | OK: léger/giftable; occasions + concurrence fête | TOP secondaire |
| Merchandising licencié enfant | Univers licence/IP | 473 000 | 198 000 | 42% | 0.2 | 0.11 | 17 | ELIM: licences/IP + jouet CE | Disqualifiée |
| Linge de lit & cocooning sommeil | Univers lifestyle maison | 170 000 | 170 000 | 100% | 1.7 | 0.28 | 17 | OK-/PENAL: textile, bulky modéré, grosses enseignes | Potentiel, mais pénétration difficile |
| Piercing oreille & bijoux fantaisie | Mini-marque bijoux décliné | 160 300 | 160 300 | 100% | 1.9 | 0.32 | 11 | OK: très léger/giftable; body-contact + pure players | TOP mais concurrence dense |
| Accessoires chats/chiens | Univers pet lifestyle | 145 100 | 145 100 | 100% | 0.2 | 0.20 | 28 | OK-/PENAL: profond, mais pure players + santé/électronique | Intéressant sous sous-niche non-santé |
| Fidget/squishy/anti-stress toys | Mono-produit décliné tendance | 143 900 | 143 900 | 100% | 0.8 | 0.14 | 10 | PENAL/ELIM: jouet CE, trend, faible panier | Pas prioritaire |
| Drapeaux & supporters | Mono-produit décliné large | 137 100 | 137 100 | 100% | 0.9 | 0.08 | 20 | OK-: très léger/deep SKU; faible AOV | TOP niche simple, panier à travailler |
| Mode thématique & déguisements | Univers textile occasionnel | 94 700 | 94 700 | 100% | 0.4 | 0.18 | 15 | PENAL: tailles/retours/saisonnier | À éviter en dropship SEO pur |
| Cocooning anti-stress non-médical | Univers bien-être maison | 93 800 | 93 800 | 100% | 3.2 | 0.28 | 7 | OK-/PENAL: claims bien-être + quelques électriques | Watchlist, angle bundle possible |

## Top niches détaillées

### 1. Papeterie créative & coloriage kawaii

**Pourquoi elle ressort.** Je la mets #1 car elle garde le meilleur équilibre après déduplication : 342 600 de volume commercial, KD moyen 1,3, 33 requêtes exploitables, produits légers et faciles à bundler. Le piège est le contenu gratuit/imprimable et les licences IP ; il faut vendre des kits physiques, packs de feutres, carnets, trousses et bundles créatifs plutôt qu’une simple librairie de coloriages.

**Chiffres CSV.** Vol. total 363 600; vol. commercial 342 600; % commercial 94%; KD moyen 1.3; CPC moyen 0.16; mots-clés exploitables 33.

**Domaine exact-match suggéré.** `coloriage-kawaii.fr / atelier-kawaii.fr`

| Collection proposée | Mot-clé principal CSV | Vol. mot-clé | Vol. collection | Intention |
| --- | --- | ---: | ---: | --- |
| Coloriage kawaii/cosy | coloriage kawaii | 38 000 | 61 000 | Mixte C/T |
| Feutres & marqueurs | feutre acrylique | 33 000 | 66 700 | Commerciale |
| Agendas & planners | agenda 2025 | 39 000 | 61 100 | Transactionnelle |
| Trousses & accessoires scolaires | trousse | 26 000 | 35 400 | Transactionnelle |
| Coloriages adultes/magiques/mystères | coloriage adulte | 15 000 | 60 200 | Mixte C/T |
| Marque-pages personnalisés | marque page | 14 000 | 17 700 | Commerciale |
| Chevalets & peinture textile | chevalet | 12 000 | 28 800 | Commerciale |
| Diamond painting personnalisé | diamond painting personnalisé | 6 000 | 6 000 | Transactionnelle |

**Risques / concurrence.** Risques : contenu gratuit sur les coloriages, forte présence Amazon/Fnac/Cdiscount/Cultura, saisonnalité des agendas, IP à bannir. Angle conseillé : kits complets, bundles, personnalisation, contenu UGC/TikTok/Pinterest.

### 2. Anti-insectes maison & été

**Pourquoi elle ressort.** C’est le plus fort problème d’achat immédiat parmi les niches propres : 285 700 de volume commercial, CPC bas, KD 1,4. Le potentiel SEA/SEO existe, mais la saisonnalité est réelle et il faut exclure les produits biocides douteux ou électriques non conformes.

**Chiffres CSV.** Vol. total 285 700; vol. commercial 285 700; % commercial 100%; KD moyen 1.4; CPC moyen 0.11; mots-clés exploitables 25.

**Domaine exact-match suggéré.** `anti-moustique-maison.fr / stop-moustiques.fr`

| Collection proposée | Mot-clé principal CSV | Vol. mot-clé | Vol. collection | Intention |
| --- | --- | ---: | ---: | --- |
| Pièges/attrape-mouches | piege a mouche | 49 000 | 95 000 | Commerciale |
| Pièges & appareils anti-moustiques | piege a moustique | 28 000 | 87 500 | Commerciale/transactionnelle |
| Moustiquaires & rideaux | rideau anti mouche | 20 000 | 42 000 | Transactionnelle |
| Répulsifs portables/naturels | bracelet anti moustique | 11 000 | 30 600 | Commerciale |
| Anti-fourmis | anti fourmis | 11 000 | 19 500 | Commerciale |
| Moucherons intérieur | piege a moucheron | 11 000 | 11 000 | Commerciale |

**Risques / concurrence.** Risques : saison mai-septembre, produits électriques/biocides à auditer, retours si efficacité faible, pure players spécialisés. Angle conseillé : maison/chambre/terrasse, non toxique, moustiquaires + pièges mécaniques + packs familiaux.

### 3. Piercing oreille & bijoux fantaisie

**Pourquoi elle ressort.** Très bon fit dropshipping : léger, giftable, forte valeur perçue, AOV pilotable par lots. Le volume commercial est plus bas que les géants disqualifiés (160 300), mais le CPC moyen 0,32 signale une vraie valeur commerciale ; en revanche la concurrence pure-player est déjà dense.

**Chiffres CSV.** Vol. total 160 300; vol. commercial 160 300; % commercial 100%; KD moyen 1.9; CPC moyen 0.32; mots-clés exploitables 11.

**Domaine exact-match suggéré.** `piercing-oreille.fr / bijoux-oreille.fr`

| Collection proposée | Mot-clé principal CSV | Vol. mot-clé | Vol. collection | Intention |
| --- | --- | ---: | ---: | --- |
| Piercing oreille | piercing oreille | 60 000 | 64 700 | Commerciale |
| Bracelets brésiliens | bracelet brésilien | 45 000 | 45 000 | Transactionnelle |
| Pins & petits bijoux fantaisie | pins | 12 000 | 20 300 | Commerciale |
| Boîtes & porte-bijoux | boite a bijoux | 11 000 | 16 000 | Commerciale |
| Bracelets couple/pierre/perle | bracelet couple | 6 200 | 14 300 | Commerciale |

**Risques / concurrence.** Risques : matériaux hypoallergéniques, nickel, SAV hygiène, concurrence SEO ancienne. Angle conseillé : curated ear, lots coordonnés, acier/titane clairement sourcé, guides tailles/matières.

### 4. Événementiel, cartes & cadeaux

**Pourquoi elle ressort.** Niche légère et giftable avec 201 500 de volume commercial et une bonne découpe en occasions. Le risque est le panier moyen faible et la dispersion des intentions : il faut se spécialiser sur gender reveal/baby shower ou cartes cadeaux personnalisées, pas partir sur toute la fête.

**Chiffres CSV.** Vol. total 242 500; vol. commercial 201 500; % commercial 83%; KD moyen 1.7; CPC moyen 0.16; mots-clés exploitables 27.

**Domaine exact-match suggéré.** `gender-reveal.fr / cartes-anniversaire.fr`

| Collection proposée | Mot-clé principal CSV | Vol. mot-clé | Vol. collection | Intention |
| --- | --- | ---: | ---: | --- |
| Gender reveal & annonce grossesse | gender reveal | 21 000 | 33 000 | Transactionnelle |
| Cartes anniversaire | carte anniversaire | 17 000 | 53 500 | Transactionnelle |
| Cadeaux occasionnels | cadeau nounou | 8 100 | 32 200 | Commerciale |
| Déco anniversaire | joyeux anniversaire fleurs | 5 500 | 19 200 | Transactionnelle |
| Mariage/noce | 10 ans de mariage noce | 7 100 | 30 000 | Transactionnelle |
| Anniversaire homme/femme | anniversaire femme | 19 000 | 51 600 | Commerciale |

**Risques / concurrence.** Risques : achat ponctuel, faible panier, délais sensibles avant événement. Angle conseillé : kits complets gender reveal/baby shower, personnalisation et livraison suivie.

### 5. Drapeaux & supporters

**Pourquoi elle ressort.** Niche simple, très SKU-friendly, ultra légère, avec 137 100 de volume commercial et 20 requêtes exploitables. Le défaut est le faible AOV ; il faut vendre packs, grands formats, personnalisations et accessoires de fixation pour atteindre un panier viable.

**Chiffres CSV.** Vol. total 137 100; vol. commercial 137 100; % commercial 100%; KD moyen 0.9; CPC moyen 0.08; mots-clés exploitables 20.

**Domaine exact-match suggéré.** `drapeaux-du-monde.fr / mon-drapeau.fr`

| Collection proposée | Mot-clé principal CSV | Vol. mot-clé | Vol. collection | Intention |
| --- | --- | ---: | ---: | --- |
| Drapeaux Italie | drapeau italien | 30 000 | 48 000 | Transactionnelle |
| Drapeaux pays/territoires | drapeau afrique | 10 000 | 44 600 | Transactionnelle |
| Drapeaux Pride/identité | drapeau lesbienne | 8 300 | 23 100 | Transactionnelle |
| Drapeaux fantaisie/couleurs | drapeau rouge jaune vert | 5 600 | 21 400 | Transactionnelle |

**Risques / concurrence.** Risques : faible prix unitaire, achats événementiels, concurrence spécialisée européenne. Angle conseillé : grands formats, packs supporters, drapeaux personnalisés, accessoires de fixation.

### 6. Accessoires chats/chiens non-santé

**Pourquoi elle ressort.** La profondeur catalogue est excellente et le volume exploitable atteint 145 100, mais il faut éviter les anti-puces, vermifuges, GPS/colliers électriques et gros meubles. À travailler en sous-niche émotionnelle et non réglementée : gamelles, paniers, jouets, rangement litière léger.

**Chiffres CSV.** Vol. total 145 100; vol. commercial 145 100; % commercial 100%; KD moyen 0.2; CPC moyen 0.20; mots-clés exploitables 28.

**Domaine exact-match suggéré.** `accessoires-chat.fr / maison-du-chat.fr`

| Collection proposée | Mot-clé principal CSV | Vol. mot-clé | Vol. collection | Intention |
| --- | --- | ---: | ---: | --- |
| Gamelles & distributeurs | distributeur de croquettes pour chat | 11 000 | 25 000 | Commerciale/transactionnelle |
| Colliers/GPS/laisses | collier gps chat | 12 000 | 22 800 | Commerciale |
| Couchage & paniers | panier pour chien | 6 500 | 18 700 | Commerciale |
| Cages/parcs/niches | cage pour chien | 7 600 | 33 100 | Commerciale/transactionnelle |
| Litière & propreté | collerette chat | 6 100 | 13 900 | Commerciale |
| Santé/anti-puces à exclure | collier anti puce chien | 5 100 | 19 400 | Transactionnelle mais réglementée |

**Risques / concurrence.** Risques : acteurs type Zooplus/Maxi Zoo, santé animale réglementée, GPS/électrique à exclure. Angle conseillé : accessoires chats non réglementés, gamelles, paniers, organisation litière, jouets.

### 7. Linge de lit & cocooning sommeil

**Pourquoi elle ressort.** Le textile coche mieux le modèle mini-marque que les meubles : 170 000 de volume commercial dans la version resserrée, avec des paniers plus hauts. La pénétration est difficile car la SERP est pleine de marques historiques, et certains produits sont volumineux.

**Chiffres CSV.** Vol. total 170 000; vol. commercial 170 000; % commercial 100%; KD moyen 1.7; CPC moyen 0.28; mots-clés exploitables 17.

**Domaine exact-match suggéré.** `linge-cocooning.fr / sommeil-cosy.fr`

| Collection proposée | Mot-clé principal CSV | Vol. mot-clé | Vol. collection | Intention |
| --- | --- | ---: | ---: | --- |
| Couvertures & bouillottes | couverture lestée | 33 000 | 65 200 | Commerciale |
| Taies & oreillers | taie d'oreiller | 13 000 | 32 000 | Commerciale |
| Draps, couettes, parures | couette 220x240 | 14 000 | 32 700 | Transactionnelle |
| Housses & protection | alèse | 11 000 | 44 600 | Commerciale/transactionnelle |

**Risques / concurrence.** Risques : volume colis, retours texture/couleur, grosses marques historiques. Angle conseillé : micro-positionnement soie/cocooning, bundles masque + taie + bouillotte, éviter matelas/couettes trop volumineux.

### 8. Rangement léger & porte-accessoires

**Pourquoi elle ressort.** Le volume est haut (289 500) et la découpe en collections est facile, mais le cluster est instable : une partie devient vite meuble, bricolage ou enseignes maison. À considérer seulement en angle “léger sans perçage / petits rangements”, sinon la logistique tue la marge.

**Chiffres CSV.** Vol. total 285 300; vol. commercial 285 300; % commercial 100%; KD moyen 2.0; CPC moyen 0.18; mots-clés exploitables 39.

**Domaine exact-match suggéré.** `rangement-malin.fr / porte-accessoires.fr`

| Collection proposée | Mot-clé principal CSV | Vol. mot-clé | Vol. collection | Intention |
| --- | --- | ---: | ---: | --- |
| Portes-manteaux & patères | porte manteau | 23 000 | 41 700 | Commerciale |
| Boîtes/coffres/malles | boite de rangement | 15 000 | 51 200 | Commerciale |
| Étagères & chaussures | etagere cuisine | 9 000 | 32 700 | Transactionnelle |
| Salle de bain | porte serviette salle de bain | 13 000 | 22 000 | Commerciale |
| Bureau/maquillage | support telephone | 14 000 | 43 300 | Commerciale |
| Séparation de pièce | paravent interieur | 13 000 | 18 600 | Commerciale |

**Risques / concurrence.** Risques : meuble/lourd, enseignes maison/bricolage, faible différenciation. Angle conseillé : petits rangements sans perçage, salle de bain/bureau/maquillage, lots et avant-après visuels.

## Recommandation finale

Je lancerais en priorité **Papeterie créative & coloriage kawaii**, avec un positionnement `coloriage-kawaii.fr` ou `atelier-kawaii.fr`, mais en vendant des **kits physiques** plutôt qu’un simple univers de dessins. C’est le meilleur compromis entre volume commercial, faible KD, profondeur catalogue, produit léger, capacité de bundling et risque réglementaire limité.

Le plan d’attaque : 8 collections, 300+ SKU via carnets/livres, feutres, trousses, agendas, marque-pages, diamond painting, chevalets mini et kits cadeaux. Il faut exclure les licences (Stitch, Harry Potter, etc.) et construire une vraie marque visuelle pour ne pas finir comme revendeur générique de feutres.

**Plan B court terme : Anti-insectes maison & été.** Très bon volume et intention douleur, mais je ne le lancerais qu’avec un calendrier saisonnier et un sourcing strict CE/biocide, ou en restant sur moustiquaires, pièges mécaniques et accessoires non risqués.

## Vérification concurrence web rapide

- Papeterie/créatif : présence d’enseignes généralistes et loisirs créatifs sur les requêtes produits, ex. Fnac, Cdiscount, Créattitude, Le Géant des Beaux-Arts.
- Piercing : pure players établis, ex. Nébuleuse Bijoux, Obsidian Piercing, Piercing Street, Crazy Factory.
- Anti-moustiques : spécialistes visibles, ex. Antimoustic, VP France, Qista.
- Drapeaux : spécialistes catalogue, ex. Pheno Flags, Flagsonline.
- Événementiel : acteurs spécialisés fête, ex. So Fête, Aux Feux de la Fête.
- Linge/pet : grosses enseignes et spécialistes visibles, ex. Linvosges, Sylvie Thiriez, Soie Cosy, Zooplus, ClubVetShop.

Sources web utilisées :
- https://www.fnac.com/papeterie/feutre-acrylique/q
- https://www.cdiscount.com/arts-loisirs/r-feutre%2Bacrylique.html
- https://www.creattitudes.net/dessin-amp-arts-graphiques/marqueurs-acrylique-c830.html
- https://www.geant-beaux-arts.fr/arts-graphiques-colles/marqueurs-et-feutres/marqueurs-acryliques/
- https://nebuleusebijoux.com/
- https://obsidianpiercing.com/
- https://www.piercing-street.fr/
- https://www.crazy-factory.com/fr/
- https://www.antimoustic.com/
- https://www.vpfrance.fr/anti-moustique.html
- https://qista.com/fr/
- https://www.pheno-flags.com/fr/drapeaux/drapeaux-de-pays/drapeau-de-l-italie/
- https://www.flagsonline.fr/drapeaux-regions-italiennes
- https://so-fete.com/1476-gender-reveal
- https://www.auxfeuxdelafete.com/theme/baby-shower-et-gender-reveal/
- https://www.linvosges.com/fr/idees-cadeaux/chacun-son-cadeau/idees-cadeaux-mariage/linge-de-lit-tout-en-soie/
- https://www.sylviethiriez.com/la-chambre-adultes/linge-de-lit.html
- https://www.soiecosy.com/fr/
- https://www.zooplus.fr/shop/chats/ecuelles_distributeurs_nourriture_chat/distributeur_nourriture_chat
- https://www.clubvetshop.fr/gamelles-et-distributeurs-12174
