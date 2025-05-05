import { LIMIT_USERS } from "@/constants";
import db from "@/lib/drizzle/db";
import { UsersTable } from "@/lib/drizzle/schema";
import { desc, ilike } from "drizzle-orm";

export const searchUser = async (name: string) => {
  const users = await db
    .select()
    .from(UsersTable)
    .where(ilike(UsersTable.name, `%${name}%`))
    .orderBy(desc(UsersTable.createdAt))
    .limit(LIMIT_USERS);

  return users;
};
