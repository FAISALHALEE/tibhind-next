const fs = require("fs");
const path = require("path");
const { buildPage } = require("./render");

const PAGES_DIR = path.join(__dirname, "..", "..", "data", "pages");
const REGISTRY = path.join(__dirname, "..", "..", "data", "registry.json");

const groups = ["content-cost.json", "content-visa.json", "content-info.json", "content-misc.json"];
const defs = [];
for (const g of groups) {
  const arr = JSON.parse(fs.readFileSync(path.join(__dirname, g), "utf8"));
  defs.push(...arr);
}

const registry = JSON.parse(fs.readFileSync(REGISTRY, "utf8"));
const seen = new Set(registry.map((r) => r.route));

let added = 0;
for (const def of defs) {
  if (seen.has(def.route)) {
    console.log("skip (exists): " + def.route);
    continue;
  }
  const page = buildPage(def);
  fs.writeFileSync(path.join(PAGES_DIR, page.id + ".json"), JSON.stringify(page, null, 2));
  registry.push({ id: page.id, route: page.route, title: page.title, source: page.source });
  seen.add(def.route);
  added++;
}

fs.writeFileSync(REGISTRY, JSON.stringify(registry, null, 2));
console.log("Added " + added + " pages. Total registry: " + registry.length);