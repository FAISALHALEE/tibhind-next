/* TIB HIND — migration extractor
 * Reads every .html file under the source content folder, extracts the head
 * metadata, JSON-LD, <style> and <body> verbatim, resolves the site's
 * {{PLACEHOLDER}} template variables, remaps local .html hrefs to canonical
 * URLs, and writes one JSON file per page into ../data/pages.
 *
 * Run from the scripts/ directory:  node scripts/extract.js
 */
const fs = require("fs");
const path = require("path");

const SRC = "E:\\TIB HIND\\TIB HIND- CONTENT";
const OUT = path.join(__dirname, "..", "data", "pages");

/* ------------------------------------------------------------------ */
/* Default values for the template placeholders used across the site.  */
/* Every value below is a documented default — the real values (cost   */
/* ranges, per-specialty reviewer names, legal identity) are not       */
/* present anywhere in the source HTML and are meant to be edited in   */
/* one place: data/constants.json (regenerated from this map).         */
/* ------------------------------------------------------------------ */
const DATE_ISO = "2026-08-15"; // lastReviewed / last verified date (migration date)
const DATE = "August 2026";    // human-readable display date

const DEFAULTS = {
  REVIEW_DATE_ISO: DATE_ISO,
  REVIEW_DATE: DATE,
  YEAR: "2026",
  // The only physician named anywhere in the source is Dr. Annie Varughese.
  // All per-specialty reviewer tokens default to her name.
  BARIATRIC_REVIEWER: "Dr. Annie Varughese",
  FERTILITY_REVIEWER: "Dr. Annie Varughese",
  GASTRO_REVIEWER: "Dr. Annie Varughese",
  HAEMATOLOGY_REVIEWER: "Dr. Annie Varughese",
  NEUROSURGERY_REVIEWER: "Dr. Annie Varughese",
  ONCOLOGY_REVIEWER: "Dr. Annie Varughese",
  ORTHOPAEDIC_REVIEWER: "Dr. Annie Varughese",
  SPINE_REVIEWER: "Dr. Annie Varughese",
  TRANSPLANT_REVIEWER: "Dr. Annie Varughese",
  // Legal / footer identity (homepage). Source gives locality "New Delhi"
  // and a contact email tibhind@gmail.com; the rest are placeholders.
  LEGAL_ENTITY_NAME: "TIB HIND Healthcare",
  REGISTERED_ADDRESS: "New Delhi, Delhi 110001, India",
  POSTCODE: "110001",
  CIN_NUMBER: "CIN-PENDING",
  DOMAIN_EMAIL: "tibhind@gmail.com",
};

const substitute = (text, rangeDefaults) => {
  const extra = rangeDefaults || {};
  return text.replace(/\{\{[A-Z_0-9]+\}\}/g, (tok) => {
    const key = tok.slice(2, -2);
    if (key in DEFAULTS) return DEFAULTS[key];
    if (key.startsWith("RANGE_")) return extra.RANGE || DEFAULTS.RANGE_DEFAULT || "On request";
    throw new Error("No default for placeholder " + tok);
  });
};

/* ------------------------------------------------------------------ */
/* inventory                                                            */
/* ------------------------------------------------------------------ */
const files = [];
(function walk(dir) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p);
    else if (e.name.endsWith(".html")) files.push(p);
  }
})(SRC);
files.sort();

// filename -> canonical pathname
const canonicalOf = new Map();
const routeOf = new Map();
for (const f of files) {
  const html = fs.readFileSync(f, "utf8");
  const c = (html.match(/<link rel="canonical" href="([^"]*)"/) || [])[1];
  canonicalOf.set(f, c || null);
  if (c) {
    try {
      routeOf.set(f, new URL(c).pathname);
    } catch {
      routeOf.set(f, null);
    }
  }
}

// Local hrefs in the conditions index point at sibling .html files.
const nameToRoute = new Map();
for (const [f, r] of routeOf) nameToRoute.set(path.basename(f), r);
for (const [f] of canonicalOf) {
  const base = path.basename(f);
  if (!nameToRoute.has(base)) nameToRoute.set(base, null);
}

/* ------------------------------------------------------------------ */
/* duplicate-canonical pairs — the richer / primary file wins           */
/* ------------------------------------------------------------------ */
// /treatments/heart/            -> -2page (lists 16 conditions vs 10)
// /treatments/bone-marrow-transplant/ -> main page--- (fuller, standard structure)
const KEEP = {
  "tib-hind-heart-treatment-2page.html": true,
  "tib-hind-bone-marrow-transplant-page---.html": true,
};
const skipped = []; // {source, mergedInto, reason}

/* ------------------------------------------------------------------ */
/* no-canonical files -> fixed routes                                   */
/* ------------------------------------------------------------------ */
const NO_CANON = {
  "tib-hind-homepage-preview (2).html": { route: "/", canonical: "https://tibhind.com/" },
  "tib-hind-treatments-page.html": { route: "/treatments/", canonical: "https://tibhind.com/treatments/" },
  "tib-hind-ALL-CONDITIONS-INDEX.html": { route: "/conditions/", canonical: null },
};

