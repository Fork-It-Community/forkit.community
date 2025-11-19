import { DEFAULT_NUMBER_OF_GUESTS } from "@/assets/consts";
import type { EventComputed } from "@/lib/events";
import { getAllGuests } from "@/lib/luma/api/guest";
import { LUMA_API_KEY } from "astro:env/server";
import { isNullish } from "remeda";

export function getHeaders(): HeadersInit {
  return {
    accept: "application/json",
    "x-luma-api-key": LUMA_API_KEY,
  };
}

export async function getNumberOfApprovedGuests(event: EventComputed) {
  if (isNullish(event.data.lumaEventId)) {
    return DEFAULT_NUMBER_OF_GUESTS[event.data.type];
  }
  const guests = await getAllGuests({
    event_api_id: event.data.lumaEventId,
  });

  const guestNumber = guests.filter(
    (guest) => guest.approval_status === "approved",
  ).length;
  return Math.max(DEFAULT_NUMBER_OF_GUESTS[event.data.type], guestNumber);
}
