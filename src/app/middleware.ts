import { type NextRequest, NextResponse } from "next/server";
import { firebaseAuthAdmin } from "@/lib/firebase/configs/server";

export default async function middleware(req: NextRequest) {
   const session = req.cookies.get("session")?.value || "";
   const isAuthPage = req.nextUrl.pathname.startsWith("/auth");

   if (session) {
      try {
         await firebaseAuthAdmin.verifySessionCookie(session, true);

         if (isAuthPage) {
            return NextResponse.redirect(new URL("/", req.url));
         }

         return NextResponse.next();
      } catch (error) {
         console.error("Error verifying session cookie:", error);
      }
   }

   if (!isAuthPage) {
      const redirectUrl = new URL("/auth", req.url);
      redirectUrl.searchParams.set("from", req.nextUrl.pathname);
      return NextResponse.redirect(redirectUrl);
   }

   return NextResponse.next();
}

export const config = {
   matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"]
};
