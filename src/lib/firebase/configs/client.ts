"use client";

import { initializeApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, setPersistence, inMemoryPersistence } from "firebase/auth";
import { firebaseClientSecrets } from "./secrets";

const clientApps = getApps();
const firebaseClientApp = clientApps.length === 0 ? initializeApp(firebaseClientSecrets) : clientApps[0];
const firebaseAuthClient = getAuth();
setPersistence(firebaseAuthClient, inMemoryPersistence);
const firestoreClient = getFirestore(firebaseClientApp);

export { firebaseAuthClient, firestoreClient };
export default firebaseClientApp;
