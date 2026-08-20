import type { Metadata } from "next";
import PageHTML from "@/lib/PageHTML";
import { pageMetadata } from "@/lib/metadata";
import { getPageByRoute } from "@/lib/pages";

export async function generateMetadata(): Promise<Metadata> {
  return pageMetadata(getPageByRoute("/best-doctors-india/"));
}

export default function BestDoctorsIndiaPage() {
  return <PageHTML page={getPageByRoute("/best-doctors-india/")} />;
}