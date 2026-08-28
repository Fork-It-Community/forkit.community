import AdmZip from "adm-zip";
import { expect, test } from "@playwright/test";
import { fetchSitemapPaths } from "./support/sitemap";
import { newestEvents } from "./support/select";

/**
 * The event asset bundle. Worth its own spec rather than folding into the
 * image sweep: this is the one asset endpoint built on adm-zip rather than
 * satori, so it breaks for entirely different reasons.
 *
 * Fetched once — it is a ~10MB response and the slowest request in the suite
 * — and every assertion is made against that one body.
 */

const MIN_ARCHIVE_BYTES = 100_000;

test("the event asset bundle downloads", async ({ request }) => {
  const paths = await fetchSitemapPaths(request);
  const [event] = newestEvents(paths, 1);
  expect(event, "no event found in the sitemap").toBeTruthy();

  const response = await request.get(`${event}/assets/download`);
  expect(response.status(), "asset bundle status").toBe(200);
  expect(response.headers()["content-type"] ?? "").toMatch(/zip/);

  const body = await response.body();
  expect(body.length, "asset bundle size").toBeGreaterThan(MIN_ARCHIVE_BYTES);

  // adm-zip is what builds this response, so it is also what a bad bump of
  // adm-zip would break — and it would break it into something with the right
  // status, the right content-type and roughly the right size. Reading the
  // entries back is the only assertion here that would notice.
  const entries = new AdmZip(body).getEntries();
  expect(entries.length, "entries in the asset bundle").toBeGreaterThan(0);
});
