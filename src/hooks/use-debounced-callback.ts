import { useCallback, useRef, type DependencyList } from "@/configs/imports-wrapper";

export default function useDebouncedCallback<
  T extends (...args: never[]) => unknown
>(callback: T, delay: number, externalDeps: DependencyList = []): T {
  const timeoutRef = useRef<number | null>(null);

  return useCallback(
    (...args: Parameters<T>) => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);

      timeoutRef.current = window.setTimeout(() => callback(...args), delay);
    },
    [callback, delay, ...externalDeps]
  ) as T;
}
