import { useState, useEffect } from "@/configs/imports-wrapper";
import { formatTime } from "@/helpers/datetime";

export default function useCountdownTimer(endTime: number) {
  const [timeLeft, setTimeLeft] = useState(endTime - Date.now());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(endTime - Date.now());
    }, 999);

    return () => clearInterval(timer);
  }, [endTime]);

  return (
    (timeLeft > 0 &&
      formatTime(
        Math.floor(timeLeft / (1000 * 60 * 60)),
        Math.floor((timeLeft / 1000 / 60) % 60),
        Math.floor((timeLeft / 1000) % 60)
      )) ||
    ""
  );
}
