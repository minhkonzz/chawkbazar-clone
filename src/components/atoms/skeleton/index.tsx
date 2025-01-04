import styles from "./style.module.css";

interface Props {
  borderRadius?: number | string;
  className?: string;
}

export default function Skeleton({
  borderRadius = ".5rem",
  className = ""
}: Props) {
  return (
    <div
      className={`${styles.skeleton} posrel o-h${className ? ` ${className}` : ""}`}
      style={{ borderRadius }}
    />
  );
}
