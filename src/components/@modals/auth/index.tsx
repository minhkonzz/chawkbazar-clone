"use client";

import { forwardRef, type ForwardedRef } from "react";
import type { OnCloseModal } from "@/shared/types/ui";
import CloseButton from "../close-button";
import Auth from "@/components/auth";
import styles from "./styles.module.css";

export default forwardRef(function AuthModal(
   { onClose }: OnCloseModal,
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
