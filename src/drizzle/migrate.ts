import "dotenv/config";

import { drizzle } from "drizzle-orm/neon-serverless";
import { migrate } from "drizzle-orm/neon-serverless/migrator";
import * as schema from "./schema";
import { Pool } from "@neondatabase/serverless";

const pool = new Pool({ connectionString: process.env.DB_URL! });
export const db = drizzle(pool, {
  schema,
});

const main = async () => {
  try {
    await migrate(db, {
      migrationsFolder: "./src/drizzle/migrations",
    });
    console.log("migration successful");
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

main();
