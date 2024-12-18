import type { ReactNode } from "react";
import styles from "./styles.module.css";

interface Props {
   title: string;
   children: ReactNode;
}

export default function PageBanner({ title, children }: Props) {
   return (
      <>
         <div className={`${styles.wrapper} posrel`}>
            <div className={`${styles.background} posab top-0 left-0 bottom-0 right-0`} />
            <h2 className={`${styles.title} posab pos-center text-center text-white fw-600`}>
               <span className={`${styles.sub} d-b`}>Explore</span>
               {title}
            </h2>
         </div>
         {children}
      </>
   );
}
