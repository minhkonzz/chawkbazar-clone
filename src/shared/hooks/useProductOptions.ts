import { useState, useEffect, KeyboardEvent } from "react";
import { useToast, useCartContext } from "@/context";
import { ProductVariation } from "../types/entities";
import { Product } from "../types/entities";
import { SelectedProductVariation } from "../types";
import { constants } from "@/configs";

const { AMOUNT_PATTERN } = constants.regex;
const { DEFAULT_QUANTITY, INCREASE_ONCE, DECREASE_ONCE } = constants;

export default function useProductOptions(product: Product) {

   const toast = useToast()!;
   const [amount, setAmount] = useState<string>("1");
   const [color, setColor] = useState<SelectedProductVariation>();
   const [size, setSize] = useState<SelectedProductVariation>();
   const [errors, setErrors] = useState<{amountErr?: string, addonsErr?: string}>();

   const {addCart} = useCartContext()!;

   useEffect(() => {
      const addonsErr = !!errors && errors.addonsErr;
      if (addonsErr) toast("warning", "Addons");
   }, [errors]);

   const getAmountError = () => {
      return (!amount.match(AMOUNT_PATTERN) && "Số lượng không hợp lệ") || "";
   };

   const getUserOptionsError = () => {
      const amountErr = getAmountError();
      const addonsErr = (!size && color && "Vui lòng chọn màu sản phẩm") || (!color && size && "Vui lòng chọn size") || (!size && !color && "Vui lòng chọn size và màu sản phẩm") || "";
      if (!amountErr && !addonsErr) return;
      return {
         ...(errors && {errors} || {}),
         ...(amountErr && {amountErr} || {}),
         ...(addonsErr && {addonsErr} || {})
      }
   };

   const clickChangeAmount = (act: "INCREASE" | "DECREASE") => {
      const amountErr = getAmountError();
      if (amountErr) {
         setErrors({...errors, amountErr});
         return;
      }
      setAmount((Number(amount) + (act === "INCREASE" ? INCREASE_ONCE : DECREASE_ONCE)).toString());
   }

   const onModifyingAmount = (newAmount: string) => {
      if (newAmount.length > 5) return;
      setErrors(undefined);
      setAmount(newAmount);
   }

   const isEnteredAmount = (e: KeyboardEvent<HTMLInputElement>) => {
      const amountErr = getAmountError();
      if (e.code === "Enter" && amountErr) setErrors({...errors, amountErr});
   }

   const handleAddToCart = () => {
      const userOptionsErr = getUserOptionsError();
      if (userOptionsErr) {
         setErrors(userOptionsErr);
         return;
      }

      const addCartProduct = {
         id: product?.id,
         name: product?.name,
         lastPrice: product?.sale_price || product?.price,
         image: product?.image,
         qty: Number(amount) || DEFAULT_QUANTITY,
         selectedSize: size?.selected!,
         selectedColor: color?.selected!
      };

      addCart(addCartProduct);
      return addCartProduct;
   };

   const onSelectAddon = (addonDetail: ProductVariation, selectedIdx: number) => {
      const {id, value, meta, attribute} = addonDetail;
      const [addon, setAddon] = !meta && [size, setSize] || [color, setColor];
      const {selected, idx} = addon || {selected: null, idx: -1}
      if (selected?.value === value || idx === selectedIdx) return;
      setAddon({
         selected: {
            attribute,
            id,
            value,
            ...(meta && {meta} || {})
         },
         idx: selectedIdx
      });
   };

   return {
      product,
      amount,
      color,
      size,
      errors,
      clickChangeAmount,
      onModifyingAmount,
      isEnteredAmount,
      onSelectAddon,
      handleAddToCart
   };
};