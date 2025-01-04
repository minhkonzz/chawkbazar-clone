import { NextRequest, NextResponse } from "@/configs/imports-wrapper";
import { firebaseAuthAdmin } from "@/lib/firebase/configs/server";
import { constants } from "@/configs";

const { CHECK_TOKEN_REVOKED, TOKEN_EXPIRES } = constants;

export async function POST(req: NextRequest) {
  const { idToken, userId } = await req.json();
  const verifiedIdToken = await firebaseAuthAdmin.verifyIdToken(
    idToken,
    CHECK_TOKEN_REVOKED
  );

  if (!verifiedIdToken) return NextResponse.json({ user: null });

  const sessionCookie = await firebaseAuthAdmin.createSessionCookie(idToken, {
    expiresIn: TOKEN_EXPIRES
  });
  
  const user = await firebaseAuthAdmin.getUser(userId);
  const response = NextResponse.json({
    user: {
      uid: user.uid,
      email: user.email,
      emailVerified: user.emailVerified,
      displayName: user.displayName,
      customClaims: user.customClaims
    }
  });
  response.cookies.set("session", sessionCookie, {
    maxAge: TOKEN_EXPIRES,
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production"
  });
  return response;
}
