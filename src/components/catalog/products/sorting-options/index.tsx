"use client";

import { useState } from "react";
import styles from "./styles.module.css";

export default function SortingOptions() {
   const [hide, setHide] = useState<boolean>(true);

   return (
      <div className={`${styles.wrapper} posrel d-ib`}>
         <button
            className={`${styles.button} d-flex at-center jc-center`}
            onClick={() => setHide(!hide)}>
            Sorting options
            <svg
               className={styles.icon}
               stroke="currentColor"
               fill="none"
               strokeWidth="2"
               viewBox="0 0 24 24"
               aria-hidden="true"
               height="1em"
               width="1em">
               <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8 9l4-4 4 4m0 6l-4 4-4-4"></path>
            </svg>
         </button>
         {!hide && (
            <div className={`${styles.list} posab z-1 w-100pc thin-bd-r`}>
               <p>Newest</p>
               <p>Popularity</p>
               <p>Price: Low to High</p>
               <p>Price: High to Low</p>
            </div>
         )}
      </div>
   );
}
