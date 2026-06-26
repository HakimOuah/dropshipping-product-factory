# PLAYBOOK — Création d'une boutique Shopify mono-produit

Réf. design complet : `docs/superpowers/specs/2026-06-06-pipeline-creation-boutique-design.md`
(dépôt Bien Brûlé). Suivre les 6 phases. 3 portes de validation humaine.

## Principes obligatoires — mindset marketeur / développeur / e-commerçant

- **Explorer le thème avant de coder en dur** : auditer les sections, blocks, snippets, templates,
  settings et fonctionnalités natives disponibles. Réutiliser le thème et ses patterns avant
  d'ajouter du code custom. Coder en dur seulement si le thème ne permet pas le rendu ou le
  comportement voulu proprement.
- **CRO mobile-first permanent** : chaque page doit guider vers une action dominante, réduire la
  friction, traiter les objections et renforcer la confiance. Sur une fiche produit, le produit,
  le prix, les bénéfices clés, les garanties, la livraison, le paiement et l'ajout panier doivent
  être visibles dans un parcours mobile fluide.
- **Persona détaillé avant copywriting** : définir précisément qui achète, dans quel contexte,
  avec quelles douleurs, quelles envies, quels freins, quel niveau de connaissance du produit,
  quelles alternatives il compare et quel déclencheur émotionnel le fait passer à l'achat.
- **Vendre des bénéfices, pas seulement des caractéristiques** : chaque feature doit être traduite
  en bénéfice concret, douleur atténuée, gain de temps, confort, statut, sécurité, plaisir,
  économie ou transformation ressentie.
- **Copy orientée émotions + preuves sobres** : toucher les frustrations, aspirations et objections
  réelles du persona, sans fausse promesse, faux avis, fausse urgence, preuve sociale inventée ou
  allégation invérifiable. La conformité GMC/DGCCRF prime toujours.
- **Objections traitées avant l'achat** : prix, qualité, livraison, montage/usage, taille,
  compatibilité, retour, garantie, sécurité, entretien, durabilité et comparaison concurrente.
- **Concurrents comparables uniquement** : ne pas traiter Amazon, Darty, Decathlon, Fnac,
  marketplaces, grandes enseignes généralistes ou marques massives établies comme concurrents
  directs. Ils peuvent servir de repère prix/SERP, mais l'analyse CRO doit prioriser les boutiques
  DTC, mono-produit, DNVB, dropshipping ou e-commerce spécialisés qui vendent avec des mécaniques
  proches des nôtres.
- **Benchmark avec jugement critique** : ne jamais copier un concurrent parce qu'il existe. Évaluer
  la qualité réelle de sa page, de ses images, de son offre, de son copy, de sa hiérarchie, de sa
  crédibilité et de sa conformité. S'inspirer uniquement des éléments forts. Quand un concurrent
  est faible (page pauvre, images médiocres, copy générique, CTA confus, objections absentes,
  preuves douteuses, design peu premium), l'identifier comme opportunité et proposer comment faire
  mieux.
- **Un site doit donner envie et rassurer** : design premium cohérent, hiérarchie claire, images
  utiles, CTA lisible, réassurance proche de la décision, FAQ orientée freins d'achat.
- **Autonomie entre validations** : Codex agit comme marketeur, développeur et e-commerçant. Hakim
  valide les portes majeures ; Codex propose et exécute les détails opérationnels.

