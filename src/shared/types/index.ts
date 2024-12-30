import type {
   FieldPath,
   QueryDocumentSnapshot,
   WhereFilterOp
} from "firebase/firestore";

import type { User } from "./entities";
import type { Order, Product } from "./entities";

export type RadioGroupOption = {
   title: string;
   value: string;
};

export type FirestoreQueryDocumentsConfig = {
   collectionName: string;
   _startAfter?: QueryDocumentSnapshot[];
   _limit?: number;
   _where?: [string | FieldPath, WhereFilterOp, unknown];
};

export type SignInRequestBody = {
   email: string;
   password: string;
};

export type SignInResponse = {
   user: User;
}

export type SignUpRequestBody = {
   name: string;
   email: string;
   password: string;
};

export type RefreshTokensBody = {
   refreshToken: string;
};

export type OrderListItem = Pick<Order, "date" | "state"> & {
   total: number;
   totalItems: number;
};

export type OrderDetailClaims = Pick<
   Order,
   "id" | "date" | "products" | "shipFee" | "note"
> & {
   email: string;
   paymentMethod: string;
   subtotal: number;
   total: number;
};

export type SelectedProductVariation = {
   size: string;
   color: {
      name: string;
      hexCode: string;
   } | null
} 

export type SelectedProduct = Pick<Product, "id" | "name" | "image"> & {
   lastPrice: number;
   qty: number;
   selectedVariation: SelectedProductVariation
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
