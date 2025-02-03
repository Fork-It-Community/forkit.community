import { getEventsCollection } from "@/lib/events";
import { getEntries, getEntry } from "astro:content";

export const getEventTalkStaticPaths = async () => {
  const events = await getEventsCollection();

  const talks = (
    await Promise.all(
      events.map(async (event) => {
        const talks = await getEntries(
          (event.data.schedule ?? [])
            .map((activity) => activity.slug)
            .filter((s) => !!s),
        );

        return Promise.all(
          talks.map(async (s) => ({
            ...s,
            speakers: await Promise.all(
              s.data.speakers.map(async (speaker) => ({
                ...speaker,
                ...(await getEntry(speaker.id)),
              })),
            ),
            __event: event,
            __schedule: event.data.schedule?.find(
              (activity) => activity.slug?.id === s.id,
            ),
          })),
        );
      }),
    )
  ).flat();

  return Promise.all(
    talks.map(async (talk) => ({
      params: { id: talk.__event.id, talkId: talk.id },
      props: {
        talk,
        coOrganizers: await getEntries(talk.__event.data.coOrganizers ?? []),
        schedule: talk.__schedule,
        speakers: (
          await getEntries(talk.data.speakers.map((speaker) => speaker.id))
        ).map((entry) => ({
          ...entry,
          data: {
            ...entry.data,
            __role: talk.data.speakers.find(
              (speaker) => speaker.id.id === entry.id,
            )?.role,
          },
        })),
        event: talk.__event,
      },
    })),
  );
};
