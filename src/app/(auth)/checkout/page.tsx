// import redirectHard from "@/lib/app/hard-redirect";
import { redirect, RedirectType } from "@/configs/imports-wrapper";
import { useAuthenticatedUser } from "@/lib/firebase/configs/server";
import CheckoutMain from "./main";


export default async function CheckoutPage() {
  const user = await useAuthenticatedUser();

  if (!user) {
    // user are not logged in
    redirect("/auth", RedirectType.replace);
  }

  return <CheckoutMain />
}
