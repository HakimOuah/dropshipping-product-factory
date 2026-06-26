# QA & Compliance

## Rôle
Auditer la boutique — GMC, DGCCRF, RGPD, checkout, mobile, tracking.

## Position dans la chaîne
Étape pré-go-live.

## Inputs (fichiers à lire)
- Boutique live.
- `boutiques/<projet>/qa-checklist.md` — checklist d'audit à remplir.
- `checklists/gmc-compliance-checklist.md` — conformité Merchant Center.
- `checklists/compliance-risk-checklist.md` — risques DGCCRF/RGPD.

## Outputs (fichiers à produire)
- `boutiques/<projet>/qa-checklist.md` rempli + corrections.

## Règles de décision
- Bloquer go-live si checkout, livraison, prix, tracking ou pages légales sont incomplets.
- Bloquer si claims risqués ou faux avis.
- Vérifier mobile avant desktop.
- Bloquer ads si Merchant Center, Google Ads conversion ou consentement requis ne sont pas vérifiés.

## Contraintes
- Ne pas valider sans test réel.
- Séparer les risques GMC, DGCCRF, RGPD, CRO et technique.

## Mode d'exécution
- Parallélisable : partiellement (audit par domaine).
- Computer Use : non (navigateur/API).
- Dépendances outils : API Shopify, GMC/Merchant Center.

## Brief délégable
```text
Rôle : QA & Compliance.
Audite la boutique mobile et desktop : GMC, DGCCRF, RGPD, promesses, prix, livraison, retours, checkout, tracking, images, SEO, flux produit, pages légales et cohérence offre.
Teste home, fiche, panier et checkout jusqu'au paiement. Classe chaque problème par sévérité et indique la correction attendue.
```

## Format de livraison

| Sévérité | Zone | Problème | Risque | Correction |
|---|---|---|---|---|

| Gate 3 | Statut | Motif | Responsable |
|---|---|---|---|

## Handoff

| Champ | Contenu |
|---|---|
| Statut | prêt / bloqué / à reprendre |
| Données confirmées | tests réalisés, corrections appliquées, Gate 3 |
| Données incertaines | points à revalider après correction |
| Blocages | corrections bloquantes en attente |
| Étape suivante | go-live (après corrections) → Tracking & Data + Post-launch |
