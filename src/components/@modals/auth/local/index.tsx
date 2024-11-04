"use client";

import { useState, useEffect, useCallback } from "react";
import { constants } from "@/configs";
import { useModalContext } from "@/context";
import { useInputsValidation } from "@/shared/hooks";
import { signInWithEmail, signUp } from "@/lib/firebase/auth";
import { hashPassword } from "@/lib/firebase/auth/actions";
import { User } from "firebase/auth";
import Toggle from "@/shared/components/toggle";
import TextInput from "@/shared/components/text-input";
import styles from "./styles.module.css";
import styles1 from "../styles.module.css";

import {
   AnimatedSuccessCheckIcon,
   AnimatedSpinnerIcon,
   AnimatedErrorIcon
} from "@/shared/components/animated-icons";

const { regex } = constants;
const { NAME_REGEX, EMAIL_REGEX, PASSWORD_REGEX } = regex;

const getLocalAuthState = (isLoginModal: boolean) => ({
   processing: {
      icon: {
         component: AnimatedSpinnerIcon,
         props: {}
      },
      text: "Processing...",
      color: "#000"
   },
   success: {
      icon: {
         component: AnimatedSuccessCheckIcon,
         props: {}
      },
      text: isLoginModal ? "Sign in successfully" : "Sign up successfully",
      color: "green"
   },
   error: {
      icon: {
         component: AnimatedErrorIcon,
         props: {}
      },
      text: isLoginModal ? "Cannot sign in" : "Cannot sign up",
      color: "red"
   }
});

export default function LocalAuth({ isLogin }: { isLogin: boolean }) {
   const { setCurrentModal } = useModalContext()!;
   const [name, setName] = useState<string>("");
   const [email, setEmail] = useState<string>("");
   const [password, setPassword] = useState<string>("");
   const [process, setProcess] = useState<"processing" | "success" | "error">();

   useEffect(() => {
      if (!isLogin) setName("");
      setEmail("");
      setPassword("");
   }, [isLogin]);

   const performSignUp = async (): Promise<User> => {
      const hashedPassword: string = await hashPassword(password);
      return await signUp(email, password, hashedPassword, name);
   };

   const performSignIn = async (): Promise<User> => {
      return await signInWithEmail(email, password);
   };

   const onClick = async () => {
      setProcess("processing");
      const func = isLogin ? performSignIn : performSignUp;
      const user = await func();
      if (user) {
         setProcess("success");
         setTimeout(() => {
            setCurrentModal("none");
         }, 2000);
         return;
      }
      setProcess("error");
   };

   const { errors, handleAfterValidate: makeAuth } = useInputsValidation(
      [
         ...(!isLogin
            ? [
                 {
                    title: "Name",
                    value: name,
                    pattern: NAME_REGEX,
                    errorIdentifier: "nameErr",
                    errorMessage: "Only allow characters"
                 }
              ]
            : []),
         {
            title: "Email",
            value: email,
            pattern: EMAIL_REGEX,
            errorIdentifier: "emailErr",
            errorMessage: "Email is not valid"
         },
         {
            title: "Password",
            value: password,
            pattern: PASSWORD_REGEX,
            errorIdentifier: "passwordErr",
            errorMessage:
               "Password must be at least 8 to 15 characters long, contain at least 1 special character and 1 uppercase character"
         }
      ],
      onClick
   );

   const InnerButton = useCallback(() => {
      if (process) {
         const { icon, text } = getLocalAuthState(isLogin)[process];
         const Icon = icon.component;
         return (
            <>
               <div className="posab">
                  <Icon {...icon.props} />
               </div>
               {text}
            </>
         );
      }
      return <>{(isLogin && "Sign in") || "Sign up"}</>;
   }, [process, isLogin]);

   return (
      <>
         {" "}
         {!isLogin && (
            <div className="w-100pc">
               <TextInput
                  label="Name"
                  placeholder="Enter your name"
                  inputValue={name}
                  errorMessage={errors?.nameErr!}
                  onChange={e => setName(e.target.value)}
               />
            </div>
         )}
         <div className="w-100pc">
            <TextInput
               label="Email"
               placeholder="Enter your email"
               inputValue={email}
               errorMessage={errors?.emailErr!}
               onChange={e => setEmail(e.target.value)}
            />
         </div>
         <div className="w-100pc">
            <TextInput
               label="Password"
               placeholder="Enter your password"
               inputValue={password}
               errorMessage={errors?.passwordErr!}
               onChange={e => setPassword(e.target.value)}
               isPassword
            />
         </div>
         {isLogin && (
            <div className="w-100pc d-flex jc-sb at-center">
               <div className="d-flex at-center">
                  <Toggle />
                  <span className={styles.remember}>Remember me</span>
               </div>
               <button className={styles.forgotPassword}>
                  Forgot password
               </button>
            </div>
         )}
         <button
            className={`${styles1.btn} w-100pc posrel`}
            onClick={makeAuth}
            style={
               (process && {
                  backgroundColor: "transparent",
                  border: `1px solid ${getLocalAuthState(isLogin)[process].color}`,
                  color: getLocalAuthState(isLogin)[process].color
               }) ||
               {}
            }>
            <InnerButton />
         </button>
      </>
   );
}
