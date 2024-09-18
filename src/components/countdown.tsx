import { useState, useEffect } from "react";
import type { Event } from "@/content/events/events";
import MotionNumber from "motion-number";
import { calculateTimeLeft } from "@/lib/utils";

export const Countdown = (props: Readonly<{ event: Event }>) => {
  const { event } = props;

  if (!event.date) return;
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(event?.date));

  useEffect(() => {
    const updateTimer = () => {
      if (event.date) {
        const formattedTime = calculateTimeLeft(event.date);
        setTimeLeft(formattedTime);
      }
    };
    const timer = setInterval(updateTimer, 1000);
    updateTimer();

    return () => clearInterval(timer);
  }, [event]);

  const TimerDisplay = ({value, unit} : {value: string | number, unit: "Days" | "Hours" | "Minutes" | "Seconds"}) => {
    return (
      <div className="flex h-[66px] w-[66px] flex-col items-center rounded-md bg-neutral-900 bg-opacity-40 p-2">
        <MotionNumber
          value={value}
          format={{ minimumIntegerDigits: 2 }}
          className="font-heading text-2xl"
        />
        <p className="font-sans text-xs">{unit}</p>
      </div>
    )
  }

  return (
    <div>
      <div className="flex items-center justify-center gap-1">
        {TimerDisplay({value: timeLeft.days, unit: "Days"})}
        <div className="font-heading text-2xl">:</div>

        {TimerDisplay({value: timeLeft.hours, unit: "Hours"})}
        <div className="font-heading text-2xl">:</div>

        {TimerDisplay({value: timeLeft.minutes, unit: "Minutes"})}
        <div className="font-heading text-2xl">:</div>

        {TimerDisplay({value: timeLeft.seconds, unit: "Seconds"})}
      </div>
    </div>
  );
};
