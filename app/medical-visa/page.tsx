import type { Metadata } from "next";
import PageHTML from "@/lib/PageHTML";
import { pageMetadata } from "@/lib/metadata";
import { getPageByRoute } from "@/lib/pages";

export async function generateMetadata(): Promise<Metadata> {
  return pageMetadata(getPageByRoute("/medical-visa/"));
}

export default function MedicalVisaPage() {
  return <PageHTML page={getPageByRoute("/medical-visa/")} />;
}