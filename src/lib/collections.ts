import { getCollection, getEntries, type CollectionEntry } from "astro:content";

export function getEventsCollection() {
  return getCollection("events");
}

export function getEventsSubpagesCollection(event: CollectionEntry<"events">) {
  return getEntries(event.data.subpages);
}
