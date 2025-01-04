"use client";

import {
  createContext,
  useCallback,
  useRef,
  useEffect,
  type ReactNode
} from "@/configs/imports-wrapper";

import context from "../use-context-wrapper";

export interface IntersectionObserverOptions {
  root?: Element | null;
  rootMargin?: string;
  threshold?: number | number[];
}

type IntersectionContextType = {
  observe: (
    element: Element,
    callback: (isIntersecting: boolean) => void
  ) => void;
  unobserve: (element: Element) => void;
};

const IntersectionContext = createContext<IntersectionContextType | null>(null);

export const useIntersectionObserverWrapper = context(
  IntersectionContext,
  "useIntersection must be used within an IntersectionProvider"
);

export default function IntersectionProvider({
  children,
}: {
  children: ReactNode;
}) {
  const observerRef = useRef<IntersectionObserver | null>(null);
  const callbackMap = useRef(
    new Map<Element, (isIntersecting: boolean) => void>()
  );

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          const callback = callbackMap.current.get(entry.target);
          callback!(entry.isIntersecting);
        });
      },
      { threshold: 0.5 }
    );

    return () => observerRef.current?.disconnect();
  }, []);

  const observe = useCallback(
    (element: Element, callback: (isIntersecting: boolean) => void) => {
      if (!observerRef.current) return;
      callbackMap.current.set(element, callback);
      observerRef.current.observe(element);
    },
    []
  );

  const unobserve = useCallback((element: Element) => {
    if (!observerRef.current) return;
    callbackMap.current.delete(element);
    observerRef.current.unobserve(element);
  }, []);

  return (
    <IntersectionContext.Provider value={{ observe, unobserve }}>
      {children}
    </IntersectionContext.Provider>
  );
}