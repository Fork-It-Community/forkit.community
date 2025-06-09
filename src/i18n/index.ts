import i18next from "i18next";
import { getRelativeLocaleUrl } from "astro:i18n";

import commonEn from "./en/common.json";
import eventsEn from "./en/events.json";
import footerEn from "./en/footer.json";

import commonFr from "./fr/common.json";
import eventsFr from "./fr/events.json";
import footerFr from "./fr/footer.json";

export const SUPPORTED_LANG = ["en", "fr"] as const;
export const DEFAULT_LANG = "en";

export type SupportedLang = (typeof SUPPORTED_LANG)[number];
export type Resource = {
  common: typeof commonEn;
  events: typeof eventsEn;
  footer: typeof footerEn;
};

const resources: Record<SupportedLang, Resource> = {
  en: {
    common: commonEn,
    events: eventsEn,
    footer: footerEn,
  },
  fr: {
    common: commonFr,
    events: eventsFr,
    footer: footerFr,
  },
};

export async function init() {
  await i18next.init({
    lng: DEFAULT_LANG,
    debug: false,
    defaultNS: "common",
    ns: ["common", "home", "events"],
    resources,

    // Fix issue with i18next types
    // https://www.i18next.com/overview/typescript#argument-of-type-defaulttfuncreturn-is-not-assignable-to-parameter-of-type-xyz
    returnNull: false,

    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });
}

/**
 * Localize navigation path
 */
function l(path: string, { targetLocale }: { targetLocale?: string } = {}) {
  if (targetLocale) {
    return `${targetLocale === "fr" ? "" : "/" + targetLocale}${path}`;
  }

  const lang = i18next.language;
  return getRelativeLocaleUrl(lang, path);
}

export const LOCALE_FULL_NAME: Record<SupportedLang, string> = {
  en: "en_US",
  fr: "fr_FR",
};

const { changeLanguage, t } = i18next;

export { t, changeLanguage, l };
export default i18next;
