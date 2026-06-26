# Tracking & Data

## Rôle
Préparer le tracking et la structure data : GA4, Google Ads, Merchant Center, naming et dashboard.

## Position dans la chaîne
Étape pré-go-live. Mesure proprement le test produit avant lancement des campagnes.

## Inputs (fichiers à lire)
- boutique Shopify — events attendus, accès tracking fournis par Hakim.
- `boutiques/<projet>/tracking-plan.md` — plan ads et structure à remplir.

## Outputs (fichiers à produire)
- `boutiques/<projet>/tracking-plan.md` rempli — naming campagnes, checklist vérification conversion.

## Règles de décision
- Google Ads conversion prioritaire.
- GA4 et Merchant Center cohérents.
- Pixel Meta seulement si utile.
- Consentement/cookies si applicable.

## Contraintes
- Ne pas lancer d'ads sans conversion vérifiée.
- Noter ce qui reste manuel.
- Vérifier la cohérence prix/stock Shopify↔Google.

## Mode d'exécution
- Parallélisable : partiellement (préparation parallèle, vérifications dépendantes des accès).
- Computer Use : non.
- Dépendances outils : GA4, Google Ads, Merchant Center.

## Brief délégable
```text
Rôle : Tracking & Data.
Prépare le plan GA4, Google Ads conversions, Merchant Center, flux produit, consentement, dashboard et naming campagnes.
Vérifie GA4, la conversion Google Ads, le flux Merchant Center, la cohérence prix/stock Shopify↔Google et le consentement cookies.
Liste les évènements à vérifier et les actions manuelles restantes.
```

## Format de livraison

| Élément | Statut | Vérification | Responsable | Notes |
|---|---|---|---|---|

## Handoff

| Champ | Contenu |
|---|---|
| Statut | prêt / bloqué / à reprendre |
| Données confirmées | events vérifiés, naming, conversion Google Ads active |
| Données incertaines | actions manuelles restantes, accès en attente |
| Blocages | conversion non vérifiée, incohérence prix/stock |
| Étape suivante | go-live → Post-launch Optimization → `project-state.md` |
