import { Firestore } from "firebase/firestore";
import { firestore as firestoreClient } from "../../client";
import { fetchDoc, fetchDocs, addNewDoc } from "../";

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
) => {
   const orderDocs = await fetchDocs({
      collectionName: "orders",
      _where: ["customerId", "==", userId]
   }, firestore);

   let allOrders: any = [];
   orderDocs.forEach((orderDoc: any) => {
      const { products, shipFee, state, date, payment, note } = orderDoc.data();
      let orderSubtotal = 0;
      let orderTotalQuantity = 0;
      products.forEach((product: any) => {
         const { sale_price, price, qty } = product;
         orderSubtotal += (sale_price || price) * qty;
         orderTotalQuantity += qty;
      })
      const orderTotalPay = orderSubtotal + shipFee;
      allOrders = [...allOrders, {
         orderId: orderDoc.id,
         orderDate: date,
         orderState: state,
         orderProducts: products,
         orderPaymentType: payment.type,
         orderSubtotal: orderSubtotal,
         orderFee: shipFee,
         orderTotalPay,
         orderTotalQuantity,
         orderNote: note
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