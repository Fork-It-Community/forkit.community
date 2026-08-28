import { expect, test } from "@playwright/test";
import { checkPages, renderProblems } from "./support/assert";
import { fetchSitemapPaths } from "./support/sitemap";
import { evenlySpaced, personPaths } from "./support/select";

/**
 * Content integrity for people. Person slugs are names, so there is no date
 * to sample by; an evenly spaced sample stays deterministic while shifting as
 * the collection grows, which keeps any one group of entries from becoming a
 * permanent blind spot.
 */

const SAMPLE_SIZE = 5;

test("a spread of person pages render", async ({ request }) => {
  const paths = await fetchSitemapPaths(request);
  const people = evenlySpaced(personPaths(paths), SAMPLE_SIZE);

  expect(people.length, "people found in the sitemap").toBe(SAMPLE_SIZE);

  const checks = await checkPages(request, people);
  expect(renderProblems(checks), "person pages that did not render").toEqual(
    [],
  );
});
