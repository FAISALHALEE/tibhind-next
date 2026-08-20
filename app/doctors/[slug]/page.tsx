import type { Metadata } from "next";
import PageHTML from "@/lib/PageHTML";
import { pageMetadata } from "@/lib/metadata";
import { getPageByRoute, listPages } from "@/lib/pages";

const PREFIX = "/doctors/";

export function generateStaticParams() {
  return listPages()
    .filter((p) => {
      const rest = p.route.slice(PREFIX.length, -1);
      return p.route.startsWith(PREFIX) && !rest.includes("/");
    })
    .map((p) => ({ slug: p.route.slice(PREFIX.length, -1) }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  return pageMetadata(getPageByRoute(`${PREFIX}${slug}/`));
}

export default async function DoctorPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return <PageHTML page={getPageByRoute(`${PREFIX}${slug}/`)} />;
}