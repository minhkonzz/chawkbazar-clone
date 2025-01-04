"use client";

import { useRouter, usePathname } from "@/configs/imports-wrapper";
import { useCart, useFirebaseUser } from "@/context";
import { Cart } from "@/components/atoms/svgs";
import { SkeletonLoader } from "@/components/atoms";
import styles from "./style.module.css";

export default function HeaderRight() {
  const router = useRouter();
  const pathname = usePathname();
  const { cart: { items } } = useCart()!;
  const { user, loading } = useFirebaseUser()!;
  const username = user?.displayName;

  const openCart = () => {
    router.push("/cart", { scroll: false });
  };

  const redirectProfile = () => {
    if (username) {
      router.push("account");
      return;
    }
    router.push("/auth", { scroll: false });
  };

  return (
    <div
      className={`${styles.wrapper} d-flex at-center`}
      suppressHydrationWarning={true}>
      {(pathname === "/auth" && <></>) || (
        <>
          <button
            disabled={loading}
            className={`${styles.signIn} fw-600`}
            onClick={redirectProfile}>
            {(loading && <SkeletonLoader className={styles.signInSkeleton} />) ||
              (username && `Hi, ${username}`) ||
              "Sign in"}
          </button>
          <button className={`${styles.cartBtn} posrel`} aria-label="Toggle cart" onClick={openCart}>
            {items.length > 0 && (
              <span
                className={`${styles.cartAmount} dark-v flex-center circle-bd-r posab fw-600`}>
                {items.length}
              </span>
            )}
            <Cart className={styles.cartIc} />
          </button>
        </>
      )}
    </div>
  );
}
