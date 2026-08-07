import fs from "node:fs/promises";
import path from "node:path";
import { SpreadsheetFile, Workbook } from "@oai/artifact-tool";

const outputDir = "/Users/Hakim/Documents/New project/outputs/coloriage-kawaii-arborescence-2026-07-09";
const sourcePath = "/Users/Hakim/Downloads/amazon.fr-organic-keywords-subdomains-fr-_2026-07-09_19-21-08.csv";
const outputPath = path.join(outputDir, "arborescence-site-coloriages-kawaii-concurrents-sourcing.xlsx");

function parseTSVLine(line) {
  const out = [];
  let cur = "";
  let inQuotes = false;
  for (let i = 0; i < line.length; i += 1) {
    const ch = line[i];
    if (ch === '"') {
      if (inQuotes && line[i + 1] === '"') {
        cur += '"';
        i += 1;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (ch === "\t" && !inQuotes) {
      out.push(cur);
      cur = "";
    } else {
      cur += ch;
    }
  }
  out.push(cur);
  return out;
}

function normalize(value) {
  return String(value ?? "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

function slugify(value) {
  return normalize(value).replace(/\s+/g, "-");
}

function toNumber(value) {
  if (value === undefined || value === null || value === "") return null;
  const n = Number(String(value).replace(",", "."));
  return Number.isFinite(n) ? n : null;
}

function readAhrefsRows(text) {
  const clean = text.replace(/^\uFEFF/, "");
  const lines = clean.split(/\r?\n/).filter(Boolean);
  const headers = parseTSVLine(lines[0]);
  return lines.slice(1).map((line) => {
    const cells = parseTSVLine(line);
    const row = {};
    headers.forEach((header, index) => {
      row[header] = cells[index] ?? "";
    });
    return row;
  });
}

function sourceByKeyword(rows) {
  const byKey = new Map();
  for (const row of rows) {
    const key = normalize(row.Keyword);
    const volume = toNumber(row.Volume) ?? 0;
    const current = byKey.get(key);
    if (!current || volume > (toNumber(current.Volume) ?? 0)) {
      byKey.set(key, row);
    }
  }
  return byKey;
}

function sourceMetrics(byKey, keyword) {
  const row = byKey.get(normalize(keyword));
  if (!row) {
    return {
      sourceKeyword: keyword,
      volume: 0,
      kd: 0,
      cpc: null,
      informational: false,
      commercial: true,
      transactional: false,
      currentUrl: "",
      currentPosition: "",
    };
  }
  return {
    sourceKeyword: row.Keyword,
    volume: toNumber(row.Volume) ?? 0,
    kd: toNumber(row.KD) ?? 0,
    cpc: toNumber(row.CPC),
    informational: row.Informational === "TRUE" || row.Informational === "True" || row.Informational === "true",
    commercial: row.Commercial === "TRUE" || row.Commercial === "True" || row.Commercial === "true",
    transactional: row.Transactional === "TRUE" || row.Transactional === "True" || row.Transactional === "true",
    currentUrl: row["Current URL"] ?? "",
    currentPosition: row["Current position"] ?? "",
  };
}

const collectionsSeed = [
  {
    pillar: "Coloriages",
    keyword: "coloriage kawaii",
    priority: "P1",
    sku: 45,
    avgPrice: 24.9,
    role: "Collection pilier SEO et commerciale",
    brief: "Livres, carnets, packs imprimés, bundles découverte. Page mère à mailler vers tous les thèmes kawaii.",
    sourcing: "kawaii coloring book, cute coloring pages book, kids coloring book bundle",
  },
  {
    pillar: "Coloriages",
    keyword: "coloriage adulte",
    priority: "P1",
    sku: 35,
    avgPrice: 29.9,
    role: "Segment panier plus élevé",
    brief: "Cahiers anti-stress, mandalas kawaii, carnets premium papier épais, packs feutres + livre.",
    sourcing: "adult coloring book, stress relief coloring book, cute mandala coloring",
  },
  {
    pillar: "Coloriages",
    keyword: "coloriage magique",
    priority: "P1",
    sku: 30,
    avgPrice: 22.9,
    role: "Collection enfant/giftable",
    brief: "Livres à révélation, feutres magiques, cahiers effaçables, packs cadeaux anniversaire.",
    sourcing: "magic coloring book, reusable coloring book, water coloring book",
  },
  {
    pillar: "Coloriages",
    keyword: "coloriage mystere",
    priority: "P1",
    sku: 30,
    avgPrice: 24.9,
    role: "Angle découverte et retention",
    brief: "Coloriages mystères par numéros, pixels kawaii, animaux cachés, cartes surprises.",
    sourcing: "mystery coloring book, color by number cute, pixel coloring book",
  },
  {
    pillar: "Coloriages",
    keyword: "coloriage cosy",
    priority: "P1",
    sku: 30,
    avgPrice: 27.9,
    role: "Positionnement marque cosy",
    brief: "Univers cocooning : chats, thé, maison, automne, journaling, packs relaxation.",
    sourcing: "cozy coloring book, cottagecore coloring book, cute home coloring",
  },
  {
    pillar: "Coloriages",
    keyword: "coloriage manga",
    priority: "P2",
    sku: 25,
    avgPrice: 24.9,
    role: "Trafic passion mais IP-safe",
    brief: "Personnages originaux manga/chibi, expressions, tenues, cahiers apprentissage dessin.",
    sourcing: "manga coloring book, chibi coloring book, anime style coloring book",
  },
  {
    pillar: "Coloriages",
    keyword: "coloriage foot",
    priority: "P2",
    sku: 25,
    avgPrice: 19.9,
    role: "Collection cadeau enfant",
    brief: "Coloriages football génériques, maillots non licenciés, trophées, ballons, activités anniversaire.",
    sourcing: "football coloring book, soccer coloring pages book, sports coloring book",
  },
  {
    pillar: "Coloriages",
    keyword: "coloriage fille",
    priority: "P2",
    sku: 25,
    avgPrice: 19.9,
    role: "Requête large enfant",
    brief: "Licornes, animaux mignons, sirènes, mode, stickers. Attention à garder un wording inclusif en site.",
    sourcing: "girls coloring book, unicorn coloring book, cute animals coloring",
  },
  {
    pillar: "Coloriages",
    keyword: "coloriage kawaii fille",
    priority: "P2",
    sku: 25,
    avgPrice: 19.9,
    role: "Longue traîne transactionnelle",
    brief: "Déclinaison plus ciblée de la page pilier, à mailler depuis coloriage kawaii et coloriage fille.",
    sourcing: "kawaii girl coloring book, cute coloring book girl, kawaii activity book",
  },
  {
    pillar: "Thèmes kawaii",
    keyword: "chat kawaii",
    priority: "P2",
    sku: 20,
    avgPrice: 22.9,
    role: "Thème très brandable",
    brief: "Collection de livres, stickers, marque-pages et mini kits autour du chat kawaii.",
    sourcing: "kawaii cat coloring book, cute cat stationery, cat sticker book",
  },
  {
    pillar: "Accessoires",
    keyword: "feutre acrylique",
    priority: "P1",
    sku: 40,
    avgPrice: 29.9,
    role: "Monétisation accessoire forte",
    brief: "Sets de feutres, pointes fines, packs couleurs pastel, bundle avec cahiers papier épais.",
    sourcing: "acrylic markers set pastel, acrylic paint pens, dual tip acrylic markers",
  },
  {
    pillar: "Accessoires",
    keyword: "feutre a alcool",
    priority: "P2",
    sku: 30,
    avgPrice: 34.9,
    role: "Panier moyen et upsell",
    brief: "Sets alcohol markers, nuanciers, pochettes rangement, packs débutant et premium.",
    sourcing: "alcohol markers set, dual tip alcohol marker, marker storage case",
  },
  {
    pillar: "Accessoires",
    keyword: "trousse kawaii",
    priority: "P2",
    sku: 20,
    avgPrice: 19.9,
    role: "Produit léger et cadeau",
    brief: "Trousses mignonnes, pochettes feutres, rangement coloriage, lots rentrée.",
    sourcing: "kawaii pencil case, cute stationery pouch, marker pencil case",
  },
  {
    pillar: "Cadeaux creatifs",
    keyword: "marque page personnalisé",
    priority: "P2",
    sku: 20,
    avgPrice: 14.9,
    role: "AOV par personnalisation",
    brief: "Marque-pages prénom, chats, fleurs, citations, lots de 3 et bundle cahier.",
    sourcing: "custom bookmark, personalized bookmark, cute bookmark set",
  },
  {
    pillar: "Cadeaux creatifs",
    keyword: "diamond painting personnalisé",
    priority: "P2",
    sku: 30,
    avgPrice: 34.9,
    role: "Produit cadeau à marge",
    brief: "Kits personnalisés, formats petits faciles à expédier, modèles animaux kawaii.",
    sourcing: "custom diamond painting kit, personalized diamond painting, small diamond art kit",
  },
];

const skuPatterns = {
  "coloriage kawaii": "15 livres thématiques, 10 carnets, 10 packs pages, 5 bundles feutres, 5 éditions cadeau",
  "coloriage adulte": "12 livres premium, 8 mandalas kawaii, 6 kits relaxation, 5 carnets papier épais, 4 bundles",
  "coloriage magique": "10 livres eau, 8 feutres magiques, 6 cahiers réutilisables, 4 sets anniversaire, 2 packs voyage",
  "coloriage mystere": "10 livres par numéros, 8 pixel art, 6 cartes mystère, 4 packs animaux, 2 mini formats",
  "coloriage cosy": "10 livres cocooning, 6 automne, 5 chats, 5 cottagecore, 4 bundles détente",
  "coloriage manga": "8 chibi, 6 personnages originaux, 5 expressions, 4 tenues, 2 apprentissage dessin",
  "coloriage foot": "8 cahiers football, 6 packs anniversaire, 5 ballons/trophées, 4 mini livres, 2 stickers",
  "coloriage fille": "8 licornes, 6 animaux, 5 sirènes, 4 mode, 2 packs stickers",
  "coloriage kawaii fille": "8 livres kawaii, 6 animaux, 5 sirènes/licornes, 4 mini carnets, 2 bundles",
  "chat kawaii": "8 livres chats, 4 stickers, 4 marque-pages, 2 cartes, 2 mini carnets",
  "feutre acrylique": "12 sets pastel, 8 pointes fines, 6 double pointe, 6 kits surfaces, 8 bundles",
  "feutre a alcool": "10 sets débutant, 8 sets premium, 5 nuanciers, 4 pochettes, 3 bundles livre",
  "trousse kawaii": "8 trousses grands formats, 5 pochettes feutres, 4 lots rentrée, 3 trousses personnalisées",
  "marque page personnalisé": "8 prénoms, 4 chats, 4 fleurs, 2 citations, 2 lots cadeau",
  "diamond painting personnalisé": "10 formats portrait, 6 animaux, 5 mini kits, 5 packs cadeau, 4 accessoires",
};

const menuGroups = [
  ["Coloriages", "/collections/coloriage-kawaii", "Coloriages kawaii", "Menu principal"],
  ["Accessoires", "/collections/feutre-acrylique", "Feutres et accessoires", "Menu principal"],
  ["Cadeaux creatifs", "/collections/diamond-painting-personnalise", "Cadeaux creatifs", "Menu principal"],
];

const competitors = [
  {
    name: "AICrayons",
    url: "https://aicrayons.fr/",
    proof: "https://aicrayons.fr/produit/carnet-a-spirale-les-zanimaux-kawaii/",
    market: "France / français",
    france: "Oui - acteur local",
    positioning: "Carnets physiques et PDF kawaii, chibi, cosy, fantasy et grayscale.",
    specialization: "Très proche",
    price: "13,90 EUR le carnet spiralé observé",
    maturity: "Catalogue étoffé, CGV et retours structurés; peu d'avis visibles.",
    strengths: "Livraison locale, physique + numérique, papier 120 g, prix accessible.",
    weaknesses: "Univers graphique dispersé et peu incarné.",
    opportunity: "Construire une marque kawaii cohérente avec mascottes et preuves de qualité.",
    threat: "Haute",
  },
  {
    name: "MyCuttieBox",
    url: "https://mycuttiebox.fr/",
    proof: "https://mycuttiebox.fr/precommande/product-box-cosy-page",
    market: "France / français",
    france: "Oui - acteur local",
    positioning: "Box cosy avec carnet, marqueur blanc, bougie, stickers et bijou de sac.",
    specialization: "Concept extrêmement proche",
    price: "24,90-29,90 EUR la box",
    maturity: "Première édition en précommande; bonus limité aux premières commandes.",
    strengths: "Concept cadeau, panier moyen supérieur, mascottes et illustrations propriétaires.",
    weaknesses: "Faible profondeur de catalogue, logistique de box, offre encore saisonnière.",
    opportunity: "Déployer des collections permanentes et des kits personnalisables.",
    threat: "Haute",
  },
  {
    name: "Nippon Kawaii",
    url: "https://www.nipponkawaii.nl/en/",
    proof: "https://www.nipponkawaii.nl/en/collections/cozy-coloring-books-1",
    market: "Pays-Bas / NL-EN-DE",
    france: "Oui - expédition UE",
    positioning: "Boutique kawaii avec livres cosy, peluches, papeterie et accessoires.",
    specialization: "Proche - coloriage secondaire",
    price: "Livraison France affichée à partir de 9,99 EUR",
    maturity: "Depuis 2016, 540+ avis et note annoncée de 9,8/10.",
    strengths: "Confiance, stock UE, licences officielles, expédition rapide et cross-sell.",
    weaknesses: "Peu de livres cosy, ruptures et aucune localisation française.",
    opportunity: "Proposer plus de profondeur, du SEO français et des bundles spécialisés.",
    threat: "Moyenne",
  },
  {
    name: "Cozykleuren.nl",
    url: "https://cozykleuren.nl/",
    proof: "https://cozykleuren.nl/pages/over-ons",
    market: "Pays-Bas / néerlandais",
    france: "France sélectionnable; tarif à confirmer",
    positioning: "Livres cosy, marqueurs alcool, crayons et accessoires de protection.",
    specialization: "Coloriage pur",
    price: "N/D pour la France",
    maturity: "Équipe de quatre, entrepôt, société et TVA affichés.",
    strengths: "Arborescence aboutie, assortiment livres + consommables, hausse de panier.",
    weaknesses: "Pas de français, livraison France peu claire et ruptures visibles.",
    opportunity: "Répliquer le modèle catalogue en version française avec stock fiable.",
    threat: "Moyenne",
  },
  {
    name: "Bobbie Goods",
    url: "https://bobbiegoods.com/",
    proof: "https://bobbiegoods.com/products/this-n-that-coloring-book",
    market: "États-Unis / anglais",
    france: "Oui - international",
    positioning: "Livres premium et accessoires autour de personnages propriétaires.",
    specialization: "Pur cute/cozy coloring",
    price: "22 USD le livre observé",
    maturity: "Marque familiale depuis 2021; une référence à 584 avis, 98% positifs.",
    strengths: "Univers reconnaissable, rareté, papier épais et communauté forte.",
    weaknesses: "Frais, douane et délais internationaux; peu de pages par livre.",
    opportunity: "Qualité comparable avec stock UE et prix livré inférieur.",
    threat: "Moyenne",
  },
  {
    name: "Belly Bean Co.",
    url: "https://bellybeanco.com/",
    proof: "https://bellybeanco.com/",
    market: "Canada / anglais + éditions françaises",
    france: "Oui - international",
    positioning: "Livres physiques et PDF cute/cozy, éditions françaises et livres techniques.",
    specialization: "Pur cute/cozy coloring",
    price: "12-29 CAD; éditions françaises autour de 16 CAD",
    maturity: "Catalogue profond, collaboration éditoriale et présence sur cinq réseaux.",
    strengths: "Éditions françaises, papier premium, thèmes et formats variés.",
    weaknesses: "Expédition canadienne coûteuse et quelques affichages produit confus.",
    opportunity: "Faire mieux sur le coût rendu, le stock UE et la clarté du catalogue.",
    threat: "Haute",
  },
  {
    name: "Chloe & Maisy Co.",
    url: "https://chloeandmaisy.com/",
    proof: "https://chloeandmaisy.com/pages/faq",
    market: "États-Unis / anglais",
    france: "Oui - livraison mondiale annoncée",
    positioning: "Livres et PDF autour de deux personnages propriétaires, plus protège-pages.",
    specialization: "Pur cute/cozy coloring",
    price: "22,99 USD le livre; bundle autour de 62,99 USD",
    maturity: "Environ 120 avis visibles, galerie clients et vente exclusivement directe.",
    strengths: "Personnages propriétaires, papier premium et storytelling fort.",
    weaknesses: "Catalogue étroit, anglais et droits de douane potentiels.",
    opportunity: "Créer un univers propriétaire francophone avec davantage de collections.",
    threat: "Moyenne",
  },
  {
    name: "Giggles & Grace Books",
    url: "https://www.gigglesandgracebooks.com/",
    proof: "https://www.gigglesandgracebooks.com/",
    market: "États-Unis / anglais",
    france: "Oui - livraison mondiale annoncée",
    positioning: "25+ éditions revendiquées, livres physiques, PDF, personnalisation et B2B.",
    specialization: "Coloriage pur",
    price: "7,99-12,99 USD physique; 1,99-2,99 USD PDF",
    maturity: "Catalogue profond, portail wholesale et papier 120 g.",
    strengths: "Prix, profondeur, personnalisation et offre professionnelle.",
    weaknesses: "Quelques incohérences visibles dans les chiffres marketing et les avis.",
    opportunity: "Combiner profondeur catalogue et preuves de confiance plus solides.",
    threat: "Moyenne",
  },
  {
    name: "Amélie's Workshop",
    url: "https://ameliesworkshop.fr/en",
    proof: "https://ameliesworkshop.fr/en",
    market: "France / français-anglais",
    france: "Oui - expédition locale",
    positioning: "Livres kawaii/cozy sur le Japon, stickers, marque-pages et carnets.",
    specialization: "Proche - papeterie élargie",
    price: "9,95-18 EUR les livres observés",
    maturity: "Entreprise indépendante depuis 2017, expédition annoncée en 3-4 jours.",
    strengths: "Univers d'illustratrice, collections saisonnières et logistique locale.",
    weaknesses: "Le catalogue de papeterie dilue la spécialisation coloriage.",
    opportunity: "Être plus profond sur le coloriage et structurer les thèmes en collections SEO.",
    threat: "Moyenne",
  },
  {
    name: "Whimsy Tales",
    url: "https://whimsytales.com/",
    proof: "https://whimsytales.com/policies/shipping-policy",
    market: "Indonésie/Canada / anglais",
    france: "Numérique; pas de physique sur le site",
    positioning: "Références numériques kawaii/fantasy, blog SEO, échantillons et newsletter.",
    specialization: "Proche - numérique",
    price: "7-18 CAD sur les références observées",
    maturity: "Environ 19 références et narration de marque structurée.",
    strengths: "Illustrations originales, contenu organique et acquisition par échantillons.",
    weaknesses: "Aucun produit physique expédié depuis le domaine.",
    opportunity: "Occuper le physique et les bundles tout en gardant une stratégie de contenu.",
    threat: "Faible",
  },
  {
    name: "Bloom & Bolt",
    url: "https://bloomandboltcoloring.com/",
    proof: "https://bloomandboltcoloring.com/pages/faq",
    market: "États-Unis probable / anglais",
    france: "Oui - international au checkout",
    positioning: "Livres spiralés premium, PDF, bundles et pinces de maintien.",
    specialization: "Pur cozy coloring",
    price: "22,99-24,99 USD physique; 5 USD PDF",
    maturity: "Marque émergente, cinq livres physiques, six numériques et peu d'avis.",
    strengths: "Papier épais, reliure à plat, accessoires utiles et bundles.",
    weaknesses: "Prix livré élevé pour la France et preuve sociale faible.",
    opportunity: "Reprendre les bénéfices d'usage avec une livraison européenne.",
    threat: "Faible",
  },
  {
    name: "Ruth's Coloring",
    url: "https://ruthscoloring.com/",
    proof: "https://ruthscoloring.com/collections/digital-downloads",
    market: "États-Unis / anglais",
    france: "Numérique uniquement observé",
    positioning: "PDF quirky cute, animaux, cartes et scènes cosy aux lignes épaisses.",
    specialization: "Très proche - numérique",
    price: "3-8 USD le PDF",
    maturity: "Micro-marque d'illustratrice, catalogue profond et présence sociale.",
    strengths: "Identité d'artiste, marges du numérique, thèmes variés et freebies.",
    weaknesses: "Pas d'offre physique trouvée et univers moins homogène.",
    opportunity: "Décliner les thèmes gagnants en livres et kits physiques français.",
    threat: "Faible",
  },
  {
    name: "Berrie Coloring",
    url: "https://berriecoloring.com/",
    proof: "https://berriecoloring.com/collections/all",
    market: "Pays non affiché / anglais",
    france: "Numérique oui; physique non confirmé",
    positioning: "Séries cute & cozy, saisons, voyage, fantasy et calendrier.",
    specialization: "Pur cute/cozy",
    price: "9,99 USD sur les séries observées",
    maturity: "Catalogue structuré en 16 produits; plusieurs physiques épuisés.",
    strengths: "Système de collections répétable et identité reconnaissable.",
    weaknesses: "Stock physique faible et livraison peu transparente.",
    opportunity: "Stock européen fiable et bundles avec feutres.",
    threat: "Faible",
  },
  {
    name: "Kawaii Sprouts",
    url: "https://www.kawaiisprouts.com/",
    proof: "https://www.kawaiisprouts.com/products/kawaii-sprout-50-page-coloring-book",
    market: "Pays non affiché / anglais",
    france: "Expédition mondiale annoncée",
    positioning: "Personnages originaux, livre principal et petits packs numériques.",
    specialization: "Kawaii pur",
    price: "2,99-5,99 USD sur les petits packs",
    maturity: "Très petite marque, catalogue court et peu de signaux de vente.",
    strengths: "Personnages propriétaires et prix d'entrée faible.",
    weaknesses: "Offre physique/PDF parfois ambiguë et expérience encore artisanale.",
    opportunity: "Plus de transparence, fiches françaises et marque plus professionnelle.",
    threat: "Faible",
  },
];

const excludedCompetitors = [
  ["Coco Wyo", "https://cocowyo.com/pages/faq", "Le site officiel renvoie vers Amazon, Etsy ou TikTok Shop; pas de boutique DTC comparable."],
  ["Didi Plums", "https://www.didiplums.com/paperbacks/cozy-worlds", "Les fiches observées renvoient vers Amazon pour l'achat."],
  ["Colored Caramel", "https://www.coloredcaramel.com/about/", "Catalogue servant de passerelle vers des marketplaces."],
  ["Kiki Coloring Studio", "https://www.kikicoloringstudio.nl/", "Micro-boutique pertinente mais vente directe limitée aux Pays-Bas."],
  ["The Blue Lemon Studio", "https://www.thebluelemonstudio.com/", "Achat via Amazon et univers davantage architectural que kawaii."],
  ["Aiko Miku", "https://aikomiku.de/", "Créatrice kawaii/chibi mais ventes identifiées via Amazon."],
  ["OMY", "https://omy-maison.com/", "Marque de loisirs créatifs trop généraliste pour le périmètre mini-marque spécialisée."],
  ["Vivi Tinta", "https://www.vivitinta.com/pages/fqas", "Le site officiel indique que les achats passent par Amazon."],
  ["Willa Grimshaw", "https://willagrimshaw.com/", "Site vitrine conduisant vers Amazon ou Etsy."],
  ["Selifu", "https://selifu.com/", "Site vitrine conduisant vers Amazon ou Etsy."],
  ["Southern Lotus", "https://www.southernlotus.com/en/shipping-policy", "Boutique directe pertinente mais livraison France non confirmée."],
];

const competitorEndRow = competitors.length + 3;
const excludedTitleRow = competitorEndRow + 3;
const excludedHeaderRow = excludedTitleRow + 1;
const excludedStartRow = excludedHeaderRow + 1;
const excludedEndRow = excludedStartRow + excludedCompetitors.length - 1;

function setTitle(sheet, rangeAddress, title, subtitle = null) {
  const range = sheet.getRange(rangeAddress);
  range.merge();
  range.values = [[title]];
  range.format = {
    fill: "#14532D",
    font: { bold: true, color: "#FFFFFF", size: 16 },
    horizontalAlignment: "left",
    verticalAlignment: "middle",
  };
  range.format.rowHeight = 34;
  if (subtitle) {
    const [startCell] = rangeAddress.split(":");
    const col = startCell.match(/[A-Z]+/)[0];
    const row = Number(startCell.match(/\d+/)[0]) + 1;
    sheet.getRange(`${col}${row}`).values = [[subtitle]];
  }
}

function styleHeader(range) {
  range.format = {
    fill: "#0F766E",
    font: { bold: true, color: "#FFFFFF" },
    wrapText: true,
    horizontalAlignment: "center",
    verticalAlignment: "middle",
    borders: { preset: "outside", style: "thin", color: "#0B4F45" },
  };
}

function styleBlock(range) {
  range.format = {
    borders: { preset: "outside", style: "thin", color: "#CBD5E1" },
    verticalAlignment: "top",
    wrapText: true,
  };
}

function formatNumberColumns(sheet, specs) {
  for (const [range, format] of specs) {
    sheet.getRange(range).format.numberFormat = format;
    sheet.getRange(range).format.horizontalAlignment = "right";
  }
}

const rawText = (await fs.readFile(sourcePath)).toString("utf16le");
const sourceRows = readAhrefsRows(rawText);
const byKey = sourceByKeyword(sourceRows);
const collections = collectionsSeed.map((item, index) => {
  const metrics = sourceMetrics(byKey, item.keyword);
  const intent = item.intent ?? (metrics.transactional ? "Transactionnelle" : "Commerciale");
  return {
    order: index + 1,
    ...item,
    ...metrics,
    intent,
    url: `/collections/${slugify(item.keyword)}`,
    h1: item.keyword.replace(/\b\w/g, (m) => m.toUpperCase()),
    metaTitle: `${item.keyword} | Kits et carnets kawaii`,
    metaDescription: `Découvrez notre collection ${item.keyword} : carnets, kits et accessoires créatifs pour une boutique coloriage kawaii.`,
  };
});

const workbook = Workbook.create();
const dashboard = workbook.worksheets.add("Dashboard");
const arbo = workbook.worksheets.add("Arborescence");
const collectionsSheet = workbook.worksheets.add("Collections");
const skuSheet = workbook.worksheets.add("SKU_Plan");
const competitorsSheet = workbook.worksheets.add("Concurrents");
const sourcingSheet = workbook.worksheets.add("Sourcing_AliExpress");
const sourceSheet = workbook.worksheets.add("Source_Data");
const notesSheet = workbook.worksheets.add("Notes");

for (const sheet of [dashboard, arbo, collectionsSheet, skuSheet, competitorsSheet, sourcingSheet, sourceSheet, notesSheet]) {
  sheet.showGridLines = false;
}

// Dashboard
setTitle(
  dashboard,
  "A1:L1",
  "Arborescence SEO - Boutique Coloriages Kawaii",
);
dashboard.getRange("A2:L2").merge();
dashboard.getRange("A2:L2").values = [[
  "Structure de site avec collections basees sur des mots-cles Ahrefs. Chaque collection = un mot-cle cible.",
]];
dashboard.getRange("A2:L2").format = { fill: "#ECFDF5", font: { color: "#064E3B" }, wrapText: true };

dashboard.getRange("A4:C4").values = [["Collections actives", "Volume SEO total", "SKU cible total"]];
dashboard.getRange("A5:C5").formulas = [[
  '=COUNTIF(Collections!$D$4:$D$18,"Oui")',
  "=SUM(Collections!$F$4:$F$18)",
  "=SUM(Collections!$K$4:$K$18)",
]];
dashboard.getRange("E4:G4").values = [["KD moyen pondere", "CPC moyen pondere", "Prix moyen cible"]];
dashboard.getRange("E5:G5").formulas = [[
  "=ROUND(SUMPRODUCT(Collections!$F$4:$F$18,Collections!$G$4:$G$18)/SUM(Collections!$F$4:$F$18),1)",
  '=ROUND(SUMPRODUCT(Collections!$F$4:$F$18,Collections!$H$4:$H$18)/SUMIF(Collections!$H$4:$H$18,">0",Collections!$F$4:$F$18),2)',
  "=ROUND(AVERAGE(Collections!$L$4:$L$18),1)",
]];
styleHeader(dashboard.getRange("A4:C4"));
styleHeader(dashboard.getRange("E4:G4"));
dashboard.getRange("A5:C5").format = { fill: "#FFF7ED", font: { bold: true, color: "#9A3412", size: 14 }, horizontalAlignment: "center" };
dashboard.getRange("E5:G5").format = { fill: "#F0FDFA", font: { bold: true, color: "#115E59", size: 14 }, horizontalAlignment: "center" };
formatNumberColumns(dashboard, [["B5:B5", "#,##0"], ["C5:C5", "#,##0"], ["E5:E5", "0.0"], ["F5:F5", "0.00"], ["G5:G5", "0.0"]]);

dashboard.getRange("A8:L8").values = [["Roadmap recommandee"]];
dashboard.getRange("A8:L8").merge();
dashboard.getRange("A8:L8").format = { fill: "#1F2937", font: { bold: true, color: "#FFFFFF" } };
dashboard.getRange("A9:D13").values = [
  ["1", "Lancer les collections P1", "Coloriage kawaii, adulte, magique, mystere, cosy et feutre acrylique.", "Objectif : capter les plus gros volumes avec des pages de collection solides et des bundles physiques."],
  ["2", "Construire 300+ SKU", "Repartir les SKU selon SKU_Plan, en commencant par les packs et kits a forte marge.", "Eviter les fichiers gratuits : vendre des objets physiques, lots et personnalisations."],
  ["3", "Maillage interne", "Chaque page P2 remonte vers coloriage kawaii et vers l'accessoire le plus logique.", "Ex : coloriage manga -> feutre a alcool; coloriage cosy -> marque page personnalise."],
  ["4", "Contenu SEO", "Ajouter guides courts sur les pages collection et 8-12 articles blog top-funnel.", "Blog uniquement pour alimenter les collections, pas comme destination principale."],
  ["5", "Sourcing", "Exclure les licences et personnages proteges.", "Utiliser des designs originaux kawaii, chibi, animaux, cocooning, football generique."],
];
styleBlock(dashboard.getRange("A9:L13"));
dashboard.getRange("A9:A13").format = { fill: "#F97316", font: { bold: true, color: "#FFFFFF" }, horizontalAlignment: "center" };
dashboard.getRange("B9:C13").format = { wrapText: true, font: { bold: true } };
dashboard.getRange("D9:L13").merge(true);
dashboard.getRange("D9:L13").format = { wrapText: true, verticalAlignment: "top" };

dashboard.getRange("A16:L16").values = [["Top collections a creer en premier"]];
dashboard.getRange("A16:L16").merge();
dashboard.getRange("A16:L16").format = { fill: "#0F766E", font: { bold: true, color: "#FFFFFF" } };
dashboard.getRange("A17:E22").values = [
  ["Priorite", "Collection = mot-cle", "Volume", "SKU cible", "Pourquoi"],
  ["P1", "coloriage kawaii", 38000, 45, "Page pilier et mot-cle exact-match de la marque."],
  ["P1", "feutre acrylique", 33000, 40, "Accessoire a panier moyen et marge plus forte."],
  ["P1", "coloriage adulte", 15000, 35, "Segment plus premium, bon pour bundles."],
  ["P1", "coloriage magique", 13000, 30, "Giftable enfant, bonne intention produit."],
  ["P1", "coloriage mystere", 12000, 30, "Angle ludique, retention et cross-sell."],
];
styleHeader(dashboard.getRange("A17:E17"));
styleBlock(dashboard.getRange("A18:E22"));
formatNumberColumns(dashboard, [["C18:D22", "#,##0"]]);

dashboard.getRange("A25:L25").values = [["Veille concurrentielle - pure players spécialisés"]];
dashboard.getRange("A25:L25").merge();
dashboard.getRange("A25:L25").format = { fill: "#1F2937", font: { bold: true, color: "#FFFFFF" } };
dashboard.getRange("A26:D26").values = [["Concurrents qualifiés", "Sites français inclus", "Menaces hautes", "Faux positifs exclus"]];
dashboard.getRange("A27:D27").formulas = [[
  `=COUNTA('Concurrents'!$A$4:$A$${competitors.length + 3})`,
  `=COUNTIF('Concurrents'!$C$4:$C$${competitors.length + 3},"France / français")+COUNTIF('Concurrents'!$C$4:$C$${competitors.length + 3},"France / français-anglais")`,
  `=COUNTIF('Concurrents'!$M$4:$M$${competitors.length + 3},"Haute")`,
  `=COUNTA('Concurrents'!$A$${excludedStartRow}:$A$${excludedEndRow})`,
]];
styleHeader(dashboard.getRange("A26:D26"));
dashboard.getRange("A27:D27").format = { fill: "#F0FDFA", font: { bold: true, color: "#115E59", size: 14 }, horizontalAlignment: "center" };
dashboard.getRange("A29:L29").merge();
dashboard.getRange("A29:L29").values = [[
  "Espace FR encore peu occupé : AICrayons et MyCuttieBox sont les plus proches localement; Belly Bean et Bobbie Goods sont les menaces internationales, Cozykleuren le meilleur modèle de catalogue.",
]];
dashboard.getRange("A29:L29").format = { fill: "#ECFDF5", font: { color: "#064E3B", bold: true }, wrapText: true };
dashboard.freezePanes.freezeRows(4);

// Collections
setTitle(collectionsSheet, "A1:P1", "Collections SEO - 1 collection = 1 mot-cle");
const collectionHeaders = [
  "Ordre",
  "Pilier",
  "Collection = mot-cle",
  "Active",
  "URL",
  "Volume FR",
  "KD",
  "CPC",
  "Intention",
  "Priorite",
  "SKU cible",
  "Prix moyen cible",
  "Score SEO",
  "Role commercial",
  "Brief collection",
  "Source CSV keyword",
];
collectionsSheet.getRange("A3:P3").values = [collectionHeaders];
styleHeader(collectionsSheet.getRange("A3:P3"));
collectionsSheet.getRange(`A4:P${collections.length + 3}`).values = collections.map((item) => [
  item.order,
  item.pillar,
  item.keyword,
  "Oui",
  item.url,
  item.volume,
  item.kd,
  item.cpc ?? "",
  item.intent,
  item.priority,
  item.sku,
  item.avgPrice,
  "",
  item.role,
  item.brief,
  item.sourceKeyword,
]);
collectionsSheet.getRange(`M4:M${collections.length + 3}`).formulas = collections.map((_, idx) => {
  const row = idx + 4;
  return [`=ROUND((F${row}/(G${row}+1))*IF(J${row}="P1",1.2,IF(J${row}="P2",1,0.8)),0)`];
});
styleBlock(collectionsSheet.getRange(`A4:P${collections.length + 3}`));
formatNumberColumns(collectionsSheet, [
  [`F4:F${collections.length + 3}`, "#,##0"],
  [`G4:G${collections.length + 3}`, "0"],
  [`H4:H${collections.length + 3}`, "0.00"],
  [`K4:K${collections.length + 3}`, "#,##0"],
  [`L4:L${collections.length + 3}`, "0.00"],
  [`M4:M${collections.length + 3}`, "#,##0"],
]);
collectionsSheet.getRange(`D4:D${collections.length + 3}`).dataValidation = { rule: { type: "list", values: ["Oui", "Non"] } };
collectionsSheet.getRange(`J4:J${collections.length + 3}`).dataValidation = { rule: { type: "list", values: ["P1", "P2", "P3"] } };
collectionsSheet.freezePanes.freezeRows(3);

// Arborescence
setTitle(arbo, "A1:Q1", "Arborescence de site - Coloriages Kawaii");
const arboHeaders = [
  "Niveau",
  "Type page",
  "Parent",
  "Collection = mot-cle",
  "URL",
  "H1",
  "Volume FR",
  "KD",
  "CPC",
  "Intention",
  "Priorite",
  "SKU cible",
  "Role SEO",
  "Meta title",
  "Meta description",
  "Maillage interne",
  "Notes",
];
arbo.getRange("A3:Q3").values = [arboHeaders];
styleHeader(arbo.getRange("A3:Q3"));
const arboRows = [
  [
    0,
    "Accueil / hub marque",
    "-",
    "coloriage kawaii",
    "/",
    "Coloriage Kawaii",
    sourceMetrics(byKey, "coloriage kawaii").volume,
    sourceMetrics(byKey, "coloriage kawaii").kd,
    sourceMetrics(byKey, "coloriage kawaii").cpc ?? "",
    "Marque + commerciale",
    "P1",
    0,
    "Page d'entree marque, rassurance, best-sellers et collections P1.",
    "Coloriage Kawaii | Kits, carnets et feutres mignons",
    "Boutique de coloriages kawaii, carnets creatifs, feutres et kits cadeaux pour enfants et adultes.",
    "Liens directs vers toutes les collections P1 et accessoires.",
    "Ne pas surcharger en texte : montrer les produits et bundles.",
  ],
  ...menuGroups.map(([label, url, h1, note]) => [
    1,
    "Hub menu non-collection",
    "/",
    "",
    url.replace("/collections/", "/univers/"),
    h1,
    "",
    "",
    "",
    "Navigation",
    "",
    "",
    "Regroupe les collections sans cannibaliser les mots-cles exacts.",
    h1,
    `Selection ${label.toLowerCase()} pour orienter le visiteur vers les collections.`,
    "Liens vers collections du meme pilier.",
    note,
  ]),
  ...collections.map((item) => [
    2,
    "Collection",
    `/univers/${slugify(item.pillar)}`,
    item.keyword,
    item.url,
    item.h1,
    item.volume,
    item.kd,
    item.cpc ?? "",
    item.intent,
    item.priority,
    item.sku,
    item.role,
    item.metaTitle,
    item.metaDescription,
    item.priority === "P1" ? "Depuis accueil + menu + collections P2 liees" : "Depuis page pilier + recommandations produits",
    item.brief,
  ]),
  [
    1,
    "Blog SEO",
    "/",
    "",
    "/blogs/guides",
    "Guides coloriage kawaii",
    "",
    "",
    "",
    "Informationnelle",
    "P3",
    "",
    "Alimenter les collections, pas remplacer les pages transactionnelles.",
    "Guides coloriage kawaii",
    "Idees, conseils feutres et inspirations pour mieux colorier.",
    "Chaque article doit pointer vers une collection.",
    "Exemples : comment choisir ses feutres, coloriage kawaii adulte, idees cadeaux.",
  ],
  [
    1,
    "Pages confiance",
    "/",
    "",
    "/pages/livraison-retours",
    "Livraison et retours",
    "",
    "",
    "",
    "Rassurance",
    "P2",
    "",
    "Limiter la friction avant achat.",
    "Livraison et retours",
    "Delais, suivi et retours pour les kits coloriage kawaii.",
    "Footer + checkout.",
    "Essentiel pour dropshipping : clarifier delais et suivi.",
  ],
];
arbo.getRange(`A4:Q${arboRows.length + 3}`).values = arboRows;
styleBlock(arbo.getRange(`A4:Q${arboRows.length + 3}`));
formatNumberColumns(arbo, [
  [`G4:G${arboRows.length + 3}`, "#,##0"],
  [`H4:H${arboRows.length + 3}`, "0"],
  [`I4:I${arboRows.length + 3}`, "0.00"],
  [`L4:L${arboRows.length + 3}`, "#,##0"],
]);
arbo.freezePanes.freezeRows(3);

// SKU Plan
setTitle(skuSheet, "A1:J1", "Plan SKU - 300+ produits sans sortir du theme");
const skuHeaders = [
  "Collection = mot-cle",
  "Pilier",
  "SKU cible",
  "Prix moyen cible",
  "Repartition SKU",
  "Exemples produits",
  "Bundle prioritaire",
  "Recherche sourcing AliExpress",
  "Priorite",
  "Risque a eviter",
];
skuSheet.getRange("A3:J3").values = [skuHeaders];
styleHeader(skuSheet.getRange("A3:J3"));
skuSheet.getRange(`A4:J${collections.length + 3}`).values = collections.map((item) => [
  item.keyword,
  item.pillar,
  item.sku,
  item.avgPrice,
  skuPatterns[item.keyword],
  item.brief,
  item.pillar === "Accessoires"
    ? `Bundle ${item.keyword} + coloriage kawaii`
    : `Bundle ${item.keyword} + feutres + marque-page`,
  item.sourcing,
  item.priority,
  item.keyword.includes("manga") || item.keyword.includes("chat")
    ? "Eviter personnages sous licence et visuels copies."
    : "Verifier qualite papier, delais, packaging et photos fournisseurs.",
]);
styleBlock(skuSheet.getRange(`A4:J${collections.length + 3}`));
formatNumberColumns(skuSheet, [
  [`C4:C${collections.length + 3}`, "#,##0"],
  [`D4:D${collections.length + 3}`, "0.00"],
]);
skuSheet.freezePanes.freezeRows(3);

// Concurrents
setTitle(competitorsSheet, "A1:N1", "Concurrents spécialisés - coloriage kawaii et cosy");
competitorsSheet.getRange("A2:N2").merge();
competitorsSheet.getRange("A2:N2").values = [[
  "Pure players et mini-marques vérifiés le 2026-07-10. Marketplaces, grandes enseignes et sites sans vente directe sont exclus.",
]];
competitorsSheet.getRange("A2:N2").format = { fill: "#ECFDF5", font: { color: "#064E3B" }, wrapText: true };
competitorsSheet.getRange("A3:N3").values = [[
  "Concurrent",
  "URL",
  "Pays / langue",
  "Livraison France",
  "Positionnement",
  "Spécialisation",
  "Prix repère",
  "Maturité visible",
  "Forces",
  "Faiblesses",
  "Opportunité pour la boutique",
  "URL de preuve",
  "Menace FR",
  "Date vérification",
]];
styleHeader(competitorsSheet.getRange("A3:N3"));
competitorsSheet.getRange(`A4:N${competitorEndRow}`).values = competitors.map((item) => [
  item.name,
  item.url,
  item.market,
  item.france,
  item.positioning,
  item.specialization,
  item.price,
  item.maturity,
  item.strengths,
  item.weaknesses,
  item.opportunity,
  item.proof,
  item.threat,
  "2026-07-10",
]);
styleBlock(competitorsSheet.getRange(`A4:N${competitorEndRow}`));
competitorsSheet.getRange(`M4:M${competitorEndRow}`).dataValidation = { rule: { type: "list", values: ["Haute", "Moyenne", "Faible"] } };

competitorsSheet.getRange(`A${excludedTitleRow}:N${excludedTitleRow}`).merge();
competitorsSheet.getRange(`A${excludedTitleRow}:N${excludedTitleRow}`).values = [["Faux positifs exclus"]];
competitorsSheet.getRange(`A${excludedTitleRow}:N${excludedTitleRow}`).format = { fill: "#1F2937", font: { bold: true, color: "#FFFFFF" } };
competitorsSheet.getRange(`A${excludedHeaderRow}:C${excludedHeaderRow}`).values = [["Site", "URL", "Motif d'exclusion"]];
styleHeader(competitorsSheet.getRange(`A${excludedHeaderRow}:C${excludedHeaderRow}`));
competitorsSheet.getRange(`A${excludedStartRow}:C${excludedEndRow}`).values = excludedCompetitors;
styleBlock(competitorsSheet.getRange(`A${excludedStartRow}:C${excludedEndRow}`));
competitorsSheet.freezePanes.freezeRows(3);

// Sourcing AliExpress - emplacements prêts pour un export vérifiable
const sourcingSlots = collections.flatMap((item) => Array.from({ length: 5 }, (_, index) => ({
  id: `${slugify(item.keyword)}-${index + 1}`,
  collection: item.keyword,
  risk: item.keyword.includes("feutre")
    ? "Exiger documentation GPSR/REACH, étiquetage UE, fiche matière et tests d'encre."
    : item.keyword.includes("manga") || item.keyword.includes("chat")
      ? "Écarter tout personnage, logo ou visuel sous licence; contrôler l'originalité."
      : item.keyword.includes("personnalisé")
        ? "Vérifier BAT, droits sur les images, MOQ, délais de personnalisation et retours."
        : "Contrôler droits des visuels, qualité réelle, emballage, délais et cohérence des variantes.",
})));
const sourcingEndRow = sourcingSlots.length + 3;

setTitle(sourcingSheet, "A1:T1", "Sourcing AliExpress - 5 produits à vérifier par collection");
sourcingSheet.getRange("A2:T2").merge();
sourcingSheet.getRange("A2:T2").values = [[
  "75 emplacements préparés. Les URL et métriques restent vides tant qu'elles ne proviennent pas d'un export AliExpress/DSers ou d'une liste de liens vérifiable.",
]];
sourcingSheet.getRange("A2:T2").format = { fill: "#FFF7ED", font: { color: "#9A3412", bold: true }, wrapText: true };
sourcingSheet.getRange("A3:T3").values = [[
  "ID",
  "Collection",
  "Produit",
  "URL AliExpress",
  "Prix produit EUR",
  "Livraison EUR",
  "Coût rendu EUR",
  "Prix cible EUR",
  "Marge x",
  "Note",
  "Commandes",
  "Boutique",
  "Délai France",
  "Choice / UE",
  "Variantes / lot",
  "Angle commercial",
  "Risques / contrôles",
  "Verdict",
  "Date vérification",
  "Statut / source",
]];
styleHeader(sourcingSheet.getRange("A3:T3"));
sourcingSheet.getRange(`A4:T${sourcingEndRow}`).values = sourcingSlots.map((item) => [
  item.id,
  item.collection,
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  item.risk,
  "À vérifier",
  "",
  "En attente d'un export AliExpress/DSers vérifiable",
]);
sourcingSheet.getRange(`G4:G${sourcingEndRow}`).formulas = sourcingSlots.map((_, index) => {
  const row = index + 4;
  return [`=IF(OR(E${row}="",F${row}=""),"",E${row}+F${row})`];
});
sourcingSheet.getRange(`H4:H${sourcingEndRow}`).formulas = sourcingSlots.map((_, index) => {
  const row = index + 4;
  return [`=IFERROR(VLOOKUP(B${row},'Collections'!$C$4:$L$${collections.length + 3},10,FALSE),"")`];
});
sourcingSheet.getRange(`I4:I${sourcingEndRow}`).formulas = sourcingSlots.map((_, index) => {
  const row = index + 4;
  return [`=IFERROR(H${row}/G${row},"")`];
});
styleBlock(sourcingSheet.getRange(`A4:T${sourcingEndRow}`));
formatNumberColumns(sourcingSheet, [
  [`E4:H${sourcingEndRow}`, "0.00"],
  [`I4:I${sourcingEndRow}`, "0.0x"],
  [`J4:J${sourcingEndRow}`, "0.0"],
  [`K4:K${sourcingEndRow}`, "#,##0"],
]);
sourcingSheet.getRange(`R4:R${sourcingEndRow}`).dataValidation = { rule: { type: "list", values: ["À vérifier", "Retenir", "Test", "Écarter"] } };
sourcingSheet.freezePanes.freezeRows(3);

// Source data
setTitle(sourceSheet, "A1:J1", "Donnees source Ahrefs utilisees");
sourceSheet.getRange("A3:J3").values = [[
  "Keyword",
  "Volume",
  "KD",
  "CPC",
  "Informational",
  "Commercial",
  "Transactional",
  "Current position",
  "Current URL",
  "Utilise comme collection",
]];
styleHeader(sourceSheet.getRange("A3:J3"));
sourceSheet.getRange(`A4:J${collections.length + 3}`).values = collections.map((item) => [
  item.sourceKeyword,
  item.volume,
  item.kd,
  item.cpc ?? "",
  item.informational,
  item.commercial,
  item.transactional,
  item.currentPosition,
  item.currentUrl,
  "Oui",
]);
styleBlock(sourceSheet.getRange(`A4:J${collections.length + 3}`));
formatNumberColumns(sourceSheet, [
  [`B4:B${collections.length + 3}`, "#,##0"],
  [`C4:C${collections.length + 3}`, "0"],
  [`D4:D${collections.length + 3}`, "0.00"],
]);
sourceSheet.freezePanes.freezeRows(3);

// Notes
setTitle(notesSheet, "A1:H1", "Notes et hypotheses");
notesSheet.getRange("A3:B15").values = [
  ["Source CSV", sourcePath],
  ["Date de travail", "2026-07-10"],
  ["Regle principale", "Chaque page de type Collection reprend un mot-cle exact du CSV ou son accentuation equivalente."],
  ["Objectif catalogue", "Construire 300+ SKU avec une cible actuelle de 430 SKU."],
  ["Positionnement", "Boutique mini-marque : kits, carnets, feutres, accessoires et cadeaux physiques."],
  ["A eviter", "Personnages/licences type Stitch, Disney, manga existant; fichiers gratuits; claims educatifs/sante non prouves."],
  ["SEO", "Les hubs menu ne doivent pas cannibaliser les collections exact-match."],
  ["SEA", "Prioriser P1 pour tests Google Shopping/Search, puis P2 selon marge et sourcing."],
  ["Critères sourcing", "Produit physique léger et non fragile; marge x3 visée; note 4,7+ et 100+ commandes de préférence; livraison France; zéro licence; vendeur et variantes cohérents."],
  ["Conformité", "Pour les feutres, exiger documentation GPSR/REACH, étiquetage UE et informations matière. Pour les personnalisés, contrôler droits images, BAT et délais."],
  ["Veille concurrence", "Quatorze acteurs proches qualifiés, dont trois sites français inclus; seuls AICrayons et MyCuttieBox sont vraiment très proches du concept."],
  ["Sourcing AliExpress", "75 emplacements sont préparés. Les URL restent vides en attente d'un export AliExpress/DSers ou d'une liste de liens vérifiable."],
  ["Mise a jour", "Coller un nouvel export Ahrefs et remplacer les volumes/KD/CPC si besoin."],
];
styleBlock(notesSheet.getRange("A3:B15"));
notesSheet.getRange("A3:A15").format = { fill: "#FFF7ED", font: { bold: true, color: "#9A3412" } };
notesSheet.getRange("B3:B15").format = { wrapText: true };

// Worksheet dimensions and final formatting
const widthSpecs = [
  [dashboard, [["A1:A32", 18], ["B1:B32", 26], ["C1:C32", 34], ["D1:D32", 18], ["E1:E32", 44], ["F1:L32", 18]]],
  [collectionsSheet, [["A1:A25", 8], ["B1:B25", 18], ["C1:C25", 28], ["D1:D25", 10], ["E1:E25", 34], ["F1:M25", 12], ["N1:N25", 28], ["O1:O25", 56], ["P1:P25", 26]]],
  [arbo, [["A1:A30", 8], ["B1:B30", 22], ["C1:C30", 22], ["D1:D30", 28], ["E1:E30", 34], ["F1:F30", 28], ["G1:L30", 12], ["M1:M30", 34], ["N1:N30", 36], ["O1:O30", 54], ["P1:P30", 36], ["Q1:Q30", 50]]],
  [skuSheet, [["A1:A25", 28], ["B1:B25", 18], ["C1:D25", 12], ["E1:E25", 45], ["F1:F25", 58], ["G1:G25", 34], ["H1:H25", 38], ["I1:I25", 10], ["J1:J25", 42]]],
  [competitorsSheet, [["A1:A40", 24], ["B1:B40", 42], ["C1:C40", 28], ["D1:D40", 32], ["E1:E40", 52], ["F1:F40", 30], ["G1:G40", 30], ["H1:K40", 48], ["L1:L40", 48], ["M1:M40", 14], ["N1:N40", 18]]],
  [sourcingSheet, [["A1:A85", 26], ["B1:B85", 28], ["C1:C85", 48], ["D1:D85", 70], ["E1:I85", 15], ["J1:K85", 12], ["L1:L85", 28], ["M1:N85", 20], ["O1:P85", 36], ["Q1:Q85", 58], ["R1:R85", 14], ["S1:S85", 18], ["T1:T85", 48]]],
  [sourceSheet, [["A1:A25", 28], ["B1:D25", 12], ["E1:G25", 14], ["H1:H25", 16], ["I1:I25", 80], ["J1:J25", 20]]],
  [notesSheet, [["A1:A17", 22], ["B1:B17", 110]]],
];
for (const [sheet, ranges] of widthSpecs) {
  for (const [address, width] of ranges) {
    sheet.getRange(address).format.columnWidth = width;
  }
}
for (const sheet of [dashboard, arbo, collectionsSheet, skuSheet, competitorsSheet, sourcingSheet, sourceSheet, notesSheet]) {
  const used = sheet.getUsedRange();
  used.format.wrapText = true;
  used.format.verticalAlignment = "top";
}

await fs.mkdir(outputDir, { recursive: true });

const checks = await workbook.inspect({
  kind: "table",
  range: "Dashboard!A1:G29",
  include: "values,formulas",
  tableMaxRows: 24,
  tableMaxCols: 8,
});
console.log(checks.ndjson);

const competitorChecks = await workbook.inspect({
  kind: "table",
  range: `Concurrents!A1:N${Math.min(competitorEndRow, 9)}`,
  include: "values,formulas",
  tableMaxRows: 10,
  tableMaxCols: 14,
});
console.log(competitorChecks.ndjson);

const sourcingChecks = await workbook.inspect({
  kind: "table",
  range: "Sourcing_AliExpress!A1:T10",
  include: "values,formulas",
  tableMaxRows: 10,
  tableMaxCols: 20,
});
console.log(sourcingChecks.ndjson);

const errors = await workbook.inspect({
  kind: "match",
  searchTerm: "#REF!|#DIV/0!|#VALUE!|#NAME\\?|#N/A",
  options: { useRegex: true, maxResults: 300 },
  summary: "final formula error scan",
});
console.log(errors.ndjson);

for (const sheetName of ["Dashboard", "Arborescence", "Collections", "SKU_Plan", "Concurrents", "Sourcing_AliExpress", "Source_Data", "Notes"]) {
  const preview = await workbook.render({
    sheetName,
    autoCrop: "all",
    scale: 1,
    format: "png",
  });
  await fs.writeFile(
    path.join(outputDir, `${sheetName}.png`),
    new Uint8Array(await preview.arrayBuffer()),
  );
}

const output = await SpreadsheetFile.exportXlsx(workbook);
await output.save(outputPath);
console.log(outputPath);
