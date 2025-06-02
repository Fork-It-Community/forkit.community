import { getEventsCollection, getEventWithComputed } from "@/lib/events";
import { ROUTES } from "@/routes.gen";
import { lunalink, type ExtractParams } from "@bearstudio/lunalink";
import type { APIRoute } from "astro";
import dayjs from "dayjs";

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

## Venue

${event.data.location?.name}, ${event.data.location?.address}

## Schedule

${event.data.schedule?.items
  ?.map(
    (item) =>
      `- [${item.name}](${lunalink(ROUTES.events[":id"].talks[":talkId"].__path, { id: event.id, talkId: item.slug?.id ?? "" })})`,
  )
  .join("\n")}
`,
    {
      headers: { "Content-Type": "text/plain; charset=utf-8" },
    },
  );
};

export async function getStaticPaths() {
  const events = await getEventsCollection();

  return events.map((event) => ({ params: { id: event.id } }));
}
