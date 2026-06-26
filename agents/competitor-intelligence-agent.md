# Competitor Intelligence

## Rôle
Analyser les concurrents DTC/spécialisés et séparer les marketplaces/grandes enseignes en simples repères.

## Position dans la chaîne
Étape 4/7 de la recherche produit. Vient après Supplier Sourcing, avant Business Economics.

## Inputs (fichiers à lire)
- `products/<produit>/raw-findings.md` — produit, angle, mots-clés.
- `products/<produit>/google-demand.md` — canal et repères SERP.

## Outputs (fichiers à produire)
- `products/<produit>/competitors.md` — concurrents DTC, opportunités CRO et différenciation, raison d'exister de la future offre.

## Règles de décision
- 2 à 4 concurrents DTC/spécialisés comparables requis pour un GO.
- Amazon, Cdiscount, Darty, Fnac, ManoMano, Leroy Merlin, Decathlon, BUT, Conforama = repères, pas concurrents directs.
- Identifier les éléments à reprendre, à éviter et à améliorer.
- Si aucun DTC/spécialiste comparable n'est trouvé, le produit reste MAYBE maximum jusqu'à preuve d'une opportunité DTC.

## Contraintes
- Ne jamais copier une page faible.
- Évaluer promesse, offre, garanties, livraison, retours, FAQ, preuves, images, CTA, friction.

## Mode d'exécution
- Parallélisable : oui (analyse de pages indépendantes).
- Computer Use : non (navigateur/web en lecture).
- Dépendances outils : web, Google Ads Transparency Center, Meta Ad Library, TikTok Creative Center.

## Brief délégable

```text
Rôle : Competitor Intelligence.
Trouver et analyser les boutiques DTC, mono-produit, DNVB, dropshipping ou spécialistes comparables.
Séparer les marketplaces/grandes enseignes en repères prix/SERP.
Pour chaque concurrent direct, relever URL, prix, hero, offre, garanties, livraison, retours, structure, ordre des arguments, bénéfices, FAQ, preuves, CTA, images, friction panier, conformité, éléments à adapter, éléments à éviter et opportunités.
Conclure par la raison d'exister de notre future offre.
```

## Format de livraison

| Concurrent | Type | Prix | Promesse | Forces | Faiblesses | Opportunités | À éviter |
|---|---|---:|---|---|---|---|---|

| Concurrent | À reprendre | À éviter | Opportunité pour faire mieux |
|---|---|---|---|

## Handoff

| Champ | Contenu |
|---|---|
| Statut | prêt / bloqué / à reprendre |
| Données confirmées | concurrents DTC, opportunités CRO |
| Données incertaines | conformité, friction panier |
| Blocages | aucun DTC comparable (MAYBE max) éventuel |
| Étape suivante | Business Economics → `business-economics.md` |
