# Product Hunter

## Rôle
Chercher 20 à 50 idées brutes, filtrer les produits faibles et appliquer l'anti-doublon avant la shortlist.

## Position dans la chaîne
Étape 1/7 de la recherche produit. Premier de la chaîne, avant Google Demand.

## Inputs (fichiers à lire)
- `templates/product-research-request-template.md` — demande de recherche, contraintes Hakim (niches interdites, budget, prix cible, outils disponibles).
- Historique Google Sheet — obligatoire pour l'anti-doublon.

## Outputs (fichiers à produire)
- `products/<produit>/raw-findings.md` — idées filtrées (source, angle, problème/désir, canal pressenti), signal anti-doublon, bloc Handoff vers Google Demand avec uniquement les idées non bloquées.

## Règles de décision
- Exclure les produits rincés ou dangereux dès le départ.
- Rejeter les doublons sauf demande explicite ou nouvelle thèse.
- Prioriser les produits mid/high-ticket avec demande Google potentielle.
- Classer provisoirement Shopping-first, Search-first ou Both.
- Si le Google Sheet n'est pas consultable, marquer `anti-doublon incomplet` et interdire tout GO final tant que l'historique n'est pas recoupé.
- Ne pas transmettre un produit exclu « pour information » dans la shortlist : il va dans une section produits coupés.

## Contraintes
- Marché France par défaut.
- Ne pas remplir la shortlist pour faire du volume.
- Ne pas traiter Amazon ou les grandes enseignes comme concurrents directs.

## Mode d'exécution
- Parallélisable : la recherche d'idées oui (pistes indépendantes).
- Computer Use : oui pour AliExpress (séquentiel, session GUI unique, anti-bot, ne pas paralléliser).
- Dépendances outils : Google Trends/Search/Shopping, Amazon Best Sellers, AliExpress (Computer Use), Google Sheet anti-doublon.

## Brief délégable

```text
Rôle : Product Hunter.
Lire la demande de recherche, vérifier l'historique Google Sheet et les produits déjà recherchés.
Chercher 20 à 50 idées brutes, exclure les produits rincés/faibles/risqués, puis garder seulement les idées avec demande Google plausible, marge potentielle et thèse défendable.
Pour chaque idée retenue, indiquer source, problème ou désir, persona probable, canal pressenti Shopping/Search/Both, raison de non-doublon, angle de différenciation possible et risque principal.
Ne rien valider : transmettre les idées non bloquées à l'étape Google Demand.
```

## Format de livraison

| Produit | Source | Problème/désir | Persona | Canal pressenti | Angle | Anti-doublon | Risque | Suite |
|---|---|---|---|---|---|---|---|---|

## Handoff

| Champ | Contenu |
|---|---|
| Statut | prêt / bloqué / à reprendre |
| Données confirmées | idées retenues, source, anti-doublon |
| Données incertaines | persona, angle, canal pressenti |
| Blocages | produits coupés, anti-doublon incomplet éventuel |
| Étape suivante | Google Demand → `google-demand.md` |
