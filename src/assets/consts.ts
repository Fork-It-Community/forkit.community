export const OG_IMAGE = {
  width: 1920,
  height: 1080,
};
export const DEFAULT_NUMBER_OF_GUESTS = {
  meetups: 30,
  events: 100,
} as const;
export const EVENT_TYPES = {
  meetups: "Meetups",
  events: "Full Day Events",
} as const;
export type EventType = (typeof EVENT_TYPES)[keyof typeof EVENT_TYPES];
