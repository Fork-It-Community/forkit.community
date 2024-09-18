import { useState, useEffect } from "react";
import type { Event } from "@/content/events/events";
import MotionNumber from "motion-number";
import { calculateTimeLeft } from "@/lib/utils";

export const Countdown = (props: Readonly<{ event: Event }>) => {
  const { event } = props;

  if (!event.date) return null;
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(event?.date));

  useEffect(() => {
    if (!event.date) return;
    const updateTimer = () => {
      const formattedTime = calculateTimeLeft(event?.date as Date);
      setTimeLeft(formattedTime);
    };
    const timer = setInterval(updateTimer, 1000);
    updateTimer();

    return () => clearInterval(timer);
  }, [event]);

  return (
    <div>
      <div className="flex items-center justify-center gap-1">
        <div className="flex h-[66px] w-[66px] flex-col items-center rounded-md bg-neutral-900 bg-opacity-40 p-2">
          <MotionNumber
            value={timeLeft.days}
            className="font-heading text-2xl"
          />
          <p className="font-sans text-xs">Days</p>
        </div>
        <div className="font-heading text-2xl">:</div>

        <div className="flex h-[66px] w-[66px] flex-col items-center rounded-md bg-neutral-900 bg-opacity-40 p-2">
          <MotionNumber
            value={timeLeft.hours}
            className="font-heading text-2xl"
          />
          <p className="font-sans text-xs">Hours</p>
        </div>
        <div className="font-heading text-2xl">:</div>

        <div className="flex h-[66px] w-[66px] flex-col items-center rounded-md bg-neutral-900 bg-opacity-40 p-2">
          <MotionNumber
            value={timeLeft.minutes}
            className="font-heading text-2xl"
          />
          <p className="font-sans text-xs">Minutes</p>
        </div>
        <div className="font-heading text-2xl">:</div>

        <div className="flex h-[66px] w-[66px] flex-col items-center rounded-md bg-neutral-900 bg-opacity-40 p-2">
          <MotionNumber
            value={timeLeft.seconds}
            className="font-heading text-2xl"
          />
          <p className="font-sans text-xs">Seconds</p>
        </div>
      </div>
    </div>
  );
};
