import styles from "./style.module.css";

interface Props {
  size?: number;
  color?: string;
  strokeWidth?: number;
}

export default function AnimatedSuccessCheckIcon({
  size = 20,
  color = "#22c55e",
  strokeWidth = 2
}: Props) {
  return (
    <div style={{ width: size, height: size }}>
      <svg
        viewBox="0 0 52 52"
        fill="none"
        style={{ width: "100%", height: "100%" }}>
        <circle
          className={styles.circle}
          cx="26"
          cy="26"
          r="24"
          stroke={color}
          strokeWidth={strokeWidth}
        />
        <path
          className={styles.path}
          d="M14 27.5L22.5 36L38 20.5"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}
