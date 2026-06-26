# Post-validation Shopify Build Workflow

Declenchement : Gate 0 validee.

Si Gate 0 n'est pas marquee `valide par Hakim` dans `project-state.md`, le workflow reste bloque.

Rôles : Offer & Brand (Phase 2), Shopify Store Builder (Phase 5), QA & Compliance + Tracking & Data (Phase 6).

## Phase 1 — Recherche

Creer `research-brief.md` : concurrents, fournisseur, persona, psychologie, CRO, economie, risques.

## Phase 2 — Marque & charte — Offer & Brand

Creer `brand-tokens.json` avec 3 noms, baseline, palette, typo, ton, promesse, offre.

Gate 1 : Hakim valide.

Avant Gate 1, ne produire que des options. Apres Gate 1, ecrire la direction choisie dans `project-state.md`.

## Phase 3 — Structure

Creer `sitemap.md` : arborescence, wireframes, SEO, ordre CRO, fiche produit.

Gate 2 : Hakim valide.

Avant Gate 2, pas de copy final et pas d'integration theme.

## Phase 4 — Contenus

Creer contenu page, fiches produits, FAQ, ALT/SKU, prompts visuels, `shot-list.md`.

## Phase 5 — Build Shopify — Shopify Store Builder

Explorer le theme avant custom code. Construire mobile-first. Integrer produits, variantes, images, SEO, prix, stock, metafields.

Gate 3 : Hakim valide le rendu reel.

Avant Gate 3, pas de lancement ads et pas de budget publicitaire.

## Phase 6 — Go-live — QA & Compliance + Tracking & Data

QA, GMC, pages legales, livraison, checkout, tracking, flux produit, consentement, ads.

## Exécution (parallèle / séquentiel / gates)

- **Parallélisable** : création produits/collections/pages via l'API Shopify (Phase 5) et préparation des contenus (Phase 4).
- **Séquentiel** : explorer le thème installé avant tout code custom ; vérifier le rendu live après chaque push.
- **Gates bloquantes** : Gate 1 (avant tout copy/intégration), Gate 2 (avant build), Gate 3 (avant tout lancement ads/budget). Aucune phase ne démarre tant que la gate précédente n'est pas `valide par Hakim` dans `project-state.md`.
