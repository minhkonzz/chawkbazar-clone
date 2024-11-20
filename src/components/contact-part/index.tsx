import type { ReactElement } from "react";
import styles from "./styles.module.css";

interface Props {
   icon: ReactElement;
   title: string;
   desc: string;
}

export default function ContactPart({ icon, title, desc }: Props) {
   const Icon = () => icon;

   return (
      <div className={`${styles.wrapper} d-flex`}>
         <div className={`${styles.ic} d-flex jc-center at-center`}>
            <Icon />
         </div>
         <div className={styles.detail}>
            <h5 className={styles.title}>{title}</h5>
            <p className={styles.desc}>{desc}</p>
         </div>
      </div>
   );
}
