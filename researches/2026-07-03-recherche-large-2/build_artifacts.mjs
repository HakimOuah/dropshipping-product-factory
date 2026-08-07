import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { SpreadsheetFile, Workbook } from "@oai/artifact-tool";

const __filename = fileURLToPath(import.meta.url);
const runDir = path.dirname(__filename);
const runName = path.basename(runDir);

const candidates = [
  {
    product_name: "Fauteuil oeuf suspendu double en osier synthetique",
    source: "bigbuy",
    category: "garden_seating",
    price_sell: 520,
    competitors_type: "semi_brands",
    sells_in_search: true,
    sells_in_shopping: true,
    legal_eu: true,
    not_available_on_generic_channels: "partial",
    distinct_sources: 1,
    angle: "Coin lecture/terrasse cocon sans meuble de jardin banal",
    notes: "Signal BigBuy Garden via Bixoto/Carrefour; prix marche observe 400-650 EUR. Sources: https://bixoto.com/fr/p/bigbuy-garden-fauteuil-de-jardin-suspendu-osier-marron-95-x-195-cm-s7912290 | https://www.carrefour.fr/p/fauteuil-de-jardin-suspendu-dido-noir-81-x-64-x-111-5-cm-8424346273614",
  },
  {
    product_name: "Salon de jardin aluminium et corde 6 places DKD",
    source: "bigbuy",
    category: "garden_furniture",
    price_sell: 1310,
    competitors_type: "semi_brands",
    sells_in_search: true,
    sells_in_shopping: true,
    legal_eu: true,
    not_available_on_generic_channels: "partial",
    distinct_sources: 1,
    angle: "Salon exterieur premium style hotel pour terrasse familiale",
    notes: "Signal BigBuy/DKD Home Decor; prix marche observe 1200-1600 EUR. Source: https://bigbuy-home-and-decor.myshopify.com/collections/garden-and-terrace/products/table-set-with-chairs-dkd-home-decor-beige-78-cm-163-x-95-x-6-cm",
  },
  {
    product_name: "Hamac suspendu XL avec barre et support premium",
    source: "bigbuy",
    category: "garden_relaxation",
    price_sell: 190,
    competitors_type: "dropshippers_mixed",
    sells_in_search: true,
    sells_in_shopping: true,
    legal_eu: true,
    not_available_on_generic_channels: "commodity",
    distinct_sources: 1,
    angle: "Detente balcon/jardin facile a installer",
    notes: "Signal BigBuy Outdoor/Cdiscount; prix marche observe 168-220 EUR. Source: https://www.cdiscount.com/jardin/mobilier-de-jardin/bigbuy-outdoor-hamac-suspendu/f-1631610-big1732950018897.html",
  },
  {
    product_name: "Ventilateur de plafond DC silencieux avec luminaire 132 cm",
    source: "amazon_movers",
    category: "home_cooling",
    price_sell: 180,
    competitors_type: "dropshippers_mixed",
    sells_in_search: true,
    sells_in_shopping: true,
    legal_eu: true,
    not_available_on_generic_channels: "partial",
    distinct_sources: 1,
    is_seasonal: true,
    angle: "Rafraichir une chambre sans clim ni bruit",
    notes: "Signal Amazon top ventes/canicule; prix marche premium 150-260 EUR. Sources: https://www.bfmtv.com/pratique/maison/au-top-des-ventes-amazon-ce-ventilateur-de-plafond-avec-lumiere-marque-un-tournant-en-cette-periode-de-canicule_AB-202606250018.html | https://www.amazon.fr/ventilateur-plafond/s?k=ventilateur+plafond",
  },
  {
    product_name: "Station electrique portable LiFePO4 1024 Wh",
    source: "amazon_movers",
    category: "portable_power",
    price_sell: 799,
    competitors_type: "semi_brands",
    sells_in_search: true,
    sells_in_shopping: true,
    legal_eu: true,
    not_available_on_generic_channels: "partial",
    distinct_sources: 1,
    angle: "Autonomie camping/travaux/coupure sans groupe electrogene",
    notes: "Signal Amazon et presse shopping sur EcoFlow/Bluetti; prix marche 499-999 EUR. Sources: https://www.amazon.fr/station-energie-portative/s?k=station+energie+portative | https://www.lesnumeriques.com/divers-electromenager/amazon-flash-prime-la-station-electrique-portable-ecoflow-delta-2-passe-sous-les-500-n243596.html",
  },
  {
    product_name: "Station meteo WiFi pro avec anemometre et pluviometre",
    source: "amazon_movers",
    category: "garden_weather",
    price_sell: 260,
    competitors_type: "dropshippers_mixed",
    sells_in_search: true,
    sells_in_shopping: true,
    legal_eu: true,
    not_available_on_generic_channels: "partial",
    distinct_sources: 1,
    angle: "Suivi meteo local pour jardin, potager et maison",
    notes: "Signal Amazon Jardin/Maison; prix marche stations WiFi completes 200-350 EUR. Source: https://www.amazon.fr/gp/movers-and-shakers/lawn-garden",
  },
  {
    product_name: "Detecteur radon connecte domestique longue duree",
    source: "amazon_movers",
    category: "home_safety",
    price_sell: 210,
    competitors_type: "few_or_none",
    sells_in_search: true,
    sells_in_shopping: true,
    legal_eu: true,
    not_available_on_generic_channels: "yes",
    distinct_sources: 1,
    angle: "Mesurer un risque invisible dans les maisons anciennes",
    notes: "Signal Amazon Maison/Bricolage; prix marche detecteurs radon connectes 180-300 EUR. Source: https://www.amazon.fr/gp/movers-and-shakers/hi",
  },
  {
    product_name: "Composteur electrique de cuisine 3 a 5 L anti-odeur",
    source: "amazon_movers",
    category: "kitchen_waste_equipment",
    price_sell: 430,
    competitors_type: "dropshippers_mixed",
    sells_in_search: true,
    sells_in_shopping: true,
    legal_eu: true,
    not_available_on_generic_channels: "partial",
    distinct_sources: 1,
    angle: "Reduire les biodechets en appartement sans odeurs",
    notes: "Signal Amazon Cuisine/Maison; prix marche composteurs electriques 350-650 EUR. Source: https://www.amazon.fr/gp/movers-and-shakers/kitchen",
  },
  {
    product_name: "Panneaux acoustiques tasseaux bois pour mur complet",
    source: "amazon_movers",
    category: "home_acoustics",
    price_sell: 320,
    competitors_type: "dropshippers_mixed",
    sells_in_search: true,
    sells_in_shopping: true,
    legal_eu: true,
    not_available_on_generic_channels: "partial",
    distinct_sources: 2,
    angle: "Rendre un salon ou bureau plus calme et plus premium",
    notes: "Signal Amazon deco/renovation + tendance interieur; prix marche lots muraux 250-600 EUR. Sources: https://www.amazon.fr/gp/movers-and-shakers/hi | https://business.pinterest.com/en-gb/pinterest-predicts/",
  },
  {
    product_name: "Table de cuisine camping pliante aluminium avec rangement",
    source: "amazon_movers",
    category: "camping_furniture",
    price_sell: 220,
    competitors_type: "dropshippers_mixed",
    sells_in_search: true,
    sells_in_shopping: true,
    legal_eu: true,
    not_available_on_generic_channels: "partial",
    distinct_sources: 1,
    is_seasonal: true,
    angle: "Cuisine propre et organisee en camping familial",
    notes: "Signal Amazon Sports/Jardin estival; prix marche cuisines pliantes 180-300 EUR. Source: https://www.amazon.fr/gp/movers-and-shakers/lawn-garden",
  },
  {
    product_name: "Projecteur LED chantier telescopique sur batterie",
    source: "amazon_movers",
    category: "workshop_lighting",
    price_sell: 250,
    competitors_type: "dropshippers_mixed",
    sells_in_search: true,
    sells_in_shopping: true,
    legal_eu: true,
    not_available_on_generic_channels: "partial",
    distinct_sources: 1,
    angle: "Eclairage mobile puissant pour travaux, garage et renovation",
    notes: "Signal Amazon Bricolage; prix marche 200-350 EUR. Source: https://www.amazon.fr/gp/movers-and-shakers/hi",
  },
  {
    product_name: "Abri velo securise metal 4 a 6 velos",
    source: "europages",
    category: "outdoor_storage",
    price_sell: 950,
    competitors_type: "few_or_none",
    sells_in_search: true,
    sells_in_shopping: true,
    legal_eu: true,
    not_available_on_generic_channels: "yes",
    distinct_sources: 1,
    angle: "Proteger les velos electriques sans construire un garage",
    notes: "Signal Europages France Abris; prix marche abris velos securises 700-1400 EUR. Sources: https://www.europages.fr/entreprises/abris%20pour%20v%C3%A9los.html | https://www.europages.fr/entreprises/fabrication-de-velos.html",
  },
  {
    product_name: "Abri poubelle design metal double ou triple",
    source: "europages",
    category: "outdoor_storage",
    price_sell: 580,
    competitors_type: "few_or_none",
    sells_in_search: true,
    sells_in_shopping: true,
    legal_eu: true,
    not_available_on_generic_channels: "yes",
    distinct_sources: 1,
    angle: "Cacher les bacs et rendre l'entree maison plus propre",
    notes: "Signal Europages METASTAL/FranceAbris; prix marche 450-900 EUR. Sources: https://www.europages.fr/METASTAL/00000005411559-747166001.html | https://www.europages.fr/entreprises/france/fabricant%20producteur/boite-metallique.html",
  },
  {
    product_name: "Jardiniere acier corten XXL modulable",
    source: "europages",
    category: "garden_planter",
    price_sell: 650,
    competitors_type: "few_or_none",
    sells_in_search: true,
    sells_in_shopping: true,
    legal_eu: true,
    not_available_on_generic_channels: "yes",
    distinct_sources: 1,
    angle: "Terrasse paysagee premium sans travaux lourds",
    notes: "Signal Europages acier corten; prix marche jardiniere XXL 450-1000 EUR. Source: https://www.europages.fr/entreprises/acier-corten.html",
  },
  {
    product_name: "Recuperateur eau de pluie mural design 800 L",
    source: "europages",
    category: "water_saving_garden",
    price_sell: 520,
    competitors_type: "dropshippers_mixed",
    sells_in_search: true,
    sells_in_shopping: true,
    legal_eu: true,
    not_available_on_generic_channels: "partial",
    distinct_sources: 1,
    angle: "Arroser le jardin en ete sans cuve moche",
    notes: "Signal fournisseurs jardin/amenagement Europages; prix marche cuves design 400-800 EUR. Source: https://www.europages.fr/entreprises/jardinage.html",
  },
  {
    product_name: "Banc exterieur beton bois design pour terrasse",
    source: "europages",
    category: "outdoor_furniture",
    price_sell: 720,
    competitors_type: "few_or_none",
    sells_in_search: true,
    sells_in_shopping: true,
    legal_eu: true,
    not_available_on_generic_channels: "yes",
    distinct_sources: 1,
    angle: "Mobilier exterieur durable style parc/hotel",
    notes: "Signal Europages mobilier urbain Crouzoulon; prix marche banc design 600-1200 EUR. Source: https://www.europages.fr/entreprises/france/fabricant%20producteur/mobilier-urbain.html",
  },
  {
    product_name: "Porte d'entree aluminium triple vitrage sur mesure",
    source: "europages",
    category: "home_renovation",
    price_sell: 1500,
    competitors_type: "semi_brands",
    sells_in_search: true,
    sells_in_shopping: true,
    legal_eu: true,
    not_available_on_generic_channels: "yes",
    distinct_sources: 1,
    angle: "Renover l'entree pour isolation, securite et valeur maison",
    notes: "Signal Europages EURADIF/RS Concept; prix marche 1200-2000 EUR hors pose. Sources: https://www.europages.fr/entreprises/france/lille%20et%20nord-pas-de-calais/agencement-sur-mesure-en-bois.html | https://www.europages.fr/entreprises/anthracite.html",
  },
  {
    product_name: "Garde-corps aluminium ou inox en kit pour terrasse",
    source: "europages",
    category: "home_renovation",
    price_sell: 820,
    competitors_type: "semi_brands",
    sells_in_search: true,
    sells_in_shopping: true,
    legal_eu: true,
    not_available_on_generic_channels: "partial",
    distinct_sources: 2,
    angle: "Securiser une terrasse sans passer par un devis artisan opaque",
    notes: "Signal Europages + Cdiscount bricolage; prix marche kits 600-1200 EUR selon metres. Sources: https://www.europages.fr/entreprises/france/fabricant%20producteur/mobilier-urbain.html | https://www.cdiscount.com/bricolage",
  },
  {
    product_name: "Table d'examen veterinaire electrique compacte",
    source: "europages",
    category: "pet_professional_equipment",
    price_sell: 1250,
    competitors_type: "few_or_none",
    sells_in_search: true,
    sells_in_shopping: false,
    legal_eu: true,
    not_available_on_generic_channels: "yes",
    distinct_sources: 1,
    angle: "Equiper toiletteurs/veterinaires independants avec un achat direct",
    notes: "Signal Europages equipement pro/sante animale; prix marche tables electriques 900-1800 EUR. Source: https://www.europages.fr/entreprises/equipements.html",
  },
  {
    product_name: "Scelleuse sous vide a chambre 320 mm",
    source: "vevor",
    category: "commercial_kitchen_equipment",
    price_sell: 450,
    competitors_type: "dropshippers_mixed",
    sells_in_search: true,
    sells_in_shopping: true,
    legal_eu: true,
    not_available_on_generic_channels: "partial",
    distinct_sources: 1,
    angle: "Conservation pro pour traiteurs, chasseurs et familles batch cooking",
    notes: "VEVOR a 242,90-320 EUR selon modele; marche FR chambre 350-700 EUR. Sources: https://www.vevor.fr/machines-d-emballage-sous-vide-c_10467/vevor-machine-a-emballer-sous-vide-a-chambre-260-w-machine-d-emballage-sous-vide-taille-compacte-260-mm-dans-la-cuisine-domestique-et-pour-un-usage-commercial-pour-aliments-humides-viandes-marinades-p_010395199420 | https://www.vevor.fr/machines-d-emballage-sous-vide-c_10467/vevor-machine-a-emballer-sous-vide-a-chambre-320-w-machine-d-emballage-sous-vide-taille-compacte-320-mm-dans-la-cuisine-domestique-et-pour-un-usage-commercial-pour-aliments-humides-viandes-marinades-p_010249426550",
  },
  {
    product_name: "Deshydrateur alimentaire inox 10 a 12 plateaux",
    source: "vevor",
    category: "commercial_kitchen_equipment",
    price_sell: 360,
    competitors_type: "dropshippers_mixed",
    sells_in_search: true,
    sells_in_shopping: true,
    legal_eu: true,
    not_available_on_generic_channels: "partial",
    distinct_sources: 1,
    angle: "Sechage maison/pro pour fruits, viande et friandises animaux",
    notes: "Signal VEVOR dehydrateur 10/12 plateaux; prix marche 250-500 EUR. Sources: https://www.vevor.fr/deshydrateur-alimentaire-commercial-c_10678/vevor-deshydrateur-alimentaire-sechoir-electrique-1000-w-10-plateaux-pour-fruits-p_010614084859 | https://www.vevor.fr/deshydrateur-alimentaire-commercial-c_10678/vevor-deshydrateur-alimentaire-rotatif-electrique-800-w-12-plateaux-pour-fruits-p_010363063612",
  },
  {
    product_name: "Plaque vibrante compacteur thermique 15 kN",
    source: "vevor",
    category: "construction_tools",
    price_sell: 650,
    competitors_type: "few_or_none",
    sells_in_search: true,
    sells_in_shopping: true,
    legal_eu: true,
    not_available_on_generic_channels: "partial",
    distinct_sources: 1,
    angle: "Realiser terrasse, allee et pavage sans louer a chaque week-end",
    notes: "VEVOR liste 453,90 EUR; marche FR compacteurs 600-1000 EUR. Source: https://www.vevor.fr/s/plaque-vibrante-compacteur",
  },
  {
    product_name: "Camera d'inspection canalisation 30 m avec ecran",
    source: "vevor",
    category: "plumbing_tools",
    price_sell: 420,
    competitors_type: "dropshippers_mixed",
    sells_in_search: true,
    sells_in_shopping: true,
    legal_eu: true,
    not_available_on_generic_channels: "partial",
    distinct_sources: 1,
    angle: "Diagnostiquer une canalisation avant intervention couteuse",
    notes: "Signal VEVOR plomberie/camera egout; prix marche 300-700 EUR. Source: https://www.vevor.fr/s/v%C3%A9vor",
  },
  {
    product_name: "Presse a chaud textile 40 x 50 cm auto-open",
    source: "vevor",
    category: "craft_business_equipment",
    price_sell: 480,
    competitors_type: "dropshippers_mixed",
    sells_in_search: true,
    sells_in_shopping: true,
    legal_eu: true,
    not_available_on_generic_channels: "partial",
    distinct_sources: 1,
    angle: "Lancer micro-atelier textile sans machine industrielle",
    notes: "Signal VEVOR machines creation; prix marche presses 40x50 350-700 EUR. Source: https://www.vevor.fr/s/v%C3%A9vor",
  },
  {
    product_name: "Machine a denuder electrique cables cuivre 1,5-32 mm",
    source: "vevor",
    category: "recycling_equipment",
    price_sell: 390,
    competitors_type: "few_or_none",
    sells_in_search: true,
    sells_in_shopping: true,
    legal_eu: true,
    not_available_on_generic_channels: "yes",
    distinct_sources: 1,
    angle: "Rentabiliser le recyclage cuivre en atelier",
    notes: "VEVOR best-seller a 269,90 EUR; marche FR 300-600 EUR. Source: https://www.vevor.fr/best-sellers?page=4",
  },
  {
    product_name: "Groupe de recuperation fluides frigorigenes HVAC 1 HP",
    source: "vevor",
    category: "hvac_tools",
    price_sell: 650,
    competitors_type: "few_or_none",
    sells_in_search: true,
    sells_in_shopping: true,
    legal_eu: true,
    not_available_on_generic_channels: "yes",
    distinct_sources: 1,
    angle: "Outillage CVC portable pour artisans clim/froid",
    notes: "VEVOR liste groupe recuperation 419,99 EUR; marche pro 500-1000 EUR. Source: https://www.vevor.fr/s/groupe-electrogene",
  },
  {
    product_name: "Coupe-carreaux electrique sur table avec eau",
    source: "vevor",
    category: "tile_tools",
    price_sell: 520,
    competitors_type: "dropshippers_mixed",
    sells_in_search: true,
    sells_in_shopping: true,
    legal_eu: true,
    not_available_on_generic_channels: "partial",
    distinct_sources: 1,
    angle: "Couper proprement carrelage grand format sans louer une scie",
    notes: "Signal VEVOR revetements de sol/coupe-carreaux; prix marche 350-700 EUR. Source: https://www.vevor.fr/s/v%C3%A9vor",
  },
  {
    product_name: "Store banne motorise demi-coffre 4 x 3 m",
    source: "cdiscount",
    category: "garden_shade",
    price_sell: 842,
    competitors_type: "dropshippers_mixed",
    sells_in_search: true,
    sells_in_shopping: true,
    legal_eu: true,
    not_available_on_generic_channels: "partial",
    distinct_sources: 1,
    is_seasonal: true,
    angle: "Creer une terrasse ombragee sans pergola lourde",
    notes: "Cdiscount affiche variantes motorisees 842,50 EUR et coffre integral 1431,55 EUR. Source: https://www.cdiscount.com/jardin/r-store%2Bbanne%2Bmanuel%2Bavec%2Bcoffre%2B4m.html",
  },
  {
    product_name: "Porte de garage sectionnelle motorisee 254 x 218 cm",
    source: "cdiscount",
    category: "home_renovation",
    price_sell: 924,
    competitors_type: "dropshippers_mixed",
    sells_in_search: true,
    sells_in_shopping: true,
    legal_eu: true,
    not_available_on_generic_channels: "partial",
    distinct_sources: 1,
    angle: "Remplacer une porte de garage vieillissante sans devis opaque",
    notes: "Cdiscount NORIA motorisee a 923,99 EUR; marche kit 850-1500 EUR. Sources: https://www.cdiscount.com/bricolage/r-porte%2Bde%2Bgarage%2Bbasculante%2Bmanuelle.html | https://www.cdiscount.com/bricolage/r-porte%2Bde%2Bgarage%2Bbattante.html",
  },
  {
    product_name: "Coffre-fort biometrique 60 L anti-effraction",
    source: "cdiscount",
    category: "home_safety",
    price_sell: 534,
    competitors_type: "dropshippers_mixed",
    sells_in_search: true,
    sells_in_shopping: true,
    legal_eu: true,
    not_available_on_generic_channels: "partial",
    distinct_sources: 1,
    angle: "Proteger papiers et objets de valeur sans coffre bancaire",
    notes: "Cdiscount NIKCORP 58x40x33 cm a 533,99 EUR; variantes biometrie 189-534 EUR. Sources: https://www.cdiscount.com/bricolage/securite-domotique/coffre-fort-biomtrique/f-1662007-aacbi26593.html | https://www.cdiscount.com/bricolage/r-coffre%2Bfort%2Bempreinte%2Bdigitale.html",
  },
  {
    product_name: "Robot lave-vitre avec pulverisation 4 directions",
    source: "cdiscount",
    category: "home_cleaning",
    price_sell: 199,
    competitors_type: "dropshippers_mixed",
    sells_in_search: true,
    sells_in_shopping: true,
    legal_eu: true,
    not_available_on_generic_channels: "partial",
    distinct_sources: 1,
    angle: "Nettoyer baies vitrees et veranda sans monter sur escabeau",
    notes: "Cdiscount LIECTROUX S11 compare a 199 EUR, vendu 119 EUR. Sources: https://www.cdiscount.com/maison/r-materiel%2Bde%2Bnettoyage.html | https://www.cdiscount.com/maison/r-vitre%2Bplexiglass.html",
  },
  {
    product_name: "Motorisation portail coulissant solaire 600 kg",
    source: "cdiscount",
    category: "home_security_access",
    price_sell: 360,
    competitors_type: "dropshippers_mixed",
    sells_in_search: true,
    sells_in_shopping: true,
    legal_eu: true,
    not_available_on_generic_channels: "partial",
    distinct_sources: 1,
    angle: "Automatiser un portail sans tirer une ligne electrique",
    notes: "Signal Cdiscount bricolage motorisation; prix marche kits solaires 300-600 EUR. Source: https://www.cdiscount.com/bricolage/motorisation/",
  },
  {
    product_name: "Auvent marquise aluminium polycarbonate 6 m",
    source: "cdiscount",
    category: "home_exterior",
    price_sell: 450,
    competitors_type: "dropshippers_mixed",
    sells_in_search: true,
    sells_in_shopping: true,
    legal_eu: true,
    not_available_on_generic_channels: "partial",
    distinct_sources: 1,
    angle: "Proteger entree ou terrasse de la pluie sans gros travaux",
    notes: "Signal Cdiscount abris/annexes et stores; prix marche grandes marquises 350-700 EUR. Source: https://www.cdiscount.com/jardin/abris-annexes-rangement/",
  },
  {
    product_name: "Escalier meunier gain de place bois et metal",
    source: "cdiscount",
    category: "space_saving_home",
    price_sell: 690,
    competitors_type: "few_or_none",
    sells_in_search: true,
    sells_in_shopping: true,
    legal_eu: true,
    not_available_on_generic_channels: "yes",
    distinct_sources: 1,
    angle: "Acceder a mezzanine/combles dans une petite surface",
    notes: "Signal Cdiscount bricolage/menuiserie; prix marche escaliers gain de place 550-1200 EUR. Source: https://www.cdiscount.com/bricolage/menuiserie/",
  },
  {
    product_name: "Cache climatisation exterieure aluminium design",
    source: "cdiscount",
    category: "home_exterior",
    price_sell: 260,
    competitors_type: "dropshippers_mixed",
    sells_in_search: true,
    sells_in_shopping: true,
    legal_eu: true,
    not_available_on_generic_channels: "partial",
    distinct_sources: 1,
    angle: "Cacher l'unite exterieure tout en gardant la ventilation",
    notes: "Signal Cdiscount maison/jardin; prix marche caches clim 200-400 EUR. Source: https://www.cdiscount.com/jardin/",
  },
  {
    product_name: "Tableau mural fine art grand format personnalisable",
    source: "flippa",
    category: "wall_art",
    price_sell: 350,
    competitors_type: "dropshippers_weak_sites",
    sells_in_search: true,
    sells_in_shopping: true,
    legal_eu: true,
    not_available_on_generic_channels: "partial",
    distinct_sources: 1,
    angle: "Piece deco emotionnelle grand format avec personnalisation",
    notes: "Flippa signale home decor/fine art eCommerce 50k$ revenue et 64% profit margin; prix marche grands formats 250-600 EUR. Source: https://flippa.com/buy/categories/home-and-garden",
  },
  {
    product_name: "Cloison acoustique mobile design pour bureau maison",
    source: "flippa",
    category: "home_acoustics",
    price_sell: 520,
    competitors_type: "few_or_none",
    sells_in_search: true,
    sells_in_shopping: true,
    legal_eu: true,
    not_available_on_generic_channels: "yes",
    distinct_sources: 1,
    angle: "Separer et calmer un espace teletravail sans travaux",
    notes: "Derive du signal Flippa home/garden et demande home office; prix marche cloisons acoustiques 400-900 EUR. Source: https://flippa.com/buy/categories/home-and-garden",
  },
  {
    product_name: "Niche chien isolee XXL design quatre saisons",
    source: "flippa",
    category: "pet",
    price_sell: 480,
    competitors_type: "dropshippers_mixed",
    sells_in_search: true,
    sells_in_shopping: true,
    legal_eu: true,
    not_available_on_generic_channels: "partial",
    distinct_sources: 1,
    angle: "Offrir un vrai abri isolant aux grands chiens dehors",
    notes: "Flippa categorie Pets + Home/Garden; prix marche niches isolees XXL 350-800 EUR. Source: https://flippa.com/buy/categories/home-and-garden/pets",
  },
  {
    product_name: "Sac de couchage quilt ultralight duvet 0 C",
    source: "flippa",
    category: "outdoor_gear",
    price_sell: 320,
    competitors_type: "semi_brands",
    sells_in_search: true,
    sells_in_shopping: true,
    legal_eu: true,
    not_available_on_generic_channels: "partial",
    distinct_sources: 1,
    is_seasonal: true,
    angle: "Materiel bivouac leger pour randonneurs qui veulent dormir chaud",
    notes: "Flippa inventory holding premium outdoor gear 800k$+ lifetime revenue; prix marche quilts duvet 250-500 EUR. Source: https://flippa.com/buy/sitetype/inventory-holding",
  },
  {
    product_name: "Fontaine de jardin murale pierre reconstituee",
    source: "flippa",
    category: "garden_water_feature",
    price_sell: 390,
    competitors_type: "dropshippers_mixed",
    sells_in_search: true,
    sells_in_shopping: true,
    legal_eu: true,
    not_available_on_generic_channels: "partial",
    distinct_sources: 1,
    angle: "Créer une terrasse mediterraneenne sans gros chantier",
    notes: "Flippa home/garden + tendance jardins decoratifs; prix marche fontaines murales 300-700 EUR. Sources: https://flippa.com/buy/categories/home-and-garden | https://www.countryliving.com/gardening/garden-ideas/a70160525/garden-trends-2026/",
  },
  {
    product_name: "Planche d'equilibre surf indoor bois premium",
    source: "flippa",
    category: "sports_training",
    price_sell: 220,
    competitors_type: "dropshippers_mixed",
    sells_in_search: true,
    sells_in_shopping: true,
    legal_eu: true,
    not_available_on_generic_channels: "partial",
    distinct_sources: 1,
    angle: "S'entrainer surf/snow chez soi avec objet deco sportif",
    notes: "Flippa sports/outdoor eCommerce signale 990k$ revenue; prix marche balance boards premium 180-350 EUR. Source: https://flippa.com/buy/categories/sports-and-outdoor",
  },
  {
    product_name: "Paravent decoratif a arches et rayures circuscore",
    source: "pinterest_trends",
    category: "home_decoration",
    price_sell: 360,
    competitors_type: "dropshippers_weak_sites",
    sells_in_search: true,
    sells_in_shopping: true,
    legal_eu: true,
    not_available_on_generic_channels: "yes",
    distinct_sources: 1,
    angle: "Ajouter un decor audacieux sans repeindre toute la piece",
    notes: "Pinterest Predicts 2026 FunHaus: circus interior +130%, striped ceiling +40%. Prix marche paravents design 250-600 EUR. Source: https://newsroom.pinterest.com/en-gb/news/pinterest-predicts-nonconformity-self-preservation-and-escapism-drive-21-trends-for-2026/",
  },
  {
    product_name: "Rideaux velours theatre et kit draperie plafond",
    source: "pinterest_trends",
    category: "event_home_decor",
    price_sell: 450,
    competitors_type: "dropshippers_mixed",
    sells_in_search: true,
    sells_in_shopping: true,
    legal_eu: true,
    not_available_on_generic_channels: "partial",
    distinct_sources: 1,
    angle: "Transformer salon ou evenement en decor opera",
    notes: "Pinterest Opera Aesthetic: wedding ceiling draping +40%, masquerade decor +40%. Prix marche kits velours/draping 300-800 EUR. Source: https://newsroom.pinterest.com/en-gb/news/pinterest-predicts-nonconformity-self-preservation-and-escapism-drive-21-trends-for-2026/",
  },
  {
    product_name: "Tapis laine tufte XXL motif geometrique Neo Deco",
    source: "pinterest_trends",
    category: "home_decoration",
    price_sell: 650,
    competitors_type: "semi_brands",
    sells_in_search: true,
    sells_in_shopping: true,
    legal_eu: true,
    not_available_on_generic_channels: "partial",
    distinct_sources: 1,
    angle: "Piece forte art deco pour salon sans changer les meubles",
    notes: "Pinterest Neo Deco: chevrons, chrome/laiton, retour art deco. Prix marche tapis laine XXL 500-1000 EUR. Source: https://newsroom.pinterest.com/en-gb/news/pinterest-predicts-nonconformity-self-preservation-and-escapism-drive-21-trends-for-2026/",
  },
  {
    product_name: "Fauteuil accent rattan Afrohemian",
    source: "pinterest_trends",
    category: "home_furniture",
    price_sell: 480,
    competitors_type: "dropshippers_mixed",
    sells_in_search: true,
    sells_in_shopping: true,
    legal_eu: true,
    not_available_on_generic_channels: "partial",
    distinct_sources: 1,
    angle: "Salon boheme africain avec piece assise naturelle",
    notes: "Pinterest Afrohemian Decor: rattan accent chair +50%, bamboo beaded curtains +60%. Prix marche fauteuils accent 350-700 EUR. Source: https://newsroom.pinterest.com/en-gb/news/pinterest-predicts-nonconformity-self-preservation-and-escapism-drive-21-trends-for-2026/",
  },
  {
    product_name: "Bar cart laiton et verre style antique",
    source: "pinterest_trends",
    category: "home_furniture",
    price_sell: 430,
    competitors_type: "dropshippers_weak_sites",
    sells_in_search: true,
    sells_in_shopping: true,
    legal_eu: true,
    not_available_on_generic_channels: "partial",
    distinct_sources: 1,
    angle: "Recevoir avec un coin cocktail mobile et decoratif",
    notes: "Pinterest Neo Deco: antique bar cart +100%, brass aesthetic +35%. Prix marche bars roulants 300-700 EUR. Source: https://newsroom.pinterest.com/en-gb/news/pinterest-predicts-nonconformity-self-preservation-and-escapism-drive-21-trends-for-2026/",
  },
  {
    product_name: "Banquette cuir capitonnee Art Deco",
    source: "pinterest_trends",
    category: "home_furniture",
    price_sell: 920,
    competitors_type: "semi_brands",
    sells_in_search: true,
    sells_in_shopping: true,
    legal_eu: true,
    not_available_on_generic_channels: "yes",
    distinct_sources: 1,
    angle: "Assise statement pour entree, salon ou restaurant boutique",
    notes: "Pinterest Neo Deco: leather banquette +35%. Prix marche banquettes cuir/design 700-1400 EUR. Source: https://newsroom.pinterest.com/en-gb/news/pinterest-predicts-nonconformity-self-preservation-and-escapism-drive-21-trends-for-2026/",
  },
  {
    product_name: "Vitrine cabinet de curiosites laiton et verre",
    source: "pinterest_trends",
    category: "home_furniture",
    price_sell: 780,
    competitors_type: "dropshippers_mixed",
    sells_in_search: true,
    sells_in_shopping: true,
    legal_eu: true,
    not_available_on_generic_channels: "yes",
    distinct_sources: 1,
    angle: "Mettre en scene collections et objets personnels",
    notes: "Pinterest curating/not copying + Neo Deco; prix marche vitrines laiton/verre 600-1200 EUR. Source: https://newsroom.pinterest.com/en-gb/news/pinterest-predicts-nonconformity-self-preservation-and-escapism-drive-21-trends-for-2026/",
  },
  {
    product_name: "Tapisserie murale Adire Afrohemian grand format",
    source: "pinterest_trends",
    category: "home_decoration",
    price_sell: 280,
    competitors_type: "dropshippers_weak_sites",
    sells_in_search: true,
    sells_in_shopping: true,
    legal_eu: true,
    not_available_on_generic_channels: "yes",
    distinct_sources: 1,
    angle: "Mur de caractere textile, culturel et chaleureux",
    notes: "Pinterest Afrohemian Decor: afrobohemian home decor +220%, adire fabric +130%, ethiopian art +50%. Prix marche tentures grand format 200-450 EUR. Source: https://newsroom.pinterest.com/en-gb/news/pinterest-predicts-nonconformity-self-preservation-and-escapism-drive-21-trends-for-2026/",
  },
  {
    product_name: "Panneaux muraux opalescents holographiques Extra Celestial",
    source: "pinterest_trends",
    category: "home_decoration",
    price_sell: 260,
    competitors_type: "dropshippers_weak_sites",
    sells_in_search: true,
    sells_in_shopping: true,
    legal_eu: true,
    not_available_on_generic_channels: "yes",
    distinct_sources: 1,
    angle: "Accent mural futuriste pour chambre, studio ou vitrine",
    notes: "Pinterest Extra Celestial: alien core +80%, opalescent +115%. Prix marche panneaux/decors muraux 200-500 EUR. Source: https://newsroom.pinterest.com/en-gb/news/pinterest-predicts-nonconformity-self-preservation-and-escapism-drive-21-trends-for-2026/",
  },
];

