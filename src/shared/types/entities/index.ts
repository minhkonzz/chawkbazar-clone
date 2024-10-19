import { SelectedProduct } from "..";

export type Brand = {
   id: string,
   name: string,
   slug: string,
   logo: string,
   image: string
};

export type Category = {
   id: string,
   name: string,
   slug: string
};

export type ProductAttribute = {
   id: number,
   slug: string
};

export type ProductVariation = {
   id: number,
   value: string,
   meta?: string,
   attribute: ProductAttribute
};

export type Product = {
   id: string,
   brand: Brand,
   category: Category,
   name: string,
   description: string,
   on_flash_sale: boolean,
   image: {
      p?: string,
      pm?: string,
      pmd?: string,
      pxs?: string
   },
   price: number,
   sale_price?: number,
   in_stock: number,
   variations: ProductVariation[]
};

export type Order = {
   id: string,
   customer: {
      id: string,
      email: string,
      firstName: string,
      lastName: string,
      phone: string, 
   },
   payment: {
      isPaid: boolean,
      type: string
   },
   products: SelectedProduct[],
   city: string,
   shipFee: number,
   postCode: string,
   address: string,
   date: string,
   state: string,
   note: string
};