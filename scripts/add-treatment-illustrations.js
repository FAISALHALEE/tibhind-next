#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const illustrations = {
  'heart': `<svg viewBox="0 0 260 180" fill="none" xmlns="http://www.w3.org/2000/svg" style="max-width:260px;width:100%;display:block;margin:0 auto" aria-hidden="true"><rect x="10" y="10" width="240" height="160" rx="12" fill="#A03D33" fill-opacity=".06"/><path d="M130 148s-52-32-52-74c0-20 15-33 33-33 11 0 19 7 19 7s8-7 19-7c18 0 33 13 33 33 0 42-52 74-52 74z" fill="#A03D33" fill-opacity=".12" stroke="#A03D33" stroke-width="2.5" stroke-linecap="round"/><path d="M108 82c6-10 14-14 22-14" stroke="#A03D33" stroke-width="1.5" stroke-opacity=".5" stroke-linecap="round"/><path d="M152 82c-6-10-14-14-22-14" stroke="#A03D33" stroke-width="1.5" stroke-opacity=".5" stroke-linecap="round"/><circle cx="130" cy="88" r="7" fill="#A03D33" fill-opacity=".15" stroke="#A03D33" stroke-width="1.5" stroke-opacity=".4"/></svg>`,

  'neurosurgery': `<svg viewBox="0 0 260 180" fill="none" xmlns="http://www.w3.org/2000/svg" style="max-width:260px;width:100%;display:block;margin:0 auto" aria-hidden="true"><rect x="10" y="10" width="240" height="160" rx="12" fill="#2E6E6E" fill-opacity=".06"/><path d="M130 28c-40 0-62 24-62 52 0 18 10 32 26 40-3 10-7 18-7 28 0 22 20 40 43 40s43-18 43-40c0-10-4-18-7-28 16-8 26-22 26-40 0-28-22-52-62-52z" fill="#2E6E6E" fill-opacity=".1" stroke="#2E6E6E" stroke-width="2.5" stroke-linecap="round"/><path d="M130 32c0 0-10 20-10 38s10 30 10 30" stroke="#2E6E6E" stroke-width="1.5" stroke-opacity=".5" stroke-linecap="round"/><path d="M108 55c12 6 24 2 32-5" stroke="#2E6E6E" stroke-width="1.5" stroke-opacity=".4" stroke-linecap="round"/><path d="M98 80c14 4 28-1 36-8" stroke="#2E6E6E" stroke-width="1.5" stroke-opacity=".4" stroke-linecap="round"/><path d="M105 104c10 3 22 0 28-5" stroke="#2E6E6E" stroke-width="1.5" stroke-opacity=".4" stroke-linecap="round"/></svg>`,

  'spine-surgery': `<svg viewBox="0 0 260 180" fill="none" xmlns="http://www.w3.org/2000/svg" style="max-width:260px;width:100%;display:block;margin:0 auto" aria-hidden="true"><rect x="10" y="10" width="240" height="160" rx="12" fill="#8A6A28" fill-opacity=".06"/><rect x="98" y="20" width="64" height="16" rx="5" fill="#8A6A28" fill-opacity=".12" stroke="#8A6A28" stroke-width="2.2"/><rect x="98" y="42" width="64" height="16" rx="5" fill="#8A6A28" fill-opacity=".12" stroke="#8A6A28" stroke-width="2.2"/><rect x="98" y="64" width="64" height="16" rx="5" fill="#8A6A28" fill-opacity=".12" stroke="#8A6A28" stroke-width="2.2"/><rect x="98" y="86" width="64" height="16" rx="5" fill="#8A6A28" fill-opacity=".12" stroke="#8A6A28" stroke-width="2.2"/><rect x="98" y="108" width="64" height="16" rx="5" fill="#8A6A28" fill-opacity=".12" stroke="#8A6A28" stroke-width="2.2"/><rect x="98" y="130" width="64" height="16" rx="5" fill="#8A6A28" fill-opacity=".12" stroke="#8A6A28" stroke-width="2.2"/><line x1="130" y1="36" x2="130" y2="42" stroke="#8A6A28" stroke-width="1.5" stroke-opacity=".4"/><line x1="130" y1="58" x2="130" y2="64" stroke="#8A6A28" stroke-width="1.5" stroke-opacity=".4"/><line x1="130" y1="80" x2="130" y2="86" stroke="#8A6A28" stroke-width="1.5" stroke-opacity=".4"/><line x1="130" y1="102" x2="130" y2="108" stroke="#8A6A28" stroke-width="1.5" stroke-opacity=".4"/><line x1="130" y1="124" x2="130" y2="130" stroke="#8A6A28" stroke-width="1.5" stroke-opacity=".4"/><line x1="98" y1="28" x2="78" y2="40" stroke="#8A6A28" stroke-width="1.5" stroke-opacity=".5" stroke-linecap="round"/><line x1="162" y1="28" x2="182" y2="40" stroke="#8A6A28" stroke-width="1.5" stroke-opacity=".5" stroke-linecap="round"/><line x1="98" y1="50" x2="78" y2="62" stroke="#8A6A28" stroke-width="1.5" stroke-opacity=".5" stroke-linecap="round"/><line x1="162" y1="50" x2="182" y2="62" stroke="#8A6A28" stroke-width="1.5" stroke-opacity=".5" stroke-linecap="round"/></svg>`,

  'orthopaedics': `<svg viewBox="0 0 260 180" fill="none" xmlns="http://www.w3.org/2000/svg" style="max-width:260px;width:100%;display:block;margin:0 auto" aria-hidden="true"><rect x="10" y="10" width="240" height="160" rx="12" fill="#3D6B8A" fill-opacity=".06"/><path d="M95 30c-14 0-24 12-24 26s10 16 10 28v12" stroke="#3D6B8A" stroke-width="2.5" stroke-linecap="round" fill="none"/><path d="M165 30c14 0 24 12 24 26s-10 16-10 28v12" stroke="#3D6B8A" stroke-width="2.5" stroke-linecap="round" fill="none"/><line x1="85" y1="96" x2="175" y2="96" stroke="#3D6B8A" stroke-width="2.5" stroke-linecap="round"/><path d="M85 96c0 18 14 26 14 44s-14 30-14 40" stroke="#3D6B8A" stroke-width="2.5" stroke-linecap="round" fill="none"/><path d="M175 96c0 18-14 26-14 44s14 30 14 40" stroke="#3D6B8A" stroke-width="2.5" stroke-linecap="round" fill="none"/><circle cx="130" cy="96" r="8" fill="#3D6B8A" fill-opacity=".15" stroke="#3D6B8A" stroke-width="1.5" stroke-opacity=".5"/></svg>`,

  'cancer': `<svg viewBox="0 0 260 180" fill="none" xmlns="http://www.w3.org/2000/svg" style="max-width:260px;width:100%;display:block;margin:0 auto" aria-hidden="true"><rect x="10" y="10" width="240" height="160" rx="12" fill="#7A4C86" fill-opacity=".06"/><circle cx="130" cy="90" r="30" fill="#7A4C86" fill-opacity=".12" stroke="#7A4C86" stroke-width="2.5"/><circle cx="72" cy="55" r="16" fill="#7A4C86" fill-opacity=".08" stroke="#7A4C86" stroke-width="2"/><circle cx="190" cy="58" r="14" fill="#7A4C86" fill-opacity=".08" stroke="#7A4C86" stroke-width="2"/><circle cx="186" cy="130" r="16" fill="#7A4C86" fill-opacity=".08" stroke="#7A4C86" stroke-width="2"/><circle cx="76" cy="128" r="13" fill="#7A4C86" fill-opacity=".08" stroke="#7A4C86" stroke-width="2"/><line x1="108" y1="75" x2="88" y2="64" stroke="#7A4C86" stroke-width="1.5" stroke-opacity=".5" stroke-linecap="round"/><line x1="152" y1="75" x2="178" y2="64" stroke="#7A4C86" stroke-width="1.5" stroke-opacity=".5" stroke-linecap="round"/><line x1="156" y1="108" x2="172" y2="120" stroke="#7A4C86" stroke-width="1.5" stroke-opacity=".5" stroke-linecap="round"/><line x1="104" y1="110" x2="88" y2="120" stroke="#7A4C86" stroke-width="1.5" stroke-opacity=".5" stroke-linecap="round"/></svg>`,

  'transplant': `<svg viewBox="0 0 260 180" fill="none" xmlns="http://www.w3.org/2000/svg" style="max-width:260px;width:100%;display:block;margin:0 auto" aria-hidden="true"><rect x="10" y="10" width="240" height="160" rx="12" fill="#2F6E52" fill-opacity=".06"/><path d="M130 155s-52-32-52-78c0-30 22-48 42-48s42 18 42 48c0 46-52 78-52 78z" fill="#2F6E52" fill-opacity=".1" stroke="#2F6E52" stroke-width="2.5" stroke-linecap="round"/><line x1="108" y1="85" x2="152" y2="85" stroke="#2F6E52" stroke-width="2" stroke-opacity=".5" stroke-linecap="round"/><line x1="130" y1="65" x2="130" y2="105" stroke="#2F6E52" stroke-width="2" stroke-opacity=".5" stroke-linecap="round"/><circle cx="130" cy="85" r="8" fill="#2F6E52" fill-opacity=".15" stroke="#2F6E52" stroke-width="1.5" stroke-opacity=".4"/></svg>`,

  'bone-marrow-transplant': `<svg viewBox="0 0 260 180" fill="none" xmlns="http://www.w3.org/2000/svg" style="max-width:260px;width:100%;display:block;margin:0 auto" aria-hidden="true"><rect x="10" y="10" width="240" height="160" rx="12" fill="#8C4A5C" fill-opacity=".06"/><path d="M130 25c-18 24-34 44-34 62a34 34 0 0 0 68 0c0-18-16-38-34-62z" fill="#8C4A5C" fill-opacity=".1" stroke="#8C4A5C" stroke-width="2.5" stroke-linecap="round"/><circle cx="80" cy="130" r="16" fill="#8C4A5C" fill-opacity=".08" stroke="#8C4A5C" stroke-width="2"/><circle cx="180" cy="125" r="16" fill="#8C4A5C" fill-opacity=".08" stroke="#8C4A5C" stroke-width="2"/><circle cx="130" cy="72" r="5" fill="#8C4A5C" fill-opacity=".2"/><circle cx="120" cy="84" r="4" fill="#8C4A5C" fill-opacity=".2"/><circle cx="140" cy="82" r="4.5" fill="#8C4A5C" fill-opacity=".2"/><circle cx="130" cy="95" r="4" fill="#8C4A5C" fill-opacity=".2"/></svg>`,

  'gastroenterology': `<svg viewBox="0 0 260 180" fill="none" xmlns="http://www.w3.org/2000/svg" style="max-width:260px;width:100%;display:block;margin:0 auto" aria-hidden="true"><rect x="10" y="10" width="240" height="160" rx="12" fill="#6B7A3A" fill-opacity=".06"/><path d="M85 40c35-18 80-18 115 0 16 10 18 32 6 50-18 30-55 28-78 14" stroke="#6B7A3A" stroke-width="2.5" stroke-linecap="round" fill="#6B7A3A" fill-opacity=".08"/><path d="M102 62c20-10 44-4 52 10" stroke="#6B7A3A" stroke-width="1.5" stroke-opacity=".5" stroke-linecap="round"/><circle cx="130" cy="75" r="8" fill="#6B7A3A" fill-opacity=".15" stroke="#6B7A3A" stroke-width="1.5" stroke-opacity=".4"/></svg>`,

  'bariatric-surgery': `<svg viewBox="0 0 260 180" fill="none" xmlns="http://www.w3.org/2000/svg" style="max-width:260px;width:100%;display:block;margin:0 auto" aria-hidden="true"><rect x="10" y="10" width="240" height="160" rx="12" fill="#B0563E" fill-opacity=".06"/><path d="M120 30v22c0 20-20 28-20 55 0 28 20 52 40 52 18 0 28-14 28-28 0-22-16-28-16-50" stroke="#B0563E" stroke-width="2.5" stroke-linecap="round" fill="#B0563E" fill-opacity=".08"/><line x1="120" y1="30" x2="98" y2="30" stroke="#B0563E" stroke-width="2.5" stroke-linecap="round"/><circle cx="140" cy="100" r="8" fill="#B0563E" fill-opacity=".15" stroke="#B0563E" stroke-width="1.5" stroke-opacity=".4"/></svg>`,

  'fertility': `<svg viewBox="0 0 260 180" fill="none" xmlns="http://www.w3.org/2000/svg" style="max-width:260px;width:100%;display:block;margin:0 auto" aria-hidden="true"><rect x="10" y="10" width="240" height="160" rx="12" fill="#A9557A" fill-opacity=".06"/><circle cx="130" cy="90" r="38" fill="#A9557A" fill-opacity=".1" stroke="#A9557A" stroke-width="2.5"/><circle cx="130" cy="90" r="13" fill="#A9557A" fill-opacity=".15" stroke="#A9557A" stroke-width="2"/><line x1="130" y1="40" x2="130" y2="55" stroke="#A9557A" stroke-width="2" stroke-opacity=".5" stroke-linecap="round"/><line x1="130" y1="125" x2="130" y2="140" stroke="#A9557A" stroke-width="2" stroke-opacity=".5" stroke-linecap="round"/><line x1="80" y1="90" x2="95" y2="90" stroke="#A9557A" stroke-width="2" stroke-opacity=".5" stroke-linecap="round"/><line x1="165" y1="90" x2="180" y2="90" stroke="#A9557A" stroke-width="2" stroke-opacity=".5" stroke-linecap="round"/><line x1="96" y1="56" x2="107" y2="67" stroke="#A9557A" stroke-width="1.5" stroke-opacity=".4" stroke-linecap="round"/><line x1="153" y1="113" x2="164" y2="124" stroke="#A9557A" stroke-width="1.5" stroke-opacity=".4" stroke-linecap="round"/><line x1="164" y1="56" x2="153" y2="67" stroke="#A9557A" stroke-width="1.5" stroke-opacity=".4" stroke-linecap="round"/><line x1="107" y1="113" x2="96" y2="124" stroke="#A9557A" stroke-width="1.5" stroke-opacity=".4" stroke-linecap="round"/></svg>`,

  'dental': `<svg viewBox="0 0 260 180" fill="none" xmlns="http://www.w3.org/2000/svg" style="max-width:220px;width:100%;display:block;margin:0 auto" aria-hidden="true"><rect x="20" y="5" width="220" height="170" rx="12" fill="#3D6B8A" fill-opacity=".06"/><path d="M110 20c-24 0-42 18-42 42 0 18 10 30 14 48 4 18 2 35-2 52-2 10 3 18 10 18 10 0 18-13 21-30 2-12 5-18 9-18s8 6 9 18c3 17 11 30 21 30 8 0 12-8 10-18-4-18-6-34-2-52 4-18 14-30 14-48 0-24-18-42-42-42z" fill="#3D6B8A" fill-opacity=".1" stroke="#3D6B8A" stroke-width="2.5" stroke-linecap="round"/></svg>`,

  'dermatology': `<svg viewBox="0 0 260 180" fill="none" xmlns="http://www.w3.org/2000/svg" style="max-width:220px;width:100%;display:block;margin:0 auto" aria-hidden="true"><rect x="20" y="5" width="220" height="170" rx="12" fill="#A03D33" fill-opacity=".06"/><circle cx="130" cy="75" r="42" fill="#A03D33" fill-opacity=".08" stroke="#A03D33" stroke-width="2.5"/><path d="M102 75c0-16 13-28 28-28s28 12 28 28" stroke="#A03D33" stroke-width="2" stroke-opacity=".5" stroke-linecap="round" fill="none"/><circle cx="130" cy="75" r="9" fill="#A03D33" fill-opacity=".15" stroke="#A03D33" stroke-width="2" stroke-opacity=".4"/><line x1="130" y1="117" x2="130" y2="155" stroke="#A03D33" stroke-width="2.5" stroke-linecap="round"/><line x1="108" y1="140" x2="130" y2="117" stroke="#A03D33" stroke-width="2" stroke-linecap="round"/><line x1="152" y1="140" x2="130" y2="117" stroke="#A03D33" stroke-width="2" stroke-linecap="round"/></svg>`,

  'endocrinology': `<svg viewBox="0 0 260 180" fill="none" xmlns="http://www.w3.org/2000/svg" style="max-width:220px;width:100%;display:block;margin:0 auto" aria-hidden="true"><rect x="20" y="5" width="220" height="170" rx="12" fill="#96692A" fill-opacity=".06"/><line x1="130" y1="20" x2="130" y2="45" stroke="#96692A" stroke-width="2.5" stroke-linecap="round"/><path d="M108 45c0 0 22 16 22 38s-22 38-22 38" stroke="#96692A" stroke-width="2.5" stroke-linecap="round" fill="none"/><path d="M152 45c0 0-22 16-22 38s22 38 22 38" stroke="#96692A" stroke-width="2.5" stroke-linecap="round" fill="none"/><circle cx="108" cy="125" r="9" fill="#96692A" fill-opacity=".12" stroke="#96692A" stroke-width="2"/><circle cx="152" cy="125" r="9" fill="#96692A" fill-opacity=".12" stroke="#96692A" stroke-width="2"/><line x1="108" y1="134" x2="108" y2="158" stroke="#96692A" stroke-width="2" stroke-linecap="round"/><line x1="152" y1="134" x2="152" y2="158" stroke="#96692A" stroke-width="2" stroke-linecap="round"/></svg>`,

  'ent': `<svg viewBox="0 0 260 180" fill="none" xmlns="http://www.w3.org/2000/svg" style="max-width:220px;width:100%;display:block;margin:0 auto" aria-hidden="true"><rect x="20" y="5" width="220" height="170" rx="12" fill="#56657A" fill-opacity=".06"/><path d="M85 55c0-24 20-42 45-42s45 18 45 42c0 15-11 26-22 32l-23 18-23-18c-11-6-22-17-22-32z" fill="#56657A" fill-opacity=".08" stroke="#56657A" stroke-width="2.5" stroke-linecap="round"/><line x1="103" y1="85" x2="103" y2="130" stroke="#56657A" stroke-width="2" stroke-linecap="round"/><line x1="157" y1="85" x2="157" y2="130" stroke="#56657A" stroke-width="2" stroke-linecap="round"/><line x1="103" y1="108" x2="157" y2="108" stroke="#56657A" stroke-width="2" stroke-linecap="round"/><line x1="103" y1="130" x2="157" y2="130" stroke="#56657A" stroke-width="2" stroke-linecap="round"/></svg>`,

  'eye-surgery': `<svg viewBox="0 0 260 180" fill="none" xmlns="http://www.w3.org/2000/svg" style="max-width:220px;width:100%;display:block;margin:0 auto" aria-hidden="true"><rect x="20" y="5" width="220" height="170" rx="12" fill="#3D6B8A" fill-opacity=".06"/><ellipse cx="130" cy="85" rx="65" ry="38" fill="#3D6B8A" fill-opacity=".06" stroke="#3D6B8A" stroke-width="2.5"/><circle cx="130" cy="85" r="20" fill="#3D6B8A" fill-opacity=".1" stroke="#3D6B8A" stroke-width="2"/><circle cx="130" cy="85" r="9" fill="#3D6B8A" fill-opacity=".2" stroke="#3D6B8A" stroke-width="1.5"/></svg>`,

  'general-surgery': `<svg viewBox="0 0 260 180" fill="none" xmlns="http://www.w3.org/2000/svg" style="max-width:220px;width:100%;display:block;margin:0 auto" aria-hidden="true"><rect x="20" y="5" width="220" height="170" rx="12" fill="#2F6E52" fill-opacity=".06"/><path d="M130 22l18 35h-36z" fill="#2F6E52" fill-opacity=".1" stroke="#2F6E52" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/><rect x="90" y="57" width="80" height="90" rx="8" fill="#2F6E52" fill-opacity=".06" stroke="#2F6E52" stroke-width="2.5"/><line x1="108" y1="80" x2="152" y2="80" stroke="#2F6E52" stroke-width="2" stroke-linecap="round"/><line x1="108" y1="100" x2="152" y2="100" stroke="#2F6E52" stroke-width="2" stroke-linecap="round"/><line x1="108" y1="120" x2="130" y2="120" stroke="#2F6E52" stroke-width="2" stroke-linecap="round"/></svg>`,

  'gynaecology': `<svg viewBox="0 0 260 180" fill="none" xmlns="http://www.w3.org/2000/svg" style="max-width:220px;width:100%;display:block;margin:0 auto" aria-hidden="true"><rect x="20" y="5" width="220" height="170" rx="12" fill="#A9557A" fill-opacity=".06"/><circle cx="130" cy="58" r="28" fill="#A9557A" fill-opacity=".1" stroke="#A9557A" stroke-width="2.5"/><line x1="130" y1="86" x2="130" y2="155" stroke="#A9557A" stroke-width="2.5" stroke-linecap="round"/><line x1="105" y1="125" x2="155" y2="125" stroke="#A9557A" stroke-width="2.5" stroke-linecap="round"/><circle cx="130" cy="58" r="9" fill="#A9557A" fill-opacity=".15" stroke="#A9557A" stroke-width="1.5" stroke-opacity=".4"/></svg>`,

  'nephrology': `<svg viewBox="0 0 260 180" fill="none" xmlns="http://www.w3.org/2000/svg" style="max-width:220px;width:100%;display:block;margin:0 auto" aria-hidden="true"><rect x="20" y="5" width="220" height="170" rx="12" fill="#3D6B8A" fill-opacity=".06"/><path d="M90 65c-12-22 0-48 28-48s32 22 28 48c-5 22-16 32-28 32S95 87 90 65z" fill="#3D6B8A" fill-opacity=".08" stroke="#3D6B8A" stroke-width="2.5"/><path d="M170 65c12-22 0-48-28-48s-32 22-28 48c5 22 16 32 28 32s23-10 28-32z" fill="#3D6B8A" fill-opacity=".08" stroke="#3D6B8A" stroke-width="2.5"/><line x1="130" y1="93" x2="130" y2="148" stroke="#3D6B8A" stroke-width="2.5" stroke-linecap="round"/><line x1="112" y1="148" x2="148" y2="148" stroke="#3D6B8A" stroke-width="2.5" stroke-linecap="round"/></svg>`,

  'paediatric-surgery': `<svg viewBox="0 0 260 180" fill="none" xmlns="http://www.w3.org/2000/svg" style="max-width:220px;width:100%;display:block;margin:0 auto" aria-hidden="true"><rect x="20" y="5" width="220" height="170" rx="12" fill="#2F6E52" fill-opacity=".06"/><circle cx="130" cy="45" r="24" fill="#2F6E52" fill-opacity=".1" stroke="#2F6E52" stroke-width="2.5"/><path d="M92 85c0-22 17-38 38-38s38 16 38 38v42c0 12-10 20-20 20h-36c-10 0-20-8-20-20z" fill="#2F6E52" fill-opacity=".06" stroke="#2F6E52" stroke-width="2.5"/><circle cx="122" cy="42" r="3.5" fill="#2F6E52" fill-opacity=".3"/><circle cx="138" cy="42" r="3.5" fill="#2F6E52" fill-opacity=".3"/><path d="M122 53c5 5 11 5 16 0" stroke="#2F6E52" stroke-width="1.5" stroke-opacity=".5" stroke-linecap="round" fill="none"/></svg>`,

  'plastic-surgery': `<svg viewBox="0 0 260 180" fill="none" xmlns="http://www.w3.org/2000/svg" style="max-width:220px;width:100%;display:block;margin:0 auto" aria-hidden="true"><rect x="20" y="5" width="220" height="170" rx="12" fill="#A03D33" fill-opacity=".06"/><circle cx="130" cy="65" r="38" fill="#A03D33" fill-opacity=".08" stroke="#A03D33" stroke-width="2.5"/><path d="M114 65c0-9 7-16 16-16s16 7 16 16" stroke="#A03D33" stroke-width="2" stroke-opacity=".5" stroke-linecap="round" fill="none"/><circle cx="130" cy="65" r="7" fill="#A03D33" fill-opacity=".15" stroke="#A03D33" stroke-width="1.5" stroke-opacity=".4"/><line x1="116" y1="80" x2="144" y2="80" stroke="#A03D33" stroke-width="1.5" stroke-opacity=".3" stroke-linecap="round"/><line x1="130" y1="103" x2="130" y2="158" stroke="#A03D33" stroke-width="2.5" stroke-linecap="round"/></svg>`,

  'psychiatry': `<svg viewBox="0 0 260 180" fill="none" xmlns="http://www.w3.org/2000/svg" style="max-width:220px;width:100%;display:block;margin:0 auto" aria-hidden="true"><rect x="20" y="5" width="220" height="170" rx="12" fill="#56657A" fill-opacity=".06"/><circle cx="130" cy="65" r="38" fill="#56657A" fill-opacity=".08" stroke="#56657A" stroke-width="2.5"/><path d="M104 61c0-16 12-28 26-28s26 12 26 28" stroke="#56657A" stroke-width="2" stroke-opacity=".5" stroke-linecap="round" fill="none"/><path d="M116 58c5-7 13-7 18 0" stroke="#56657A" stroke-width="1.5" stroke-opacity=".4" stroke-linecap="round" fill="none"/><circle cx="121" cy="65" r="3" fill="#56657A" fill-opacity=".3"/><circle cx="139" cy="65" r="3" fill="#56657A" fill-opacity=".3"/><path d="M122 78c5 6 11 6 16 0" stroke="#56657A" stroke-width="1.5" stroke-opacity=".4" stroke-linecap="round" fill="none"/><line x1="130" y1="103" x2="130" y2="155" stroke="#56657A" stroke-width="2.5" stroke-linecap="round"/><line x1="110" y1="132" x2="150" y2="132" stroke="#56657A" stroke-width="2" stroke-linecap="round"/></svg>`,

  'pulmonology': `<svg viewBox="0 0 260 180" fill="none" xmlns="http://www.w3.org/2000/svg" style="max-width:220px;width:100%;display:block;margin:0 auto" aria-hidden="true"><rect x="20" y="5" width="220" height="170" rx="12" fill="#3D6B8A" fill-opacity=".06"/><line x1="130" y1="22" x2="130" y2="70" stroke="#3D6B8A" stroke-width="2.5" stroke-linecap="round"/><path d="M130 75c-32 0-55 22-55 55s22 38 38 38c11 0 17-10 17-10s6 10 17 10c16 0 38-18 38-38s-23-55-55-55z" fill="#3D6B8A" fill-opacity=".08" stroke="#3D6B8A" stroke-width="2.5" stroke-linecap="round"/></svg>`,

  'rehabilitation': `<svg viewBox="0 0 260 180" fill="none" xmlns="http://www.w3.org/2000/svg" style="max-width:220px;width:100%;display:block;margin:0 auto" aria-hidden="true"><rect x="20" y="5" width="220" height="170" rx="12" fill="#2F6E52" fill-opacity=".06"/><circle cx="130" cy="40" r="20" fill="#2F6E52" fill-opacity=".1" stroke="#2F6E52" stroke-width="2.5"/><line x1="130" y1="60" x2="130" y2="112" stroke="#2F6E52" stroke-width="2.5" stroke-linecap="round"/><line x1="100" y1="80" x2="160" y2="80" stroke="#2F6E52" stroke-width="2.5" stroke-linecap="round"/><line x1="130" y1="112" x2="108" y2="152" stroke="#2F6E52" stroke-width="2.5" stroke-linecap="round"/><line x1="130" y1="112" x2="152" y2="152" stroke="#2F6E52" stroke-width="2.5" stroke-linecap="round"/></svg>`,

  'rheumatology': `<svg viewBox="0 0 260 180" fill="none" xmlns="http://www.w3.org/2000/svg" style="max-width:220px;width:100%;display:block;margin:0 auto" aria-hidden="true"><rect x="20" y="5" width="220" height="170" rx="12" fill="#8A6A28" fill-opacity=".06"/><path d="M130 30c-10 0-17 7-17 17v10c-10 5-17 14-17 25 0 16 14 30 34 30s34-14 34-30c0-11-7-20-17-25v-10c0-10-7-17-17-17z" fill="#8A6A28" fill-opacity=".1" stroke="#8A6A28" stroke-width="2.5"/><circle cx="130" cy="93" r="7" fill="#8A6A28" fill-opacity=".15" stroke="#8A6A28" stroke-width="1.5" stroke-opacity=".4"/><line x1="113" y1="93" x2="98" y2="93" stroke="#8A6A28" stroke-width="1.5" stroke-opacity=".4" stroke-linecap="round"/><line x1="147" y1="93" x2="162" y2="93" stroke="#8A6A28" stroke-width="1.5" stroke-opacity=".4" stroke-linecap="round"/><line x1="130" y1="76" x2="130" y2="61" stroke="#8A6A28" stroke-width="1.5" stroke-opacity=".4" stroke-linecap="round"/><line x1="130" y1="110" x2="130" y2="125" stroke="#8A6A28" stroke-width="1.5" stroke-opacity=".4" stroke-linecap="round"/></svg>`,

  'urology': `<svg viewBox="0 0 260 180" fill="none" xmlns="http://www.w3.org/2000/svg" style="max-width:220px;width:100%;display:block;margin:0 auto" aria-hidden="true"><rect x="20" y="5" width="220" height="170" rx="12" fill="#3D6B8A" fill-opacity=".06"/><path d="M95 45c-16 22-16 55 0 75 12 14 28 22 32 22s20-8 32-22c16-20 16-53 0-75" fill="#3D6B8A" fill-opacity=".08" stroke="#3D6B8A" stroke-width="2.5" stroke-linecap="round"/><line x1="108" y1="45" x2="148" y2="45" stroke="#3D6B8A" stroke-width="2.5" stroke-linecap="round"/><line x1="130" y1="45" x2="130" y2="25" stroke="#3D6B8A" stroke-width="2.5" stroke-linecap="round"/></svg>`,

  'vascular-surgery': `<svg viewBox="0 0 260 180" fill="none" xmlns="http://www.w3.org/2000/svg" style="max-width:220px;width:100%;display:block;margin:0 auto" aria-hidden="true"><rect x="20" y="5" width="220" height="170" rx="12" fill="#A03D33" fill-opacity=".06"/><line x1="130" y1="20" x2="130" y2="160" stroke="#A03D33" stroke-width="2.5" stroke-linecap="round"/><path d="M130 42c-22 0-38 12-38 28s16 22 38 22" fill="#A03D33" fill-opacity=".06" stroke="#A03D33" stroke-width="2.5" stroke-linecap="round"/><path d="M130 42c22 0 38 12 38 28s-16 22-38 22" fill="#A03D33" fill-opacity=".06" stroke="#A03D33" stroke-width="2.5" stroke-linecap="round"/><path d="M130 95c-16 0-28 10-28 20s12 16 28 16" fill="#A03D33" fill-opacity=".06" stroke="#A03D33" stroke-width="2" stroke-linecap="round"/><path d="M130 95c16 0 28 10 28 20s-12 16-28 16" fill="#A03D33" fill-opacity=".06" stroke="#A03D33" stroke-width="2" stroke-linecap="round"/></svg>`
};

