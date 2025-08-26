import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve(process.cwd(), `.env`) });

export const config = {
  baseUrl: process.env.BASE_URL || "http://localhost:5001/api",
};
