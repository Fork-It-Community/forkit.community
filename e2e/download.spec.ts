import { expect, test } from "@playwright/test";
import { binaryProblems, checkBinaries } from "./support/assert";
import { fetchSitemapPaths } from "./support/sitemap";
import { newestEvents } from "./support/select";

/**
 * The event asset bundle. Worth its own spec rather than folding into the
 * image sweep: this is the one asset endpoint built on adm-zip rather than
 * satori, so it breaks for entirely different reasons.
 *
 * Size only — parsing the archive would mean adding adm-zip as a test
 * dependency to learn very little more than "it is not empty".
 */

const ARCHIVE_TYPE = /zip/;
const MIN_ARCHIVE_BYTES = 100_000;

test("the event asset bundle downloads", async ({ request }) => {
  const paths = await fetchSitemapPaths(request);
  const [event] = newestEvents(paths, 1);
  expect(event, "no event found in the sitemap").toBeTruthy();

  const checks = await checkBinaries(request, [`${event}/assets/download`]);
  expect(
    binaryProblems(checks, ARCHIVE_TYPE, MIN_ARCHIVE_BYTES),
    "asset bundle",
  ).toEqual([]);
});
