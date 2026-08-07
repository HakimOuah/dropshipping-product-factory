import fs from 'node:fs';
import path from 'node:path';

const ROOT = '/Users/Hakim/Documents/New project/outputs/audit-fournisseurs-adoucisseur-eau-2026-07-10';
const PLAN = '/private/tmp/claude-502/-Users-Hakim-ecommerce-dropshipping/e46bcb74-56e1-4015-9780-19273da6fb22/scratchpad/shopify-plan.json';
const cells = ['F6','F7','F8','F9','F10','F15','F16','F17','F18','F22','F23','F24','F25','F26','F30','F31','F32','F33','F34','F38','F43','F44','F45','F46','F47'];
const data = JSON.parse(fs.readFileSync(path.join(ROOT, 'produits.json'), 'utf8')).products;
const plan = JSON.parse(fs.readFileSync(PLAN, 'utf8'));
const byCell = Object.fromEntries(data.map(p => [p.excel_cell, p]));

const esc = s => String(s).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;');
const missing = p => p.missing_information.slice(0,4).map(x => `<li><strong>${esc(x)} :</strong> non communiqué par le fournisseur, nous le confirmons avant expédition.</li>`).join('\n');
const specs = p => Object.entries(p.technical_specs).slice(0,6).map(([k,v]) => `<li><strong>${esc(k)} :</strong> ${esc(v)}</li>`).join('\n');
const shipping = p => {
  const from = p.shipping_france.ship_from || 'provenance non affichée';
  const eta = (p.shipping_france.delivery_estimate || '').trim();
  const eu = /Pologne|Allemagne|France/i.test(from);
  return `La fiche fournisseur indique « ${esc(from)} »${eta ? `, avec une estimation relevée au ${esc(eta)}` : ''}. La livraison est annoncée gratuite. ${eu ? 'L’expédition annoncée depuis l’Union européenne simplifie le traitement de la TVA.' : 'La provenance exacte et les éventuels délais sont reconfirmés avant expédition.'} Vous disposez du droit légal de rétractation de 14 jours et d’un SAV pour vérifier la compatibilité avant commande.`;
};

