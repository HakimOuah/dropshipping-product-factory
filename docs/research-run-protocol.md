# Research Run Protocol

Ce protocole est le point d'entree obligatoire quand Hakim demande : "lance une nouvelle recherche produit".

## Definition d'une recherche produit

Une recherche produit n'est pas l'analyse d'un seul produit. C'est un run complet :

1. Creer un dossier de run dans `researches/YYYY-MM-DD-<theme>`.
2. Creer ou ouvrir la feuille Google Sheet `recherche YYYY-MM-DD`.
3. Consulter l'historique pour anti-doublon.
4. Chercher 20 a 50 idees brutes.
5. Couper les produits faibles/rinces/doublons.
6. Shortlister 5 produits a scorer, sauf si moins de 5 survivent avec justification.
7. Pour chaque produit score : creer `products/YYYY-MM-DD-<produit>` avec `scripts/new_product.py`.
8. Verifier Google Search, Shopping, Trends France et Semrush France via l'application Mac Kloow si autorise/disponible.
9. Verifier AliExpress via Computer Use pour chaque produit score, en serie.
10. Analyser concurrents DTC/specialises et separer marketplaces.
11. Calculer business economics.
12. Scorer, produire decision briefs et weekly report.
13. S'arreter a Gate 0.

## Commande de lancement

```bash
python3 scripts/new_research.py "theme de recherche"
```

`scripts/new_product.py` ne lance pas une recherche hebdomadaire. Il cree seulement un dossier pour un produit candidat deja selectionne.

## Minimum acceptable

| Point de controle | Minimum |
|---|---|
| Idees brutes | 20 a 50 |
| Produits scores | 5, sauf justification documentee |
| Google Sheet | feuille creee/remplie ou blocage explicite |
| Kloow/Semrush | tente/utilise via application Mac Kloow si Hakim a confirme l'acces |
| AliExpress | tente pour chaque produit score, en serie |
| Decision | weekly report + decision briefs |

Un run qui analyse un seul produit sans demande explicite d'Hakim est incomplet.

## Kloow / Semrush / Ahrefs

Pour Hakim, l'acces Kloow/Semrush doit etre considere comme attendu quand la demande mentionne Google-first France, sauf instruction contraire ou blocage reel.

Regles :

- ouvrir l'application Mac Kloow, pas un site web Kloow dans un navigateur ;
- si l'ecran de connexion apparait, cliquer sur `Login` ;
- chercher `semrush` dans la recherche interne Kloow ;
- cliquer sur `Launch` sur la carte Semrush ;
- utiliser la fenetre `Kloow Browser` qui s'ouvre ;
- regler la base sur France ;
- relever volume, CPC, intent, KD et variations ;
- ne pas utiliser de donnees United States ;
- si Semrush est absent, indisponible, en maintenance ou bloque, retourner dans l'application Mac Kloow, chercher `ahrefs`, cliquer sur `Launch`, puis utiliser Ahrefs comme fallback France ;
- si Semrush et Ahrefs bloquent, documenter le blocage dans `research-run.md`, `google-demand.md` et le rapport final.

## Google Sheet

La feuille Google Sheet obligatoire n'est pas un nice-to-have. La livraison finale doit dire :

- feuille creee et remplie avec nom exact ;
- ou blocage d'acces explicite + fichier local de fallback.

Si aucune tentative Google Sheet n'a ete faite, le run est invalide.

## AliExpress

AliExpress est toujours serialise :

- un produit a la fois ;
- une seule fenetre/navigateur ;
- pas de sous-agents en parallele ;
- si CAPTCHA ou blocage : declarer le blocage et ne pas inventer les donnees.

## Prompt recommande pour nouvelle conversation

```text
Refere-toi au repo GitHub HakimOuah/dropshipping-product-factory ou au repo local /Users/Hakim/Documents/New project.
Lance une NOUVELLE RECHERCHE PRODUIT COMPLETE, pas l'analyse d'un seul produit.
Suis docs/research-run-protocol.md puis workflows/weekly-product-testing-workflow.md.
Contraintes obligatoires : creer/remplir la feuille Google Sheet, ouvrir l'application Mac Kloow, cliquer Login si necessaire, chercher Semrush dans Kloow, cliquer Launch, utiliser Semrush France dans Kloow Browser, chercher 20 a 50 idees brutes, scorer 5 produits minimum sauf justification documentee, tenter AliExpress en serie pour chaque produit score, puis t'arreter a Gate 0.
Pour ce compte, considere que Kloow/Semrush est disponible sauf blocage reel constate : tu dois donc le tenter et documenter le resultat. Si Semrush n'est pas disponible dans Kloow, cherche Ahrefs dans Kloow et clique Launch comme fallback.
```
