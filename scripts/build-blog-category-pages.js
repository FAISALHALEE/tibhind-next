// Build the 9 "Explore by Topic" category landing pages for the Medical
// Treatment Blog. Each category page reuses the article library design (hub
// styles) plus the full topic article (article styles), so a category click
// opens a complete, topic-specific page — never an in-place filtered grid that
// leaves a large blank area.
//
// Also rewrites data/pages/blog.json: the "Explore by Topic" category buttons
// and the topic <select> become real links to these category pages, keeping the
// article search working in place.
//
// Global chrome (header/footer/sticky/ticker) is taken unchanged from
// data/pages/home.json.

const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");
const DATA_DIR = path.join(ROOT, "data", "pages");
const PUBLIC_DIR = path.join(ROOT, "public");

const WA_URL =
  "https://wa.me/918303586344?text=Hello%20TIB%20HIND%2C%20I%20would%20like%20help%20planning%20medical%20treatment%20in%20India.";

const compact = (s) =>
  s
    .replace(/<!--\s*-->/g, "")
    .replace(/>\s+</g, ">\n<")
    .replace(/\n{3,}/g, "\n\n")
    .trim();

const escXml = (s) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

const escAttr = (s) => escXml(s).replace(/'/g, "&#39;");

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
const baseCss = blog.styles[0];
const smallCss = blog.styles[1];
const hubCss = blog.styles[2];

const artProto = JSON.parse(
  fs.readFileSync(path.join(DATA_DIR, "blog-plan-medical-treatment-india.json"), "utf8"),
);
const artCss = artProto.styles[2];

const EXTRA_CSS = [
  `.blog-layout{padding-top:54px;padding-bottom:60px}`,
  `.blog-related{padding-bottom:70px}`,
  `.blog-related .section-head{margin-bottom:28px}`,
  `.related-grid{grid-template-columns:repeat(3,minmax(0,1fr));gap:18px;display:grid}`,
  `.related-card{background:#fff;border:1px solid var(--rule);border-block-start:3px solid var(--seal);padding:20px 20px 22px;display:flex;flex-direction:column;gap:6px;text-decoration:none;transition:box-shadow .2s,transform .2s}`,
  `.related-card:hover{box-shadow:0 18px 40px -32px #12332cb3;transform:translateY(-2px)}`,
  `.related-card b{color:var(--seal);font:500 10.5px var(--data);letter-spacing:.12em;text-transform:uppercase}`,
  `.related-card h3{font:21px/1.3 var(--display);color:var(--ink);margin:2px 0 0}`,
  `.related-card a{text-decoration:none}`,
  `.related-card p{color:var(--muted);font-size:14px;line-height:1.55;margin:0}`,
  `.related-card .go{color:var(--seal);font:500 11px var(--data);letter-spacing:.1em;text-transform:uppercase;margin-top:auto;padding-top:6px}`,
  `@media(max-width:900px){.related-grid{grid-template-columns:1fr}}`,
].join("");

// ---------------------------------------------------------------------------
// 3. category definitions (match the hub filter keys + "new changes" labels)
// ---------------------------------------------------------------------------
const CATS = [
  {
    key: "planning",
    label: "Patient planning",
    eyebrow: "Patient planning",
    deck: "A complete patient planning guide for arranging medical treatment in India — reports, provider comparison, written estimates, visa and follow-up.",
    artSlug: "plan-medical-treatment-india",
    cardNumber: "01",
    artClass: "art-planning",
    cardH1: "How to Plan Medical Treatment in India",
    cardSummary: "Organise reports, compare suitable providers, understand estimates and prepare before travelling.",
    cardRead: "15 min read",
    cardDate: "Aug 25, 2026",
    subtitle: "International patient planning guide",
    banner: {
      eyebrow: "Explore by topic",
      lines: ["Patient Planning", "Medical Treatment Guides"],
    },
    related: [
      { href: "/how-it-works/", label: "How TIB HIND works", title: "How it works", desc: "How case coordination, reviews and planning responsibilities are organised." },
      { href: "/how-we-select/", label: "Provider selection", title: "How TIB HIND selects hospitals", desc: "The criteria used to assess doctors and hospitals for the directory." },
      { href: "/medical-disclaimer/", label: "Careful wording", title: "Medical disclaimer", desc: "The limits of general medical guidance and where professional advice applies." },
    ],
  },
  {
    key: "hospital",
    label: "Hospitals & doctors",
    eyebrow: "Hospitals & doctors",
    deck: "How to compare hospitals and doctors together — verifying relevant specialty experience, capability, accreditation and follow-up access.",
    artSlug: "choose-hospital-doctor-india",
    cardNumber: "02",
    artClass: "art-hospital",
    cardH1: "How to Choose a Hospital and Doctor in India",
    cardSummary: "Practical questions to ask about specialty experience, accreditation, facilities and follow-up.",
    cardRead: "12 min read",
    cardDate: "Aug 22, 2026",
    subtitle: "Provider comparison in India",
    banner: {
      eyebrow: "Explore by topic",
      lines: ["Hospitals & Doctors", "Choosing a Suitable Team"],
    },
    related: [
      { href: "/hospitals/", label: "Directory", title: "Hospital directory", desc: "NABH-, JCI- and internationally accredited hospitals across India." },
      { href: "/best-hospitals-india/", label: "Rankings", title: "Best hospitals in India", desc: "Indicative lists of leading multi-speciality and specialty hospitals." },
      { href: "/doctors/", label: "Doctors", title: "Doctor directory", desc: "Senior consultants by specialty with training and experience markers." },
    ],
  },
  {
    key: "cost",
    label: "Treatment costs",
    eyebrow: "Treatment costs",
    deck: "How to read a treatment estimate — the inclusions, exclusions and assumptions that turn a headline figure into a reliable plan.",
    artSlug: "treatment-estimate-guide",
    cardNumber: "04",
    artClass: "art-cost",
    cardH1: "What a Treatment Estimate Should Include",
    cardSummary: "Learn how to read hospital estimates and identify common items that may be excluded.",
    cardRead: "9 min read",
    cardDate: "Aug 14, 2026",
    subtitle: "Estimates and quotation guidance",
    banner: {
      eyebrow: "Explore by topic",
      lines: ["Treatment Costs", "Reading Estimates Correctly"],
    },
    related: [
      { href: "/cost/", label: "Cost guides", title: "Treatment costs in India", desc: "Indicative ranges and what is usually included for each treatment." },
      { href: "/cost/what-is-included/", label: "Inclusions", title: "What is included in a treatment estimate", desc: "The standard components and exclusions you should confirm in writing." },
      { href: "/cost/heart-surgery/", label: "Cardiac costs", title: "Heart surgery cost in India", desc: "Indicative figures and package assumptions for cardiac procedures." },
    ],
  },
  {
    key: "visa",
    label: "Medical visa & travel",
    eyebrow: "Medical visa & travel",
    deck: "The medical visa application in plain steps — the correct route, required documents, the hospital letter, attendants and pre-departure checks.",
    artSlug: "medical-visa-india-guide",
    cardNumber: "03",
    artClass: "art-visa",
    cardH1: "Medical Visa for India: A Patient Planning Guide",
    cardSummary: "Understand the documents, hospital letter, attendant route and important application checks.",
    cardRead: "11 min read",
    cardDate: "Aug 18, 2026",
    subtitle: "Visa and travel planning",
    banner: {
      eyebrow: "Explore by topic",
      lines: ["Medical Visa & Travel", "Enter India for Treatment"],
    },
    related: [
      { href: "/medical-visa/", label: "Visa hub", title: "Medical visa for India", desc: "Visa overview and links to the official application resources." },
      { href: "/medical-visa/ghana/", label: "Ghana", title: "Medical visa from Ghana", desc: "Country-specific application guidance for Ghanaian patients." },
      { href: "/medical-visa/ethiopia/", label: "Ethiopia", title: "Medical visa from Ethiopia", desc: "Country-specific application guidance for Ethiopian patients." },
    ],
  },
  {
    key: "heart",
    label: "Heart health",
    eyebrow: "Heart health",
    deck: "Preparing a cardiac case properly — the ECG, echo, stress test and angiogram records a specialist needs before a review in India.",
    artSlug: "cardiac-review-preparation",
    cardNumber: "05",
    artClass: "art-heart",
    cardH1: "Preparing for a Cardiac Specialist Review",
    cardSummary: "Which reports, imaging and medication details help a cardiac team understand a case.",
    cardRead: "8 min read",
    cardDate: "Aug 10, 2026",
    subtitle: "Cardiac care preparation",
    banner: {
      eyebrow: "Explore by topic",
      lines: ["Heart Health", "Preparing for a Cardiac Review"],
    },
    related: [
      { href: "/treatments/heart/", label: "Treatments", title: "Heart treatments in India", desc: "Cardiac surgery and cardiology pathways with hospital options." },
      { href: "/conditions/coronary-artery-disease/", label: "Condition", title: "Coronary artery disease", desc: "Symptoms, diagnosis and treatment discussions for CAD." },
      { href: "/conditions/aortic-valve-stenosis/", label: "Condition", title: "Aortic valve stenosis", desc: "What valve disease means and the treatment options considered." },
    ],
  },
  {
    key: "cancer",
    label: "Cancer care",
    eyebrow: "Cancer care",
    deck: "A structured question checklist for cancer treatment abroad — diagnosis, staging, pathology review, intent, side effects and cross-border follow-up.",
    artSlug: "cancer-treatment-questions",
    cardNumber: "06",
    artClass: "art-cancer",
    cardH1: "Questions to Ask Before Cancer Treatment Abroad",
    cardSummary: "A structured checklist covering diagnosis, staging, treatment intent, side effects and follow-up.",
    cardRead: "13 min read",
    cardDate: "Aug 06, 2026",
    subtitle: "Oncology planning",
    banner: {
      eyebrow: "Explore by topic",
      lines: ["Cancer Care", "Questions Before Treatment"],
    },
    related: [
      { href: "/treatments/cancer/", label: "Treatments", title: "Cancer treatment in India", desc: "Oncology pathways, technologies and hospital options." },
      { href: "/conditions/breast-cancer/", label: "Condition", title: "Breast cancer", desc: "Diagnosis, staging and treatment planning for breast cancer." },
      { href: "/conditions/lung-cancer/", label: "Condition", title: "Lung cancer", desc: "Types, tests and treatment approaches for lung cancer." },
    ],
  },
  {
    key: "ortho",
    label: "Orthopaedics",
    eyebrow: "Orthopaedics",
    deck: "Planning a joint replacement in India — implants, surgeon experience, stay, rehabilitation and the return journey together.",
    artSlug: "joint-replacement-recovery",
    cardNumber: "07",
    artClass: "art-ortho",
    cardH1: "Planning Joint Replacement and Recovery",
    cardSummary: "Key considerations around implants, rehabilitation, length of stay and fitness to fly.",
    cardRead: "10 min read",
    cardDate: "Aug 02, 2026",
    subtitle: "Orthopaedic care planning",
    banner: {
      eyebrow: "Explore by topic",
      lines: ["Orthopaedics", "Joint Replacement & Recovery"],
    },
    related: [
      { href: "/treatments/orthopaedics/", label: "Treatments", title: "Orthopaedics in India", desc: "Joint, spine and sports medicine pathways and hospital options." },
      { href: "/conditions/knee-osteoarthritis/", label: "Condition", title: "Knee osteoarthritis", desc: "Understanding knee arthritis and when replacement is considered." },
      { href: "/cost/joint-replacement/", label: "Costs", title: "Joint replacement cost in India", desc: "Indicative knee and hip replacement figures and assumptions." },
    ],
  },
  {
    key: "wellness",
    label: "Wellness",
    eyebrow: "Wellness",
    deck: "Recovery basics that support healing after treatment abroad — sleep, nutrition, gradual activity and when to ask for help.",
    artSlug: "recovery-sleep-nutrition",
    cardNumber: "08",
    artClass: "art-wellness",
    cardH1: "Supporting Recovery With Sleep and Nutrition",
    cardSummary: "General wellbeing principles that may support recovery alongside instructions from the treating team.",
    cardRead: "7 min read",
    cardDate: "Jul 28, 2026",
    subtitle: "Recovery and wellbeing",
    banner: {
      eyebrow: "Explore by topic",
      lines: ["Wellness", "Recovery, Sleep & Nutrition"],
    },
    related: [
      { href: "/treatments/rehabilitation/", label: "Rehabilitation", title: "Rehabilitation treatment", desc: "Physiotherapy and recovery programmes after treatment in India." },
      { href: "/patient-stories/", label: "Stories", title: "Patient stories", desc: "First-hand accounts of planning and recovering around treatment." },
      { href: "/how-it-works/", label: "Process", title: "How it works", desc: "Follow-up and discharge coordination across borders." },
    ],
  },
  {
    key: "safety",
    label: "Patient safety",
    eyebrow: "Patient safety",
    deck: "Recognising red flags in medical travel claims — guarantees, pressure to pay and unclear paperwork — and the checks that protect patients.",
    artSlug: "medical-travel-red-flags",
    cardNumber: "09",
    artClass: "art-safety",
    cardH1: "Red Flags in Medical Travel Claims",
    cardSummary: "How to recognise guaranteed outcomes, unclear quotations and other claims that require caution.",
    cardRead: "9 min read",
    cardDate: "Jul 24, 2026",
    subtitle: "Medical travel safety",
    banner: {
      eyebrow: "Explore by topic",
      lines: ["Patient Safety", "Red Flags in Medical Travel"],
    },
    related: [
      { href: "/medical-disclaimer/", label: "Responsibility", title: "Medical disclaimer", desc: "Where responsibility lies and what general information cannot promise." },
      { href: "/how-we-are-paid/", label: "Transparency", title: "How TIB HIND is paid", desc: "How coordination is funded and what that means for recommendations." },
      { href: "/privacy/", label: "Data", title: "Privacy policy", desc: "How medical and personal information is handled." },
    ],
  },
];

// ---------------------------------------------------------------------------
// 4. banner SVG (mirrors scripts/build-blog-articles.js)
// ---------------------------------------------------------------------------
function bannerSvg(eyebrow, lines) {
  const w = 851;
  const h = 315;
  const maxChars = Math.max(...lines.map((l) => l.length));
  const titleSize = Math.min(46, Math.max(30, Math.floor(690 / (maxChars * 0.5))));
  const lineH = titleSize * 1.14;
  const title = lines
    .map(
      (l, i) =>
        `<text x="54" y="${Math.round(130 + i * lineH)}" font-family="Georgia,'Times New Roman',serif" font-size="${titleSize}" fill="#f6f3ea">${escXml(l)}</text>`,
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
    `<text x="54" y="66" font-family="'Courier New',monospace" font-size="14" letter-spacing="4" fill="#c89a52">${escXml(eyebrow.toUpperCase())}</text>` +
    title +
    '<rect x="54" y="272" width="118" height="2" fill="#96692a"/>' +
    `<text x="54" y="296" font-family="'Courier New',monospace" font-size="12" letter-spacing="3" fill="#8fb3a6">TIB HIND &middot; MEDICAL TREATMENT BLOG</text>` +
    "</svg>"
  );
}

// ---------------------------------------------------------------------------
// 5. hub chrome helpers (article extraction + category nav markup)
// ---------------------------------------------------------------------------
function extractArticleLayout(artPage) {
  const startTag = '<div class="wrap blog-layout">';
  const i = artPage.body.indexOf(startTag);
  if (i === -1) throw new Error("blog-layout block not found in article page");
  const open = i + startTag.length;
  const artEnd = artPage.body.indexOf("</article>", open);
  if (artEnd === -1) throw new Error("</article> not found in article page");
  const close = artPage.body.indexOf("</div>", artEnd);
  if (close === -1) throw new Error("closing </div> not found in article page");
  return artPage.body.slice(i, close + "</div>".length);
}

const CAT_LINKS = CATS.map(
  (c) =>
    `<a class="cat-btn" href="/blog/category/${c.key}/">${c.label}</a>`,
).join("");

function topicNav(activeKey) {
  const links = [`<a class="cat-btn${activeKey === "" ? " active" : ""}" href="/blog/">All articles</a>`];
  for (const c of CATS) {
    links.push(
      `<a class="cat-btn${c.key === activeKey ? " active" : ""}"${c.key === activeKey ? ' aria-current="page"' : ""} href="/blog/category/${c.key}/">${c.label}</a>`,
    );
  }
  return `<nav class="topic-nav" aria-label="Blog topics">${links.join("")}</nav>`;
}

function topicSelect(activeRoute) {
  const opt = (label, href) =>
    `<option value="${href}"${href === activeRoute ? " selected" : ""}>${label}</option>`;
  return (
    `<div class="topic-select-wrap"><label for="topicSelect">Choose a topic</label>` +
    `<select id="topicSelect">${opt("All articles", "/blog/")}${CATS.map((c) =>
      opt(c.label, `/blog/category/${c.key}/`),
    ).join("")}</select></div>` +
    `<script>(function(){var s=document.getElementById('topicSelect');if(s){s.addEventListener('change',function(){if(s.value&&s.value!==location.pathname)location.href=s.value})}})();</script>`
  );
}

function cardHtml(c) {
  return (
    `<article class="article-card"><a href="/blog/${c.artSlug}/">` +
    `<div class="article-art ${c.artClass}"><span>${c.cardNumber}</span><svg viewBox="0 0 100 100" aria-hidden="true"><path d="M50 16v68M16 50h68"/><circle cx="50" cy="50" r="34"/></svg></div>` +
    `<div class="article-copy"><span class="card-cat">${c.label}</span><h3>${c.cardH1}</h3>` +
    `<p class="card-summary">${c.cardSummary}</p>` +
    `<div class="card-meta"><span>${c.cardRead}</span><span>${c.cardDate}</span></div></div>` +
    `</a></article>`
  );
}

function relatedHtml(c) {
  return c.related
    .map(
      (r) =>
        `<a class="related-card" href="${r.href}"><b>${r.label}</b><h3>${r.title}</h3><p>${r.desc}</p><span class="go">Open page</span></a>`,
    )
    .join("");
}

function buildCategoryMain(c) {
  const bannerImg = `/blog/banner-${c.artSlug}.svg`;
  const art = JSON.parse(
    fs.readFileSync(path.join(DATA_DIR, `blog-${c.artSlug}.json`), "utf8"),
  );
  const layoutBlock = extractArticleLayout(art).replace(
    "<div class=\"wrap blog-layout\">",
    '<div class="wrap blog-layout" id="guide">',
  );
  return (
    '<main class="blog-main">' +
    '<section class="blog-banner-section" aria-label="Medical treatment blog topic banner"><div class="wrap">' +
    `<div class="blog-breadcrumbs"><a href="/">Home</a> / <a href="/blog/">Medical Treatment Blogs</a> / Explore by Topic / ${c.label}</div>` +
    `<div class="blog-banner-shell"><img class="blog-banner" src="${bannerImg}" alt="${escXml(c.label)} — TIB HIND patient guide" width="851" height="315"></div>` +
    "</div></section><div class=\"blog-banner-separator\" aria-hidden=\"true\"></div>" +
    '<section class="blog-mast"><div class="wrap"><div class="blog-heading">' +
    `<span class="eyebrow">Explore by Topic · ${c.eyebrow}</span>` +
    `<h1>${c.label}</h1><p class="blog-deck">${c.deck}</p>` +
    `<div class="blog-meta"><span>${c.subtitle}</span><span>1 patient guide in this topic</span></div>` +
    `<div class="blog-actions"><a class="btn solid" href="#guide">Read the guide</a><a class="btn line" href="${WA_URL}">Discuss your case on WhatsApp</a></div>` +
    "</div></div></section>" +
    '<section class="hub-section tone" id="library"><div class="wrap">' +
    '<div class="section-head"><div><span class="eyebrow">Explore by Topic</span><h2>Articles in this topic</h2></div></div>' +
    '<div class="browse-layout">' +
    `<aside class="topic-sidebar" aria-label="Explore articles by topic"><span class="card-cat">Article categories</span><h3>Explore by Topic</h3><p>Choose a topic to open its guides.</p>` +
    topicNav(c.key) +
    topicSelect(`/blog/category/${c.key}/`) +
    "</aside>" +
    `<div class="article-results"><div class="articles-grid">${cardHtml(c)}</div></div>` +
    "</div></div></section>" +
    layoutBlock +
    '<section class="blog-related"><div class="wrap"><div class="section-head"><div><span class="eyebrow">Go deeper</span><h2>More resources on this topic</h2></div></div>' +
    `<div class="related-grid">${relatedHtml(c)}</div>` +
    "</div></section>" +
    '<section class="blog-cta" id="plan"><div class="wrap blog-cta__in"><div><h2>Get help planning treatment in India</h2><p>Share your available reports for organised review and guidance on suitable next steps. Medical decisions remain with qualified doctors and hospitals — no outcome can be guaranteed.</p></div>' +
    `<a class="btn blog-arrow-btn" href="${WA_URL}"><span>WhatsApp +91 83035 86344</span></a></div></section>` +
    "</main>"
  );
}

// ---------------------------------------------------------------------------
// 6. page assembly + checks
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
      { "@type": "ListItem", position: 3, name: label, item: `https://tibhind.com${route}` },
    ],
  });
}

