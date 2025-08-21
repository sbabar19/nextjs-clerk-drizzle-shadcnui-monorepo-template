"use server"

import { auth } from "@clerk/nextjs/server"
import { db } from "@workspace/backend/db"
import { usersTable } from "@workspace/backend/db/schema"

export async function createUser() {
  const { userId: clerkId } = await auth()

  if (!clerkId) {
    return { success: false, msg: "User not found" }
  }

  await db.insert(usersTable).values({
    id: clerkId,
  })

  return { success: true, msg: "Customer added successfully" }
}
