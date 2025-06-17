import { getEventsCollection, getEventWithComputed } from "@/lib/events";
import { ROUTES } from "@/routes.gen";
import { lunalink, type ExtractParams } from "@bearstudio/lunalink";
import type { APIRoute } from "astro";
import { getEntries } from "astro:content";
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

${await displaySpeakers(event)}

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

const displaySchedule = (event: EventWithComputed) => {
  if (isEmpty(event.data._computed.talks)) return "";

  const itemsWithTime =
    event.data.schedule?.items?.filter(
      (item) =>
        (item.type === "conference" || item.type === "roundtable") &&
        item.startTime,
    ) ?? [];

  const formattedItems = itemsWithTime.map((item) =>
    dayjs(item.startTime).format("hh:mm A"),
  );

  return `## Schedule

${event.data._computed.talks
  .map((item, index) => {
    const timeStart = formattedItems[index];
    return `- ${timeStart} [${item.data.title}](${lunalink(
      ROUTES.events[":id"].talks[":talkId"].__path,
      { id: event.id, talkId: item.id },
    )})`;
  })
  .join("\n")}`;
};

const displaySpeakers = async (event: EventWithComputed) => {
  if (!event.data.speakers) return "";

  const speakers = await getEntries(event.data.speakers ?? []);

  return `## Speakers

${speakers
  .map(
    (speaker) =>
      `- [${speaker.data.name}](${lunalink(ROUTES.people[":id"].__path, { id: speaker.id })})`,
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

const displaySponsors = async (event: EventWithComputed) => {
  if (!event.data.sponsors) return "";
  if (!event.data.sponsoringLevels) return "";

  const silverSponsorSlugs = event.data.sponsors
    .filter((sponsor) => sponsor.level === "SILVER")
    .map((sponsor) => sponsor.slug);

  const bronzeSponsorSlugs = event.data.sponsors
    .filter((sponsor) => sponsor.level === "BRONZE")
    .map((sponsor) => sponsor.slug);

  const logisticSponsorSlugs = event.data.sponsors
    .filter((sponsor) => sponsor.level === "LOGISTIC")
    .map((sponsor) => sponsor.slug);

  const sponsorSilver = await getEntries(silverSponsorSlugs);
  const sponsorBronze = await getEntries(bronzeSponsorSlugs);
  const sponsorLogistic = await getEntries(logisticSponsorSlugs);

  return `## Sponsors
${
  silverSponsorSlugs.length === 0
    ? ""
    : `
### ${event.data.sponsoringLevels[0]}
${sponsorSilver.map((sponsor) => `- [${sponsor.data.name}](${sponsor.data.href})`).join("\n")}`
}
${
  bronzeSponsorSlugs.length === 0
    ? ""
    : `
### ${event.data.sponsoringLevels[1]}
${sponsorBronze.map((sponsor) => `- [${sponsor.data.name}](${sponsor.data.href})`).join("\n")}`
}
${
  logisticSponsorSlugs.length === 0
    ? ""
    : `
### ${event.data.sponsoringLevels[2]}
${sponsorLogistic.map((sponsor) => `- [${sponsor.data.name}](${sponsor.data.href})`).join("\n")}`
}
`;
};
