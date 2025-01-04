import { firestoreClient } from "../../configs/client";
import { type DocumentReference, type Firestore, where } from "@/configs/imports-wrapper";
import type { Order, ProductVariation } from "@/types/entities";
import type { CartItem } from "@/types";
import type { OrderListItem, OrderDetailClaims } from "@/types";
import type { CheckoutDetail } from "@/types";
import collections from "../collections";

import {
  createDocRef,
  fetchDoc,
  fetchDocs,
  performTransaction,
  getDocRef
} from "../";

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

  return performTransaction(async transaction => {
    const newOrderRef = createDocRef(collections.ORDERS, firestore);

    const productPromises = cartItems.map(item =>
      transaction.get(getDocRef(collections.PRODUCTS, item.id, firestore))
    );

    const salePromises = cartItems
      .filter(item => item.saleId)
      .map(item =>
        transaction.get(
          getDocRef(collections.FLASH_SALES, item.saleId!, firestore)
        )
      );

    const [productDocs, saleDocs] = await Promise.all([
      Promise.all(productPromises),
      Promise.all(salePromises)
    ]);

    const productMap = new Map(productDocs.map(doc => [doc.id, doc]));
    const saleMap = new Map(saleDocs.map(doc => [doc.id, doc]));

    const updates: { ref: DocumentReference; data: object }[] = [];

    for (const item of cartItems) {
      const productDoc = productMap.get(item.id);
      if (!productDoc?.exists) {
        throw new Error(`Product ${item.id} not found`);
      }

      const productData = productDoc.data()!;
      const variations = productData.variations;
      const selectedVariationIndex = variations.findIndex(
        (variation: ProductVariation) =>
          variation.size === item.selectedVariation.size &&
          variation.color.hex_code === item.selectedVariation.color?.hex_code
      );

      if (selectedVariationIndex === -1) {
        throw new Error(`Invalid product variation for product ${item.id}`);
      }

      if (variations[selectedVariationIndex].stock < item.qty) {
        throw new Error(`Not enough stock for product ${item.id}`);
      }

      variations[selectedVariationIndex] = {
        ...variations[selectedVariationIndex],
        stock: variations[selectedVariationIndex].stock - item.qty
      };

      updates.push({
        ref: productDoc.ref,
        data: { variations }
      });

      if (item.saleId) {
        const saleDoc = saleMap.get(item.saleId);
        if (!saleDoc?.exists) {
          throw new Error(`Flash sale ${item.saleId} not found`);
        }

        const saleData = saleDoc.data()!;
        if (saleData.quantity < item.qty) {
          throw new Error(`Not enough stock for flash sale ${item.saleId}`);
        }

        updates.push({
          ref: saleDoc.ref,
          data: { quantity: saleData.quantity - item.qty }
        });
      }
    }

    updates.forEach(update => transaction.update(update.ref, update.data));

    transaction.set(newOrderRef, {
      customer: { id: userId, firstName, lastName, phone, email },
      address,
      date: new Date().toJSON().slice(0, 10).replace(/-/g, "/"),
      state: "waiting",
      products: cartItems,
      city,
      postCode,
      shipFee,
      isPaid,
      cod
    });

    return newOrderRef.id;
  }, firestore);
};

export const getUserOrders = async (
  userId: string,
  firestore: Firestore = firestoreClient
): Promise<OrderListItem[]> => {
  const orderDocs = (await fetchDocs({
    collectionName: collections.ORDERS,
    _filterConstraint: [where("customer.id", "==", userId)]
  }, firestore)) as Order[];

  let allOrders: OrderListItem[] = [];
  orderDocs.forEach((orderDoc: Order) => {
    const { products, shipFee, state, date } = orderDoc;
    const { subtotal, totalItems } = products.reduce(
      (acc: { subtotal: number; totalItems: number }, cur: CartItem) => {
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
        id: orderDoc.id,
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
  
  const { date, products, shipFee, note, customer } = order;
  const subtotal = products.reduce(
    (acc: number, cur: CartItem) => acc + cur.lastPrice * cur.qty,
    0
  );

  const total = subtotal + shipFee;

  return {
    id,
    date,
    email: customer.email,
    products,
    shipFee,
    note,
    subtotal,
    total
  };
};
