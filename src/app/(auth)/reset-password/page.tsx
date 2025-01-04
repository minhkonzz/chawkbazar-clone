"use client";

import { NextImage, useState, useEffect, useRouter } from "@/configs/imports-wrapper";
import { resetPassword } from "@/lib/firebase/auth/actions";
import { TextInput, Button } from "@/components/atoms";
import styles from "./page.module.css";

export default function ResetPassword({
  searchParams
}: {
  searchParams: { token?: string };
}) {
  const resetPasswordToken = searchParams.token;
  const router = useRouter();
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [status, setStatus] = useState({
    success: false,
    message: ""
  });

  useEffect(() => {
    if (status.message) setStatus({ success: false, message: "" });
  }, [newPassword, confirmNewPassword]);

  const requestResetPassword = async () => {
    if (newPassword !== confirmNewPassword) {
      setStatus({
        success: false,
        message: "Provided passwords are not matched"
      });
      return;
    }
    const res = await resetPassword(resetPasswordToken!, newPassword);
    setStatus({
      success: !res.error,
      message: res.error || `${res.success}. Back to home and login`
    });
  };

  const backToHome = () => {
    router.replace("/");
  };

  return (
    <div className={styles.wrapper}>
      <div className={`${styles.inner} d-flex fd-col`}>
        <NextImage
          className="self-center"
          width={95}
          height={30}
          src="/logo.webp"
          alt="logo-shop"
        />
        {(resetPasswordToken && (
          <>
            <TextInput
              isPassword
              label="New password"
              placeholder="Enter new password"
              inputValue={newPassword}
              onChange={e => setNewPassword(e.target.value)}
            />
            <TextInput
              isPassword
              label="Confirm new password"
              placeholder="Confirm new password"
              inputValue={confirmNewPassword}
              onChange={e => setConfirmNewPassword(e.target.value)}
            />
            {!status.success && status.message && (
              <p style={{ color: "red" }}>{status.message}</p>
            )}
            <Button
              className={styles.btn}
              onClick={(status.success && backToHome) || requestResetPassword}>
              {(status.success && status.message) || "Reset password"}
            </Button>
          </>
        )) || <h1>Invalid or expired reset password link</h1>}
      </div>
    </div>
  );
}
