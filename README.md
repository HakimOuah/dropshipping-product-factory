# Dropshipping Product Factory

Repository operationnel pour detecter, scorer et lancer des produits dropshipping testables via Google Ads France, puis construire une boutique Shopify mono-produit apres validation humaine.

Ce repo structure deux playbooks canoniques :

- `PRODUCT-RESEARCH-PLAYBOOK.md` : recherche produit Google-first, shortlist GO / MAYBE / NO-GO.
- `PLAYBOOK.md` : creation d'une boutique Shopify mono-produit en 6 phases.

## Principes non negociables

- Marche par defaut : France.
- Langue : francais.
- Business : SASU / OH Ventures.
- Raisonnement financier : HT, TVA au reel, IS.
- Canal prioritaire : Google Ads, principalement Google Shopping + Google Search.
- Rythme vise : 1 a 2 produits testes par semaine.
- Un produit n'est shortlistable que si le mot-cle principal ou un cluster transactionnel pertinent atteint au moins 10 000 recherches mensuelles France.
- Ne jamais valider un produit France avec des donnees United States.
- Chaque produit note doit avoir une tentative de sourcing AliExpress via Computer Use.
- Les marketplaces et grandes enseignes servent de reperes, pas de concurrents directs.
- Aucun agent ne franchit Gate 0, Gate 1, Gate 2 ou Gate 3 sans validation explicite d'Hakim.
- Un score eleve ne compense jamais un blocage eliminatoire : demande France insuffisante, fournisseur non exploitable, marge trop faible, conformite risquee ou doublon non motive.
- Un livrable incomplet bloque l'agent suivant. Il doit etre marque `bloque`, pas rempli par supposition.

## Chaine de livrables

| Ordre | Agent | Fichier produit | Condition de passage |
|---:|---|---|---|
| 1 | Product Hunter | `raw-findings.md` | anti-doublon Google Sheet fait ou blocage declare |
| 2 | Google Demand | `google-demand.md` | seuil France 10 000 confirme ou verdict NO-GO |
| 3 | Supplier Sourcing | `suppliers.md` | fournisseur exploitable, backup ou condition de GO explicite |
| 4 | Competitor Intelligence | `competitors.md` | DTC/specialises separes des marketplaces |
| 5 | Business Economics | `business-economics.md` | CAC break-even compatible Google Ads ou repositionnement |
| 6 | Product Scorer | `scorecard.md` | penalites automatiques appliquees |
| 7 | Weekly Decision | `decision-brief.md` | Gate 0 prete pour Hakim |

Si une condition de passage echoue, le verdict maximum est `MAYBE` si la condition est levable, sinon `NO-GO`.

## Deux pipelines

### 1. Pipeline recherche produit

Objectif : passer de 20 a 50 idees brutes a 1 a 3 theses produit defendables.

Livrables principaux :

- `products/<date-nom>/raw-findings.md`
- `products/<date-nom>/google-demand.md`
- `products/<date-nom>/suppliers.md`
- `products/<date-nom>/competitors.md`
- `products/<date-nom>/business-economics.md`
- `products/<date-nom>/scorecard.md`
- `products/<date-nom>/decision-brief.md`

Chaque produit doit etre classe :

- `Shopping-first` : requete produit claire, produit visuel, Shopping actif, faible besoin d'education.
- `Search-first` : requetes probleme/solution, besoin de pedagogie, landing page persuasive utile.
- `Both` : requete produit claire et angle probleme/desir exploitable en Search.

La classification n'est pas decorative : elle decide le type de page, le type d'annonce, le niveau de preuve et le budget test.

### 2. Pipeline boutique Shopify

Objectif : transformer un produit valide en boutique mono-produit Shopify prete a tester.

Phases :

1. Recherche -> `research-brief.md`
2. Marque & charte -> `brand-tokens.json` -> Gate 1
3. Structure -> `sitemap.md` -> Gate 2
4. Contenus -> `content/` + `shot-list.md`
5. Build Shopify -> Gate 3
6. Conformite, livraison, tracking, go-live

## Workflow hebdomadaire

| Jour | Travail | Sortie attendue |
|---|---|---|
| Lundi | 20 a 50 idees, exclusions, anti-doublon | idees compatibles Google Ads France |
| Mardi | Google Demand, Trends, Shopping/Search, Semrush France si disponible | shortlist 5 produits |
| Mercredi | AliExpress, concurrents DTC, economie | dossiers produits complets |
| Jeudi | scoring, offre, decision brief | GO / MAYBE / NO-GO + Gate 0 |
| Vendredi | si GO : pre-requis humains + lancement boutique | dossier boutique initialise |
| Week-end/lundi | QA, tracking, preparation ads | lancement ou iteration |

