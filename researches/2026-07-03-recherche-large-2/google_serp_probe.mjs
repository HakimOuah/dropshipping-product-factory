import fs from "node:fs/promises";
import { chromium } from "playwright";

const keyword = process.argv.slice(2).join(" ") || "lit baldaquin";
const outDir =
  "/Users/Hakim/Documents/New project/researches/2026-07-03-recherche-large-2";

const context = await chromium.launchPersistentContext(`${outDir}/chrome-google-serp-profile`, {
  channel: "chrome",
  headless: false,
  locale: "fr-FR",
  timezoneId: "Europe/Paris",
  geolocation: { latitude: 48.8566, longitude: 2.3522 },
  permissions: ["geolocation"],
  userAgent:
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125 Safari/537.36",
});
const page = await context.newPage();

async function snapshot(url, name) {
  await page.goto(url, { waitUntil: "domcontentloaded", timeout: 45000 });
  await page.waitForTimeout(3500);
  const accept = page
    .getByRole("button", { name: /tout accepter|accepter|j'accepte/i })
    .first();
  if (await accept.isVisible().catch(() => false)) {
    await accept.click();
    await page.waitForTimeout(2000);
  }
  await page.screenshot({ path: `${outDir}/${name}.png`, fullPage: true });
  const text = await page.locator("body").innerText({ timeout: 10000 });
  const links = await page
    .locator("a")
    .evaluateAll((anchors) =>
      anchors
        .map((a) => ({
          text: (a.innerText || a.textContent || "").trim().replace(/\s+/g, " "),
          href: a.href,
        }))
        .filter((a) => a.text || a.href),
    );
  await fs.writeFile(
    `${outDir}/${name}.json`,
    JSON.stringify({ url: page.url(), text, links }, null, 2),
  );
}

const q = encodeURIComponent(keyword);
await snapshot(
  `https://www.google.fr/search?q=${q}&hl=fr&gl=fr&pws=0`,
  `probe-search-${keyword.replace(/[^a-z0-9]+/gi, "-").toLowerCase()}`,
);
await snapshot(
  `https://www.google.fr/search?q=${q}&hl=fr&gl=fr&pws=0&udm=28`,
  `probe-shopping-${keyword.replace(/[^a-z0-9]+/gi, "-").toLowerCase()}`,
);

await context.close();
