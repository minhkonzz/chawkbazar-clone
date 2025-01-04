import styles from "./style.module.css";

interface Props {
  size?: number;
  color?: string;
  thickness?: number;
  speed?: number;
}

export default function Spinner({
  size = 20,
  color = "#fff",
  thickness = 2
}: Props) {
  const radius = size / 2 - thickness / 2;
  const circumference = 2 * Math.PI * radius;

  return (
    <div style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#000"
          strokeWidth={thickness}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={thickness}
          strokeDasharray={circumference}
          strokeDashoffset={circumference * 0.75}
          className={styles.rotateCircle}
        />
      </svg>
    </div>
  );
}
