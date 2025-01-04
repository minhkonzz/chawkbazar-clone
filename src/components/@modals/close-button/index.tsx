import type { MouseEvent } from "react";
import { Close } from "@/components/@svgs";
import Button from "@/shared/components/button";
import styles from "./styles.module.css";

export default function CloseButton({
   onClick,
   className
}: {
   onClick: (e: MouseEvent<HTMLButtonElement>) => void,
   className?: string
}) {
   return (
      <Button 
         aria-label="close"
         onClick={onClick} 
         className={`${styles.wrapper} circle-bd-r posab bg-white${className ? " " + className : ""}`}>
         <Close className={styles.ic} />
      </Button>
   )
}