import { expect, test } from "@playwright/test";
import { fetchSitemapPaths } from "./support/sitemap";

/**
 * The sitemap is the URL table the rest of the suite is built on, so it gets
 * checked in its own right: if it stops being generated, or comes back empty,
 * every other sweep would silently pass over nothing.
 */

test("the sitemap is generated and non-trivial", async ({ request }) => {
  const paths = await fetchSitemapPaths(request);

  // Well below the real count (several hundred) — this is a floor that catches
  // "the sitemap integration produced nothing", not a content assertion.
  expect(paths.length).toBeGreaterThan(50);
  expect(paths).toContain("/");
});

test("the sitemap excludes the routes it is configured to exclude", async ({
  request,
}) => {
  const paths = await fetchSitemapPaths(request);

  const leaked = paths.filter(
    (path) =>
      path.endsWith("/attendee") ||
      path.endsWith("/prospectus") ||
      path.endsWith("/events/locations") ||
      path.endsWith("/events/types") ||
      path.includes("/branding/components") ||
      path.includes("/dashboard"),
  );

  expect(leaked, "routes that should not be in the sitemap").toEqual([]);
});

test("robots.txt is served and carries the content signal", async ({
  request,
}) => {
  const response = await request.get("/robots.txt");
  expect(response.status()).toBe(200);

  const body = await response.text();
  expect(body).toContain("User-agent: *");
  expect(body).toContain("Content-Signal:");
  expect(body).toContain("Sitemap:");
});
