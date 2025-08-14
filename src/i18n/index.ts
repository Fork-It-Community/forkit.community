import i18next from "i18next";

import "dayjs/locale/fr";
import "dayjs/locale/en";

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

export const LOCALE_FULL_NAME: Record<SupportedLang, string> = {
  en: "en_US",
  fr: "fr_FR",
};

const { changeLanguage, t } = i18next;

export { t, changeLanguage };
export default i18next;
