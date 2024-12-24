import { type Firestore, or, where, and, doc } from "firebase/firestore";
import { serializeProduct, serializeProducts } from "./utils";
import { fetchDoc, fetchDocs, fetchWithCustomQuery, getDocsSnapShot } from "..";
import { firestoreClient } from "../../configs/client";
import type { ProductAttributes } from "@/shared/types";
import type { Product as FirestoreProduct, Product } from "./types";

import type {
   Product as SerializedProduct,
   Brand,
   Category
} from "@/shared/types/entities";

import collections from "../collections";

export const getProducts = async (
   firestore: Firestore = firestoreClient
): Promise<SerializedProduct[]> => {
   const products = (await fetchDocs(
      {
         collectionName: collections.PRODUCTS
      },
      firestore
   )) as FirestoreProduct[];
   return await serializeProducts(products);
};

export const getProductsSnapShot = (
   cb: (data: SerializedProduct[]) => void
) => {
   const unsub = getDocsSnapShot(
      {
         collectionName: collections.PRODUCTS
      },
      cb
   );
   return unsub;
};

export const getProductById = async (
   id: string,
   firestore: Firestore = firestoreClient
): Promise<SerializedProduct | null> => {
   const product = (await fetchDoc(
      collections.PRODUCTS,
      id,
      firestore
   )) as FirestoreProduct;
   if (!product) return null;
   return serializeProduct(product);
};

export const getProductAttributes = async (
   firestore: Firestore = firestoreClient
): Promise<ProductAttributes> => {
   const r = (await Promise.all(
      [collections.CATEGORIES, collections.BRANDS].map(collectionName =>
         fetchDocs({ collectionName }, firestore)
      )
   )) as [Category[], Brand[]];

   return {
      category: {
         title: "Category",
         options: r[0].map((e: Category) => ({
            id: e.id,
            name: e.name,
            slug: e.slug
         }))
      },
      brand: {
         title: "Brand",
         options: r[1].map((e: Brand) => ({
            id: e.id,
            name: e.name,
            slug: e.slug
         }))
      },
      price: {
         title: "Prices",
         options: [
            { id: "rp1", name: "Over $50", slug: "50-", min: 0, max: 50 },
            {
               id: "rp2",
               name: "$50 to $100",
               slug: "50-100",
               min: 50,
               max: 100
            },
            {
               id: "rp3",
               name: "$100 to $200",
               slug: "100-200",
               min: 100,
               max: 150
            },
            {
               id: "rp4",
               name: "$150 to $200",
               slug: "150-200",
               min: 150,
               max: 200
            },
            {
               id: "rp5",
               name: "$200 to $300",
               slug: "200-300",
               min: 200,
               max: 300
            },
            {
               id: "rp6",
               name: "$300 to $500",
               slug: "300-500",
               min: 300,
               max: 500
            },
            {
               id: "rp7",
               name: "$500 to $1000",
               slug: "500-1000",
               min: 500,
               max: 1000
            },
            { id: "rp8", name: "Under $1000", slug: "-1000", min: 1000, max: 0 }
         ]
      }
   };
};

export const getFilteredProducts = async (
   filter: any,
   firestore: Firestore = firestoreClient
): Promise<SerializedProduct[]> => {
   const query: any[] = [];
   const keys = Object.keys(filter);

   for (let i = 0; i < keys.length; i++) {
      const k = keys[i];
      switch (k) {
         case "category": {
            const categories = await fetchWithCustomQuery(
               collections.CATEGORIES,
               [where("slug", "in", filter[k])],
               firestore
            );
            query.push(
               where(
                  "category",
                  "in",
                  categories.map((c: any) =>
                     doc(firestore, collections.CATEGORIES, c.id)
                  )
               )
            );
            break;
         }
         case "brand": {
            const brands = await fetchWithCustomQuery(
               collections.BRANDS,
               [where("slug", "in", filter[k])],
               firestore
            );
            query.push(
               where(
                  "brand",
                  "in",
                  brands.map((b: any) =>
                     doc(firestore, collections.BRANDS, b.id)
                  )
               )
            );
            break;
         }
         case "price": {
            query.push(
               or(
                  ...filter[keys[i]].map((e: any) =>
                     and(
                        where("price", ">=", e.min),
                        where("price", "<=", e.max)
                     )
                  )
               )
            );
            break;
         }
      }
   }

   const products = (await fetchWithCustomQuery(
      collections.PRODUCTS,
      query,
      firestore
   )) as Product[];

   return await serializeProducts(products);
};

export const getNewArrivalProducts = async (
   firestore: Firestore = firestoreClient
): Promise<SerializedProduct[]> => {
   const products = (await fetchDocs(
      {
         collectionName: collections.NEW_ARRIVAL_PRODUCTS
      },
      firestore
   )) as FirestoreProduct[];
   return await serializeProducts(products);
};

export const getNewArrivalProductsSnapShot = (
   cb: (data: SerializedProduct[]) => void
) => {
   const unsub = getDocsSnapShot(
      {
         collectionName: collections.NEW_ARRIVAL_PRODUCTS
      },
      cb
   );
   return unsub;
};

export const getFlashSaleProducts = async (
   firestore: Firestore = firestoreClient
): Promise<SerializedProduct[]> => {
   const products = (await fetchDocs(
      {
         collectionName: collections.PRODUCTS,
         _where: ["on_flash_sale", "==", true]
      },
      firestore
   )) as FirestoreProduct[];
   return await serializeProducts(products);
};

export const getFlashSaleProductsSnapShot = (
   cb: (data: SerializedProduct[]) => void
) => {
   const unsub = getDocsSnapShot(
      {
         collectionName: collections.PRODUCTS,
         _where: ["on_flash_sale", "==", true]
      },
      cb
   );
   return unsub;
};

export const getOnSellProducts = async (
   firestore: Firestore = firestoreClient
): Promise<SerializedProduct[]> => {
   const products = (await fetchDocs(
      {
         collectionName: collections.PRODUCTS,
         _where: ["in_stock", ">", 0]
      },
      firestore
   )) as FirestoreProduct[];
   return await serializeProducts(products);
};

export const getOnSellProductsSnapShot = (
   cb: (data: SerializedProduct[]) => void
) => {
   const unsub = getDocsSnapShot(
      {
         collectionName: collections.PRODUCTS,
         _where: ["in_stock", ">", 0]
      },
      cb
   );
   return unsub;
};

export const getBrands = async (
   firestore: Firestore = firestoreClient
): Promise<Brand[]> => {
   return (await fetchDocs(
      {
         collectionName: collections.BRANDS
      },
      firestore
   )) as Brand[];
};

export const getBrandsSnapshot = (cb: (data: Brand[]) => void) => {
   const unsub = getDocsSnapShot(
      {
         collectionName: collections.BRANDS
      },
      cb
   );
   return unsub;
};
