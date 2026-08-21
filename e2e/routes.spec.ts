import { expect, test } from "@playwright/test";
import { checkPages, renderProblems, statusProblems } from "./support/assert";
import { fetchSitemapPaths } from "./support/sitemap";
import { newestEvents } from "./support/select";

/**
 * Route smoke: one URL per archetype, asserted structurally.
 *
 * Assertions never mention content. This suite runs against real content in
 * every environment, so a spec that knows a particular event is on the
 * homepage starts crying wolf the week that changes.
 */

const STATIC_PAGES = [
  "/",
  "/about",
  "/people",
  "/podcasts",
  "/news",
  "/conferences",
  "/resources/videos",
  "/code-of-conduct",
  "/brand-assets",
  "/legal-notice",
  "/privacy-policy",
  "/thank-you",
  "/call-for-papers/guidelines",
  "/fr/events/for-kids",
];

/** One representative URL per dynamic route pattern, taken from the sitemap. */
const ARCHETYPES: Record<string, RegExp> = {
  event: /^\/events\/\d{4}-[^/]+$/,
  "event schedule": /^\/events\/[^/]+\/schedule$/,
  "event sponsors": /^\/events\/[^/]+\/sponsors$/,
  "event subpage": /^\/events\/[^/]+\/pages\/[^/]+$/,
  talk: /^\/events\/[^/]+\/talks\/[^/]+$/,
  person: /^\/people\/[^/]+$/,
  "news article": /^\/news\/article\/[^/]+$/,
  "podcast episode": /^\/podcasts\/[^/]+\/episodes\/[^/]+$/,
  country: /^\/events\/locations\/[^/]+$/,
  city: /^\/events\/locations\/[^/]+\/[^/]+$/,
  organizers: /^\/events\/locations\/[^/]+\/organizers$/,
};

test("static pages render", async ({ request }) => {
  const checks = await checkPages(request, STATIC_PAGES);
  expect(renderProblems(checks), "static pages that did not render").toEqual(
    [],
  );
});

test("one page per dynamic archetype renders", async ({ request }) => {
  const paths = await fetchSitemapPaths(request);

  const sample = Object.entries(ARCHETYPES).flatMap(([name, pattern]) => {
    const match = paths.find((path) => pattern.test(path));
    // A missing archetype means the sitemap changed shape — worth knowing
    // about, but it is not a rendering failure, so it is reported separately.
    return match ? [{ name, path: match }] : [];
  });

  const missing = Object.keys(ARCHETYPES).filter(
    (name) => !sample.some((entry) => entry.name === name),
  );
  expect(missing, "archetypes with no URL in the sitemap").toEqual([]);

  const checks = await checkPages(
    request,
    sample.map((entry) => entry.path),
  );
  expect(renderProblems(checks), "archetype pages that did not render").toEqual(
    [],
  );
});

test("routes excluded from the sitemap still render", async ({ request }) => {
  const paths = await fetchSitemapPaths(request);
  const [event] = newestEvents(paths, 1);
  expect(event, "no event found in the sitemap").toBeTruthy();

  // The sitemap() config filters these out deliberately, so nothing else in
  // the suite would ever touch them.
  //
  // /events/:id/prospectus is intentionally absent: it redirects to a href
  // stored on the event and 404s for events without one, so there is no slug
  // the suite can derive that is guaranteed to work.
  const checks = await checkPages(request, [
    `${event}/attendee`,
    `${event}/dashboard`,
  ]);
  expect(renderProblems(checks), "excluded routes that did not render").toEqual(
    [],
  );
});

test("the legacy index routes still point at /events", async ({ request }) => {
  // These two respond 200 with a meta-refresh stub rather than a real page,
  // so they are checked for reachability and destination, not for content.
  const paths = ["/events/types", "/events/locations"];
  const checks = await checkPages(request, paths);
  expect(statusProblems(checks), "legacy index routes").toEqual([]);

  for (const path of paths) {
    const body = await (await request.get(path)).text();
    expect(body, `${path} should redirect to /events`).toContain("/events");
  }
});

test("an unknown URL returns 404", async ({ request }) => {
  const response = await request.get("/this-page-does-not-exist", {
    maxRedirects: 0,
  });
  expect(response.status()).toBe(404);
});
