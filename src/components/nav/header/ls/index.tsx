import styles from "./styles.module.css";
import Image from "next/image";
import Tab from "../tab";

export default function HeaderLeft() {
   return (
      <nav className="d-flex h-100pc at-center">
         <button className={styles.btn}>
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="14" viewBox="0 0 25.567 18">
               <g transform="translate(-776 -462)">
                  <rect id="Rectangle_941" data-name="Rectangle 941" width="12.749" height="2.499" rx="1.25" transform="translate(776 462)" fill="currentColor"></rect>
                  <rect id="Rectangle_942" data-name="Rectangle 942" width="25.567" height="2.499" rx="1.25" transform="translate(776 469.75)" fill="currentColor"></rect>
                  <rect id="Rectangle_943" data-name="Rectangle 943" width="17.972" height="2.499" rx="1.25" transform="translate(776 477.501)" fill="currentColor"></rect>
               </g>
            </svg>
         </button>
         <Image className={styles.logo} src="/logo.svg" alt="logo_shop" width={95} height={30} priority />
         <ul className={styles.menu}>
            <Tab tabName="Home" href="#" />
            <Tab tabName="About" href="#" />
            <Tab tabName="Pages" href="#">
               <div className={`${styles.dropdown} posab bg-white`}>
                  <span>My Account</span>
                  <span>FAQ</span>
                  <span>Terms & Conditions</span>
                  <span>Contact us</span>
                  <span>Checkout</span>
               </div>
            </Tab>
         </ul>
      </nav>
   )
}