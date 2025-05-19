import { getCollection, getEntry } from "astro:content";
import { isEventPublished } from "./events";
import dayjs from "dayjs";

export async function getForKidsEventsCollection() {
  return (
    await getCollection("forKidsEvent", ({ data }) =>
      import.meta.env.PROD ? isEventPublished(data.status) : true,
    )
  ).sort((a, b) => dayjs(b.data.date).diff(a.data.date));
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

  return [
    ...(forKidsEvent.data.location
      ? [
          {
            href: `/for-kids-events/${forKidsEvent.id}#venue`,
            label: "Venue",
          },
        ]
      : []),
    {
      href: `/for-kids-events/${forKidsEvent.id}#schedule`,
      label: "Schedule",
    },
    ...(forKidsEvent.data.faq?.length
      ? [{ href: `/events/${forKidsEvent.id}#faq`, label: "FAQ" }]
      : []),
  ];
}
