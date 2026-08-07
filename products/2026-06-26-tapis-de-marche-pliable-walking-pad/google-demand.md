# Google Demand

## Produit

- Produit : Tapis de marche pliable / walking pad compact
- Pays : France
- Date : 2026-06-26
- Canal recommande : Both, avec priorite Shopping-first

## Mots-cles

| Type | Requete | Volume France | CPC | Intent | KD | Notes |
|---|---|---:|---:|---|---:|---|
| Produit principal | tapis de marche | Non confirme | Non confirme | achat / comparaison | Non confirme | Requete la plus forte dans Trends parmi les variantes testees |
| Variante | tapis de marche pliable | Non confirme | Non confirme | achat | Non confirme | Requete transactionnelle claire |
| Variante | walking pad | Non confirme | Non confirme | achat / marque generique | Non confirme | En forte progression relative selon Trends |
| Probleme/solution | tapis de marche bureau | Non confirme | Non confirme | usage teletravail | Non confirme | Plus niche, utile pour angle Search |
| Achat/prix | tapis de marche decathlon / amazon / occasion | Non confirme | Non confirme | comparaison prix | Non confirme | A surveiller ; requetes enseigne et occasion a exclure ou isoler |

## Google Trends France

- Periode : 5 ans, France, pytrends, 2026-06-26
- Indice moyen 5 ans : "tapis de marche" 38.71 ; "walking pad" 3.35 ; "tapis de course pliable" 7.47 ; "tapis marche bureau" 1.05
- Tendance 52 semaines : "tapis de marche" 62.23 ; "walking pad" 9.25 ; "tapis de course pliable" 12.44 ; "tapis marche bureau" 2.31
- Tendance 13 semaines : "tapis de marche" 55.08 ; "walking pad" 10.69 ; "tapis de course pliable" 9.54 ; "tapis marche bureau" 1.77
- Saisonnalite : demande soutenue, pas uniquement saisonniere ; legere baisse fin juin 2026 sur la derniere semaine complete observee
- Regions : non extraites dans cette passe
- Limites : Trends donne un indice relatif, pas un volume mensuel ; le seuil 10 000 France n'est donc pas officiellement confirme.

## Google Shopping / SERP

- Presence commerciale : active mais a re-verifier en navigateur Google France ; pages/requetes commerciales observees chez Cdiscount, Decathlon (Cloudflare en automatisation), FitnessBoutique et marketplaces.
- Fourchette prix observee : hypothese prudente 199 a 499 EUR selon moteur, inclinaison, pliage, marque et garantie.
- Qualite des offres : marketplaces tres prix/specs ; opportunite sur reassurance, bruit, SAV, usage appartement, bureau debout.
- Reperes marketplaces : Cdiscount, Amazon, AliExpress, Decathlon marketplace.
- Concurrents DTC vus : WalkingPad / Kingsmith et boutiques specialisees fitness ; a verifier en browser pour prix exacts.
- Requetes a exclure : occasion, le bon coin, gratuit, reparation, manuel, tapis de course salle de sport, Decathlon si campagne non-concurrentielle, Amazon si campagne non-concurrentielle.

## Classification canal

| Canal | Preuves requises | Statut | Notes |
|---|---|---|---|
| Shopping-first | requete produit claire, Shopping actif, image/prix importants, feed optimisable | Probable | Produit visuel, prix comparable, attributs feed utiles : pliable, silencieux, vitesse, inclinaison, telecommande, encombrement |
| Search-first | requetes probleme/desir, pedagogie utile, panier suffisant, landing persuasive | Plausible | Angle teletravail/sedentarite et appartement ; attention aux claims sante |
| Both | preuves Shopping et Search presentes | Plausible mais non verrouille | Shopping plus solide ; Search a tester avec landing educative sobre |

## Verdict demande

- Seuil 10 000 recherches France confirme : non
- Decision : MAYBE
- Justification : le signal Trends et la SERP commerciale justifient de continuer, mais Semrush/Keyword Planner France n'a pas ete consulte. Selon le workflow, le verdict maximum sans volume mensuel confirme reste MAYBE.

## Sources et limites

- Google Trends France via pytrends, requetes : "tapis de marche", "walking pad", "tapis de course pliable", "tapis marche bureau".
- Cdiscount search : https://www.cdiscount.com/search/10/tapis+de+marche.html
- Decathlon search tentee : https://www.decathlon.fr/search?Ntt=tapis%20de%20marche ; acces automatise bloque par Cloudflare, a verifier manuellement.
- FitnessBoutique category observee en page 404 mais navigation/category "Tapis de Course" presente : https://www.fitnessboutique.fr/
- AliExpress wholesale search tentee : https://fr.aliexpress.com/w/wholesale-walking-pad.html ; contenu non exploitable en automatisation.

## Handoff

| Champ | Contenu |
|---|---|
| Statut | a reprendre avec Semrush/Kloow ou Keyword Planner France |
| Donnees confirmees | signal Trends France ; intention produit claire ; presence commerciale partielle |
| Donnees incertaines | volume mensuel, CPC, KD, vraie intensite Shopping Google.fr |
| Prochain agent | Supplier Sourcing -> `suppliers.md` |
