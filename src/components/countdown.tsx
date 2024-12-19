import { useState, useEffect } from "react";
import type { CollectionEntry } from "astro:content";
import MotionNumber from "motion-number";
import { calculateTimeLeft } from "@/lib/utils";

const Countdown = (
  props: Readonly<{ date: CollectionEntry<"events">["data"]["startDate"] }>,
) => {
  if (!props.date) return;
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(props.date));

  const updateTimer = () => {
    if (props.date) {
      const formattedTime = calculateTimeLeft(props.date);
      setTimeLeft(formattedTime);
    }
  };

  useEffect(() => {
    const timer = setInterval(updateTimer, 1000);
    return () => clearInterval(timer);
  }, [props.date]);

  return (
    <div>
      <div className="flex items-center justify-center gap-1">
        <TimerDisplay value={timeLeft.days} unit="Days" />
        <p className="font-heading text-2xl">:</p>
        <TimerDisplay value={timeLeft.hours} unit="Hours" />
        <p className="font-heading text-2xl">:</p>
        <TimerDisplay value={timeLeft.minutes} unit="Minutes" />
        <p className="font-heading text-2xl">:</p>
        <TimerDisplay value={timeLeft.seconds} unit="Seconds" />
      </div>
    </div>
  );
};

const TimerDisplay = (
  props: Readonly<{
    value: string;
    unit: "Days" | "Hours" | "Minutes" | "Seconds";
  }>,
) => {
  return (
    <div className="flex h-[66px] w-[66px] flex-col items-center rounded-md bg-neutral-900 bg-opacity-40 p-2">
      <MotionNumber
        id={props.unit}
        value={props.value}
        format={{ minimumIntegerDigits: 2 }}
        className="font-heading text-2xl"
      />
      <p className="font-sans text-xs">{props.unit}</p>
    </div>
  );
};

export { Countdown, TimerDisplay };
