import { type NextRequest, NextResponse } from 'next/server';
import { firebaseAuthAdmin } from '@/lib/firebase/configs/server';

export async function POST(req: NextRequest) {
   const sessionCookie = req.cookies.get('session')?.value;
   if (sessionCookie) {
      try {
         const decodedClaims = await firebaseAuthAdmin.verifySessionCookie(sessionCookie);
         await firebaseAuthAdmin.revokeRefreshTokens(decodedClaims.sub);
      } catch (error) {
         console.error('Error revoking refresh tokens:', error);
      }
   }

   const response = NextResponse.redirect(new URL("/", req.url));
   response.cookies.delete('session');
   return response;
}