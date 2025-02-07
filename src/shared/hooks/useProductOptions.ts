import { useState, useEffect, type KeyboardEvent } from "react";
import { useToast, useCart } from "@/context";
import type { SelectedProductVariation } from "../types";
import type { Product } from "../types/entities";
import { constants } from "@/configs";

const { AMOUNT_PATTERN } = constants.regex;
const { DEFAULT_QUANTITY, INCREASE_ONCE, DECREASE_ONCE } = constants;

export default function useProductOptions(product: Product) {
   const toast = useToast()!;
   const [amount, setAmount] = useState<string>("1");
   const [selectedVariation, setSelectedVariation] = useState<SelectedProductVariation>({
      size: "",
      color: null
   });

   const [errors, setErrors] = useState<{
      amountErr?: string;
      addonsErr?: string;
   }>();

   const { addCart } = useCart()!;

   useEffect(() => {
      const addonsErr = !!errors && errors.addonsErr;
      if (addonsErr) toast("warning", "Addons");
   }, [errors]);

   const getAmountError = () => {
      return (!amount.match(AMOUNT_PATTERN) && "Số lượng không hợp lệ") || "";
   };

   const getUserOptionsError = () => {
      const amountErr = getAmountError();
      const { size, color } = selectedVariation;

      const addonsErr =
         (!size && color && "Please select product's color") ||
         (!color && size && "Please select product's size") ||
         (!size && !color && "Please select size and color") ||
         "";
      if (!amountErr && !addonsErr) return;
      return {
         ...(errors && { errors } || {}),
         ...(amountErr && { amountErr } || {}),
         ...(addonsErr && { addonsErr } || {})
      };
   };

   const clickChangeAmount = (act: "INCREASE" | "DECREASE") => {
      const amountErr = getAmountError();
      if (amountErr) {
         setErrors({ ...errors, amountErr });
         return;
      }
      const curAmount = Number(amount)
      if (act == "DECREASE" && curAmount == 1) return; // avoid 0 quantity
      setAmount(
         (
            curAmount +
            (act === "INCREASE" ? INCREASE_ONCE : DECREASE_ONCE)
         ).toString()
      );
   };

   const onModifyingAmount = (newAmount: string) => {
      if (newAmount.length > 5) return;
      setErrors(undefined);
      setAmount(newAmount);
   };

   const isEnteredAmount = (e: KeyboardEvent<HTMLInputElement>) => {
      const amountErr = getAmountError();
      if (e.code === "Enter" && amountErr) setErrors({ ...errors, amountErr });
   };

   const handleAddToCart = () => {
      const userOptionsErr = getUserOptionsError();
      if (userOptionsErr) {
         setErrors(userOptionsErr);
         return;
      }

      const addCartProduct = {
         id: product?.id,
         name: product?.name,
         lastPrice: product?.sale?.lastPrice || product?.price,
         images: product?.images,
         qty: Number(amount) || DEFAULT_QUANTITY,
         selectedVariation,
         ...(product?.sale && { saleId: product.sale.id } || {})
      };

      addCart(addCartProduct);
      return addCartProduct;
   };

   const onSelectAddon = (addon: string | { hex_code: string, name: string }) => {
      if (typeof addon === "string") {
         setSelectedVariation({
            ...selectedVariation,
            size: addon
         });
         return;
      }
      setSelectedVariation({
         ...selectedVariation,
         color: addon
      })
   };

   const {
      size,
      color
   } = selectedVariation;

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
}
