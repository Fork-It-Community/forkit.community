import { DEFAULT_NUMBER_OF_GUESTS } from "@/assets/consts";
import type { EventComputed } from "@/lib/events";
import { getAllGuests } from "@/lib/luma/api/guest";
import { LUMA_API_KEY } from "astro:env/server";
import { isEmpty, isNonNullish } from "remeda";

export function getHeaders(): HeadersInit {
  return {
    accept: "application/json",
    "x-luma-api-key": LUMA_API_KEY,
  };
}

export async function getNumberOfApprovedGuests(event: EventComputed) {
  const guests = isNonNullish(event.data.lumaEventId)
    ? await getAllGuests({
        event_api_id: event.data.lumaEventId,
        sort_direction: "desc nulls last",
        sort_column: "registered_at",
      })
    : [];
  return isEmpty(guests)
    ? event.data.type === "event"
      ? DEFAULT_NUMBER_OF_GUESTS.event
      : DEFAULT_NUMBER_OF_GUESTS.meetup
    : guests.filter((guest) => guest.approval_status === "approved").length;
}
