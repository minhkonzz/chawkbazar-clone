import type { ReactMouseEvent } from "@/configs/imports-wrapper";
import { Close } from "@/components/atoms/svgs";
import { Button } from "@/components/atoms";
import styles from "./style.module.css";

export default function CloseButton({
  onClick,
  className
}: {
  onClick: (e: ReactMouseEvent<HTMLButtonElement>) => void;
  className?: string;
}) {
  return (
    <Button
      aria-label="close"
      onClick={onClick}
      className={`${styles.wrapper} circle-bd-r posab bg-white${className ? " " + className : ""}`}>
      <Close style={{
        color: "#000",
        fontSize: "1.5em",
        marginTop: 2
      }} />
    </Button>
  );
}
