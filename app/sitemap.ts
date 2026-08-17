import type { MetadataRoute } from "next";
import { listPages } from "@/lib/pages";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return listPages()
    .filter((p) => p.robots !== "noindex")
    .map((p) => ({
      url: p.canonical ?? `https://tibhind.com${p.route}`,
      lastModified: new Date("2026-08-15"),
      changeFrequency: p.route === "/" ? "weekly" : "monthly",
      priority: p.route === "/" ? 1 : p.route.split("/").filter(Boolean).length <= 1 ? 0.8 : 0.6,
    }));
}
