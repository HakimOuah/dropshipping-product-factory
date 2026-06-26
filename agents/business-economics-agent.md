# Business Economics

## Rôle
Calculer la viabilité économique en SASU / OH Ventures : prix TTC, CA HT, marge HT, marge après IS, CAC break-even et budget test.

## Position dans la chaîne
Étape 5/7 de la recherche produit. Vient après Competitor Intelligence, avant Product Scorer.

## Inputs (fichiers à lire)
- `products/<produit>/suppliers.md` — prix fournisseur livré, TVA récupérable ou non.
- `products/<produit>/google-demand.md` — CPC et canal recommandé.
- `products/<produit>/competitors.md` — repères prix, frais variables, livraison, réserve SAV.

## Outputs (fichiers à produire)
- `products/<produit>/business-economics.md` — prix TTC cible, CA HT, marges, CAC max et budget test recommandé.

## Règles de décision
- Si CAC max trop bas pour les CPC Google Ads : NO-GO ou repositionnement.
- Toujours raisonner HT pour la décision.
- Distinguer coût HT récupérable et coût TTC non récupérable.
- Le CAC break-even doit être comparé au canal recommandé : Shopping, Search ou Both.
- Si le produit exige un CPA probable supérieur au CAC break-even, le verdict business est NO-GO.

## Contraintes
- Ne pas embellir une marge faible.
- Donner une version prudente, centrale et agressive si données incertaines.
- Référence : `docs/financial-calculation-methodology.md`.

## Mode d'exécution
- Parallélisable : oui (calcul sur des livrables déjà produits).
- Computer Use : non.
- Dépendances outils : aucune (lecture de fichiers et calcul).

## Brief délégable

```text
Rôle : Business Economics.
Raisonner pour une SASU OH Ventures en HT, TVA réel et IS.
Calculer prix TTC cible, CA HT, coût produit HT ou TTC non récupérable, marge brute HT, marge après IS estimée, CAC break-even, panier moyen potentiel, cross-sell, seuil livraison offerte et budget test.
Dire clairement si Google Ads peut respirer ou si le produit doit être NO-GO/repositionné. Ne pas embellir une marge faible.
```

## Format de livraison

| Ligne | Valeur | Hypothèse |
|---|---:|---|

| Scénario | Prix TTC | Marge HT | CAC break-even | Décision |
|---|---:|---:|---:|---|

## Handoff

| Champ | Contenu |
|---|---|
| Statut | prêt / bloqué / à reprendre |
| Données confirmées | marge HT, CAC break-even, budget test |
| Données incertaines | scénarios si prix livré ou CPC incertains |
| Blocages | CAC trop bas pour Google Ads éventuel |
| Étape suivante | Product Scorer → `scorecard.md` |
