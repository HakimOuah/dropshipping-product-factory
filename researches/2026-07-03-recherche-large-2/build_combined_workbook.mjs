import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { SpreadsheetFile, Workbook } from "@oai/artifact-tool";

const __filename = fileURLToPath(import.meta.url);
const runDir = path.dirname(__filename);

function parseTsv(text) {
  const rows = text.trimEnd().split(/\r?\n/).map((line) => line.split("\t"));
  const headers = rows.shift();
  return rows.map((row) => Object.fromEntries(headers.map((h, i) => [h, row[i] ?? ""])));
}

const sourceRows = parseTsv(await fs.readFile(path.join(runDir, "combined-ideas.tsv"), "utf8"));
const duplicateRows = parseTsv(await fs.readFile(path.join(runDir, "combined-duplicates-removed.tsv"), "utf8"));

const headers = [
  "produit",
  "plateforme(s)",
  "categorie",
  "prix marche EUR",
  "score broyeur initial",
  "decision initiale",
  "flags initiaux",
  "Semrush base",
  "cluster FR volume/mois",
  "CPC EUR",
  "KD",
  "intent",
  "Google Trends FR 5 ans",
  "demande validee",
  "prix_source_ali EUR",
  "fournisseur AliExpress",
  "URL AliExpress",
  "commandes AliExpress",
  "note produit",
  "notation vendeur",
  "delai livraison",
  "expedie depuis Europe",
  "score broyeur enrichi",
  "decision enrichie",
  "raison / notes",
  "fichier source",
];

const values = sourceRows.map((r) => [
  r["produit"],
  r["plateforme(s)"],
  r["categorie"],
  Number(r["prix marche EUR"]) || r["prix marche EUR"],
  Number(r["score broyeur"]) || r["score broyeur"],
  r["decision"],
  r["flags"],
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
  "",
  "",
  "",
  `${r["angle/notes"]}${r["sources URLs"] ? " | Sources: " + r["sources URLs"] : ""}`,
  r["fichier source"],
]);

const workbook = Workbook.create();
const sheet = workbook.worksheets.add("Combined Ideas");
sheet.showGridLines = false;
sheet.getRange("A1:Z1").merge();
sheet.getRange("A1").values = [["Idees produits combinees - dedoublonnees - validation Kloow/AliExpress"]];
sheet.getRange("A2:Z2").merge();
sheet.getRange("A2").values = [[`${sourceRows.length} produits uniques. ${duplicateRows.length} doublons proches retires. Colonnes Semrush/AliExpress a remplir en serie.`]];
sheet.getRangeByIndexes(2, 0, 1, headers.length).values = [headers];
sheet.getRangeByIndexes(3, 0, values.length, headers.length).values = values;

sheet.getRange("A1").format = { fill: "#111827", font: { bold: true, color: "#FFFFFF", size: 14 } };
sheet.getRange("A2").format = { fill: "#E5E7EB", font: { color: "#374151", size: 10 } };
sheet.getRangeByIndexes(2, 0, 1, headers.length).format = { fill: "#1F4E79", font: { bold: true, color: "#FFFFFF" } };
sheet.getRangeByIndexes(0, 0, values.length + 3, headers.length).format.font = { name: "Aptos", size: 10, color: "#111827" };
sheet.getRangeByIndexes(2, 0, values.length + 1, headers.length).format.wrapText = true;
sheet.freezePanes.freezeRows(3);
const table = sheet.tables.add(`A3:Z${values.length + 3}`, true, "CombinedIdeasTable");
table.style = "TableStyleMedium2";
table.showFilterButton = true;

const widths = [34, 14, 20, 13, 12, 13, 22, 12, 15, 10, 8, 16, 20, 14, 15, 24, 36, 15, 12, 14, 16, 14, 13, 14, 54, 14];
widths.forEach((w, i) => {
  sheet.getRangeByIndexes(0, i, values.length + 3, 1).format.columnWidth = w;
});
sheet.getRangeByIndexes(3, 3, values.length, 1).setNumberFormat("#,##0");
sheet.getRangeByIndexes(3, 4, values.length, 1).setNumberFormat("0");
sheet.getRangeByIndexes(3, 8, values.length, 1).setNumberFormat("#,##0");
sheet.getRangeByIndexes(3, 9, values.length, 1).setNumberFormat("0.00");
sheet.getRangeByIndexes(3, 10, values.length, 1).setNumberFormat("0");
sheet.getRangeByIndexes(3, 14, values.length, 1).setNumberFormat("#,##0.00");
sheet.getRangeByIndexes(3, 22, values.length, 1).setNumberFormat("0");

const decisionRange = sheet.getRangeByIndexes(3, 5, values.length, 1);
decisionRange.conditionalFormats.add("containsText", { text: "review", format: { fill: "#FEF3C7", font: { color: "#92400E", bold: true } } });
decisionRange.conditionalFormats.add("containsText", { text: "reject", format: { fill: "#FEE2E2", font: { color: "#991B1B", bold: true } } });

const demandRange = sheet.getRangeByIndexes(3, 13, values.length, 1);
demandRange.conditionalFormats.add("containsText", { text: "oui", format: { fill: "#DCFCE7", font: { color: "#166534", bold: true } } });
demandRange.conditionalFormats.add("containsText", { text: "non", format: { fill: "#FEE2E2", font: { color: "#991B1B", bold: true } } });
demandRange.conditionalFormats.add("containsText", { text: "bloque", format: { fill: "#E5E7EB", font: { color: "#374151", bold: true } } });

const dupSheet = workbook.worksheets.add("Doublons retires");
dupSheet.showGridLines = false;
const dupHeaders = ["produit retire", "remplace par", "fichier source", "score", "decision"];
const dupValues = duplicateRows.map((r) => [r["produit"], r["doublon retire"], r["fichier source"], Number(r["score broyeur"]) || r["score broyeur"], r["decision"]]);
dupSheet.getRangeByIndexes(0, 0, 1, dupHeaders.length).values = [dupHeaders];
if (dupValues.length) dupSheet.getRangeByIndexes(1, 0, dupValues.length, dupHeaders.length).values = dupValues;
dupSheet.getRangeByIndexes(0, 0, Math.max(2, dupValues.length + 1), dupHeaders.length).format.font = { name: "Aptos", size: 10, color: "#111827" };
dupSheet.getRangeByIndexes(0, 0, 1, dupHeaders.length).format = { fill: "#1F4E79", font: { bold: true, color: "#FFFFFF" } };
dupSheet.tables.add(`A1:E${dupValues.length + 1}`, true, "RemovedDuplicatesTable");
dupSheet.getRange("A:E").format.columnWidth = 28;

const errorScan = await workbook.inspect({
  kind: "match",
  searchTerm: "#REF!|#DIV/0!|#VALUE!|#NAME\\?|#N/A",
  options: { useRegex: true, maxResults: 50 },
  summary: "combined workbook error scan",
});
await fs.writeFile(path.join(runDir, "combined-ideas-master-errors.ndjson"), errorScan.ndjson, "utf8");
const preview = await workbook.render({ sheetName: "Combined Ideas", range: "A1:Z18", scale: 1, format: "png" });
await fs.writeFile(path.join(runDir, "combined-ideas-master-preview.png"), new Uint8Array(await preview.arrayBuffer()));
const output = await SpreadsheetFile.exportXlsx(workbook);
await output.save(path.join(runDir, "combined-ideas-master.xlsx"));