const platformLimits = [
  "Sous-agents multi_agent_v1 lances sur Bigbuy, Amazon Movers, Europages et Vevor; les quatre sessions sont restees running apres deux waits longs et interruption, puis ont ete fermees. Blocage delegation documente.",
  "Google Sheet: export CSV gid=0 tente; Google a retourne une page HTML 'Impossible d'ouvrir le fichier pour le moment'. Fallback TSV local rempli.",
  "Bigbuy: acces direct bigbuy.eu/fr bloque par robots.txt et beaucoup de miroirs low-ticket; 3 idees gardees seulement, compensation autorisee.",
  "Dotmarket: page consultee; idees physiques eligibles exposees etaient soit deja vues (luminaires/neons), soit bannies (CBD/complements), soit sous ticket (ballons silencieux). 0 candidat garde.",
  "Amazon Movers: pages category Amazon renvoient 503 a l'ouverture, signaux reconstruits via snippets Amazon + presse shopping.",
  "Temu: non utilise; total de candidats atteint sans dernier recours.",
];

function fieldLine(key, value) {
  if (value === undefined || value === null || value === "") return "";
  return `- ${key}: ${value}`;
}

function candidateBlock(c) {
  const lines = [
    `## ${c.product_name}`,
    fieldLine("source", c.source),
    fieldLine("category", c.category),
    fieldLine("price_sell", c.price_sell),
    fieldLine("competitors_type", c.competitors_type),
    fieldLine("sells_in_search", c.sells_in_search),
    fieldLine("sells_in_shopping", c.sells_in_shopping),
    fieldLine("legal_eu", c.legal_eu),
    fieldLine("not_available_on_generic_channels", c.not_available_on_generic_channels),
    fieldLine("distinct_sources", c.distinct_sources),
    fieldLine("is_seasonal", c.is_seasonal),
    fieldLine("notes", `${c.angle}. ${c.notes}`),
  ].filter(Boolean);
  return lines.join("\n");
}

