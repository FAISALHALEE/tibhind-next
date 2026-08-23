const fs = require("fs");
const path = require("path");

const EXT = "https://tib-hind-hospitals.irfanhaleemsidz.chatgpt.site";
let h = fs.readFileSync(path.join(__dirname, "..", "new changes", "tib-hind-latest-homepage.html"), "utf8");

// 1. rewrite staging domain to relative
h = h.split(EXT).join("");

// 2. extract JSON-LD scripts
const jsonLd = [];
h = h.replace(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g, (_, json) => {
  jsonLd.push(json.trim());
  return "";
});

// 3. remove standalone-note banner
h = h.replace(/<div class="standalone-note">[\s\S]*?<\/div>/, "");

// 4. extract style blocks
const styles = [];
h = h.replace(/<style>([\s\S]*?)<\/style>/g, (_, css) => {
  styles.push(css.trim());
  return "";
});

// 5. isolate body inner html
const bodyInner = h.slice(h.indexOf("<body>") + 6, h.lastIndexOf("</body>")).trim();

// 6. metadata from the new file
const title = (h.match(/<title>([^<]*)<\/title>/) || [])[1];
const description = (h.match(/<meta name="description" content="([^"]*)"/) || [])[1];

// 7. site-wide consistency: social icons in .foot__lang
const soc =
  '<span class="foot__soc"><a href="https://www.youtube.com/@tibhindofficial" target="_blank" rel="noopener" class="soc-yt" aria-label="YouTube" title="YouTube"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg></a><a href="https://www.instagram.com/tibhindofficial/" target="_blank" rel="noopener" class="soc-ig" aria-label="Instagram" title="Instagram"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z"/></svg></a><a href="https://www.facebook.com/tibhindofficial" target="_blank" rel="noopener" class="soc-fb" aria-label="Facebook" title="Facebook"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg></a><a href="https://x.com/tibhindofficial" target="_blank" rel="noopener" class="soc-x" aria-label="X (Twitter)" title="X (Twitter)"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z"/></svg></a></span>';
const bnAnchor = '<a href="/bn/" lang="bn" hrefLang="bn">বাংলা</a>';
if (!bodyInner.includes(bnAnchor)) throw new Error("BN anchor not found in new body");
let body = bodyInner.replace(bnAnchor, bnAnchor + "\n      " + soc);

const socCss = [
  ".foot__soc{display:flex;align-items:center;gap:10px;margin-inline-start:auto}",
  ".foot__soc a{display:inline-flex;align-items:center;justify-content:center;width:34px;height:34px;border-radius:8px;color:#fff;transition:transform .18s ease,filter .18s ease}",
  ".foot__soc a:hover{transform:translateY(-2px);filter:brightness(.9)}",
  ".foot__soc svg{width:18px;height:18px;fill:currentColor}",
  ".foot__soc a.soc-yt{background:#F00}",
  ".foot__soc a.soc-fb{background:#1877F2}",
  '.foot__soc a.soc-ig{background:radial-gradient(circle at 30% 107%,#fdf497 0%,#fdf497 5%,#fd5949 45%,#d6249f 60%,#285AEB 90%)}',
  ".foot__soc a.soc-x{background:#000;border:1px solid rgba(255,255,255,.3)}",
].join("\n");
const discSvgRule = ".disc__i svg{flex:0 0 17px;width:17px;height:17px;margin-block-start:2px;stroke:var(--seal);fill:none;stroke-width:1.7;stroke-linecap:round;stroke-linejoin:round}";
styles[0] += "\n" + socCss + "\n" + discSvgRule;

// 8. assemble home.json
const page = {
  id: "home",
  route: "/",
  canonical: "https://tibhind.com/",
  title: title || "Medical Treatment in India | TIB HIND",
  description: description || "",
  robots: null,
  styles,
  jsonLd,
  headScripts: 'document.documentElement.classList.add("js");',
  body,
  source: "tib-hind-latest-homepage.html",
};

fs.writeFileSync(path.join(__dirname, "..", "data", "pages", "home.json"), JSON.stringify(page, null, 2) + "\n");
console.log("home.json rewritten | styles:", styles.length, "| jsonLd:", jsonLd.length, "| body:", body.length);
