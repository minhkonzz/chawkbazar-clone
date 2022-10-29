import { auth, firestoreRef } from "../../configs/firebase.config";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore"

export const signIn = async(_email, password) => {
    const userCredential = await signInWithEmailAndPassword(auth, _email, password);
    const { uid: customerUID, email, phoneNumber: phone, displayName } = userCredential.user;
    const loggingCustomerDoc = await getDoc(doc(firestoreRef, "customers", customerUID)); 
    if (loggingCustomerDoc.exists()) {
        const currentUser = {
            ...loggingCustomerDoc.data(),
            uid: customerUID, 
            displayName, 
            phone, 
            email
        }
        return currentUser; 
    }
    return null;
}; 

export const signUp = async(_email, password) => {
    const userCredential = await createUserWithEmailAndPassword(auth, _email, password);
    const customerUID = userCredential.user.uid; 
    await setDoc(
        doc(firestoreRef, "customers", customerUID),
        {
            firstName: "",
            lastName: "",
            gender: ""
        }
    );
}; 

export const getCurrentUser = () => {
    return auth.currentUser; 
}