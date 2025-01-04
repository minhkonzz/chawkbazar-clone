import { env } from "@/configs";
import {
  decodeJwt,
  SignJWT,
  EncryptJWT,
  jwtDecrypt,
  type JWTPayload,
  type JWTDecryptGetKey
} from "jose";

const KEY_MANAGEMENT_ALG = env.KEY_MANAGEMENT_ALG as string;
const CONTENT_ENCRYPTION_ALG = env.CONTENT_ENCRYPTION_ALG as string;
const ENCRYPTION_KEY = env.ENCRYPTION_KEY as unknown as JWTDecryptGetKey;

export const generateToken = ({
  payload,
  expires = "1h"
}: {
  payload: JWTPayload;
  expires?: string | number | Date;
}): Promise<string> => {
  const secret = Uint8Array.from(
    env.TOKEN_SECRET!.split("").map(c => c.charCodeAt(0))
  );
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime(expires)
    .sign(secret);
};

export const parseToken = (token: string) => {
  return decodeJwt(token);
};

export const buildJWE = async <T extends JWTPayload>(payload: T) => {
  const encryptionKey = Buffer.from(env.ENCRYPTION_KEY!, "base64");

  return await new EncryptJWT(payload)
    .setProtectedHeader({ alg: KEY_MANAGEMENT_ALG, enc: CONTENT_ENCRYPTION_ALG })
    .encrypt(encryptionKey);
};

export const decodeJWE = async <T extends JWTPayload>(jweToken: string) => {
  const encryptionKey = Buffer.from(env.ENCRYPTION_KEY!, "base64");
  const { payload } = await jwtDecrypt(
    jweToken,
    encryptionKey,
    {
      keyManagementAlgorithms: [KEY_MANAGEMENT_ALG],
      contentEncryptionAlgorithms: [CONTENT_ENCRYPTION_ALG]
    }
  );
  return payload as T;
};
