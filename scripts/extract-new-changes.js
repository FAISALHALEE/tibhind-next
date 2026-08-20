/* TIB HIND — migration extractor for the "new changes" folder.
 * Reads every .html file under ../new changes, assigns a site route
 * (best-doctors-india directory, doctor profiles, hospital profiles,
 * hospital directory, treatment/info pages via canonical), remaps the
 * preview-domain (chatgpt.site) and sibling .html links, resolves
 * {{PLACEHOLDER}} tokens, extracts head metadata / styles / JSON-LD /
 * scripts, and writes one JSON file per page into ../data/pages.
 *
 * Run: node scripts/extract-new-changes.js
 */
const fs = require("fs");
const path = require("path");

const SRC = path.join(__dirname, "..", "new changes");
const OUT = path.join(__dirname, "..", "data", "pages");

const DATE_ISO = "2026-08-16"; // lastReviewed / last verified date (new-changes migration date)
const DATE = "August 2026";    // human-readable display date

const DEFAULTS = {
  REVIEW_DATE_ISO: DATE_ISO,
  REVIEW_DATE: DATE,
  YEAR: "2026",
  ENT_REVIEWER: "Dr. Annie Varughese",
  OPHTHALMOLOGY_REVIEWER: "Dr. Annie Varughese",
  GYNAECOLOGY_REVIEWER: "Dr. Annie Varughese",
  PSYCHIATRY_REVIEWER: "Dr. Annie Varughese",
  PULMONOLOGY_REVIEWER: "Dr. Annie Varughese",
  REHAB_REVIEWER: "Dr. Annie Varughese",
  UROLOGY_REVIEWER: "Dr. Annie Varughese",
  VASCULAR_REVIEWER: "Dr. Annie Varughese",
  LEGAL_ENTITY_NAME: "TIB HIND Healthcare",
  REGISTERED_ADDRESS: "New Delhi, Delhi 110001, India",
  POSTCODE: "110001",
  CIN_NUMBER: "CIN-PENDING",
  DOMAIN_EMAIL: "tibhind@gmail.com",
};

const substitute = (text) =>
  text.replace(/\{\{[A-Z_0-9]+\}\}/g, (tok) => {
    const key = tok.slice(2, -2);
    if (key in DEFAULTS) return DEFAULTS[key];
    if (key.startsWith("RANGE_")) return "On request";
    throw new Error("No default for placeholder " + tok);
  });

/* ------------------------------------------------------------------ */
/* inventory + route assignment                                        */
/* ------------------------------------------------------------------ */
const files = fs.readdirSync(SRC).filter((f) => f.endsWith(".html"));
files.sort();

const DOMAIN = "https://tibhind.com";

function routeOfFile(base) {
  let m;
  if ((m = base.match(/^tib-hind-cardiology-directory-page-(\d+)\.html$/))) {
    const n = parseInt(m[1], 10);
    return n === 1 ? "/best-doctors-india/" : `/best-doctors-india/page/${n}/`;
  }
  if ((m = base.match(/^tib-hind-hospital-page-(\d+)\.html$/))) {
    const n = parseInt(m[1], 10);
    return n === 1 ? "/best-hospitals-india/" : `/best-hospitals-india/page/${n}/`;
  }
  if ((m = base.match(/^cardiologist-(?:col-)?(dr-.+)\.html$/))) {
    return `/doctors/${m[1]}/`;
  }
  if ((m = base.match(/^hospital-(.+)\.html$/))) {
    return `/hospitals/${m[1]}/`;
  }
  const html = fs.readFileSync(path.join(SRC, base), "utf8");
  const c = (html.match(/<link rel="canonical" href="([^"]*)"/) || [])[1];
  if (c) {
    try {
      return new URL(c).pathname;
    } catch {
      return null;
    }
  }
  return null;
}

// dedupe: same route, keep the larger source file
const routeToFile = new Map();
for (const base of files) {
  const route = routeOfFile(base);
  if (!route) continue;
  const cur = routeToFile.get(route);
  const size = fs.statSync(path.join(SRC, base)).size;
  if (!cur) routeToFile.set(route, base);
  else if (size > fs.statSync(path.join(SRC, cur)).size) routeToFile.set(route, base);
}

const skipped = [];
const nameToRoute = new Map();
for (const [route, base] of routeToFile) nameToRoute.set(base, route);
for (const base of files) {
  const route = routeOfFile(base);
  if (route && routeToFile.get(route) !== base) {
    skipped.push({ source: base, mergedInto: routeToFile.get(route), reason: "duplicate route " + route });
  }
  if (!nameToRoute.has(base)) nameToRoute.set(base, route);
}

