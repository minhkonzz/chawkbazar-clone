import styles from "./styles.module.css";

interface Props {
   width?: number | string;
   height?: number | string;
   borderRadius?: number | string;
   className?: string;
}

export default function Skeleton({
   width = "100%",
   height = "50px",
   borderRadius = ".5rem",
   className = ""
}: Props) {
   return (
      <div
         className={`${styles.skeleton} posrel o-h${" " + className}`}
         style={{
            width,
            height,
            borderRadius
         }}></div>
   );
}
