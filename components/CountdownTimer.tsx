"use client";

import { useState, useEffect } from "react";

const TARGET_DATE = new Date(
  process.env.NEXT_PUBLIC_PO_END_DATE ?? "2026-05-14T23:59:59"
);

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export default function CountdownTimer() {
  const [time, setTime] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const calc = () => {
      const diff = TARGET_DATE.getTime() - Date.now();
      if (diff <= 0) return setTime({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      setTime({
        days: Math.floor(diff / 86400000),
        hours: Math.floor((diff % 86400000) / 3600000),
        minutes: Math.floor((diff % 3600000) / 60000),
        seconds: Math.floor((diff % 60000) / 1000),
      });
    };
    calc();
    const id = setInterval(calc, 1000);
    return () => clearInterval(id);
  }, []);

  const units = [
    { v: time.days, l: "Days" },
    { v: time.hours, l: "Hrs" },
    { v: time.minutes, l: "Min" },
    { v: time.seconds, l: "Sec" },
  ];

  return (
    <div className="flex items-start gap-2 sm:gap-3">
      {units.map(({ v, l }, i) => (
        <div key={l} className="flex items-start gap-2 sm:gap-3">
          {i > 0 && (
            <span className="text-rose-300 font-playfair text-2xl font-light mt-2 leading-none">
              :
            </span>
          )}
          <div className="flex flex-col items-center">
            <div className="glass rounded-2xl px-3.5 py-2.5 min-w-[56px] sm:min-w-[64px] text-center shadow-sm">
              <span className="font-playfair text-2xl sm:text-3xl font-bold text-white tabular-nums leading-none">
                {String(v).padStart(2, "0")}
              </span>
            </div>
            <span className="mt-1.5 text-rose-200/80 text-[10px] sm:text-xs font-sans tracking-widest uppercase">
              {l}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
