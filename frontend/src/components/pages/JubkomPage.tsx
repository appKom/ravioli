import { useEffect, useState } from "react"
import QRCode from "react-qr-code";

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
    <div className="h-full bg-black overflow-hidden">
      {/* CRT scanlines */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.1)_50%,transparent_50%)] bg-[length:100%_10px] animate-scan z-40" />

      {/* Flickering wrapper border */}
      <div className="animate-flicker h-full flex flex-col gap-24 items-center justify-center opacity-90">
        <h1 className='font-glass text-white text-6xl'>
          {timeLeft.days} dager {timeLeft.hours} timer {timeLeft.minutes} minutter{' '}
          {timeLeft.seconds} sekunder
        </h1>
        {/* QR code */}
        <QRCode value="https://jubileum.online.ntnu.no" size={400} />
      </div>
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