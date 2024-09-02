"use client";

import { signInWithGoogle } from "@/lib/firebase/auth";
import { useToast } from "@/context";
import styles from "../styles.module.css";

export default function SocialAuth() {

   const toast = useToast()!;

   const onGoogleLogin = async () => {
      const user = await signInWithGoogle();
      toast(
         user ? "success" : "error",
         user ? "You logged in with Google" : "Login failed with Google"
      );
   }

   const onFacebookLogin = () => {}   

   return (
      <>
         <button className={`${styles.btn} w-100pc`} onClick={onGoogleLogin}>Login with Google</button>
         <button className={`${styles.btn} w-100pc`} onClick={onFacebookLogin}>Login with Facebook</button>
      </>      
   );
};
