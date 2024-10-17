import dynamic from "next/dynamic";
import styles from "./page.module.css";

const Filter = dynamic(() => import("@/components/catalog/filter"), { ssr: false });
const Products = dynamic(() => import("@/components/catalog/products"), { ssr: false });

export default function Search() {
   return (
      <>
         <div className={styles.event}>
            <div className="d-flex jc-sb at-center text-center wrapper1920 mx-auto">
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
                     height="1.25em" 
                     width="1.25em">
                     <path d="M289.94 256l95-95A24 24 0 00351 127l-95 95-95-95a24 24 0 00-34 34l95 95-95 95a24 24 0 1034 34l95-95 95 95a24 24 0 0034-34z"></path>
                  </svg>
               </button>
            </div>
         </div>
         <div className={`${styles.catalog} d-flex wrapper1920 mx-auto`}>
            <Filter />
            <div className="w-100pc">
               <Products />
            </div>
         </div>
      </>
   );
};