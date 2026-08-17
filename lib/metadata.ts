import type { Metadata } from "next";
import type { Page } from "./pages";

export function pageMetadata(p: Page): Metadata {
  return {
    title: p.title,
    description: p.description ?? undefined,
    alternates: p.canonical ? { canonical: p.canonical } : undefined,
    robots: p.robots ? { index: false, follow: false } : undefined,
  };
}
