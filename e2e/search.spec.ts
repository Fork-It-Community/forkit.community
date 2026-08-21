import { expect, test, waitForHydration } from "./support/browser";
import { fetchSitemapPaths } from "./support/sitemap";
import { newestEvents } from "./support/select";

/**
 * The search palette. A browser is unavoidable here: the results are rendered
 * by a hydrated island backed by an Astro action, so nothing about this is
 * reachable over plain HTTP.
 *
 * The query is derived from the sitemap rather than hard-coded, which keeps
 * the suite's no-content-strings rule intact — a pinned search term would go
 * stale the moment that event drops out of the collection.
 *
 * Opened by clicking the button rather than pressing the ⌘K/Ctrl+K shortcut
 * it also supports: the modifier differs between a maintainer's macOS and
 * CI's Linux, and a platform branch is a flake source in a merge-blocking
 * check. If the shortcut itself ever needs cover, that is its own spec.
 */

/** `/events/2026-vietnam-hanoi` → `vietnam`, a word certain to be in its title. */
const queryFromEvent = (eventPath: string): string => {
  const word = eventPath
    .split("/")
    .at(-1)
    ?.split("-")
    .find((part) => part.length >= 4 && !/^\d+$/.test(part));
  if (!word) throw new Error(`no usable search term in ${eventPath}`);
  return word;
};

test("the search palette finds and opens a result", async ({
  page,
  request,
}) => {
  const paths = await fetchSitemapPaths(request);
  const [event] = newestEvents(paths, 1);
  expect(event, "no event found in the sitemap").toBeTruthy();
  const query = queryFromEvent(event ?? "");

  await page.goto("/");
  const openSearch = page.getByRole("button", { name: "Open search modal" });
  await waitForHydration(openSearch);
  await openSearch.click();

  const input = page.getByRole("combobox");
  await expect(input).toBeVisible();

  // The palette fetches its whole index through an Astro action, which reads
  // every content collection and is comfortably the slowest thing in the
  // suite when the server is busy. Wait for the default list rather than
  // racing it, so a slow index reports as a slow index rather than as "search
  // returned nothing".
  const results = page.getByRole("option");
  await expect(results.first(), "search index never loaded").toBeVisible({
    timeout: 45_000,
  });

  await input.fill(query);
  await expect(results.first(), `no result for "${query}"`).toBeVisible();

  await results.first().click();
  await page.waitForURL((url) => url.pathname !== "/");
  await expect(page.locator("body")).not.toBeEmpty();
});
