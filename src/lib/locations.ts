import { getCollection } from "astro:content";
import { isEventPublished } from "./events";

export async function getLocationsCollection() {
  return await getCollection("events", ({ data }) =>
    import.meta.env.PROD ? isEventPublished(data.status) : true,
  );
}
