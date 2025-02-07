import { getEventsCollection } from "@/lib/events";
import type { APIRoute } from "astro";
import dayjs from "dayjs";

export const prerender = false;

export const GET: APIRoute = async () => {
  const events = await getEventsCollection();

  return new Response(
    dayjs().format() + " " + events.map((event) => event.data.name).join(","),
  );
};
