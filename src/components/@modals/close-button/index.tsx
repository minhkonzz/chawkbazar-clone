import type { MouseEvent } from "react";
import { Close } from "@/components/@svgs"
import styles from "./styles.module.css";

export default function CloseButton({
   onClick
}: {
   onClick: (e: MouseEvent<HTMLButtonElement>) => void; 
}) {
   return (
      <button 
         aria-label="close"
         onClick={onClick} 
         className={`${styles.wrapper} circle-bd-r posab bg-white`}>
         <Close className={styles.ic} />
      </button>
   )
}