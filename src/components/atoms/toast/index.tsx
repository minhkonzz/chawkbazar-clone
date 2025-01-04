"use client";

import { useEffect, useRef } from "@/configs/imports-wrapper";
import { type Message, useToast } from "@/context/toast";
import styles from "./style.module.css";

const colors = {
  success: "green",
  error: "red",
  warning: "orange"
};

export default function Toast({ message, type, duration }: Message) {
  const toast = useToast()!;
  const ref = useRef<HTMLDivElement>(null);
  const bgColor = colors[type];

  useEffect(() => {
    const toastEl = ref.current;
    let hideToast: NodeJS.Timeout;
    if (toastEl) {
      hideToast = setTimeout(() => {
        toastEl.addEventListener("animationend", () => toast(undefined));
        toastEl.style.animation = "toast-invisible .3s ease-in-out";
        toastEl.style.animationFillMode = "forwards";
      }, duration);
    }
    return () => {
      if (toastEl) clearTimeout(hideToast);
    };
  }, []);

  if (!type) return <></>;

  return (
    <div className={`${styles.wrapper} posab left-50pc z-100`} {...{ ref }}>
      <span
        className={`${styles.decor} posab left-0 top-0 bottom-0`}
        style={{ backgroundColor: bgColor }}></span>
      <p className={`${styles.text} posab top-50pc fw-600`}>{message}</p>
    </div>
  );
}
