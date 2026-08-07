# Audit fournisseurs — Traitement de l'eau (27 produits AliExpress)

**Date d'extraction :** 2026-07-10 · **Livraison :** France métropolitaine · **Devise :** EUR
**Source :** fiches produit AliExpress consultées en rendu navigateur (données visibles sur la page).
**Fichier d'entrée :** `arborescence-adoucisseur-eau.xlsx` › onglet *Produits* (non modifié).

> ⚠️ **Cadre.** Aucune commande / aucun ajout au panier. Aucun contournement de sécurité.
> Les titres marketing AliExpress **ne valent pas preuve de certification ou de performance**.
> Distinction appliquée partout : *donnée vérifiée* / *déduite* / *non disponible (n.d.)* / *affirmation marketing non vérifiée*.

---

## Contenu du dossier

| Fichier | Description |
|---|---|
| `synthese-produits.xlsx` | **Classeur principal, 8 onglets** : Synthèse, Osmoseurs, Variantes, Logistique, Consommables, Risques, Sources, Images (filtres + entête figée + code couleur). |
| `produits.json` | 27 fiches structurées complètes (identité, commercial, logistique, specs, risques, manques, scores, images). |
| `produits.csv` | Vue tabulaire des 27 produits + scores. |
| `sources.csv` | Traçabilité (URL, date, pays, devise, fiabilité) par produit. |
| `images-manifest.csv` | 136 images (URL source → fichier PNG local → statut). |
| `journal-extraction.csv` | Journal d'extraction (méthode, statut, notes) par produit. |
| `images/<id>/` | Images carrousel full-res converties WebP→PNG (≤5/produit ; 6 pour le phare). |
| `donnees-brutes/<id>/` | `donnees-brutes.json` + `texte-visible.txt` (+ `page.html` pour le phare). |

---

## Résultat global

- **27 produits audités** · **136 images** téléchargées et converties en PNG · **0 échec** de téléchargement.
- Complétude : **1 produit ≥85**, la majorité **60–73/100** (osmoseurs plafonnés à 60 car specs techniques absentes).
- Répartition risque : **FAIBLE 12** · **MOYEN 9** · **ÉLEVÉ 5** · **CRITIQUE 1**.

### Recommandations par produit (résumé)

| Reco | Produits |
|---|---|
| 🏆 **Produit phare** | **F14** Osmoseur RO 600G — *expédié France ✅* |
| 🧪 **Variantes à tester** | F15/F16/F17 (osmoseurs UE), F6/F7/F8/F9 (filtres douche), F22–F26 (carafes), F38 (camping) |
| ⬆️ **Upsell / accessoire** | F10 (douche premium), F30–F34 (filtres robinet) |
| 🔁 **Consommable** | F18 (membrane RO de rechange) |
| 🔎 **À vérifier (allégations)** | F43–F47 (anti-calcaire magnétique/électronique) |
| ❌ **À écarter** | **F39** — hors périmètre (narguilé/tuyau à fumer, lien source erroné) |

---

## Points clés de l'audit

**1. Le produit phare (F14) tient la route logistiquement, mais pas encore techniquement.**
Expédié de **France**, TVA incluse, livraison 16–21 juillet, note 4,9. MAIS : ventes faibles (35), avis agrégés multi-vendeurs, **aucune certification eau potable / contact alimentaire** affichée (origine CN), et **débit L/j, % réduction TDS, pression, tension** absents → *à demander au fournisseur avant tout argumentaire sanitaire*.

**2. Les osmoseurs alternatifs expédient d'Europe.**
F15/F16/F17 (OSWNKW/SHUANGLI) partent de **Pologne**, tension **110–240V** (compatible FR), interface DN15, débit ~2,5 L/min. Bonne fiabilité logistique (confiance 73–77) mais **mêmes trous de specs** (débit L/j, %TDS, réf. filtres) → onglet *Osmoseurs*.

**3. ⚠️ L'anti-calcaire magnétique/électronique (F43–F47) est le principal risque juridique.**
L'efficacité des adoucisseurs **magnétiques/électroniques n'est pas scientifiquement reconnue** → risque d'**allégation trompeuse (DGCCRF)**. Reco : **rester factuel**, ne pas promettre « adoucissement » / « réduction de dureté » sans étude. Classés **risque ÉLEVÉ**.

**4. Contact alimentaire = vigilance sur carafes & filtres robinet.**
Carafes (F22–F26) et filtres robinet (F30–F34) sont en contact direct avec l'eau de boisson → exiger la **conformité matériaux (règlement CE 1935/2004)** et la certif cartouche avant mise en vente.

**5. Données systématiquement absentes sur AliExpress (à obtenir du fournisseur) :**
débit réel (L/j ou L/h), % de réduction TDS, pression min/max, tension/puissance exacte, **références précises des filtres de remplacement + prix**, certifications contact alimentaire / eau potable, garantie, dimensions/poids colis.

---

## Méthode & fiabilité

- Extraction sur **page rendue** (navigateur) : prix, variantes, note/avis, provenance d'expédition, délai, table « Détails », URLs images full-res (`imagePathList`).
- **Fiabilité = « vérifié (page produit) »** pour toute donnée du tableau ; tout champ manquant est marqué **n.d.** (jamais inventé).
- Avertissement plateforme : titres/descriptions AliExpress = **traduction IA** → specs recoupées, doute signalé.
- Scores : *complétude /100* (présence des champs clés, osmoseurs pénalisés), *confiance fournisseur /100* (note, volume d'avis/ventes, provenance UE), *niveau de risque* et *recommandation* (règles par catégorie).
