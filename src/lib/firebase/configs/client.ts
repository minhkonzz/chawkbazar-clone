"use client";

import { initializeApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, setPersistence, inMemoryPersistence } from "firebase/auth";
import { getInstallations } from "firebase/installations";
import { firebaseClientSecrets } from "./secrets";

const clientApps = getApps();
const firebaseClientApp = clientApps.length === 0 ? initializeApp(firebaseClientSecrets) : clientApps[0];
const firebaseAuthClient = getAuth();
setPersistence(firebaseAuthClient, inMemoryPersistence);
const firestoreClient = getFirestore(firebaseClientApp);
const installations = getInstallations(firebaseClientApp);

export { firebaseAuthClient, firestoreClient, installations };
export default firebaseClientApp;
