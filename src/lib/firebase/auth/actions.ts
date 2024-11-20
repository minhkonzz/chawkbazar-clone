"use server";

import {
   hash,
   compare as validateCurrentPassword
} from "@/shared/helpers/hash";

import type { User } from "@/shared/types/entities";
import type { Profile } from "@/app/(auth)/account/profile/page";
import { firebaseAuthAdmin } from "../configs/server";

export const signUp = async (
   displayName: string,
   email: string,
   password: string
): Promise<User> => {
   const userRecord = await firebaseAuthAdmin.createUser({
      displayName,
      email,
      password
   });
   const nameParts = displayName.split(" ");
   await firebaseAuthAdmin.setCustomUserClaims(userRecord.uid, {
      role: "customer",
      firstName: nameParts[0],
      lastName: nameParts[nameParts.length - 1],
      gender: ""
   });
   return {
      uid: userRecord.uid,
      email: userRecord.email,
      emailVerified: userRecord.emailVerified,
      displayName: userRecord.displayName,
      customClaims: userRecord.customClaims
   };
}

export const checkCurrentPassword = async (
   providedPassword: string,
   hashedPassword: string
): Promise<boolean> => {
   return await validateCurrentPassword(providedPassword, hashedPassword);
};

export const hashPassword = async (plainPassword: string): Promise<string> => {
   return await hash(plainPassword);
};

export const updatePassword = async (
   userId: string,
   password: string
): Promise<void> => {
   await firebaseAuthAdmin.updateUser(userId, { password });
};

export const updateUserProfile = async (
   userId: string,
   newProfile: Profile
): Promise<void> => {
   const { firstName, lastName, displayName, phone, email, gender } = newProfile;
   await firebaseAuthAdmin.updateUser(userId, { email, displayName, phoneNumber: phone });
   await firebaseAuthAdmin.setCustomUserClaims(userId, {
      firstName,
      lastName,
      gender
   });
};
