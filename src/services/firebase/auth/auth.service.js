import { auth, firestoreRef, googleAuthProvider } from "../../../configs/firebase.config";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";

export const listenToAuthState = (onSignIn, onLogout) => {
  onAuthStateChanged(auth, (currentUser) => {
    // console.log("call AuthStateChange");
    if (currentUser) {
    //   console.log("Has current user"); 
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
    // console.log("None current user"); 
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