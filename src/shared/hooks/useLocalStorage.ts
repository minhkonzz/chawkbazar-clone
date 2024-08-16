import { useState, useEffect, Dispatch, SetStateAction } from "react";

export default function useLocalStorage<T>(key: string, fallbackValue: T) {
   const [storedValue, setStoredValue] = useState<T>(() => {
      try {
         if (typeof window === "undefined") return fallbackValue;
         const item = window.localStorage.getItem(key);
         return item ? (JSON.parse(item) as T) : fallbackValue;
      } catch (error) {
         return fallbackValue;
      }
   });

   useEffect(() => {
      window.localStorage.setItem(key, JSON.stringify(storedValue));
   }, [key, storedValue]);

   return [storedValue, setStoredValue] as [T, Dispatch<SetStateAction<T>>];
};