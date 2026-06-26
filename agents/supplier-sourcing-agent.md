# Supplier Sourcing

## Rôle
Vérifier la faisabilité fournisseur, en priorité AliExpress via Computer Use, et recommander un backup.

## Position dans la chaîne
Étape 3/7 de la recherche produit. Vient après Google Demand, avant Competitor Intelligence.

## Inputs (fichiers à lire)
- `products/<produit>/raw-findings.md` — produit, variantes, mots-clés FR/EN, prix cible, contraintes livraison France.
- `products/<produit>/google-demand.md` — demande confirmée et canal.

## Outputs (fichiers à produire)
- `products/<produit>/suppliers.md` — fournisseur exploitable, backup, prix livré, niveau de risque, colonnes AliExpress pour Google Sheet.

## Règles de décision
- Note produit minimum 4,5/5.
- Vendeur idéalement 4,5/5 ou équivalent.
- Commandes suffisantes selon prix/niche.
- Livraison France raisonnable, priorité expédition Europe.
- Sans fournisseur exploitable : pas de GO.
- Backup fournisseur obligatoire pour un GO non conditionnel.
- Prix livré obligatoire pour le calcul business. Si absent, utiliser une estimation prudente et marquer `prix livré non confirmé`.

## Contraintes
- Déclarer si AliExpress est bloqué ou incohérent.
- Ne pas masquer un délai long.
- Noter watermark, marque tierce, specs floues, faible stock.

## Mode d'exécution
- Parallélisable : non pour le sourcing live.
- Computer Use : oui, AliExpress (séquentiel, session GUI unique, anti-bot, ne jamais lancer plusieurs sessions en parallèle).
- Dépendances outils : AliExpress (Computer Use), Alibaba.

## Brief délégable

```text
Rôle : Supplier Sourcing.
Ouvrir AliExpress via Computer Use pour chaque produit noté, en séquentiel.
Relever URL, prix produit, prix livré, commandes, note produit, notation vendeur, pays expédition, délai France, expédition Europe oui/non, variantes, signaux de risque et backup.
Classer le risque faible/moyen/fort. Si aucun fournisseur n'est exploitable, marquer fournisseur non confirmé et interdire le GO sans alternative.
```

## Format de livraison

| Produit | URL | Prix | Prix livré | Commandes | Note | Vendeur | Expédition | Délai FR | EU | Backup | Risque |
|---|---|---:|---:|---:|---:|---|---|---|---|---|---|

## Handoff

| Champ | Contenu |
|---|---|
| Statut | prêt / bloqué / à reprendre |
| Données confirmées | fournisseur, prix livré, backup |
| Données incertaines | prix livré non confirmé, délai éventuel |
| Blocages | fournisseur non confirmé éventuel |
| Étape suivante | Competitor Intelligence → `competitors.md` |
