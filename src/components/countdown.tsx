import { useState, useEffect } from 'react';
import type { Event } from "@/content/events/events";
import MotionNumber from 'motion-number';

export const Countdown = (props: Readonly<{ event: Event }>) => {
  const { event } = props;
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  function calculateTimeLeft() {
    const countdownDate = new Date(event?.date || 0).getTime();
    const now = new Date().getTime();
    const distance = countdownDate - now;

    if(distance < 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    const formatTime = (time: number) => (time < 10 ? `0${time}` : time.toString());

    return {
      days: formatTime(days),
      hours: formatTime(hours),
      minutes: formatTime(minutes),
      seconds: formatTime(seconds)
    };
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [event]);

  const TimerDisplay = ({value, unit} : {value: string | number, unit: "days" | "hours" | "minutes" | "seconds"}) => (
    <div className="flex flex-col w-[66px] h-[66px] items-center bg-neutral-900 bg-opacity-40 rounded-md p-2">
      <MotionNumber
        value={value}
        className='font-heading text-2xl'
      />
      <p className="font-heading text-xs">{unit}</p>
    </div>
  )

  return (
    <div>
      <div className="bg-orange-300 p-5">
        <div className="flex justify-center items-center gap-1">
          <TimerDisplay value={timeLeft.days} unit="days" />
          <div className="font-heading text-2xl">:</div>

          <TimerDisplay value={timeLeft.hours} unit="hours" />
          <div className="font-heading text-2xl">:</div>

          <TimerDisplay value={timeLeft.minutes} unit="minutes" />
          <div className="font-heading text-2xl">:</div>

          <TimerDisplay value={timeLeft.seconds} unit="seconds" />
        </div>

      </div>
    </div>
  );
};