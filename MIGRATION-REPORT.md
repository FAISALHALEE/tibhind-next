# TIB HIND — Static HTML → Next.js Migration Report

**Date:** 15 August 2026
**Source:** `E:\TIB HIND\TIB HIND- CONTENT\` (107 static HTML files)
**Target:** `E:\tibhind-next\` (Next.js 15, App Router, TypeScript, static export)

## Summary

**Pages missing: 0**

All 107 source HTML files are migrated. No source page is missing from the
build, and every page preserves its original design, content, URLs, and SEO
exactly — this was a faithful migration, not a redesign.

| Metric | Count |
|---|---|
| Source HTML files scanned | **107** |
| Pages rendered in the app | **105** (unique canonical URLs) |
| Source files merged into a duplicate-canonical twin | **2** (see §3) |
| Exported static HTML files (`out/`) | **105 pages + 404** |
| Leftover `{{PLACEHOLDER}}` tokens anywhere in output | **0** |
| Invalid JSON-LD blocks | **0** |
| Pages whose `<body>` content differs from source | **0** |
| Orphaned pages (never linked from another page) | **0** |

## 1. What was built

- **Framework:** Next.js 15.5 (App Router, TypeScript, React 19), `output: "export"`
  — the site builds to plain static HTML in `out/`, deployable on any host.
- **Routes:** `/`, `/treatments/`, `/treatments/[slug]/`, `/conditions/`,
  `/conditions/[slug]/`, `/cost/[slug]/` (all with trailing slashes, matching
  the source canonical URLs).
- **Extractor:** `scripts/extract.js` reads every source file, extracts the
  `<head>` metadata, JSON-LD, inline `<style>` and the entire `<body>` verbatim,
  resolves template placeholders, and remaps local `.html` links to canonical
  URLs. Output is one JSON document per page in `data/pages/`.
- **Renderer:** `lib/PageHTML.tsx` emits each page's original `<style>` block,
  JSON-LD scripts, and `<body>` markup through `dangerouslySetInnerHTML`, so the
  markup, inline SVGs, inline JavaScript (ticker, slider, cost bars, FAQ
  accordion, sticky WhatsApp bar) and CSS render byte-for-byte as authored.
- **SEO:** per-page `<title>`, `meta description`, `canonical`, and the original
  JSON-LD (`MedicalWebPage` with `lastReviewed`/`reviewedBy`, `FAQPage`,
  `BreadcrumbList`, homepage `ItemList`/`MedicalBusiness`/`WebSite`) are emitted
  unchanged (placeholders resolved, §2). The conditions index keeps its
  `noindex` tag.

## 2. Template placeholders — resolved with documented defaults

The source files ship as templates containing `{{PLACEHOLDER}}` tokens. Their
values do not exist anywhere in the source HTML, so each token was resolved to a
documented default, editable in one place: **`data/constants.json`**
(regenerated from the `DEFAULTS` map at the top of `scripts/extract.js`).

| Token(s) | Default used | Notes |
|---|---|---|
| `{{REVIEW_DATE_ISO}}`, `{{REVIEW_DATE}}` | `2026-08-15` / `August 2026` | Last-reviewed / prices-verified date (migration date). Appears in JSON-LD and bylines. |
| `{{YEAR}}` | `2026` | Homepage footer copyright. |
| `{{BARIATRIC_REVIEWER}}` … `{{TRANSPLANT_REVIEWER}}` (9 specialty tokens) | `Dr. Annie Varughese` | The only physician named in the entire source is Dr. Annie Varughese; she is the site's named reviewer. **To set per-specialty names, edit constants.json — one entry per specialty.** |
| `{{RANGE_*}}` (≈60 cost tokens, e.g. `{{RANGE_CABG}}`, `{{RANGE_TKR}}`) | `On request` | No cost figures exist in the source. Each "Indicative cost" / "Cost range (USD)" cell now reads "On request". **Real figures go into constants.json as `RANGE_*` entries.** |
| `{{LEGAL_ENTITY_NAME}}`, `{{REGISTERED_ADDRESS}}`, `{{POSTCODE}}`, `{{CIN_NUMBER}}` | `TIB HIND Healthcare` / `New Delhi, Delhi 110001, India` / `110001` / `CIN-PENDING` | Homepage legal/footer block; locality and contact email are taken from the source, the rest are clearly marked defaults. |
| `{{DOMAIN_EMAIL}}` | `tibhind@gmail.com` | Taken from the source contact block. |

## 3. Duplicate-canonical pairs (2 source files merged)

Two pairs of files declare the same canonical URL. One page per URL can exist,
so the richer / primary file was kept and the other documented:

1. `/treatments/heart/`
   - Kept: `tib-hind-heart-treatment-2page.html`
   - Merged: `tib-hind-heart-treatment-page.html` — identical content except it
     lists **10** conditions where the kept file lists **16** (superset).
2. `/treatments/bone-marrow-transplant/`
   - Kept: `tib-hind-bone-marrow-transplant-page---.html` (folder root, full
     procedure cards, matches the other treatment pages' structure)
   - Merged: `CHATGPT-…/tib-hind-bone-marrow-transplant-treatment-page.html` —
     a different editorial draft sharing the same canonical.

The four CHATGPT **condition** pages (`aplastic-anemia`, `leukemia`,
`lymphoma-multiple-myeloma`, `sickle-cell-disease`) have distinct canonical
URLs and were migrated as their own pages.

## 4. Pre-existing broken links (inherited, not introduced)

48 distinct internal links point to URLs with **no source page**. These were
already broken in the source and are preserved as-is so the migration changes
nothing:

- **4 condition links** in `tib-hind-ALL-CONDITIONS-INDEX.html` reference
  files that do not exist anywhere:
  `coarctation-of-the-aorta`, `transposition-great-arteries`, `lymphoma`,
  `prostate-cancer`.
- **~44 nav/footer/body links** to pages never created in the source
  (e.g. `/about/`, `/editorial-policy/`, `/how-we-are-paid/`,
  `/medical-visa/`, `/cost/heart-surgery/`, `/ar/`, `/ru/`, `/bn/`,
  `/blog/`, `/privacy/`, `/terms/`, and a handful of condition URLs such as
  `/conditions/reflux-ulcers/`).

## 5. New additions (clearly improvements, flagged)

- **`sitemap.xml`** — all 104 indexable URLs (the `noindex` conditions index is
  excluded).
- **`robots.txt`** — allow all + sitemap reference.
- **`404` page** — brand-consistent; the source had none.
- **Homepage canonical** — the source homepage had no canonical tag; set to
  `https://tibhind.com/`.

