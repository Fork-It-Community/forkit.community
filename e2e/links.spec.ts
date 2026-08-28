import { expect, test } from "@playwright/test";
import { checkPages, statusProblems } from "./support/assert";
import { internalLinks } from "./support/html";
import { fetchSitemapPaths } from "./support/sitemap";
import { newestEvents } from "./support/select";

/**
 * Link-graph integrity, one level deep from a couple of seed pages.
 *
 * This is what "check the navigation works" actually means here. The site has
 * no client-side router, so following an href over HTTP is equivalent to
 * clicking it, and this reaches far more links than anyone would click by
 * hand. The links that are *not* equivalent — the ones that only exist after
 * hydration — are covered by the browser specs instead.
 *
 * Same-origin only. External links are never requested: a sponsor rebranding
 * their site is not a regression in this repository, and a merge-blocking
 * check must not depend on third-party uptime.
 */

test("links reachable from the home page resolve", async ({
  request,
  baseURL,
}) => {
  const pageUrl = new URL("/", baseURL).toString();
  const html = await (await request.get("/")).text();
  const links = internalLinks(html, pageUrl);

  expect(links.length, "internal links found on the home page").toBeGreaterThan(
    10,
  );

  const checks = await checkPages(request, links);
  expect(statusProblems(checks), "broken links on the home page").toEqual([]);
});

test("links reachable from an event page resolve", async ({
  request,
  baseURL,
}) => {
  const paths = await fetchSitemapPaths(request);
  const [event] = newestEvents(paths, 1);
  expect(event, "no event found in the sitemap").toBeTruthy();

  const pageUrl = new URL(event ?? "/", baseURL).toString();
  const html = await (await request.get(event ?? "/")).text();
  const links = internalLinks(html, pageUrl);

  expect(
    links.length,
    "internal links found on the event page",
  ).toBeGreaterThan(5);

  const checks = await checkPages(request, links);
  expect(statusProblems(checks), "broken links on the event page").toEqual([]);
});
