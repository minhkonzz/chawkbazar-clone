"use server" 

import { 
   compare as validateCurrentPassword,
   hash as hashPassword 
} from "@/shared/helpers/hash";

import { User, createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { upsertDoc } from "../firestore";
import getAuthenticatedAppForUser from "../server";

export async function checkCurrentPassword(
   providedPassword: string,
   hashedPassword: string
): Promise<boolean> {
   return await validateCurrentPassword(providedPassword, hashedPassword); 
};

export const signUp = async (
   email: string,
   password: string,
   name: string
): Promise<User> => {
   const { firebaseServerApp } = await getAuthenticatedAppForUser();
   const { user } = await createUserWithEmailAndPassword(getAuth(firebaseServerApp), email, password);
   const nameParts = name.split(" ").filter((namePart: string) => namePart); 
   const hashedPassword = await hashPassword(password);
   await upsertDoc("customers", user.uid, {
      firstName: nameParts[0],
      lastName: nameParts[nameParts.length - 1],
      gender: "",
      phone: "",
      password: hashedPassword
   });
   return user;
};