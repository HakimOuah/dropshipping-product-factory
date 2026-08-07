# Product Candidate

## Identite

- Produit : Tapis de marche pliable / walking pad compact
- Variante/angle : tapis de marche sous bureau, compact, inclinable ou extra-plat pour appartement
- Source : Google-first France, SERP commerciales, Google Trends France via pytrends
- Canal pressenti : Both
- Statut anti-doublon : non doublon local confirme ; Google Sheet non consulte

## Anti-doublon

| Produit | Statut anti-doublon | Decision |
|---|---|---|
| Tapis de marche pliable / walking pad | Non present dans `products/` hors exemple ; non mentionne dans le contexte historique fourni | Continuer avec verrou Google Sheet |
| Bureau assis debout | Produit associe mais different ; contexte precedent mentionne "bureau" donc a exclure comme produit principal | Ne pas traiter |
| Tapis de course classique | Parent category, plus sportif et concurrentiel | Garder comme cluster / repere, pas comme produit |

## These courte

Pour actifs sedentaires en appartement qui veulent marcher plus sans salle de sport ni gros tapis de course, vendre un tapis de marche compact et silencieux comme une solution quotidienne de mouvement doux, contrairement aux marketplaces qui vendent surtout une fiche prix/specs peu rassurante.

## Qualification rapide

| Question | Reponse |
|---|---|
| Probleme ou desir clair | Oui : sedentiarite, teletravail, manque de temps, envie de marcher a domicile |
| Persona identifiable | Teletravailleurs, personnes en appartement, debutants fitness, personnes cherchant une activite douce |
| Demande Google plausible | Forte : Trends France 52 semaines eleve sur "tapis de marche" ; SERP commerciale active |
| Prix TTC probable | 249 a 399 EUR selon puissance, inclinaison, connectivite |
| Marge pressentie | Possible si cout livre <= 160 EUR et prix >= 299 EUR |
| Fournisseur plausible | Oui en theorie sur AliExpress/Alibaba/CJ/BigBuy, mais non verrouille |
| Differenciation possible | Silence, compact, anti-vibration, usage bureau debout, guide d'installation, garantie, SAV France |
| Risque principal | Produit electrique lourd, SAV/retours, guerre prix marketplaces, conformite CE/notice |

## Idees brutes coupees

| Produit | Raison de coupe |
|---|---|
| Tapis de course sportif grand format | Trop lourd, logistique/SAV plus risquee, concurrence enseignes fitness |
| Bureau assis debout bundle complet | Risque doublon avec contexte precedent et panier/logistique plus complexe |
| Accessoires de fitness bas prix | Panier trop faible pour Google Ads |

## Decision

- Continuer : oui, en recherche approfondie conditionnelle
- Raison : demande Google et intention Shopping/Search plausibles, panier compatible Google Ads, mais Gate 0 impossible sans volume France exact et sourcing fournisseur valide.

## Handoff

| Champ | Contenu |
|---|---|
| Statut | pret pour Google Demand, avec anti-doublon Google Sheet incomplet |
| Donnees confirmees | non present dans repo local ; Trends France via pytrends ; SERP commerciale partiellement observee |
| Donnees incertaines | volume mensuel France exact, CPC, KD, fournisseur exploitable, taux de retour |
| Blocages | Google Sheet non consulte ; Semrush/Kloow non confirme ; AliExpress GUI non tente |
| Etape suivante | Google Demand -> `google-demand.md` |