const content = {
  shower: {
    hooks: [
      'Quand on est locataire, une douche inconfortable ne justifie pas de modifier toute la plomberie. Un équipement démontable permet de tester une réponse mesurée, puis de repartir avec au déménagement.',
      'Sans percer ni appeler un plombier, ce modèle se place au point d’usage et reste réversible.',
      'Une salle de bain soignée ne demande pas forcément une installation permanente. Ce filtre vise une intervention locale sur la douche, sans transformer le réseau du logement.',
      'Avant de remplacer une robinetterie complète, mieux vaut isoler le besoin réel. Ce dispositif se concentre sur la douche et peut être retiré sans laisser d’installation lourde.',
      'Vous cherchez une solution simple pour la douche, sans chantier et sans engagement sur le logement. Ce modèle non électrique répond à cette logique d’équipement léger.'
    ],
    benefits: [
      ['Une installation qui reste réversible','Le produit intervient uniquement au niveau de la douche. Cette approche convient au logement loué : pas de traitement central, pas de modification permanente du réseau. Le raccord et les dimensions exactes restent toutefois à contrôler avant commande.'],
      ['Conserver un usage familier','Le geste quotidien ne change pas : on ouvre la douche comme auparavant. La pression compatible et le débit ne sont pas publiés par le fournisseur. Nous ne promettons donc aucune absence de perte de pression avant vérification.'],
      ['Savoir précisément ce que l’on achète','Un filtre de douche ne remplace pas un adoucisseur à résine. Il ne permet pas d’annoncer une baisse de la dureté de l’eau. Le média filtrant exact et son action doivent être confirmés pour ce modèle.']
    ],
    faq: [
      ['La pression va-t-elle baisser ?','Le fournisseur ne communique ni débit ni plage de pression compatible. Une restriction peut dépendre du média, de son encrassement et de l’installation. Nous confirmons ces valeurs avant expédition.'],
      ['Combien de temps dure la cartouche ?','La durée n’est pas documentée. Elle dépend du volume utilisé et de la qualité de l’eau en entrée. La référence et le rythme de remplacement sont vérifiés avant la vente.'],
      ['Est-ce un véritable adoucisseur ?','Non. Ce produit n’est pas un système à résine mesurant ou corrigeant la dureté. Son rôle est limité au point d’usage et dépend du média réellement fourni.'],
      ['Puis-je l’installer dans un logement loué ?','Le principe est réversible, mais la compatibilité du filetage doit être vérifiée. Gardez les pièces d’origine pour remettre la douche dans son état initial.']
    ]
  },
  osmosis: {
    hooks: [
      'Les packs d’eau occupent le coffre, le placard et reviennent chaque semaine. Un système sous évier peut remplacer cette routine, à condition de choisir sur des caractéristiques vérifiables.',
      'Une carafe convient à de petits volumes, mais devient contraignante lorsqu’il faut remplir plusieurs bouteilles ou une casserole. Cet équipement vise une production au point d’usage.',
      'Le prix d’un osmoseur impose de regarder au-delà du mot « purification ». Débit, raccordement et consommables doivent être connus avant de décider.',
      'Remplacer une membrane ne devrait pas devenir un achat à l’aveugle. La compatibilité avec l’appareil et les conditions d’utilisation comptent davantage qu’une promesse générale.'
    ],
    benefits: [
      ['Passer de la carafe à un équipement dédié','L’osmose inverse utilise une membrane et ne fonctionne pas comme une cartouche gravitaire. Le bénéfice attendu dépend du montage complet, de la pression et de l’eau en entrée. Les performances non publiées ne sont pas extrapolées.'],
      ['Dimensionner l’usage avec des données concrètes','Le débit ou la capacité annoncée par le fournisseur figure ci-dessous lorsqu’il est disponible. Il faut aussi prévoir l’arrivée d’eau, l’évacuation et, selon le modèle, une alimentation électrique.'],
      ['Anticiper les consommables','Une installation durable suppose de connaître les références des filtres, leur prix et leur rythme de remplacement. Ces éléments ne sont pas tous publiés ; Bonum Vitae les confirme avant expédition plutôt que d’inventer un coût par litre.']
    ],
    faq: [
      ['Est-ce différent d’une carafe filtrante ?','Oui. Une carafe fonctionne par gravité, tandis qu’un système d’osmose inverse force l’eau à travers une membrane. Le niveau de performance précis reste celui documenté pour chaque appareil.'],
      ['Que deviennent les minéraux ?','Une membrane d’osmose inverse agit sur les éléments dissous, qui comprennent aussi des minéraux. Sans analyse avant et après pour ce modèle, nous ne publions pas de pourcentage.'],
      ['Le coût d’achat est-il justifié ?','Il faut le comparer à votre consommation de packs, au prix des consommables et à l’entretien. Les références de remplacement manquantes sont confirmées avant expédition.'],
      ['La conformité est-elle documentée ?','Aucune attestation spécifique au contact de l’eau potable n’est affichée dans la source fournisseur. Nous demandons le document correspondant et ne revendiquons aucune conformité non contrôlée.']
    ]
  },
  carafe: {
    hooks: [
      'Remplir une carafe plusieurs fois par jour doit rester simple : un format adapté, une place raisonnable au réfrigérateur et des recharges identifiables comptent plus qu’un slogan.',
      'Pour le thé, le café ou l’eau de table, une solution sans installation évite de transformer la cuisine. Encore faut-il connaître la capacité et le consommable à prévoir.',
      'Une carafe du supermarché est facile à comparer tant que ses recharges sont disponibles. Ce modèle mérite la même exigence sur le volume, les matériaux et le suivi des cartouches.',
      'Quand plusieurs personnes utilisent la même carafe, le volume et la vitesse d’écoulement deviennent concrets. Les valeurs absentes ne doivent pas être remplacées par des promesses.',
      'Une carafe filtrante est souvent choisie pour sa simplicité. Cette simplicité n’est réelle que si le format, la cartouche et son remplacement sont clairement identifiés.'
    ],
    benefits: [
      ['Filtrer sans modifier la cuisine','Le produit se pose sur une table ou se range selon son format. Aucun raccord permanent n’est requis. Il convient à une démarche progressive avant d’envisager un appareil sous évier.'],
      ['Adapter le volume au quotidien','La capacité annoncée est reprise dans les caractéristiques lorsqu’elle figure dans la source. Pour les valeurs non communiquées, nous préférons une confirmation à une estimation trompeuse.'],
      ['Prévoir les recharges avant l’achat','Le vrai coût se mesure sur la durée. La référence de cartouche, sa disponibilité et sa capacité de traitement doivent être confirmées ; aucune durée générique n’est appliquée à ce modèle.']
    ],
    faq: [
      ['Pourquoi ne pas choisir une grande marque de supermarché ?','La bonne comparaison porte sur le volume, l’encombrement et surtout la disponibilité des recharges. Nous ne présentons pas ce modèle comme supérieur sans essai comparatif documenté.'],
      ['Les matériaux conviennent-ils au contact alimentaire ?','La source ne fournit pas d’attestation spécifique. Le matériau et le document de conformité sont demandés au fournisseur avant expédition.'],
      ['Combien coûtent les cartouches ?','Le prix et la référence des recharges ne sont pas communiqués. Nous les confirmons avant expédition afin d’éviter un produit impossible à entretenir.'],
      ['Peut-on la ranger au réfrigérateur ?','Cela dépend de ses dimensions exactes et de votre aménagement. Les dimensions non publiées sont vérifiées avant commande.']
    ]
  },
  faucet: {
    hooks: [
      'Un petit équipement au robinet peut être utile sans prétendre traiter toute l’eau du logement. La première question est la compatibilité mécanique, puis le rôle réel du média.',
      'Quand l’eau de cuisine gêne à l’usage, un accessoire au point de puisage permet un essai limité. Il faut toutefois distinguer aération, filtration et purification complète.',
      'Changer tout le réseau pour un seul robinet serait disproportionné. Ce produit vise une intervention locale, démontable et simple à contrôler.',
      'Une cartouche de remplacement n’a de valeur que si elle correspond exactement au dispositif installé. Référence, durée et média doivent donc être identifiés avant commande.',
      'Réduire le débit au robinet et filtrer l’eau sont deux fonctions différentes. Cet aérateur est présenté pour son usage mécanique, sans lui attribuer une purification non documentée.'
    ],
    benefits: [
      ['Agir uniquement au point d’usage','Le dispositif se place sur la sortie du robinet ou son support. Cette approche évite les travaux permanents, mais ne traite pas les autres points d’eau du logement.'],
      ['Vérifier le raccord avant de commander','Les filetages et formes de bec varient. En l’absence de dimensions complètes, une photo et une mesure du robinet permettent au SAV de contrôler la compatibilité.'],
      ['Rester précis sur la filtration','Sans composition documentée du média, nous n’annonçons ni retrait de contaminants ni purification complète. Les fonctions réellement fournies sont limitées aux caractéristiques listées ci-dessous.']
    ],
    faq: [
      ['Est-il compatible avec mon robinet ?','La compatibilité universelle ne peut pas être garantie sans diamètre et type de filetage. Mesurez le bec et transmettez une photo au SAV avant commande.'],
      ['Est-ce une purification complète ?','Non. Un petit dispositif au robinet ne doit pas être confondu avec une membrane d’osmose inverse. Son action dépend entièrement du média fourni.'],
      ['Quelle est la durée de la cartouche ?','La capacité et la durée ne sont pas publiées. Elles doivent être confirmées avec la référence exacte avant expédition.'],
      ['La pose demande-t-elle un plombier ?','Le principe est celui d’un assemblage au point d’usage. Selon le robinet, un adaptateur peut être nécessaire ; la compatibilité est contrôlée avant commande.']
    ]
  },
  camping: {
    hooks: ['En bivouac, manquer d’eau disponible oblige parfois à utiliser une source incertaine. Un filtre portable peut compléter une stratégie prudente, mais il ne transforme pas toute eau trouvée en eau sûre par simple promesse.'],
    benefits: [
      ['Un format pensé pour être emporté','Le dispositif vise l’usage nomade et évite une installation fixe. Son poids, ses dimensions et le contenu exact du kit ne sont pas communiqués ; ils sont confirmés avant expédition.'],
      ['Comprendre la valeur annoncée','Le fournisseur annonce un seuil de filtration de 0,01 micron. Cette valeur n’est pas accompagnée d’une validation par un organisme indépendant dans la source disponible.'],
      ['Garder une méthode prudente sur le terrain','Écartez les eaux proches d’activités agricoles, industrielles ou d’animaux morts. Une filtration mécanique ne garantit pas le retrait de substances dissoutes ; un traitement complémentaire peut rester nécessaire.']
    ],
    faq: [
      ['Puis-je boire directement l’eau d’une rivière ?','Nous ne le garantissons pas. La valeur de 0,01 micron est annoncée par le fournisseur mais non validée indépendamment. Choisissez la source avec prudence et appliquez les recommandations locales.'],
      ['Le filtre agit-il sur les substances dissoutes ?','Aucune performance n’est documentée sur les produits chimiques dissous. Ce type d’usage ne doit pas être confondu avec une analyse de potabilité.'],
      ['Quelle quantité peut-il traiter ?','La capacité totale et la durée de vie ne sont pas communiquées. Nous les confirmons avant expédition.'],
      ['Comment l’entretenir ?','Le protocole de rinçage et de stockage doit suivre la notice exacte. Cette notice et le contenu du kit sont vérifiés avant commande.']
    ]
  },
  scale: {
    hooks: [
      'Les traces sur les équipements poussent souvent à chercher une solution sans sel. Avant d’acheter, il faut distinguer une promesse commerciale d’une mesure réelle de la dureté.',
      'Un adoucisseur à résine représente un budget et une installation importants. Ce dispositif d’appoint suit une logique différente, dont les limites doivent être comprises avant l’essai.',
      'Une solution électronique paraît simple à poser, mais sa facilité ne prouve pas son efficacité. Nous présentons donc l’alimentation et le montage sans extrapoler les résultats.',
      'Un dispositif magnétique évite le sel et les consommables. Cela ne permet pas pour autant d’annoncer une modification mesurée de l’eau sans essai indépendant.',
      'Le diamètre de raccord est concret. Choisissez ce modèle sur sa compatibilité et avec des attentes mesurées.'
    ],
    benefits: [
      ['Un équipement d’appoint sans consommable déclaré','Le principe annoncé ne repose pas sur une résine à régénérer. L’entretien exact, le montage et la compatibilité restent liés au modèle et doivent être contrôlés avant expédition.'],
      ['Contrôler le raccordement et l’alimentation','Le diamètre ou la plage électrique est repris uniquement lorsqu’il figure dans la source. Ces données servent à évaluer l’installation, sans constituer une preuve de résultat sur l’eau.'],
      ['Essayer avec des attentes vérifiables','Pour juger un changement, observez les dépôts dans des conditions comparables et mesurez la dureté séparément. Aucune étude indépendante propre à ce produit n’est fournie.']
    ],
    faq: [
      ['Est-ce l’équivalent d’un adoucisseur à résine ?','Non. Il n’utilise pas le même procédé et aucune baisse mesurée de la dureté n’est documentée pour ce produit.'],
      ['Existe-t-il une preuve indépendante ?','Aucune preuve indépendante propre à cette référence n’est fournie dans la source. Nous ne transformons donc pas l’argument du vendeur en résultat garanti.'],
      ['Faut-il du sel ou des cartouches ?','Aucun consommable de ce type n’est documenté. Le besoin d’entretien et la garantie restent à confirmer avant expédition.'],
      ['Que choisir pour l’eau de boisson ?','Pour un traitement dédié au point d’usage, comparez plutôt les systèmes dont le procédé et les consommables sont documentés, notamment l’osmose inverse.']
    ]
  }
};

