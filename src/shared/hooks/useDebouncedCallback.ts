import { useCallback, useRef } from "react";

export default function useDebouncedCallback<
   T extends (...args: any[]) => void
>(callback: T, delay: number): T {
   const timeoutRef = useRef<number | null>(null);

   const debouncedCallback = useCallback(
      (...args: Parameters<T>) => {
         if (timeoutRef.current) clearTimeout(timeoutRef.current);

         timeoutRef.current = window.setTimeout(() => callback(...args), delay);
      },
      [callback, delay]
   );

   return debouncedCallback as T;
}