/* ------------------------------------------------------------------ */
/* preview-domain -> local path remapping                              */
/* ------------------------------------------------------------------ */
function chatToLocal(p) {
  if (!p || p === "/") return "/";
  const norm = p.replace(/\/+$/, "");
  if (norm === "/hospital") return "/best-hospitals-india/";
  if (norm.startsWith("/hospital/")) return "/hospitals/" + norm.slice("/hospital/".length) + "/";
  if (norm === "/doctors/cardiology" || norm === "/doctors/cardiac-surgery") return "/best-doctors-india/";
  if (norm.endsWith(".xml") || norm.endsWith(".txt")) return p;
  return norm + "/";
}

/* ------------------------------------------------------------------ */
/* per-file extraction                                                 */
/* ------------------------------------------------------------------ */
const pages = [];
for (const [route, base] of routeToFile) {
  const file = path.join(SRC, base);
  const html = fs.readFileSync(file, "utf8");
  const head = (html.match(/<head>([\s\S]*?)<\/head>/) || [])[1] || "";
  let body = (html.match(/<body[^>]*>([\s\S]*?)<\/body>/) || [])[1] || "";

  const title = (head.match(/<title>([\s\S]*?)<\/title>/) || [])[1] || "";
  const description = (head.match(/<meta name="description" content="([^"]*)"/) || [])[1] || null;
  const robots = (head.match(/<meta name="robots" content="([^"]*)"/) || [])[1] || null;

  const styles = [];
  for (const m of head.matchAll(/<style[^>]*>([\s\S]*?)<\/style>/g)) styles.push(m[1]);

  const jsonLd = [];
  for (const m of html.matchAll(/<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)) {
    jsonLd.push(m[1]);
  }
  body = body.replace(/<script type="application\/ld\+json"[^>]*>[\s\S]*?<\/script>/g, "");

  // pull the js-class enhancer out of the body (matches the rest of the site)
  body = body.replace(
    /<script>\s*document\.documentElement\.classList\.add\(["']js["']\);\s*<\/script>/g,
    "",
  );
  const headScripts = 'document.documentElement.classList.add("js");';

  // resolve placeholders
  const sTitle = substitute(title);
  const sDesc = description ? substitute(description) : null;
  const sJson = jsonLd.map((j) => substitute(j));
  const sBody = substitute(body);

  // remap sibling .html links
  const bodyFixed = sBody
    .replace(/href="(cardiologist-(?:col-)?dr-[^"]+\.html)"/g, (_m, f) => {
      const r = nameToRoute.get(f);
      return r ? `href="${r}"` : `href="${f}"`;
    })
    .replace(/href="(hospital-[^"]+\.html)"/g, (_m, f) => {
      const r = nameToRoute.get(f);
      return r ? `href="${r}"` : `href="${f}"`;
    })
    .replace(/href="(tib-hind-[^"]+\.html)"/g, (_m, f) => {
      const r = nameToRoute.get(f);
      return r ? `href="${r}"` : `href="${f}"`;
    })
    .replace(/href="https:\/\/tib-hind-hospitals\.irfanhaleemsidz\.chatgpt\.site([^"]*)"/g, (_m, p) => {
      return `href="${chatToLocal(p)}"`;
    })
    // nav "Doctors" should open the directory listing (like rihlatmed), not the info page
    .replace(/href="\/doctors\/"/g, 'href="/best-doctors-india/"');

  const id = route === "/" ? "home" : route.split("/").filter(Boolean).join("-");
  const page = {
    id,
    route,
    canonical: DOMAIN + route,
    title: sTitle,
    description: sDesc,
    robots,
    styles,
    jsonLd: sJson,
    headScripts,
    body: bodyFixed,
    source: "new changes/" + base,
  };
  pages.push(page);
}

/* ------------------------------------------------------------------ */
/* write output                                                        */
/* ------------------------------------------------------------------ */
fs.mkdirSync(OUT, { recursive: true });
const registry = [];
for (const p of pages) {
  fs.writeFileSync(path.join(OUT, p.id + ".json"), JSON.stringify(p, null, 2));
  registry.push({ id: p.id, route: p.route, title: p.title, source: p.source });
}

// merge registry with existing (keep pages not produced by this migration)
const existing = fs.existsSync(path.join(__dirname, "..", "data", "registry.json"))
  ? JSON.parse(fs.readFileSync(path.join(__dirname, "..", "data", "registry.json"), "utf8"))
  : [];
const byId = new Map(existing.map((e) => [e.id, e]));
for (const r of registry) byId.set(r.id, r);
fs.writeFileSync(
  path.join(__dirname, "..", "data", "registry.json"),
  JSON.stringify([...byId.values()], null, 2),
);

console.log("Source files:  " + files.length);
console.log("Pages written: " + pages.length + " (routes: " + new Set(pages.map((p) => p.route)).size + ")");
console.log("Merged/skipped duplicates: " + skipped.length);
for (const s of skipped) console.log("   - " + s.source + "  ->  " + s.mergedInto + "  (" + s.reason + ")");

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