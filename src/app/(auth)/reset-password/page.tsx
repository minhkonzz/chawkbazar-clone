"use client";

import { useState, useEffect, useCallback } from "react";
import { resetPassword } from "@/lib/firebase/auth/actions";
import { useRouter } from "next/navigation";
import TextInput from "@/shared/components/text-input";
import Button from "@/shared/components/button";
import Image from "next/image";

export default function ResetPassword({ searchParams }: { searchParams: { token?: string } }) {
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

   const backToHome = useCallback(() => {
      router.replace("/");
   }, []);

   return (
      <div className="d-flex fd-col at-center" style={{ maxWidth: 480, columnGap: 32 }}>
         <Image width={95} height={30} src="/logo.webp" alt="logo-shop" />
         {resetPasswordToken && 
         <><TextInput 
            label="New password"
            placeholder="Enter new password"
            inputValue={newPassword}
            onChange={e => setNewPassword(e.target.value)}
         />
         <TextInput 
            label="Confirm new password"
            placeholder="Confirm new password"
            inputValue={confirmNewPassword}
            onChange={e => setConfirmNewPassword(e.target.value)}
         />
         {!status.success && status.message && <p style={{ color: "red" }}>{status.message}</p>}
         <Button onClick={status.success && backToHome || requestResetPassword}>
            {status.success && status.message || "Reset password"}
         </Button></> || 
         <h1>Invalid or expired reset password link</h1>}
      </div>
   );
}
