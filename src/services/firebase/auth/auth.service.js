import { auth, firestoreRef } from "../../../configs/firebase.config";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";

export const listenToAuthState = (onSignIn, onLogout) => {
    onAuthStateChanged(auth, (currentUser) => (
        currentUser ? onSignIn(currentUser) : onLogout()
    )); 
}

export const signIn = async(_email, password) => {
    const userCredential = await signInWithEmailAndPassword(auth, _email, password);
    const { uid: customerUID } = userCredential.user;
    const loggingCustomerDoc = await getDoc(doc(firestoreRef, "customers", customerUID)); 
    return loggingCustomerDoc.exists() && { ...loggingCustomerDoc.data() }; 
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