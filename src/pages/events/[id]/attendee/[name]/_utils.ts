import { NotFoundAssetError } from "@/generated-assets/api";
import { getEntry } from "astro:content";

export const getEventData = async (id: string) => {
  const event = await getEntry("events", id);
  if (!event || event.data.type !== "event") {
    throw new NotFoundAssetError();
  }

  return event;
};
