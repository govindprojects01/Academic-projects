import { neon } from "@neondatabase/serverless";

const dbUrl = process.env.DATABASE_URL;

if (!dbUrl) {
  throw new Error("DATABASE_URL is not configured");
}

export const sql = neon(dbUrl);
