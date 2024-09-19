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
   meta: string,
   attribute: ProductAttribute
};

export type Product = {
   id: string,
   brand: Brand,
   category: Category,
   name: string,
   description: string,
   image: unknown,
   price: number,
   salePrice: number,
   variations: ProductVariation[],
   qty: number,
   selectedColor: Omit<ProductVariation, "attribute">,
   selectedSize: Omit<ProductVariation, "attribute" | "meta">
};

export type Order = {
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
   products: Product,
   city: string,
   shipFee: number,
   postCode: string,
   address: string,
   date: string,
   state: string,
   total: number,
   totalItems: number,
   note: string
};