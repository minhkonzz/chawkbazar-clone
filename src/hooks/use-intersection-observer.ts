"use client";

import {
  useEffect,
  useState,
  type SetStateAction,
  type Dispatch
} from "@/configs/imports-wrapper";

import {
  useIntersectionObserverWrapper
} from "@/context/intersection-observer";

export default function useIntersectionObserver<T extends Element>(
  cb: (visible: boolean) => void,
  rerenderOnVisibleChange: boolean = false
): {
  setElement: Dispatch<SetStateAction<T | null>>;
  visible: boolean
} {
  const { observe, unobserve } = useIntersectionObserverWrapper();
  const [element, setElement] = useState<T | null>(null);
  const [visible, setVisible] = useState<boolean>(false);

  useEffect(() => {
    if (!element) return;

    const _cb = (isIntersecting: boolean) => {
      setVisible(isIntersecting);
      cb(isIntersecting);
    }

    observe(element, rerenderOnVisibleChange && _cb || cb);

    return () => unobserve(element);
  }, [element]);

  return { setElement, visible };
}
