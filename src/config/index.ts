import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve(process.cwd(), `.env`) });

export const config = {
  baseUrl: process.env.NEXT_PUBLIC_BASE_URL || "",
  // baseUrl: process.env.BASE_URL || "http://localhost:5001/api",
};
