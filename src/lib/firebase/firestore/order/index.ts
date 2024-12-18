import { firestoreClient } from "../../configs/client";
import { fetchDoc, fetchDocs, addNewDoc } from "../";
import type { Firestore } from "firebase/firestore";
import type { Order } from "@/shared/types/entities";
import type { SelectedProduct } from "@/shared/types";
import type { OrderListItem, OrderDetailClaims } from "@/shared/types";
import type { CheckoutDetail } from "@/components/checkout/form/types";
import collections from "../collections";

export const createOrder = async (
   checkoutDetail: CheckoutDetail,
   userId: string,
   firestore: Firestore = firestoreClient
): Promise<string> => {
   const {
      firstName,
      lastName,
      address,
      phone,
      email,
      city,
      postCode,
      cartItems,
      shipFee,
      isPaid,
      cod
   } = checkoutDetail;

   const { id } = await addNewDoc(
      collections.ORDERS,
      {
         customer: {
            id: userId,
            firstName,
            lastName,
            phone,
            email
         },
         address,
         date: new Date().toJSON().slice(0, 10).replace(/-/g, "/"),
         state: "waiting",
         products: cartItems,
         city,
         postCode,
         shipFee,
         isPaid,
         cod
      },
      firestore
   );

   return id;
};

export const getUserOrders = async (
   userId: string,
   firestore: Firestore = firestoreClient
): Promise<OrderListItem[]> => {
   const orderDocs = (await fetchDocs(
      {
         collectionName: collections.ORDERS,
         _where: ["customerId", "==", userId]
      },
      firestore
   )) as Order[];

   let allOrders: OrderListItem[] = [];
   orderDocs.forEach((orderDoc: Order) => {
      const { products, shipFee, state, date } = orderDoc;
      const { subtotal, totalItems } = products.reduce(
         (
            acc: { subtotal: number; totalItems: number },
            cur: SelectedProduct
         ) => {
            const { lastPrice, qty } = cur;
            acc.subtotal += lastPrice * qty;
            acc.totalItems += qty;
            return acc;
         },
         { subtotal: 0, totalItems: 0 }
      );

      const total = subtotal + shipFee;
      allOrders = [
         ...allOrders,
         {
            date,
            state,
            total,
            totalItems
         }
      ];
   });

   return allOrders;
};

export const getOrder = async (
   id: string,
   firestore: Firestore = firestoreClient
): Promise<OrderDetailClaims | null> => {
   const order = (await fetchDoc(collections.ORDERS, id, firestore)) as Order;
   if (!order) return null;

   const { date, products, shipFee, payment, note, customer } = order;

   const subtotal = products.reduce((acc: number, cur: SelectedProduct) => {
      return acc + cur.lastPrice * cur.qty;
   }, 0);

   const total = subtotal + shipFee;

   return {
      id,
      date,
      email: customer.email,
      products,
      shipFee,
      paymentMethod: payment.type,
      note,
      subtotal,
      total
   };
};