function groupBySource() {
  const map = new Map();
  for (const c of candidates) {
    if (!map.has(c.source)) map.set(c.source, []);
    map.get(c.source).push(c);
  }
  return map;
}

async function writeCandidates() {
  const header = [
    `# Candidats - run ${runName}`,
    "",
    `${candidates.length} idees uniques collectees en flux broyeur-first.`,
    "price_source_ali volontairement absent: sourcing couts uniquement apres validation Hakim.",
    "Dotmarket et Bigbuy sous quota documentes; compensation par Vevor, Europages, Cdiscount, Pinterest, Amazon et Flippa.",
    "",
  ].join("\n");
  await fs.writeFile(path.join(runDir, "candidates.md"), header + candidates.map(candidateBlock).join("\n---\n") + "\n", "utf8");

  const sourcingDir = path.join(runDir, "sourcing");
  await fs.mkdir(sourcingDir, { recursive: true });
  const grouped = groupBySource();
  for (const [source, rows] of grouped) {
    const body = [
      `# Sourcing ${source}`,
      "",
      `Idees gardees: ${rows.length}`,
      "",
      ...rows.map((row) => candidateBlock(row) + "\n"),
    ].join("\n");
    await fs.writeFile(path.join(sourcingDir, `${source}.md`), body, "utf8");
  }
  await fs.writeFile(
    path.join(sourcingDir, "limits-and-exclusions.md"),
    `# Limites et exclusions\n\n${platformLimits.map((x) => `- ${x}`).join("\n")}\n\n## Produits coupes en amont\n\n- CBD, complements alimentaires, beauty, clothing, jewelry generique, food direct, computing, workwear, auto/moto generique, armes/adult.\n- Produits deja presents dans l'historique local: walking pad, mobilier transformable, salle de bain LED/douche, robot piscine, shampouineuse, litiere chat, brasero plancha, voliere, sauna, serre, fauteuil releveur, wallbox, kegerator, statue XXL, etc.\n`,
    "utf8",
  );
}

