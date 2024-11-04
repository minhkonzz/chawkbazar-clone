import { ReactNode } from "react";
import styles from "./styles.module.css";

interface Props {
   title: string;
   children: ReactNode;
}

export default function PageBanner({ title, children }: Props) {
   return (
      <>
         <div className={`${styles.wrapper} posrel d-flex jc-center`}>
            <div
               className={`${styles.background} posab top-0 left-0 bottom-0 right-0`}></div>
            <div className={`${styles.wrapper} posrel`}>
               <h2 className={`${styles.title} text-center`}>
                  <span className={`${styles.sub} d-b`}>explore</span>
                  {title}
               </h2>
            </div>
         </div>
         {children}
      </>
   );
}
