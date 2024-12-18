import type { Event } from "@/content/events/events";
import type { Talk } from "@/content/talks/talks";
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

export async function getTalkSpeakers(talk: Talk) {
  if (!talk) {
    return [];
  }
  const speakersEntries = talk.speakers.map((speaker) => {
    return {
      collection: "people" as CollectionEntry<"people">["collection"],
      slug: speaker as CollectionEntry<"people">["slug"],
    };
  });
  return await getEntries(speakersEntries);
}

export async function getSponsors(event: Event) {
  if (!event.sponsors) {
    return;
  }
  const sponsorsEntries = event.sponsors.map((sponsor) => {
    return {
      collection: "sponsors" as CollectionEntry<"sponsors">["collection"],
      slug: sponsor.slug as CollectionEntry<"sponsors">["slug"],
    };
  });
  return await getEntries(sponsorsEntries);
}

export async function getPartners(event: Event) {
  if (!event.partners) {
    return;
  }
  const partnersEntries = event.partners.map((slug) => {
    return {
      collection: "partners" as CollectionEntry<"partners">["collection"],
      slug: slug as CollectionEntry<"partners">["slug"],
    };
  });
  return await getEntries(partnersEntries);
}
