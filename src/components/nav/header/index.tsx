import dynamic from "next/dynamic";
import Ls from "./ls";
import styles from "./styles.module.css";

const HeaderRight = dynamic(() => import("./rs"), { ssr: false });

export default function NavHeader() {
   return (
      <header className={styles.container}>
         <div className={`${styles.inner} d-flex jc-sb h-100pc mx-auto`}>
            <Ls />
            <HeaderRight />
         </div>
      </header>
   );
};