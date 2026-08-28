import { expect, test, waitForHydration } from "./support/browser";

/**
 * The only links on the site that a browser is genuinely needed for.
 *
 * Everything else is a plain <a href> in server-rendered HTML, which the
 * link-graph spec follows over HTTP far more thoroughly than clicking ever
 * could. These two menus are different: their links do not exist until the
 * island hydrates and the user opens them, so no crawler can reach them.
 *
 * Both viewports live in one spec to keep the suite's size honest. The cost
 * is that a failure says "nav broke" and you read the trace to learn which.
 */

const DESKTOP = { width: 1280, height: 800 };
const MOBILE = { width: 390, height: 844 };

/**
 * Both menus render in the DOM at every width, hidden by CSS at the wrong
 * breakpoint, so the trigger is picked by visibility. Scoped to <nav> and
 * matched exactly: accessible-name search is a substring match, so an
 * unscoped "More" also catches the cookie banner's "Learn more".
 */
const visibleMoreTrigger = (page: import("@playwright/test").Page) =>
  page
    .locator("nav")
    .getByRole("button", { name: "More", exact: true })
    .filter({ visible: true });

const openAndFollowFirstLink = async (
  page: import("@playwright/test").Page,
) => {
  const trigger = visibleMoreTrigger(page);
  await expect(trigger).toHaveCount(1);
  await waitForHydration(trigger);
  await trigger.click();

  // Both menus are Radix dialogs under the hood — a popover on desktop, a
  // vaul drawer on mobile — and both portal out of the nav. Locating the
  // panel by role avoids class names and portal internals, and survives the
  // aria-hidden that the drawer applies to everything behind it (which does
  // remove the trigger itself from the accessibility tree once open).
  const panel = page.getByRole("dialog").filter({ visible: true });
  await expect(panel).toHaveCount(1);

  const link = panel.getByRole("link").first();
  await expect(link).toBeVisible();

  const href = await link.getAttribute("href");
  expect(href, "menu link should have an href").toBeTruthy();

  await link.click();
  await page.waitForURL(`**${href}`);
  await expect(page.locator("body")).not.toBeEmpty();
};

test("the desktop More menu opens and its links work", async ({ page }) => {
  await page.setViewportSize(DESKTOP);
  await page.goto("/");
  await openAndFollowFirstLink(page);
});

test("the mobile More drawer opens and its links work", async ({ page }) => {
  await page.setViewportSize(MOBILE);
  await page.goto("/");
  await openAndFollowFirstLink(page);
});
