import "dotenv/config";

import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { migrate } from "drizzle-orm/neon-http/migrator";
import * as schema from "./schema";

const sql = neon(process.env.DB_URL!);

export const db = drizzle(sql, {
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
  } finally {
  }
};

// main();
