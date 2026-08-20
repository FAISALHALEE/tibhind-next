/* TIB HIND — extract the Dr. Annie Varughese profile from "new changes 2"
 * into a doctor profile page at /doctors/pediatric-surgery/dr-annie-varughese/
 * using the same extraction pipeline as scripts/extract-new-changes.js.
 *
 * Run: node scripts/extract-annie-doctor.js
 */
const fs = require("fs");
const path = require("path");

const SRC_FILE = path.join(__dirname, "..", "new changes 2", "tib-hind-dr-annie-varughese-profile (1).html");
const OUT = path.join(__dirname, "..", "data", "pages");
const DOMAIN = "https://tibhind.com";
const ROUTE = "/doctors/pediatric-surgery/dr-annie-varughese/";
const ID = "doctors-pediatric-surgery-dr-annie-varughese";

function chatToLocal(p) {
  if (!p || p === "/") return "/";
  const norm = p.replace(/\/+$/, "");
  if (norm === "/hospital") return "/best-hospitals-india/";
  if (norm.startsWith("/hospital/")) return "/hospitals/" + norm.slice("/hospital/".length) + "/";
  if (norm === "/doctors/cardiology" || norm === "/doctors/cardiac-surgery") return "/best-doctors-india/";
  if (norm.endsWith(".xml") || norm.endsWith(".txt")) return p;
  return norm + "/";
}

const html = fs.readFileSync(SRC_FILE, "utf8");
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

body = body.replace(
  /<script>\s*document\.documentElement\.classList\.add\(["']js["']\);\s*<\/script>/g,
  "",
);
const headScripts = 'document.documentElement.classList.add("js");';

body = body
  .replace(/href="https:\/\/tib-hind-hospitals\.irfanhaleemsidz\.chatgpt\.site([^"]*)"/g, (_m, p) => {
    return `href="${chatToLocal(p)}"`;
  })
  .replace(/href="\/doctors\/"/g, 'href="/best-doctors-india/"');

// drop the dev-only "standalone" note banner (other doctor profiles don't carry it)
body = body.replace(/<div class="standalone-note">[\s\S]*?<\/div>/, "");

const page = {
  id: ID,
  route: ROUTE,
  canonical: DOMAIN + ROUTE,
  title,
  description,
  robots,
  styles,
  jsonLd,
  headScripts,
  body,
  source: "new changes 2/tib-hind-dr-annie-varughese-profile (1).html",
};

fs.mkdirSync(OUT, { recursive: true });
fs.writeFileSync(path.join(OUT, ID + ".json"), JSON.stringify(page, null, 2));

const regPath = path.join(__dirname, "..", "data", "registry.json");
const reg = JSON.parse(fs.readFileSync(regPath, "utf8"));
const byId = new Map(reg.map((e) => [e.id, e]));
byId.set(ID, { id: ID, route: ROUTE, title, source: page.source });
fs.writeFileSync(regPath, JSON.stringify([...byId.values()], null, 2));

console.log("Wrote " + ID + ".json -> " + ROUTE);
console.log("body bytes: " + body.length + ", styles: " + styles.length + ", jsonLd: " + jsonLd.length);