import {
   GoogleAuthProvider,
   signInWithPopup,
   signInWithEmailAndPassword,
   type User
} from "firebase/auth";

import { firebaseAuthClient } from "../configs/client";

export const signInWithEmail = async (
   email: string,
   password: string
): Promise<User> => {
   const { user } = await signInWithEmailAndPassword(firebaseAuthClient, email, password);
   return user;
};

export const signInWithGoogle = async (): Promise<User> => {
   const provider: GoogleAuthProvider = new GoogleAuthProvider();
   const { user } = await signInWithPopup(firebaseAuthClient, provider);
   return user;
};