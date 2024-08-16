import { Suspense } from "react";
import { Filter, Products } from "@/components/catalog";
import styles from "./page.module.css";

export default function Search() {
   return (
      <>
         <div className={styles.event}>
            <div className="d-flex jc-sb at-center text-center wrapper1920">
               <span></span>
               <span>
                  1000S Of New Items Just Added: Extra 20% Sale. Selected Items. Prices As Marked.
                  <a className={styles.eventLink}>Details</a>
               </span>
               <button>
                  <svg 
                     stroke="currentColor" 
                     fill="currentColor" 
                     strokeWidth="0" 
                     viewBox="0 0 512 512" 
                     className="text-black" 
                     height="1em" 
                     width="1em" 
                     xmlns="http://www.w3.org/2000/svg">
                     <path d="M289.94 256l95-95A24 24 0 00351 127l-95 95-95-95a24 24 0 00-34 34l95 95-95 95a24 24 0 1034 34l95-95 95 95a24 24 0 0034-34z"></path>
                  </svg>
               </button>
            </div>
         </div>
         <div className={`${styles.catalog} d-flex wrapper1920 mx-auto`}>
            <Suspense fallback={<></>}>
               <Filter />
               <Products />
            </Suspense>
         </div>
      </>
   );
};