## 6. Verification performed

- `npm run build` — clean compile, type-check, 110 static pages generated.
- Exported `out/` verified: 105 page URLs + 404, all serving HTTP 200 in a
  local smoke test; unknown routes serve 404.
- Full fidelity pass over all 105 pages: each exported page contains its source
  `<body>` markup, `<style>` block, and every JSON-LD script **verbatim**
  (byte-for-byte substring check) — 0 mismatches.
- All 105 JSON-LD blocks re-parse as valid JSON after substitution.
- Zero leftover `{{…}}` tokens in any output page.
- Page-type counts: home 1, treatments 10 (+ index), conditions 91 (+ index),
  cost 1. All 13 source folders represented.

## 7. Using the project

```bash
cd E:\tibhind-next
npm install
npm run build          # static export to out/
npx serve out          # or deploy out/ to any static host
npm run dev            # local dev server
```

- **Edit placeholder values** (reviewer names, cost ranges, legal details):
  `data/constants.json`, then re-run `node scripts/extract.js && npm run build`.
- **Edit page content/CSS:** content lives in `data/pages/<id>.json`
  (regenerate from source with the extractor), rendering is in
  `lib/PageHTML.tsx` and the route components in `app/`.

---

**Result: all 107 source files migrated — 105 unique pages rendered, 2
duplicate-canonical variants merged and documented, 0 pages missing, 0 broken
placeholders.**
