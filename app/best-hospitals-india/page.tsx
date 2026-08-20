import type { Metadata } from "next";
import PageHTML from "@/lib/PageHTML";
import { pageMetadata } from "@/lib/metadata";
import { getPageByRoute } from "@/lib/pages";

export async function generateMetadata(): Promise<Metadata> {
  return pageMetadata(getPageByRoute("/best-hospitals-india/"));
}

export default function BestHospitalsIndiaPage() {
  return <PageHTML page={getPageByRoute("/best-hospitals-india/")} />;
}