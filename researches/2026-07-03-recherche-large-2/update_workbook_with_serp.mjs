import fs from "node:fs/promises";
import { FileBlob, SpreadsheetFile } from "@oai/artifact-tool";

const runDir =
  "/Users/Hakim/Documents/New project/researches/2026-07-03-recherche-large-2";
const workbookPath = `${runDir}/combined-ideas-final.xlsx`;
const backupPath = `${runDir}/combined-ideas-final.before-serp.xlsx`;
const resultsPath = `${runDir}/serp_analysis_results.json`;
const previewPath = `${runDir}/produits-valides-after-serp.png`;

const results = JSON.parse(await fs.readFile(resultsPath, "utf8"));
const resultByRow = new Map(results.map((row) => [row.row, row]));

function numberFromPrice(value) {
  if (typeof value !== "string" || !value.endsWith("EUR")) return value;
  const numeric = Number(value.replace("EUR", "").trim());
  return Number.isFinite(numeric) ? numeric : value;
}

await fs.copyFile(workbookPath, backupPath);

const input = await FileBlob.load(workbookPath);
const workbook = await SpreadsheetFile.importXlsx(input);
const sheet = workbook.worksheets.getItem("Produits valides");

const headers = [
  "Concurrents Shopping (liste des marchands)",
  "Concurrents Search (liste des sites organiques/annonces)",
  "Concurrents institutionnels ? (OUI/NON)",
  "Institutionnels présents (lesquels)",
  "Concurrents NON-institutionnels (DTC/spécialistes)",
  "Prix moyen observé (EUR)",
  "Fourchette de prix (min - max EUR)",
];

sheet.getRange("L4:R4").values = [headers];

const rows = [];
for (let excelRow = 5; excelRow <= 34; excelRow += 1) {
  const r = resultByRow.get(excelRow);
  if (!r) {
    rows.push([
      "SERP bloquée",
      "SERP bloquée",
      "SERP bloquée",
      "SERP bloquée",
      "SERP bloquée",
      "SERP bloquée",
      "SERP bloquée",
    ]);
    continue;
  }
  rows.push([
    r.shopping_competitors,
    r.search_competitors,
    r.has_institutional,
    r.institutionals,
    r.non_institutionals,
    numberFromPrice(r.avg_price),
    r.price_range,
  ]);
}
sheet.getRange("L5:R34").values = rows;

sheet.getRange("L4:R4").format = {
  fill: "#1F4E78",
  font: { bold: true, color: "#FFFFFF" },
  wrapText: true,
  horizontalAlignment: "center",
};
sheet.getRange("L5:R34").format = {
  wrapText: true,
  verticalAlignment: "top",
};
sheet.getRange("L:R").format.columnWidth = 24;
sheet.getRange("L:L").format.columnWidth = 45;
sheet.getRange("M:M").format.columnWidth = 42;
sheet.getRange("N:N").format.columnWidth = 18;
sheet.getRange("O:O").format.columnWidth = 32;
sheet.getRange("P:P").format.columnWidth = 42;
sheet.getRange("Q:Q").format.columnWidth = 18;
sheet.getRange("R:R").format.columnWidth = 24;
sheet.getRange("Q5:Q34").format.numberFormat = "#,##0.00";
sheet.getRange("L4:R34").format.borders = {
  preset: "all",
  style: "thin",
  color: "#D9E2F3",
};

const valuesCheck = await workbook.inspect({
  kind: "table",
  sheetId: "Produits valides",
  range: "K4:R10",
  tableMaxRows: 8,
  tableMaxCols: 8,
  maxChars: 10000,
});
console.log(valuesCheck.ndjson);

const errors = await workbook.inspect({
  kind: "match",
  searchTerm: "#REF!|#DIV/0!|#VALUE!|#NAME\\?|#N/A",
  options: { useRegex: true, maxResults: 300 },
  summary: "final formula error scan",
});
console.log(errors.ndjson);

const preview = await workbook.render({
  sheetName: "Produits valides",
  range: "A1:R34",
  scale: 1,
  format: "png",
});
await fs.writeFile(previewPath, new Uint8Array(await preview.arrayBuffer()));

const output = await SpreadsheetFile.exportXlsx(workbook);
await output.save(workbookPath);
console.log(`saved=${workbookPath}`);