## Google Sheet obligatoire

A chaque recherche produit, creer une feuille dans :

https://docs.google.com/spreadsheets/d/1L-SLQrpzEIK07eBUqS1Q9C6sbl398TU8e5Xm4DK7JAU/edit?gid=0#gid=0

Nom :

- `recherche YYYY-MM-DD`
- `recherche YYYY-MM-DD 2` si une feuille existe deja ce jour-la.

Si l'acces est bloque, livrer le tableau localement dans le repo ou dans la conversation et signaler explicitement que la mise a jour Google Sheet reste a faire.

## Agents

| Agent | Role |
|---|---|
| Product Hunter | Cherche 20 a 50 idees, filtre les produits faibles, applique l'anti-doublon |
| Google Demand | Verifie France : Trends, Search, Shopping, Semrush si disponible |
| Product Scorer | Applique la grille sur 100 et les penalites automatiques |
| Supplier Sourcing | Verifie AliExpress via Computer Use et recommande backup |
| Competitor Intelligence | Analyse DTC/specialises et separe marketplaces en reperes |
| Business Economics | Calcule prix TTC, CA HT, marge HT, IS, CAC break-even, budget test |
| Offer & Brand | Cree persona, promesse, noms, charte, offre, objections, FAQ |
| Shopify Store Builder | Construit apres gates humaines selon `PLAYBOOK.md` |
| Creative Ads | Prepare hooks, briefs creatifs et angles, avec Google prioritaire |
| Tracking & Data | Prepare GA4, Google Ads, Merchant Center, naming et dashboard |
| QA & Compliance | Audite GMC, DGCCRF, RGPD, checkout, mobile, tracking |
| Weekly Decision | Produit le brief final de decision |
| Post-launch Optimization | Lit les signaux de lancement et propose scale / iterate / kill |

## Gates humaines

- Gate 0 : Hakim valide ou refuse le produit apres `decision-brief.md`.
- Gate 1 : Hakim choisit nom, palette, typo, positionnement et direction creative.
- Gate 2 : Hakim valide sitemap, sections, wireframes et logique CRO.
- Gate 3 : Hakim valide le rendu reel Shopify apres build.

Actions humaines restantes : adresse email, compte Shopify, domaine, moyens de paiement, acces admin, validation produit, validation fournisseur, commande echantillon, validation juridique/commerciale, logo final si necessaire, lancement budget publicitaire.

Regle de verrouillage : tant que la ligne correspondante dans `project-state.md` n'indique pas `valide par Hakim` avec date et decision, l'etape suivante reste bloquee.

## Creer une nouvelle recherche produit

```bash
python3 scripts/new_product.py "nom produit ou theme"
```

Exemple :

```bash
python3 scripts/new_product.py "miroir salle de bain antibuée"
```

## Creer une boutique apres validation produit

```bash
python3 scripts/new_boutique.py "nom-boutique"
```

Exemple :

```bash
python3 scripts/new_boutique.py "lumora-bain"
```

## Lire un decision brief

Verifier dans cet ordre :

1. Le seuil France 10 000 recherches mensuelles est confirme ou l'exception est explicite.
2. Le canal recommande est coherent : Shopping, Search ou Both.
3. Le fournisseur AliExpress est exploitable ou le GO est conditionnel.
4. La these de differenciation tient en une phrase claire.
5. Le CAC break-even laisse respirer Google Ads.
6. Les concurrents directs sont bien DTC/specialises, pas seulement Amazon ou grandes enseignes.
7. Les risques et conditions de GO sont ecrits sans maquillage.

## Decisions GO / MAYBE / NO-GO

- `GO deep research` : score 80+, demande France validee, fournisseur exploitable, marge viable, these claire.
- `MAYBE` : score 65-79, potentiel reel mais condition bloquante a lever.
- `NO-GO` : score <65 ou penalite automatique : volume France insuffisant, fournisseur non exploitable, produit rincé, claims risqués, marge trop basse, doublon non motive.

Le verdict `GO` exige en plus :

- pas de blocage Google Demand ;
- pas de blocage fournisseur ;
- pas de blocage marge/CAC ;
- pas de blocage conformite ;
- pas de blocage anti-doublon ;
- une these de differenciation en une phrase ;
- une condition de lancement claire si un risque reste ouvert.
