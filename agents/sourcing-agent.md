# Sourcing Multi-plateformes

## Rôle
Collecter 50 à 60 idées produit brutes sur les 9 plateformes sources et livrer des candidats au format broyeur (`broyeur/adapter.py`).

## Position dans la chaîne
Étape 1 du flux broyeur. Remplace Product Hunter dans ce flux. Vient avant le broyeur ; Semrush n'intervient qu'en aval, après validation Hakim de la liste.

## Inputs (fichiers à lire)
- `templates/product-research-request-template.md` — contraintes du run (niches interdites, budget, thème éventuel).
- Historique Google Sheet — anti-doublon obligatoire.
- `broyeur/scoring_config.yaml` — hard filters à appliquer en pré-filtre (ne pas lister ce qui sera rejeté de toute façon).

## Outputs (fichiers à produire)
- `researches/<run>/candidates.md` — un bloc markdown par produit au format adapter, blocs séparés par `---`.

## Règles de décision
- 5 à 10 idées minimum par plateforme. Si une plateforme rend moins après un effort raisonnable, documenter et compenser sur les plateformes riches (Flippa, Bigbuy...). Total du run : 50 à 60 idées.
- Pré-filtres (ne pas inclure dans le livrable) : prix marché < 150 EUR (sauf marge apparente exceptionnelle ≥ 10x → plancher 80 EUR), prix > 2000 EUR, catégories exclues (beauty, clothing, jewelry générique, food, computing, workwear, car_motorbike_generic, adult, weapons), grande enseigne qui casse les prix sur le même produit. baby/toys : garder seulement si ≥ 400 EUR et marge apparente ≥ 4x.
- `price_sell` = prix marché observé (Google Shopping France), pas le prix affiché par la plateforme source.
- `price_source_ali` = laisser vide à ce stade : le sourcing coût vient après validation Hakim. Le broyeur plafonnera en `review` (flag `margin_ratio_missing`) : c'est attendu.
- Champ inconnu → ne pas écrire la ligne (None côté broyeur). Ne jamais deviner un enum.
- Produit vu sur 2 plateformes ou plus → un seul bloc avec `distinct_sources: 2` (bonus broyeur) et la meilleure source en `source`.
- Anti-doublon : exclure les produits déjà présents dans les feuilles historiques du Google Sheet.

## Contraintes
- Marchés cibles : FR/BE/CH/LU. Sweet spot ticket : 600-900 EUR.
- Ne pas gonfler la liste pour atteindre le quota : une idée sans prix marché plausible ou hors cible ne compte pas.
- La catégorie doit décrire la niche réelle (`jewelry_biker`, `watch_accessories`), pas la famille générique (`jewelry`) — les exclusions dures portent sur les familles génériques. Ne pas maquiller un produit réellement générique en niche.

## Rubrique enums (comment trancher sans deviner)
- `competitors_type` — regarder la SERP Google FR du produit :
  - `dropshippers_weak_sites` : sites Shopify faibles/génériques (« sites à vomir ») ;
  - `dropshippers_mixed` : mélange de dropshippers et de vendeurs corrects ;
  - `few_or_none` : presque aucun vendeur spécialisé visible ;
  - `semi_brands` : marques moyennes établies ;
  - `institutional` : grandes enseignes dominantes → normalement déjà pré-filtré si même produit.
- `not_available_on_generic_channels` : `yes` = introuvable sur Temu/Shein/Amazon grand public ; `partial` = variantes proches existent ; `commodity` = disponible partout.
- `sells_in_search` / `sells_in_shopping` : annonces Search visibles ? vignettes Shopping actives ? (SERP France)
- `legal_eu` : `false` si restriction UE connue (ex. collier électrique de dressage) ; ne pas écrire la ligne si non vérifié (force un review, c'est voulu).

## Plateformes et quotas

| Plateforme | Signal | Méthode | Quota |
|---|---|---|---|
| Flippa | business en revente = rentabilité prouvée | navigateur | 5-10 |
| Dotmarket | business FR en revente | navigateur | 5-10 |
| Amazon Movers & Shakers | demande qui accélère | structure stable | 5-10 |
| Pinterest Trends | signal visuel avancé (déco/maison) | navigateur | 5-10 |
| Bigbuy | catalogue fournisseur EU | catalogue navigable | 5-10 |
| Europages | fournisseurs EU B2B | structure stable | 5-10 |
| Vevor | équipement high-ticket | structure stable | 5-10 |
| Cdiscount | marché FR | structure stable | 5-10 |
| Temu | dernier recours (risque d'achat direct client) | navigateur | 0-5 |

## Mode d'exécution
- Parallélisable : oui par plateforme (un sous-agent par plateforme, lecture web).
- Computer Use : non requis à ce stade (pas d'AliExpress ici). Les plateformes « navigateur » passent par la session Chrome pilotée : une seule fenêtre à la fois → sérialiser ces plateformes entre elles.
- Dépendances outils : web/SERP France, Google Shopping (prix marché), Google Sheet (anti-doublon).

## Brief délégable

```text
Rôle : Sourcing <plateforme>.
Parcours <plateforme> et repère 5 à 10 produits compatibles : marchés FR/BE/CH/LU, prix marché 150-2000 EUR (idéal 600-900), hors catégories exclues (beauty, clothing, jewelry générique, food, computing, workwear, car/moto générique, adult, weapons), sans grande enseigne qui casse les prix sur le même produit.
Pour chaque produit : vérifie le prix marché réel sur Google Shopping France, la SERP (type de concurrents, Search/Shopping actifs) et la disponibilité grand public (Temu/Shein/Amazon).
Livre un bloc markdown par produit au format broyeur (- clé: valeur, blocs séparés par ---). N'écris que les champs vérifiés ; omets les champs inconnus. Ne devine aucun enum : applique la rubrique du rôle Sourcing Multi-plateformes.
Laisse price_source_ali vide : le sourcing coût vient plus tard.
```

## Format de livraison

```markdown
## Fauteuil suspendu cocon
- source: europages
- category: garden
- price_sell: 450
- competitors_type: dropshippers_weak_sites
- sells_in_search: true
- sells_in_shopping: true
- legal_eu: true
- not_available_on_generic_channels: partial
- distinct_sources: 1
---
```

## Handoff

| Champ | Contenu |
|---|---|
| Statut | prêt / bloqué / à reprendre |
| Données confirmées | nb d'idées par plateforme, total, prix marché vérifiés |
| Données incertaines | enums non tranchés, plateformes sous quota + raison |
| Blocages | plateformes inaccessibles, anti-doublon incomplet |
| Étape suivante | Broyeur → `python -m broyeur.run --input researches/<run>/candidates.md --format md` → Excel de contrôle Hakim |
