"use client";

import styles from "./styles.module.css";
import FilterMain from "./body";

const path: string[] = ["Home", "Search"];

export default function Filter() { 
   return (
      <div className={styles.container}>
         <div className={styles.inner}>
            <ul className={`${styles.path} d-flex at-center`}>
               { path.map((e, index) =>
                  <li key={index} className={styles.pathPart}>
                     {e}
                     { index < path.length - 1 && <span className={styles.pathSeparator}>/</span> || <></> }
                  </li>
               ) }
            </ul>
            <FilterMain />
         </div>
      </div>
   );
};