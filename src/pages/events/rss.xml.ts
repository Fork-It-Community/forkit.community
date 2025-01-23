import type { APIRoute } from "astro";
import rss from "@astrojs/rss";
import { getEventsCollection } from "@/lib/events";
import dayjs from "dayjs";
import { match } from "ts-pattern";

export const GET: APIRoute = async function get(context) {
  const events = await getEventsCollection();
  return rss({
    title: "Fork it! Community events",
    description:
      "All the Fork it! events, from meetups to full day events, come take a look at what is happening near you.",
    site: context.site!,
    items: events.map((event) => ({
      title: `${event.data.city}, ${event.data.country}, ${dayjs(event.data.date).format("YYYY")}, ${match(
        event.data.type,
      )
        .with("event", () => "Full Day Event")
        .with("meetup", () => "Community Meetup")
        .exhaustive()}`,
      description: event.data.excerpt,
      link: `${context.site}events/${event.id}`,
      pubDate: event.data.date,
      categories: [event.data.type],
    })),
    customData: `<language>en-EN</language>`,
  });
};
