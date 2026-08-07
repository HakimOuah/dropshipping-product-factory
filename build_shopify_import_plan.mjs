import fs from 'node:fs';
import path from 'node:path';

const ROOT='/Users/Hakim/Documents/New project/outputs/audit-fournisseurs-adoucisseur-eau-2026-07-10';
const PLAN='/private/tmp/claude-502/-Users-Hakim-ecommerce-dropshipping/e46bcb74-56e1-4015-9780-19273da6fb22/scratchpad/shopify-plan.json';
const base=JSON.parse(fs.readFileSync(PLAN,'utf8'));
const titles={
F6:'Filtre de douche 15-20 étapes en acier inoxydable',F7:'Pommeau de douche filtrant portable',F8:'Filtre de douche parfumé avec corps ABS',F9:'Filtre de pomme de douche 15/20 étapes',F10:'Filtre de douche ALTHY SFH70 non électrique',
F15:"Osmoseur 600 GPD sans réservoir OSWNKW",F16:'Osmoseur de cuisine SHUANGLI 600G',F17:'Osmoseur OSWNKW 600 GPD à flux direct',F18:"Membrane d'osmose inverse RO de remplacement",
F22:'Carafe filtrante 3,6 L expédiée depuis Allemagne',F23:'Carafe filtrante domestique avec 3 filtres',F24:'Carafe filtrante ALTHY 3,5 L',F25:'Carafe filtrante 2,5 L à quatre couches',F26:'Carafe filtrante au charbon actif expédiée depuis Allemagne',
F30:'Filtre pour robinet de cuisine GLQ11',F31:'Filtre pour robinet rotatif 360°',F32:'Cartouches pour filtre de robinet alloet',F33:'Kit de filtration pour sortie de robinet',F34:"Aérateur de robinet économie d'eau",
F38:"Purificateur d'eau de camping widesea",
F43:'Dispositif anti-tartre ALTHY IPSE DN8',F44:'Dispositif anti-tartre électronique USB',F45:'Dispositif anti-tartre électronique USB 5-20 V',F46:'Dispositif anti-tartre magnétique IPSE DN25',F47:'Dispositif anti-tartre magnétique IPSE DN20'};
const seoTitles={
F6:'Filtre de douche inox | Bonum Vitae',F7:'Pommeau de douche filtrant | Bonum Vitae',F8:'Filtre de douche parfumé ABS | Bonum Vitae',F9:'Filtre pomme de douche 15 étapes | Bonum Vitae',F10:'Filtre douche ALTHY SFH70 | Bonum Vitae',
F15:'Osmoseur 600 GPD OSWNKW | Bonum Vitae',F16:'Osmoseur SHUANGLI 600G | Bonum Vitae',F17:'Osmoseur OSWNKW 600 GPD | Bonum Vitae',F18:'Membrane osmose inverse RO | Bonum Vitae',
F22:'Carafe filtrante 3,6 L | Bonum Vitae',F23:'Carafe filtrante avec 3 filtres | Bonum Vitae',F24:'Carafe filtrante ALTHY 3,5 L | Bonum Vitae',F25:'Carafe filtrante 2,5 L | Bonum Vitae',F26:'Carafe filtrante charbon actif | Bonum Vitae',
F30:'Filtre robinet cuisine GLQ11 | Bonum Vitae',F31:'Filtre robinet rotatif 360° | Bonum Vitae',F32:'Cartouches filtre robinet alloet | Bonum Vitae',F33:'Kit filtre pour robinet | Bonum Vitae',F34:'Aérateur robinet économie eau | Bonum Vitae',
F38:'Purificateur eau camping | Bonum Vitae',
F43:'Dispositif anti-tartre DN8 | Bonum Vitae',F44:'Anti-tartre électronique USB | Bonum Vitae',F45:'Anti-tartre USB 5-20 V | Bonum Vitae',F46:'Anti-tartre magnétique DN25 | Bonum Vitae',F47:'Anti-tartre magnétique DN20 | Bonum Vitae'};
const desc={
F6:'Filtre de douche en acier inoxydable. Média, débit et durée de cartouche à confirmer. Vérifiez votre raccord avec Bonum Vitae.',
F7:'Pommeau de douche filtrant portable et réversible. Débit, média et cartouche à confirmer. Vérifiez la compatibilité avant commande.',
F8:'Filtre de douche parfumé avec corps ABS. Pression, débit et média à confirmer. Consultez les caractéristiques vérifiées.',
F9:'Filtre pour pomme de douche rond en ABS chromé. Média et durée de cartouche à confirmer. Vérifiez votre installation.',
F10:'Filtre de douche ALTHY SFH70 non électrique. Débit et média à confirmer. Consultez les limites et conditions de livraison.',
F15:'Osmoseur 600 GPD sans réservoir, débit annoncé de 2,5 L/min et raccord DN15. Vérifiez les consommables et le branchement.',
F16:'Osmoseur SHUANGLI 600G avec robinet inclus et débit annoncé de 1,58 L/min. Vérifiez les raccordements avant commande.',
F17:'Osmoseur OSWNKW 600 GPD avec débit annoncé de 2,5 L/min et raccord DN15. Consultez les données restant à confirmer.',
F18:"Membrane d'osmose inverse RO de remplacement pour conduite d'eau froide. Vérifiez impérativement la compatibilité de votre appareil.",
F22:'Carafe filtrante 3,6 L expédiée depuis Allemagne. Matériau et durée de cartouche à confirmer. Consultez la fiche détaillée.',
F23:'Carafe filtrante de table annoncée avec filtration en cinq étapes. Capacité et recharge à confirmer avant expédition.',
F24:'Carafe filtrante ALTHY 3,5 L, débit annoncé de 2 L/min. Matériau et durée de cartouche à confirmer avant commande.',
F25:'Carafe filtrante 2,5 L avec débit annoncé de 6 L/min. Matériau et référence des recharges à confirmer avant expédition.',
F26:'Carafe filtrante au charbon actif expédiée depuis Allemagne. Capacité et durée de recharge à confirmer. Consultez la fiche.',
F30:'Filtre pour robinet de cuisine GLQ11. Média, capacité et compatibilité à confirmer. Mesurez votre robinet avant commande.',
F31:'Filtre pour robinet rotatif à montage assemblé. Filetage, média et capacité à confirmer. Vérifiez la compatibilité.',
F32:'Cartouches alloet pour filtre de robinet. Référence, média et durée à confirmer. Comparez votre dispositif avant commande.',
F33:'Kit de filtration pour sortie de robinet à support fixe. Dimensions et média à confirmer. Vérifiez votre raccord.',
F34:"Aérateur de robinet destiné à l'économie d'eau. Débit et filetage à confirmer. Mesurez votre bec avant commande.",
F38:"Purificateur d'eau de camping widesea. Seuil de 0,01 micron annoncé mais non validé indépendamment. Lisez nos précautions.",
F43:'Dispositif anti-tartre ALTHY IPSE non électrique, raccord DN8. Efficacité indépendante non documentée. Consultez les limites.',
F44:'Dispositif anti-tartre électronique alimenté en USB 5-20 V. Résultats indépendants non documentés. Vérifiez les limites.',
F45:'Dispositif anti-tartre électronique USB 5-20 V expédié depuis Chine. Résultats indépendants non documentés. Informez-vous.',
F46:'Dispositif anti-tartre magnétique IPSE avec raccord DN25. Efficacité indépendante non documentée. Vérifiez la compatibilité.',
F47:'Dispositif anti-tartre magnétique IPSE avec raccord DN20. Efficacité indépendante non documentée. Consultez les limites.'};
const out={};
for(const cell of Object.keys(titles)){
 const p=base[cell];
 out[cell]={...p,title:titles[cell],seoTitle:seoTitles[cell],seoDescription:desc[cell],descriptionHtml:fs.readFileSync(path.join(ROOT,'fiches-v2',`${cell}.html`),'utf8')};
}
fs.writeFileSync(path.join(ROOT,'shopify-import-codex.json'),JSON.stringify(out,null,2));
const metas=new Set(); let bad=false;
for(const [cell,p] of Object.entries(out)){
 const errs=[];
 if(p.title.length>=70)errs.push(`title=${p.title.length}`);
 if(p.seoTitle.length>=60||!p.seoTitle.endsWith('| Bonum Vitae'))errs.push(`seoTitle=${p.seoTitle.length}`);
 if(p.seoDescription.length>=155)errs.push(`seoDesc=${p.seoDescription.length}`);
 if(metas.has(p.seoDescription))errs.push('duplicate-meta'); metas.add(p.seoDescription);
 if(errs.length)bad=true;
 console.log(`${cell}\t${p.title.length}\t${p.seoTitle.length}\t${p.seoDescription.length}\t${errs.join(',')||'OK'}`);
}
process.exitCode=bad?1:0;
