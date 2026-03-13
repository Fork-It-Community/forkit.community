import { getEventDisplayType, getEventsCollection } from "@/lib/events";
import { toXml } from "@/lib/xml";
import rss from "@astrojs/rss";
import type { APIRoute } from "astro";

export const GET: APIRoute = async function get(context) {
  const events = await getEventsCollection();
  return rss({
    title: "Fork it! Community | Events",
    description:
      "All the Fork it! events, from meetups to full day events, come take a look at what is happening near you!",
    site: context.site! + "/events",
    trailingSlash: false,
    xmlns: {
      atom: "http://www.w3.org/2005/Atom",
      forkit: "https://forkit.community/rss",
    },
    items: events.map((event) => {
      const location = event.data.location;

      return {
        title: `${event.data._computed.name}, ${getEventDisplayType(event.data.type)}`,
        description: event.data.excerpt,
        link: `${context.site}events/${event.id}`,
        pubDate: event.data.date,
        categories: [event.data.type],
        customData: location
          ? toXml({
              "forkit:venue": {
                ...(location.name && { "forkit:name": location.name }),
                "forkit:address": location.address,
              },
            })
          : "",
      };
    }),
    customData: toXml({
      language: "en-EN",
      "atom:link": {
        _attrs: {
          href: `${context.site}events/rss.xml`,
          rel: "self",
          type: "application/rss+xml",
        },
      },
    }),
  });
};
