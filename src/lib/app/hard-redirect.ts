"use server";

import { RedirectType, redirect } from "@/configs/imports-wrapper";

export default async function hardRedirectFromClient(pathname: string) {
  redirect(pathname, RedirectType.replace);
}