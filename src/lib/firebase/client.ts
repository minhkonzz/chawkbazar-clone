"use client";

import { initializeApp, getApps } from "firebase/app";
import firebaseConfig from "./config";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const app =
   getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
export const auth = getAuth(app);
export const firestore = getFirestore(app);

export default app;
