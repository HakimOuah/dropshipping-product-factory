import fs from "node:fs/promises";
import path from "node:path";
import { FileBlob, SpreadsheetFile } from "@oai/artifact-tool";

const outputDir = "/Users/Hakim/Documents/New project/outputs/coloriage-kawaii-arborescence-2026-07-09";
const inputPath = path.join(outputDir, "arborescence-site-coloriages-kawaii-sourcing-complet.xlsx");
const outputPath = path.join(outputDir, "arborescence-site-coloriages-kawaii-sourcing-final.xlsx");
const mode = process.argv[2] ?? "inspect";

const input = await FileBlob.load(inputPath);
const workbook = await SpreadsheetFile.importXlsx(input);
const sourcing = workbook.worksheets.getItem("Sourcing_AliExpress");

const rows = sourcing.getRange("A4:T78").values;
const summary = new Map();
for (const row of rows) {
  const collection = String(row[1] ?? "").trim();
  if (!collection) continue;
  const item = summary.get(collection) ?? { collection, rows: 0, filled: 0, urls: [] };
  item.rows += 1;
  const url = String(row[3] ?? "").trim();
  if (url) {
    item.filled += 1;
    item.urls.push(url);
  }
  summary.set(collection, item);
}

console.log(JSON.stringify([...summary.values()], null, 2));

const check = await workbook.inspect({
  kind: "table",
  range: "Sourcing_AliExpress!A1:T78",
  include: "values,formulas",
  tableMaxRows: 78,
  tableMaxCols: 20,
  tableMaxCellChars: 180,
  maxChars: 40000,
});
await fs.writeFile(path.join(outputDir, "sourcing-current.inspect.ndjson"), check.ndjson);

const preview = await workbook.render({
  sheetName: "Sourcing_AliExpress",
  autoCrop: "all",
  scale: 1,
  format: "png",
});
await fs.writeFile(
  path.join(outputDir, "Sourcing_AliExpress_current.png"),
  new Uint8Array(await preview.arrayBuffer()),
);

if (mode === "export") {
  const errors = await workbook.inspect({
    kind: "match",
    searchTerm: "#REF!|#DIV/0!|#VALUE!|#NAME\\?|#N/A",
    options: { useRegex: true, maxResults: 300 },
    summary: "final formula error scan",
  });
  console.log(errors.ndjson);
  const output = await SpreadsheetFile.exportXlsx(workbook);
  await output.save(outputPath);
  console.log(outputPath);
}
