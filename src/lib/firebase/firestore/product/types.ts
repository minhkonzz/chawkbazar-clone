import type { DocumentReference } from "firebase/firestore";
import { ProductVariation } from "@/shared/types/entities";

export type Product = {
   id: string;
   brand: DocumentReference;
   category: DocumentReference;
   name: string;
   description: string;
   image: {
      p?: string;
      pm?: string;
      pmd?: string;
      pxs?: string;
   };
   price: number;
   sale_price?: number;
   in_stock: number;
   on_flash_sale: boolean;
   variations: ProductVariation[];
};
