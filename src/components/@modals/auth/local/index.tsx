"use client";

import { useState, useEffect } from "react";
import { constants } from "@/configs";
import { useToast, useModalContext } from "@/context";
import { signInWithEmail } from "@/lib/firebase/auth";
import { signUp } from "@/lib/firebase/auth/actions";
import Toggle from "@/shared/components/toggle";
import TextInput from "@/shared/components/text-input";
import styles from "./styles.module.css";
import styles1 from "../styles.module.css";

const { regex } = constants;

export default function LocalAuth({ isLogin }: { isLogin: boolean }) {

   const toast = useToast()!;
   const { setCurrentModal } = useModalContext()!;
   const [ name, setName ] = useState(""); 
   const [ email, setEmail ] = useState(""); 
   const [ password, setPassword ] = useState("");
   const [ errors, setErrors ] = useState<any>(null);

   useEffect(() => {
      if (!isLogin) setName(""); 
      setEmail(""); 
      setPassword(""); 
      setErrors(null);
   }, [isLogin]);

   useEffect(() => {
      if (errors) setErrors(null);
   }, [name, email, password]);

   const onClick = async () => {
      const inputErrors = getInputErrors();
      if (inputErrors) {
         setErrors(inputErrors);
         return;
      }
      if (isLogin) {
         const user = await signInWithEmail(email, password);
         toast(user? "success" : "error", user? "You logged in" : "Login failed");
      } else {
         const user = await signUp(email, password, name);
         toast(user? "success" : "error", user? "Register successfully" : "Register failed");
      }
      setCurrentModal("none");
   }

   const getInputErrors = () => {
      const { NAME_REGEX, EMAIL_REGEX, PASSWORD_REGEX } = regex;
      const nameRegexExtract = name.match(NAME_REGEX);
      const emailRegexExtract = email.match(EMAIL_REGEX);
      const passwordRegexExtract = password.match(PASSWORD_REGEX);
      const nameError = !isLogin && ((name.length === 0 && "Vui lòng thêm username") || (!nameRegexExtract && "Chỉ ký tự chữ hoặc số")) || "";
      const emailError = (email.length === 0 && "Vui lòng thêm Email") || (!emailRegexExtract && "Email không đúng định dạng") || "";
      const passwordError = (password.length === 0 && "Vui lòng thêm password") || (!passwordRegexExtract && "Password tối thiểu 8 đến 15 ký tự, chứa ít nhất 1 ký tự đặc biệt và 1 ký tự in hoa") || "";
      if (nameError || emailError || passwordError) {
         return {
            nameError,
            emailError,
            passwordError
         };
      }
      return null;
   }

   return (
      <> { 
         !isLogin &&
         <div className="w-100pc">
            <TextInput 
               label="Name"
               placeholder="Enter your name"
               inputValue={name}
               errorMessage={errors?.nameError}
               onChange={e => setName(e.target.value)}
            />
         </div> }
         <div className="w-100pc">
            <TextInput 
               label="Email"
               placeholder="Enter your email"
               inputValue={email}
               errorMessage={errors?.emailError}
               onChange={e => setEmail(e.target.value)}
            />
         </div>
         <div className="w-100pc">
            <TextInput 
               label="Password"
               placeholder="Enter your password"
               inputValue={password}
               errorMessage={errors?.passwordError}
               onChange={e => setPassword(e.target.value)}
               isPassword
            />
         </div>
         { isLogin &&
         <div className="w-100pc d-flex jc-sb at-center">
            <div className="d-flex at-center">
               <Toggle />
               <span className={styles.remember}>Remember me</span>
            </div>
            <button className={styles.forgotPassword}>Forgot password</button>
         </div> }
         <button className={`${styles1.btn} w-100pc`} {...{ onClick }}>
            { isLogin && "Login" || "Register" }
         </button>
      </>
   );
}