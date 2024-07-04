"use client"

import { useState } from "react";
import { useInputsValidation } from "@/shared/hooks";
import { updateUserProfile } from "@/lib/firebase/firestore/user";
import { useToast, useFirebaseUserContext } from "@/context";
import { constants } from "@/configs";
import styles from "./page.module.css";
import TextInput from "@/shared/components/text-input";
import RadioGroup from "@/shared/components/radio-group";

const { regex, TOAST_DURATION } = constants;

const genders = [
   { title: "Male", value: "male" },
   { title: "Female", value: "female" }
];

export default function AccountProfile() {

   const toast = useToast()!;
   const { currentUser } = useFirebaseUserContext()!;

   const [profile, setProfile] = useState({
      firstName: "",
      lastName: "",
      displayName: "",
      phone: "",
      email: "",
      gender: ""
   });

   const updateProfile = () => {
      if (!currentUser) return;
      updateUserProfile(currentUser.user, profile)
         .then(() => {
            toast("success", "Success update your profile");
         })
         .catch((error) => {
            toast("error", `Failed to update your profile: ${error.message}`);
         });
   }

   const { errors, handleAfterValidate: _updateProfile } = useInputsValidation([
      {
         fieldTitle: "First name",
         inputValue: profile.firstName,
         pattern: regex.NAME_REGEX,
         errorIdentifier: "firstNameError",
         errorMessage: "Chỉ được phép ký tự là chữ"
      },
      {
         fieldTitle: "Last name",
         inputValue: profile.lastName,
         pattern: regex.NAME_REGEX,
         errorIdentifier: "lastNameError",
         errorMessage: "Chỉ được phép ký tự là chữ"
      },
      {
         fieldTitle: "Display name",
         inputValue: profile.displayName,
         pattern: regex.USERNAME_REGEX,
         errorIdentifier: "displayNameError",
         errorMessage: "Chỉ được phép ký tự là chữ hoặc số"
      },
      {
         fieldTitle: "Phone",
         inputValue: profile.phone,
         pattern: regex.NUMERIC_REGEX,
         errorIdentifier: "phoneError",
         errorMessage: "Chỉ được phép ký tự là số"
      },
      {
         fieldTitle: "Email",
         inputValue: profile.email,
         pattern: regex.EMAIL_REGEX,
         errorIdentifier: "emailError",
         errorMessage: "Email không hợp lệ"
      }
   ], updateProfile);

   return (
      <div className={`${styles.form} d-flex fd-col`}>
         <div className={`${styles.dinp} d-flex`}>
            <div className={styles.inpWrapper}>
               <TextInput
                  label="First Name *"
                  placeholder="Enter your first name"
                  inputValue={profile.firstName}
                  errorMessage={errors?.firstNameError || ""}
                  onChange={e => setProfile({ ...profile, firstName: e.target.value })}
               />
            </div>
            <div className={styles.inpWrapper}>
               <TextInput
                  label="Last Name *"
                  placeholder="Enter your first name"
                  inputValue={profile.lastName}
                  errorMessage={errors?.lastNameError || ""}
                  onChange={e => setProfile({ ...profile, lastName: e.target.value })}
               />
            </div>
         </div>
         <div className={`${styles.inpWrapper} w-100pc`}>
            <TextInput
               label="Display name *"
               placeholder="Your display name"
               inputValue={profile.displayName}
               errorMessage={errors?.displayNameError || ""}
               onChange={e => setProfile({ ...profile, displayName: e.target.value })}
            />
         </div>
         <div className={`${styles.dinp} d-flex`}>
            <div className={styles.inpWrapper}>
               <TextInput
                  label="Phone *"
                  placeholder="Enter your phone"
                  inputValue={profile.phone}
                  errorMessage={errors?.phoneError || ""}
                  onChange={e => setProfile({ ...profile, phone: e.target.value })}
               />
            </div>
            <div className={styles.inpWrapper}>
               <TextInput
                  label="Email *"
                  placeholder="Enter your email"
                  inputValue={profile.email}
                  errorMessage={errors?.emailError || ""}
                  onChange={e => setProfile({ ...profile, email: e.target.value })}
               />
            </div>
         </div>
         <div>
            <span className={`${styles.inpTitle} d-b`}>Gender</span>
            <div className={`${styles.genders} d-flex at-center`}>
               <RadioGroup options={genders} />
            </div>
         </div>
         <button onClick={_updateProfile}>Update</button>
      </div>
   );
};