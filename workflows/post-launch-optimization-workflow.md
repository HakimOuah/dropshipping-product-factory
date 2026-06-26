# Post-launch Optimization Workflow

Rôle responsable : Post-launch Optimization.

## Cadence de revue

Revue à J+1, J+3 et J+7 après le lancement, puis hebdomadaire. Ne pas juger un signal avant d'avoir assez de clics/données pour décider.

## Signaux a suivre

- CTR annonces.
- CPC.
- Requetes Google Ads.
- Taux de rebond.
- Scroll.
- Add to cart.
- Checkout reached.
- Conversion.
- CPA.
- ROAS.
- Refus Merchant Center.
- Retours clients.
- Questions support.

## Decisions

| Decision | Conditions |
|---|---|
| Scale | CTR correct, CPC acceptable, ATC et checkout coherents, ventes ou CPA proche cible |
| Iterate | trafic qualifie mais friction hero/offre/prix/images/livraison/FAQ |
| Kill | CPC trop cher, faible intention, aucun ATC, marge impossible, refus GMC structurel |

## Regle

Ne pas modifier dix choses a la fois. Journaliser chaque changement dans `project-state.md`.

## Journal d'iteration

| Date | Signal | Hypothese | Changement | Resultat attendu | Revue |
|---|---|---|---|---|---|

## Exécution

- **Parallélisable** : la lecture des signaux par source (Google Ads, GA4, Merchant Center, Shopify) peut se faire en parallèle.
- **Séquentiel** : un seul changement majeur à la fois sous trafic, journalisé dans `project-state.md` avant d'en lancer un autre.