const dir = path.join(__dirname, '..', 'data', 'pages');
const files = fs.readdirSync(dir).filter(f => f.startsWith('treatments-') && f.endsWith('.json'));

let updated = 0;
let removed = 0;

for (const file of files) {
  const slug = file.replace('treatments-', '').replace('.json', '');
  const filePath = path.join(dir, file);
  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  
  // Remove old illustration if present
  let body = data.body;
  const oldIdx = body.indexOf('trt-hero-img');
  if (oldIdx > 0) {
    // Find the opening <div before trt-hero-img
    const divStart = body.lastIndexOf('<div', oldIdx);
    // Find matching </div>
    let depth = 1;
    let pos = body.indexOf('>', divStart) + 1;
    while (depth > 0 && pos < body.length) {
      if (body.substring(pos, pos + 4) === '<div') depth++;
      if (body.substring(pos, pos + 6) === '</div>') depth--;
      pos++;
    }
    body = body.slice(0, divStart) + body.slice(pos);
    removed++;
  }
  
  // Add new illustration if we have one
  const svg = illustrations[slug];
  if (!svg) {
    console.log(`SKIP (no illustration): ${slug}`);
    data.body = body;
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
    continue;
  }
  
  // Find insertion point: after hero__note </p> or after btns </div>
  const heroStart = body.indexOf('<section class="hero">');
  if (heroStart === -1) {
    console.log(`SKIP (no hero): ${slug}`);
    data.body = body;
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
    continue;
  }
  
  let insertIdx = -1;
  const heroNoteIdx = body.indexOf('hero__note', heroStart);
  if (heroNoteIdx > heroStart) {
    const noteEnd = body.indexOf('</p>', heroNoteIdx);
    if (noteEnd > heroNoteIdx) insertIdx = noteEnd + 4;
  }
  
  if (insertIdx === -1) {
    const btnsIdx = body.indexOf('btns', heroStart);
    if (btnsIdx > heroStart) {
      const btnsEnd = body.indexOf('</div>', btnsIdx);
      if (btnsEnd > btnsIdx) insertIdx = btnsEnd + 6;
    }
  }
  
  if (insertIdx === -1) {
    const firstDivClose = body.indexOf('</div>', heroStart);
    if (firstDivClose > heroStart) insertIdx = firstDivClose + 6;
  }
  
  if (insertIdx === -1) {
    console.log(`SKIP (no insert point): ${slug}`);
    data.body = body;
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
    continue;
  }
  
  const illustrationHTML = `\n    <div class="trt-hero-img" style="margin-block-start:28px">${svg}</div>`;
  body = body.slice(0, insertIdx) + illustrationHTML + body.slice(insertIdx);
  
  data.body = body;
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
  console.log(`UPDATED: ${slug}`);
  updated++;
}

console.log(`\nDone: ${updated} updated, ${removed} old removed`);
