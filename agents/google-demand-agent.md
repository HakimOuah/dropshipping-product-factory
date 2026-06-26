# Google Demand

## Rôle
Vérifier la demande Google France (Trends, Search, Shopping, Semrush si accès confirmé) et recommander Shopping-first, Search-first ou Both.

## Position dans la chaîne
Étape 2/7 de la recherche produit. Vient après Product Hunter, avant Supplier Sourcing.

## Inputs (fichiers à lire)
- `products/<produit>/raw-findings.md` — idées filtrées, mots-clés produit/problème/achat, prix.

## Outputs (fichiers à produire)
- `products/<produit>/google-demand.md` — verdict demande (validée / insuffisante / non vérifiée), volume France, canal recommandé.

## Règles de décision
- Sous 10 000 recherches mensuelles France sur le mot-clé principal ou un cluster transactionnel pertinent : NO-GO sauf demande explicite.
- Données US interdites pour valider la France ; base Semrush = France.
- Trends ne remplace pas Semrush mais le complète.
- Cluster gonflé par requêtes informationnelles : invalide.
- `Shopping-first` exige une requête produit claire et une SERP Shopping active.
- `Search-first` exige une requête problème/désir et une landing page capable d'éduquer.
- `Both` exige les deux preuves, pas seulement une intuition.
- Pour Hakim, Semrush France via Kloow est attendu quand l'accès est disponible. Ne pas remplacer Semrush par une simple estimation web sans déclarer le blocage.

## Contraintes
- Toujours déclarer les limites d'accès.
- Vérifier Search, Shopping et Trends.

## Mode d'exécution
- Parallélisable : l'analyse oui (produits indépendants).
- Computer Use : oui SI Semrush via Kloow (session GUI unique → séquentiel, ne pas paralléliser).
- Dépendances outils : Google Trends/Search/Shopping (gratuit) ; Semrush via Kloow = attendu si accès Hakim disponible, fallback = Trends + SERP + sources gratuites avec statut `Semrush bloque/non autorise`.

## Brief délégable

```text
Rôle : Google Demand.
Pour chaque produit, vérifier Google Search, Google Shopping, Google Trends France sur 5 ans et Semrush France via Kloow si l'accès est disponible ou attendu.
Relever mot-clé principal, cluster transactionnel pertinent, volume mensuel France, CPC, intent, KD si disponible, saisonnalité, présence Shopping, qualité SERP et requêtes à exclure.
Classer le produit Shopping-first, Search-first ou Both.
Si le seuil 10 000 recherches mensuelles France n'est pas confirmé, marquer NO-GO ou demande explicite nécessaire.
Si Semrush/Kloow n'a pas été utilisé, expliquer précisément pourquoi dans le livrable et dans le weekly report.
```

## Format de livraison

| Produit | Mot-clé principal | Volume FR | Cluster FR | CPC | Intent | Trends | Shopping | Canal | Verdict |
|---|---:|---:|---:|---:|---|---|---|---|---|

## Handoff

| Champ | Contenu |
|---|---|
| Statut | prêt / bloqué / à reprendre |
| Données confirmées | volume FR, canal, verdict demande |
| Données incertaines | données sans accès Semrush, KD |
| Blocages | seuil 10 000 non confirmé éventuel |
| Étape suivante | Supplier Sourcing → `suppliers.md` |
