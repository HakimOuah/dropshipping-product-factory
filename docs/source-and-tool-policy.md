# Source And Tool Policy

## Sources gratuites

- Google Search.
- Google Shopping.
- Google Trends France.
- AliExpress via Computer Use.
- Amazon et grandes enseignes uniquement comme reperes prix/SERP.
- Avis clients, forums, Reddit, commentaires concurrents.
- Google Ads Transparency Center.
- Meta Ad Library et TikTok Creative Center pour angles creatifs.

## Outils payants

Utiliser uniquement si Hakim confirme un acces actif :

- Semrush ;
- Ahrefs ;
- TrendTrack ;
- Minea ;
- PipiAds ;
- Similarweb ;
- Kloow comme passerelle d'acces.

## Kloow

Pour Hakim, Kloow/Semrush est attendu pour valider une recherche Google-first France quand l'acces est disponible. Si l'assistant ne l'utilise pas, il doit expliquer pourquoi.

Regle critique : **Kloow se lance via l'application Mac Kloow, jamais en tapant Kloow dans un navigateur web classique**. Ouvrir `kloow.com` ou chercher Kloow dans Google est une mauvaise execution.

### Protocole application Mac

1. Ouvrir l'application Mac **Kloow**.
2. Si l'ecran de connexion apparait, cliquer sur **Login**.
3. Une fois dans Kloow, utiliser la barre de recherche interne et taper `semrush`.
4. Ouvrir la carte **Semrush**.
5. Cliquer sur **Launch**.
6. Attendre l'ouverture de la fenetre dediee **Kloow Browser**. C'est dans cette fenetre qu'il faut utiliser Semrush.
7. Dans Semrush, regler la base/pays sur **France** avant de lire les chiffres.
8. Extraire uniquement les donnees utiles : volume, CPC, intent, KD, variations, questions, tendance.
9. Ne jamais utiliser United States pour valider la France.
10. Ne pas stocker d'identifiants.
11. Ne pas modifier abonnement ou parametres compte.

### Fallback Ahrefs via Kloow

Si Semrush n'est pas disponible dans Kloow, est en maintenance, ne se lance pas, ou bloque l'acces :

1. Revenir dans l'application Mac **Kloow**.
2. Chercher `ahrefs` dans la barre de recherche interne.
3. Ouvrir la carte **Ahrefs**.
4. Cliquer sur **Launch**.
5. Utiliser Ahrefs dans **Kloow Browser** si la fenetre s'ouvre.
6. Regler le pays sur **France** quand l'outil le permet.
7. Relever volume, difficulte, CPC si disponible, variations et pages concurrentes.
8. Documenter dans le livrable : `Semrush indisponible -> fallback Ahrefs via Kloow`.

Si Semrush et Ahrefs sont tous deux indisponibles, documenter le blocage et revenir au workflow gratuit Google Trends + SERP + Shopping. Le verdict reste plafonne par les regles Google Demand.

## Google Sheet

La mise a jour du Google Sheet est obligatoire a chaque recherche produit.

Si l'acces direct est impossible :

1. tenter via les outils disponibles ou l'interface ;
2. documenter le blocage ;
3. remplir `researches/<run>/google-sheet-fallback.tsv` ;
4. indiquer dans le weekly report que la mise a jour Sheet reste a faire.

## Declaration des limites

Ne jamais pretendre avoir verifie Trends, Semrush, Google Sheet, AliExpress ou concurrents si l'etape n'a pas ete faite.
