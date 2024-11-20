"use client";

import { signInWithGoogle } from "@/lib/firebase/auth";
import { useToast } from "@/context";
import Button from "@/shared/components/button";
import styles from "@/components/auth/styles.module.css";

export default function SocialAuth() {
   const toast = useToast()!;

   const onGoogleLogin = async () => {
      const user = await signInWithGoogle();
      toast(
         user ? "success" : "error",
         user ? "You logged in with Google" : "Login failed with Google"
      );
   };
   
   const btnClass = `${styles.btn} w-100pc`

   return (
      <Button className={btnClass} onClick={onGoogleLogin}>
         Login with Google
      </Button>
   );
}
