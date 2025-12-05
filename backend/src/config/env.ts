import dotenv from 'dotenv';

dotenv.config();


export const PORT = process.env.PORT || "";
// export  const MONGO_URI = process.env.MONGO_RRI || "";
export const JWT_SECRET = process.env.JWT_SECRET || "default";
export const CLIENT_URL = process.env.CLIENT_URL || "http://localhost:5173";
export const VERSEL_URL = process.env.VERCEL_URL
