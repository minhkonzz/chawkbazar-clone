"use client";

import { forwardRef, type ForwardedRef, type MouseEvent } from "react";
import Auth from "@/components/auth";
import styles from "./styles.module.css";

interface Props {
   onClose: (
      e: MouseEvent<HTMLButtonElement>,
      isClickCloseButton: boolean
   ) => void;
};

export default forwardRef(function AuthModal(
   { onClose }: Props,
   ref: ForwardedRef<HTMLDivElement | null>
) {
   return (
      <div
         ref={ref}
         className={`${styles.wrapper} posab pos-center max-h-100pc bg-white`}>
         <button
            className={`${styles.closeButton} jc-center at-center circle-bd-r bg-white`}
            onClick={e => onClose(e, true)}>
            <svg
               stroke="currentColor"
               fill="currentColor"
               strokeWidth="0"
               viewBox="0 0 512 512"
               className={styles.ic}
               height="1em"
               width="1em">
               <path d="M289.94 256l95-95A24 24 0 00351 127l-95 95-95-95a24 24 0 00-34 34l95 95-95 95a24 24 0 1034 34l95-95 95 95a24 24 0 0034-34z"></path>
            </svg>
         </button>
         <div className={`${styles.main} d-flex fd-col w-100pc h-100pc`}>
            <Auth />
         </div>
      </div>
   );
});
