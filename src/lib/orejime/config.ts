import consentEn from "@/i18n/en/consent.json";

export interface OrejimeConfig {
  privacyPolicy: string;
  purposes: Array<{
    name: string;
    title: string;
    description: string;
  }>;
  apps: Array<{
    name: string;
    title: string;
    description?: string;
    purposes: string[];
    cookies: Array<string | [string, string, string]>;
    required?: boolean;
    optOut?: boolean;
    default?: boolean;
    onlyOnce?: boolean;
  }>;
  translations?: Record<string, any>;
  cookieName?: string;
  cookieExpiresAfterDays?: number;
  mustConsent?: boolean;
}

export function getOrejimeConfig(): OrejimeConfig {
  return {
    privacyPolicy: "/privacy-policy",
    cookieName: "forkit-consent",
    cookieExpiresAfterDays: 365,
    mustConsent: false,

    purposes: [
      {
        name: "analytics",
        title: "Analytics",
        description:
          "Help us understand how visitors interact with our website.",
      },
      {
        name: "marketing",
        title: "Marketing",
        description: "Marketing and advertising purposes.",
      },
    ],

    apps: [
      {
        name: "meta-pixel",
        title: consentEn.purposes.metaPixel.title,
        description: consentEn.purposes.metaPixel.description,
        purposes: ["marketing", "analytics"],
        cookies: ["_fbp", "fr"],
        required: false,
        optOut: false,
        default: false,
        onlyOnce: true,
      },
      {
        name: "vercel-analytics",
        title: consentEn.purposes.vercelAnalytics.title,
        description: consentEn.purposes.vercelAnalytics.description,
        purposes: ["analytics"],
        cookies: ["__vercel_live_token", "_vercel_jwt", "__va"],
        required: false,
        optOut: false,
        default: false,
        onlyOnce: false,
      },
    ],

    translations: {
      en: {
        consentModal: {
          description: consentEn.modal.description,
        },
        purposes: {
          analytics: "Analytics",
          marketing: "Marketing",
        },
      },
    },
  };
}
