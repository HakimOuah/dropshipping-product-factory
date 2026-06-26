# Weekly Product Testing Workflow

Objectif : tester 1 a 2 produits par semaine sans recycler des idees faibles.

## Lundi — Hunting (Product Hunter)

- Remplir ou relire `templates/product-research-request-template.md`.
- Verifier l'historique Google Sheet.
- Chercher 20 a 50 idees brutes.
- Exclure les produits rincés, risques ou trop faibles.
- Garder uniquement les idees compatibles Google Ads France.
- Sortir une liste `produits coupes` avec raison courte pour eviter qu'ils reviennent mardi.

Livrable : `raw-findings.md`.

## Mardi — Google Demand (Google Demand)

- Verifier Google Search, Shopping et Trends France.
- Utiliser Semrush France via Kloow si disponible (sequentiel, session GUI unique).
- Appliquer le seuil 10 000 recherches mensuelles France.
- Classer Shopping-first, Search-first ou Both.
- Couper tout produit dont la demande France est sous le seuil. Ne pas le sauver avec marge, fournisseur ou intuition.

Livrable : `google-demand.md` et shortlist 5 produits.

## Mercredi — Faisabilite (Supplier Sourcing + Competitor Intelligence + Business Economics)

- Tenter AliExpress via Computer Use pour chaque idee notee (sequentiel, anti-bot).
- Relever prix, livraison France, note, commandes, vendeur, pays expedition.
- Analyser 2 a 4 concurrents DTC/specialises par finaliste.
- Calculer marge et CAC break-even.
- Tout produit sans fournisseur exploitable devient MAYBE conditionnel ou NO-GO.
- Tout produit avec uniquement des reperes marketplace devient MAYBE maximum.

Livrables : `suppliers.md`, `competitors.md`, `business-economics.md`.

## Jeudi — Decision (Product Scorer + Weekly Decision)

- Appliquer scoring sur 100.
- Rediger these de differenciation.
- Sortir GO / MAYBE / NO-GO.
- Produire `decision-brief.md`.
- Gate 0 : validation humaine.
- Verifier `docs/ops-control-system.md` avant d'ecrire GO.

## Vendredi — Boutique si GO

- Hakim cree email, Shopify, domaine, moyens de paiement, acces.
- Lancer `python3 scripts/new_boutique.py "nom-boutique"`.
- Reporter les hypotheses dans `research-brief.md` et `project-state.md`.
- `project-state.md` doit indiquer Gate 0 validee avant Phase 1 active.

## Week-end ou lundi suivant

- QA.
- Tracking.
- Merchant Center.
- Preparation campagne Google Ads.
- Suivi post-launch.

## Exécution (parallèle / séquentiel / gates)

- **Séquentiel** — session GUI unique, anti-bot : AliExpress (mercredi) et Semrush via Kloow (mardi). Un produit / un mot-clé à la fois.
- **Parallélisable** : analyse concurrents et calcul éco (mercredi), scoring (jeudi).
- **Gate 0 (jeudi) bloque le vendredi** : pas de `new_boutique.py` ni de build tant que Gate 0 n'est pas `valide par Hakim` dans `project-state.md`.
