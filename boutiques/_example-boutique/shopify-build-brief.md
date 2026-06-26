# Shopify Build Brief — Exemple boutique

Statut : build bloque tant que Gate 0, Gate 1 et Gate 2 ne sont pas validees.

## Exploration theme obligatoire

| Element | Option native recherchee | Decision exemple |
|---|---|---|
| Hero | image/video + CTA | utiliser natif si responsive |
| Product information | prix, variantes, CTA, collapsibles | prioritaire |
| Image with text | benefices et usage | utiliser natif |
| FAQ accordion | objections | utiliser natif |
| Comparison table | standard vs Lumora | custom seulement si natif absent |
| Sticky ATC | mobile | activer si theme propre |

## Regle custom code

| Besoin | Option native testee | Limite constatee | Custom autorise |
|---|---|---|---|
| tableau comparaison | non teste dans l'exemple | audit theme requis | non avant audit theme |
| guide taille interactif | non teste dans l'exemple | audit theme requis | seulement apres Gate 2 |

## Donnees produit

- Handle : miroir-armoire-salle-de-bain-led-antibuee
- SKU : LUM-MIR-LED-80X60-BLC
- Prix : 249 EUR
- Variantes : taille, couleur
- ALT : miroir armoire salle de bain LED antibuée [taille/couleur]
- Metafields : dimensions, type LED, antibuée, garantie, livraison.

## Controle CRO mobile

| Element | Statut exemple |
|---|---|
| Produit + promesse visibles | requis |
| CTA dominant | requis |
| Prix TTC clair | requis |
| Livraison/retours/garantie proches achat | requis |
| Benefices avant caracteristiques | requis |
| Objections traitees avant achat | requis |
| FAQ utile | requis |
