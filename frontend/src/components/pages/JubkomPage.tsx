import { useEffect, useState } from "react"

export const JubkomPage = () => {
  const targetDate = new Date("2026-02-16T00:00:00") // 16th of February 2026
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setNow(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const timeLeft = getTimeDiff(now, targetDate);

  return (
    <div className="h-full bg-black overflow-hidden flex items-center justify-center">
      <h1 className='font-glass text-white text-6xl'>
        {timeLeft.days} dager {timeLeft.hours} timer {timeLeft.minutes} minutter{' '}
        {timeLeft.seconds} sekunder
      </h1>
    </div>
  )
}

const getTimeDiff = (
  startDate: string | Date,
  endDate: string | Date
) => {
  const start = new Date(startDate);
  const end = new Date(endDate);

  let diffMs = Math.abs(end.getTime() - start.getTime());

  const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  diffMs %= 1000 * 60 * 60 * 24


  const hours = Math.floor(diffMs / (1000 * 60 * 60));
  diffMs %= 1000 * 60 * 60;

  const formattedHours = hours < 10 ? `0${hours}` : `${hours}`;

  const minutes = Math.floor(diffMs / (1000 * 60));
  diffMs %= 1000 * 60;

  const formattedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;

  const seconds = Math.floor(diffMs / 1000);

  const formattedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;

  return { days, hours: formattedHours, minutes: formattedMinutes, seconds: formattedSeconds };
}