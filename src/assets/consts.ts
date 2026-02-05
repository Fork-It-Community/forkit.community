export const OG_IMAGE = {
  width: 1920,
  height: 1080,
};
export const DEFAULT_NUMBER_OF_GUESTS = {
  meetup: 30,
  event: 100,
} as const;
export const EVENT_TYPES = {
  meetup: "Meetups",
  event: "Full Day Events",
} as const;
export type EventType = (typeof EVENT_TYPES)[keyof typeof EVENT_TYPES];
