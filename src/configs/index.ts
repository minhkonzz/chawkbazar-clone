const constants = {
   INCREASE_ONCE: 1,
   DECREASE_ONCE: -1,
   TOAST_DURATION: 4000,
   DEFAULT_QUANTITY: 1,
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
   FIREBASE_API_KEY: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
   FIREBASE_AUTH_DOMAIN: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
   FIREBASE_PROJECT_ID: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
   FIREBASE_STORAGE_BUCKET: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
   FIREBASE_MESSAGING_SENDER_ID:
      process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
   FIREBASE_APP_ID: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
   FIREBASE_MEASUREMENT_ID: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
   BASE_URL: process.env.NEXT_PUBLIC_BASE_URL,
   PRODUCT_IMAGE_STORAGE: process.env.NEXT_PUBLIC_PRODUCT_IMAGE_STORAGE,
   BANNER_IMAGE_STORAGE: process.env.NEXT_PUBLIC_BANNER_IMAGE_STORAGE,
   BRAND_IMAGE_STORAGE: process.env.NEXT_PUBLIC_BRAND_IMAGE_STORAGE,
   BRAND_LOGO_STORAGE: process.env.NEXT_PUBLIC_BRAND_LOGO_STORAGE,
   MODERN_IMAGE_STORAGE: process.env.NEXT_PUBLIC_MODERN_IMAGE_STORAGE,
   ACCESS_TOKEN_KEYNAME: process.env.ACCESS_TOKEN_KEYNAME,
   ACCESS_TOKEN_EXPIRE: process.env.ACCESS_TOKEN_EXPIRE,
   ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET,
   REFRESH_TOKEN_KEYNAME: process.env.REFRESH_TOKEN_KEYNAME,
   REFRESH_TOKEN_EXPIRE: process.env.REFRESH_TOKEN_EXPIRE,
   REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET
};

export { constants, env };
