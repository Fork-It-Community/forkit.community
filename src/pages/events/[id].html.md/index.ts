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
  const talks = event.data._computed.talks.filter((talk) => {
    const scheduleTalk = event.data.schedule?.items?.find(
      (item) => item.slug?.id === talk.id,
    );
    return scheduleTalk?.status !== "cancelled";
  });

  // Return empty string if all talks were filtered out
  if (talks.length === 0) return "";

  return `## Schedule

${(
  await Promise.all(
    talks.map(async (item) => {
      const scheduleItem = event.data.schedule?.items?.find(
        (schedItem) => schedItem.slug?.id === item.id,
      );
      const timeStart = scheduleItem?.startTime
        ? dayjs(scheduleItem.startTime).format("hh:mmA")
        : "";
      const speakerNames = (
        await Promise.all(
          item.data.speakers.map(async (speaker) => {
            const speakerEntry = await getEntry(speaker.id);
            return speakerEntry?.data?.name ?? "";
          }),
        )
      ).filter((name) => name !== "");
      const speakersText =
        speakerNames.length > 0 ? ` by ${speakerNames.join(", ")}` : "";
      return `- [${item.data.title}](${lunalink(
        ROUTES.events[":id"].talks[":talkId"].__path,
        { id: event.id, talkId: item.id },
      )}): ${timeStart}${speakersText}`;
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
${afterMovie?.href ? `You can check out our [after movie](${afterMovie.href}). ` : ""}
${photos?.href ? `Our photographs took really [cool pictures](${photos.href}).` : ""}
${vods?.href ? `We also have [video on demand](${vods.href}) available.` : ""}`;
};

const displaySponsors = async (event: EventWithComputed) => {
  if (!event.data.sponsors) return "";
  if (!event.data.sponsoringLevels) return "";

  const sponsorLevels = (
    await Promise.all(
      event.data.sponsoringLevels.map(async (level) => {
        const sponsorsForLevel = await getEntries(
          (event.data.sponsors ?? [])
            .filter((sponsor) => sponsor.level === level)
            .map((sponsor) => sponsor.slug),
        );

        // Only return the level string if there are sponsors for this level
        if (sponsorsForLevel.length === 0) return null;

        const sponsorNames = sponsorsForLevel
          .map((sponsor) =>
            sponsor.data.href
              ? `[${sponsor.data.name}](${sponsor.data.href})`
              : sponsor.data.name,
          )
          .join(", ");

        return `As ${capitalize(toLowerCase(level))}: ${sponsorNames}`;
      }),
    )
  ).filter((sponsorLevel) => sponsorLevel !== null);

  // Return empty string if no sponsor levels remain after filtering
  if (sponsorLevels.length === 0) return "";

  return `## Sponsors

Thanks a lot to our sponsors for their trust.
${sponsorLevels.join(". ")}
`;
};
