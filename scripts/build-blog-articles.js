// Build the 9 blog article pages referenced by the blog hub cards.
//
// Sources:
//  - chrome (ticker, header, footer, sticky) from data/pages/home.json (never
//    the imported preview-site header/footer)
//  - base styles from data/pages/blog.json (styles[0], styles[1])
//  - article design CSS from the pre-takeover blog backup (old blog.json
//    styles[2], minus its old top-level chrome groups)
//  - article #1 content from the same backup; articles #2-9 authored in
//    scripts/blog-articles-data.js
//  - banner SVGs generated fresh into public/blog/banner-<slug>.svg
//
// Writes data/pages/blog-<slug>.json with route /blog/<slug>/.

const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");
const DATA_DIR = path.join(ROOT, "data", "pages");
const PUBLIC_DIR = path.join(ROOT, "public");
const BACKUP_DIR = "C:/Users/IRFAN/AppData/Local/Temp/opencode/backup-blog-contact";
const { ARTICLES, WA_URL, ctaHtml } = require("./blog-articles-data.js");

const compact = (s) =>
  s
    .replace(/<!--\s*-->/g, "")
    .replace(/>\s+</g, ">\n<")
    .replace(/\n{3,}/g, "\n\n")
    .trim();

const escXml = (s) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];
const fmtDate = (iso) => {
  const [y, m, d] = iso.split("-").map(Number);
  return `${d} ${MONTHS[m - 1]} ${y}`;
};

// ---------------------------------------------------------------------------
// 1. global chrome from home.json
// ---------------------------------------------------------------------------
const home = JSON.parse(fs.readFileSync(path.join(DATA_DIR, "home.json"), "utf8"));
const homeBody = home.body;

const gHStart = homeBody.indexOf('<header class="top">');
const gHEnd = homeBody.indexOf("</header>") + "</header>".length;
if (gHStart === -1 || gHEnd === -1) throw new Error("global header not found in home.json");
const globalHeader = homeBody.slice(gHStart, gHEnd).trim();
if (globalHeader.length !== 14796)
  throw new Error(`unexpected global header length ${globalHeader.length}`);

const gFStart = homeBody.indexOf("<footer");
const gSStart = homeBody.indexOf('<nav class="sticky"');
if (gFStart === -1 || gSStart === -1) throw new Error("footer/sticky not found in home.json");
const globalFooter = homeBody.slice(gFStart, gSStart).trim();
const globalSticky = homeBody.slice(gSStart).trim();
if (!globalFooter.endsWith("</footer>"))
  throw new Error("footer slice does not end with </footer>");
const ticker = compact(homeBody.slice(0, gHStart));
if (!ticker.startsWith('<div class="ticker"'))
  throw new Error("ticker not found at start of home body");

// ---------------------------------------------------------------------------
// 2. styles
// ---------------------------------------------------------------------------
const blog = JSON.parse(fs.readFileSync(path.join(DATA_DIR, "blog.json"), "utf8"));
if (blog.styles.length !== 3 || blog.styles[0].length !== 147590 || blog.styles[1].length !== 253)
  throw new Error(`unexpected current blog styles ${blog.styles.map((s) => s.length).join(",")}`);
const baseCss = blog.styles[0];
const smallCss = blog.styles[1];

const backup = JSON.parse(fs.readFileSync(path.join(BACKUP_DIR, "blog.json"), "utf8"));
const oldArticleCss = backup.styles[2];
const blogMainIdx = oldArticleCss.indexOf(".blog-main");
if (blogMainIdx === -1) throw new Error(".blog-main not found in backup article css");
const articleCss = oldArticleCss.slice(blogMainIdx).trim();
if (oldArticleCss.slice(0, blogMainIdx).includes("@media"))
  throw new Error("old chrome group unexpectedly contains @media — review strip boundary");

// ---------------------------------------------------------------------------
// 3. article #1 content (reuse from backup, faithful to original)
// ---------------------------------------------------------------------------
const oldBody = backup.body;
const mStart = oldBody.indexOf("<main");
const mEnd = oldBody.indexOf("</main>");
if (mStart === -1 || mEnd === -1) throw new Error("old article main not found in backup");
let main1 = oldBody.slice(mStart, mEnd + "</main>".length);
main1 = main1.replace(
  'src="/blog/banner.svg"',
  'src="/blog/banner-plan-medical-treatment-india.svg"',
);
if (!main1.includes("banner-plan-medical-treatment-india.svg"))
  throw new Error("banner swap failed for article 1");
main1 = main1.replace("Published 25 August 2026", "Updated 25 August 2026");

