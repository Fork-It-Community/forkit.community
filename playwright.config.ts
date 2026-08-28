import { defineConfig, devices } from "@playwright/test";
import { isVercelTarget } from "./e2e/support/target";

/**
 * A single environment switch: `E2E_BASE_URL`.
 *
 * - unset  -> build the site with the node adapter and serve it locally
 * - set    -> run against that target and start no server
 *
 * Vercel-only behaviour (the `vercel.json` redirects) is detected from the
 * target hostname rather than from a second variable, so contributors only
 * ever have one thing to know about.
 */
/**
 * A dedicated port, not Astro's default 4321. Sharing it means a dev server
 * someone left running gets picked up instead — and a dev server serves pages
 * but generates no sitemap and no robots.txt, so the suite would quietly test
 * something other than what ships.
 */
const LOCAL_PORT = 4329;
const localURL = `http://localhost:${LOCAL_PORT}`;

const baseURL = process.env.E2E_BASE_URL ?? localURL;

/**
 * Sent only when Deployment Protection is on, and only to Vercel hosts.
 *
 * The host check matters: `E2E_BASE_URL` is free-form, so without it a
 * mistyped or hostile target would receive a credential that bypasses
 * protection on every deployment of this project. Same predicate the
 * redirect spec gates on, so the config and the suite agree on what
 * "a Vercel target" means.
 */
const bypassSecret = isVercelTarget(baseURL)
  ? process.env.VERCEL_AUTOMATION_BYPASS_SECRET
  : undefined;

export default defineConfig({
  testDir: "./e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  // Retries hide nothing locally, but a merge-blocking check that fails on a
  // single Vercel cold start is a check people learn to ignore.
  retries: process.env.CI ? 2 : 0,
  timeout: 60_000,
  expect: { timeout: 15_000 },
  reporter: process.env.CI
    ? [["list"], ["html", { open: "never" }]]
    : [["list"]],

  use: {
    ...devices["Desktop Chrome"],
    baseURL,
    trace: "on-first-retry",
    extraHTTPHeaders: bypassSecret
      ? {
          "x-vercel-protection-bypass": bypassSecret,
          "x-vercel-set-bypass-cookie": "true",
        }
      : {},
  },

  // Only start a server when no target was given. `exactOptionalPropertyTypes`
  // rules out passing `undefined`, hence the spread.
  ...(process.env.E2E_BASE_URL
    ? {}
    : {
        webServer: {
          command: `pnpm build:node && pnpm preview --port ${LOCAL_PORT}`,
          url: localURL,
          // Never reuse: a server left over from an earlier run would serve a
          // stale build. To iterate without rebuilding, start a server by hand
          // and point E2E_BASE_URL at it.
          reuseExistingServer: false,
          timeout: 300_000,
        },
      }),
});
