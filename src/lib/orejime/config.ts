export type PurposeCookieProps = [
  pattern: RegExp,
  path: string,
  domain: string,
];

export type PurposeCookie = string | RegExp | PurposeCookieProps;

export interface CorePurpose {
  id: string;
  isMandatory?: boolean;
  isExempt?: boolean;
  runsOnce?: boolean;
  default?: boolean;
  cookies: PurposeCookie[];
}

export type ConsentsMap = { [id: Purpose["id"]]: boolean };

export type CookieOptions = {
  name: string;
  domain?: string;
  duration: number;
  sameSite?: CookieSameSite;
  parse?: (consents: string) => ConsentsMap;
  stringify?: (consents: ConsentsMap) => string;
};

export interface Purpose extends CorePurpose {
  id: string;
  title: string;
  description?: string;
}

export interface PurposeGroup {
  id: string;
  title: string;
  description?: string;
  purposes: Purpose[];
}

export type PurposeList = Array<PurposeGroup | Purpose>;

export interface BannerTranslations {
  title?: string;
  description?: string;
  privacyPolicyLabel?: string;
  accept?: string;
  acceptTitle?: string;
  decline?: string;
  declineTitle?: string;
  configure: string;
  configureTitle?: string;
}

export interface ModalTranslations {
  title?: string;
  description: string;
  privacyPolicyLabel: string;
  close: string;
  closeTitle: string;
  globalPreferences: string;
  acceptAll: string;
  declineAll: string;
  save?: string;
  saveTitle?: string;
}

export interface ContextualNoticeTranslations {
  title: string;
  description: string;
  privacyPolicyLabel: string;
  accept: string;
  acceptTitle?: string;
  accepted: string;
}

export interface PurposeTranslations {
  mandatory: string;
  mandatoryTitle: string;
  exempt: string;
  exemptTitle: string;
  showMore: string;
  accept: string;
  decline: string;
  enabled: string;
  disabled: string;
  partial: string;
}

export interface MiscTranslations {
  newWindowTitle: string;
  updateNeeded: string;
  poweredBy: string;
}

export interface Translations {
  banner: BannerTranslations;
  modal?: ModalTranslations;
  contextual?: ContextualNoticeTranslations;
  purpose?: PurposeTranslations;
  misc?: MiscTranslations;
}

export type ElementReference = string | HTMLElement;

export type ImageAttributes = {
  src: string;
  alt: string;
};

export type ImageDescriptor = string | ImageAttributes;

export interface Config {
  // theme: Theme;
  orejimeElement?: ElementReference;
  purposes: PurposeList;
  cookie?: CookieOptions;
  logo?: ImageDescriptor;
  forceBanner?: boolean;
  forceModal?: boolean;
  privacyPolicyUrl: string;
  translations: Translations;
}

export function getOrejimeConfig(): Config {
  return {
    privacyPolicyUrl: "/privacy-policy",

    cookie: {
      name: "forkit-consent",
      duration: 365,
    },

    purposes: [
      {
        id: "marketing",
        title: "Marketing",
        description:
          "We use Meta Pixel to measure advertising effectiveness and improve our marketing campaigns. This helps us understand which content resonates with our community.",
        cookies: ["_fbp", "fr"],
      },
      {
        id: "analytics",
        title: "Analytics",
        description:
          "We use Vercel Analytics and Clarity to understand how visitors navigate our website and identify areas for improvement. This helps us provide a better user experience.",
        cookies: ["__vercel_live_token", "_vercel_jwt", "__va", "_clck", "_clsk"],
      },
    ],

    translations: {
      banner: {
        configure: "Learn more",
      },
    },
  };
}