## Pré-requis manuels (avant de démarrer)
- Boutique Shopify créée (pas d'API) + thème Self Made/Fullstack installé + Shopify CLI connecté.
- Produit/fournisseur identifié ou piste produit fournie. Si des informations manquent, Codex les
  recherche ou les propose, puis les marque comme hypothèses à valider.

## Démarrage
`python3 scripts/new_boutique.py <nom-projet>` → crée le dossier projet avec livrables vierges.

Avant de démarrer, demander/remplir le brief d'entrée :
`templates/new-boutique-intake.template.md`.

Les champs peuvent rester vides quand ils doivent être déterminés par l'analyse
(concurrents, angle marketing, prix, positionnement, etc.).

Tenir à jour `project-state.md` à chaque porte majeure : phase actuelle, décisions validées,
hypothèses, blocages, accès Shopify, IDs/handles, assets finaux et prochaine action.

## Phase 1 — Recherche → `research-brief.md`
- 1a Découverte concurrents : partir du/des concurrent(s) fourni(s), élargir par recherche web,
  shortlist 4-6 (PAS de gate de validation). Écarter les grandes marketplaces/enseignes généralistes
  du benchmark principal ; les lister séparément seulement comme contexte prix/SERP si utile.
- 1b Analyse : recherche web + navigateur (Claude in Chrome). **Semrush désactivé** par défaut
  (n'activer que sur confirmation d'un essai actif).
- 1c Extraction fournisseur : specs/images/variantes.
- 1d Persona & psychologie d'achat : segmenter le client cible, contexte d'usage, douleurs,
  désirs, objections, alternatives, déclencheurs d'achat et langage client à reprendre dans le copy.
- 1e CRO concurrentielle approfondie : visiter les boutiques comparables et analyser leur façon de
  vendre, pas seulement leur présence. Relever structure de home/page produit, ordre des arguments,
  hero, offres, CTA, pricing, prix barrés, bundles, garanties, livraison, retours, FAQ, preuves,
  images, réassurance, urgency/scarcity, checkout/cart friction, objections traitées et angles
  émotionnels. Identifier ce qui convertit, ce qui paraît risqué/non conforme et les faiblesses
  exploitables. Pour chaque concurrent, séparer clairement : éléments à reprendre/adaptater,
  éléments à éviter, et opportunités où la future boutique peut faire mieux.
- 1f Économie & offre : calculer prix fournisseur livré, TVA récupérable ou non, prix TTC cible,
  marge HT, marge après IS, CAC break-even, panier moyen possible, bundles/accessoires et seuils
  de livraison. Raisonner en SASU/OH Ventures, HT, TVA au réel, IS.
- 1g Risque fournisseur : vérifier crédibilité vendeur, stock, expédition, délais, variantes,
  qualité des visuels, cohérence des specs, besoin de backup fournisseur et niveau de risque avant
  pub.

## Phase 2 — Marque & Charte → `brand-tokens.json` — **PORTE 1**
- 3 noms + baseline (angles distincts). Palette en CONTRASTE des concurrents. Typo Google Fonts.
- Positionnement : promesse centrale, ton de voix, niveau de gamme, émotion dominante, éléments de
  confiance et différenciation par rapport à la shortlist concurrente.
- Offre : définir la promesse d'achat, le prix psychologique, l'ancrage éventuel, les garanties,
  le bundle ou cross-sell, les bonus sobres et les raisons concrètes d'acheter chez nous plutôt que
  chez un concurrent.
- Valider : `python3 scripts/validate_tokens.py <projet>/brand-tokens.json`
- **PORTE 1** : l'utilisateur choisit le nom + valide palette/typo.
- Manuel : logo.

## Phase 3 — Structure → `sitemap.md` — **PORTE 2**
- Arbo + wireframes (liste de sections) + plan SEO. Logique 2-templates par défaut.
- Architecture CRO : ordre des sections pensé pour transformer un visiteur froid en acheteur
  rassuré (accroche, bénéfices, mécanisme produit, preuve/raison de croire, comparaison, offre,
  objections, FAQ, réassurance).
- Fiche produit : prioriser le parcours mobile, éviter les distractions avant l'ajout panier,
  placer les bénéfices et la réassurance près de la décision, garder un CTA dominant.
- Parcours d'achat : définir ce que chaque section doit faire psychologiquement (attirer,
  clarifier, désirer, prouver, comparer, rassurer, lever un frein, convertir). Supprimer toute
  section qui ne sert ni la compréhension, ni la confiance, ni la conversion.
- SEO utile : choisir les pages selon l'intention de recherche réelle, pas pour remplir le menu.
  Éviter les pages génériques pauvres ; préférer des pages qui répondent à des questions d'achat.
- **PORTE 2** : valider la structure avant tout contenu/build.

## Phase 4 — Contenus → `content/` + `shot-list.md`
- Copywriting (ton des tokens, 1 CTA/page), fiches produit conformes GMC, SEO on-page,
  ALT + SKU (voir `reference/naming-conventions.md`).
- Copy e-commerce : partir du persona et de ses douleurs. Transformer chaque caractéristique en
  bénéfice client, traiter les objections, écrire des titres orientés transformation et garder une
  promesse claire, crédible et spécifique.
