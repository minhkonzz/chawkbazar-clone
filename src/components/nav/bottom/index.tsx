import { useMemo } from "react";
import { useRouter } from "next/navigation";
import { useModalContext } from "@/context";
import styles from "./styles.module.css";

export default function BottomNav() {

   const router = useRouter();
   const { setCurrentModal } = useModalContext()!;

   const tabs = useMemo(() => [
      { tabIcon: 'home-outline', onTabClick: () => router.push("/") },
      { tabIcon: 'search-outline', onTabClick: () => {} },
      { tabIcon: 'bag-handle-outline', onTabClick: () => setCurrentModal("cart") }
   ], []);
   
   return (
      <div className={`${styles.wrapper} d-flex jc-sb at-center w-full bg-white`}>
         <button className="bottom__menu__nav-button">
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="14" viewBox="0 0 25.567 18">
               <g transform="translate(-776 -462)">
                  <rect id="Rectangle_941" data-name="Rectangle 941" width="12.749" height="2.499" rx="1.25" transform="translate(776 462)" fill="currentColor"></rect>
                  <rect id="Rectangle_942" data-name="Rectangle 942" width="25.567" height="2.499" rx="1.25" transform="translate(776 469.75)" fill="currentColor"></rect>
                  <rect id="Rectangle_943" data-name="Rectangle 943" width="17.972" height="2.499" rx="1.25" transform="translate(776 477.501)" fill="currentColor"></rect>
               </g>
            </svg>
         </button>
         { tabs.map((tab, i) => 
         <button
            className={styles.tab} 
            key={i} 
            onClick={tab.onTabClick}>
            {tab.tabIcon}
         </button> ) }
      </div>
   );
}