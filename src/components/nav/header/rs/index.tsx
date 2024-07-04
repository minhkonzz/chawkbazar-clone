"use client";

import styles from "./styles.module.css";
import Langs from "../langs";
import { openSans } from "@/app/fonts";
import { useModalContext } from "@/context";

export default function HeaderRight() {
   const { setCurrentModal } = useModalContext()!;

   const onClick = () => {
      if (!setCurrentModal) return;
      setCurrentModal("cart");
   }

   const onSignIn = () => {
      if (!setCurrentModal) return;
      setCurrentModal("auth");
   }

   return (
      <div className={styles.container}>
         <Langs />
         <button className={`${styles.signIn} ${openSans.className}`} onClick={onSignIn}>Sign In</button>
         <button className={styles.cartButton} {...{ onClick }}>
            <span className={`${styles.cartAmount} d-flex jc-center at-center circle-bd-r`}>2</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="18px" height="18px" viewBox="0 0 20 20" className={styles.cartIcon}>
               <path d="M5,4H19a1,1,0,0,1,1,1V19a1,1,0,0,1-1,1H5a1,1,0,0,1-1-1V5A1,1,0,0,1,5,4ZM2,5A3,3,0,0,1,5,2H19a3,3,0,0,1,3,3V19a3,3,0,0,1-3,3H5a3,3,0,0,1-3-3Zm10,7C9.239,12,7,9.314,7,6H9c0,2.566,1.669,4,3,4s3-1.434,3-4h2C17,9.314,14.761,12,12,12Z" transform="translate(-2 -2)" fill="currentColor" fillRule="evenodd"></path>
            </svg>
         </button>
      </div>
   )
}