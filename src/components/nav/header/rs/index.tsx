"use client";

// import Langs from "../langs";
import { useRouter } from "next/navigation";
import { openSans } from "@/app/fonts";
import styles from "./styles.module.css";

import {
   useModalContext,
   useCartContext,
   useFirebaseUserContext
} from "@/context";

export default function HeaderRight() {
   const router = useRouter();
   const { cart } = useCartContext()!;
   const { currentUser } = useFirebaseUserContext()!;
   const { setCurrentModal } = useModalContext()!;
   const { items } = cart;
   const username = currentUser?.user.displayName;

   const openCart = () => {
      if (!setCurrentModal) return;
      setCurrentModal("cart");
   };

   const redirectProfile = () => {
      if (username) {
         router.push("/account");
         return;
      }
      if (!setCurrentModal) return;
      setCurrentModal("auth");
   };

   return (
      <div className={styles.wrapper} suppressHydrationWarning={true}>
         {/* <Langs /> */}
         <button
            className={`${styles.signIn} 
            ${openSans.className}`}
            onClick={redirectProfile}>
            {(username && `Hi, ${username}`) || "Sign in"}
         </button>
         <button className={styles.cartButton} onClick={openCart}>
            {items.length > 0 && (
               <span
                  className={`${styles.cartAmount} d-flex jc-center at-center circle-bd-r`}>
                  {items.length}
               </span>
            )}
            <svg
               width="18px"
               height="18px"
               viewBox="0 0 20 20"
               className={styles.cartIcon}>
               <path
                  d="M5,4H19a1,1,0,0,1,1,1V19a1,1,0,0,1-1,1H5a1,1,0,0,1-1-1V5A1,1,0,0,1,5,4ZM2,5A3,3,0,0,1,5,2H19a3,3,0,0,1,3,3V19a3,3,0,0,1-3,3H5a3,3,0,0,1-3-3Zm10,7C9.239,12,7,9.314,7,6H9c0,2.566,1.669,4,3,4s3-1.434,3-4h2C17,9.314,14.761,12,12,12Z"
                  transform="translate(-2 -2)"
                  fill="currentColor"
                  fillRule="evenodd"></path>
            </svg>
         </button>
      </div>
   );
}
