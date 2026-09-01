import type { Page } from "./pages";
import { SITE_HEADER } from "./SiteHeader";

function useSharedHeader(html: string): string {
  if (/<header[\s>]/.test(html)) {
    return html.replace(/<header[\s\S]*?<\/header>/, SITE_HEADER);
  }
  return SITE_HEADER + html;
}

function injectHeaderContact(html: string): string {
  const button =
    `<a class="btn btn--ct" href="/contact/" title="Contact TIB HIND">` +
    `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 5h16v11H8l-4 4z"/><path d="M8 9h8M8 12.5h5"/></svg>` +
    `<span>Contact Us</span></a>`;
  return html.replace(/<a class="btn btn--wa"[^>]*>WhatsApp<\/a>/, (match) => match + button);
}

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

const SHARED_CHROME_CSS = [
  `.wrap{max-width:var(--wrap);margin:auto;padding-inline:24px}`,
  `.top{z-index:60;background:var(--paper);border-bottom:1px solid var(--rule);-webkit-backdrop-filter:none;backdrop-filter:none;position:sticky;top:0}`,
  `.top__in{height:auto;align-items:center;gap:24px;min-height:70px;padding-block:15px;display:flex}`,
  `.top .wrap{max-width:1260px}`,
  `.top .mark{font-family:var(--display);letter-spacing:.02em;color:var(--ink);white-space:nowrap;font-size:22px;text-decoration:none}`,
  `.top .mark span{color:var(--seal);padding-inline:2px}`,
  `.top .mark img{height:114px;width:auto}`,
  `.nav{align-items:center;gap:2px;margin-inline-start:auto;display:flex}`,
  `.nav__item{flex:none}`,
  `.langs{background:var(--rule);border:1px solid var(--rule);border-radius:3px;gap:1px;margin-inline-start:10px;display:flex;overflow:hidden}`,
  `.langs a{background:var(--paper);font:11.5px var(--data);color:var(--muted);padding:6px 10px;text-decoration:none}`,
  `.langs a:hover{color:var(--ink);background:#fff}`,
  `.langs a[aria-current]{background:var(--ink);color:var(--paper)}`,
  `.btn--wa{white-space:nowrap;background:var(--verified);color:#fff;margin-inline-start:10px;padding:9px 16px;font-size:14px}`,
  `.btn--wa:hover{background:var(--ink)}`,
  `.btn--ct,.btn--ct:visited{white-space:nowrap;background:var(--verified);color:#fff;margin-inline-start:10px;padding:9px 16px;font-size:14px;gap:8px;flex:none}`,
  `.btn--ct svg{width:16px;height:16px;fill:none;stroke:currentColor;stroke-width:1.8;stroke-linecap:round;stroke-linejoin:round;flex:none}`,
  `.btn--ct:hover{background:var(--ink)}`,
  `.navtoggle,.burger{display:none}`,
  `.burger{border:1px solid var(--rule);cursor:pointer;background:0 0;border-radius:3px;margin-inline-start:auto;padding:9px 11px}`,
  `.burger svg{width:18px;height:18px;stroke:var(--ink);fill:none;stroke-width:1.8px;stroke-linecap:round}`,
  `.foot{background:var(--ink);color:#c9d6d1;margin:0;padding:46px 0 0}`,
  `.foot a{color:#c9d6d1;text-decoration:none;transition:color .2s}`,
  `.foot a:hover{color:#fff}`,
  `.foot__top{grid-template-columns:1.3fr repeat(4,1fr);gap:28px;padding-bottom:38px;display:grid}`,
  `.foot__top>div:not(.foot__id){padding-top:32px;margin-inline-start:34px}`,
  `.foot__id .mark{font-family:var(--display);color:#fff;font-size:24px;line-height:1;text-decoration:none;display:inline-block}`,
  `.foot__id .mark span{color:var(--seal)}`,
  `.foot__id .mark img{height:auto !important;width:auto !important;max-width:100%;max-height:192px;display:block}`,
  `.foot__tag{color:#9fb2ac;max-width:32ch;margin:12px 0 20px;font-size:14px;line-height:1.55}`,
  `.foot h4{font:10.5px var(--data);letter-spacing:.16em;text-transform:uppercase;color:#7b918b;margin:0 0 14px;font-weight:500}`,
  `.foot ul{margin:0;padding:0;list-style:none}`,
  `.foot li{margin-bottom:7px}`,
  `.foot li a{font-size:14.5px;line-height:1.4}`,
  `.nap{color:#9fb2ac;margin:0;font-size:13.5px;line-height:1.55}`,
  `.nap b{color:#fff;margin-bottom:3px;font-weight:600;display:block}`,
  `.nap dl{grid-template-columns:auto 1fr;gap:3px 12px;margin:12px 0 0;display:grid}`,
  `.nap dt{font:10px var(--data);letter-spacing:.14em;text-transform:uppercase;color:#7b918b;padding-top:3px}`,
  `.nap dd{color:#c9d6d1;margin:0}`,
  `.nap dd a{border-bottom:1px solid #ffffff38}`,
  `.foot__lang{border-top:1px solid #ffffff1c;flex-wrap:wrap;align-items:center;gap:10px 14px;padding-block:18px;display:flex}`,
  `.foot__lang span{font:10px var(--data);letter-spacing:.15em;text-transform:uppercase;color:#7b918b}`,
  `.foot__lang a{border:1px solid #ffffff29;border-radius:3px;padding:5px 12px;font-size:14.5px}`,
  `.foot__lang a[aria-current]{background:var(--paper);color:var(--ink);border-color:var(--paper)}`,
  `.foot__soc{display:flex;align-items:center;gap:10px;margin-inline-start:auto}`,
  `.foot__soc a{display:inline-flex;align-items:center;justify-content:center;width:36px;height:36px;border-radius:8px;color:#fff;transition:transform .18s ease,filter .18s ease}`,
  `.foot__soc a:hover{transform:translateY(-2px);filter:brightness(.9)}`,
  `.foot__soc a svg{width:20px;height:20px;fill:currentColor}`,
  `.foot__soc a.soc-yt{background:#ff0000}`,
  `.foot__soc a.soc-fb{background:#1877f2}`,
  `.foot__soc a.soc-ig{background:radial-gradient(circle at 30% 107%,#fdf497 0%,#fdf497 5%,#fd5949 45%,#d6249f 60%,#285aeb 90%)}`,
  `.foot__soc a.soc-x{background:#000;border:1px solid rgba(255,255,255,.3)}`,
  `.foot__soc a.soc-li{background:#0a66c2}`,
  `.foot__soc a.soc-tt{background:#000;border:1px solid rgba(255,255,255,.3)}`,
  `.foot__soc a.soc-sc{background:#fffc00}`,
  `.foot__soc a.soc-sc svg{fill:#000}`,
  `.foot__legal{border-top:1px solid #ffffff1c;flex-wrap:wrap;align-items:center;gap:8px 20px;padding-block:20px;display:flex}`,
  `.foot__legal a{color:#9fb2ac;font-size:13.5px}`,
  `.disc{border-top:1px solid #ffffff1c;padding-block:24px 30px}`,
  `.disc__grid{grid-template-columns:repeat(auto-fit,minmax(250px,1fr));gap:24px;margin-bottom:22px;display:grid}`,
  `.disc__i{align-items:flex-start;gap:12px;display:flex}`,
  `.disc__icon{width:17px;height:17px;color:var(--seal);font:16px/1 var(--data);flex:0 0 17px;margin-top:2px}`,
  `.disc__i svg{flex:0 0 17px;width:17px;height:17px;margin-block-start:2px;stroke:var(--seal);fill:none;stroke-width:1.7;stroke-linecap:round;stroke-linejoin:round}`,
  `.disc__i b{color:#fff;margin-bottom:4px;font-size:13.5px;font-weight:600;display:block}`,
  `.disc__i p{color:#9fb2ac;margin:0;font-size:13px;line-height:1.55}`,
  `.disc__copy{color:#7b918b;max-width:100ch;margin:0;font-size:13px;line-height:1.6}`,
  `.disc__copy strong{color:#9fb2ac;font-weight:500}`,
  `@media(width<=1080px){.burger{display:block}.nav{background:var(--paper);border-inline-start:1px solid var(--rule);flex-direction:column;align-items:stretch;gap:0;width:min(90vw,380px);margin:0;padding:74px 22px 30px;transition:transform .32s cubic-bezier(.4,0,.2,1);position:fixed;inset-block:0;inset-inline-end:0;transform:translateX(100%);z-index:80;overflow-y:auto}.navtoggle:checked~.nav{transform:none}.nav__item{border-bottom:1px dotted var(--rule)}.nav__top{justify-content:space-between;width:100%;padding:15px 4px;font-size:17px}.mega{opacity:1;visibility:visible;box-shadow:none;background:0 0;border:0;max-height:0;padding:0 0 12px;transition:max-height .3s;position:static;overflow:hidden;transform:none}.nav__item:hover .mega,.nav__item:focus-within .mega{max-height:1500px;transform:none}.mega--wide .mega__grid,.mega--mid .mega__grid,.mega--single .mega__grid{grid-template-columns:1fr;gap:18px;width:auto}.nav a{display:flex}.langs{display:flex!important;margin:18px 0 0}.btn--wa{text-align:center;margin:14px 0 0;display:inline-flex!important}.btn--ct{text-align:center;margin:14px 0 0;display:inline-flex!important}}`,
  `@media(width<=1000px){.foot__top{grid-template-columns:1fr 1fr;gap:24px}.foot__id{grid-column:1/-1}.foot__tag{max-width:none}}`,
  `@media(width<=680px){.foot__lang,.foot__legal{gap:8px 12px}}`,
  `@media(width<=600px){.foot__top{grid-template-columns:1fr;gap:30px}}`,
  `@media(prefers-reduced-motion:reduce){.mega{transition:opacity 10ms}}`,
].join("");

