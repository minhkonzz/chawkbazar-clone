import { collection, query, where, getDocs, limit, startAfter, doc, getDoc, addDoc } from "firebase/firestore";
import { updatePassword } from "firebase/auth"
import { firestoreRef } from "../../../configs/firebase.config";
import { getAllRecords } from "../common";

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
        paymentMethod, 
        note 
    } = checkoutDetail; 
    const productsOrder = cartItems.map((orderItem) => ({
        productId: orderItem.id, 
        size: orderItem.sizeSelected, 
        color: orderItem.colorSelected, 
        quantity: orderItem.qty  
    }));
    const newOrder = await addDoc(collection(firestoreRef, "orders"), {
        customer: {
            id: customerId ? customerId : "None", 
            firstName, 
            lastName, 
            address, 
            phone, 
            email
        }, 
        date: new Date().toJSON().slice(0,10).replace(/-/g,'/'), 
        state: "waiting", 
        products: productsOrder, 
        city, 
        postCode,
        shipFee, 
        paymentMethod, 
        note
    });
    return newOrder.id; 
}

export const getOrdersOfCustomer = async(customerId) => {
    const q = query(collection(firestoreRef, "orders"), where("customer/id", "==", customerId)); 
    const orderSnapShot = await getDocs(q); 
    orderSnapShot.forEach((doc) => {
        console.log(doc.id, doc.data()); 
    })
}

export const updateCustomerPassword = async(currentUser) => {
    await updatePassword(currentUser, "abcde");    
}