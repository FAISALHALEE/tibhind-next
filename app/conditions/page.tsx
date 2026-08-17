import type { Metadata } from "next";
import PageHTML from "@/lib/PageHTML";
import { pageMetadata } from "@/lib/metadata";
import { getPageByRoute } from "@/lib/pages";

export async function generateMetadata(): Promise<Metadata> {
  return pageMetadata(getPageByRoute("/conditions/"));
}

export default function ConditionsPage() {
  return <PageHTML page={getPageByRoute("/conditions/")} />;
}
