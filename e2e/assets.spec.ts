import { expect, test } from "@playwright/test";
import { binaryProblems, checkBinaries } from "./support/assert";
import { fetchSitemapPaths } from "./support/sitemap";
import { newestEvents } from "./support/select";

/**
 * Generated assets: one endpoint per satori template family.
 *
 * Each family is a different template with its own layout and fonts, so a
 * bumped `satori` or `sharp` can break one and leave the rest working. One
 * URL per family is the cheapest way to learn which.
 *
 * None of these URLs are in the sitemap — they are API routes, not pages — so
 * the ids are derived from sitemap page paths and the endpoint is built from
 * them. A missing template answers 500 rather than 404, so a wrong name here
 * fails loudly rather than passing quietly.
 */

/** Every asset on this site is JPEG; `.png` is not a supported type. */
const IMAGE_TYPE = /^image\//;

/** Well under the smallest real asset (~67KB), well over an empty render. */
const MIN_IMAGE_BYTES = 5_000;

const firstMatch = (paths: string[], pattern: RegExp): string => {
  const match = paths.find((path) => pattern.test(path));
  if (!match) throw new Error(`no sitemap path matching ${String(pattern)}`);
  return match;
};

test("one generated image per template family renders", async ({ request }) => {
  const paths = await fetchSitemapPaths(request);
  const [event] = newestEvents(paths, 1);
  expect(event, "no event found in the sitemap").toBeTruthy();

  // Partners have no page of their own, so their ids are not in the sitemap.
  // The event's asset index advertises them, which keeps this derived rather
  // than pinned to a sponsor who may not be a sponsor next year.
  const assetsIndex = await (await request.get(`${event}/assets`)).text();
  const partnerAsset =
    /\/events\/[^"'\s]+\/partners\/[^"'\s]+\/assets\/large\.jpg/.exec(
      assetsIndex,
    )?.[0];

  const targets = [
    // Event: the OG image, plus one non-OG template as a canary for the ~25
    // other social templates that share its machinery.
    `${event}/assets/og-image.jpg`,
    `${event}/assets/save-the-date.jpg`,
    `${firstMatch(paths, /^\/people\/[^/]+$/)}/assets/og-image.jpg`,
    `${firstMatch(paths, /^\/news\/article\/[^/]+$/)}/assets/og-image.jpg`,
    `${firstMatch(paths, /^\/podcasts\/[^/]+\/episodes\/[^/]+$/)}/assets/og-image.jpg`,
    `${firstMatch(paths, /^\/events\/locations\/[^/]+$/)}/assets/og-image.jpg`,
    `${firstMatch(paths, /^\/fr\/events\/for-kids\/[^/]+$/)}/assets/og-image.jpg`,
    // Talks have no og-image template; `large` is their equivalent.
    `${firstMatch(paths, /^\/events\/[^/]+\/talks\/[^/]+$/)}/assets/large.jpg`,
    ...(partnerAsset ? [partnerAsset] : []),
  ];

  expect(partnerAsset, "no partner asset advertised on the event").toBeTruthy();

  const checks = await checkBinaries(request, targets);
  expect(
    binaryProblems(checks, IMAGE_TYPE, MIN_IMAGE_BYTES),
    "generated images that did not render",
  ).toEqual([]);
});
