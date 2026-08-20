const { SHELL_START, SHELL_END, SHELL_TAIL, home } = require("./shell");

const HEAD_SCRIPT = 'document.documentElement.classList.add("js");';
const DOMAIN = "https://tibhind.com";

const ICONS = {
  arrow: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3v18"/><path d="M16.5 7.2c-.9-1-2.4-1.7-4.5-1.7-2.5 0-4 1.2-4 3s1.4 2.6 4 3.2c2.6.6 4.2 1.4 4.2 3.3 0 1.9-1.7 3-4.2 3-2.2 0-3.8-.8-4.7-1.9"/></svg>',
  doc: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 3h7l4 4v14H7z"/><path d="M14 3v4h4"/><path d="M10 12h5M10 16h5"/></svg>',
  pin: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 21s-7-5.5-7-11a7 7 0 0 1 14 0c0 5.5-7 11-7 11z"/><circle cx="12" cy="10" r="2.6"/></svg>',
  heart: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 20s-8-5.5-8-11a4.2 4.2 0 0 1 8-1.6A4.2 4.2 0 0 1 20 9c0 5.5-8 11-8 11z"/></svg>',
  shield: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3l7 3v5c0 5-3 8-7 10-4-2-7-5-7-10V6z"/><path d="M9 12l2 2 4-4"/></svg>',
  phone: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 4h4l2 5-2.5 1.5a12 12 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z"/></svg>',
  clock: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 8v4l3 2"/></svg>',
  mail: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 6h16v12H4z"/><path d="M4 7l8 6 8-6"/></svg>',
  doccheck: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 3h7l4 4v14H7z"/><path d="M14 3v4h4"/><path d="M9.5 14l2 2 3.5-4"/></svg>',
  plane: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M21 16v2l-9-4-9 4v-2l9-4V6a2 2 0 0 1 4 0v6z"/></svg>',
};

