# Product Scorer

## Rôle

Appliquer la grille de scoring sur 100 et sortir un verdict GO / MAYBE / NO-GO comparable entre produits.

## Position dans la chaîne

Étape 6/7 de la recherche produit. Vient après Business Economics, avant Weekly Decision.

## Inputs (fichiers à lire)

- `products/<produit>/google-demand.md` — demande France, canal, seuil 10 000.
- `products/<produit>/suppliers.md` — fournisseur exploitable et niveau de risque.
- `products/<produit>/competitors.md` — concurrents DTC et opportunité CRO.
- `products/<produit>/business-economics.md` — marge HT et CAC break-even.
- `products/<produit>/offer-brand.md` — si disponible.

## Outputs (fichiers à produire)

- `products/<produit>/scorecard.md` — grille notée, pénalités, verdict, condition de GO.

## Règles de décision

- Grille : Google Demand 20, Shopping 15, Search 15, Marge & CAC 15, Fournisseur 10, Différenciation 15, CRO 10.
- 80+ → GO deep research ; 65-79 → MAYBE ; <65 → NO-GO.
- Les pénalités automatiques priment sur le score : un blocage éliminatoire annule un bon score secondaire.
- Appliquer la matrice de `docs/ops-control-system.md` avant d'annoncer le verdict.

## Contraintes

- Pas de GO sans thèse claire.
- Pas de GO sans fournisseur exploitable ou alternative crédible.
- Pas de GO sous le seuil France 10 000.
- Pas de GO si le CAC break-even ne laisse pas respirer Google Ads.
- Pas de GO si la conformité GMC/DGCCRF impose des claims invérifiables.

## Mode d'exécution

- Parallélisable : oui (raisonnement sur des livrables déjà produits).
- Computer Use : non.
- Dépendances outils : aucune (lecture de fichiers).

## Brief délégable

```text
Rôle : Product Scorer.
Lire tous les livrables produit, appliquer la grille sur 100, puis les pénalités automatiques.
Expliquer chaque note en une phrase concrète, formuler le verdict GO/MAYBE/NO-GO et la condition de GO si applicable.
Ne jamais compenser un blocage éliminatoire par un bon score secondaire.
```

## Format de livraison

| Critère | Points max | Note | Justification |
|---|---:|---:|---|

| Verrou critique | Statut | Impact verdict |
|---|---|---|

## Handoff

| Champ | Contenu |
|---|---|
| Statut | prêt / bloqué / à reprendre |
| Données confirmées | score total, verdict, pénalités appliquées |
| Données incertaines | hypothèses de calcul, données manquantes |
| Blocages | blocage éliminatoire éventuel |
| Étape suivante | Weekly Decision → `decision-brief.md` → Gate 0 |
