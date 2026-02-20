import { ASSET_CATEGORIES, EXCLUDED_CATEGORIES_BY_TYPE } from "@/assets/consts";
import { NotFoundAssetError } from "@/generated-assets/api";
import { getImageNameFromTsxPath } from "@/generated-assets/image";
import { eventWithComputed } from "@/lib/events";
import {
  getCollection,
  getEntries,
  getEntry,
  type CollectionEntry,
} from "astro:content";
import { groupBy } from "remeda";

export const getEventData = async (id: string) => {
  const event = await getEntry("events", id);
  if (!event) {
    throw new NotFoundAssetError();
  }

  const talksForEvent = await getCollection("talks", (item) =>
    event.data.schedule?.items
      ?.map((activity) => activity.slug?.id)
      .includes(item.id),
  );
  const sponsorsIds = event.data.sponsors?.map((sponsor) => sponsor.slug) ?? [];
  return eventWithComputed({
    ...event,
    __talks: talksForEvent,
    __coOrganizers: await getEntries(event.data.coOrganizers ?? []),
    __sponsors: await getEntries(sponsorsIds),
  });
};

export const getEventAssetsSources = (event: CollectionEntry<"events">) => {
  const eventFilesNames = Object.keys(
    import.meta.glob("./_*.tsx", { eager: true }),
  ).map(getImageNameFromTsxPath);
  const talkFilesNames = Object.keys(
    import.meta.glob("../talks/[talkId]/assets/_*.tsx", {
      eager: true,
    }),
  ).map(getImageNameFromTsxPath);
  const partnersFilesNames = Object.keys(
    import.meta.glob("../partners/[partnerId]/assets/_*.tsx", {
      eager: true,
    }),
  ).map(getImageNameFromTsxPath);

  const sponsors = event.data.sponsors?.map((s) => s.slug) ?? [];
  const partners = event.data.partners ?? [];
  const coOrganizers = event.data.coOrganizers ?? [];
  const talks = event.data.schedule?.items?.filter(
    (talk) => talk.status !== "cancelled",
  );
  return [
    eventFilesNames.map(
      (fileName) => `/events/${event.id}/assets/${fileName}.jpg`,
    ),
    talks?.flatMap((talk) =>
      talkFilesNames.map((fileName) =>
        !talk.slug
          ? null
          : `/events/${event.id}/talks/${talk.slug.id}/assets/${fileName}.jpg`,
      ),
    ),
    [...coOrganizers, ...sponsors, ...partners].flatMap((partner) =>
      partnersFilesNames.map(
        (fileName) =>
          `/events/${event.id}/partners/${partner.id}/assets/${fileName}.jpg`,
      ),
    ),
  ]
    .flat()
    .filter((x) => x !== undefined && x !== null);
};

export const categorize = (path: string) =>
  ASSET_CATEGORIES.find(
    (category) => category.id !== "other" && path.includes(category.id),
  )?.id ?? "other";

const getOppositeSuffixes = (
  eventType: CollectionEntry<"events">["data"]["type"],
) => {
  const allTypes = ["meetup", "event"];
  return allTypes
    .filter((type) => type !== eventType)
    .map((type) => `-${type}.jpg`);
};

export const getGroupedAssets = (
  imagesSrc: string[],
  eventType: CollectionEntry<"events">["data"]["type"],
) => {
  const oppositeSuffixes = getOppositeSuffixes(eventType);
  const groups = groupBy(imagesSrc, categorize);

  return ASSET_CATEGORIES.filter(
    ({ id }) => !EXCLUDED_CATEGORIES_BY_TYPE[eventType].includes(id),
  )
    .map((category) => ({
      ...category,
      images: (groups[category.id] ?? []).filter((src) => {
        return !oppositeSuffixes.some((suffix) => src.endsWith(suffix));
      }),
    }))
    .filter(({ images }) => !!images.length);
};
