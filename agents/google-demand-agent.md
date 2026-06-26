# Google Demand

## Rôle
Vérifier la demande Google France (Trends, Search, Shopping, Semrush via l'application Mac Kloow si accès confirmé/disponible) et recommander Shopping-first, Search-first ou Both.

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
- Kloow doit etre ouvert via l'application Mac Kloow. Ne pas ouvrir Kloow dans un navigateur web classique.
- Si Semrush est indisponible dans Kloow, lancer Ahrefs via Kloow comme fallback.

## Contraintes
- Toujours déclarer les limites d'accès.
- Vérifier Search, Shopping et Trends.

## Mode d'exécution
- Parallélisable : l'analyse oui (produits indépendants).
- Computer Use : oui SI Semrush/Ahrefs via Kloow (application Mac + session GUI unique → séquentiel, ne pas paralléliser).
- Dépendances outils : Google Trends/Search/Shopping (gratuit) ; Semrush via application Mac Kloow = attendu si accès Hakim disponible ; Ahrefs via Kloow = fallback si Semrush indisponible ; fallback final = Trends + SERP + sources gratuites avec statut `Semrush/Ahrefs bloque/non autorise`.

### Protocole Kloow obligatoire

1. Ouvrir l'application Mac **Kloow**.
2. Cliquer **Login** si l'ecran de connexion apparait.
3. Chercher `semrush` dans la barre de recherche interne Kloow.
4. Cliquer **Launch** sur la carte Semrush.
5. Utiliser Semrush dans la fenetre **Kloow Browser**.
6. Regler Semrush sur **France**.
7. Si Semrush est absent/indisponible/bloque : revenir dans l'application Mac Kloow, chercher `ahrefs`, cliquer **Launch**, utiliser Ahrefs dans Kloow Browser et regler France quand disponible.

## Brief délégable

```text
Rôle : Google Demand.
Pour chaque produit, vérifier Google Search, Google Shopping, Google Trends France sur 5 ans et Semrush France via l'application Mac Kloow si l'accès est disponible ou attendu.
Ne jamais ouvrir Kloow dans un navigateur classique. Ouvrir l'application Mac Kloow, cliquer Login si nécessaire, chercher Semrush, cliquer Launch, puis utiliser la fenêtre Kloow Browser.
Si Semrush n'est pas disponible dans Kloow, chercher Ahrefs dans Kloow, cliquer Launch et utiliser Ahrefs comme fallback France.
Relever mot-clé principal, cluster transactionnel pertinent, volume mensuel France, CPC, intent, KD si disponible, saisonnalité, présence Shopping, qualité SERP et requêtes à exclure.
Classer le produit Shopping-first, Search-first ou Both.
Si le seuil 10 000 recherches mensuelles France n'est pas confirmé, marquer NO-GO ou demande explicite nécessaire.
Si Semrush/Kloow et Ahrefs/Kloow n'ont pas été utilisés, expliquer précisément pourquoi dans le livrable et dans le weekly report.
```

## Format de livraison

| Produit | Mot-clé principal | Volume FR | Cluster FR | CPC | Intent | Trends | Shopping | Canal | Verdict |
|---|---:|---:|---:|---:|---|---|---|---|---|

## Handoff

| Champ | Contenu |
|---|---|
| Statut | prêt / bloqué / à reprendre |
| Données confirmées | volume FR, canal, verdict demande |
| Données incertaines | données sans accès Semrush/Ahrefs, KD |
| Blocages | seuil 10 000 non confirmé éventuel |
| Étape suivante | Supplier Sourcing → `suppliers.md` |
