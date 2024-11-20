import { type ForwardedRef, type MouseEvent, forwardRef } from "react";
import type { Product } from "../types/entities";
import { useModalContext } from "@/context";
import ProductModal from "@/components/@modals/product-detail";

export default function useProductView(product: Product) {
   const { setCurrentModal } = useModalContext()!;

   const onClick = () => {
      if (!setCurrentModal) return;

      const CustomProductPopup = forwardRef(function ProductModalWrapper(
         {
            onClose
         }: {
            onClose: (
               e: MouseEvent<HTMLButtonElement>,
               isClickCloseButton: boolean
            ) => void;
         },
         ref: ForwardedRef<HTMLDivElement | null>
      ) {
         return <ProductModal {...{ ref, item: product, onClose }} />;
      });

      setCurrentModal("product", CustomProductPopup);
   };
   return onClick;
}
