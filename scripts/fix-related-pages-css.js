const fs = require("fs");
const path = require("path");

const DATA_DIR = path.join(process.cwd(), "data", "pages");

const REL_CSS = `
/* ---------- related pages ledger ---------- */
.rel{border:1px solid var(--rule);background:#fff;margin-block-start:30px}
.band--tone .rel{background:var(--paper)}
.rel__head{
  display:flex;justify-content:space-between;padding:13px 22px;border-block-end:1px solid var(--rule);
  font-family:var(--data);font-size:10.5px;letter-spacing:.15em;text-transform:uppercase;color:var(--muted);
}
.rel a{
  position:relative;display:flex;align-items:center;gap:15px;padding:14px 22px;text-decoration:none;
  border-block-end:1px dotted var(--rule);transition:background .2s ease;
  animation:tibRise .5s ease var(--d,0ms) both;
}
.rel a:last-child{border-block-end:0}
.rel a::before{content:"";position:absolute;inset-block:0;inset-inline-start:0;width:0;background:var(--c,var(--seal));transition:width .25s ease}
.rel a:hover::before{width:3px}
.rel a:hover{background:color-mix(in srgb,var(--c,var(--seal)) 6%,transparent)}
.rel__ic{position:relative;flex:0 0 38px;width:38px;height:38px;border-radius:3px;display:grid;place-items:center;overflow:hidden}
.rel__ic::before{content:"";position:absolute;inset:0;background:var(--c,var(--seal));opacity:.11;transition:opacity .25s ease}
.rel__ic svg{position:relative;width:20px;height:20px;stroke:var(--c,var(--seal));fill:none;stroke-width:1.7;stroke-linecap:round;stroke-linejoin:round;transition:stroke .25s ease}
.rel a:hover .rel__ic::before{opacity:1}
.rel a:hover .rel__ic svg{stroke:#fff}
.rel__n{flex:1;font-size:16.5px}
.rel a:hover .rel__n{color:var(--c,var(--seal))}
.rel__go{font-family:var(--data);font-size:11px;letter-spacing:.12em;text-transform:uppercase;color:var(--muted);white-space:nowrap;transition:color .2s ease,transform .25s ease}
.rel a:hover .rel__go{color:var(--c,var(--seal));transform:translateX(4px)}
`;

let fixed = [];
for (const f of fs.readdirSync(DATA_DIR)) {
  if (!f.endsWith(".json")) continue;
  const p = path.join(DATA_DIR, f);
  const j = JSON.parse(fs.readFileSync(p, "utf8"));
  if (!j.body || !j.body.includes('class="rel"')) continue;
  if (j.styles.join("\n").includes(".rel__ic")) continue;
  j.styles.push(REL_CSS);
  fs.writeFileSync(p, JSON.stringify(j, null, 2) + "\n");
  fixed.push(j.route);
}

console.log("patched", fixed.length, "pages:");
fixed.forEach((r) => console.log(" ", r));
