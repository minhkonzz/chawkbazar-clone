import { fetchDocFromReference } from "..";
import { Product as SerializedProduct } from "@/shared/types";
import { Product as FirestoreProduct } from "./types";
import { Category, Brand } from "@/shared/types/entities";

export const serializeProduct = async (
   product: FirestoreProduct
): Promise<SerializedProduct> => {
   const [category, brand] = await Promise.all([
      fetchDocFromReference(product.category),
      fetchDocFromReference(product.brand)
   ]) as [Category, Brand];
   return {...product, brand, category};
};

export const serializeProducts = async (
   products: FirestoreProduct[]
): Promise<SerializedProduct[]> => {
   return await Promise.all(products.map(serializeProduct));
};

