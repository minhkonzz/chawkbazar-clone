import "server-only";

import { firebaseClientSecrets } from "./secrets";
import { getAuth, type UserRecord } from "firebase-admin/auth";
import { cookies } from "next/headers";
import { type Firestore, getFirestore, initializeServerApp } from "@/configs/imports-wrapper";
import { env } from "@/configs";

import {
   initializeApp as initializeAdminApp,
   getApps,
   cert,
   type ServiceAccount
 } from "firebase-admin/app";

const serviceAccount = {
  projectId: env.FIREBASE_PROJECT_ID,
  client_email: env.FIREBASE_CLIENT_EMAIL,
  private_key: env.FIREBASE_PRIVATE_KEY
} as ServiceAccount;

const adminApps = getApps();
const firebaseAdminApp =
  adminApps.length === 0
    ? initializeAdminApp({
        credential: cert(serviceAccount)
      })
    : adminApps[0];

export const firebaseAuthAdmin = getAuth(firebaseAdminApp);

export const useFirestoreServer = (): Firestore => {
  const firebaseServerApp = initializeServerApp(firebaseClientSecrets, {});
  return getFirestore(firebaseServerApp);
};

export const useAuthenticatedUser = async(): Promise<UserRecord | null> => {
  const _cookies = cookies(); // v14.x
  const sessionCookie = _cookies.get("session")?.value ?? "";
  if (!sessionCookie) return null; 
  const { uid } = await firebaseAuthAdmin.verifySessionCookie(
    sessionCookie,
    true
  );
  const user = await firebaseAuthAdmin.getUser(uid);
  return user;
};
