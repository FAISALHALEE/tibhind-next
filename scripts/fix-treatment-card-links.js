const fs = require("fs");
const path = require("path");

const DATA_DIR = path.join(process.cwd(), "data", "pages");

const REDIRECTS = {
  "/doctors/cardiology/": "/treatments/heart/",
  "/doctors/cardiac-surgery/": "/treatments/heart/",
  "/doctors/oncology/": "/treatments/cancer/",
  "/doctors/organ-transplant/": "/treatments/transplant/",
  "/doctors/orthopedics/": "/treatments/orthopaedics/",
  "/doctors/spine-surgery/": "/treatments/spine-surgery/",
  "/doctors/ivf-and-fertility/": "/treatments/fertility/",
  "/doctors/hematology/": "/treatments/bone-marrow-transplant/",
};

for (const f of fs.readdirSync(DATA_DIR)) {
  if (!f.endsWith(".json")) continue;
  const p = path.join(DATA_DIR, f);
  const j = JSON.parse(fs.readFileSync(p, "utf8"));
  if (!j.body) continue;

  let changed = false;
  let body = j.body;
  for (const [from, to] of Object.entries(REDIRECTS)) {
    const needle = `href="${from}"`;
    if (body.includes(needle)) {
      body = body.split(needle).join(`href="${to}"`);
      changed = true;
      console.log(`${j.route}: ${from} -> ${to}`);
    }
  }
  if (changed) {
    j.body = body;
    fs.writeFileSync(p, JSON.stringify(j, null, 2) + "\n");
  }
}
console.log("done");
