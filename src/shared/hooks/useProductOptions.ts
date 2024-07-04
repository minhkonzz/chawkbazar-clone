import { useState, useEffect } from "react";
import { constants } from "@/configs";
import { useToast, useCartContext } from "@/context";

const { AMOUNT_PATTERN } = constants.regex;
const { INCREASE_ONCE, DECREASE_ONCE } = constants;

export default function useProductOptions(product: any) {

   const toast = useToast()!;
   const [ amount, setAmount ] = useState<string>("1");
   const [ color, setColor ] = useState<any>(null);
   const [ size, setSize ] = useState<any>(null);
   const [ errors, setErrors ] = useState<any>(null);

   const { addCart } = useCartContext()!;

   useEffect(() => {
      const addonsError = !!errors && errors.addonsError;
      if (addonsError) {
         // show message
      }
   }, [errors]);

   const getAmountError = () => {
      return (!amount.match(AMOUNT_PATTERN) && "Số lượng không hợp lệ") || "";
   };

   const getUserOptionsError = () => {
      const amountError = getAmountError();
      const addonsError = (!size && color && "Vui lòng chọn màu sản phẩm") || (!color && size && "Vui lòng chọn size") || (!size && !color && "Vui lòng chọn size và màu sản phẩm") || "";
      if (amountError || addonsError) {
         return {
            amountError,
            addonsError
         }
      }
      return null;
   };

   const inDecreaseAmount = (amountAction: any) => {
      const amountError = getAmountError();
      if (amountError) {
         setErrors({ ...errors, amountError });
         return;
      }
      setAmount((Number(amount) + (amountAction === "INCREASE" ? INCREASE_ONCE : DECREASE_ONCE)).toString());
   }

   const onModifyingAmount = (newAmount: string) => {
      if (newAmount.length > 5) return;
      setErrors(null);
      setAmount(newAmount);
   }

   const isEnteredAmount = (e: any) => {
      const amountError = getAmountError();
      if (e.code === "Enter" && amountError) setErrors({ ...errors, amountError });
   }

   const handleAddToCart = () => {
      const userOptionsError = getUserOptionsError();
      if (userOptionsError) {
         setErrors(userOptionsError);
         return;
      }
      addCart({
         ...product,
         qty: Number(amount) || 1, // amount default is 1
         sizeSelected: size.sizeSelected,
         colorSelected: color.colorSelected
      });
      toast("success", "Successfully added item to cart");
   };

   const onSelectAddon = (addonDetail: any, selectedIndex: number) => {
      const { id: addonId, value: addonValue, meta: colorCode } = addonDetail;
      if (!!colorCode === false) {
         const { sizeSelected, sizeSelectedIndex } = size || { sizeSelected: null, sizeSelectedIndex: -1 };
         if ((!!sizeSelected && sizeSelected.value === addonValue) || sizeSelectedIndex === selectedIndex) return;
         setSize({
            sizeSelected: {
               ...sizeSelected,
               id: addonId,
               value: addonValue
            },
            sizeSelectedIndex: selectedIndex
         });
         return;
      }
      const { colorSelected, colorSelectedIndex } = color || { colorSelected: null, colorSelectedIndex: -1 };
      if ((!!colorSelected && colorSelected.value === addonValue) || colorSelectedIndex === selectedIndex) return;
      setColor({
         colorSelected: {
            ...colorSelected,
            id: addonId,
            value: addonValue,
            meta: colorCode
         },
         colorSelectedIndex: selectedIndex
      })
   }

   return {
      product,
      amount,
      color,
      size,
      errors,
      inDecreaseAmount,
      onModifyingAmount,
      isEnteredAmount,
      onSelectAddon,
      handleAddToCart
   }
}