const MEGA_CSS = [
  `.nav__item{position:relative}`,
  `.nav__top{color:var(--ink);cursor:pointer;background:0 0;border:0;border-radius:3px;align-items:center;gap:6px;padding:9px 11px;font-family:inherit;font-size:15.5px;text-decoration:none;transition:background .2s,color .2s;display:flex;white-space:nowrap}`,
  `.nav__top:hover,.nav__item:focus-within .nav__top{background:var(--tone);color:var(--seal)}`,
  `.nav__top svg{stroke:currentColor;fill:none;stroke-width:2px;width:11px;height:11px;transition:transform .25s}`,
  `.nav__item:hover .nav__top svg,.nav__item:focus-within .nav__top svg{transform:rotate(180deg)}`,
  `.mega{border:1px solid var(--rule);opacity:0;visibility:hidden;z-index:70;background:#fff;padding:26px;transition:opacity .2s,transform .24s,visibility .2s;position:absolute;inset-block-start:calc(100% + 8px);inset-inline-start:50%;transform:translate(-50%)translateY(-6px);box-shadow:0 26px 60px -34px #12332c80}`,
  `.nav__item:hover .mega,.nav__item:focus-within .mega{opacity:1;visibility:visible;transform:translate(-50%)translateY(0)}`,
  `.mega:before{content:"";height:12px;position:absolute;inset-block-end:100%;inset-inline:0}`,
  `.mega__grid{gap:26px;display:grid}`,
  `.mega--wide .mega__grid{grid-template-columns:repeat(3,minmax(210px,1fr));width:min(88vw,760px)}`,
  `.mega--mid .mega__grid{grid-template-columns:repeat(2,minmax(210px,1fr));width:min(80vw,520px)}`,
  `.mega--single .mega__grid{grid-template-columns:1fr;width:min(86vw,380px)}`,
  `.mega__k{font:10px var(--data);letter-spacing:.16em;text-transform:uppercase;color:var(--muted);border-bottom:1px solid var(--rule);margin-block-end:11px;padding-block-end:8px;display:block}`,
  `.mega a{border-radius:3px;align-items:flex-start;gap:11px;margin-inline:-9px;padding:8px 9px;text-decoration:none;transition:background .18s;display:flex;position:relative}`,
  `.mega a:hover{background:var(--c,var(--seal))}`,
  `@supports(color:color-mix(in lab,red,red)){.mega a:hover{background:color-mix(in srgb,var(--c,var(--seal)) 8%,transparent)}}`,
  `.mega__ic{border-radius:3px;flex:0 0 28px;place-items:center;width:28px;height:28px;margin-block-start:1px;display:grid;position:relative;overflow:hidden}`,
  `.mega__ic:before{content:"";background:var(--c,var(--seal));opacity:.12;position:absolute;inset:0}`,
  `.mega__ic svg{width:15px;height:15px;stroke:var(--c,var(--seal));fill:none;stroke-width:1.7px;stroke-linecap:round;stroke-linejoin:round;position:relative}`,
  `.mega__t{color:var(--ink);font-size:15px;line-height:1.3;display:block}`,
  `.mega__d{color:var(--muted);margin-block-start:2px;font-size:12.5px;line-height:1.4;display:block}`,
  `.mega__foot{border-top:1px solid var(--rule);flex-wrap:wrap;grid-column:1/-1;justify-content:space-between;align-items:center;gap:16px;margin-block-start:6px;padding-block-start:16px;display:flex}`,
  `.mega__note{color:var(--muted);max-width:46ch;margin:0;font-size:13px}`,
  `.mega .mega__all{font:11px var(--data);letter-spacing:.1em;text-transform:uppercase;color:var(--seal);white-space:nowrap;margin:0;padding:0;text-decoration:none}`,
  `.mega .mega__all:hover{color:var(--ink)}`,
].join("");

