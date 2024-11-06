import type { Event } from "@/content/events/events";
import { getCollection, getEntries, type CollectionEntry } from "astro:content";

export function getEventsCollection() {
  return getCollection("events");
}

export function getEventsSubpagesCollection(event: Event) {
  const subPages = event.subPages.map((subPage) => {
    return {
      collection:
        "eventsSubPages" as CollectionEntry<"eventsSubPages">["collection"],
      slug: subPage.slug,
    };
  });
  return getEntries(subPages);
}
export function getSpeakers(event: Event) {
  const speakers = event.speakers.map((speaker) => {
    return {
      collection: "people" as CollectionEntry<"people">["collection"],
      slug: speaker as CollectionEntry<"people">["slug"],
    };
  });
  return getEntries(speakers);
}