function resultMap(results) {
  return new Map(results.map((r) => [r.product_name, r]));
}

function rejectionReason(row, result) {
  if (!result) return "Non score";
  if (result.rejected_by) return result.rejected_by;
  if (result.decision === "reject") {
    if (result.flags?.length) return result.flags.join(", ");
    return "score < 55";
  }
  if (result.flags?.length) return result.flags.join(", ");
  return "";
}

function ideaRows(results) {
  const byName = resultMap(results);
  return candidates.map((c) => {
    const r = byName.get(c.product_name);
    return {
      ...c,
      score: r?.score ?? "",
      decision: r?.decision ?? "",
      rejected_by: r?.rejected_by ?? "",
      flags: r?.flags?.join(", ") ?? "",
      reason: rejectionReason(c, r),
    };
  }).sort((a, b) => {
    const as = typeof a.score === "number" ? a.score : -1;
    const bs = typeof b.score === "number" ? b.score : -1;
    return bs - as || a.product_name.localeCompare(b.product_name, "fr");
  });
}

async function writeFallback(rows) {
  const headers = [
    "produit",
    "plateforme(s)",
    "categorie",
    "prix marche EUR",
    "competitors_type",
    "sells_in_search",
    "sells_in_shopping",
    "legal_eu",
    "defendabilite niche",
    "distinct_sources",
    "score broyeur",
    "decision",
    "rejete par (hard filter)",
    "flags",
    "raison de rejet",
    "angle/notes",
  ];
  const lines = [headers.join("\t")];
  for (const row of rows) {
    lines.push([
      row.product_name,
      row.source,
      row.category,
      row.price_sell,
      row.competitors_type,
      row.sells_in_search,
      row.sells_in_shopping,
      row.legal_eu,
      row.not_available_on_generic_channels,
      row.distinct_sources,
      row.score,
      row.decision,
      row.rejected_by,
      row.flags,
      row.reason,
      `${row.angle}. ${row.notes}`,
    ].map((v) => String(v ?? "").replace(/\t/g, " ").replace(/\n/g, " ")).join("\t"));
  }
  await fs.writeFile(path.join(runDir, "google-sheet-fallback.tsv"), lines.join("\n") + "\n", "utf8");
}