const TREATMENT_CONTENT_CSS = [
  `h1,h2,h3{font-family:var(--display);letter-spacing:-.015em;margin:0;font-weight:400}`,
  `h1{font-size:clamp(42px,6vw,68px);line-height:1.02}`,
  `h2{margin-bottom:.55em;font-size:clamp(30px,4vw,44px);line-height:1.13}`,
  `h3{font-size:22px;line-height:1.25}`,
  `p{margin:0 0 1.1em}`,
  `a{color:inherit;text-decoration:inherit}`,
  `img{max-width:100%;display:block}`,
  `b,strong{font-weight:bolder}`,
  `.hero{padding:clamp(55px,8vw,92px) 0 0}`,
  `.hero__grid{grid-template-columns:1.15fr .85fr;gap:56px;align-items:start;display:grid}`,
  `.hero__body{font-size:17px;line-height:1.65;color:var(--ink-soft);max-width:60ch;margin-block-start:1.1em}`,
  `.hero__note{font-size:14px;color:var(--muted);max-width:44ch}`,
  `.byline{font:500 11px/1.5 var(--data);letter-spacing:.15em;text-transform:uppercase;color:var(--muted);margin-block-start:16px;display:flex;align-items:center;gap:10px;flex-wrap:wrap}`,
  `.byline b{color:var(--seal);font-weight:500}`,
  `.crumbs{font:12px var(--data);color:var(--muted);letter-spacing:.06em;padding:18px 0 0;max-width:var(--wrap);margin:auto;padding-inline:24px}`,
  `.crumbs a{color:var(--muted);text-decoration:none;border-bottom:1px solid transparent}`,
  `.crumbs a:hover{color:var(--seal);border-block-end-color:var(--seal)}`,
  `.emerg{background:#a03d33;color:#fff;padding:14px 24px;font-size:15px;line-height:1.5;text-align:center}`,
  `.emerg strong{font-weight:600}`,
  `.emerg a{color:#fff;border-bottom:1px solid rgba(255,255,255,.4)}`,
  `.emerg a:hover{border-color:#fff}`,
  `.band{padding-block:var(--gap)}`,
  `.band--tone{background:var(--tone);border-block:1px solid var(--rule)}`,
  `.band--ink{background:var(--ink);color:#eef2ef}`,
  `.band--ink h2,.band--ink h3{color:#fff}`,
  `.band--ink p{color:#c9d6d1}`,
  `.band--ink a{color:#d8bb86}`,
  `.band--ink a:hover{color:#fff}`,
  `.rail{grid-template-columns:var(--rail) minmax(0,1fr);gap:40px;display:grid}`,
  `.rail__label{font:500 11px/1.5 var(--data);letter-spacing:.16em;text-transform:uppercase;color:var(--muted);border-inline-start:2px solid var(--seal);padding:4px 0 0 12px}`,
  `.prose{max-width:68ch}`,
  `.prose p{color:var(--ink-soft)}`,
  `.lede{color:var(--ink-soft);max-width:65ch;font-size:clamp(18px,2vw,21px);line-height:1.6}`,
  `.toc{border:1px solid var(--rule);background:#fff;padding:22px 26px;margin-block-start:20px}`,
  `.toc__k{font:500 10px/1.5 var(--data);letter-spacing:.15em;text-transform:uppercase;color:var(--muted);margin-block-end:12px;display:block}`,
  `.toc ol{margin:0;padding-left:18px;counter-reset:toc}`,
  `.toc li{font-size:15px;line-height:1.7;color:var(--ink-soft)}`,
  `.toc a{color:var(--ink-soft);text-decoration:none;border-bottom:1px solid transparent;transition:color .18s,border-color .18s}`,
  `.toc a:hover{color:var(--seal);border-color:var(--seal)}`,
  `.keyfacts{display:grid;grid-template-columns:repeat(4,1fr);gap:1px;background:var(--rule);border:1px solid var(--rule);margin-block-start:28px}`,
  `.kf{background:var(--paper);padding:22px 20px}`,
  `.kf__k{font:10px var(--data);letter-spacing:.14em;text-transform:uppercase;color:var(--muted);display:block;margin-block-end:8px}`,
  `.kf__v{font:clamp(24px,3vw,30px)/1.15 var(--display);color:var(--ink);display:block;margin-block-end:4px}`,
  `.kf__d{font-size:13px;color:var(--ink-soft);line-height:1.45}`,
  `.ledger{border:1px solid var(--rule);background:#fff;margin-block-start:30px}`,
  `.ledger__head{display:flex;justify-content:space-between;padding:13px 22px;border-block-end:1px solid var(--rule);font:10.5px var(--data);letter-spacing:.15em;text-transform:uppercase;color:var(--muted)}`,
  `.ledger a{position:relative;display:flex;align-items:center;gap:16px;padding:14px 22px;text-decoration:none;border-block-end:1px dotted var(--rule);transition:background .2s}`,
  `.ledger a:last-child{border-block-end:0}`,
  `.ledger a::before{content:"";position:absolute;inset-block:0;inset-inline-start:0;width:0;background:var(--c);transition:width .25s}`,
  `.ledger a:hover{background:color-mix(in srgb,var(--c) 6%,transparent)}`,
  `.ledger a:hover::before{width:3px}`,
  `.led__ic{position:relative;flex:0 0 40px;width:40px;height:40px;border-radius:3px;display:grid;place-items:center;overflow:hidden}`,
  `.led__ic::before{content:"";position:absolute;inset:0;background:var(--c);opacity:.11;transition:opacity .25s}`,
  `.led__ic svg{position:relative;width:21px;height:21px;stroke:var(--c);fill:none;stroke-width:1.7;stroke-linecap:round;stroke-linejoin:round}`,
  `.ledger a:hover .led__ic::before{opacity:1}`,
  `.ledger a:hover .led__ic svg{stroke:#fff}`,
  `.ledger__proc{font-size:16.5px;flex:1}`,
  `.ledger a:hover .ledger__proc{color:var(--c)}`,
  `.ledger__go{font:11px var(--data);letter-spacing:.12em;text-transform:uppercase;color:var(--muted);white-space:nowrap;transition:color .2s,transform .25s}`,
  `.ledger a:hover .ledger__go{color:var(--c);transform:translateX(4px)}`,
  `.proc{border:1px solid var(--rule);background:#fff;padding:28px 28px 30px;margin-block-start:20px;border-radius:3px;transition:box-shadow .22s}`,
  `.proc:hover{box-shadow:0 18px 40px -32px #12332cb3}`,
  `.proc__h{display:flex;align-items:flex-start;gap:18px;margin-block-end:16px}`,
  `.proc__ic{flex:0 0 48px;width:48px;height:48px;border-radius:3px;display:grid;place-items:center;position:relative;overflow:hidden}`,
  `.proc__ic::before{content:"";position:absolute;inset:0;background:var(--c,var(--seal));opacity:.1}`,
  `.proc__ic svg{position:relative;width:24px;height:24px;stroke:var(--c,var(--seal));fill:none;stroke-width:1.7;stroke-linecap:round;stroke-linejoin:round}`,
  `.proc__n{font:10px var(--data);letter-spacing:.14em;text-transform:uppercase;color:var(--seal);display:block;margin-block-end:4px}`,
  `.proc__t h3{font-size:22px;line-height:1.25}`,
  `.proc__lead{color:var(--ink-soft);font-size:16px;line-height:1.65;margin-block-end:20px}`,
  `.proc__facts{display:grid;grid-template-columns:repeat(3,1fr);gap:1px;background:var(--rule);border:1px solid var(--rule)}`,
  `.pf{background:var(--tone);padding:18px 20px;display:flex;align-items:flex-start;gap:12px}`,
  `.pf__i{flex:0 0 20px;width:20px;height:20px;stroke:var(--seal);fill:none;stroke-width:1.7;stroke-linecap:round;margin-block-start:2px}`,
  `.pf__k{font:10px var(--data);letter-spacing:.13em;text-transform:uppercase;color:var(--muted);display:block;margin-block-end:3px}`,
  `.pf__v{font-size:15.5px;font-weight:500;color:var(--ink)}`,
  `.warn{border:1px solid var(--rule);background:#fff;border-inline-start:4px solid var(--seal);padding:28px;margin-block-start:28px}`,
  `.warn__h{display:flex;align-items:center;gap:12px;margin-block-end:14px}`,
  `.warn__h h3{font-size:19px;color:var(--ink)}`,
  `.warn__ic{flex:0 0 28px;width:28px;height:28px;border-radius:50%;background:var(--tone);display:grid;place-items:center;color:var(--seal)}`,
  `.warn__ic svg{width:16px;height:16px;stroke:currentColor;fill:none;stroke-width:2;stroke-linecap:round}`,
  `.warn__body{color:var(--ink-soft);font-size:15.5px;line-height:1.6}`,
  `.wgrid{display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:20px;margin-block:20px}`,
  `.wpoint{display:flex;align-items:flex-start;gap:12px}`,
  `.wpoint__i{flex:0 0 22px;width:22px;height:22px;stroke:var(--seal);fill:none;stroke-width:1.8;stroke-linecap:round;margin-block-start:2px}`,
  `.wpoint b{display:block;font-size:15px;font-weight:600;margin-block-end:3px;color:var(--ink)}`,
  `.wpoint p{font-size:14.5px;color:var(--ink-soft);margin:0;line-height:1.55}`,
  `.clauses{display:grid;grid-template-columns:repeat(3,1fr);gap:1px;background:var(--ink);border:1px solid var(--ink);margin-block:30px}`,
  `.clause{background:var(--ink);padding:26px 24px}`,
  `.clause__k{font:10.5px var(--data);letter-spacing:.15em;text-transform:uppercase;color:#8fb3a6;display:block;margin-block-end:12px}`,
  `.clause p{font-size:15.5px;line-height:1.6;color:#d5e2dd;margin-block-end:0}`,
  `.crit{border-block-start:1px solid var(--rule)}`,
  `.crit__row{display:grid;grid-template-columns:34px minmax(0,1fr);gap:0 16px;padding-block:18px;border-block-end:1px solid var(--rule)}`,
  `.crit__n{font:12px var(--data);color:var(--seal);padding-block-start:4px}`,
  `.crit__t{font:16.5px var(--display);margin-block-end:5px}`,
  `.crit__d{font-size:14.5px;line-height:1.55;color:var(--ink-soft)}`,
  `.faq{margin-block-start:26px;border:1px solid var(--rule);background:#fff}`,
  `.faq__item{border-block-end:1px solid var(--rule);position:relative}`,
  `.faq__item:last-child{border-block-end:0}`,
  `.faq__item::before{content:"";position:absolute;inset-block:0;inset-inline-start:0;width:0;background:var(--seal);transition:width .28s}`,
  `.faq__item.open::before{width:3px}`,
  `.faq__item.open{background:var(--tone)}`,
  `.faq__q{width:100%;text-align:start;background:none;border:0;cursor:pointer;font:17.5px var(--display);color:var(--ink);line-height:1.35;padding:20px 56px 20px 22px;position:relative;transition:color .2s}`,
  `.faq__q:hover{color:var(--seal)}`,
  `.faq__item.open .faq__q{color:var(--seal)}`,
  `.faq__sign{position:absolute;inset-inline-end:20px;top:50%;translate:0 -50%;width:20px;height:20px}`,
  `.faq__sign::before,.faq__sign::after{content:"";position:absolute;background:var(--seal);border-radius:1px;transition:transform .3s cubic-bezier(.4,0,.2,1),opacity .25s}`,
  `.faq__sign::before{inset-inline:0;top:9px;height:2px}`,
  `.faq__sign::after{inset-block:0;left:9px;width:2px}`,
  `.faq__item.open .faq__sign::after{transform:rotate(90deg);opacity:0}`,
  `.faq__item.open .faq__sign::before{transform:rotate(180deg)}`,
  `.faq__a{display:grid;grid-template-rows:0fr;transition:grid-template-rows .35s cubic-bezier(.4,0,.2,1)}`,
  `.faq__item.open .faq__a{grid-template-rows:1fr}`,
  `.faq__a>div{overflow:hidden}`,
  `.faq__a p{padding:0 56px 22px 22px;margin:0;color:var(--ink-soft);font-size:16px;opacity:0;transform:translateY(-6px);transition:opacity .3s .08s,transform .3s .08s}`,
  `.faq__item.open .faq__a p{opacity:1;transform:none}`,
  `.form{display:grid;grid-template-columns:1fr 1fr;gap:18px;margin-block-start:34px}`,
  `.f-full{grid-column:1/-1}`,
  `label{display:block;font:10.5px var(--data);letter-spacing:.13em;text-transform:uppercase;color:var(--muted);margin-block-end:7px}`,
  `input,select,textarea{width:100%;font:16px var(--body);color:var(--ink);background:#fff;border:1px solid var(--rule);border-radius:2px;padding:13px 14px}`,
  `textarea{min-height:120px;resize:vertical}`,
  `input:focus,select:focus,textarea:focus{border-color:var(--ink);outline-offset:1px}`,
  `.file{border:1px dashed var(--rule);background:#fff;padding:20px 16px;text-align:center;font-size:14px;color:var(--muted)}`,
  `.form__note{font-size:14px;color:var(--muted);margin-block-start:6px}`,
  `.btn{display:inline-flex;align-items:center;justify-content:center;gap:9px;font:500 16px var(--body);text-decoration:none;padding:15px 26px;border-radius:2px;border:1px solid transparent;cursor:pointer;transition:background .18s,color .18s,border-color .18s}`,
  `.btn--solid{background:var(--ink);color:var(--paper)}`,
  `.btn--solid:hover{background:var(--seal)}`,
  `.btn--line{border-color:var(--ink);color:var(--ink)}`,
  `.btn--line:hover{background:var(--ink);color:var(--paper)}`,
  `.band--ink .btn--solid{background:var(--paper);color:var(--ink)}`,
  `.band--ink .btn--solid:hover{background:var(--seal);color:var(--paper)}`,
  `.btns{display:flex;flex-wrap:wrap;gap:12px;margin-block:28px 14px}`,
  `.cred{background:#fff;border:1px solid var(--rule);box-shadow:0 1px 0 var(--rule),0 18px 44px -32px rgba(18,51,44,.5);position:relative;border-radius:3px}`,
  `.cred__head{padding:16px 22px;border-block-end:1px solid var(--rule);display:flex;align-items:center;justify-content:space-between;gap:12px;font:10.5px var(--data);letter-spacing:.17em;text-transform:uppercase;color:var(--muted)}`,
  `.cred__body{padding:24px 22px 22px}`,
  `.cred__name{font:27px/1.15 var(--display);margin-block-end:3px}`,
  `.cred__role{font-size:14.5px;color:var(--muted);margin-block-end:20px}`,
  `.cred__row{display:grid;grid-template-columns:1fr auto;gap:10px;align-items:baseline;padding-block:11px;border-block-start:1px dotted var(--rule)}`,
  `.cred__k{font:10.5px var(--data);letter-spacing:.13em;text-transform:uppercase;color:var(--muted);display:block;margin-block-end:2px}`,
  `.cred__v{font-size:15px;line-height:1.35}`,
  `.cred__v b{font:500 15px var(--data);letter-spacing:.01em}`,
  `.cred__verify{font:11px var(--data);letter-spacing:.07em;text-transform:uppercase;color:var(--verified);text-decoration:none;white-space:nowrap;border-block-end:1px solid currentColor;padding-block-end:1px}`,
  `.cred__verify:hover{color:var(--ink)}`,
  `.cred__foot{padding:14px 22px;background:var(--tone);border-block-start:1px solid var(--rule);font-size:13.5px;color:var(--ink-soft)}`,
  `.cred__foot a{color:var(--seal)}`,
  `.seal{display:inline-flex;align-items:center;gap:6px;color:var(--verified);font:10.5px var(--data);letter-spacing:.14em;text-transform:uppercase}`,
  `.seal svg{width:13px;height:13px}`,
  `.docs{border:1px solid var(--rule);background:var(--tone);padding:24px;margin-block-start:24px;border-radius:3px}`,
  `.docs h3{font-size:18px;margin-block-end:10px}`,
  `.rise{opacity:0;transform:translateY(18px);transition:opacity .6s cubic-bezier(.4,0,.2,1),transform .6s cubic-bezier(.4,0,.2,1)}`,
  `.rise.visible{opacity:1;transform:none}`,
  `.sticky{display:none;position:fixed;bottom:0;left:0;right:0;z-index:55;background:var(--ink);border-top:1px solid #315048}`,
  `.sticky a{display:flex;align-items:center;justify-content:center;gap:8px;padding:14px;color:#c9d6d1;font:500 15px var(--body);text-decoration:none;border-inline-end:1px solid #315048}`,
  `.sticky a:hover{background:#1a3d35;color:#fff}`,
  `.sticky svg{width:20px;height:20px;stroke:currentColor;fill:none;stroke-width:1.8}`,
  `@keyframes tibRise{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:none}}`,
  `@media(width<=1100px){.keyfacts{grid-template-columns:repeat(2,1fr)}.proc__facts{grid-template-columns:1fr 1fr}.clauses{grid-template-columns:1fr}.clause{padding:22px}}`,
  `@media(width<=900px){.hero__grid{grid-template-columns:1fr;gap:40px}.rail{grid-template-columns:1fr;gap:18px}.rail__label{border-inline-start:0;border-block-start:2px solid var(--seal);padding:0 0 8px}.wgrid{grid-template-columns:1fr}.crit__row{gap:0 12px}}`,
  `@media(width<=860px){.sticky{display:grid}body{padding-bottom:56px}}`,
  `@media(width<=700px){.form{grid-template-columns:1fr}.proc__facts{grid-template-columns:1fr}.keyfacts{grid-template-columns:1fr 1fr}.proc__h{flex-direction:column;gap:12px}.proc__ic{flex:none}}`,
  `@media(width<=520px){.keyfacts{grid-template-columns:1fr}.kf{padding:18px 16px}}`,
  `@media(prefers-reduced-motion:reduce){.rise{opacity:1;transform:none;transition:none}.faq__a,.faq__a p,.faq__sign::before,.faq__sign::after,.faq__item::before{transition:none}.proc{transition:none}.ledger a::before{transition:none}}`,
].join("");

export default function PageHTML({ page }: { page: Page }) {
  const isTreatment = page.route.startsWith("/treatments/");
  const bodyHtml =
    (page.headScripts ? `<script>${page.headScripts}</script>` : "") +
    injectHeaderContact(fixSvgDimensions(useSharedHeader(page.body)));
  return (
    <>
      {page.styles.map((css, i) => (
        <style key={i} dangerouslySetInnerHTML={{ __html: css }} />
      ))}
      <style dangerouslySetInnerHTML={{ __html: SHARED_CHROME_CSS }} />
      {isTreatment && <style dangerouslySetInnerHTML={{ __html: TREATMENT_CONTENT_CSS }} />}
      <style dangerouslySetInnerHTML={{ __html: MEGA_CSS }} />
      {isTreatment && <script dangerouslySetInnerHTML={{ __html: `(function(){if(typeof IntersectionObserver==='undefined')return;var o=new IntersectionObserver(function(e){e.forEach(function(x){if(x.isIntersecting){x.target.classList.add('visible');o.unobserve(x.target)}})},{threshold:.12});document.querySelectorAll('.rise').forEach(function(el){o.observe(el)})})()` }} />}
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
