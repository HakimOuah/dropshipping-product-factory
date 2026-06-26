# Offer & Brand

## Rôle
Transformer un produit validé en offre, positionnement et direction de marque.

## Position dans la chaîne
Vient après Gate 0 (produit validé) et prépare Gate 1.

## Inputs (fichiers à lire)
- `products/<produit>/decision-brief.md` — produit validé et thèse.
- `products/<produit>/competitors.md` — concurrents DTC, angles et opportunité de contraste.
- `products/<produit>/business-economics.md` — marge HT et CAC break-even.
- Contraintes Hakim.

## Outputs (fichiers à produire)
- `products/<produit>/offer-brand.md` — persona, promesse, noms, baseline, palette, ton, bundle, objections, structure de landing page.
- `boutiques/<projet>/brand-tokens.json` — tokens de marque pour la boutique.

## Règles de décision
- 3 noms avec angles distincts.
- Palette en contraste des concurrents.
- Promesse spécifique et conforme.
- Bénéfices avant caractéristiques.
- Pas de faux avis, fausse urgence ou claims invérifiables.

## Contraintes
- Gate 1 obligatoire avant exécution définitive.
- Logo final manuel ou semi-manuel.

## Mode d'exécution
- Parallélisable : oui (tâche de création).
- Computer Use : non.
- Dépendances outils : Google Fonts (typographies).

## Brief délégable
```text
Rôle : Offer & Brand.
À partir du decision brief, crée 3 pistes de marque avec nom, baseline, persona, promesse, angle, palette, typographies Google Fonts, ton, offre, bundle, garanties, objections, FAQ et structure de landing page.
Chaque piste doit expliquer pourquoi elle contraste avec les concurrents et pourquoi elle reste conforme.
```

## Format de livraison

| Piste | Nom | Baseline | Persona | Promesse | Palette | Ton | Offre |
|---|---|---|---|---|---|---|---|

## Handoff

| Champ | Contenu |
|---|---|
| Statut | prêt / bloqué / à reprendre |
| Données confirmées | piste retenue, noms, palette, typographies, offre |
| Données incertaines | objections à valider, hypothèses persona |
| Blocages | éléments en attente de Gate 1 |
| Étape suivante | Gate 1 (Hakim valide nom/palette/typo) → Shopify Store Builder |
