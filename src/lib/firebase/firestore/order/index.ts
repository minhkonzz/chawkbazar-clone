import { Firestore } from "firebase/firestore";
import { firestore as firestoreClient } from "../../client";
import { fetchDoc, fetchDocs, addNewDoc } from "../";
import { Order } from "@/shared/types/entities";

export const createOrder = async (
   checkoutDetail: any,
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
      payment,
      note
   } = checkoutDetail;

   const { id } = await addNewDoc("orders", {
      customerId: userId || "None",
      customerRefs: {
         firstName,
         lastName,
         address,
         phone,
         email
      },
      date: new Date().toJSON().slice(0, 10).replace(/-/g, '/'),
      state: "waiting",
      products: cartItems,
      city,
      postCode,
      shipFee,
      payment,
      note
   }, firestore);

   return id;
};

export const getUserOrders = async (
   userId: string,
   firestore: Firestore = firestoreClient
): Promise<Pick<Order, "date" | "state" | "total" | "totalItems">[]> => {
   const orderDocs = await fetchDocs({
      collectionName: "orders",
      _where: ["customerId", "==", userId]
   }, firestore);

   let allOrders: any = [];
   orderDocs.forEach((orderDoc: any) => {
      const { products, shipFee, state, date } = orderDoc;
      const { subtotal, totalItems } = products.reduce((acc: { subtotal: number, totalItems: number }, cur: any) => {
         const { sale_price, price, qty } = cur;
         acc.subtotal += (sale_price || price) * qty;
         acc.totalItems += qty;
         return acc;
      }, { subtotal: 0, totalItems: 0 });

      const total = subtotal + shipFee;
      allOrders = [...allOrders, {
         date,
         state,
         total,
         totalItems,
      }];
   });

   return allOrders;
};

export const getOrder = async (
   id: string,
   firestore: Firestore = firestoreClient
) => {
   const order = await fetchDoc("orders", id, firestore);
   if (!order) return null;

   const {
      date,
      products,
      shipFee,
      payment,
      note,
      customerRefs
   } = order;

   const productsList = products.map((product: any) => ({
      productName: product.name,
      colorSelected: product.colorSelected.value,
      sizeSelected: product.sizeSelected.value,
      quantity: product.qty
   }));

   const orderSubtotal = products.reduce((prevProduct: any, currProduct: any) => {
      return ((prevProduct.sale_price || prevProduct.price) * prevProduct.qty) + ((currProduct.sale_price || currProduct.price) * currProduct.qty);
   }, 0);

   const orderTotal = orderSubtotal + shipFee;

   return {
      id,
      date,
      email: customerRefs.email,
      productsList,
      shipFee,
      paymentMethod: payment.type,
      note,
      orderSubtotal,
      orderTotal
   };
}