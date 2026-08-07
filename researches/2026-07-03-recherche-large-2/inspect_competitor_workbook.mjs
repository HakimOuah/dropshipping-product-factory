import fs from "node:fs/promises";
import { FileBlob, SpreadsheetFile } from "@oai/artifact-tool";

const workbookPath =
  "/Users/Hakim/Documents/New project/researches/2026-07-03-recherche-large-2/combined-ideas-final.xlsx";
const outputDir =
  "/Users/Hakim/Documents/New project/researches/2026-07-03-recherche-large-2";

const blob = await FileBlob.load(workbookPath);
const workbook = await SpreadsheetFile.importXlsx(blob);

const summary = await workbook.inspect({
  kind: "workbook,sheet,table",
  maxChars: 10000,
  tableMaxRows: 8,
  tableMaxCols: 15,
  tableMaxCellChars: 120,
});
console.log(summary.ndjson);

const region = await workbook.inspect({
  kind: "region",
  sheetId: "Produits valides",
  range: "A1:Z40",
  maxChars: 20000,
  tableMaxRows: 40,
  tableMaxCols: 26,
  tableMaxCellChars: 100,
});
console.log("---REGION---");
console.log(region.ndjson);

const style = await workbook.inspect({
  kind: "computedStyle",
  sheetId: "Produits valides",
  range: "A1:Z3",
  maxChars: 12000,
});
console.log("---STYLE---");
console.log(style.ndjson);

const preview = await workbook.render({
  sheetName: "Produits valides",
  range: "A1:Z35",
  scale: 1,
  format: "png",
});
await fs.writeFile(
  `${outputDir}/produits-valides-before.png`,
  new Uint8Array(await preview.arrayBuffer()),
);
