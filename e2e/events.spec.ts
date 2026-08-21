import { expect, test } from "@playwright/test";
import { checkPages, renderProblems } from "./support/assert";
import { fetchSitemapPaths } from "./support/sitemap";
import { descendantsOf, newestEvents } from "./support/select";

/**
 * Content integrity for events: the collection where a badly authored entry
 * is most likely to produce a broken page, and where the page is assembled
 * from the most moving parts.
 *
 * Sampled newest-first rather than pinned, so a freshly added event is always
 * in the sample. Sorting works because slugs are year-prefixed, and drafts
 * never appear because the sample comes from the sitemap.
 */

const SAMPLE_SIZE = 5;

test("the newest events and all their sub-pages render", async ({
  request,
}) => {
  const paths = await fetchSitemapPaths(request);
  const events = newestEvents(paths, SAMPLE_SIZE);

  expect(events.length, "events found in the sitemap").toBe(SAMPLE_SIZE);

  const targets = events.flatMap((event) => [
    event,
    ...descendantsOf(paths, event),
  ]);

  // Guards against the sample silently collapsing to bare index pages if the
  // sitemap ever stops listing sub-pages.
  expect(targets.length).toBeGreaterThan(events.length);

  const checks = await checkPages(request, targets);
  expect(renderProblems(checks), "event pages that did not render").toEqual([]);
});
