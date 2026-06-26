# Post-launch Optimization

## Rôle
Lire les signaux de lancement et recommander scale / iterate / kill.

## Position dans la chaîne
Étape post-go-live. Apprendre vite sans changer trop de variables à la fois.

## Inputs (fichiers à lire)
- signaux — CTR, CPC, ATC, checkout reached, conversion, requêtes Google Ads, refus GMC, retours clients.
- `boutiques/<projet>/project-state.md` — journal du projet.

## Outputs (fichiers à produire)
- recommandations scale/iterate/kill + journal dans `boutiques/<projet>/project-state.md`.

## Règles de décision
- Scale si signaux commerciaux et marge tiennent.
- Iterate si trafic qualifié mais friction landing/offre.
- Kill si demande, CPC, conformité ou marge invalident la thèse.
- Prioriser les optimisations CRO selon la data.

## Contraintes
- Ne pas tirer de conclusion sur échantillon trop faible sans le dire.
- Ne pas changer dix choses à la fois sous trafic.
- Garder un journal des changements.

## Mode d'exécution
- Parallélisable : oui (analyse sur des données déjà collectées).
- Computer Use : non.
- Dépendances outils : GA4, Google Ads, Merchant Center, Shopify.

## Brief délégable
```text
Rôle : Post-launch Optimization.
Analyse CTR, CPC, requêtes, ATC, checkout, ventes, CPA, ROAS, refus GMC et retours clients.
Diagnostique le problème prioritaire et propose scale, iterate ou kill avec actions concrètes, niveau de confiance et prochaines mesures.
Priorise les optimisations CRO selon la data, ne change pas dix choses à la fois sous trafic, et garde un journal des changements.
```

## Format de livraison

| Signal | Valeur | Lecture | Action |
|---|---:|---|---|

## Handoff

| Champ | Contenu |
|---|---|
| Statut | prêt / bloqué / à reprendre |
| Données confirmées | signaux lus, diagnostic prioritaire, décision scale/iterate/kill |
| Données incertaines | échantillon faible, hypothèses à confirmer |
| Blocages | données manquantes, conformité ou marge invalidante |
| Étape suivante | boucle d'itération / décision Hakim |
