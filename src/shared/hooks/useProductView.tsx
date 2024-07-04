
import ProductModal from "@/components/@modals/product-detail";
import { ForwardedRef, forwardRef } from "react";
import { useModalContext } from "@/context";

export default function useProductView(product: any) {
   const { setCurrentModal } = useModalContext()!;

   const onClick = () => {
      if (!setCurrentModal) return;

      const CustomProductPopup = forwardRef(function ProductModalWrapper(
         { onClose }: { onClose: (e: any, isClickCloseButton: boolean) => void }, 
         ref: ForwardedRef<HTMLDivElement | null>
      )  { 
            return <ProductModal {...{ ref, item: product, onClose }} /> 
         }
      );

      setCurrentModal("product", CustomProductPopup);
   }

   return onClick;
}