// ---------------------------------------------------------------------------
// 4. banner SVG generator (lightweight, no raster assets)
// ---------------------------------------------------------------------------
function bannerSvg(eyebrow, lines) {
  const w = 851;
  const h = 315;
  const maxChars = Math.max(...lines.map((l) => l.length));
  const titleSize = Math.min(46, Math.max(30, Math.floor(690 / (maxChars * 0.5))));
  const lineH = titleSize * 1.14;
  const titleY = 130;
  const title = lines
    .map(
      (l, i) =>
        `<text x="54" y="${Math.round(titleY + i * lineH)}" font-family="Georgia,'Times New Roman',serif" font-size="${titleSize}" fill="#f6f3ea">${escXml(l)}</text>`,
    )
    .join("");
  return (
    `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" role="img" aria-label="${escXml(lines.join(" ") + " — TIB HIND patient guide")}">` +
    "<defs>" +
    '<linearGradient id="bg" x1="0" y1="0" x2="0.9" y2="1">' +
    '<stop offset="0" stop-color="#12332c"/><stop offset="1" stop-color="#0d2923"/>' +
    "</linearGradient>" +
    '<radialGradient id="glow" cx="0.72" cy="0.16" r="0.7">' +
    '<stop offset="0" stop-color="#f4efe4" stop-opacity="0.10"/>' +
    '<stop offset="1" stop-color="#f4efe4" stop-opacity="0"/>' +
    "</radialGradient>" +
    "</defs>" +
    '<rect width="100%" height="100%" fill="url(#bg)"/>' +
    '<rect width="6" height="100%" fill="#96692a"/>' +
    '<rect width="100%" height="100%" fill="url(#glow)"/>' +
    '<circle cx="706" cy="248" r="86" fill="none" stroke="#c89a52" stroke-opacity="0.28" stroke-width="1.5"/>' +
    '<circle cx="806" cy="66" r="34" fill="none" stroke="#c89a52" stroke-opacity="0.22" stroke-width="1.5"/>' +
    '<text x="54" y="66" font-family="\'Courier New\',monospace" font-size="14" letter-spacing="4" fill="#c89a52">' +
    escXml(eyebrow.toUpperCase()) +
    "</text>" +
    title +
    '<rect x="54" y="272" width="118" height="2" fill="#96692a"/>' +
    '<text x="54" y="296" font-family="\'Courier New\',monospace" font-size="12" letter-spacing="3" fill="#8fb3a6">' +
    "TIB HIND &middot; MEDICAL TREATMENT BLOG" +
    "</text>" +
    "</svg>"
  );
}

// ---------------------------------------------------------------------------
// 5. article page builders
// ---------------------------------------------------------------------------
function breadcrumb(label, route) {
  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://tibhind.com/" },
      {
        "@type": "ListItem",
        position: 2,
        name: "Medical Treatment Blogs",
        item: "https://tibhind.com/blog/",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: label,
        item: `https://tibhind.com${route}`,
      },
    ],
  });
}

function articleLd(a) {
  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Article",
    headline: a.h1,
    description: a.deck,
    datePublished: a.date,
    dateModified: a.date,
    inLanguage: "en",
    author: { "@type": "Organization", name: "TIB HIND Editorial Team" },
    publisher: { "@type": "Organization", name: "TIB HIND", url: "https://tibhind.com/" },
    mainEntityOfPage: `https://tibhind.com/blog/${a.slug}/`,
    image: `https://tibhind.com/blog/banner-${a.slug}.svg`,
  });
}

function authoredMain(a) {
  const toc = a.toc.map((t) => `<a href="#${t.id}">${t.label}</a>`).join("");
  const meta = `<div class="blog-meta"><span>Updated ${fmtDate(a.date)}</span><span>${a.read}-minute read</span><span>${a.category}</span></div>`;
  const actions = `<div class="blog-actions"><a class="btn solid" href="#${a.toc[0].id}">See the guide</a><a class="btn line" href="${WA_URL}">Discuss your case on WhatsApp</a></div>`;
  return (
    '<main class="blog-main">' +
    '<section class="blog-banner-section" aria-label="Patient planning guide banner"><div class="wrap">' +
    `<div class="blog-breadcrumbs"><a href="/">Home</a> / <a href="/blog/">Medical Treatment Blogs</a> / ${a.category}</div>` +
    `<div class="blog-banner-shell"><img class="blog-banner" src="/blog/banner-${a.slug}.svg" alt="${escXml(a.h1)} — TIB HIND patient guide" width="851" height="315"></div>` +
    "</div></section><div class=\"blog-banner-separator\" aria-hidden=\"true\"></div>" +
    '<section class="blog-mast"><div class="wrap"><div class="blog-heading">' +
    `<span class="eyebrow">${a.eyebrow}</span><h1>${a.h1}</h1><p class="blog-deck">${a.deck}</p>` +
    meta +
    actions +
    "</div></div></section><div class=\"wrap blog-layout\">" +
    `<aside class="blog-toc" aria-label="Article contents"><strong>In this guide</strong>${toc}</aside>` +
    `<article class="blog-article" id="article">${a.body}</article>` +
    "</div>" +
    `<section class="blog-cta" id="plan"><div class="wrap blog-cta__in"><div><h2>Get help planning treatment in India</h2><p>Share your available reports for organised review and guidance on suitable next steps. Medical decisions remain with qualified doctors and hospitals — no outcome can be guaranteed.</p></div>` +
    `<a class="btn blog-arrow-btn" href="${WA_URL}"><span>WhatsApp +91 83035 86344</span></a></div></section>` +
    "</main>"
  );
}