function collectionLd(c) {
  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: `${c.label} — Medical Treatment Blog`,
    url: `https://tibhind.com/blog/category/${c.key}/`,
    description: c.deck,
    inLanguage: "en",
    isPartOf: { "@type": "Blog", name: "Medical Treatment Blogs", url: "https://tibhind.com/blog/" },
    hasPart: [
      {
        "@type": "Article",
        headline: c.cardH1,
        url: `https://tibhind.com/blog/${c.artSlug}/`,
      },
    ],
  });
}

function assertBody(body) {
  if (body.includes("tib-hind-hospitals.irfanhaleemsidz.chatgpt.site"))
    throw new Error("preview-domain links leaked into the body");
  const headers = (body.match(/<header/g) || []).length;
  const footers = (body.match(/<footer/g) || []).length;
  if (headers !== 1) throw new Error(`expected 1 <header>, got ${headers}`);
  if (footers !== 1) throw new Error(`expected 1 <footer>, got ${footers}`);
}

// ---------------------------------------------------------------------------
// 7. build category pages
// ---------------------------------------------------------------------------
const BLOG_DIR = path.join(PUBLIC_DIR, "blog");
fs.mkdirSync(BLOG_DIR, { recursive: true });

const built = [];
for (const c of CATS) {
  const bannerPath = path.join(BLOG_DIR, `banner-${c.key}.svg`);
  fs.writeFileSync(bannerPath, bannerSvg(c.banner.eyebrow, c.banner.lines));

  const body =
    ticker +
    "\n" +
    globalHeader +
    "\n" +
    compact(buildCategoryMain(c)) +
    "\n" +
    globalFooter +
    "\n" +
    globalSticky;
  assertBody(body);

  const page = {
    id: `blog-category-${c.key}`,
    route: `/blog/category/${c.key}/`,
    canonical: `https://tibhind.com/blog/category/${c.key}/`,
    title: `${c.label} · Medical Treatment Blog | TIB HIND`,
    description: c.deck,
    robots: null,
    styles: [baseCss, smallCss, hubCss, artCss, EXTRA_CSS],
    jsonLd: [breadcrumb(c.label, `/blog/category/${c.key}/`), collectionLd(c)],
    headScripts: "",
    body,
    source: "scripts/build-blog-category-pages.js",
  };
  fs.writeFileSync(
    path.join(DATA_DIR, `blog-category-${c.key}.json`),
    JSON.stringify(page, null, 2) + "\n",
  );
  built.push({ key: c.key, page, bannerBytes: Buffer.byteLength(bannerSvg(c.banner.eyebrow, c.banner.lines)) });
}

