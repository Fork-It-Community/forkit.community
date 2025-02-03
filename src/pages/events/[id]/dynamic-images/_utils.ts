import { getCollection, getEntries } from "astro:content";
import dayjs from "dayjs";

export const shouldBuildEventImage = (props: {
  event: { data: { date: Date } };
}) => {
  return dayjs().isBefore(dayjs(props.event.data.date).add(1, "day"), "day");
};

export const getEventStaticPaths = async () => {
  const events = await getCollection("events");

  return Promise.all(
    events.map(async (event) => {
      const talksForEvent = await getCollection("talks", (item) =>
        event.data.schedule
          ?.map((activity) => activity.slug?.id)
          .includes(item.id),
      );

      return {
        params: { id: event.id },

        props: {
          event,
          talks: talksForEvent,
          coOrganizers: await getEntries(event.data.coOrganizers ?? []),
        },
      };
    }),
  );
};
