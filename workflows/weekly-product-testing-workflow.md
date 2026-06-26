# Weekly Product Testing Workflow

Objectif : tester 1 a 2 produits par semaine sans recycler des idees faibles.

## Point d'entree obligatoire

Une recherche produit hebdomadaire commence par :

```bash
python3 scripts/new_research.py "theme de recherche"
```

Puis remplir `researches/<run>/research-run.md`.

Interdiction : ne pas demarrer un run hebdomadaire avec `scripts/new_product.py`. Ce script sert seulement a creer les dossiers des produits candidats apres shortlist.

## Lundi — Hunting (Product Hunter)

- Remplir ou relire `templates/product-research-request-template.md`.
- Creer ou ouvrir la feuille Google Sheet `recherche YYYY-MM-DD`.
- Verifier l'historique Google Sheet avant toute notation.
- Chercher 20 a 50 idees brutes.
- Exclure les produits rincés, risques ou trop faibles.
- Garder uniquement les idees compatibles Google Ads France.
- Sortir une liste `produits coupes` avec raison courte pour eviter qu'ils reviennent mardi.
- Interdiction : analyser un seul produit sauf si Hakim demande explicitement une analyse mono-produit.

Livrables : `researches/<run>/research-run.md`, Google Sheet, puis dossiers `products/<date-produit>/raw-findings.md` pour les produits shortlistes.

## Mardi — Google Demand (Google Demand)

- Verifier Google Search, Shopping et Trends France.
- Utiliser Semrush France via **l'application Mac Kloow** si acces disponible ou attendu (sequentiel, session GUI unique).
- Ne pas ouvrir Kloow dans un navigateur classique. Chemin obligatoire : app Mac Kloow → Login si necessaire → recherche interne `semrush` → carte Semrush → Launch → Kloow Browser.
- Si Semrush est indisponible dans Kloow, chercher `ahrefs` dans l'application Mac Kloow et cliquer Launch comme fallback.
- Appliquer le seuil 10 000 recherches mensuelles France.
- Classer Shopping-first, Search-first ou Both.
- Couper tout produit dont la demande France est sous le seuil. Ne pas le sauver avec marge, fournisseur ou intuition.
- Shortlister 5 produits a scorer, sauf si moins de 5 survivent avec justification dans `research-run.md`.

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

- **Séquentiel** — session GUI unique, anti-bot : AliExpress (mercredi) et Semrush/Ahrefs via l'application Mac Kloow (mardi). Un produit / un mot-clé à la fois.
- **Parallélisable** : analyse concurrents et calcul éco (mercredi), scoring (jeudi).
- **Gate 0 (jeudi) bloque le vendredi** : pas de `new_boutique.py` ni de build tant que Gate 0 n'est pas `valide par Hakim` dans `project-state.md`.

## Run invalide

Le run est invalide si l'une de ces erreurs arrive sans justification explicite :

- un seul produit analyse alors que Hakim a demande une recherche ;
- aucune tentative Google Sheet ;
- aucune tentative application Mac Kloow → Semrush France alors que l'acces est disponible ou attendu ;
- aucun fallback Ahrefs via Kloow si Semrush est indisponible ;
- moins de 5 produits scores sans documenter pourquoi ;
- AliExpress non tente pour les produits scores ;
- livraison finale sans weekly report.
