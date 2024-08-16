import "server-only" // code below just can be used on server

import { headers } from "next/headers";
import { initializeServerApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import firebaseConfig from "./config";

export default async function getAuthenticatedAppForUser() {
   const authIdToken = headers().get("Authorization")?.split("Bearer ")[1];
   
   const firebaseServerApp = initializeServerApp(
      firebaseConfig,
      authIdToken ? { authIdToken } : {}
    );
  
    const auth = getAuth(firebaseServerApp);
    await auth.authStateReady();
  
    return { firebaseServerApp, currentUser: auth.currentUser };
}


