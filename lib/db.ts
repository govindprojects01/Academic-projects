import { neon } from "@neondatabase/serverless";

const dbUrl =
  process.env.DATABASE_URL ||
  "postgresql://neondb_owner:npg_VXKorQy5S9ka@ep-long-water-aypt0wfr-pooler.c-5.us-east-2.aws.neon.tech/neondb?sslmode=require";

export const sql = neon(dbUrl);
