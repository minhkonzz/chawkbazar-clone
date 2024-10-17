import { ReactNode } from "react";
import dynamic from "next/dynamic";
import styles from "./layout.module.css";
import Banner from "@/components/banner";

const AccountNav = dynamic(() => import("@/components/account/nav"), { ssr: false });

export default function Account({ children }: { children: ReactNode }) {
   return (
      <Banner title="My Account">
         <div className="wrapper1920">
            <div className={`${styles.container} d-flex mx-auto`}>
               <nav className={styles.nav}>
                  <AccountNav styles={styles} />
               </nav>
               <div className={styles.main}>
                  {children}
               </div>
            </div>
         </div>
      </Banner>
   );
};