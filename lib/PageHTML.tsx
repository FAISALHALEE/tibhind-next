import type { Page } from "./pages";

export default function PageHTML({ page }: { page: Page }) {
  const bodyHtml = (page.headScripts ? `<script>${page.headScripts}</script>` : "") + page.body;
  return (
    <>
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
