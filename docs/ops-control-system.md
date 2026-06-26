# Ops Control System

Ce document verrouille le fonctionnement du repo comme une chaine de production e-commerce. Il evite qu'un produit faible passe parce qu'un agent a bien rempli une autre partie du dossier.

## Regle principale

Un produit ne devient jamais GO par moyenne. Il devient GO uniquement si tous les verrous critiques sont ouverts.

## Verrous critiques

| Verrou | Fichier source | Statut qui bloque | Verdict maximum |
|---|---|---|---|
| Anti-doublon | `raw-findings.md` | Google Sheet non consulte et historique local insuffisant | MAYBE |
| Demande France | `google-demand.md` | < 10 000 recherches mensuelles France pertinentes | NO-GO |
| Donnees pays | `google-demand.md` | chiffres US utilises pour decision France | NO-GO |
| Fournisseur | `suppliers.md` | pas de fournisseur exploitable ni backup | MAYBE |
| Fournisseur critique | `suppliers.md` | note < 4,5, vendeur faible, delai intenable, pas d'alternative | NO-GO |
| Concurrence | `competitors.md` | uniquement marketplaces/grandes enseignes | MAYBE |
| Marge/CAC | `business-economics.md` | CAC max inferieur au CPC/CPA plausible Google Ads | NO-GO ou repositionnement |
| Conformite | `qa-checklist.md` ou `decision-brief.md` | claims sante/minceur/securite non prouvables | NO-GO |
| Differenciation | `decision-brief.md` | these absente ou limitee au prix/logo/couleur | NO-GO |

## Handoff obligatoire

Chaque agent doit finir par un bloc `Handoff` :

| Champ | Contenu attendu |
|---|---|
| Statut | pret / bloque / a reprendre |
| Fichier produit | chemin du livrable |
| Donnees confirmees | faits utilisables par l'agent suivant |
| Donnees incertaines | hypotheses a ne pas utiliser comme preuve |
| Blocages | ce qui empeche GO ou l'etape suivante |
| Prochain agent | agent responsable de la suite |

## Gates humaines

Une gate est validee uniquement si `project-state.md` contient :

- nom de la gate ;
- statut `valide par Hakim` ;
- date ;
- decision ;
- lien ou nom du livrable valide ;
- notes ou conditions.

Sans cette ligne, l'agent suivant doit repondre : `Gate non validee, execution bloquee`.

