import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PageHTML from "@/lib/PageHTML";
import { pageMetadata } from "@/lib/metadata";
import { tryGetPageByRoute, listPages } from "@/lib/pages";

const PREFIX = "/hospitals/";

export function generateStaticParams() {
  return listPages()
    .filter((p) => p.route.startsWith(PREFIX))
    .map((p) => ({ slug: p.route.slice(PREFIX.length, -1) }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const page = tryGetPageByRoute(`${PREFIX}${slug}/`);
  if (!page) notFound();
  return pageMetadata(page);
}

export default async function HospitalPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const page = tryGetPageByRoute(`${PREFIX}${slug}/`);
  if (!page) notFound();
  return <PageHTML page={page} />;
}
