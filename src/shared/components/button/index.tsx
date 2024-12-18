import type { ReactNode } from "react";
import styles from "./styles.module.css";

interface Props {
   children: ReactNode;
   className?: string;
   disabled?: boolean;
   style?: { readonly [key: string]: string };
   type?: "button" | "reset" | "submit"
   onClick?: () => void;
};

export default function Button({
   children,
   className,
   style,
   onClick,
   disabled = false,
   type = "button"
}: Props) {
   const props = {
      style,
      onClick,
      type,
      className: `${styles.wrapper} dark-v fw-600 thin-bd-r${className ? " " + className : ""}`
   }
   return (
      <button disabled={disabled} {...props}>
         {children}
      </button>
   );
}