import styles from "./page.module.css";

export default function () {
   return (
      <>
         <div className={`${styles.event} mx-auto posrel text-center`}>
            1000S Of New Items Just Added: Extra 20% Sale. Selected Items. Prices As Marked.
            <a className={styles.eventLink}>Details</a>
            <button className="posab right-0">
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
         <div className={`${styles.catalog} d-flex mx-auto`}>
            <div className={styles.filter}>
               <div className={styles.filterInner}>
                  
               </div>
            </div>
            <div className={styles.items}>
               <div className={`${styles.itemsHeader} d-flex jc-sb at-center`}>
                  <h1 className={styles.itemsTitle}>Casual wear</h1>
                  <div className="d-flex at-center jc-end">
                     <span className={styles.itemsCount}></span>
                     <button className={`${styles.sortingOptions} posrel cp`}>
                        Sorting options
                        <svg 
                           className={`${styles.sortingOptionsIc} posab top-0 bottom-0 right-0`}
                           stroke="currentColor" 
                           fill="none" 
                           strokeWidth="2" 
                           viewBox="0 0 24 24" 
                           aria-hidden="true" 
                           height="1em" 
                           width="1em" xmlns="http://www.w3.org/2000/svg">
                           <path stroke-linecap="round" stroke-linejoin="round" d="M8 9l4-4 4 4m0 6l-4 4-4-4"></path>
                        </svg>
                     </button>
                  </div>
               </div>
               <div className={styles.list}>

               </div>
               <div className={`${styles.loadMoreWrapper} text-center`}>
                  <button className={`${styles.loadMoreButton} cp`}>Load more</button>
               </div>
            </div>
         </div>
      </>
   )
}