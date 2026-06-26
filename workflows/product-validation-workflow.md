# Product Validation Workflow

Chaîne des rôles : Product Hunter → Google Demand → Supplier Sourcing → Competitor Intelligence → Business Economics → Product Scorer → Weekly Decision → Gate 0.

Ce workflow valide une shortlist issue d'un run complet. Pour démarrer une nouvelle recherche, lire d'abord `docs/research-run-protocol.md` et créer `researches/<run>/research-run.md` avec `scripts/new_research.py`.

## 1. Intake — Product Hunter

Collecter pays, niches interdites, budget, prix cible, contraintes, outils disponibles et produits deja envisages.

Minimum attendu pour un run complet : 20 a 50 idees brutes et 5 produits a scorer, sauf justification documentee.

## 2. Anti-doublon — Product Hunter

Verifier Google Sheet et livrables locaux. Exclure synonymes, variantes, pluriels, accents et usages equivalents.

Sortie obligatoire :

| Produit | Statut anti-doublon | Decision |
|---|---|---|

## 3. Qualification Google — Google Demand

- Mot-cle produit.
- Cluster transactionnel.
- Trends France.
- Shopping actif.
- Search probleme/desir.
- Seuil 10 000 recherches mensuelles France.

Si le seuil echoue : arreter le produit ici et noter NO-GO, sauf exception explicite Hakim.

## 4. Faisabilite commerciale — Supplier Sourcing + Competitor Intelligence + Business Economics

- AliExpress tente (Supplier Sourcing).
- Fournisseur exploitable ou condition explicite.
- Concurrents DTC/specialises (Competitor Intelligence).
- Reperes marketplace separes.
- Marge et CAC (Business Economics).

Si le CAC max est trop bas pour Google Ads : NO-GO ou repositionnement avant scoring final.

## 5. Scoring — Product Scorer

Appliquer `docs/scoring-methodology.md`.

## 6. Decision — Weekly Decision

Creer `decision-brief.md` avec verdict, canal, these, risques, condition de GO et prochaines actions.

Le decision brief doit contenir la table `Verrous GO`. Sans cette table, Gate 0 est invalide.

## Exécution (parallèle / séquentiel / gates)

- **Séquentiel obligatoire** — session GUI unique, anti-bot : **AliExpress** (Supplier Sourcing) et **Semrush via Kloow** (Google Demand, si accès confirmé). Ne jamais lancer plusieurs sessions en parallèle sur ces outils.
- **Parallélisable** — une fois la demande collectée : **Competitor Intelligence** et **Business Economics** (raisonnement sur des données déjà réunies).
- **Gate 0 bloquante** : tant que `decision-brief.md` n'a pas la table `Verrous GO` et que `project-state.md` n'indique pas Gate 0 `valide par Hakim` (date + décision), le passage à la boutique reste interdit.
