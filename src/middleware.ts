import { changeLanguage, init } from "@/i18n";
import { defineMiddleware } from "astro:middleware";
import { getCollection } from "astro:content";
import { getUpcomingEvents } from "@/lib/events";

export const onRequest = defineMiddleware(
  async ({ currentLocale, url }, next) => {
    await init();
    changeLanguage(currentLocale);

    const segments = url.pathname.split("/").filter(Boolean);
    if (segments.length === 1) {
      const cities = await getCollection("cities");
      const city = cities.find((c) => c.id === segments[0]);

      if (city) {
        const nextEvent = (await getUpcomingEvents()).find(
          (e) =>
            e.data._computed.city?.id === city.id &&
            e.data.status === "published",
        );
        return Response.redirect(
          new URL(nextEvent ? `/events/${nextEvent.id}` : "/", url),
          302,
        );
      }
    }

    return next();
  },
);
