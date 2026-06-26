# Google-first Research Workflow

Rôle responsable : Google Demand.

## But

Valider que le produit a une demande captable via Google Ads France, pas seulement un signal social.

## Etapes

1. Lister 3 a 5 formulations produit et probleme.
2. Ouvrir Google Search France.
3. Ouvrir Google Shopping.
4. Verifier Google Trends France sur 5 ans.
5. Utiliser Semrush France via l'application Mac Kloow si acces confirme (session GUI unique, sequentiel).
6. Si Semrush est indisponible dans Kloow, utiliser Ahrefs via Kloow comme fallback.
7. Identifier le canal : Shopping-first, Search-first ou Both.
8. Noter les requetes a exclure.
9. Rejeter si le cluster transactionnel France est sous 10 000 recherches mensuelles.

## Decision canal

| Canal | Quand le choisir | Quand le refuser |
|---|---|---|
| Shopping-first | produit visuel, requete produit claire, Shopping actif, faible education | pas de Shopping actif, produit difficile a comprendre en image, guerre prix pure |
| Search-first | probleme/desir explicite, besoin comparaison/pedagogie, panier suffisant | panier trop bas, besoin d'education trop long, claims risqués |
| Both | preuves Shopping et Search presentes | un seul canal prouve ou angle Search artificiel |

## Sortie

Remplir `google-demand.md` avec sources, chiffres, limites et verdict demande.

Verdict maximum si Semrush/Keyword Planner est inaccessible : MAYBE, sauf si Google Trends + SERP + Shopping donnent deja un signal faible, auquel cas NO-GO.

## Exécution

- **Séquentiel** : Semrush via application Mac Kloow, un mot-clé à la fois, jamais en parallèle (session GUI unique). Ne pas ouvrir Kloow dans un navigateur classique.
- **Fallback Kloow** : si Semrush est indisponible, chercher Ahrefs dans l'application Mac Kloow et cliquer Launch. Fallback final si Semrush/Ahrefs indisponibles : Google Trends + SERP + Shopping (verdict plafonné selon la règle ci-dessus).
- **Parallélisable** : la lecture SERP et la classification canal peuvent se faire en parallèle entre plusieurs produits.
