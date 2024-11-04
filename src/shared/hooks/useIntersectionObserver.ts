import { useState, useEffect, useRef, MutableRefObject } from "react";

export default function useIntersectionObserver<T>(
   asyncOperator: () => Promise<T>,
   threshold: number = 0.1
) {
   const ref = useRef<HTMLElement>(null);
   const [cachedData, setCachedData] = useState<T>();

   const observerOptions = {
      rootMargin: "50px",
      threshold
   };

   useEffect(() => {
      const currentRef = ref.current;
      const observer = new IntersectionObserver(entries => {
         const entry = entries[0];
         const visible = !!entry?.isIntersecting;
         entry?.target.classList.toggle("visible", visible);
         if (visible) {
            if (cachedData) return;
            asyncOperator().then((data: T) => {
               if (currentRef) observer.unobserve(currentRef);
               setCachedData(data);
            });
         }
      }, observerOptions);

      if (currentRef) observer.observe(currentRef);
      return () => {
         observer.disconnect();
      };
   }, [threshold, cachedData]);

   return [ref, cachedData] as [MutableRefObject<HTMLElement>, T];
}
