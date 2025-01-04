"use client";

import { useRouter } from "@/configs/imports-wrapper";
import { useFirebaseUser } from "@/context";
import styles from "./style.module.css";

export default function BottomNav() {
  const router = useRouter();
  const { user, loading } = useFirebaseUser()!;
  const username = user?.displayName;

  const redirectProfile = () => {
    if (loading) return;
    if (username) {
      router.push("account");
      return;
    }
    router.push("/auth", { scroll: false });
  };

  return (
    <div
      className={`${styles.wrapper} bottom-0 d-flex jc-sb at-center w-full bg-white`}>
      <button
        className="bottom__menu__nav-button"
        onClick={() => router.push("/navigation")}>
        <svg width="22" height="14" viewBox="0 0 25.567 18">
          <g transform="translate(-776 -462)">
            <rect
              id="Rectangle_941"
              data-name="Rectangle 941"
              width="12.749"
              height="2.499"
              rx="1.25"
              transform="translate(776 462)"
              fill="currentColor"></rect>
            <rect
              id="Rectangle_942"
              data-name="Rectangle 942"
              width="25.567"
              height="2.499"
              rx="1.25"
              transform="translate(776 469.75)"
              fill="currentColor"></rect>
            <rect
              id="Rectangle_943"
              data-name="Rectangle 943"
              width="17.972"
              height="2.499"
              rx="1.25"
              transform="translate(776 477.501)"
              fill="currentColor"></rect>
          </g>
        </svg>
      </button>
      <button className={styles.tab} onClick={() => router.push("/")}>
        <svg width="18px" height="20px" viewBox="0 0 17.996 20.442">
          <path
            d="M48.187,7.823,39.851.182A.7.7,0,0,0,38.9.2L31.03,7.841a.7.7,0,0,0-.211.5V19.311a.694.694,0,0,0,.694.694H37.3A.694.694,0,0,0,38,19.311V14.217h3.242v5.095a.694.694,0,0,0,.694.694h5.789a.694.694,0,0,0,.694-.694V8.335a.7.7,0,0,0-.228-.512ZM47.023,18.617h-4.4V13.522a.694.694,0,0,0-.694-.694H37.3a.694.694,0,0,0-.694.694v5.095H32.2V8.63l7.192-6.98L47.02,8.642v9.975Z"
            transform="translate(-30.619 0.236)"
            fill="currentColor"
            stroke="currentColor"
            strokeWidth="0.4"></path>
        </svg>
      </button>
      <button className={styles.tab} onClick={() => router.push("/cart", { scroll: false })}>
        <svg width="18px" height="18px" viewBox="0 0 20 20">
          <path
            d="M5,4H19a1,1,0,0,1,1,1V19a1,1,0,0,1-1,1H5a1,1,0,0,1-1-1V5A1,1,0,0,1,5,4ZM2,5A3,3,0,0,1,5,2H19a3,3,0,0,1,3,3V19a3,3,0,0,1-3,3H5a3,3,0,0,1-3-3Zm10,7C9.239,12,7,9.314,7,6H9c0,2.566,1.669,4,3,4s3-1.434,3-4h2C17,9.314,14.761,12,12,12Z"
            transform="translate(-2 -2)"
            fill="currentColor"
            fillRule="evenodd"></path>
        </svg>
      </button>
      <button className={styles.tab} onClick={redirectProfile}>
        <svg width="18px" height="20px" viewBox="0 0 16.577 18.6">
          <path
            d="M-7722.37,2933a.63.63,0,0,1-.63-.63c0-4.424,2.837-6.862,7.989-6.862s7.989,2.438,7.989,6.862a.629.629,0,0,1-.63.63Zm.647-1.251h13.428c-.246-3.31-2.5-4.986-6.713-4.986s-6.471,1.673-6.714,4.986Zm2.564-12.518a4.1,4.1,0,0,1,1.172-3,4.1,4.1,0,0,1,2.979-1.229,4.1,4.1,0,0,1,2.979,1.229,4.1,4.1,0,0,1,1.171,3,4.341,4.341,0,0,1-4.149,4.5,4.344,4.344,0,0,1-4.16-4.5Zm1.251,0a3.1,3.1,0,0,0,2.9,3.254,3.094,3.094,0,0,0,2.9-3.253,2.878,2.878,0,0,0-.813-2.109,2.88,2.88,0,0,0-2.085-.872,2.843,2.843,0,0,0-2.1.856,2.841,2.841,0,0,0-.806,2.122Z"
            transform="translate(7723.3 -2914.703)"
            fill="currentColor"
            stroke="currentColor"
            strokeWidth="0.6"></path>
        </svg>
      </button>
    </div>
  );
}
