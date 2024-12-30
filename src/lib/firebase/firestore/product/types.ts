import type { DocumentReference } from "firebase/firestore";
import type { ProductVariation } from "@/shared/types/entities";

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
   variations: ProductVariation[];
};
