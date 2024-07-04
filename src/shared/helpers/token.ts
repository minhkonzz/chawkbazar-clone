import { NextRequest, NextResponse } from "next/server";
import { env } from "@/configs";
import { decodeJwt, SignJWT } from "jose";

const {
   ACCESS_TOKEN_KEYNAME,
   ACCESS_TOKEN_EXPIRE,
   ACCESS_TOKEN_SECRET,
   REFRESH_TOKEN_KEYNAME,
   REFRESH_TOKEN_EXPIRE,
   REFRESH_TOKEN_SECRET
} = env;

export default class TokenHelper {
   static getTokensFromRequest(req: NextRequest) {
      const cookies = req.cookies;
      return {
         accessToken: cookies.get(TokenHelper.getAccessTokenKeyName())?.value,
         refreshToken: cookies.get(TokenHelper.getRefreshTokenKeyName())?.value,
      };
   }

   static setCookies(res: NextResponse, accessToken: string = "", refreshToken: string = "") {
      if (accessToken) {
         res.cookies.set({
            name: TokenHelper.getAccessTokenKeyName(),
            value: accessToken,
            expires: new Date(Date.now() + TokenHelper.getAccessTokenExpireTime()),
            httpOnly: true,
            secure: true,
            sameSite: "strict",
         });
      }

      if (refreshToken) {
         res.cookies.set({
            name: TokenHelper.getRefreshTokenKeyName(),
            value: refreshToken,
            expires: new Date(Date.now() + TokenHelper.getRefreshTokenExpireTime()),
            httpOnly: true,
            secure: true,
            sameSite: "strict",
         });
      }

      return res;
   }

   static parseToken(
         token: string
      ): any {
      return decodeJwt(token);
   }

   static async sign(payload: any, expire: number, isRefreshToken: boolean = false): Promise<string> {
      const secret = Uint8Array.from(
         (isRefreshToken ? REFRESH_TOKEN_SECRET : ACCESS_TOKEN_SECRET)!
            .split("")
            .map(c => c.charCodeAt(0))
      );
      return await new SignJWT(payload)
         .setProtectedHeader({ alg: "HS256" })
         .setExpirationTime(expire)
         .sign(secret);
   }

   static getAccessTokenKeyName(): string {
      return ACCESS_TOKEN_KEYNAME || "access_token";
   }

   static getAccessTokenExpireTime(): number {
      return +ACCESS_TOKEN_EXPIRE! || 5 * 60 * 1000; // 5mins by default
   }

   static getRefreshTokenKeyName(): string {
      return REFRESH_TOKEN_KEYNAME || "refresh_token";
   }

   static getRefreshTokenExpireTime(): number {
      return +REFRESH_TOKEN_EXPIRE! || 20 * 60 * 1000; // 20mins by default
   }
}