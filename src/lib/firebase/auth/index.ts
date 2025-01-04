import {
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  type User
} from "@/configs/imports-wrapper";

import { firebaseAuthClient } from "../configs/client";

export const signInWithEmail = async (
  email: string,
  password: string
): Promise<User | null> => {
  try {
    const { user } = await signInWithEmailAndPassword(
      firebaseAuthClient,
      email,
      password
    );
    return user;
  } catch (err) {
    return null;
  }
};

export const signInWithGoogle = async (): Promise<User> => {
  const provider: GoogleAuthProvider = new GoogleAuthProvider();
  const { user } = await signInWithPopup(firebaseAuthClient, provider);
  return user;
};
