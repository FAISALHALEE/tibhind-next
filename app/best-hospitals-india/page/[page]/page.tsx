import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PageHTML from "@/lib/PageHTML";
import { pageMetadata } from "@/lib/metadata";
import { tryGetPageByRoute, listPages } from "@/lib/pages";

const PREFIX = "/best-hospitals-india/page/";

export function generateStaticParams() {
  return listPages()
    .filter((p) => p.route.startsWith(PREFIX))
    .map((p) => ({ page: p.route.slice(PREFIX.length, -1) }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ page: string }>;
}): Promise<Metadata> {
  const { page } = await params;
  const p = tryGetPageByRoute(`${PREFIX}${page}/`);
  if (!p) notFound();
  return pageMetadata(p);
}

export default async function BestHospitalsIndiaPagePage({
  params,
}: {
  params: Promise<{ page: string }>;
}) {
  const { page } = await params;
  const p = tryGetPageByRoute(`${PREFIX}${page}/`);
  if (!p) notFound();
  return <PageHTML page={p} />;
}
