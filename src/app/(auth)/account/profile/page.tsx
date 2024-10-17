"use client"

import { useState } from "react";
import { useInputsValidation } from "@/shared/hooks";
import { updateUserProfile } from "@/lib/firebase/firestore/user";
import { useToast, useFirebaseUserContext } from "@/context";
import { constants } from "@/configs";
import styles from "./page.module.css";
import TextInput from "@/shared/components/text-input";
import RadioGroup from "@/shared/components/radio-group";

const {regex} = constants;

const genders = [
   { title: "Male", value: "male" },
   { title: "Female", value: "female" }
];

export type Profile = {
   firstName: string,
   lastName: string,
   displayName: string,
   phone: string,
   email: string,
   gender: string
};

export default function AccountProfile() {

   const toast = useToast()!;
   const {currentUser} = useFirebaseUserContext()!;

   const [profile, setProfile] = useState<Profile>({
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

   const {errors, handleAfterValidate: _updateProfile} = useInputsValidation([
      {
         title: "First name",
         value: profile.firstName,
         pattern: regex.NAME_REGEX,
         errorIdentifier: "firstNameErr",
         errorMessage: "Chỉ được phép ký tự là chữ"
      },
      {
         title: "Last name",
         value: profile.lastName,
         pattern: regex.NAME_REGEX,
         errorIdentifier: "lastNameErr",
         errorMessage: "Chỉ được phép ký tự là chữ"
      },
      {
         title: "Display name",
         value: profile.displayName,
         pattern: regex.USERNAME_REGEX,
         errorIdentifier: "displayNameErr",
         errorMessage: "Chỉ được phép ký tự là chữ hoặc số"
      },
      {
         title: "Phone",
         value: profile.phone,
         pattern: regex.NUMERIC_REGEX,
         errorIdentifier: "phoneErr",
         errorMessage: "Chỉ được phép ký tự là số"
      },
      {
         title: "Email",
         value: profile.email,
         pattern: regex.EMAIL_REGEX,
         errorIdentifier: "emailErr",
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
                  errorMessage={errors?.firstNameErr || ""}
                  onChange={e => setProfile({...profile, firstName: e.target.value})}
               />
            </div>
            <div className={styles.inpWrapper}>
               <TextInput
                  label="Last Name *"
                  placeholder="Enter your first name"
                  inputValue={profile.lastName}
                  errorMessage={errors?.lastNameErr || ""}
                  onChange={e => setProfile({...profile, lastName: e.target.value})}
               />
            </div>
         </div>
         <div className={`${styles.inpWrapper} w-100pc`}>
            <TextInput
               label="Display name *"
               placeholder="Your display name"
               inputValue={profile.displayName}
               errorMessage={errors?.displayNameErr || ""}
               onChange={e => setProfile({...profile, displayName: e.target.value})}
            />
         </div>
         <div className={`${styles.dinp} d-flex`}>
            <div className={styles.inpWrapper}>
               <TextInput
                  label="Phone *"
                  placeholder="Enter your phone"
                  inputValue={profile.phone}
                  errorMessage={errors?.phoneErr || ""}
                  onChange={e => setProfile({...profile, phone: e.target.value})}
               />
            </div>
            <div className={styles.inpWrapper}>
               <TextInput
                  label="Email *"
                  placeholder="Enter your email"
                  inputValue={profile.email}
                  errorMessage={errors?.emailErr || ""}
                  onChange={e => setProfile({...profile, email: e.target.value})}
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