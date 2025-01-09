import { type ClassValue, clsx } from "clsx";
import dayjs from "dayjs";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 *
 * @param date a dayjs compatible date
 * @returns a string with the format `dddd, MMMM D, YYYY`
 * @example
 * // Reurns Thursday, January 9, 2025
 * dayjs('2025-01-09').format('dddd, MMMM D, YYYY');
 */
export function formatDateTime(date: dayjs.ConfigType) {
  return dayjs(date).format("dddd, MMMM D, YYYY");
}

export function formatTime(date: dayjs.ConfigType) {
  return dayjs(date).format("hh:mm A");
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
