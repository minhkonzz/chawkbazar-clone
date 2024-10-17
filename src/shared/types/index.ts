import { FieldPath, QueryDocumentSnapshot, WhereFilterOp } from "firebase/firestore";

import { 
   Order, 
   SelectedProduct,
   ProductVariation
} from "./entities";

export type RadioGroupOption = {
   title: string,
   value: string
};

export type FirestoreQueryDocumentsConfig = {
   collectionName: string,
   _startAfter?: QueryDocumentSnapshot[],
   _limit?: number,
   _where?: [string | FieldPath, WhereFilterOp, unknown]
};

export type SignInRequestBody = {
   email: string,
   password: string
};

export type SignUpRequestBody = {
   name: string,
   email: string,
   password: string
};

export type RefreshTokensBody = {
   refreshToken: string
};

export type CurrentUser = {
   uuid: string,
   displayName: string,
   email: string,
   emailVerified: boolean,
   phoneNumber: string,
   photoURL: string,
};

export type OrderListItem = Pick<Order, "date" | "state"> & { total: number, totalItems: number };
export type OrderDetailClaims = Pick<Order, "id" | "date" | "products" | "shipFee" | "note"> & {
   email: string,
   paymentMethod: string
   subtotal: number,
   total: number
};

export type SelectedProductVariation = {
   selected: ProductVariation,
   idx: number
};

export type Product = Omit<SelectedProduct, "selectedColor" | "selectedSize" | "qty">;

export type ProductAttributeOption = {
   id: string,
   name: string,
   slug: string,
} & Partial<Record<string, any>>;

export type ProductAttributes = {
   [key: string]: {
      title: string,
      options: ProductAttributeOption[]
   }
};

export type UserMetadata = {
   firstName: string,
   lastName: string,
   phone?: string,
   gender?: string,
   password: string
};

export type TextFieldMetadata = {
   title: string,
   value?: string,
   pattern: RegExp,
   errorIdentifier: string,
   errorMessage: string
};



