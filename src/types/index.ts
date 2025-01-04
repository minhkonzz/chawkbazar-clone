import type {
  QueryFilterConstraint,
  DocumentSnapshot,
  OrderByDirection
} from "@/configs/imports-wrapper";

import type { User } from "./entities";
import type { Order, Product } from "./entities";

export type RadioGroupOption = {
  title: string;
  value: string;
};

export type FirestoreQueryDocumentsConfig = {
  collectionName: string;
  _startAfter?: DocumentSnapshot;
  _limit?: number;
  _orderBy?: [string, OrderByDirection];
  _filterConstraint?: QueryFilterConstraint[]
};

export type SignInRequestBody = {
  email: string;
  password: string;
};

export type SignInResponse = {
  user: User;
};

export type SignUpRequestBody = {
  name: string;
  email: string;
  password: string;
};

export type RefreshTokensBody = {
  refreshToken: string;
};

export type OrderListItem = Pick<Order, "id" | "date" | "state"> & {
  total: number;
  totalItems: number;
};

export type OrderDetailClaims = Pick<
  Order,
  "id" | "date" | "products" | "shipFee" | "note"
> & {
  email: string;
  subtotal: number;
  total: number;
};

export type Color = {
  name: string;
  hex_code: string;
}

export type SelectedVariation = {
  size: string;
  color: Color;
  stock: number
};

export type CartItem = Pick<Product, "id" | "name" | "images"> & {
  lastPrice: number;
  qty: number;
  selectedVariation: SelectedVariation;
  saleId?: string;
};

export type ProductAttributeOption = {
  id: string;
  name: string;
  slug: string;
} & Partial<Record<string, any>>;

export type ProductAttributes = {
  [key: string]: {
    title: string;
    options: ProductAttributeOption[];
  };
};

export type TextFieldMetadata = {
  title: string;
  value?: string;
  pattern: RegExp;
  errorIdentifier: string;
  errorMessage: string;
};

export type OrderSubmitData = {
  firstName?: string;
  lastName?: string;
  address?: string;
  phone?: string;
  email?: string;
  city?: string;
  postCode?: string;
};

export type CheckoutDetail = OrderSubmitData & {
  cartItems: CartItem[];
  shipFee: number;
  isPaid: boolean;
  cod: boolean;
};

export type FetchConfig = Partial<{
  fromId: string;
  _limit: number;
}>