// ---------------------------------------------------------------------------
// 8. rewrite hub blog.json: Explore by Topic -> real links
// ---------------------------------------------------------------------------
let hubBody = blog.body;

const navRe = /<nav class="topic-nav"[^>]*>[\s\S]*?<\/nav>/;
const activeNav = topicNav("").replace(/ aria-current="page"/, "");
if (!navRe.test(hubBody)) throw new Error("topic-nav not found in hub body");
hubBody = hubBody.replace(navRe, activeNav);

const selectRe = /<select id="topicSelect">[\s\S]*?<\/select>/;
if (!selectRe.test(hubBody)) throw new Error("topicSelect not found in hub body");
hubBody = hubBody.replace(selectRe, `<select id="topicSelect">${(function(){
  let o='<option value="/blog/">All articles</option>';
  o += CATS.map((c)=>`<option value="/blog/category/${c.key}/">${c.label}</option>`).join("");
  return o;
})()}</select>`);

const scriptRe = /<script>\(function\(\)\{.*?carousel[\s\S]*?apply\(\)\}\)\(\);<\/script>/;
const NEW_SCRIPT = `
<script>(function(){
  var carousel=document.getElementById('blogCarousel'),track=carousel.querySelector('.hub-carousel-track'),slides=[].slice.call(carousel.querySelectorAll('.hub-slide')),dots=[].slice.call(document.querySelectorAll('.carousel-dot')),prev=carousel.querySelector('.prev'),next=carousel.querySelector('.next');
  var slide=0,timer;
  function showSlide(index){slide=(index+slides.length)%slides.length;track.style.transform='translateX(-'+(slide*100)+'%)';dots.forEach(function(dot,i){dot.classList.toggle('active',i===slide)});slides.forEach(function(item,i){item.setAttribute('aria-hidden',i===slide?'false':'true')})}
  function startCarousel(){clearInterval(timer);timer=setInterval(function(){showSlide(slide+1)},6000)}
  prev.addEventListener('click',function(){showSlide(slide-1);startCarousel()});
  next.addEventListener('click',function(){showSlide(slide+1);startCarousel()});
  dots.forEach(function(dot,i){dot.addEventListener('click',function(){showSlide(i);startCarousel()})});
  carousel.addEventListener('mouseenter',function(){clearInterval(timer)});
  carousel.addEventListener('mouseleave',startCarousel);
  carousel.addEventListener('focusin',function(){clearInterval(timer)});
  carousel.addEventListener('focusout',startCarousel);
  showSlide(0);startCarousel();
  var cards=[].slice.call(document.querySelectorAll('.article-card')),input=document.getElementById('articleSearch'),count=document.getElementById('resultCount'),empty=document.getElementById('emptyState'),clear=document.getElementById('clearFilters'),select=document.getElementById('topicSelect');
  function apply(){var q=input.value.trim().toLowerCase(),shown=0;cards.forEach(function(card){var hay=card.dataset.search.toLowerCase(),ok=!q||hay.indexOf(q)!==-1;card.hidden=!ok;if(ok)shown++});if(count)count.textContent='Showing '+shown+(shown===1?' article':' articles');if(empty)empty.style.display=shown?'none':'block';if(clear)clear.hidden=!q}
  var form=document.getElementById('hubSearch');if(form)form.addEventListener('submit',function(e){e.preventDefault();apply();var el=document.getElementById('latest');if(el)el.scrollIntoView({behavior:'smooth'})});
  if(input)input.addEventListener('input',apply);
  if(clear)clear.addEventListener('click',function(){input.value='';apply()});
  if(select)select.addEventListener('change',function(){if(select.value)location.href=select.value});
  apply();
})();</script>`;
if (!scriptRe.test(hubBody)) throw new Error("hub script block not found");
hubBody = hubBody.replace(scriptRe, NEW_SCRIPT);

