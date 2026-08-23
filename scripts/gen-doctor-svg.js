const fs = require("fs");
const path = require("path");

const BG = [
  ["#dff0ea", "#f2faf6"],
  ["#dfe9f7", "#f2f7fd"],
  ["#efe9dc", "#fbf8f1"],
  ["#ece3f3", "#f9f5fd"],
  ["#f7e6df", "#fdf4f0"],
];
const SKIN = ["#f2c9a1", "#e8b48a", "#d9a06e", "#c98d5a", "#a96f43"];
const HAIR = ["#24211e", "#3d2f23", "#101010", "#565049"];

function hash(s) {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 33 + s.charCodeAt(i)) >>> 0;
  return h;
}

function svg(name) {
  const h = hash(name);
  const bg = BG[h % BG.length];
  const skin = SKIN[(h >> 3) % SKIN.length];
  const hair = HAIR[(h >> 5) % HAIR.length];
  const style = (h >> 7) % 4; // 0 short,1 side-part,2 long,3 bald+beard
  const beard = (h >> 9) % 3 === 0 && style !== 2;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 410" role="img">
<defs><linearGradient id="bg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${bg[0]}"/><stop offset="1" stop-color="${bg[1]}"/></linearGradient></defs>
<rect width="320" height="410" fill="url(#bg)"/>
<circle cx="160" cy="150" r="86" fill="#ffffff" opacity=".55"/>
${style === 2 ? `<path d="M104 132 q-10 78 12 108 l88 0 q22-30 12-108 z" fill="${hair}"/>` : ""}
<rect x="138" y="118" width="44" height="46" rx="18" fill="${skin}"/>
<ellipse cx="160" cy="98" rx="52" ry="56" fill="${skin}"/>
${style === 0 ? `<path d="M108 92 q4-52 52-52 t52 52 q-16-26-52-26 t-52 26z" fill="${hair}"/>` : ""}
${style === 1 ? `<path d="M108 94 q10-56 54-54 q42 2 50 50 l-6 8 q-20-30-58-24 q-28 5-34 28z" fill="${hair}"/>` : ""}
${style === 2 ? `<path d="M106 120 q-2-70 54-70 t54 70 q-12-40-54-40 t-54 40z" fill="${hair}"/>` : ""}
${style === 3 ? `<path d="M112 84 q6-40 48-40 t48 40 q-22-22-48-22 t-48 22z" fill="${hair}"/>` : ""}
${beard ? `<path d="M124 116 q6 34 36 34 t36-34 q-4 44-36 44 t-36-44z" fill="${hair}" opacity=".85"/>` : ""}
<circle cx="140" cy="100" r="4.5" fill="#20242b"/>
<circle cx="180" cy="100" r="4.5" fill="#20242b"/>
<path d="M130 86 q10-6 20-2" stroke="#20242b" stroke-width="3" fill="none" stroke-linecap="round"/>
<path d="M170 84 q10-4 20 2" stroke="#20242b" stroke-width="3" fill="none" stroke-linecap="round"/>
<path d="M148 122 q12 10 24 0" stroke="#8c4a32" stroke-width="3.5" fill="none" stroke-linecap="round"/>
<path d="M60 410 q6-118 100-128 t100 128z" fill="#ffffff" stroke="#d8dee2" stroke-width="2"/>
<path d="M136 292 l24 30 l24-30 l-8-14 l-32 0z" fill="#cfe4ef"/>
<path d="M158 322 l-14 88 l16 0 l8-64 l8 64 l16 0 l-14-88z" fill="#eef4f7"/>
<path d="M126 300 q34 26 68 0" stroke="#9fb6c4" stroke-width="5" fill="none"/>
<circle cx="196" cy="352" r="15" fill="#cfdde6" stroke="#9fb6c4" stroke-width="5"/>
<circle cx="196" cy="352" r="5" fill="#9fb6c4"/>
</svg>`;
}

const dir = path.join(__dirname, "..", "public", "doctors");
fs.mkdirSync(dir, { recursive: true });
const pagesDir = path.join(__dirname, "..", "data", "pages");
let n = 0;
for (const f of fs.readdirSync(pagesDir)) {
  if (!f.startsWith("doctors-dr-") || !f.endsWith(".json")) continue;
  const slug = f.replace(/^doctors-/, "").replace(/\.json$/, "");
  const d = JSON.parse(fs.readFileSync(path.join(pagesDir, f), "utf8"));
  const m = (d.body || "").match(/<h1>([^<]+)<\/h1>/);
  fs.writeFileSync(path.join(dir, slug + ".svg"), svg(m ? m[1] : slug));
  n++;
}
console.log("generated", n, "doctor avatars in public/doctors");
