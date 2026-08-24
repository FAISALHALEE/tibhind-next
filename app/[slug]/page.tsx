import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PageHTML from "@/lib/PageHTML";
import { pageMetadata } from "@/lib/metadata";
import { tryGetPageByRoute, listPages } from "@/lib/pages";

const EXCLUDED = new Set([
  "conditions",
  "treatments",
  "cost",
  "about",
  "medical-visa",
  "best-doctors-india",
  "best-hospitals-india",
]);

export function generateStaticParams() {
  return listPages()
    .filter((p) => {
      const parts = p.route.split("/").filter(Boolean);
      return parts.length === 1 && !EXCLUDED.has(parts[0]) && parts[0] !== "sitemap.xml";
    })
    .map((p) => ({ slug: p.route.split("/")[1] }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const page = tryGetPageByRoute(`/${slug}/`);
  if (!page) notFound();
  return pageMetadata(page);
}

export default async function TopLevelPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const page = tryGetPageByRoute(`/${slug}/`);
  if (!page) notFound();
  return <PageHTML page={page} />;
}
