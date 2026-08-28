import type { APIRequestContext } from "@playwright/test";

/**
 * The sitemap is the URL table for the whole suite. It is the only source
 * that behaves identically in all three environments — locally there is a
 * filesystem to read, against a deployed preview there is not — and it
 * excludes draft events by construction, since they never reach it.
 */
const LOC = /<loc>([^<]+)<\/loc>/g;

const extractLocations = (xml: string): string[] =>
  [...xml.matchAll(LOC)]
    .map((match) => (match[1] ?? "").trim())
    .filter(Boolean);

/**
 * Sitemap entries are absolute URLs built from Astro's `site` option, which
 * on a preview deployment is the branch URL and locally is localhost. Only
 * the pathname is portable, so that is all we keep.
 */
export const toPathname = (url: string): string | null => {
  try {
    return new URL(url).pathname;
  } catch {
    return null;
  }
};

const load = async (request: APIRequestContext): Promise<string[]> => {
  const index = await request.get("/sitemap-index.xml");
  if (!index.ok()) {
    throw new Error(`/sitemap-index.xml returned ${index.status()}`);
  }

  const children = extractLocations(await index.text())
    .map(toPathname)
    .filter((path): path is string => path !== null);

  const paths = new Set<string>();
  for (const child of children) {
    const response = await request.get(child);
    if (!response.ok()) {
      throw new Error(`${child} returned ${response.status()}`);
    }
    for (const location of extractLocations(await response.text())) {
      const path = toPathname(location);
      if (path) paths.add(path);
    }
  }

  return [...paths].sort();
};

/** Memoised per worker process — several specs need the same table. */
let cached: Promise<string[]> | null = null;

export const fetchSitemapPaths = (
  request: APIRequestContext,
): Promise<string[]> => (cached ??= load(request));
