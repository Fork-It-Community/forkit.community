import { getCollection, getEntries, type CollectionEntry } from "astro:content";
import dayjs from "dayjs";

export const shouldBuildEventImage = (props: {
  event: CollectionEntry<"events">;
}) => {
  return dayjs().isBefore(dayjs(props.event.data.date).add(1, "day"), "day");
};

export const getEventStaticPaths = async () => {
  const events = await getCollection("events");

  return Promise.all(
    events.map(async (event) => {
      const talksForEvent = await getCollection("talks", (item) =>
        event.data.schedule
          ?.map((activity) => activity.slug?.id)
          .includes(item.id),
      );

      return {
        params: { id: event.id },

        props: {
          event,
          talks: talksForEvent,
          coOrganizers: await getEntries(event.data.coOrganizers ?? []),
        },
      };
    }),
  );
};

const cleanFileName = (path: string) =>
  path
    .split("/")
    .at(-1)
    ?.replace(/\.tsx$/, "")
    .replace(/^_/, "");

export const getEventAssetsSources = (event: CollectionEntry<"events">) => {
  const eventFilesNames = Object.keys(
    import.meta.glob("./_*.tsx", { eager: true }),
  ).map(cleanFileName);
  const talkFilesNames = Object.keys(
    import.meta.glob("../talks/[talkId]/dynamic-images/_*.tsx", {
      eager: true,
    }),
  ).map(cleanFileName);
  const partnersFilesNames = Object.keys(
    import.meta.glob("../partners/[partnerId]/dynamic-images/_*.tsx", {
      eager: true,
    }),
  ).map(cleanFileName);

  const sponsors = event.data.sponsors?.map((s) => s.slug) ?? [];
  const partners = event.data.partners ?? [];
  const coOrganizers = event.data.coOrganizers ?? [];

  return [
    eventFilesNames.map(
      (fileName) => `/events/${event.id}/dynamic-images/${fileName}.jpg`,
    ),
    event.data.schedule?.flatMap((talk) =>
      talkFilesNames.map((fileName) =>
        !talk.slug
          ? null
          : `/events/${event.id}/talks/${talk.slug.id}/dynamic-images/${fileName}.jpg`,
      ),
    ),
    [...coOrganizers, ...sponsors, ...partners].flatMap((partner) =>
      partnersFilesNames.map(
        (fileName) =>
          `/events/${event.id}/partners/${partner.id}/dynamic-images/${fileName}.jpg`,
      ),
    ),
  ]
    .flat()
    .filter((x) => x !== undefined && x !== null);
};
