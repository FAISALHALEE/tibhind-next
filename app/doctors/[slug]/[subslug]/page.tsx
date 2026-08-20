import type { Metadata } from "next";
import PageHTML from "@/lib/PageHTML";
import { pageMetadata } from "@/lib/metadata";
import { getPageByRoute, listPages } from "@/lib/pages";

const PREFIX = "/doctors/";

export function generateStaticParams() {
  return listPages()
    .filter((p) => {
      const rest = p.route.slice(PREFIX.length, -1);
      return p.route.startsWith(PREFIX) && rest.includes("/");
    })
    .map((p) => {
      const [specialty, ...slugParts] = p.route.slice(PREFIX.length, -1).split("/");
      return { slug: specialty, subslug: slugParts.join("/") };
    });
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; subslug: string }>;
}): Promise<Metadata> {
  const { slug, subslug } = await params;
  return pageMetadata(getPageByRoute(`${PREFIX}${slug}/${subslug}/`));
}

export default async function DoctorSpecialtyPage({
  params,
}: {
  params: Promise<{ slug: string; subslug: string }>;
}) {
  const { slug, subslug } = await params;
  return <PageHTML page={getPageByRoute(`${PREFIX}${slug}/${subslug}/`)} />;
}