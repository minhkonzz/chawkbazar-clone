import { 
   createUserWithEmailAndPassword,
   GoogleAuthProvider,
   signInWithPopup,
   signInWithEmailAndPassword,
   User,
   updateProfile
} from "firebase/auth"; 

import { upsertDoc } from "../firestore";
import { auth } from "../client";
import collections from "../firestore/collections";

export const signInWithEmail = async (
   email: string,
   password: string
): Promise<User> => {
   const { user } = await signInWithEmailAndPassword(auth, email, password);
   return user;
};

export const signInWithGoogle = async (): Promise<User> => {
   const provider: GoogleAuthProvider = new GoogleAuthProvider(); 
   const { user } = await signInWithPopup(auth, provider); 
   return user;
};

export const signUp = async (
   email: string,
   password: string,
   hashedPassword: string,
   name: string
): Promise<User> => {
   const { user } = await createUserWithEmailAndPassword(auth, email, password);
   await updateProfile(user, { displayName: name });
   const nameParts = name.split(" ").filter((namePart: string) => namePart); 
   await upsertDoc(collections.CUSTOMERS, user.uid, {
      firstName: nameParts[0],
      lastName: nameParts[nameParts.length - 1],
      gender: "",
      phone: "",
      password: hashedPassword
   });
   return user;
};