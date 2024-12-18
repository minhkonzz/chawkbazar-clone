import { SelectedProduct } from "@/shared/types";

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
   cartItems: SelectedProduct[];
   shipFee: number;
   isPaid: boolean;
   cod: boolean;
};
