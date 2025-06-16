import { getEventsCollection, getEventWithComputed } from "@/lib/events";
import { ROUTES } from "@/routes.gen";
import { lunalink, type ExtractParams } from "@bearstudio/lunalink";
import type { APIRoute } from "astro";
import dayjs from "dayjs";
import { isEmpty } from "remeda";

type EventWithComputed = Awaited<ReturnType<typeof getEventWithComputed>>;

export const GET: APIRoute<
  {},
  ExtractParams<(typeof ROUTES.events)[":id"]["__path"]>
> = async ({ params }) => {
  const event = await getEventWithComputed(params.id);

  return new Response(
    `# ${event?.data._computed.name}

Join us on ${dayjs(event.data.date).format("DD/MM/YYYY")} to listen to ${event.data.speakers?.length} speakers at ${
      event.data.location?.name
    }

${displayVenue(event)}

${displaySchedule(event)}

${displaySpeakers(event)}

${displayAfterEvent(event)}

${displaySponsors(event)}`,
    {
      headers: { "Content-Type": "text/plain; charset=utf-8" },
    },
  );
};

export async function getStaticPaths() {
  const events = await getEventsCollection();

  return events.map((event) => ({ params: { id: event.id } }));
}

const displayVenue = (event: EventWithComputed) => {
  if (!event.data.location) return "";

  return `## Venue

${event.data.location?.name}, ${event.data.location?.address}`;
};

const displaySchedule = (event: EventWithComputed) => {
  if (isEmpty(event.data._computed.talks)) return "";

  return `## Schedule

${event.data._computed.talks
  ?.map(
    (item) =>
      `- [${item?.data.title}](${lunalink(ROUTES.events[":id"].talks[":talkId"].__path, { id: event.id, talkId: item.id ?? "" })})`,
  )
  .join("\n")}`;
};

const displaySpeakers = (event: EventWithComputed) => {
  if (!event.data.speakers) return "";

  return `## Speakers

${event.data.speakers
  .map(
    (speaker) =>
      `- ${speaker.id} (${lunalink(ROUTES.people[":id"].__path, { id: speaker.id ?? "" })})`,
  )
  .join("\n")}`;
};

const displayAfterEvent = (event: EventWithComputed) => {
  if (!event.data.afterEventContent) return "";

  const { afterMovie, photos, vods } = event.data.afterEventContent;

  return `## After event

${
  afterMovie
    ? `### afterMovie
- ${afterMovie.href}`
    : ""
}

${
  photos
    ? `### Photos 
- ${photos.href}`
    : ""
}      

${
  vods
    ? `### VODs 
- ${vods.href}`
    : ""
}`;
};

const displaySponsors = (event: EventWithComputed) => {
  if (!event.data.sponsors) return "";

  return `## Sponsors

${event.data.sponsors.map((sponsors) => `- ${sponsors.slug.id}`).join("\n")}`;
};
