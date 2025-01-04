import { type ForwardedRef, forwardRef } from "react";
import type { Product } from "../types/entities";
import type { OnCloseModal } from "../types/ui";
import { useModalContext } from "@/context";
import ProductModal from "@/components/@modals/product-detail";

export default function useProductView(product: Product) {
   const { setCurrentModal } = useModalContext()!;

   const onClick = () => {
      if (!setCurrentModal) return;

      const CustomProductPopup = forwardRef(function ProductModalWrapper(
         { onClose }: OnCloseModal,
         ref: ForwardedRef<HTMLDivElement | null>
      ) {
         return <ProductModal ref={ref} item={product} onClose={onClose} />
      });

      setCurrentModal("product", CustomProductPopup);
   };
   return onClick;
}
