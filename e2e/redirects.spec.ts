import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { expect, test } from "@playwright/test";
import { mapWithConcurrency } from "./support/assert";
import { isVercelTarget } from "./support/target";

/**
 * The ~20 redirects in vercel.json, which carry every legacy /meetups/… URL
 * still out there in links and search results.
 *
 * Pure configuration, never exercised by anything else, and silent when it
 * rots — the highest value-per-line check in the suite. It is also the one
 * thing that genuinely cannot run locally: redirects are applied by Vercel's
 * edge, and a node-adapter preview knows nothing about them.
 */

type Redirect = {
  source: string;
  destination: string;
  statusCode?: number;
};

const vercelConfig = JSON.parse(
  readFileSync(
    fileURLToPath(new URL("../vercel.json", import.meta.url)),
    "utf8",
  ),
) as { redirects?: Redirect[] };

/** A concrete segment to stand in for `:path*` on both sides of a wildcard. */
const WILDCARD_SAMPLE = "schedule";

const concrete = (pattern: string): string =>
  pattern.replace(/\/:path\*/g, `/${WILDCARD_SAMPLE}`);

test.describe("vercel.json redirects", () => {
  test.skip(
    ({ baseURL }) => !isVercelTarget(baseURL),
    "Redirects are applied by Vercel; a local node-adapter preview does not serve them.",
  );

  test("every configured redirect points where it should", async ({
    request,
  }) => {
    const redirects = vercelConfig.redirects ?? [];
    expect(
      redirects.length,
      "redirects declared in vercel.json",
    ).toBeGreaterThan(0);

    const problems = await mapWithConcurrency(
      redirects,
      5,
      async (redirect) => {
        const source = concrete(redirect.source);
        const destination = concrete(redirect.destination);
        const expectedStatus = redirect.statusCode ?? 308;

        const response = await request.get(source, { maxRedirects: 0 });
        const status = response.status();
        if (status !== expectedStatus) {
          return `${source} → HTTP ${status}, expected ${expectedStatus}`;
        }

        // Vercel answers with an absolute Location; only the path is portable.
        const location = response.headers()["location"] ?? "";
        const actual = location.startsWith("http")
          ? new URL(location).pathname
          : location;
        if (actual !== destination) {
          return `${source} → ${actual || "(no Location)"}, expected ${destination}`;
        }

        return null;
      },
    );

    expect(
      problems.filter((problem): problem is string => problem !== null),
      "redirects that did not behave as configured",
    ).toEqual([]);
  });
});
