import { env } from "@/configs";
import { decodeJwt, SignJWT, type JWTPayload } from "jose";

export const generateToken = ({
   payload, 
   expires = "1h"
} : {
   payload: JWTPayload,
   expires?: string | number | Date
}): Promise<string> => {
   const secret = Uint8Array.from(
      env.TOKEN_SECRET!
         .split("")
         .map(c => c.charCodeAt(0))
   );
   return new SignJWT(payload)
      .setProtectedHeader({ alg: "HS256" })
      .setExpirationTime(expires)
      .sign(secret);
};

export const parseToken = (token: string) => {
   return decodeJwt(token);
}