function assertBody(body) {
  if (body.includes("tib-hind-hospitals.irfanhaleemsidz.chatgpt.site"))
    throw new Error("preview-domain links leaked into the body");
  const headers = (body.match(/<header/g) || []).length;
  const footers = (body.match(/<footer/g) || []).length;
  if (headers !== 1) throw new Error(`expected 1 <header>, got ${headers}`);
  if (footers !== 1) throw new Error(`expected 1 <footer>, got ${footers}`);
}

function writePage(a, main, extraHome) {
  const body =
    ticker +
    "\n" +
    globalHeader +
    "\n" +
    compact(main) +
    "\n" +
    (extraHome || "") +
    "\n" +
    globalFooter +
    "\n" +
    globalSticky;
  assertBody(body);
  const deck = a.deck;
  const page = {
    id: `blog-${a.slug}`,
    route: `/blog/${a.slug}/`,
    canonical: `https://tibhind.com/blog/${a.slug}/`,
    title: `${a.h1} | TIB HIND`,
    description: deck,
    robots: null,
    styles: [baseCss, smallCss, articleCss],
    jsonLd: [breadcrumb(a.h1, `/blog/${a.slug}/`), articleLd(a)],
    headScripts: "",
    body,
    source: a.slug === "plan-medical-treatment-india" ? "backup old blog.json (article)" : "scripts/blog-articles-data.js",
  };
  fs.writeFileSync(
    path.join(DATA_DIR, `blog-${a.slug}.json`),
    JSON.stringify(page, null, 2) + "\n",
  );
  return page;
}

// ---------------------------------------------------------------------------
// 6. article definitions (9, matching the hub cards)
// ---------------------------------------------------------------------------
const articleOne = {
  slug: "plan-medical-treatment-india",
  h1: "How to Plan Medical Treatment in India",
  deck: "A clear, step-by-step guide to preparing your reports, comparing doctors and hospitals, understanding written estimates, arranging the correct visa, and planning safe follow-up before you book a flight.",
  date: "2026-08-25",
  banner: { eyebrow: "International patient planning", lines: ["How to Plan Medical", "Treatment in India"] },
};

const DEFS = ARTICLES.map((a) => ({
  slug: a.slug,
  h1: a.h1,
  deck: a.deck,
  date: a.date,
  eyebrow: a.eyebrow,
  banner: a.banner,
  read: a.read,
  category: a.category,
}));
DEFS.unshift({
  slug: articleOne.slug,
  h1: articleOne.h1,
  deck: articleOne.deck,
  date: articleOne.date,
  eyebrow: articleOne.banner.eyebrow,
  banner: articleOne.banner,
  read: 15,
  category: "Patient planning guide",
});

// ---------------------------------------------------------------------------
// 7. generate banners + write pages
// ---------------------------------------------------------------------------
const BANNER_DIR = path.join(PUBLIC_DIR, "blog");
fs.mkdirSync(BANNER_DIR, { recursive: true });

const built = [];
for (const a of DEFS) {
  const svg = bannerSvg(a.banner.eyebrow, a.banner.lines);
  const bannerPath = path.join(BANNER_DIR, `banner-${a.slug}.svg`);
  fs.writeFileSync(bannerPath, svg);

  let main;
  let extraHome = null;
  if (a.slug === "plan-medical-treatment-india") {
    main = main1;
  } else {
    const data = ARTICLES.find((x) => x.slug === a.slug);
    main = authoredMain({ ...data, WA_URL, ctaHtml });
  }
  const page = writePage(a, main, extraHome);
  built.push({ slug: a.slug, page, banner: svg.length });
}

// ---------------------------------------------------------------------------
// 8. internal link sanity (against the full route set)
// ---------------------------------------------------------------------------
const routes = new Set(
  fs
    .readdirSync(DATA_DIR)
    .filter((f) => f.endsWith(".json"))
    .map((f) => JSON.parse(fs.readFileSync(path.join(DATA_DIR, f), "utf8")).route),
);
const missing = new Set();
for (const { page } of built) {
  for (const m of page.body.matchAll(/href="(\/[^"]*)"/g)) {
    const href = m[1].replace(/#.*$/, "");
    if (href && !routes.has(href)) missing.add(href);
  }
}

// ---------------------------------------------------------------------------
// 9. summary
// ---------------------------------------------------------------------------
for (const { slug, page, banner } of built) {
  console.log(`${slug}`);
  console.log(`  route ${page.route} | styles ${page.styles.length} | jsonLd ${page.jsonLd.length} | body ${page.body.length} | banner ${banner}B`);
}
console.log("banners written to public/blog/banner-<slug>.svg");
console.log("missing internal hrefs:", missing.size ? [...missing].join(", ") : "none");
console.log("articles built:", built.length);