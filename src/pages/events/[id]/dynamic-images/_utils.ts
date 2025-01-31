import { getCollection } from "astro:content";

export const getEventStaticPaths = async () => {
  const events = await getCollection("events");

  return events.map((event) => {
    return {
      params: { id: event.id },
      props: {
        event,
      },
    };
  });
};
