import type { CartItem } from "..";

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
  stock: number;
  size: string;
  color: {
    name: string;
    hex_code: string;
  };
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
  };
};

export type Product = {
  id: string;
  brand: Brand;
  category: Category;
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
  created_at: number;
  updated_at: number;
  sale?: {
    id: string;
    lastPrice: number;
  };
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
  products: CartItem[];
  city: string;
  shipFee: number;
  postCode: string;
  address: string;
  date: string;
  state: string;
  note: string;
};

export type FlashSale = {
  id: string;
  product: Product;
  start: number;
  end: number;
  quantity: number;
  discount_percent: number;
};
