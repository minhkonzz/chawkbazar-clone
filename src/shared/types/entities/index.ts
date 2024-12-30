import type { SelectedProduct } from "..";

export type Brand = {
   id: string;
   name: string;
   slug: string;
   logo: string;
   image: string;
};

export type Category = {
   id: string;
   name: string;
   slug: string;
};

export type ProductVariation = {
   stock: number,
   size: string;
   color: {
      name: string
      hexCode: string
   }
};

export type User = {
   uid: string;
   email?: string;
   emailVerified: boolean;
   displayName?: string;
   phoneNumber?: string;
   photoURL?: string;
   customClaims?: {
      [key: string]: any;
   }
};

export type Product = {
   id: string;
   brand: Brand;
   category: Category;
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

export type Order = {
   id: string;
   customer: {
      id: string;
      email: string;
      firstName: string;
      lastName: string;
      phone: string;
   };
   payment: {
      isPaid: boolean;
      type: string;
   };
   products: SelectedProduct[];
   city: string;
   shipFee: number;
   postCode: string;
   address: string;
   date: string;
   state: string;
   note: string;
};