async function writeWorkbook(rows) {
  const workbook = Workbook.create();
  const sheet = workbook.worksheets.add("Ideas");
  sheet.showGridLines = false;

  const headers = [
    "produit",
    "plateforme(s)",
    "categorie",
    "prix marche EUR",
    "competitors_type",
    "sells_in_search",
    "sells_in_shopping",
    "legal_eu",
    "defendabilite niche",
    "distinct_sources",
    "score broyeur",
    "decision",
    "rejete par (hard filter)",
    "flags",
    "raison de rejet",
    "angle/notes",
    "sources URLs",
  ];
  const values = rows.map((row) => [
    row.product_name,
    row.source,
    row.category,
    row.price_sell,
    row.competitors_type,
    row.sells_in_search,
    row.sells_in_shopping,
    row.legal_eu,
    row.not_available_on_generic_channels,
    row.distinct_sources,
    row.score,
    row.decision,
    row.rejected_by,
    row.flags,
    row.reason,
    row.angle,
    row.notes,
  ]);

  sheet.getRange("A1:Q1").merge();
  sheet.getRange("A1").values = [[`Flux broyeur - controle idees - ${runName}`]];
  sheet.getRange("A2:Q2").merge();
  sheet.getRange("A2").values = [[`${rows.length} idees scorees. price_source_ali vide: margin_ratio_missing attendu jusqu'a l'etape 6. Google Sheet natif bloque, fallback TSV rempli.`]];
  sheet.getRangeByIndexes(2, 0, 1, headers.length).values = [headers];
  sheet.getRangeByIndexes(3, 0, values.length, headers.length).values = values;

  const used = sheet.getRangeByIndexes(0, 0, values.length + 3, headers.length);
  used.format.font = { name: "Aptos", size: 10, color: "#111827" };
  sheet.getRange("A1").format = {
    fill: "#111827",
    font: { bold: true, color: "#FFFFFF", size: 14 },
  };
  sheet.getRange("A2").format = {
    fill: "#E5E7EB",
    font: { color: "#374151", size: 10 },
  };
  const headerRange = sheet.getRangeByIndexes(2, 0, 1, headers.length);
  headerRange.format = {
    fill: "#1F4E79",
    font: { bold: true, color: "#FFFFFF" },
  };
  headerRange.format.wrapText = true;
  const dataRange = sheet.getRangeByIndexes(3, 0, values.length, headers.length);
  dataRange.format.borders = {
    insideHorizontal: { style: "thin", color: "#E5E7EB" },
    insideVertical: { style: "thin", color: "#F3F4F6" },
    bottom: { style: "thin", color: "#D1D5DB" },
  };
  dataRange.format.wrapText = true;
  sheet.getRangeByIndexes(3, 3, values.length, 1).setNumberFormat("#,##0");
  sheet.getRangeByIndexes(3, 9, values.length, 2).setNumberFormat("0");
  sheet.freezePanes.freezeRows(3);
  const tableRange = `A3:Q${values.length + 3}`;
  const table = sheet.tables.add(tableRange, true, "IdeasTable");
  table.style = "TableStyleMedium2";
  table.showFilterButton = true;

  const widths = [32, 14, 20, 13, 20, 12, 13, 10, 17, 12, 11, 11, 18, 24, 24, 38, 64];
  widths.forEach((w, i) => {
    sheet.getRangeByIndexes(0, i, values.length + 3, 1).format.columnWidth = w;
  });
  sheet.getRange("A1:A2").format.rowHeight = 28;
  sheet.getRangeByIndexes(3, 0, values.length, headers.length).format.rowHeight = 48;

  const decisionRange = sheet.getRangeByIndexes(3, 11, values.length, 1);
  decisionRange.conditionalFormats.add("containsText", {
    text: "review",
    format: { fill: "#FEF3C7", font: { color: "#92400E", bold: true } },
  });
  decisionRange.conditionalFormats.add("containsText", {
    text: "reject",
    format: { fill: "#FEE2E2", font: { color: "#991B1B", bold: true } },
  });
  decisionRange.conditionalFormats.add("containsText", {
    text: "shortlist",
    format: { fill: "#DCFCE7", font: { color: "#166534", bold: true } },
  });
  const scoreRange = sheet.getRangeByIndexes(3, 10, values.length, 1);
  scoreRange.conditionalFormats.add("colorScale", {
    criteria: [
      { type: "lowestValue", color: "#FCA5A5" },
      { type: "percentile", value: 50, color: "#FDE68A" },
      { type: "highestValue", color: "#86EFAC" },
    ],
  });

  const errorScan = await workbook.inspect({
    kind: "match",
    searchTerm: "#REF!|#DIV/0!|#VALUE!|#NAME\\?|#N/A",
    options: { useRegex: true, maxResults: 50 },
    summary: "final formula error scan",
  });
  await fs.writeFile(path.join(runDir, "ideas-inspect-errors.ndjson"), errorScan.ndjson, "utf8");

  const preview = await workbook.render({ sheetName: "Ideas", range: "A1:Q18", scale: 1, format: "png" });
  await fs.writeFile(path.join(runDir, "ideas-preview.png"), new Uint8Array(await preview.arrayBuffer()));

  const output = await SpreadsheetFile.exportXlsx(workbook);
  await output.save(path.join(runDir, "ideas.xlsx"));
}

