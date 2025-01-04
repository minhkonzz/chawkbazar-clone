const constants = {
   APP_NAME: "chawkbazar",
   INCREASE_ONCE: 1,
   DECREASE_ONCE: -1,
   TOAST_DURATION: 4000,
   DEFAULT_QUANTITY: 1,
   CHECK_TOKEN_REVOKED: true,
   FORCE_REFRESH_TOKEN: true,
   TOKEN_EXPIRES: 60 * 60 * 24 * 5 * 1000, // 5 days
   regex: {
      EMAIL_REGEX: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
      PASSWORD_REGEX: /^(?=.*[~!@#$%^&*(),.?":{}|<>])(?=.*[A-Z]).{8,15}$/g,
      ALPHANUMERIC_REGEX: /^[^~!@#$%^&*(),.?":{}<>]+$/g,
      NAME_REGEX: /^[^~!@#$%^&*(),.?":{}<>0-9]+$/g,
      USERNAME_REGEX: /^\w+$/g,
      NUMERIC_REGEX: /^[0-9]+$/g,
      AMOUNT_PATTERN: /^(?=[^0])[0-9]+$/g
   }
};

const env = {
   STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
   STRIPE_PUBLISH_KEY: process.env.NEXT_PUBLIC_STRIPE_PUBLISH_KEY,
   FIREBASE_PRIVATE_KEY: process.env.FIREBASE_PRIVATE_KEY,
   FIREBASE_CLIENT_EMAIL: process.env.FIREBASE_CLIENT_EMAIL,
   FIREBASE_API_KEY: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
   FIREBASE_AUTH_DOMAIN: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
   FIREBASE_PROJECT_ID: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
   FIREBASE_STORAGE_BUCKET: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
   FIREBASE_MESSAGING_SENDER_ID: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
   FIREBASE_APP_ID: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
   FIREBASE_MEASUREMENT_ID: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
   BASE_URL: process.env.NODE_ENV !== "development" && process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000",
   TOKEN_SECRET: process.env.TOKEN_SECRET,
   SMTP_HOST: process.env.SMTP_HOST,
   SMTP_PORT: process.env.SMTP_PORT,
   SMTP_USER: process.env.SMTP_USER,
   SMTP_PASS: process.env.SMTP_PASS
};

export { constants, env };
