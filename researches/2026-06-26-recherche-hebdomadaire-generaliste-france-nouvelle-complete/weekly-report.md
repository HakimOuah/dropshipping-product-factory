# Weekly Report

## Semaine

- Dates : 2026-06-26
- Feuille Google Sheet : `Feuille 4` dans `Recherche produit Codex` + fallback `google-sheet-fallback.tsv`
- Produits bruts : 32
- Produits scores : 5
- GO : 0
- MAYBE : 3
- NO-GO : 2

## Classement

| Rang | Produit | Score | Canal | Verdict | Raison |
|---:|---|---:|---|---|---|
| 1 | Shampouineuse portable injecteur-extracteur | 74 | Both | MAYBE | Prioritaire à reprendre si AliExpress/fournisseur EU vérifié; pas GO tant que fournisseur bloqué. |
| 2 | Robot piscine sans fil | 74 | Shopping | MAYBE | Très bon signal demande/AOV mais Gate 0 bloquée par fournisseur et saisonnalité; à reprendre en priorité avant été. |
| 3 | Litière automatique chat | 69 | Both | MAYBE | Demande en croissance mais GO impossible sans preuve sécurité/fournisseur; pourrait être boutique premium si verrou levé. |
| 4 | Déshumidificateur d'air compact | 63 | Both | NO-GO | Score sous 65 et tendance relative faible; à garder en réserve seulement si fournisseur EU exceptionnel. |
| 5 | Aspirateur robot laveur | 56 | Shopping | NO-GO | Demande forte mais non défendable en dropshipping Google Ads face aux marques; couper sauf accès marque/private label solide. |

## Produit recommande

- Produit : Shampouineuse portable injecteur-extracteur
- Pourquoi : demande Ahrefs France massive (`shampouineuse` 62K) + variante canapé claire, faible KD/CPC, usage démontrable, panier compatible Google Shopping/Search.
- Risque principal : fournisseur/SAV non vérifié, car AliExpress Computer Use est bloqué.
- Condition : trouver 2 fournisseurs EU/France ou AliExpress vérifiés manuellement avec CE/RoHS, note vendeur solide, prix livré <=85 EUR, images/vidéos propres, consommables disponibles.
- Prochaine action : reprise Gate 0 fournisseur + vérification AliExpress manuelle ou autre source fournisseur avant toute boutique.

## Limites

- Google Sheet : onglet `Feuille 4` créé et rempli dans le Google Sheet; TSV fallback rempli localement.
- Trends : pytrends France 5 ans exécuté; indices relatifs multi-termes, pas des volumes absolus.
- Semrush : disponible dans Kloow mais bloqué par `ERR_HTTP2_PROTOCOL_ERROR`; fallback Ahrefs utilisé et documenté.
- AliExpress : Computer Use refuse l’URL AliExpress et stoppe la session; aucun fournisseur inventé.
- Concurrents : benchmark public synthétique; à compléter par captures Shopping/Ads si un MAYBE est repris.

## Gate 0

Statut : bloquée. Aucun GO n'est autorisé sans validation Hakim et levée du verrou fournisseur.
