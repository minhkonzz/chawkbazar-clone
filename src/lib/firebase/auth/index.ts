import { 
   createUserWithEmailAndPassword,
   GoogleAuthProvider,
   signInWithPopup,
   signInWithEmailAndPassword,
   User
} from "firebase/auth"; 

import { hash as hashPassword } from "@/shared/helpers/hash";
import { upsertDoc } from "../firestore";
import { auth } from "../client";

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