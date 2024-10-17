"use client";

import { useState, forwardRef, ForwardedRef, MouseEvent } from "react";
import Image from "next/image";
import styles from "./styles.module.css";
import SocialAuth from "./social";
import LocalAuth from "./local";

interface Props {
   onClose: (e: MouseEvent<HTMLButtonElement>, isClickCloseButton: boolean) => void;
}

export default forwardRef(function Auth({ onClose }: Props, ref: ForwardedRef<HTMLDivElement | null>) {
   const [isLogin, setIsLogin] = useState<boolean>(true);

   return (
      <div {...{ref}} className={`${styles.container} posab pos-center max-h-100pc`}>
         <button className={`${styles.closeButton} jc-center at-center cp circle-bd-r`} onClick={e => onClose(e, true)}>
            <svg 
               stroke="currentColor" 
               fill="currentColor" 
               strokeWidth="0" 
               viewBox="0 0 512 512" 
               className={styles.ic} 
               height="1em" 
               width="1em">
               <path d="M289.94 256l95-95A24 24 0 00351 127l-95 95-95-95a24 24 0 00-34 34l95 95-95 95a24 24 0 1034 34l95-95 95 95a24 24 0 0034-34z"></path>
            </svg>
         </button>
         <div className={`${styles.main} d-flex fd-col w-100pc h-100pc`}>
            <header className={`${styles.header} text-center`}>
               <Image alt="shop-logo" src="/logo.svg" width={95} height={30} />
               <p className={styles.title}>
                  { isLogin && "Login with your email & password" ||
                    <>By signing up, you agree to our
                    <a className={styles.titleLink} href="#">Terms</a> & 
                    <a className={styles.titleLink} href="#">Privacy</a></> }
               </p>              
            </header>
            <div className={`${styles.form} d-flex fd-col`}>
               <LocalAuth {...{ isLogin }} />
            </div>
            <div className={`${styles.lineWrapper} posrel d-flex fd-col at-center jc-center`}>
               <hr className={`${styles.line} w-100pc`}/>
               <span className={`${styles.lineText} posab`}>Or</span>
            </div>
            <SocialAuth />
            <div className={`${styles.switchAuth} text-center`}>
               { isLogin && "Don't have any account" || "Already have an account" }
               <button className={`${styles.switchButton} cp`} onClick={() => setIsLogin(!isLogin)}>
                  { isLogin && "Register" || "Login" }
               </button>
            </div>
         </div>        
      </div>
   )
});