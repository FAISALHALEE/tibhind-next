import type { Page } from "./pages";

function fixSvgDimensions(html: string): string {
 return html.replace(
   /<svg(?![^>]*\swidth=)([^>]*?)(viewBox="[^"]*")([^>]*)>/gi,
   (_match, before: string, vb: string, after: string) => {
     const m = vb.match(/viewBox="[\d.]+\s+[\d.]+\s+([\d.]+)\s+([\d.]+)"/i);
     if (!m) return `<svg${before}${vb}${after}>`;
     const w = Math.round(Number(m[1]));
     const h = Math.round(Number(m[2]));
     if (!w || !h) return `<svg${before}${vb}${after}>`;
     return `<svg width="${w}" height="${h}"${before}${vb}${after}>`;
   }
 );
}

const MEGA_CSS = `.nav__item{position:relative}.nav__top{color:var(--ink);cursor:pointer;background:0 0;border:0;border-radius:3px;align-items:center;gap:6px;padding:9px 13px;font-family:inherit;font-size:15.5px;text-decoration:none;transition:background .2s,color .2s;display:flex}.nav__top:hover,.nav__item:focus-within .nav__top{background:var(--tone);color:var(--seal)}.nav__top svg{stroke:currentColor;fill:none;stroke-width:2px;width:11px;height:11px;transition:transform .25s}.nav__item:hover .nav__top svg,.nav__item:focus-within .nav__top svg{transform:rotate(180deg)}.mega{border:1px solid var(--rule);opacity:0;visibility:hidden;z-index:70;background:#fff;padding:26px;transition:opacity .2s,transform .24s,visibility .2s;position:absolute;inset-block-start:calc(100% + 8px);inset-inline-start:50%;transform:translate(-50%)translateY(-6px);box-shadow:0 26px 60px -34px #12332c80}.nav__item:hover .mega,.nav__item:focus-within .mega{opacity:1;visibility:visible;transform:translate(-50%)translateY(0)}.mega:before{content:"";height:12px;position:absolute;inset-block-end:100%;inset-inline:0}.mega__grid{gap:26px;display:grid}.mega--wide .mega__grid{grid-template-columns:repeat(3,minmax(210px,1fr));width:min(88vw,760px)}.mega--mid .mega__grid{grid-template-columns:repeat(2,minmax(210px,1fr));width:min(80vw,520px)}.mega--single .mega__grid{grid-template-columns:1fr;width:min(86vw,380px)}.mega__k{font:10px var(--data);letter-spacing:.16em;text-transform:uppercase;color:var(--muted);border-bottom:1px solid var(--rule);margin-block-end:11px;padding-block-end:8px;display:block}.mega a{border-radius:3px;align-items:flex-start;gap:11px;margin-inline:-9px;padding:8px 9px;text-decoration:none;transition:background .18s;display:flex;position:relative}.mega a:hover{background:var(--c,var(--seal))}@supports(color:color-mix(in lab,red,red)){.mega a:hover{background:color-mix(in srgb,var(--c,var(--seal)) 8%,transparent)}} .mega__ic{border-radius:3px;flex:0 0 28px;place-items:center;width:28px;height:28px;margin-block-start:1px;display:grid;position:relative;overflow:hidden} .mega__ic:before{content:"";background:var(--c,var(--seal));opacity:.12;position:absolute;inset:0} .mega__ic svg{width:15px;height:15px;stroke:var(--c,var(--seal));fill:none;stroke-width:1.7px;stroke-linecap:round;stroke-linejoin:round;position:relative}.nav__item .mega__ic,.nav__item .mega__ic svg{opacity:0;transition:opacity .15s}.nav__item:hover .mega__ic,.nav__item:focus-within .mega__ic,.nav__item:hover .mega__ic svg,.nav__item:focus-within .mega__ic svg{opacity:1}.mega__t{color:var(--ink);font-size:15px;line-height:1.3;display:block}.mega__d{color:var(--muted);margin-block-start:2px;font-size:12.5px;line-height:1.4;display:block}.mega__foot{border-top:1px solid var(--rule);flex-wrap:wrap;grid-column:1/-1;justify-content:space-between;align-items:center;gap:16px;margin-block-start:6px;padding-block-start:16px;display:flex}.mega__note{color:var(--muted);max-width:46ch;margin:0;font-size:13px}.mega .mega__all{font:11px var(--data);letter-spacing:.1em;text-transform:uppercase;color:var(--seal);white-space:nowrap;margin:0;padding:0;text-decoration:none}.navtoggle,.burger{display:none}.burger{border:1px solid var(--rule);cursor:pointer;background:0 0;border-radius:3px;margin-inline-start:auto;padding:9px 11px}.burger svg{width:18px;height:18px;stroke:var(--ink);fill:none;stroke-width:1.8px;stroke-linecap:round}.navtoggle:checked~.nav{transform:none}@media(width<=1080px){.burger{display:block}.nav{background:var(--paper);position:fixed;inset-block:0;inset-inline-end:0;width:min(90vw,380px);transform:translate(105%);z-index:80;padding:90px 28px 28px;overflow-y:auto;transition:transform .3s}.navtoggle:checked~.nav{transform:none}.nav__item{border-bottom:1px dotted var(--rule)}.nav__top{justify-content:space-between;width:100%;padding:15px 4px;font-size:17px}.mega{opacity:1;visibility:visible;box-shadow:none;background:0 0;border:0;max-height:0;padding:0 0 12px;transition:max-height .3s;position:static;overflow:hidden;transform:none}.nav__item:hover .mega,.nav__item:focus-within .mega{max-height:1500px;transform:none}.mega--wide .mega__grid,.mega--mid .mega__grid,.mega--single .mega__grid{grid-template-columns:1fr;gap:18px;width:auto}.nav a{display:flex}}.emerg{background:#8E2F26;color:#fff;border-block-end:1px solid #6E241D}.emerg__in{display:flex;gap:14px;align-items:flex-start;padding-block:14px}.emerg svg{flex:0 0 20px;width:20px;height:20px;margin-block-start:2px;stroke:#fff;fill:none;stroke-width:1.8}.emerg p{margin:0;font-size:14.5px;line-height:1.55;color:#FBEDEB}.emerg b{color:#fff;font-weight:600}`;

export default function PageHTML({ page }: { page: Page }) {
 const bodyHtml =
 (page.headScripts ? `<script>${page.headScripts}</script>` : "") +
 fixSvgDimensions(page.body);
 return (
 <>
 {page.styles.map((css, i) => (
 <style key={i} dangerouslySetInnerHTML={{ __html: css }} />
 ))}
 <style dangerouslySetInnerHTML={{ __html: MEGA_CSS }} />
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
