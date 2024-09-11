import { useState, useEffect } from 'react';
import type { Event } from "@/content/events/events";

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

    return { days, hours, minutes, seconds };
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [event]);

  return (
    <div>
      <h1>Countdown Date</h1>
      <p>{timeLeft.days} days {timeLeft.hours} hours {timeLeft.minutes} minutes {timeLeft.seconds} seconds</p>
    </div>
  );
};