import { NextRequest, NextResponse } from "next/server";
import { firebaseAuthAdmin } from "@/lib/firebase/configs/server";

export async function GET(req: NextRequest) {
   const sessionCookie = req.cookies.get("session")?.value || "";

   if (!sessionCookie) {
      return NextResponse.json({ authenticated: false });
   }

   try {
      const { uid } = await firebaseAuthAdmin.verifySessionCookie(sessionCookie, true);
      const user = await firebaseAuthAdmin.getUser(uid);

      return NextResponse.json({
         authenticated: true,
         user: {
            uid: user.uid,
            email: user.email,
            emailVerified: user.emailVerified,
            displayName: user.displayName,
            phoneNumber: user.phoneNumber,
            photoURL: user.photoURL,
            customClaims: user.customClaims
         }
      });
   } catch (error) {
      console.error("Error verifying session:", error);
      return NextResponse.json({ authenticated: false });
   }
}
