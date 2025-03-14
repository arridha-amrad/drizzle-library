import { Pool } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-serverless";
import { Pool as DevPool } from "pg";
import { drizzle as devDrizzle } from "drizzle-orm/node-postgres";
import * as schema from "./schema";

const db =
  process.env.NODE_ENV === "development"
    ? devDrizzle(new DevPool({ connectionString: process.env.DEV_DB_URL }), {
        schema,
      })
    : drizzle(new Pool({ connectionString: process.env.DB_URL }), {
        schema,
      });

export default db;
