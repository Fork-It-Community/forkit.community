import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import type { Event } from "@/content/events/events";

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

export function formatDateTimeShort(date: string | number | Date) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  }).format(new Date(date));
}

export function isEventInThePast(event: Event) {
  return (event.date?.getTime() ?? 0) < new Date().getTime();
}

export function shouldDisplayTicketButton(event: Event) {
  return event.tickets && !isEventInThePast(event);
}
