"use client";

import { NextImage, useState } from "@/configs/imports-wrapper";
import styles from "./style.module.css";
import SocialAuth from "./social";
import LocalAuth from "./local";
import ForgotPasswordForm from "./forgot-password";

export type AuthForm = "login" | "register" | "forgotPassword";

export default function Auth() {
  const [authForm, setAuthForm] = useState<AuthForm>("login");
  return (
    <>
      <header className="text-center">
        <NextImage alt="shop-logo" src="/logo.webp" width={95} height={30} />
        <p className={styles.title}>
          {authForm === "login" && "Login with your email & password"}
          {authForm === "register" && (
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
          {authForm === "forgotPassword" && "Easily get back your password"}
        </p>
      </header>
      <div className={`${styles.form} d-flex fd-col`}>
        {(authForm !== "forgotPassword" && (
          <LocalAuth isLogin={authForm === "login"} setAuthForm={setAuthForm} />
        )) || <ForgotPasswordForm />}
      </div>
      {authForm !== "forgotPassword" && (
        <>
          <div
            className={`${styles.lineWrapper} posrel d-flex fd-col at-center jc-center`}>
            <hr className={`${styles.line} w-100pc`} />
            <span className={`${styles.lineText} posab bg-white`}>Or</span>
          </div>
          <SocialAuth />
          <div className={`${styles.switchAuth} text-center`}>
            {authForm === "login" && "Don't have any account"}
            {authForm === "register" && "Already have an account"}
            <button
              className={`${styles.switchButton} fw-600`}
              onClick={() =>
                setAuthForm((authForm === "login" && "register") || "login")
              }>
              {(authForm === "login" && "Register") || "Login"}
            </button>
          </div>
        </>
      )}
    </>
  );
}
