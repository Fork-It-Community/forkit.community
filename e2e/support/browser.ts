import { test as base, type Locator } from "@playwright/test";

export { expect } from "@playwright/test";

/**
 * Consent state for the Orejime banner, pre-set so it never renders.
 *
 * Two reasons this is not optional. It overlays the page and intercepts
 * clicks, and its "Learn more" button matches an accessible-name search for
 * "More" — which is how it first showed up here, as a phantom second nav
 * trigger. Dismissing it in each spec would be three copies of the same
 * click and one more thing to remember when adding a fourth browser spec.
 */
const CONSENT_COOKIE = "forkit-consent";

export const test = base.extend({
  context: async ({ context, baseURL }, use) => {
    if (baseURL) {
      await context.addCookies([
        {
          name: CONSENT_COOKIE,
          value: JSON.stringify({ marketing: false, analytics: false }),
          url: baseURL,
        },
      ]);
    }
    await use(context);
  },
});

/**
 * Wait for the Astro island containing `target` to hydrate.
 *
 * Every interactive element in these specs is server-rendered first and wired
 * up later, so Playwright happily clicks a button that has no handler yet and
 * the click goes nowhere. It looks like a broken feature and it is really a
 * race — one that only shows up when the machine is busy, which is to say on
 * CI, which is to say on exactly the runs that block a merge.
 *
 * Astro marks a pending island with an `ssr` attribute and removes it on
 * hydration. Waiting globally is not an option: most islands on a page are
 * `client:visible` and stay pending forever below the fold, so this waits on
 * the one island that matters.
 */
export const waitForHydration = async (target: Locator): Promise<void> => {
  await target.evaluate(
    (element) =>
      new Promise<void>((resolve) => {
        const island = element.closest("astro-island");
        if (!island || !island.hasAttribute("ssr")) {
          resolve();
          return;
        }
        const observer = new MutationObserver(() => {
          if (island.hasAttribute("ssr")) return;
          observer.disconnect();
          resolve();
        });
        observer.observe(island, {
          attributes: true,
          attributeFilter: ["ssr"],
        });
      }),
  );
};
