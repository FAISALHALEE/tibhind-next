import type { Page } from "./pages";

const HEADER_LOGO =
  '<img src="/tib-hind-logo-light.png" alt="TIB HIND" class="site-logo site-logo--header" width="160" height="79" decoding="async" />';
const FOOTER_LOGO =
  '<img src="/tib-hind-logo-reversed.png" alt="TIB HIND" class="site-logo site-logo--footer" width="160" height="79" decoding="async" />';

function replaceMarks(html: string): string {
  const textMark = "TIB<span>\u00b7</span>HIND";
  const markRe = new RegExp(
    '<a [^>]*class="mark"[^>]*>' + textMark + "</a>",
    "g"
  );

  let ordinal = 0;
  return html.replace(markRe, (match) => {
    ordinal++;
    const logo = ordinal === 1 ? HEADER_LOGO : FOOTER_LOGO;
    return match.replace(textMark, logo);
  });
}

const LOGO_CSS = `.site-logo{height:auto;max-width:100%;object-fit:contain;display:block}.site-logo--header{height:clamp(44px,7vw,68px);width:auto}.site-logo--footer{height:clamp(36px,5.5vw,52px);width:auto}`;

export default function PageHTML({ page }: { page: Page }) {
  const bodyHtml =
    (page.headScripts ? `<script>${page.headScripts}</script>` : "") +
    replaceMarks(page.body);
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: LOGO_CSS }} />
      {page.styles.map((css, i) => (
        <style key={i} dangerouslySetInnerHTML={{ __html: css }} />
      ))}
      {page.jsonLd.map((json, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: json }}
        />
      ))}
      <div dangerouslySetInnerHTML={{ __html: bodyHtml }} suppressHydrationWarning />
    </>
  );
}
