import { getCollection, getEntries } from "astro:content";

export const getEventStaticPaths = async () => {
  const events = await getCollection("events");

  return Promise.all(
    events.map(async (event) => ({
      params: { id: event.id },
      props: {
        event,
        coOrganizers: await getEntries(event.data.coOrganizers ?? []),
      },
    })),
  );
};
