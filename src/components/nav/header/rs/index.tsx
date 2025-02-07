"use client";

import { useRouter, usePathname } from "next/navigation";
import { Cart } from "@/components/@svgs";
import SkeletonLoader from "@/shared/components/skeleton";
import styles from "./styles.module.css";

import {
   useModal,
   useCart,
   useFirebaseUser
} from "@/context";

export default function HeaderRight() {
   const router = useRouter();
   const pathname = usePathname();
   const { cart: { items } } = useCart()!;
   const { user, loading } = useFirebaseUser()!;
   const { setCurrentModal } = useModal()!;
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
         { pathname === "/auth" && <></> || <><button
            disabled={loading}
            className={`${styles.signIn} fw-600`}
            onClick={redirectProfile}>
            { loading && <SkeletonLoader width={100} height={40} /> || (username && `Hi, ${username}` || "Sign in")}
         </button>
         <button className={`${styles.cartBtn} posrel`} onClick={openCart}>
            {items.length > 0 && (
               <span
                  className={`${styles.cartAmount} dark-v flex-center circle-bd-r posab fw-600`}>
                  {items.length}
               </span>
            )}
            <Cart className={styles.cartIc} />
         </button></>}
      </div>
   );
}
