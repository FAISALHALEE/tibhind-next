const fs = require("fs");
const path = require("path");

const PALETTES = [
  { sky1: "#cfe8f5", sky2: "#eaf6fc", sun: "#ffd66b", body: "#f4f7f6", body2: "#dfe9e5", trim: "#2f7d6d", win: "#9fd3c7", ground: "#bcd9c2", tree: "#3f8f5f", cloud: "#ffffff" },
  { sky1: "#dbe9fb", sky2: "#f2f8ff", sun: "#ffcf5c", body: "#f6f8fb", body2: "#e2e9f2", trim: "#2b6cb0", win: "#a9c8ea", ground: "#c7dcef", tree: "#4a86c5", cloud: "#ffffff" },
  { sky1: "#e4f2df", sky2: "#f4faf0", sun: "#ffd66b", body: "#f7faf5", body2: "#e6efe2", trim: "#3f7d44", win: "#b3dcae", ground: "#cfe8cd", tree: "#2f7d44", cloud: "#ffffff" },
  { sky1: "#fdeedd", sky2: "#fff8ee", sun: "#f6b352", body: "#fdfaf5", body2: "#f0e7da", trim: "#b06a3b", win: "#ecc9a3", ground: "#ecd9c3", tree: "#8f6b3f", cloud: "#ffffff" },
  { sky1: "#e6e4f4", sky2: "#f4f3fb", sun: "#ffd66b", body: "#f8f7fc", body2: "#e8e6f2", trim: "#5b54a0", win: "#beb9e6", ground: "#d8d5ec", tree: "#6a63b8", cloud: "#ffffff" },
  { sky1: "#fbe3e3", sky2: "#fef3f3", sun: "#ffc46b", body: "#fcf6f6", body2: "#f0e2e2", trim: "#a83f42", win: "#eab6b6", ground: "#efd2d2", tree: "#b25a5d", cloud: "#ffffff" },
];

function hash(s) {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0;
  return h;
}

function windows(x0, y0, cols, rows, w, h, gx, gy, fill, skipDoorCol) {
  let out = "";
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (skipDoorCol && r === rows - 1 && c === skipDoorCol) continue;
      out += `<rect x="${x0 + c * (w + gx)}" y="${y0 + r * (h + gy)}" width="${w}" height="${h}" rx="1.5" fill="${fill}"/>`;
    }
  }
  return out;
}

function svg(name) {
  const p = PALETTES[hash(name) % PALETTES.length];
  const W = 640, H = 410, GY = 340;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" role="img">
<defs><linearGradient id="sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${p.sky1}"/><stop offset="1" stop-color="${p.sky2}"/></linearGradient></defs>
<rect width="${W}" height="${GY}" fill="url(#sky)"/>
<circle cx="${80 + (hash(name) % 480)}" cy="64" r="26" fill="${p.sun}"/>
<g fill="${p.cloud}" opacity=".9"><ellipse cx="150" cy="70" rx="34" ry="12"/><ellipse cx="185" cy="62" rx="24" ry="10"/><ellipse cx="500" cy="96" rx="40" ry="12"/><ellipse cx="538" cy="88" rx="26" ry="9"/></g>
<rect y="${GY}" width="${W}" height="${H - GY}" fill="${p.ground}"/>
<rect x="104" y="188" width="102" height="${GY - 188}" fill="${p.body2}"/>
${windows(116, 202, 4, 6, 16, 22, 8, 12, p.win, null)}
<rect x="100" y="180" width="110" height="8" rx="2" fill="${p.trim}"/>
<rect x="434" y="212" width="102" height="${GY - 212}" fill="${p.body2}"/>
${windows(446, 226, 4, 5, 16, 22, 8, 12, p.win, null)}
<rect x="430" y="204" width="110" height="8" rx="2" fill="${p.trim}"/>
<rect x="206" y="76" width="228" height="${GY - 76}" fill="${p.body}"/>
<rect x="200" y="66" width="240" height="12" rx="2" fill="${p.trim}"/>
<rect x="292" y="92" width="56" height="56" rx="8" fill="#fff" stroke="${p.trim}" stroke-width="2"/>
<rect x="314" y="104" width="12" height="32" rx="2" fill="#d84b4b"/>
<rect x="303" y="114" width="34" height="12" rx="2" fill="#d84b4b"/>
${windows(222, 170, 6, 6, 20, 24, 12, 13, p.win, 2)}
<rect x="288" y="300" width="64" height="40" rx="2" fill="${p.trim}"/>
<rect x="296" y="306" width="48" height="34" rx="1.5" fill="#e9f2ef"/>
<rect x="270" y="288" width="100" height="8" rx="2" fill="${p.trim}"/>
<g stroke="${p.tree}" stroke-width="5"><line x1="70" y1="${GY}" x2="70" y2="296"/><line x1="572" y1="${GY}" x2="572" y2="304"/></g>
<circle cx="70" cy="278" r="30" fill="${p.tree}"/><circle cx="572" cy="286" r="26" fill="${p.tree}"/>
<ellipse cx="150" cy="${GY + 4}" rx="26" ry="10" fill="${p.tree}" opacity=".55"/>
<ellipse cx="496" cy="${GY + 4}" rx="26" ry="10" fill="${p.tree}" opacity=".55"/>
</svg>`;
}

const dir = path.join(__dirname, "..", "public", "hospitals");
fs.mkdirSync(dir, { recursive: true });
const pages = fs.readdirSync(path.join(__dirname, "..", "data", "pages")).filter((f) => f.startsWith("hospitals-") && f.endsWith(".json"));
let n = 0;
for (const f of pages) {
  const slug = f.replace(/^hospitals-/, "").replace(/\.json$/, "");
  const d = JSON.parse(fs.readFileSync(path.join(__dirname, "..", "data", "pages", f), "utf8"));
  const m = (d.body || "").match(/<h1>([^<]+)<\/h1>/);
  const name = m ? m[1] : slug;
  fs.writeFileSync(path.join(dir, slug + ".svg"), svg(name));
  n++;
}
console.log("generated", n, "SVGs in public/hospitals");
