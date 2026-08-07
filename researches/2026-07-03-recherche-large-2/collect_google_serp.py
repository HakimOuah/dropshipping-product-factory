#!/usr/bin/env python3
import datetime as dt
import json
import re
import subprocess
import time
import unicodedata
import urllib.parse
import zipfile
import xml.etree.ElementTree as ET
from pathlib import Path

RUN_DIR = Path("/Users/Hakim/Documents/New project/researches/2026-07-03-recherche-large-2")
WORKBOOK = RUN_DIR / "combined-ideas-final.xlsx"
RAW_DIR = RUN_DIR / "serp_raw"
STATUS = RUN_DIR / "serp_collection_status.tsv"
DUMPER = RUN_DIR / "ax_dump_chrome"

NS = {
    "main": "http://schemas.openxmlformats.org/spreadsheetml/2006/main",
    "rel": "http://schemas.openxmlformats.org/officeDocument/2006/relationships",
    "pkg": "http://schemas.openxmlformats.org/package/2006/relationships",
}


def slugify(value: str) -> str:
    normalized = unicodedata.normalize("NFKD", value).encode("ascii", "ignore").decode("ascii")
    return re.sub(r"[^a-z0-9]+", "-", normalized.lower()).strip("-")[:70] or "keyword"


def col_to_index(cell_ref: str) -> int:
    letters = re.match(r"([A-Z]+)", cell_ref).group(1)
    n = 0
    for ch in letters:
        n = n * 26 + (ord(ch) - ord("A") + 1)
    return n - 1


def load_sheet_rows(xlsx_path: Path, sheet_name: str):
    with zipfile.ZipFile(xlsx_path) as zf:
        shared = []
        if "xl/sharedStrings.xml" in zf.namelist():
            root = ET.fromstring(zf.read("xl/sharedStrings.xml"))
            for si in root.findall("main:si", NS):
                shared.append("".join(t.text or "" for t in si.findall(".//main:t", NS)))

        wb = ET.fromstring(zf.read("xl/workbook.xml"))
        rels = ET.fromstring(zf.read("xl/_rels/workbook.xml.rels"))
        rel_map = {r.attrib["Id"]: r.attrib["Target"] for r in rels.findall("pkg:Relationship", NS)}
        sheet_target = None
        for sheet in wb.findall("main:sheets/main:sheet", NS):
            if sheet.attrib.get("name") == sheet_name:
                sheet_target = rel_map[sheet.attrib[f"{{{NS['rel']}}}id"]]
                break
        if not sheet_target:
            raise RuntimeError(f"Sheet not found: {sheet_name}")
        clean_target = sheet_target.lstrip("/")
        sheet_path = clean_target if clean_target.startswith("xl/") else "xl/" + clean_target
        root = ET.fromstring(zf.read(sheet_path))

        rows = []
        for row in root.findall("main:sheetData/main:row", NS):
            row_idx = int(row.attrib["r"])
            values = {}
            for cell in row.findall("main:c", NS):
                ref = cell.attrib["r"]
                idx = col_to_index(ref)
                typ = cell.attrib.get("t")
                v = cell.find("main:v", NS)
                if typ == "inlineStr":
                    text = "".join(t.text or "" for t in cell.findall(".//main:t", NS))
                elif v is None:
                    text = ""
                elif typ == "s":
                    text = shared[int(v.text)]
                else:
                    text = v.text or ""
                values[idx] = text
            rows.append((row_idx, values))
        return rows


def load_products():
    rows = load_sheet_rows(WORKBOOK, "Produits valides")
    header = None
    products = []
    for row_idx, values in rows:
        row = [values.get(i, "") for i in range(40)]
        if row and row[0] == "Produit":
            header = row
            continue
        if header and row[0] and row[10]:
            products.append({"row": row_idx, "product": row[0], "keyword": row[10]})
    return products


def navigate(url: str):
    script = f'''
tell application "Google Chrome"
  activate
  set URL of active tab of front window to "{url}"
end tell
'''
    subprocess.run(["/usr/bin/osascript"], input=script, text=True, check=True)


def dump_ax() -> str:
    proc = subprocess.run([str(DUMPER)], text=True, capture_output=True, check=True)
    return proc.stdout


def is_blocked(text: str) -> bool:
    lowered = text.lower()
    return (
        "nos systèmes ont détecté un trafic exceptionnel" in lowered
        or "google.com/sorry" in lowered
        or "à propos de cette page" in lowered
    )


def collect_one(product, mode: str) -> dict:
    q = urllib.parse.quote(product["keyword"])
    suffix = "" if mode == "search" else "&udm=28"
    url = f"https://www.google.fr/search?q={q}&hl=fr&gl=fr&pws=0{suffix}"
    raw_path = RAW_DIR / f"{product['row']:02d}-{slugify(product['keyword'])}-{mode}.txt"
    navigate(url)
    time.sleep(5.5 if mode == "search" else 6.5)
    text = dump_ax()
    raw_path.write_text(text, encoding="utf-8")
    return {
        "row": product["row"],
        "product": product["product"],
        "keyword": product["keyword"],
        "mode": mode,
        "url": url,
        "raw_path": str(raw_path),
        "blocked": is_blocked(text),
        "chars": len(text),
        "timestamp": dt.datetime.now().isoformat(timespec="seconds"),
    }


def append_status(entry: dict):
    new_file = not STATUS.exists()
    with STATUS.open("a", encoding="utf-8") as f:
        if new_file:
            f.write("timestamp\trow\tkeyword\tmode\tblocked\tchars\traw_path\n")
        f.write(
            f"{entry['timestamp']}\t{entry['row']}\t{entry['keyword']}\t{entry['mode']}\t"
            f"{entry['blocked']}\t{entry['chars']}\t{entry['raw_path']}\n"
        )


def main():
    RAW_DIR.mkdir(exist_ok=True)
    products = load_products()
    print(f"products={len(products)}")
    all_entries = []
    for i, product in enumerate(products, start=1):
        print(f"[{i:02d}/{len(products)}] {product['keyword']} :: search", flush=True)
        search = collect_one(product, "search")
        append_status(search)
        all_entries.append(search)
        if search["blocked"]:
            print(f"  BLOCKED search for {product['keyword']}", flush=True)
        print(f"[{i:02d}/{len(products)}] {product['keyword']} :: shopping", flush=True)
        shopping = collect_one(product, "shopping")
        append_status(shopping)
        all_entries.append(shopping)
        if shopping["blocked"]:
            print(f"  BLOCKED shopping for {product['keyword']}", flush=True)
        (RUN_DIR / "serp_collection_status.json").write_text(
            json.dumps(all_entries, ensure_ascii=False, indent=2),
            encoding="utf-8",
        )
        time.sleep(2.5)


if __name__ == "__main__":
    main()