const hub = { ...blog, body: compact(hubBody) };
const hubScripts = (hub.body.match(/<script>/g) || []).length;
if (hubScripts !== 1) throw new Error(`expected 1 script in rewritten hub body, got ${hubScripts}`);
if ((hub.body.match(/<button class="cat-btn/g) || []).length !== 0)
  throw new Error("hub still contains button.cat-btn filters");
assertBody(hub.body);
fs.writeFileSync(path.join(DATA_DIR, "blog.json"), JSON.stringify(hub, null, 2) + "\n");

// ---------------------------------------------------------------------------
// 9. route sanity (all internal hrefs resolve)
// ---------------------------------------------------------------------------
const routes = new Set(
  fs
    .readdirSync(DATA_DIR)
    .filter((f) => f.endsWith(".json"))
    .map((f) => JSON.parse(fs.readFileSync(path.join(DATA_DIR, f), "utf8")).route),
);
const missing = new Set();
for (const p of [hub, ...built.map((b) => b.page)]) {
  for (const m of p.body.matchAll(/href="(\/[^"]*)"/g)) {
    const href = m[1].replace(/#.*$/, "");
    if (href && href !== "/sitemap.xml" && !routes.has(href)) missing.add(href);
  }
}

// ---------------------------------------------------------------------------
// 10. summary
// ---------------------------------------------------------------------------
for (const { key, page, bannerBytes } of built) {
  console.log(
    `${key} -> ${page.route} | styles ${page.styles.length} | jsonLd ${page.jsonLd.length} | body ${page.body.length} | banner ${bannerBytes}B`,
  );
  if (!page.body.includes(`/blog/category/${key}/index`)) {
    const n = (page.body.match(/cat-btn active/g) || []).length;
    console.log(`  active nav entries: ${n}`);
  }
}
console.log("hub blog.json rewritten (cat-btn links + select nav + script)");
console.log("missing internal hrefs (excl sitemap):", missing.size ? [...missing].join(", ") : "none");
console.log("category pages built:", built.length);