- Pages produit : inclure bénéfices prioritaires, usage concret, comparaison concurrente honnête,
  specs utiles, livraison/retours/garantie, FAQ anti-objections et micro-copy de confiance.
- Émotion + conformité : utiliser le désir, la projection et le soulagement des frustrations sans
  fausses preuves sociales, faux avis, fausse rareté ou allégations non vérifiables.
- Visuels Option B : images fournisseur en placeholder, remplir `shot-list.md` avec prompts
  (voir `reference/image-prompt-guide.md`).
- Shot-list : chaque image doit avoir un rôle de vente clair (désir, compréhension, bénéfice,
  réassurance, comparaison, usage, détail produit). Éviter les visuels seulement décoratifs.
- Images générées : Codex peut rédiger les prompts, générer les visuels, sélectionner les meilleurs
  rendus, les sauvegarder dans `assets/final/`, puis les intégrer. Éviter le texte incrusté dans
  les images ; garder les titres et arguments en HTML/CSS pour lisibilité, SEO et contrôle.
- Qualité éditoriale : relire tout le contenu comme un acheteur sceptique. Si un titre pourrait
  s'appliquer à n'importe quel produit, le réécrire. Si une section n'ajoute pas de désir, de clarté
  ou de confiance, la supprimer ou la fusionner.

## Phase 5 — Build Shopify — **PORTE 3**
- Avant tout build : explorer le thème installé (sections, blocks, snippets, templates, settings,
  schémas JSON, possibilités de cross-sell, FAQ, rich text, custom code, galerie, badges,
  accordéons, sticky ATC). Documenter les options utiles avant de coder en dur.
- Appliquer la charte : `python3 scripts/tokens_to_theme.py <projet>/brand-tokens.json <theme>/config/settings_data.json`
- Monter les pages (sections Phase 3 + contenus Phase 4), créer produits/collections via MCP.
- Implémenter avec les capacités natives du thème autant que possible. Garder le code custom scoped,
  maintenable, performant et cohérent avec le design system existant.
- Vérifier mobile avant desktop : lisibilité, hiérarchie, CTA, sticky add-to-cart, vitesse perçue,
  absence de friction et ordre des arguments.
- Données Shopify : créer produits, variantes, collections, images, ALT, SEO, SKU, prix, stocks,
  publications canal, metafields utiles et cross-sell. Vérifier qu'un produit ACTIVE est bien publié
  sur la boutique en ligne.
- Ne pas pousser à l'aveugle : sauvegarder les fichiers modifiés, limiter les push `--only` quand
  possible, utiliser `--allow-live --nodelete` sur live, puis vérifier le rendu réel après push.
- Push live via Shopify CLI.
- **PORTE 3** : validation sur le site live (rendu réel). C'est ici qu'on juge les contenus.

## Phase 6 — Conformité & livraison
- Audit GMC : `reference/gmc-checklist.md` (corrections via MCP).
- Livraison FR/BE/CH : `reference/delivery-fr-be-ch.md` (deliveryProfileUpdate).
- Réglages manuels listés : SEO homepage (Online Store → Preferences), GTIN/MPN (app Google),
  pages légales (rédigées à la main).
- QA avant go-live : tester home, fiche produit, panier, checkout jusqu'à l'étape paiement, liens,
  images, mobile, desktop, prix, devises, JSON-LD, politiques, contact, tracking, pixels et pages
  404. Corriger avant ads.
- Tracking : vérifier GA4, Google Ads conversion, Merchant Center, flux produit, consentement/cookies
  si applicable et cohérence prix/stock entre Shopify et Google.
- Checklist go-live finale.

## Après go-live — apprentissage & itération
- Surveiller les premiers signaux : CTR annonces, CPC, taux de rebond, scroll, add-to-cart,
  checkout reached, conversion, requêtes Google Ads, refus GMC et retours clients.
- Prioriser les optimisations CRO selon les données : offre/prix, hero, bénéfices, images,
  objections, vitesse mobile, panier, livraison, FAQ ou confiance.
- Ne pas changer dix choses à la fois si la boutique reçoit déjà du trafic. Garder un journal des
  changements dans `project-state.md`.
