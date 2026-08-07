# Decision Brief

## Synthese

- Produit : Tapis de marche pliable / walking pad compact
- Score : 68/100
- Verdict : MAYBE
- Canal recommande : Both, priorite Shopping
- Decision recommandee : continuer uniquement si Hakim veut lever les deux verrous forts : volume France exact et sourcing fournisseur.
- Gate 0 : a valider par Hakim

## These

Pour actifs sedentaires et teletravailleurs en appartement qui veulent marcher plus sans salle de sport ni gros tapis de course, vendre un tapis de marche compact et silencieux comme une solution de mouvement doux quotidien, contrairement aux marketplaces qui vendent surtout une fiche prix/specs avec peu de reassurance.

## Preuves

- Google Demand : Trends France positif pour "tapis de marche" ; volume mensuel France non confirme.
- Shopping/SERP : intention produit claire et pages commerciales observees/reperees ; verification Google Shopping France a refaire en navigateur.
- Trends : moyenne 52 semaines pytrends "tapis de marche" 62.23 ; "walking pad" en progression relative.
- Semrush France : non consulte ; acces Kloow/Semrush non confirme.
- Fournisseur : non confirme ; AliExpress web non exploitable en automatisation ; GUI requise.
- Concurrents DTC : WalkingPad/Kingsmith et specialistes fitness a analyser plus finement.
- Economie : viable a 299-349 EUR si cout livre <= 160-190 EUR ; trop serre a prix bas.

## Risques

| Risque | Niveau | Mitigation | Condition de GO |
|---|---|---|---|
| Volume France non confirme | Fort | Semrush/Kloow ou Keyword Planner France | Cluster transactionnel >= 10 000/mois |
| Produit electrique lourd | Fort | Fournisseur EU/FR, CE/RoHS, SAV clair | Principal + backup valides |
| Guerre prix marketplace | Moyen | Positionnement qualite, silence, appartement, bundle | Prix defendable >= 299 EUR |
| Retours/SAV | Fort | Garantie et politique retour calculees | Cout SAV integre a la marge |
| Claims sante | Moyen | Eviter promesses medicales/minceur | Copy sobre "mouvement quotidien" |

## Verrous GO

| Verrou | Statut | Preuve | Verdict si bloque |
|---|---|---|---|
| Anti-doublon | Partiel | Repo local verifie ; Google Sheet non consulte | MAYBE max |
| Google France 10 000 | Bloque | Trends seulement, pas volume mensuel | NO-GO si non confirme |
| Shopping/Search/Both justifie | Partiel | Requetes produit + Trends + reperes commerciaux | MAYBE |
| AliExpress exploitable | Bloque | Session GUI non faite | Pas de GO |
| Backup fournisseur | Bloque | Non identifie | Pas de GO |
| DTC/specialises analyses | Partiel | Reperes identifies, analyse prix incomplete | MAYBE |
| Marge/CAC | Conditionnel | Scenarios 299-349 EUR | NO-GO sous 299 EUR ou cout haut |
| Conformite | Bloque | CE/RoHS/notice non verifies | Pas de GO |
| These | Plausible | Angle teletravail/appartement | Continuer |

## Prochaines actions

- Gate 0 : rester bloque jusqu'a validation Hakim + preuves demande/fournisseur.
- Si GO : lancer sourcing GUI, benchmark Shopping, puis brief offre/marque.
- Si MAYBE : verifier Semrush/Kloow/Keyword Planner France et AliExpress.
- Si NO-GO : couper si cluster France < 10 000 ou fournisseur EU/FR non viable.
