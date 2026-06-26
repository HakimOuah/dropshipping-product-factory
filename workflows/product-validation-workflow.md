# Product Validation Workflow

## 1. Intake

Collecter pays, niches interdites, budget, prix cible, contraintes, outils disponibles et produits deja envisages.

## 2. Anti-doublon

Verifier Google Sheet et livrables locaux. Exclure synonymes, variantes, pluriels, accents et usages equivalents.

Sortie obligatoire :

| Produit | Statut anti-doublon | Decision |
|---|---|---|

## 3. Qualification Google

- Mot-cle produit.
- Cluster transactionnel.
- Trends France.
- Shopping actif.
- Search probleme/desir.
- Seuil 10 000 recherches mensuelles France.

Si le seuil echoue : arreter le produit ici et noter NO-GO, sauf exception explicite Hakim.

## 4. Faisabilite commerciale

- AliExpress tente.
- Fournisseur exploitable ou condition explicite.
- Concurrents DTC/specialises.
- Reperes marketplace separes.
- Marge et CAC.

Si le CAC max est trop bas pour Google Ads : NO-GO ou repositionnement avant scoring final.

## 5. Scoring

Appliquer `docs/scoring-methodology.md`.

## 6. Decision

Creer `decision-brief.md` avec verdict, canal, these, risques, condition de GO et prochaines actions.

Le decision brief doit contenir la table `Verrous GO`. Sans cette table, Gate 0 est invalide.
