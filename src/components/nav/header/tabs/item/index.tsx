import type { ReactNode } from "react";
import styles from "./styles.module.css";

interface Props {
   tabName: string;
   href: string;
   children?: ReactNode;
}

export default function HeaderTab({ tabName, href, children }: Props) {
   return (
      <li className={`${styles.wrapper} posrel`}>
         <a className={`${styles.text} text-black`} href={href}>
            {tabName}
            {!!children && (
               <svg
                  className={styles.icon}
                  stroke="currentColor"
                  fill="currentColor"
                  strokeWidth="0"
                  viewBox="0 0 448 512"
                  height="0.8em"
                  width="0.8em">
                  <path d="M207.029 381.476L12.686 187.132c-9.373-9.373-9.373-24.569 0-33.941l22.667-22.667c9.357-9.357 24.522-9.375 33.901-.04L224 284.505l154.745-154.021c9.379-9.335 24.544-9.317 33.901.04l22.667 22.667c9.373 9.373 9.373 24.569 0 33.941L240.971 381.476c-9.373 9.372-24.569 9.372-33.942 0z"></path>
               </svg>
            )}
         </a>
         {children}
      </li>
   );
}
