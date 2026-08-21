/**
 * Sampling rules for the two collections the suite sweeps.
 *
 * The suite is deliberately thin, so it never hits every URL. What it samples
 * matters more than how much: the sample has to move as content is added,
 * otherwise newly authored content — the exact thing a content-integrity
 * check exists for — is permanently invisible to it.
 */

/** Route segments under /events that are not events. */
const NON_EVENT_SEGMENTS = new Set(["locations", "types", "rss.xml"]);

/** Event slugs are year-prefixed (`2026-france-rouen`), so they sort by date. */
const EVENT_PATH = /^\/events\/([^/]+)$/;

export const eventPaths = (paths: string[]): string[] =>
  paths.filter((path) => {
    const slug = EVENT_PATH.exec(path)?.[1];
    return !!slug && !NON_EVENT_SEGMENTS.has(slug) && /^\d{4}-/.test(slug);
  });

/**
 * Newest first. New events rotate into the sample automatically, which is
 * where the risk of a broken page actually lives.
 */
export const newestEvents = (paths: string[], count: number): string[] =>
  eventPaths(paths)
    .sort((a, b) => b.localeCompare(a))
    .slice(0, count);

/** Every sitemap URL nested under an event: /schedule, /sponsors, /talks/…, /pages/… */
export const descendantsOf = (paths: string[], parent: string): string[] =>
  paths.filter((path) => path.startsWith(`${parent}/`));

const PERSON_PATH = /^\/people\/[^/]+$/;

export const personPaths = (paths: string[]): string[] =>
  paths.filter((path) => PERSON_PATH.test(path));

/**
 * People have no date to sort on — slugs are names. Even spacing keeps the
 * sample deterministic while letting it shift as the collection grows, so no
 * single group of people is a permanent blind spot.
 */
export const evenlySpaced = <T>(items: T[], count: number): T[] => {
  if (items.length <= count) return [...items];
  const step = (items.length - 1) / (count - 1);
  return Array.from({ length: count }, (_, index) => {
    const item = items[Math.round(index * step)];
    if (item === undefined) throw new Error("evenlySpaced: index out of range");
    return item;
  });
};
