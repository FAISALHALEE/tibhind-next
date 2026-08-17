import type { Metadata } from "next";
import PageHTML from "@/lib/PageHTML";
import { pageMetadata } from "@/lib/metadata";
import { getPageByRoute } from "@/lib/pages";

export async function generateMetadata(): Promise<Metadata> {
  return pageMetadata(getPageByRoute("/treatments/"));
}

export default function TreatmentsPage() {
  return <PageHTML page={getPageByRoute("/treatments/")} />;
}
