"use client";

import { 
   useState, 
   useEffect, 
   useCallback, 
   type SetStateAction, 
   type Dispatch 
} from "react";

import { constants } from "@/configs";
import { useModal, useFirebaseUser, useToast } from "@/context";
import { useInputsValidation } from "@/shared/hooks";
import { signUp } from "@/lib/firebase/auth/actions";
import { signInWithEmail } from "@/lib/firebase/auth";
import type { SignInResponse } from "@/shared/types";
import type { User as VerifiedUser } from "@/shared/types/entities";
import type{ User } from "firebase/auth";
import type { AuthForm } from "@/components/auth";
import TextInput from "@/shared/components/text-input";
import Button from "@/shared/components/button";
import BaseAPI from "@/shared/api";
import styles from "./styles.module.css";
import styles1 from "@/components/auth/styles.module.css";

import {
   AnimatedSuccessCheckIcon,
   AnimatedSpinnerIcon,
   AnimatedErrorIcon
} from "@/shared/components/animated-icons";

const { regex, FORCE_REFRESH_TOKEN } = constants;
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
      text: isLoginModal ? "Wrong email or password" : "This email has been registered",
      color: "red"
   }
});

export default function LocalAuth({ 
   isLogin,
   setAuthForm
}: { 
   isLogin: boolean,
   setAuthForm: Dispatch<SetStateAction<AuthForm>>
}) {
   let timeoutId: NodeJS.Timeout;
   const toast = useToast();
   const { setCurrentModal } = useModal()!;
   const { setUser } = useFirebaseUser()!;
   const [name, setName] = useState<string>("");
   const [email, setEmail] = useState<string>("");
   const [password, setPassword] = useState<string>("");
   const [process, setProcess] = useState<"processing" | "success" | "error">();

   useEffect(() => {
      if (!isLogin) setName("");
      setEmail("");
      setPassword("");

      return () => { clearTimeout(timeoutId) }
   }, [isLogin]);

   const performSignUp = async (): Promise<VerifiedUser> => {
      return await signUp(name, email, password);
   };

   const performSignIn = async (): Promise<User | null> => {
      return await signInWithEmail(email, password);
   };

   const onClick = async () => {
      setProcess("processing");
      const func = isLogin ? performSignIn : performSignUp;
      const user = await func();
      if (!user) {
         setProcess("error");
         return;
      }
      if (!isLogin) {
         // signed up
         const signedUpUser = user as VerifiedUser;
         setUser(signedUpUser);
      } else {
         // signed in
         const signedInUser = user as User
         const userId = signedInUser.uid;
         const idToken = await signedInUser.getIdToken(FORCE_REFRESH_TOKEN);
         const { user: verifiedUser } = await BaseAPI.post<SignInResponse>("/signin", { idToken, userId }); // double check from server
         if (!verifiedUser) {
            setProcess("error");
            return;
         }
         setUser(verifiedUser);
      }
      setProcess("success");
      timeoutId = setTimeout(() => {
         setCurrentModal("none");
      }, 2000);
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

   const toForgotPassword = useCallback(() => {
      setAuthForm("forgotPassword");
   }, []);

   return (
      <>
         {!isLogin && (
            <TextInput
               label="Name"
               placeholder="Enter your name"
               inputValue={name}
               errorMessage={errors?.nameErr!}
               onChange={e => setName(e.target.value)}
            />
         )}
         <TextInput
            label="Email"
            placeholder="Enter your email"
            inputValue={email}
            errorMessage={errors?.emailErr!}
            onChange={e => setEmail(e.target.value)}
         />
         <TextInput
            label="Password"
            placeholder="Enter your password"
            inputValue={password}
            errorMessage={errors?.passwordErr!}
            onChange={e => setPassword(e.target.value)}
            isPassword
         />
         {isLogin && (
            <div className="d-flex jc-sb at-center">
               <button 
                  onClick={toForgotPassword} 
                  className={styles.forgotPassword}>
                  Forgot password
               </button>
            </div>
         )}
         <Button
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
         </Button>
      </>
   );
}
