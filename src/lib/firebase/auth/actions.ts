"use server";

import {
   hash,
   compare as validateCurrentPassword
} from "@/shared/helpers/hash";

export async function checkCurrentPassword(
   providedPassword: string,
   hashedPassword: string
): Promise<boolean> {
   return await validateCurrentPassword(providedPassword, hashedPassword);
}

export async function hashPassword(plainPassword: string): Promise<string> {
   return await hash(plainPassword);
}
