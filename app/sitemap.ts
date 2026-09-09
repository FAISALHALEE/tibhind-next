import type { MetadataRoute } from "next";
import { listPages } from "@/lib/pages";

export const dynamic = "force-static";

const BASE_URL = "https://www.tibhind.com";
const LAST_MODIFIED = new Date("2026-08-15");

export default function sitemap(): MetadataRoute.Sitemap {
  const seen = new Set<string>();
  const entries: MetadataRoute.Sitemap = [];
  for (const page of listPages()) {
    if ((page.robots ?? "").includes("noindex")) continue;
    const url = `${BASE_URL}${page.route}`;
    if (seen.has(url)) continue;
    seen.add(url);
    const depth = page.route.split("/").filter(Boolean).length;
    entries.push({
      url,
      lastModified: LAST_MODIFIED,
      changeFrequency: page.route === "/" ? "weekly" : "monthly",
      priority: page.route === "/" ? 1 : depth <= 1 ? 0.8 : 0.6,
    });
  }
  return entries;
}
