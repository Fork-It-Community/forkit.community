import { getEventsCollection, getEventWithComputed } from "@/lib/events";
import { ROUTES } from "@/routes.gen";
import { lunalink, type ExtractParams } from "@bearstudio/lunalink";
import type { APIRoute } from "astro";
import { getEntries, getEntry } from "astro:content";
import dayjs from "dayjs";

import { capitalize, isEmpty, toLowerCase } from "remeda";
import { match } from "ts-pattern";

type EventWithComputed = Awaited<ReturnType<typeof getEventWithComputed>>;

export const GET: APIRoute<
  {},
  ExtractParams<(typeof ROUTES.events)[":id"]["__path"]>
> = async ({ params }) => {
  const event = await getEventWithComputed(params.id);

  return new Response(
    `# ${event?.data._computed.name}

${event.data._computed.name} ${match(event.data.date)
      .when(
        (date) => dayjs(date).isBefore(dayjs(), "day"),
        () => "took",
      )
      .when(
        (date) => dayjs(date).isAfter(dayjs().subtract(1, "day"), "day"),
        () => "will take",
      )
      .otherwise(
        () => "",
      )} place on ${dayjs(event.data.date).format("DD/MM/YYYY")} to listen to ${event.data._computed.speakers?.length ? `${event.data._computed.speakers?.length} ` : ""}speakers at ${
      event.data.location?.name
    }

${displayVenue(event)}

${await displaySchedule(event)}

${displaySpeakers(event)}

${displayOrganizers(event)}

${displayAfterEvent(event)}

${await displaySponsors(event)}`,
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

const displaySchedule = async (event: EventWithComputed) => {
  if (isEmpty(event.data._computed.talks)) return "";

  const itemsWithTime =
    event.data.schedule?.items?.filter(
      (item) =>
        (item.type === "conference" || item.type === "roundtable") &&
        item.startTime,
    ) ?? [];

  const formattedItems = itemsWithTime.map((item) =>
    dayjs(item.startTime).format("hh:mmA"),
  );

  return `## Schedule

${(
  await Promise.all(
    event.data._computed.talks.map(async (item, index) => {
      const timeStart = formattedItems[index];
      return `- [${item.data.title}](${lunalink(
        ROUTES.events[":id"].talks[":talkId"].__path,
        { id: event.id, talkId: item.id },
      )}): ${timeStart} by ${(await Promise.all(item.data.speakers.map(async (speaker) => (await getEntry(speaker.id)).data.name))).join(", ")}`;
    }),
  )
).join("\n")}`;
};

const displaySpeakers = (event: EventWithComputed) => {
  if (!event.data._computed.speakers.length) return "";

  return `## Speakers

${event.data._computed.speakers
  .map(
    (speaker) =>
      `- [${speaker.data.name}](${lunalink(ROUTES.people[":id.html.md"].__path, { id: speaker.id })})`,
  )
  .join("\n")}`;
};

const displayOrganizers = (event: EventWithComputed) => {
  if (!event.data._computed.organizers.length) return "";

  return `## Organizers

${event.data._computed.organizers
  .map(
    (organizer) =>
      `- [${organizer.data.name}](${lunalink(ROUTES.people[":id.html.md"].__path, { id: organizer.id })})${organizer.data._computed.role ? `: ${organizer.data._computed.role}` : ""}`,
  )
  .join("\n")}`;
};

const displayAfterEvent = (event: EventWithComputed) => {
  if (!event.data.afterEventContent) return "";

  const { afterMovie, photos, vods } = event.data.afterEventContent;

  if (!afterMovie && !photos && !vods) return "";

  return `## After event

Fork it! Community provide multiple resources for this events.
${afterMovie ? `You can check out our [after movie](${afterMovie.href}). ` : ""}
${photos ? `Our photographs took really [cool pictures](${photos.href}).` : ""}
${vods ? `We also have [video on demand](${vods.href}) available.` : ""}`;
};

const displaySponsors = async (event: EventWithComputed) => {
  if (!event.data.sponsors) return "";
  if (!event.data.sponsoringLevels) return "";

  return `## Sponsors

Thanks a lot to our sponsors for their trust. ${(
    await Promise.all(
      event.data.sponsoringLevels.map(
        async (level) =>
          `As ${capitalize(toLowerCase(level))}: ${(await getEntries((event.data.sponsors ?? []).filter((sponsor) => sponsor.level === level).map((sponsor) => sponsor.slug))).map((sponsor) => (sponsor.data.href ? `[${sponsor.data.name}](${sponsor.data.href})` : sponsor.data.name)).join(", ")}`,
      ),
    )
  ).join(". ")}
`;
};
