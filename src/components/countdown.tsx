import { useState, useEffect } from "react";
import type { CollectionEntry } from "astro:content";
import MotionNumber from "motion-number";
import { calculateTimeLeft } from "@/lib/utils";

export const Countdown = (
  props: Readonly<{ date: CollectionEntry<"events">["data"]["date"] }>,
) => {
  if (!props.date) return;
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(props.date));

  const updateTimer = () => {
    const formattedTime = calculateTimeLeft(props.date);
    setTimeLeft(formattedTime);
  };

  useEffect(() => {
    const timer = setInterval(updateTimer, 1000);
    return () => clearInterval(timer);
  }, [props.date]);

  const TimerDisplay = ({
    value,
    unit,
  }: {
    value: string;
    unit: "Days" | "Hours" | "Minutes" | "Seconds";
  }) => {
    return (
      <div className="flex h-[66px] w-[66px] flex-col items-center rounded-md bg-neutral-900 bg-opacity-40 p-2">
        <MotionNumber
          id={unit}
          value={value}
          format={{ minimumIntegerDigits: 2 }}
          className="font-heading text-2xl"
        />
        <p className="font-sans text-xs">{unit}</p>
      </div>
    );
  };

  return (
    <div>
      <div className="flex items-center justify-center gap-1">
        {TimerDisplay({ value: timeLeft.days, unit: "Days" })}
        <p className="font-heading text-2xl">:</p>
        {TimerDisplay({ value: timeLeft.hours, unit: "Hours" })}
        <p className="font-heading text-2xl">:</p>
        {TimerDisplay({ value: timeLeft.minutes, unit: "Minutes" })}
        <p className="font-heading text-2xl">:</p>
        {TimerDisplay({ value: timeLeft.seconds, unit: "Seconds" })}
      </div>
    </div>
  );
};
