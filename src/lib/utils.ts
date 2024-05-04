import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

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
