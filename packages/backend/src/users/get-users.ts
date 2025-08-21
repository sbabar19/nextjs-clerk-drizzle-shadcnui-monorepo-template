"use server";

import { db } from "@workspace/backend/db";
import { usersTable } from "@workspace/backend/db/schema";

export const getUsers = async () => {
  const users = await db.select().from(usersTable);
  return users;
};
