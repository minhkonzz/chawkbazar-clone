"use client";

import { forwardRef, type ForwardedRef, type MouseEvent } from "react";
import CloseButton from "../close-button";
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
         <CloseButton onClick={e => onClose(e, true)} />
         <div className={`${styles.main} d-flex fd-col w-100pc h-100pc`}>
            <Auth />
         </div>
      </div>
   );
});
