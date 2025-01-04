"use client";

import { firebaseClientSecrets } from "./secrets";
import { 
  initializeApp, 
  getApps, 
  getFirestore, 
  getAuth, 
  setPersistence, 
  inMemoryPersistence 
} from "@/configs/imports-wrapper";

const clientApps = getApps();
const firebaseClientApp = clientApps.length === 0 ? initializeApp(firebaseClientSecrets) : clientApps[0];
const firebaseAuthClient = getAuth();
setPersistence(firebaseAuthClient, inMemoryPersistence);
const firestoreClient = getFirestore(firebaseClientApp);

export { firebaseAuthClient, firestoreClient };
export default firebaseClientApp;
