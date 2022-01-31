export const {
  SESSION_SECRET,
  CORS_ORIGIN_URL,
  ACCESS_TOKEN,
  MP_EXTERNAL_REFERENCE_EMAIL,
  PORT,
} = process.env;
export const PROD = process.env.NODE_ENV === "production";
export const COOKIE_NAME = "qid";
export const SESSION_TTL = 315360e6; // 10 years
export const SESSION_KEY = "data";
