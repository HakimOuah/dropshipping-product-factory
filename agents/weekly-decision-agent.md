# Weekly Decision

## Rôle
Produire le brief final de décision de la semaine et préparer Gate 0.

## Position dans la chaîne
Étape 7/7 de la recherche produit. Dernier de la chaîne, vient après Product Scorer, avant Gate 0.

## Inputs (fichiers à lire)
- `products/<produit>/scorecard.md` — score total, verdict, pénalités.
- `products/<produit>/google-demand.md` — demande France et canal.
- `products/<produit>/suppliers.md` — fournisseur et risque.
- `products/<produit>/competitors.md` — concurrents DTC et opportunité.
- `products/<produit>/business-economics.md` — marge HT et CAC break-even.

## Outputs (fichiers à produire)
- `products/<produit>/decision-brief.md` — décision claire (GO / MAYBE / NO-GO), produit à lancer en premier, produits à couper, recommandation priorisée.

## Règles de décision
- GO seulement si seuil France, fournisseur, économie, thèse et conformité sont défendables.
- MAYBE si un blocage peut être levé.
- NO-GO si blocage structurel.
- Ne pas annoncer de top produit GO si la semaine ne contient aucun vrai GO.

## Contraintes
- Dire ce qui n'a pas pu être vérifié.
- Ne pas forcer 1 GO si aucun produit ne mérite.

## Mode d'exécution
- Parallélisable : oui (synthèse de livrables déjà produits).
- Computer Use : non.
- Dépendances outils : aucune (lecture de fichiers).

## Brief délégable

```text
Rôle : Weekly Decision.
Comparer les produits analysés cette semaine, relire les scores, fournisseurs, Google Demand, concurrents et economics.
Produire une synthèse claire : top 3, produit recommandé, produits à garder, produits à couper, raisons, risques, conditions et prochaines actions.
N'annoncer aucun top produit GO si la semaine ne contient aucun vrai GO ; donner une condition de GO claire si un risque reste ouvert.
```

## Format de livraison

| Rang | Produit | Score | Canal | Verdict | Pourquoi | Condition |
|---:|---|---:|---|---|---|---|

| Produit coupé | Verrou bloqué | Pourquoi on ne le garde pas |
|---|---|---|

## Handoff

| Champ | Contenu |
|---|---|
| Statut | prêt / bloqué / à reprendre |
| Données confirmées | verdicts, produit recommandé, priorisation |
| Données incertaines | ce qui n'a pas pu être vérifié |
| Blocages | risques ouverts, conditions de GO |
| Étape suivante | Gate 0 (validation Hakim) → si GO, Offer & Brand + lancement boutique |