function esc(s) {
  return String(s == null ? "" : s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function crumbs(def) {
  const parts = def.route.split("/").filter(Boolean);
  let html = '<div class="wrap crumbs"><a href="/">Home</a>';
  let acc = "";
  parts.forEach((seg, i) => {
    acc += "/" + seg + "/";
    const isLast = i === parts.length - 1;
    html +=
      ' &nbsp;/&nbsp; ' +
      (isLast
        ? esc(def.crumb || seg.replace(/-/g, " "))
        : '<a href="' + acc + '">' + esc(seg.replace(/-/g, " ")) + "</a>");
  });
  html += "</div>";
  return html;
}

function hero(def) {
  let h = "\n<section class=\"hero\">\n  <div class=\"wrap\">\n    <h1";
  if (def.h1Max) h += ' style="max-width:' + def.h1Max + '"';
  h += ">" + esc(def.h1) + "</h1>\n";
  if (def.lede) h += '    <p class="lede" style="margin-block-start:24px;max-width:66ch">' + esc(def.lede) + "</p>\n";
  if (def.heroBody) h += '    <p class="hero__body" style="max-width:66ch">' + esc(def.heroBody) + "</p>\n";
  if (def.cta) {
    h += "    <div class=\"btns\">\n";
    if (def.cta.solid)
      h += '      <a class="btn btn--solid" href="' + esc(def.cta.solid.href) + '">' + esc(def.cta.solid.label) + "</a>\n";
    if (def.cta.line)
      h += '      <a class="btn btn--line" href="' + esc(def.cta.line.href) + '">' + esc(def.cta.line.label) + "</a>\n";
    h += "    </div>\n";
    if (def.cta.note) h += '    <p class="hero__note">' + esc(def.cta.note) + "</p>\n";
  }
  if (def.byline && def.byline.length) {
    h += "    <div class=\"byline\">\n";
    for (const b of def.byline) h += "      <span>" + b + "</span>\n";
    h += "    </div>\n";
  }
  if (def.facts && def.facts.length) {
    h += '    <div class="keyfacts">';
    for (const f of def.facts)
      h +=
        '<div class="kf"><span class="kf__k">' +
        esc(f.k) +
        '</span><div class="kf__v">' +
        esc(f.v) +
        '</div><div class="kf__d">' +
        esc(f.d) +
        "</div></div>";
    h += "</div>\n";
  }
  if (def.toc && def.toc.length) {
    h += '    <div class="toc">\n      <span class="toc__k">On this page</span>\n      <ol>\n';
    for (const t of def.toc) h += '        <li><a href="#' + t.href + '">' + esc(t.t) + "</a></li>\n";
    h += "      </ol>\n    </div>\n";
  }
  h += "  </div>\n</section>\n";
  return h;
}

function prose(section) {
  let html = '<div class="prose">';
  for (const p of section.ps || []) html += "<p>" + p + "</p>";
  if (section.ul && section.ul.length) {
    html += "<ul>";
    for (const li of section.ul) html += "<li>" + li + "</li>";
    html += "</ul>";
  }
  html += "</div>";
  return html;
}

function sections(def) {
  let html = "";
  (def.sections || []).forEach((s, i) => {
    const tone = i % 2 === 0 ? " band--tone" : "";
    html +=
      '\n<section class="band' + tone + ' rise" id="' + esc(s.id) + '">\n  <div class="wrap rail">\n    <div class="rail__label">' +
      esc(s.label) +
      "</div>\n    <div>\n      <h2>" +
      esc(s.h) +
      "</h2>\n";
    if (s.lede) html += '      <p class="lede">' + s.lede + "</p>\n";
    html += "      " + prose(s) + "\n    </div>\n  </div>\n</section>\n";
  });
  return html;
}

function costSection(def) {
  if (!def.costs || !def.costs.length) return "";
  let html =
    '\n<section class="band band--tone rise" id="costs">\n  <div class="wrap rail">\n    <div class="rail__label">Published ranges</div>\n    <div>\n      <h2>' +
    (def.costsTitle || "What each procedure costs") +
    "</h2>\n";
  if (def.costsNote) html += '      <p class="lede">' + def.costsNote + "</p>\n";
  html += '      <div class="ledger" style="margin-block-start:30px">\n        <div class="ledger__head"><span>Procedure</span><span>Typical cost in India</span></div>\n';
  for (const c of def.costs) {
    html +=
      '        <a href="' + esc(c.href || "#costs") + '" style="--c:#A03D33;--d:0ms">' +
      '<span class="led__ic">' + ICONS.arrow + "</span>" +
      "<span><span class=\"ledger__t\">" + esc(c.name) + "</span><span class=\"ledger__d\">" + esc(c.detail) + "</span></span>" +
      '<span class="ledger__go">' + esc(c.from) + "</span></a>\n";
  }
  html += "      </div>\n";
  if (def.costsFooter) html += "      <p style=\"margin-block-start:20px;color:var(--muted);font-size:14px\">" + def.costsFooter + "</p>\n";
  html += "    </div>\n  </div>\n</section>\n";
  return html;
}

function faqSection(def) {
  if (!def.faq || !def.faq.length) return "";
  let html =
    '\n<section class="band rise" id="faq">\n  <div class="wrap rail">\n    <div class="rail__label">Questions</div>\n    <div>\n      <h2>' +
    (def.faqTitle || "Questions patients ask") +
    '</h2>\n      <div class="faq">\n';
  def.faq.forEach((f, i) => {
    html +=
      '        <div class="faq__item' + (i === 0 ? ' open"' : '"') + ">\n" +
      '          <button class="faq__q" aria-expanded="' + (i === 0 ? "true" : "false") + '">' + esc(f.q) +
      '<span class="faq__sign" aria-hidden="true"></span></button>\n' +
      '          <div class="faq__a"><div><p>' + esc(f.a) + "</p></div></div>\n" +
      "        </div>\n";
  });
  html += "      </div>\n    </div>\n  </div>\n</section>\n";
  return html;
}

function relatedSection(def) {
  if (!def.related || !def.related.length) return "";
  let html =
    '\n<section class="band band--tone rise">\n  <div class="wrap rail">\n    <div class="rail__label">Related</div>\n    <div>\n      <h2>' +
    (def.relatedTitle || "Related pages") +
    '</h2>\n      <div class="rel">\n        <div class="rel__head"><span>Related</span><span>On this site</span></div>\n';
  def.related.forEach((r, i) => {
    const ic = ICONS[r.ic || "doc"] || ICONS.doc;
    html +=
      '        <a href="' + esc(r.href) + '" style="--c:' + esc(r.c || "#2F6E52") + ";--d:" + (i * 45) + 'ms">' +
      '<span class="rel__ic">' + ic + "</span>" +
      '<span class="rel__n">' + esc(r.t) + "</span>" +
      '<span class="rel__go">Read &rarr;</span></a>\n';
  });
  html += "      </div>\n    </div>\n  </div>\n</section>\n";
  return html;
}

function ctaSection(def) {
  if (!def.cta) return "";
  let html =
    '\n<section class="band band--ink" id="contact">\n  <div class="wrap rail">\n    <div class="rail__label">Get in touch</div>\n    <div>\n      <h2>' +
    (def.ctaTitle || "Send your reports and get a written opinion") +
    "</h2>\n      <p style=\"max-width:62ch\">" +
    (def.ctaBody || "Send your reports to " + esc("tibhind@gmail.com") + " or on WhatsApp. A US board-certified physician reads them and you get a written opinion with costs within 48 hours. Free, and with no obligation.") +
    '</p>\n      <div class="btns" style="margin-block-start:24px">\n' +
    '        <a class="btn btn--solid" href="https://wa.me/918303586344?text=Hello%2C%20I%20would%20like%20to%20send%20my%20medical%20reports%20for%20review">WhatsApp your reports</a>\n' +
    '        <a class="btn btn--line" href="mailto:tibhind@gmail.com">Email tibhind@gmail.com</a>\n' +
    "      </div>\n    </div>\n  </div>\n</section>\n";
  return html;
}

function jsonLd(def) {
  const parts = def.route.split("/").filter(Boolean);
  const items = [{ p: 1, name: "Home", url: DOMAIN + "/" }];
  let acc = "";
  parts.forEach((seg, i) => {
    acc += "/" + seg + "/";
    items.push({ p: i + 2, name: i === parts.length - 1 ? (def.title.split("|")[0] || seg).trim() : seg.replace(/-/g, " "), url: DOMAIN + acc });
  });
  const breadcrumb =
    '{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[' +
    items.map((x) => '{"@type":"ListItem","position":' + x.p + ',"name":' + JSON.stringify(x.name) + ',"item":' + JSON.stringify(x.url) + "}").join(",") +
    "]}";
  const webPage =
    '{"@context":"https://schema.org","@type":"WebPage","name":' + JSON.stringify(def.title) +
    ',"url":' + JSON.stringify(def.canonical) +
    (def.description ? ',"description":' + JSON.stringify(def.description) : "") +
    ',"inLanguage":"en","publisher":{"@type":"Organization","name":"TIB HIND Healthcare","url":"https://tibhind.com/"}}';
  const out = [breadcrumb, webPage];
  if (def.faq && def.faq.length) {
    const faq =
      '{"@context":"https://schema.org","@type":"FAQPage","mainEntity":[' +
      def.faq.map((f) => '{"@type":"Question","name":' + JSON.stringify(f.q) + ',"acceptedAnswer":{"@type":"Answer","text":' + JSON.stringify(f.a) + "}}").join(",") +
      "]}";
    out.push(faq);
  }
  return out.map((s) => JSON.stringify(JSON.parse(s)));
}

function buildPage(def) {
  const main =
    crumbs(def) +
    hero(def) +
    costSection(def) +
    sections(def) +
    faqSection(def) +
    relatedSection(def) +
    ctaSection(def);

  const body = SHELL_START + "\n\n" + main + "\n\n" + SHELL_END + "\n\n" + SHELL_TAIL;

  return {
    id: def.id,
    route: def.route,
    canonical: def.canonical || DOMAIN + def.route,
    title: def.title,
    description: def.description || null,
    robots: def.robots || null,
    styles: home.styles,
    jsonLd: jsonLd(def),
    headScripts: HEAD_SCRIPT,
    body,
    source: "generated/" + def.id + ".json",
  };
}

module.exports = { buildPage };