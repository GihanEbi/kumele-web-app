import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve(process.cwd(), `.env`) });

export const config = {
  baseUrl: process.env.BASE_URL || "http://5.189.162.126:5001/api",
};
