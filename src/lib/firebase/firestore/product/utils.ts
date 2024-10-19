import { fetchDocFromReference } from "..";
import { Product as SerializedProduct, Brand, Category } from "@/shared/types/entities";
import { Product as FirestoreProduct } from "./types";

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

