"use server";

import { CACHE_KEY } from "@/cacheKeys";
import db from "@/drizzle/db";
import { UsersTable } from "@/drizzle/schema";
import { actionClient } from "@/lib/safeAction";
import { revalidateTag } from "next/cache";
import { z } from "zod";
import { zfd } from "zod-form-data";

export const createUser = actionClient
  .schema(
    zfd.formData({
      name: zfd.text(z.string().min(1, "Name is required")),
      email: zfd.text(z.string().email()),
    })
  )
  .action(async ({ parsedInput: { email, name } }) => {
    await db.insert(UsersTable).values({
      name,
      email,
    });

    revalidateTag(CACHE_KEY.users);
  });