function family(cell) {
  const n = Number(cell.slice(1));
  if (n <= 10) return 'shower';
  if (n <= 18) return 'osmosis';
  if (n <= 26) return 'carafe';
  if (n <= 34) return 'faucet';
  if (n === 38) return 'camping';
  return 'scale';
}

function htmlFor(cell) {
  const p = byCell[cell], cfg = content[family(cell)], idx = cells.filter(c => family(c) === family(cell)).indexOf(cell);
  const hook = cfg.hooks[idx % cfg.hooks.length];
  const context = family(cell) === 'scale'
    ? 'La dureté se mesure, elle ne se déduit pas de l’aspect d’une canalisation. Ce produit est présenté comme un accessoire d’appoint. Son efficacité n’est pas établie par une étude indépendante propre à la référence.'
    : family(cell) === 'camping'
    ? 'En extérieur, la qualité d’une eau varie selon la source, la météo et les activités en amont. Le rôle d’un filtre doit rester limité aux performances réellement documentées.'
    : `Le produit « ${esc(p.internal_name)} » doit être choisi à partir de sa configuration réelle. Les informations du fournisseur sont reprises ci-dessous, avec les absences signalées sans les masquer.`;
  const benefits = cfg.benefits.map(([h,t]) => `<h3>${h}</h3>\n<p>${t}</p>`).join('\n\n');
  const faq = cfg.faq.map(([q,a]) => `<details>\n<summary>${q}</summary>\n<p>${a}</p>\n</details>`).join('\n');
  const limit = family(cell) === 'scale' ? '\n<h3>Ce que ce dispositif fait — et ne fait pas</h3>\n<p>Il constitue un équipement d’appoint conforme aux caractéristiques de montage indiquées. Il ne remplace pas un système à résine, et aucune modification de la dureté n’est démontrée par la documentation disponible. Son intérêt doit être évalué avec des observations comparables, sans promesse sur le tartre.</p>' : '';
  return `<div class="product-desc">\n<p class="hook"><strong>${hook}</strong></p>\n<p>${context}</p>\n\n${benefits}\n\n<h3>Caractéristiques vérifiées</h3>\n<ul>\n${specs(p)}\n${missing(p)}\n</ul>\n\n<h3>Vos questions, nos réponses franches</h3>\n${faq}\n${limit}\n\n<h3>Livraison et service</h3>\n<p>${shipping(p)}</p>\n<p class="cta">Vérifiez les mesures et les informations à confirmer, puis choisissez ce modèle s’il correspond à votre installation.</p>\n</div>\n`;
}

