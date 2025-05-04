import db from "@/lib/drizzle/db";
import { UsersTable } from "@/lib/drizzle/schema";
import { ilike } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  const name = req.nextUrl.searchParams.get("name");

  const strName = decodeURIComponent(name ?? "");

  const users = await db
    .select({
      name: UsersTable.name,
      email: UsersTable.email,
      id: UsersTable.id,
    })
    .from(UsersTable)
    .where(ilike(UsersTable.name, `%${strName}%`))
    .limit(5);

  return NextResponse.json({ users }, { status: 200 });
};
