"use client";

import { useState } from "react";
import { useFirebaseUser } from "@/context";
import { useToast } from "@/context";
import { checkCurrentPassword } from "@/lib/firebase/auth/actions";
import { updatePassword } from "@/lib/firebase/auth/actions";
import { constants } from "@/configs";
import styles from "./page.module.css";
import layoutStyles from "../layout.module.css";
import Button from "@/shared/components/button";
import TextInput from "@/shared/components/text-input";

const { regex } = constants;

export default function AccountChangePassword() {
   const toast = useToast()!;
   const { user } = useFirebaseUser()!;
   const [oldPassword, setOldPassword] = useState("");
   const [newPassword, setNewPassword] = useState("");

   const newPasswordError = !newPassword.match(regex.PASSWORD_REGEX)
      ? "Password cần tối thiểu 8 đến 15 ký tự, chứa ít nhất 1 ký tự đặc biệt và 1 ký tự in hoa"
      : "";

   const update = async () => {
      if (!user || newPasswordError) return;
      const { hashedPassword } = user.customClaims!;
      const correctCurrentPassword = await checkCurrentPassword(
         oldPassword,
         hashedPassword
      );
      if (!correctCurrentPassword) {
         toast("error", "Incorrect old password");
         return;
      }
      updatePassword(user.uid, newPassword)
         .then(() => toast("success", "Password updated successfully"))
         .catch(err => toast("error", `Failed to update password: ${err.message}`));
   };

   return (
      <>
         <h2 className={layoutStyles.mainHeading}>Change password</h2>
         <div className={styles.main}>
            <div className={styles.inpWrapper}>
               <TextInput
                  label="Old password"
                  placeholder="Enter your current password"
                  inputValue={oldPassword}
                  onChange={e => setOldPassword(e.target.value)}
               />
            </div>
            <div className={styles.inpWrapper}>
               <TextInput
                  label="New password"
                  placeholder="Enter new password"
                  inputValue={newPassword}
                  onChange={e => setNewPassword(e.target.value)}
               />
            </div>
            <Button onClick={update} className={styles.btn}>Change password</Button>
         </div>
      </>
   );
}
