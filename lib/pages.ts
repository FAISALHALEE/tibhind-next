import fs from "fs";
import path from "path";

export interface Page {
  id: string;
  route: string;
  canonical: string | null;
  title: string;
  description: string | null;
  robots: string | null;
  styles: string[];
  jsonLd: string[];
  headScripts: string;
  body: string;
  source: string;
}

const DATA_DIR = path.join(process.cwd(), "data", "pages");
const cache = new Map<string, Page>();

export function getPage(id: string): Page {
  if (!cache.has(id)) {
    cache.set(
      id,
      JSON.parse(fs.readFileSync(path.join(DATA_DIR, `${id}.json`), "utf8")) as Page,
    );
  }
  return cache.get(id)!;
}

export function listPages(): Page[] {
  return fs
    .readdirSync(DATA_DIR)
    .filter((f) => f.endsWith(".json"))
    .map((f) => getPage(f.replace(/\.json$/, "")));
}

export function tryGetPageByRoute(route: string): Page | undefined {
  return listPages().find((x) => x.route === route);
}

export function getPageByRoute(route: string): Page {
  const p = tryGetPageByRoute(route);
  if (!p) throw new Error(`No migrated page for route ${route}`);
  return p;
}
