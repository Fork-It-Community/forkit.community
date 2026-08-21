/**
 * Tiny HTML helpers. Deliberately regex-based rather than pulling in a DOM
 * parser: the suite asserts structure only — a heading exists and is not
 * empty, a link points somewhere — and that does not need a parse tree.
 */

const H1 = /<h1\b[^>]*>([\s\S]*?)<\/h1>/i;
const TAG = /<[^>]*>/g;
const HREF = /<a\b[^>]*\shref=["']([^"']*)["']/gi;

const stripTags = (html: string): string =>
  html
    .replace(TAG, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ")
    .trim();

/** Text of the first <h1>, tags stripped. `null` when there is no <h1> at all. */
export const headingText = (html: string): string | null => {
  const match = H1.exec(html);
  return match?.[1] === undefined ? null : stripTags(match[1]);
};

const SKIPPED_PROTOCOLS = ["mailto:", "tel:", "javascript:", "data:"];

/**
 * Same-origin links only.
 *
 * Note that links rendered as absolute canonical URLs (built from Astro's
 * `site`) resolve to the production host, so from a preview target they are
 * *not* same-origin and get skipped. That is the behaviour we want: a CI run
 * on a pull request must never start crawling production.
 */
export const internalLinks = (html: string, pageUrl: string): string[] => {
  const origin = new URL(pageUrl).origin;
  const found = new Set<string>();

  for (const match of html.matchAll(HREF)) {
    const href = (match[1] ?? "").trim();
    if (!href || href.startsWith("#")) continue;
    if (SKIPPED_PROTOCOLS.some((protocol) => href.startsWith(protocol)))
      continue;

    try {
      const resolved = new URL(href, pageUrl);
      if (resolved.origin !== origin) continue;
      found.add(`${resolved.pathname}${resolved.search}`);
    } catch {
      // An unparseable href is not something this suite is here to police.
    }
  }

  return [...found].sort();
};
