"use server";

import { hash, compare as validateCurrentPassword } from "@/shared/helpers/hash";
import { createTransport } from "nodemailer";
import { env } from "@/configs";
import type { User } from "@/shared/types/entities";
import type { Profile } from "@/app/(auth)/account/profile/page";
import { firebaseAuthAdmin } from "../configs/server";
import { generateToken, parseToken } from "@/shared/helpers/token";

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
   const hashedPassword = await hash(password);
   await firebaseAuthAdmin.setCustomUserClaims(userRecord.uid, {
      role: "customer",
      hashedPassword,
      firstName: nameParts[0],
      lastName: nameParts[nameParts.length - 1],
      gender: "",
      resetPasswordToken: null
   });
   return {
      uid: userRecord.uid,
      email: userRecord.email,
      emailVerified: userRecord.emailVerified,
      displayName: userRecord.displayName,
      customClaims: userRecord.customClaims
   };
};

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

export const requestPasswordReset = async (email: string) => {
   const user = firebaseAuthAdmin.getUserByEmail(email);
   if (!user) return { error: "User does not exist" };
   const resetPasswordToken = await generateToken({
      payload: { email }
   });

   const transporter = createTransport({
      host: env.SMTP_HOST,
      port: parseInt(env.SMTP_PORT!),
      secure: false,
      auth: {
         user: env.SMTP_USER,
         pass: env.SMTP_PASS
      },
      tls: {
         ciphers: "SSLv3"
      }
   });

   await transporter.sendMail({
      from: "chawkbazar@test.com",
      to: email,
      subject: `Chawkbazar Shop - You requested password reset link`,
      text: `Your password reset link: ${env.BASE_URL}/reset-password?token=${resetPasswordToken}`,
      html: ""
   });

   return { success: "Sent reset password link" };
};

export const resetPassword = async (
   token: string, 
   plainPassword: string
) => {
   const { email } = parseToken(token) as { email: string };
   if (!email) return { error: "Invalid or expired token" };

   // update user's password
   const user = await firebaseAuthAdmin.getUserByEmail(email);
   await firebaseAuthAdmin.updateUser(user.uid, { password: plainPassword });
   const hashedPassword = await hashPassword(plainPassword);
   await firebaseAuthAdmin.setCustomUserClaims(user.uid, { hashedPassword });
   return { success: "Reset password successfully" };
};

export const updateUserProfile = async (
   userId: string,
   newProfile: Profile
): Promise<void> => {
   const { firstName, lastName, displayName, phone, email, gender } =
      newProfile;
   await firebaseAuthAdmin.updateUser(userId, {
      email,
      displayName,
      phoneNumber: phone
   });
   await firebaseAuthAdmin.setCustomUserClaims(userId, {
      firstName,
      lastName,
      gender
   });
};
