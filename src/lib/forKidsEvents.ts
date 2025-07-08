import { getCollection, getEntry, type CollectionEntry } from "astro:content";
import { isEventPublished } from "./events";
import dayjs from "dayjs";
import { lunalink } from "@bearstudio/lunalink";
import { ROUTES } from "@/routes.gen";

export async function getForKidsEventsCollection() {
  return Promise.all(
    (
      await getCollection("forKidsEvent", ({ data }) =>
        import.meta.env.PROD ? isEventPublished(data.status) : true,
      )
    )
      .sort((a, b) => dayjs(b.data.date).diff(a.data.date))
      .map(forKidsEventWithComputed),
  );
}

export async function getForKidsEvent(id: string) {
  const forKidsEvent = await getEntry("forKidsEvent", id);
  if (import.meta.env.PROD && !isEventPublished(forKidsEvent?.data.status)) {
    return undefined;
  }
  return forKidsEvent;
}

export async function getForKidsEventNavItems(id: string) {
  const forKidsEvent = await getForKidsEvent(id);

  if (!forKidsEvent) return [];

  const route = lunalink(ROUTES.fr.events["for-kids"][":id"].__path, {
    id: forKidsEvent.id,
  });

  return [
    {
      href: `${route}#presentation`,
      label: "Présentation",
    },
    {
      href: `${route}#schedule`,
      label: "Programme",
    },
    ...(forKidsEvent.data.location
      ? [
          {
            href: `${route}#venue`,
            label: "Lieu",
          },
        ]
      : []),
    ...(forKidsEvent.data.faq?.length
      ? [{ href: `${route}#faq`, label: "FAQ" }]
      : []),
  ];
}

export function getForKidsEventFrenchDisplayDate(forKidsEventDate: Date) {
  return forKidsEventDate
    ? dayjs(forKidsEventDate).locale("fr").format("D MMMM YYYY") + " "
    : "";
}

export function getForKidsEventFrenchDisplayHour(forKidsEventDate?: Date) {
  return forKidsEventDate
    ? dayjs(forKidsEventDate).locale("fr").format("HH")
    : "";
}

type GetForKidsEventsParams = {
  limit?: number;
};

export async function getUpcomingForKidsEvents({
  limit = undefined,
}: GetForKidsEventsParams = {}) {
  const forKidsEvents = await getForKidsEventsCollection();
  const upcomingForKidsEvents =
    forKidsEvents
      .filter((forKidsEvent) =>
        dayjs(forKidsEvent.data.date).endOf("day").isAfter(dayjs()),
      )
      .sort(
        (forKidsEvent1, forKidsEvent2) =>
          (forKidsEvent1.data.date?.valueOf() ?? 0) -
          (forKidsEvent2.data.date?.valueOf() ?? 0),
      ) ?? [];

  if (limit) {
    return upcomingForKidsEvents.slice(0, limit);
  }

  return upcomingForKidsEvents;
}

export async function getPastForKidsEvents({
  limit = undefined,
}: GetForKidsEventsParams = {}) {
  const forKidsEvents = await getForKidsEventsCollection();
  const pastForKidsEvents =
    forKidsEvents
      .filter((forKidsEvent) =>
        dayjs(forKidsEvent.data.date).endOf("day").isBefore(dayjs()),
      )
      .sort(
        (forKidsEvent1, event2) =>
          (event2.data.date?.valueOf() ?? 0) -
          (forKidsEvent1.data.date?.valueOf() ?? 0),
      ) ?? [];

  if (limit) {
    return pastForKidsEvents.slice(0, limit);
  }

  return pastForKidsEvents;
}

export function shouldShowForKidsTickets(
  event: CollectionEntry<"forKidsEvent">,
): event is CollectionEntry<"forKidsEvent"> & {
  data: {
    tickets: NonNullable<CollectionEntry<"forKidsEvent">["data"]["tickets"]>;
  };
} {
  if (event.data.status === "cancelled") {
    return false;
  }

  return !!(
    event.data.tickets &&
    dayjs(event.data.tickets.endDate ?? event.data.date)
      .endOf("day")
      .isAfter(dayjs())
  );
}

export type ForKidsEventComputed = Awaited<
  ReturnType<typeof forKidsEventWithComputed>
>;
export async function forKidsEventWithComputed<
  Event extends CollectionEntry<"forKidsEvent">,
>(event: Event) {
  const city = await getEntry("cities", event.data.city.id);

  const country = city
    ? await getEntry("countries", city.data.country.id)
    : undefined;

  return {
    ...event,
    data: {
      ...event.data,
      _computed: {
        name: `For Kids ${city?.data.name}, ${country?.data.name}, ${event.data.date.getFullYear()}`,
        city,
        country,
      },
    },
  };
}
