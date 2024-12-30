import { useState, useEffect } from "react";

export default function useCountdownTimer(endTime: number) {
   const [timeLeft, setTimeLeft] = useState(endTime - Date.now());
   
   useEffect(() => {
      const timer = setInterval(() => {
         setTimeLeft(endTime - Date.now());
      }, 999);

      return () => clearInterval(timer);
   }, [endTime]);

   return {
      s: Math.floor((timeLeft / 1000) % 60),
      m: Math.floor((timeLeft / 1000 / 60) % 60),
      h: Math.floor((timeLeft / (1000 * 60 * 60)) % 24)
   }
};