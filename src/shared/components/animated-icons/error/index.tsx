import styles from "./styles.module.css";

interface Props {
   size?: number;
   color?: string;
};

export default function AnimatedErrorIcon({
   size = 20,
   color = "#ef4444"
}: Props) {
   return (
      <div style={{ width: size, height: size }}>
         <svg
            viewBox="0 0 100 100"
            fill="none">
            <circle
               className={styles.circle}
               cx="50"
               cy="50"
               r="45"
               stroke={color}
               strokeWidth="8"
               strokeLinecap="round"
            />
            <path
               className={styles.path}
               d="M35 35L65 65M65 35L35 65"
               stroke={color}
               strokeWidth="8"
               strokeLinecap="round"
               strokeLinejoin="round"
            />
         </svg>
      </div>
   );
}