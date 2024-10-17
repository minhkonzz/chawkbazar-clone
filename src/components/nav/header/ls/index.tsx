import Link from "next/link";
import styles from "./styles.module.css";
import Image from "next/image";
import Tab from "../tab";

export default function HeaderLeft() {
   return (
      <nav className="d-flex h-100pc at-center">
         <button className={styles.btn}>
            <svg width="22" height="14" viewBox="0 0 25.567 18">
               <g transform="translate(-776 -462)">
                  <rect id="Rectangle_941" data-name="Rectangle 941" width="12.749" height="2.499" rx="1.25" transform="translate(776 462)" fill="currentColor"></rect>
                  <rect id="Rectangle_942" data-name="Rectangle 942" width="25.567" height="2.499" rx="1.25" transform="translate(776 469.75)" fill="currentColor"></rect>
                  <rect id="Rectangle_943" data-name="Rectangle 943" width="17.972" height="2.499" rx="1.25" transform="translate(776 477.501)" fill="currentColor"></rect>
               </g>
            </svg>
         </button>
         <Link href="/">
            <Image className={styles.logo} src="/logo.svg" alt="logo_shop" width={95} height={30} priority />
         </Link>
         <ul className={styles.menu}>
            <Tab tabName="Search" href="/search" />
            <Tab tabName="Pages" href="#">
               <ul className={`${styles.dropdown} posab`}>
                  <li><a href="/account">My Account</a></li>
                  <li><a href="/faq">FAQ</a></li>
                  <li><a href="/policy">Terms & Conditions</a></li>
                  <li><a href="/contact">Contact us</a></li>
                  <li><a href="/checkout">Checkout</a></li>
               </ul>
            </Tab>
         </ul>
      </nav>
   );
};