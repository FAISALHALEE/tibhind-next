import type { Metadata } from "next";
import PageHTML from "@/lib/PageHTML";
import { pageMetadata } from "@/lib/metadata";
import { getPageByRoute, listPages } from "@/lib/pages";

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
  return pageMetadata(getPageByRoute(`${PREFIX}${page}/`));
}

export default async function BestHospitalsIndiaPagePage({
  params,
}: {
  params: Promise<{ page: string }>;
}) {
  const { page } = await params;
  return <PageHTML page={getPageByRoute(`${PREFIX}${page}/`)} />;
}