import { fetchDocFromReference } from "..";
import type { Product as FirestoreProduct } from "./types";
import type {
   Product as SerializedProduct,
   Brand,
   Category
} from "@/shared/types/entities";

export const serializeProduct = async (
   product: FirestoreProduct
): Promise<SerializedProduct> => {
   const [category, brand] = (await Promise.all([
      fetchDocFromReference(product.category),
      fetchDocFromReference(product.brand)
   ])) as [Category, Brand];

   return { 
      ...product, 
      brand, 
      category,
      created_at: product.created_at.toMillis(),
      updated_at: product.updated_at.toMillis() 
   };
};

export const serializeProducts = async (
   products: FirestoreProduct[]
): Promise<SerializedProduct[]> => {
   return await Promise.all(products.map(serializeProduct));
};
