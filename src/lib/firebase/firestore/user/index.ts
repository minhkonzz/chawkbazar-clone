import { updatePassword, updateProfile, updateEmail, User } from "firebase/auth";
import { upsertDoc, fetchDoc } from "..";

export const getUserMetadata = async (
   userId: string
): Promise<any> => {
   return await fetchDoc("customer", userId);
}

export const updateUserPassword = async (
   user: User,
   newPassword: string
): Promise<any> => {
   return await updatePassword(user, newPassword);
};

export const updateUserProfile = async (
   user: User,
   newProfile: any
): Promise<void> => {
   const { firstName, lastName, displayName, phone, email } = newProfile;
   await updateProfile(user, { displayName, photoURL: "" });
   await updateEmail(user, email);
   await upsertDoc("customers", user.uid, { firstName, lastName, phone });
};