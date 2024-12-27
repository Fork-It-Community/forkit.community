import { type ClassValue, clsx } from "clsx";
import dayjs from "dayjs";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDateTime(date: dayjs.ConfigType) {
  return dayjs(date).format("dddd, MMMM D, YYYY");
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

export function calculateTimeLeft(date: Date) {
  const countdownDate = new Date(date).getTime();
  const now = new Date().getTime();
  const distance = countdownDate - now;

  if (distance < 0)
    return { days: "0", hours: "0", minutes: "0", seconds: "0" };

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
  );
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  const formatTimer = (time: number) =>
    time < 10 ? `0${time}` : time.toString();

  return {
    days: formatTimer(days),
    hours: formatTimer(hours),
    minutes: formatTimer(minutes),
    seconds: formatTimer(seconds),
  };
}