const usedRoutes = new Set();
const pages = [];

for (const f of files) {
  const base = path.basename(f);
  let route = routeOf.get(f);
  let canonical = canonicalOf.get(f);
  let robots = null;

  if (!route) {
    const nc = NO_CANON[base];
    if (nc) {
      route = nc.route;
      canonical = nc.canonical;
    } else {
      throw new Error("No route for " + f);
    }
  }

  // dedupe: same canonical, more than one source file
  if (usedRoutes.has(route)) {
    if (KEEP[base]) {
      // this file wins; remove the earlier entry and mark it merged
      const prev = pages.find((p) => p.route === route);
      skipped.push({ source: prev.source, mergedInto: base, reason: "duplicate canonical " + canonical });
      pages.splice(pages.indexOf(prev), 1);
    } else {
      skipped.push({ source: f, mergedInto: "see winner", reason: "duplicate canonical " + canonical });
      continue;
    }
  }
  usedRoutes.add(route);

  const html = fs.readFileSync(f, "utf8");
  const head = (html.match(/<head>([\s\S]*?)<\/head>/) || [])[1] || "";
  const body = (html.match(/<body[^>]*>([\s\S]*?)<\/body>/) || [])[1] || "";

  const title = (head.match(/<title>([\s\S]*?)<\/title>/) || [])[1] || "";
  const description = (head.match(/<meta name="description" content="([^"]*)"/) || [])[1] || null;
  robots = (head.match(/<meta name="robots" content="([^"]*)"/) || [])[1] || null;

  const styles = [];
  for (const m of head.matchAll(/<style[^>]*>([\s\S]*?)<\/style>/g)) styles.push(m[1]);

  const jsonLd = [];
  for (const m of head.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
    jsonLd.push(m[1]);
  }

  const headScripts = [];
  for (const m of head.matchAll(/<script(?![^>]*application\/ld\+json)[^>]*>([\s\S]*?)<\/script>/g)) {
    headScripts.push(m[1]);
  }

  // resolve placeholders
  const sTitle = substitute(title);
  const sDesc = description ? substitute(description) : null;
  const sJson = jsonLd.map((j) => substitute(j));
  const sBody = substitute(body);
  const sHead = headScripts.map((h) => substitute(h)).join("\n");

  // remap local .html hrefs to canonical routes; keep the original (broken)
  // href untouched when the linked source file does not exist in the tree.
  const deadHrefs = [];
  let bodyFixed = sBody.replace(/href="(tib-hind-[^"]+\.html)"/g, (_m, file) => {
    const r = nameToRoute.get(file);
    if (!r) {
      deadHrefs.push(file);
      return 'href="' + file + '"';
    }
    return 'href="' + r + '"';
  });
  for (const d of deadHrefs) console.log("   dead link kept: " + d + " (no source file) from " + base);

  const id = route === "/" ? "home" : route.split("/").filter(Boolean).join("-");

  const page = {
    id,
    route,
    canonical: canonical || null,
    title: sTitle,
    description: sDesc,
    robots,
    styles,
    jsonLd: sJson,
    headScripts: sHead,
    body: bodyFixed,
    source: f.replace(SRC + path.sep, "").replace(/\\/g, "/"),
  };
  pages.push(page);
}

fs.mkdirSync(OUT, { recursive: true });
const registry = [];
for (const p of pages) {
  const file = path.join(OUT, p.id + ".json");
  fs.writeFileSync(file, JSON.stringify(p, null, 2));
  registry.push({ id: p.id, route: p.route, title: p.title, source: p.source });
}
fs.writeFileSync(path.join(__dirname, "..", "data", "registry.json"), JSON.stringify(registry, null, 2));
fs.writeFileSync(path.join(__dirname, "..", "data", "constants.json"), JSON.stringify(DEFAULTS, null, 2));

console.log("Source files:  " + files.length);
console.log("Pages written: " + pages.length + " (routes: " + new Set(pages.map((p) => p.route)).size + ")");
console.log("Merged/skipped duplicates: " + skipped.length);
for (const s of skipped) console.log("   - " + s.source + "  ->  " + s.mergedInto + "  (" + s.reason + ")");

// sanity: no leftover placeholders anywhere
let leftover = 0;
for (const p of pages) {
  const all = [p.title, p.description || "", p.body, p.headScripts, ...p.jsonLd].join("\n");
  const hits = all.match(/\{\{[A-Z_0-9]+\}\}/g);
  if (hits) {
    leftover++;
    console.log("LEFTOVER PLACEHOLDERS in " + p.route + ": " + hits.join(", "));
  }
}
console.log("Pages with leftover placeholders: " + leftover);
