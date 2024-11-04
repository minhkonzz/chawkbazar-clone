import Link from "next/link";
import styles from "./styles.module.css";
import Image from "next/image";
import Tab from "../tab";

export default function HeaderLeft() {
   return (
      <nav className="d-flex h-100pc at-center">
         <Link href="/">
            <Image
               className={styles.logo}
               src="/logo.svg"
               alt="logo_shop"
               width={95}
               height={30}
               priority
            />
         </Link>
         <ul className={styles.menu}>
            <Tab tabName="Search" href="/search" />
            <Tab tabName="Pages" href="#">
               <ul className={`${styles.dropdown} posab`}>
                  <li>
                     <a href="/account">My Account</a>
                  </li>
                  <li>
                     <a href="/faq">FAQ</a>
                  </li>
                  <li>
                     <a href="/policy">Terms & Conditions</a>
                  </li>
                  <li>
                     <a href="/contact">Contact us</a>
                  </li>
                  <li>
                     <a href="/checkout">Checkout</a>
                  </li>
               </ul>
            </Tab>
         </ul>
      </nav>
   );
}
