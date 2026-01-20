import type { CollectionEntry } from "astro:content";

export const OG_IMAGE = {
  width: 1920,
  height: 1080,
};
export const DEFAULT_NUMBER_OF_GUESTS = {
  meetup: 30,
  event: 100,
} as const;

export const ASSET_CATEGORIES = [
  { id: "/save-the-date", label: "Save the Date" },
  { id: "/tickets", label: "Tickets" },
  { id: "/d-", label: "Announcements" },
  { id: "/talks/", label: "Talks" },
  { id: "/partners/", label: "Partners" },
  { id: "/banner", label: "Banners" },
  { id: "/qrcode", label: "QR Codes" },
  { id: "/cfp-", label: "CFP" },
  { id: "/schedule", label: "Schedule" },
  { id: "other", label: "Other" },
] as const;

export type AssetCategoryId = (typeof ASSET_CATEGORIES)[number]["id"];

export const EXCLUDED_CATEGORIES_BY_TYPE: Record<
  CollectionEntry<"events">["data"]["type"],
  AssetCategoryId[]
> = {
  meetup: ["/cfp-", "/banner"],
  event: [],
};
