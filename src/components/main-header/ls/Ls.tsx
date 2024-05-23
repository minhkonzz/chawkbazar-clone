import styles from "./Ls.module.css";
import Image from "next/image";
import Tab from "../tab";

export default function () {
   return (
      <div className="d-flex h-100pc at-center">
         <Image src="/logo.svg" alt="logo_shop" width={95} height={30} priority />
         <nav className={styles.nav}>
            <Tab tabName="Home" href="#" />
            <Tab tabName="About" href="#" />
            <Tab tabName="News" href="#" />
         </nav>
      </div>
   )
}