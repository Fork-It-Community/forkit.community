import { defineConfig, devices } from "@playwright/test";

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
const baseURL = process.env.E2E_BASE_URL ?? "http://localhost:4321";

/**
 * Vercel preview deployments are protected by default. Without this header
 * every single request comes back as a 401 from Vercel's auth wall.
 */
const bypassSecret = process.env.VERCEL_AUTOMATION_BYPASS_SECRET;

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
          command: "pnpm build:node && pnpm preview",
          url: "http://localhost:4321",
          reuseExistingServer: !process.env.CI,
          // A cold build renders every satori asset template; not fast.
          timeout: 300_000,
        },
      }),
});
