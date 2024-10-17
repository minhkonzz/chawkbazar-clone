import { updatePassword, updateProfile, updateEmail, User } from "firebase/auth";
import { upsertDoc, fetchDoc } from "..";
import { UserMetadata } from "@/shared/types";
import { Profile } from "@/app/(auth)/account/profile/page";
import collections from "../collections";

export const getUserMetadata = async (
   userId: string
): Promise<UserMetadata> => {
   return await fetchDoc(collections.CUSTOMERS, userId) as UserMetadata;
};

export const updateUserPassword = async (
   user: User,
   newPassword: string
): Promise<void> => {
   return await updatePassword(user, newPassword);
};

export const updateUserProfile = async (
   user: User,
   newProfile: Profile
): Promise<void> => {
   const { firstName, lastName, displayName, phone, email } = newProfile;
   await updateProfile(user, { displayName, photoURL: "" });
   await updateEmail(user, email);
   await upsertDoc(collections.CUSTOMERS, user.uid, { firstName, lastName, phone });
};