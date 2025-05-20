"use client";
import React, { useEffect, useState } from "react";
import { FcAlarmClock } from "react-icons/fc";

type durationProps = {
  duration: number;
  onFinish?: () => void;
};
export default function QuizDuration({ duration }: durationProps) {
  const [timeLeft, setTimeLeft] = useState(duration * 60);

  useEffect(() => {
    if (timeLeft <= 0) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          if (onFinish) onFinish(); // ✅ استدعاء onFinish هنا
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  return (
    <div>
      <p className="flex text-main-color text-center justfiy-center items-center font-bold">
        <FcAlarmClock className="text-3xl" />
        {minutes}:{seconds.toString().padStart(2, "0")}
      </p>
    </div>
  );
}
