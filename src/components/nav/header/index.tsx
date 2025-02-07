import { Suspense } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import Image from "next/image";
import styles from "./styles.module.css";

const HeaderTabs = dynamic(() => import("./tabs"), { ssr: false });
const HeaderRight = dynamic(() => import("./rs"), { ssr: false });

export default function NavHeader() {
   return (
      <header className={`${styles.wrapper} bg-white`}>
         <div className={`${styles.inner} wrapper-1920 d-flex jc-sb h-100pc mx-auto`}>
            <nav className="d-flex h-100pc at-center">
               <Link href="/">
                  <Image
                     className={`${styles.logo} h-auto`}
                     src="/logo.webp"
                     alt="logo_shop"
                     width={95}
                     height={30}
                     priority
                  />
               </Link>
               <ul className={styles.menu}>
                  <HeaderTabs />
               </ul>
            </nav>
            <Suspense fallback={<span>Loading</span>}>
               <HeaderRight />
            </Suspense>
         </div>
      </header>
   );
}
