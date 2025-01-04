import { useCallback, useState } from "@/configs/imports-wrapper";
import { useToast, useCart } from "@/context";
import type { SelectedVariation } from "../types";
import type { Product } from "../types/entities";
import { constants } from "@/configs";

const { DEFAULT_QUANTITY, MAX_QUANTITY, INCREASE_ONCE, DECREASE_ONCE } = constants;

type Color = {
  name: string,
  hex_code: string
}

export default function useProductOptions(product: Product) {
  const toast = useToast()!;
  const [amount, setAmount] = useState<number>(DEFAULT_QUANTITY);
  const { addCart } = useCart()!;
  const [selectedVariation, setSelectedVariation] = useState<SelectedVariation>(
    {...product.variations[0]}
  );

  const { size, color, stock } = selectedVariation;

  const [error, setError] = useState<string>("");

  const getError = () => (
      (!size && color && "Please select product's color") ||
      (!color && size && "Please select product's size") ||
      (!size && !color && "Please select size and color") ||
      ""
  );

  const clickChangeAmount = (act: "INCREASE" | "DECREASE") => {
    if (act == "DECREASE" && amount == DEFAULT_QUANTITY) return; // avoid 0 quantity
    setAmount(amount + (act === "INCREASE" ? INCREASE_ONCE : DECREASE_ONCE));
  };

  const onModifyingAmount = (newAmount: number) => {
    console.log(newAmount);
    setError(
      (!newAmount || newAmount <= 0) && "Invalid product quantity" ||
      newAmount > MAX_QUANTITY && `You can only have a maximum of ${MAX_QUANTITY} products` ||
      newAmount > stock && "This product is out of stock" || ""
    );
    setAmount(newAmount);
  };

  const handleAddToCart = () => {
    if (error) return false;
    const _error = getError();
    if (_error) {
      setError(_error);
      return false;
    }

    addCart({
      id: product?.id,
      name: product?.name,
      lastPrice: product?.sale?.lastPrice || product?.price,
      images: product?.images,
      qty: amount,
      selectedVariation,
      ...((product?.sale && { saleId: product.sale.id }) || {})
    });
    
    return true;
  };

  const changeColor = useCallback((color: Color) => {
    for (const variation of product.variations) {
      if (variation.size == selectedVariation.size && variation.color.hex_code == color.hex_code) {
        setSelectedVariation(variation);
        break;
      }
    }
  }, [product.variations]);

  const changeSize = useCallback((size: string) => {
    for (const variation of product.variations) {
      if (variation.color.hex_code == selectedVariation.color.hex_code && variation.size == size) {
        setSelectedVariation(variation);
        break;
      }
    }
  }, [product.variations]);

  return {
    product,
    amount,
    color,
    size,
    stock,
    error,
    clickChangeAmount,
    onModifyingAmount,
    changeSize,
    changeColor,
    handleAddToCart
  };
}
