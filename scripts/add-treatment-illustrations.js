#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const illustrations = {
  'heart': {
    svg: `<svg viewBox="0 0 280 200" fill="none" xmlns="http://www.w3.org/2000/svg" style="max-width:280px;width:100%" aria-hidden="true"><g stroke="#12332C" stroke-opacity=".15" stroke-width="1.2" stroke-dasharray="3 3"><path d="M60 170h160"/><path d="M140 170V40"/><path d="M80 170V40"/><path d="M200 170V40"/></g><g stroke="#A03D33" stroke-width="2" stroke-linecap="round" fill="none"><path d="M140 158s-52-32-52-74c0-20 15-33 33-33 11 0 19 7 19 7s8-7 19-7c18 0 33 13 33 33 0 42-52 74-52 74z"/><circle cx="140" cy="88" r="8" stroke-opacity=".3"/></g><g stroke="#A03D33" stroke-opacity=".2" stroke-width="1.2" fill="none"><path d="M118 82c6-10 14-14 22-14"/><path d="M162 82c-6-10-14-14-22-14"/><circle cx="140" cy="88" r="22"/></g></svg>`,
    color: '#A03D33'
  },
  'neurosurgery': {
    svg: `<svg viewBox="0 0 280 200" fill="none" xmlns="http://www.w3.org/2000/svg" style="max-width:280px;width:100%" aria-hidden="true"><g stroke="#12332C" stroke-opacity=".12" stroke-width="1.2" stroke-dasharray="3 3"><circle cx="140" cy="90" r="65"/><circle cx="140" cy="90" r="45"/></g><g stroke="#2E6E6E" stroke-width="2" stroke-linecap="round" fill="none"><path d="M140 28c-40 0-62 24-62 52 0 18 10 32 26 40-3 10-7 18-7 28 0 22 20 40 43 40s43-18 43-40c0-10-4-18-7-28 16-8 26-22 26-40 0-28-22-52-62-52z"/><path d="M140 32c0 0-10 20-10 38s10 30 10 30" stroke-opacity=".35"/><path d="M118 55c12 6 24 2 32-5" stroke-opacity=".3"/><path d="M108 80c14 4 28-1 36-8" stroke-opacity=".3"/><path d="M115 104c10 3 22 0 28-5" stroke-opacity=".3"/></g></svg>`,
    color: '#2E6E6E'
  },
  'spine-surgery': {
    svg: `<svg viewBox="0 0 140 300" fill="none" xmlns="http://www.w3.org/2000/svg" style="max-width:120px;width:100%" aria-hidden="true"><g stroke="#12332C" stroke-opacity=".1" stroke-width="1"><line x1="70" y1="30" x2="70" y2="45"/><line x1="70" y1="60" x2="70" y2="75"/><line x1="70" y1="90" x2="70" y2="105"/><line x1="70" y1="120" x2="70" y2="135"/><line x1="70" y1="150" x2="70" y2="165"/><line x1="70" y1="180" x2="70" y2="195"/><line x1="70" y1="210" x2="70" y2="225"/><line x1="70" y1="240" x2="70" y2="255"/></g><g stroke="#8A6A28" stroke-width="2" stroke-linecap="round" fill="none"><rect x="38" y="12" width="64" height="18" rx="5"/><rect x="38" y="45" width="64" height="18" rx="5"/><rect x="38" y="78" width="64" height="18" rx="5"/><rect x="38" y="111" width="64" height="18" rx="5"/><rect x="38" y="144" width="64" height="18" rx="5"/><rect x="38" y="177" width="64" height="18" rx="5"/><rect x="38" y="210" width="64" height="18" rx="5"/><rect x="38" y="243" width="64" height="18" rx="5"/></g><g stroke="#8A6A28" stroke-opacity=".35" stroke-width="1.4"><line x1="38" y1="21" x2="18" y2="36"/><line x1="102" y1="21" x2="122" y2="36"/><line x1="38" y1="54" x2="18" y2="69"/><line x1="102" y1="54" x2="122" y2="69"/><line x1="38" y1="87" x2="18" y2="102"/><line x1="102" y1="87" x2="122" y2="102"/><line x1="38" y1="120" x2="18" y2="135"/><line x1="102" y1="120" x2="122" y2="135"/></g></svg>`,
    color: '#8A6A28'
  },
  'orthopaedics': {
    svg: `<svg viewBox="0 0 280 200" fill="none" xmlns="http://www.w3.org/2000/svg" style="max-width:280px;width:100%" aria-hidden="true"><g stroke="#12332C" stroke-opacity=".12" stroke-width="1" stroke-dasharray="3 3"><circle cx="140" cy="90" r="60"/><circle cx="140" cy="90" r="40"/></g><g stroke="#3D6B8A" stroke-width="2" stroke-linecap="round" fill="none"><path d="M105 30c-14 0-24 12-24 26s10 16 10 28v10"/><path d="M175 30c14 0 24 12 24 26s-10 16-10 28v10"/><line x1="95" y1="94" x2="185" y2="94"/><path d="M95 94c0 18 14 26 14 44s-14 30-14 40"/><path d="M185 94c0 18-14 26-14 44s14 30 14 40"/></g><circle cx="140" cy="94" r="10" fill="#3D6B8A" fill-opacity=".06" stroke="#3D6B8A" stroke-opacity=".25" stroke-width="1.2"/></svg>`,
    color: '#3D6B8A'
  },
  'cancer': {
    svg: `<svg viewBox="0 0 280 200" fill="none" xmlns="http://www.w3.org/2000/svg" style="max-width:280px;width:100%" aria-hidden="true"><g stroke="#12332C" stroke-opacity=".1" stroke-width="1" stroke-dasharray="3 3"><circle cx="140" cy="95" r="60"/><circle cx="140" cy="95" r="40"/></g><g stroke="#7A4C86" stroke-width="2" stroke-linecap="round" fill="none"><circle cx="140" cy="95" r="30"/><circle cx="82" cy="58" r="16"/><circle cx="200" cy="62" r="14"/><circle cx="196" cy="140" r="16"/><circle cx="86" cy="138" r="13"/></g><g stroke="#7A4C86" stroke-opacity=".3" stroke-width="1.2" stroke-dasharray="4 3"><line x1="118" y1="78" x2="98" y2="68"/><line x1="162" y1="78" x2="188" y2="68"/><line x1="166" y1="112" x2="182" y2="128"/><line x1="114" y1="114" x2="98" y2="130"/></g><circle cx="140" cy="95" r="10" fill="#7A4C86" fill-opacity=".06" stroke="#7A4C86" stroke-opacity=".2" stroke-width="1"/></svg>`,
    color: '#7A4C86'
  },
  'transplant': {
    svg: `<svg viewBox="0 0 280 200" fill="none" xmlns="http://www.w3.org/2000/svg" style="max-width:280px;width:100%" aria-hidden="true"><g stroke="#12332C" stroke-opacity=".12" stroke-width="1" stroke-dasharray="3 3"><circle cx="140" cy="95" r="60"/><circle cx="140" cy="95" r="42"/></g><g stroke="#2F6E52" stroke-width="2" stroke-linecap="round" fill="none"><path d="M140 160s-52-32-52-78c0-30 22-48 42-48s42 18 42 48c0 46-52 78-52 78z"/><path d="M118 88h44M140 68v40"/></g><circle cx="140" cy="95" r="10" fill="#2F6E52" fill-opacity=".06" stroke="#2F6E52" stroke-opacity=".25" stroke-width="1.2"/></svg>`,
    color: '#2F6E52'
  },
  'bone-marrow-transplant': {
    svg: `<svg viewBox="0 0 280 200" fill="none" xmlns="http://www.w3.org/2000/svg" style="max-width:280px;width:100%" aria-hidden="true"><g stroke="#12332C" stroke-opacity=".1" stroke-width="1" stroke-dasharray="3 3"><circle cx="90" cy="140" r="30"/><circle cx="190" cy="135" r="30"/></g><g stroke="#8C4A5C" stroke-width="2" stroke-linecap="round" fill="none"><path d="M140 30c-18 24-34 44-34 62a34 34 0 0 0 68 0c0-18-16-38-34-62z"/><circle cx="90" cy="140" r="16"/><circle cx="190" cy="135" r="16"/></g><g stroke="#8C4A5C" stroke-opacity=".3" stroke-width="1.4"><circle cx="140" cy="78" r="5"/><circle cx="130" cy="90" r="4"/><circle cx="150" cy="87" r="4.5"/><circle cx="140" cy="100" r="4"/></g></svg>`,
    color: '#8C4A5C'
  },
  'gastroenterology': {
    svg: `<svg viewBox="0 0 280 200" fill="none" xmlns="http://www.w3.org/2000/svg" style="max-width:280px;width:100%" aria-hidden="true"><g stroke="#12332C" stroke-opacity=".1" stroke-width="1" stroke-dasharray="3 3"><ellipse cx="140" cy="85" rx="75" ry="50"/></g><g stroke="#6B7A3A" stroke-width="2" stroke-linecap="round" fill="none"><path d="M95 40c35-18 80-18 115 0 16 10 18 32 6 50-18 30-55 28-78 14"/><path d="M112 62c20-10 44-4 52 10"/></g><circle cx="140" cy="80" r="8" fill="#6B7A3A" fill-opacity=".06" stroke="#6B7A3A" stroke-opacity=".25" stroke-width="1.2"/></svg>`,
    color: '#6B7A3A'
  },
  'bariatric-surgery': {
    svg: `<svg viewBox="0 0 280 200" fill="none" xmlns="http://www.w3.org/2000/svg" style="max-width:280px;width:100%" aria-hidden="true"><g stroke="#12332C" stroke-opacity=".1" stroke-width="1" stroke-dasharray="3 3"><circle cx="130" cy="100" r="65"/></g><g stroke="#B0563E" stroke-width="2" stroke-linecap="round" fill="none"><path d="M100 35v22c0 20-20 28-20 55 0 28 20 52 40 52 18 0 28-14 28-28 0-22-16-28-16-50"/><line x1="100" y1="35" x2="78" y2="35"/></g><circle cx="120" cy="100" r="8" fill="#B0563E" fill-opacity=".06" stroke="#B0563E" stroke-opacity=".25" stroke-width="1.2"/></svg>`,
    color: '#B0563E'
  },
  'fertility': {
    svg: `<svg viewBox="0 0 280 200" fill="none" xmlns="http://www.w3.org/2000/svg" style="max-width:280px;width:100%" aria-hidden="true"><g stroke="#12332C" stroke-opacity=".08" stroke-width="1" stroke-dasharray="3 3"><circle cx="140" cy="100" r="65"/><circle cx="140" cy="100" r="80"/></g><g stroke="#A9557A" stroke-width="2" stroke-linecap="round" fill="none"><circle cx="140" cy="100" r="38"/><circle cx="140" cy="100" r="13"/></g><g stroke="#A9557A" stroke-opacity=".3" stroke-width="1.4"><line x1="140" y1="50" x2="140" y2="65"/><line x1="140" y1="135" x2="140" y2="150"/><line x1="90" y1="100" x2="105" y2="100"/><line x1="175" y1="100" x2="190" y2="100"/><line x1="105" y1="65" x2="115" y2="75"/><line x1="165" y1="125" x2="175" y2="135"/><line x1="175" y1="65" x2="165" y2="75"/><line x1="115" y1="125" x2="105" y2="135"/></g></svg>`,
    color: '#A9557A'
  },
  'dental': {
    svg: `<svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" style="max-width:200px;width:100%" aria-hidden="true"><g stroke="#3D6B8A" stroke-width="2" stroke-linecap="round" fill="none"><path d="M72 28c-22 0-38 17-38 38 0 17 10 28 14 44 4 16 2 32-2 48-2 9 3 16 9 16 9 0 16-12 19-28 2-11 5-16 9-16s7 5 9 16c3 16 10 28 19 28 7 0 11-7 9-16-4-16-6-32-2-48 4-16 14-28 14-44 0-21-16-38-38-38z"/></g></svg>`,
    color: '#3D6B8A'
  },
  'dermatology': {
    svg: `<svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" style="max-width:200px;width:100%" aria-hidden="true"><g stroke="#A03D33" stroke-width="2" stroke-linecap="round" fill="none"><circle cx="100" cy="80" r="42"/><path d="M72 80c0-16 13-28 28-28s28 12 28 28"/><circle cx="100" cy="80" r="9"/><path d="M100 122v42"/><path d="M78 145l22-23 22 23"/></g></svg>`,
    color: '#A03D33'
  },
  'endocrinology': {
    svg: `<svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" style="max-width:200px;width:100%" aria-hidden="true"><g stroke="#96692A" stroke-width="2" stroke-linecap="round" fill="none"><path d="M100 28v22"/><path d="M78 50c0 0 22 16 22 38s-22 38-22 38"/><path d="M122 50c0 0-22 16-22 38s22 38 22 38"/><circle cx="78" cy="130" r="9"/><circle cx="122" cy="130" r="9"/><line x1="78" y1="139" x2="78" y2="165"/><line x1="122" y1="139" x2="122" y2="165"/></g></svg>`,
    color: '#96692A'
  },
  'ent': {
    svg: `<svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" style="max-width:200px;width:100%" aria-hidden="true"><g stroke="#56657A" stroke-width="2" stroke-linecap="round" fill="none"><path d="M58 58c0-22 20-38 42-38s42 16 42 38c0 14-10 24-20 30l-22 16-22-16c-10-6-20-16-20-30z"/><path d="M76 88v44M124 88v44"/><path d="M76 110h48"/><path d="M76 132h48"/></g></svg>`,
    color: '#56657A'
  },
  'eye-surgery': {
    svg: `<svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" style="max-width:200px;width:100%" aria-hidden="true"><g stroke="#3D6B8A" stroke-width="2" stroke-linecap="round" fill="none"><ellipse cx="100" cy="88" rx="65" ry="38"/><circle cx="100" cy="88" r="20"/><circle cx="100" cy="88" r="9"/></g></svg>`,
    color: '#3D6B8A'
  },
  'general-surgery': {
    svg: `<svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" style="max-width:200px;width:100%" aria-hidden="true"><g stroke="#2F6E52" stroke-width="2" stroke-linecap="round" fill="none"><path d="M100 28l16 32h-32z"/><rect x="68" y="60" width="64" height="85" rx="8"/><line x1="84" y1="80" x2="116" y2="80"/><line x1="84" y1="100" x2="116" y2="100"/><line x1="84" y1="120" x2="100" y2="120"/></g></svg>`,
    color: '#2F6E52'
  },
  'gynaecology': {
    svg: `<svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" style="max-width:200px;width:100%" aria-hidden="true"><g stroke="#A9557A" stroke-width="2" stroke-linecap="round" fill="none"><circle cx="100" cy="65" r="28"/><path d="M100 93v72"/><path d="M78 130h44"/><circle cx="100" cy="65" r="9" stroke-opacity=".35"/></g></svg>`,
    color: '#A9557A'
  },
  'nephrology': {
    svg: `<svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" style="max-width:200px;width:100%" aria-hidden="true"><g stroke="#3D6B8A" stroke-width="2" stroke-linecap="round" fill="none"><path d="M62 68c-12-22 0-48 28-48s32 22 28 48c-5 22-16 32-28 32S67 90 62 68z"/><path d="M138 68c12-22 0-48-28-48s-32 22-28 48c5 22 16 32 28 32s23-10 28-32z"/><line x1="100" y1="96" x2="100" y2="155"/><line x1="82" y1="155" x2="118" y2="155"/></g></svg>`,
    color: '#3D6B8A'
  },
  'paediatric-surgery': {
    svg: `<svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" style="max-width:200px;width:100%" aria-hidden="true"><g stroke="#2F6E52" stroke-width="2" stroke-linecap="round" fill="none"><circle cx="100" cy="50" r="24"/><path d="M62 92c0-22 17-38 38-38s38 16 38 38v42c0 12-10 20-20 20H82c-10 0-20-8-20-20z"/><circle cx="92" cy="47" r="3.5" fill="#2F6E52" fill-opacity=".25"/><circle cx="108" cy="47" r="3.5" fill="#2F6E52" fill-opacity=".25"/><path d="M92 58c5 5 11 5 16 0" stroke-opacity=".45"/></g></svg>`,
    color: '#2F6E52'
  },
  'plastic-surgery': {
    svg: `<svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" style="max-width:200px;width:100%" aria-hidden="true"><g stroke="#A03D33" stroke-width="2" stroke-linecap="round" fill="none"><circle cx="100" cy="72" r="38"/><path d="M84 72c0-9 7-16 16-16s16 7 16 16"/><circle cx="100" cy="72" r="7" stroke-opacity=".35"/><path d="M86 86h28" stroke-opacity=".25"/></g><line x1="100" y1="110" x2="100" y2="165" stroke="#A03D33" stroke-width="2" stroke-linecap="round"/></svg>`,
    color: '#A03D33'
  },
  'psychiatry': {
    svg: `<svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" style="max-width:200px;width:100%" aria-hidden="true"><g stroke="#56657A" stroke-width="2" stroke-linecap="round" fill="none"><circle cx="100" cy="72" r="38"/><path d="M74 68c0-16 12-28 26-28s26 12 26 28"/><path d="M86 65c5-7 13-7 18 0" stroke-opacity=".35"/><circle cx="91" cy="72" r="3" fill="#56657A" fill-opacity=".25"/><circle cx="109" cy="72" r="3" fill="#56657A" fill-opacity=".25"/><path d="M92 82c5 6 11 6 16 0" stroke-opacity=".35"/></g><path d="M100 110v52M82 138h36" stroke="#56657A" stroke-width="2" stroke-linecap="round"/></svg>`,
    color: '#56657A'
  },
  'pulmonology': {
    svg: `<svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" style="max-width:200px;width:100%" aria-hidden="true"><g stroke="#3D6B8A" stroke-width="2" stroke-linecap="round" fill="none"><path d="M100 28v52"/><path d="M100 80c-32 0-55 22-55 55s22 38 38 38c11 0 17-10 17-10s6 10 17 10c16 0 38-18 38-38s-23-55-55-55z"/></g></svg>`,
    color: '#3D6B8A'
  },
  'rehabilitation': {
    svg: `<svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" style="max-width:200px;width:100%" aria-hidden="true"><g stroke="#2F6E52" stroke-width="2" stroke-linecap="round" fill="none"><circle cx="100" cy="45" r="20"/><path d="M100 65v52"/><path d="M72 82h56"/><path d="M100 117l-22 42M100 117l22 42"/></g></svg>`,
    color: '#2F6E52'
  },
  'rheumatology': {
    svg: `<svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" style="max-width:200px;width:100%" aria-hidden="true"><g stroke="#8A6A28" stroke-width="2" stroke-linecap="round" fill="none"><path d="M100 35c-10 0-17 7-17 17v10c-10 5-17 14-17 25 0 16 14 30 34 30s34-14 34-30c0-11-7-20-17-25v-10c0-10-7-17-17-17z"/><circle cx="100" cy="98" r="7" stroke-opacity=".35"/><path d="M83 98h-12M117 98h12M100 81v-12M100 115v12" stroke-opacity=".25"/></g></svg>`,
    color: '#8A6A28'
  },
  'urology': {
    svg: `<svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" style="max-width:200px;width:100%" aria-hidden="true"><g stroke="#3D6B8A" stroke-width="2" stroke-linecap="round" fill="none"><path d="M68 48c-16 22-16 55 0 75 12 14 28 22 32 22s20-8 32-22c16-20 16-53 0-75"/><path d="M82 48h36"/><path d="M100 48v-16"/></g></svg>`,
    color: '#3D6B8A'
  },
  'vascular-surgery': {
    svg: `<svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" style="max-width:200px;width:100%" aria-hidden="true"><g stroke="#A03D33" stroke-width="2" stroke-linecap="round" fill="none"><path d="M100 28v144"/><path d="M100 48c-22 0-38 12-38 28s16 22 38 22"/><path d="M100 48c22 0 38 12 38 28s-16 22-38 22"/><path d="M100 100c-16 0-28 10-28 20s12 16 28 16"/><path d="M100 100c16 0 28 10 28 20s-12 16-28 16"/></g></svg>`,
    color: '#A03D33'
  }
};

