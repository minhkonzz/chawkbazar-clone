"use client";

import { forwardRef, type ForwardedRef } from "@/configs/imports-wrapper";
import type { DialogProps } from "@/types/ui";
import withDialog from "@/hocs/with-dialog";
import CloseButton from "../close-button";
import Auth from "@/components/organisms/auth";
import styles from "./style.module.css";

export default withDialog(forwardRef(function AuthDialog(
  { onClose, closeModal }: DialogProps,
  ref: ForwardedRef<HTMLDialogElement | null>
) {
  return (
    <dialog
      ref={ref}
      onClose={onClose}
      className={`${styles.wrapper} pos-center max-h-100pc bg-white`}>
      <CloseButton onClick={closeModal} />
      <div className={`${styles.main} d-flex fd-col h-100pc`}>
        <Auth />
      </div>
    </dialog>
  );
}));
