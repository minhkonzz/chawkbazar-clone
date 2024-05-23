import { collection, query, where, getDocs, doc, getDoc, addDoc, setDoc } from "firebase/firestore";
import { updatePassword, updateProfile, updateEmail } from "firebase/auth";
import { firestoreRef } from "../config";

export const placeOrder = async(checkoutDetail, customerId) => {
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

  const newOrder = await addDoc(collection(firestoreRef, "orders"), {
    customerId: customerId ? customerId : "None", 
    customerRefs: {
      firstName, 
      lastName, 
      address, 
      phone, 
      email
    },
    date: new Date().toJSON().slice(0, 10).replace(/-/g,'/'), 
    state: "waiting", 
    products: cartItems, 
    city, 
    postCode,
    shipFee, 
    payment, 
    note
  });
  return newOrder.id; 
}

export const getOrdersOfCustomer = async(customerId) => {
  const q = query(collection(firestoreRef, "orders"), where("customerId", "==", customerId)); 
  const orderSnapShot = await getDocs(q);
  let allOrders = []; 
  orderSnapShot.forEach((orderDoc) => {
    const { products, shipFee, state, date, payment, note } = { ...orderDoc.data() };
    let orderSubtotal = 0; 
    let orderTotalQuantity = 0; 
    products.forEach((product) => {
      const { sale_price, price, qty } = product; 
      orderSubtotal += (sale_price || price) * qty; 
      orderTotalQuantity += qty; 
    })
    const orderTotalPay = orderSubtotal + shipFee;
    allOrders = [ ...allOrders, { 
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

export const getOrderOfCustomer = async(orderId) => {
  const orderDoc = await getDoc(doc(firestoreRef, "orders", orderId)); 
  if (orderDoc.exists()) {
    const { products, shipFee, paymentMethod, note } = { ...orderDoc.data() };
    const productsList = products.map((product) => ({
      productName: product.name, 
      colorSelected: product.colorSelected.value, 
      sizeSelected: product.sizeSelected.value, 
      quantity: product.qty
    }));
    const orderSubtotal = products.reduce((prevProduct, currProduct) => {
      return ((prevProduct.sale_price || prevProduct.price) * prevProduct.qty) + ((currProduct.sale_price || currProduct.price) * currProduct.qty); 
    }, 0); 
    const orderTotal = orderSubtotal + shipFee; 
    return {
      productsList, 
      shipFee, 
      paymentMethod, 
      note, 
      orderSubtotal, 
      orderTotal
    }
  }
  return null; 
}

export const updateCustomerPassword = async(currentCustomer, newPassword) => {
  await updatePassword(currentCustomer, newPassword); 
}

export const updateCustomerAccountDetail = async(currentCustomer, newProfile) => {
  const { firstName, lastName, displayName, phone, email } = newProfile; 
  await updateProfile(currentCustomer, { displayName, photoURL: "" }); 
  await updateEmail(currentCustomer, email); 
  await setDoc(
    doc(firestoreRef, "customers", currentCustomer.uid),
    { firstName, lastName, phone }, 
    { merge: true } 
  );
}