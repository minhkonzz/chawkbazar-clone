import type { DocumentReference, Timestamp } from "@/configs/imports-wrapper";
import type { ProductVariation } from "@/types/entities";

export type Product = {
  id: string;
  brand: DocumentReference;
  category: DocumentReference;
  name: string;
  description: string;
  images: {
    p?: string;
    pm?: string;
    pmd?: string;
    pxs?: string;
  };
  price: number;
  variations: ProductVariation[];
  created_at: Timestamp;
  updated_at: Timestamp;
};

export type SaledProduct = {
  id: string;
  product: DocumentReference;
  discount_percent: number;
  start: Timestamp;
  end: Timestamp;
  quantity: number;
};