fs.mkdirSync(path.join(ROOT, 'fiches-v2'), {recursive:true});
for (const cell of cells) fs.writeFileSync(path.join(ROOT, 'fiches-v2', `${cell}.html`), htmlFor(cell));

const strip = s => s.replace(/<[^>]+>/g,' ').replace(/&[^;]+;/g,' ').trim();
const emoji = /[\u{1F300}-\u{1FAFF}\u{2700}-\u{27BF}\u{2600}-\u{26FF}]/u;
const forbiddenAll = /détoxifie|prévient les maladies|bon pour la santé|\bNSF\b|\bSGS\b|\bISO\b/i;
const forbiddenScale = /adoucit l[’']eau|élimine le calcaire|réduit la dureté/i;
let bad = false;
for (const cell of cells) {
  const file = path.join(ROOT, 'fiches-v2', `${cell}.html`), h = fs.readFileSync(file,'utf8');
  const words = strip(h).split(/\s+/).filter(Boolean).length;
  const errs = [];
  if (words < 350 || words > 500) errs.push(`words=${words}`);
  if (emoji.test(h)) errs.push('emoji');
  if (forbiddenAll.test(h)) errs.push('forbidden');
  if (family(cell)==='scale' && forbiddenScale.test(h)) errs.push('scale-claim');
  if ((h.match(/<details>/g)||[]).length < 3) errs.push('faq');
  console.log(`${cell}\t${words}\t${errs.join(',') || 'OK'}`);
  if (errs.length) bad = true;
}
process.exitCode = bad ? 1 : 0;