const dir = path.join(__dirname, '..', 'data', 'pages');
const files = fs.readdirSync(dir).filter(f => f.startsWith('treatments-') && f.endsWith('.json'));

let updated = 0;
let skipped = 0;

for (const file of files) {
  const slug = file.replace('treatments-', '').replace('.json', '');
  const illustration = illustrations[slug];
  
  if (!illustration) {
    console.log(`SKIP (no illustration): ${slug}`);
    skipped++;
    continue;
  }
  
  const filePath = path.join(dir, file);
  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  
  // Skip if already has illustration
  if (data.body.includes('trt-hero-img')) {
    console.log(`SKIP (already has): ${slug}`);
    skipped++;
    continue;
  }
  
  let body = data.body;
  
  // Find the hero section
  const heroStart = body.indexOf('<section class="hero">');
  if (heroStart === -1) {
    console.log(`SKIP (no hero): ${slug}`);
    skipped++;
    continue;
  }
  
  // Strategy: add the SVG illustration right after the last <p class="hero__note"> 
  // or after the last button in the hero, before </div> that closes wrap
  const heroNoteIdx = body.indexOf('hero__note', heroStart);
  const btnsIdx = body.indexOf('btns', heroStart);
  
  let insertIdx = -1;
  
  if (heroNoteIdx > heroStart) {
    // Find the closing </p> of hero__note
    const noteEnd = body.indexOf('</p>', heroNoteIdx);
    if (noteEnd > heroNoteIdx) {
      insertIdx = noteEnd + 4; // after </p>
    }
  }
  
  if (insertIdx === -1 && btnsIdx > heroStart) {
    // Find the closing </div> of btns
    const btnsEnd = body.indexOf('</div>', btnsIdx);
    if (btnsEnd > btnsIdx) {
      insertIdx = btnsEnd + 6; // after </div>
    }
  }
  
  if (insertIdx === -1) {
    // Fallback: insert after first </div> in hero (after the wrap div's first child)
    const firstDivClose = body.indexOf('</div>', heroStart);
    if (firstDivClose > heroStart) {
      insertIdx = firstDivClose + 6;
    }
  }
  
  if (insertIdx === -1) {
    console.log(`SKIP (can't find insert point): ${slug}`);
    skipped++;
    continue;
  }
  
  // Build the illustration HTML
  const illustrationHTML = `\n    <div class="trt-hero-img" style="text-align:center;margin-block-start:28px">${illustration.svg}</div>`;
  
  // Insert the illustration
  body = body.slice(0, insertIdx) + illustrationHTML + body.slice(insertIdx);
  
  data.body = body;
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
  console.log(`UPDATED: ${slug}`);
  updated++;
}

console.log(`\nDone: ${updated} updated, ${skipped} skipped`);
