# Guide d'orchestration

Comment piloter ce repo en autonomie avec des sous-agents (toute IA multi-agent). Les rôles (`agents/*.md`) sont les briefs ; les workflows (`workflows/*.md`) sont la feuille de route ; les gates restent des validations humaines.

## Format d'un rôle — `agents/*.md`

Chaque rôle a 10 sections fixes :
`Rôle` · `Position dans la chaîne` · `Inputs (fichiers à lire)` · `Outputs (fichiers à produire)` · `Règles de décision` · `Contraintes` · `Mode d'exécution` · `Brief délégable` · `Format de livraison` · `Handoff`.

- **Brief délégable** : le texte à passer tel quel à un sous-agent.
- **Mode d'exécution** : parallélisable ? Computer Use requis ? dépendances outils + fallback.
- **Handoff** : ce que le sous-agent doit renvoyer (statut, données, blocages) + l'étape suivante.

## Type de sous-agent

- **Lecture / audit / scoring** → sous-agent en lecture seule : Competitor Intelligence, Product Scorer, QA & Compliance. Certains outils nomment ce type `explorer`.
- **Écriture / exécution** → sous-agent qui modifie des fichiers : rédaction de contenu, build. Souvent nommé `worker`.

## Parallèle vs séquentiel

**Parallélisable (2 à 4 agents max)** — raisonnement « headless » :
- Competitor Intelligence, Business Economics, Product Scorer, Creative Ads, rédaction de contenu.

**Séquentiel obligatoire — un seul opérateur à la fois** :
- **AliExpress** et **Semrush via Kloow** : GUI partagée + anti-bot. Plusieurs sessions en parallèle aggravent le blocage (CAPTCHA, comportement robotique). Un agent, rythme humain.
- **Écritures Shopify sur une même ressource** (produits, thème, pages, menus). Les tâches disjointes peuvent se paralléliser (ex. A = contenu, B = tracking, C = QA), mais jamais deux écritures sur la même ressource.

Règle simple : deux agents ne partagent jamais la même fenêtre (Kloow, navigateur, AliExpress) ni le même fichier.

## Gates humaines

Matérialiser Gate 0/1/2/3 dans `project-state.md` avec statut `bloque` / `a valider` / `valide par Hakim` (+ date + décision). L'orchestrateur refuse d'avancer tant que la gate n'est pas `valide par Hakim`.

- Gate 0 : produit validé (après `decision-brief.md`).
- Gate 1 : nom, palette, typo, direction créative.
- Gate 2 : sitemap et structure.
- Gate 3 : rendu réel de la boutique avant tout budget publicitaire.

## Handoff

Chaque sous-agent renvoie : conclusions, fichiers modifiés, risques, recommandations. L'orchestrateur relit puis intègre dans le repo principal (idéalement via workspace/fork pour les sous-agents d'écriture).

## Feuille de route

Suivre les workflows comme séquence d'orchestration (rôle responsable + parallèle/séquentiel + gates sont indiqués dans chaque fichier) :

1. `workflows/product-validation-workflow.md` — recherche produit → Gate 0.
2. `workflows/post-validation-shopify-build-workflow.md` — build boutique (Gates 1-3).
3. `workflows/post-launch-optimization-workflow.md` — après lancement.

## Limites à garder en tête

- Computer Use (Mac/GUI) non fiable en parallèle → un seul opérateur, en série.
- Tokens/durée sur un pipeline long → découper en étapes avec checkpoints humains aux gates.
- Outils externes susceptibles de bloquer : Kloow, Semrush, AliExpress, Shopify.
- Ne jamais laisser deux agents écrire les mêmes fichiers.
