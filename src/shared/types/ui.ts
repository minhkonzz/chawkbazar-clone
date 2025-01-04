import type { MouseEvent } from "react";

export type OnCloseModal = {
   onClose: (
      e: MouseEvent<HTMLButtonElement>,
      isClickCloseButton: boolean
   ) => void
};