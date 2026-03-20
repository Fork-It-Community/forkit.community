import { DEFAULT_NUMBER_OF_GUESTS } from "@/assets/consts";
import type { EventComputed } from "@/lib/events";
import { getAllGuests } from "@/lib/luma/api/guest";
import { LUMA_API_KEY } from "astro:env/server";
import { isNullish } from "remeda";
import { Result } from "better-result";

export function getHeaders(): Result<HeadersInit, Error> {
  if (!LUMA_API_KEY) {
    return Result.err(new Error("LUMA_API_KEY is not set"));
  }

  return Result.ok({
    accept: "application/json",
    "x-luma-api-key": LUMA_API_KEY,
  });
}

export async function getNumberOfApprovedGuests(event: EventComputed) {
  if (isNullish(event.data.lumaEventId)) {
    return DEFAULT_NUMBER_OF_GUESTS[event.data.type];
  }

  const guests = await getAllGuests({
    event_api_id: event.data.lumaEventId,
  });

  if (guests.isErr()) {
    return DEFAULT_NUMBER_OF_GUESTS[event.data.type];
  }

  const guestNumber = guests.value.filter(
    (guest) => guest.approval_status === "approved",
  ).length;
  return Math.max(DEFAULT_NUMBER_OF_GUESTS[event.data.type], guestNumber);
}
