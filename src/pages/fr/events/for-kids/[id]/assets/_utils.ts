import { NotFoundAssetError } from "@bearstudio/astro-dynamic-assets";
import { getEntry, type CollectionEntry } from "astro:content";

export async function forKidsEventWithComputed<
  Event extends CollectionEntry<"forKidsEvent">,
>(event: Event) {
  const city = await getEntry("cities", event.data.city.id);

  const country = city
    ? await getEntry("countries", city.data.country.id)
    : undefined;

  const talks = (
    event.data.workshops
      ? await Promise.all(
          (event.data.workshops ?? []).map(async (item) => {
            if (!item.id) {
              return;
            }
            return await getEntry("forKidsWorkshop", item.id);
          }),
        )
      : []
  ).filter((i) => !!i);

  return {
    ...event,
    data: {
      ...event.data,
      _computed: {
        name: `${city?.data.name}, ${country?.data.name}, ${event.data.date.getFullYear()}`,
        city,
        country,
        talks,
      },
    },
  };
}

export const getEventData = async (id: string) => {
  const event = await getEntry("forKidsEvent", id);
  if (!event) {
    throw new NotFoundAssetError();
  }

  return forKidsEventWithComputed({
    ...event,
  });
};
