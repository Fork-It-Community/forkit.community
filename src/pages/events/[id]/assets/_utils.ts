import { NotFoundAssetError } from "@/generated-assets/api";
import { getImageNameFromTsxPath } from "@/generated-assets/image";
import {
  getCollection,
  getEntries,
  getEntry,
  type CollectionEntry,
} from "astro:content";

export const getEventData = async (id: string) => {
  const event = await getEntry("events", id);
  if (!event) {
    throw new NotFoundAssetError();
  }

  const talksForEvent = await getCollection("talks", (item) =>
    event.data.schedule?.map((activity) => activity.slug?.id).includes(item.id),
  );

  return {
    ...event,
    __talks: talksForEvent,
    __coOrganizers: await getEntries(event.data.coOrganizers ?? []),
  };
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

  return [
    eventFilesNames.map(
      (fileName) => `/events/${event.id}/assets/${fileName}.jpg`,
    ),
    event.data.schedule?.flatMap((talk) =>
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
