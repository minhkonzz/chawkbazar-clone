"use client";

// import Langs from "../langs";
import { useRouter, usePathname } from "next/navigation";
import { Cart } from "@/components/@svgs";
import styles from "./styles.module.css";

import {
   useModalContext,
   useCartContext,
   useFirebaseUser
} from "@/context";

export default function HeaderRight() {
   const router = useRouter();
   const pathname = usePathname();
   const { cart: { items } } = useCartContext()!;
   const { user } = useFirebaseUser()!;
   const { setCurrentModal } = useModalContext()!;
   const username = user?.displayName;

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
      <div className={`${styles.wrapper} d-flex at-center`} suppressHydrationWarning={true}>
         {/* <Langs /> */}
         {pathname === "/auth" && <></> || <><button
            className={`${styles.signIn} fw-600`}
            onClick={redirectProfile}>
            {(username && `Hi, ${username}`) || "Sign in"}
         </button>
         <button className={`${styles.cartBtn} posrel`} onClick={openCart}>
            {items.length > 0 && (
               <span
                  className={`${styles.cartAmount} dark-v d-flex jc-center at-center circle-bd-r posab fw-600`}>
                  {items.length}
               </span>
            )}
            <Cart className={styles.cartIc} />
         </button></>}
      </div>
   );
}
