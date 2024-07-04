import { fetchDocFromReference } from "..";

export const serializeProduct = async (product: any): Promise<any> => {
   const [ category, brand ] = await Promise.all([
      fetchDocFromReference(product.category),
      fetchDocFromReference(product.brand)
   ]);
   return { ...product, brand, category };
};

export const serializeProducts = async (products: any): Promise<any> => {
   return await Promise.all(products.map(serializeProduct));
};

