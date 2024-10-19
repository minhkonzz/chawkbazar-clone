import { SelectedProduct } from "@/shared/types";

export type OrderSubmitData = {
   cod?: boolean,
   firstName?: string,
   lastName?: string,
   address?: string,
   phone?: string, 
   email?: string,
   city?: string,
   postCode?: string
};

export type CheckoutDetail = Omit<OrderSubmitData, "cod"> & {
   note: string,
   cartItems: SelectedProduct[],
   shipFee: number,
   payment: {
      type: string,
      isPaid: boolean
   }
};