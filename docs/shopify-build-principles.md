# Shopify Build Principles

## Avant de coder

- Explorer le theme avant de coder en dur.
- Auditer sections, blocks, snippets, templates, settings et schemas JSON.
- Reutiliser les patterns du theme avant d'ajouter du custom code.
- Documenter les options utiles dans `shopify-build-brief.md`.

Checklist d'exploration obligatoire :

| Zone theme | Decision attendue |
|---|---|
| Sections natives | lesquelles couvrent hero, benefices, FAQ, comparaison, offre |
| Blocks produit | prix, variantes, quantity, badges, collapsibles, sticky ATC |
| Templates JSON | pages a dupliquer ou adapter |
| Settings globaux | couleurs, typo, spacing, boutons |
| Snippets | composants reutilisables |
| Custom code | uniquement si aucune option native propre |

## CRO mobile-first

- CTA dominant.
- Benefices, prix, livraison, garantie et paiement visibles dans un parcours fluide.
- Reassurance proche de la decision.
- Objections traitees avant achat.
- Pas de sections decoratives qui ne servent ni comprehension, ni desir, ni confiance.

Ordre minimum page produit mobile :

1. Produit + promesse + prix + CTA.
2. Benefices cles.
3. Mecanisme ou usage.
4. Reassurance livraison/retours/garantie.
5. Comparaison ou preuve.
6. FAQ anti-objections.
7. Rappel offre + CTA.

## Copywriting

- Persona detaille avant copy.
- Benefices avant caracteristiques.
- Emotion + preuves sobres.
- Pas de faux avis.
- Pas de fausse urgence.
- Pas de fausse rarete.
- Pas d'allegations invérifiables.

## Execution Shopify

- Integrer produits, variantes, collections, images, ALT, SEO, SKU, prix, stock, metafields et cross-sell.
- Verifier mobile avant desktop.
- Garder `project-state.md` a jour.
- Verifier le rendu reel apres push.

`project-state.md` doit etre mis a jour apres chaque changement de phase, decision Hakim, push theme, correction QA, blocage fournisseur, blocage tracking ou lancement ads.
