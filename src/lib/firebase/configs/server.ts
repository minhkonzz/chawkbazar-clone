import "server-only"

import { firebaseClientSecrets } from "./secrets";
import { initializeApp as initializeAdminApp, getApps, cert, type ServiceAccount } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { cookies } from "next/headers";
import { initializeServerApp } from "firebase/app";
import { type Firestore, getFirestore } from "firebase/firestore";
import type { UserRecord } from "firebase-admin/auth";
import { env } from "@/configs";

const serviceAccount = {
   projectId: env.FIREBASE_PROJECT_ID,
   client_email: env.FIREBASE_CLIENT_EMAIL,
   private_key: env.FIREBASE_PRIVATE_KEY
} as ServiceAccount;

const adminApps = getApps();
const firebaseAdminApp = adminApps.length === 0 ? initializeAdminApp({
   credential: cert(serviceAccount)
}) : adminApps[0];

export const firebaseAuthAdmin = getAuth(firebaseAdminApp);

export const useFirestoreServer = (): Firestore => {
   const firebaseServerApp = initializeServerApp(firebaseClientSecrets, {});
   return getFirestore(firebaseServerApp);
};

export const useAuthenticatedUser = async (): Promise<UserRecord> => {
   const _cookies = cookies(); // v14.x
   const sessionCookie = _cookies.get("session")?.value ?? "";
   const { uid } = await firebaseAuthAdmin.verifySessionCookie(sessionCookie, true);
   const user = await firebaseAuthAdmin.getUser(uid);
   return user;
};