async function writeRunDocs(rows, results) {
  const counts = rows.reduce((acc, row) => {
    acc[row.decision] = (acc[row.decision] || 0) + 1;
    return acc;
  }, {});
  const sourceCounts = Array.from(groupBySource()).map(([source, list]) => `| ${source} | ${list.length} |`).join("\n");
  const topRows = rows.slice(0, 12).map((row, i) => `| ${i + 1} | ${row.product_name} | ${row.score} | ${row.source} | ${row.decision} | ${row.reason || "a valider"} |`).join("\n");
  const rejectedHard = results.filter((r) => r.rejected_by).length;
  const researchRun = `# Research Run

## Identite

- Run : recherche large (flux broyeur)
- Dossier : ${runName}
- Date : 2026-07-03
- Responsable orchestration : Codex
- Pays cible : FR/BE/CH/LU
- Langue : francais
- Business : SASU / OH Ventures
- Canal prioritaire : Google Shopping + Google Search
- Objectif : 50-60 idees brutes multi-plateformes, broyeur sur 100 %, Excel de controle, STOP avant Semrush

## Statut obligatoire des outils

| Outil | Statut | Preuve / limite | Impact |
|---|---|---|---|
| Google Sheet obligatoire | bloque apres tentative | export CSV gid=0 a retourne HTML Google "Impossible d'ouvrir le fichier"; app Google Drive/Sheets non disponible via tool_search | fallback TSV rempli; report natif reste a faire |
| Sous-agents sourcing | bloque | 4 agents lances puis timeouts longs + interruption sans final; sessions fermees | sourcing repris localement avec web |
| Kloow | non demarre | etape 5 seulement apres validation Hakim | conforme STOP etape 4 |
| Semrush France | non demarre | etape 5 seulement | aucun GO final a ce stade |
| Google Trends France | non demarre | etape 5 pour idees retenues | tendances Pinterest seulement en sourcing |
| Google Shopping/Search | utilise indirectement | prix marche via Amazon/Cdiscount/VEVOR/Europages/Flippa/Pinterest + comparables web; ads live non garanties | score canal preliminaire |
| AliExpress Computer Use | non demarre | etape 6 apres validation | price_source_ali vide; margin_ratio_missing attendu |

## Anti-doublon

- Google Sheet consulte : tentative export CSV bloquee.
- Historique local consulte : products/ existants, history-export.csv 2026-06-26, candidates/fallback/research-run 2026-07-03-recherche-large.
- Produits exclus : walking pad, mobilier transformable, salle de bain LED/douche, robots piscine/menage, litiere chat, brasero plancha, voliere XXL, sauna, serre, fauteuil releveur, wallbox, kegerator, statue XXL, luminaires design et neons deja vus, etc.

## Sourcing multi-plateformes

| Plateforme | Idees gardees |
|---|---:|
${sourceCounts}
| dotmarket | 0 |
| temu | 0 |

Total : ${candidates.length} idees uniques.

## Limites de sourcing

${platformLimits.map((x) => `- ${x}`).join("\n")}

## Broyeur

- Commande : \`python -m broyeur.run --input researches/${runName}/candidates.md --format md\`
- Resultat : ${results.length} produits -> ${counts.shortlist || 0} shortlist / ${counts.review || 0} review / ${counts.reject || 0} reject.
- Hard filters au broyeur : ${rejectedHard}.
- Lecture : sans price_source_ali, tous les candidats ont \`margin_ratio_missing\`; le plafond en review est attendu.

## Top classement

| Rang | Produit | Score | Source | Decision | Raison |
|---:|---|---:|---|---|---|
${topRows}

## Livraison et STOP

| Exigence | Statut |
|---|---|
| 50-60 idees collectees | OK - ${candidates.length} |
| candidates.md format broyeur | OK |
| Broyeur execute sur 100 % | OK - broyeur-results.json |
| Excel de controle | OK - ideas.xlsx |
| Google Sheet | BLOQUE - fallback TSV rempli |
| Kloow/Semrush | STOP avant etape 5 |
| AliExpress | STOP avant etape 6 |
`;
  await fs.writeFile(path.join(runDir, "research-run.md"), researchRun, "utf8");

  const request = `# Product Research Request

## Cadrage

- Date : 2026-07-03
- Demandeur : Hakim
- Pays cible : France / Belgique / Suisse / Luxembourg
- Langue : francais
- Business : SASU / OH Ventures
- Canal prioritaire : Google Shopping + Google Search
- Objectif : 1 a 2 produits testables apres validation Hakim + Semrush/Kloow + sourcing AliExpress

## Contraintes

- Budget test approximatif : non renseigne
- Prix TTC cible : 150-2000 EUR, sweet spot 600-900 EUR
- Niches souhaitees : recherche large
- Niches interdites : beauty, clothing, jewelry generique, food direct, computing, workwear, car_motorbike_generic, adult, weapons
- Produits deja envisages : voir anti-doublon local dans research-run.md
- Produits explicitement autorises meme si proches d'un historique : aucun
- Contraintes legales/SAV : legal_eu false interdit; produits lourds/electriques a valider apres Gate Hakim
- Outils disponibles : Google public/web; Kloow/Semrush et AliExpress non demarres avant validation

## Anti-doublon

- Google Sheet consulte : tentative bloquee (export HTML page introuvable/impossible d'ouvrir)
- Feuilles consultees : historique local + ancienne export CSV locale
- Produits deja analyses a exclure : products/ + recherches 2026-06-26 + 2026-07-03-recherche-large
- Limites d'acces : Google Drive/Sheets app non disponible; fallback TSV obligatoire rempli

## Sortie attendue

- Nombre d'idees brutes : ${candidates.length}
- Nombre de produits a scorer : ${candidates.length}
- Niveau de profondeur : sourcing large + broyeur; STOP avant Semrush
- Deadline : immediate
`;
  await fs.writeFile(path.join(runDir, "request.md"), request, "utf8");

  const weekly = `# Weekly Report

## Semaine

- Dates : 2026-07-03
- Feuille Google Sheet : BLOQUEE - fallback \`google-sheet-fallback.tsv\`
- Produits bruts : ${candidates.length}
- Produits scores : ${results.length}
- GO : 0 (STOP avant Semrush + AliExpress)
- MAYBE/review : ${counts.review || 0}
- NO-GO/reject : ${counts.reject || 0}

## Classement

| Rang | Produit | Score | Canal | Verdict | Raison |
|---:|---|---:|---|---|---|
${topRows}

## Produit recommande

- Produit : a valider par Hakim depuis ideas.xlsx
- Pourquoi : le broyeur classe les idees, mais sans cout fournisseur ni Semrush aucun GO n'est autorise
- Risque principal : score incomplet par \`margin_ratio_missing\`, acces Google Sheet bloque
- Condition : validation Hakim puis Semrush/Kloow France et AliExpress en serie
- Prochaine action : attendre validation Hakim

## Limites

- Google Sheet : export direct bloque; fallback TSV rempli
- Trends : non execute, prevu etape 5
- Semrush : non execute, STOP protocole
- AliExpress : non execute, STOP protocole
- Concurrents : qualification SERP preliminaire seulement
`;
  await fs.writeFile(path.join(runDir, "weekly-report.md"), weekly, "utf8");
}

async function main() {
  const mode = process.argv[2] || "all";
  if (mode === "candidates" || mode === "all") {
    await writeCandidates();
  }
  if (mode === "final" || mode === "all") {
    const resultsPath = path.join(runDir, "broyeur-results.json");
    const results = JSON.parse(await fs.readFile(resultsPath, "utf8"));
    const rows = ideaRows(results);
    await writeFallback(rows);
    await writeWorkbook(rows);
    await writeRunDocs(rows, results);
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
