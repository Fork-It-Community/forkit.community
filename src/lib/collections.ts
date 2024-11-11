import type { Event } from "@/content/events/events";
import { getCollection, getEntries } from "astro:content";

export function getEventsCollection() {
  return getCollection("events");
}
export function getMeetupsCollection() {
  return getCollection("meetups");
}

export function getEventsSubpagesCollection(event: Event) {
  return getEntries(event.subPages);
}
