import { NotFoundAssetError } from "@/generated-assets/api";
import { getCollection, getEntries, getEntry } from "astro:content";

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
