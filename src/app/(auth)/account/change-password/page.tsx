"use client"

import { useState } from "react";
import { useFirebaseUserContext } from "@/context";
import { useToast } from "@/context";
import { checkCurrentPassword } from "@/lib/firebase/auth/actions";
import { updateUserPassword } from "@/lib/firebase/firestore/user";
import { constants } from "@/configs";
import styles from "./page.module.css";
import layoutStyles from "../layout.module.css";
import TextInput from "@/shared/components/text-input";

const { regex } = constants;

export default function AccountChangePassword() {

   const toast = useToast()!;
   const { currentUser } = useFirebaseUserContext()!;
   const [oldPassword, setOldPassword] = useState("");
   const [newPassword, setNewPassword] = useState("");

   const newPasswordError = !newPassword.match(regex.PASSWORD_REGEX) ?
   "Password cần tối thiểu 8 đến 15 ký tự, chứa ít nhất 1 ký tự đặc biệt và 1 ký tự in hoa" : "";

   const updatePassword = async () => {
      if (!currentUser || newPasswordError) return;
      const { password: hashedPassword } = currentUser.metadata;
      const correctCurrentPassword = await checkCurrentPassword(oldPassword, hashedPassword);
      if (!correctCurrentPassword) {
         toast("error", "Incorrect old password");
         return;
      }
      updateUserPassword(currentUser.user, newPassword)
         .then(() => { toast("success", "Password updated successfully"); })
         .catch((err) => { toast("error", `Failed to update password: ${err.message}`); })
   }

   return (
      <>
         <h2 className={layoutStyles.mainHeading}>Change password</h2>
         <div className={styles.main}>
            <div className={styles.inpWrapper}>
               <TextInput 
                  label="Old password"
                  placeholder="Enter your current password"
                  inputValue={oldPassword}
                  errorMessage=""
                  onChange={e => setOldPassword(e.target.value)}
               />
            </div>
            <div className={styles.inpWrapper}>
               <TextInput 
                  label="New password"
                  placeholder="Enter new password"
                  inputValue={newPassword}
                  errorMessage=""
                  onChange={e => setNewPassword(e.target.value)}
               />
            </div>
            <button className={`${styles.button} cp`} onClick={updatePassword}>Change password</button>
         </div>
      </>
   );
};