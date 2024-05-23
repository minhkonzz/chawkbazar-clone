import { auth, firestoreRef, googleAuthProvider } from "../config";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";

export const listenToAuthState = (onSignIn, onLogout) => {
  onAuthStateChanged(auth, (currentUser) => {
    if (currentUser) {
      getDoc(doc(firestoreRef, "customers", currentUser.uid))
      .then((loggingCustomerDoc) => (
        loggingCustomerDoc.exists() &&
        onSignIn({
          currentUserInstance: currentUser, 
          currentUserRefs: { ...loggingCustomerDoc.data() }
        })
      ))
      .catch((err) => console.error(err.message)); 
    }
    else {
      localStorage.removeItem("user_pwd");
      onLogout();
    }
  }); 
}

export const signIn = async(_email, password) => {
  const userCredential = await signInWithEmailAndPassword(auth, _email, password);
  return userCredential.user.uid; 
}; 

export const signInWithGoogle = async() => {
  const result = await signInWithPopup(auth, googleAuthProvider); 
  return result.user;
}

export const signUp = async(_email, password, name) => {
  const userCredential = await createUserWithEmailAndPassword(auth, _email, password);
  const customerUID = userCredential.user.uid; 
  const nameParts = name.split(" ").filter((namePart) => namePart !== ""); 
  await setDoc(
    doc(firestoreRef, "customers", customerUID), {
      firstName: nameParts[0],
      lastName: nameParts[nameParts.length - 1],
      gender: "",
      phone: ""
    }
  );
}; 