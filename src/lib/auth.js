import { auth } from "@clerk/nextjs/server";
import { prisma } from "./prisma";

/**
 * Resolves the local application User row for the currently signed-in Clerk
 * user. If no local row exists yet, one is created (upsert) so credits can be
 * tracked. Returns null when there is no authenticated user.
 */
export async function getCurrentUser() {
  const { userId } = await auth();

  if (!userId) {
    return null;
  }

  const user = await prisma.user.findUnique({
    where: { clerkUserId: userId },
  });

  if (user) {
    return user;
  }

  return await prisma.user.create({
    data: { clerkUserId: userId },
  });
}

/**
 * Returns the Clerk userId or null. Use this in API routes that only need to
 * know whether a request is authenticated.
 */
export async function getClerkUserId() {
  const { userId } = await auth();
  return userId ?? null;
}
