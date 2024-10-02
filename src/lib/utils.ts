import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { Event, Meetup } from "@/content/collections";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDateTime(date: string | number | Date) {
  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "full",
  }).format(new Date(date));
}

export function formatTime(date: string | number | Date) {
  return new Intl.DateTimeFormat("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(date));
}

export function isDateInThePast(date?: Date) {
  return (date?.getTime() ?? 0) < new Date().getTime();
}

export function shouldDisplayTicketButton(event: Event | Meetup) {
  return event.tickets && !isDateInThePast(event.date);
}

export function getHref(meetup?: Meetup, event?: Event) {
  if (event) {
    return "#upcoming-events";
  }

  if (meetup) {
    return "#upcoming-meetups";
  }

  return "#past-events";
}
