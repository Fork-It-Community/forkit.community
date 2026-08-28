import { expect, test, waitForHydration } from "./support/browser";
import { fetchSitemapPaths } from "./support/sitemap";
import { newestEvents } from "./support/select";

/**
 * The attendee ticket flow: type a name, get a shareable ticket page.
 *
 * Entirely client-side — the form does no request and persists nothing, it
 * just redirects to a URL built from the name — so this is safe to run
 * against any target, production included.
 */

const ATTENDEE_NAME = "E2E Test";

test("submitting the attendee form produces a ticket page", async ({
  page,
}) => {
  const paths = await fetchSitemapPaths(page.request);
  const [event] = newestEvents(paths, 1);
  expect(event, "no event found in the sitemap").toBeTruthy();

  await page.goto(`${event}/attendee`);

  const nameInput = page.getByPlaceholder("Your name");
  await waitForHydration(nameInput);
  await nameInput.fill(ATTENDEE_NAME);
  await page.getByRole("button", { name: "Generate" }).click();

  await page.waitForURL(
    `**${event}/attendee/${encodeURIComponent(ATTENDEE_NAME)}`,
  );
  await expect(page.getByRole("img").first()).toBeVisible();
});
