export const OG_IMAGE = {
  width: 1920,
  height: 1080,
};
export const DEFAULT_NUMBER_OF_GUESTS = {
  meetup: 30,
  event: 100,
} as const;
export const EVENT_TYPES = {
  meetups: "Meetups",
  events: "Full Day Events",
} as const;
export const EVENT_TYPE_MAP: Record<string, "event" | "meetup"> = {
  events: "event",
  meetups: "meetup",
};
export type EventType = (typeof EVENT_TYPES)[keyof typeof EVENT_TYPES];
