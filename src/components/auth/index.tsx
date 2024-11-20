"use client"

import { useState } from "react";
import styles from "./styles.module.css";
import Image from "next/image";
import SocialAuth from "../@modals/auth/social";
import LocalAuth from "../@modals/auth/local";

export default function Auth() {
   const [isLogin, setIsLogin] = useState<boolean>(true);
   return (
      <>
         <header className="text-center">
            <Image alt="shop-logo" src="/logo.webp" width={95} height={30} />
            <p className={styles.title}>
               {(isLogin && "Login with your email & password") || (
                  <>
                     By signing up, you agree to our
                     <a className={styles.titleLink} href="#">
                        Terms
                     </a>{" "}
                     &
                     <a className={styles.titleLink} href="#">
                        Privacy
                     </a>
                  </>
               )}
            </p>
         </header>
         <div className={`${styles.form} d-flex fd-col`}>
            <LocalAuth isLogin={isLogin} />
         </div>
         <div
            className={`${styles.lineWrapper} posrel d-flex fd-col at-center jc-center`}>
            <hr className={`${styles.line} w-100pc`} />
            <span className={`${styles.lineText} posab bg-white`}>Or</span>
         </div>
         <SocialAuth />
         <div className={`${styles.switchAuth} text-center`}>
            {(isLogin && "Don't have any account") || "Already have an account"}
            <button
               className={`${styles.switchButton} fw-600`}
               onClick={() => setIsLogin(!isLogin)}>
               {(isLogin && "Register") || "Login"}
            </button>
         </div>
      </>
   );
}
