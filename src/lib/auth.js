import { auth, currentUser } from "@clerk/nextjs/server";
import { prisma } from "./prisma";

/**
 * Clerk -> Prisma user bridge.
 *
 * Returns the application's Prisma `User` for the currently signed-in Clerk
 * identity, creating (or refreshing) the record on first use. All downstream
 * code should use the returned `user.id` to scope creations, credits and the
 * per-user MuAPI key.
 */
export async function getCurrentUser() {
  const { userId } = await auth();
  if (!userId) return null;

  const existing = await prisma.user.findUnique({ where: { clerkId: userId } });
  if (existing) return existing;

  const clerkUser = await currentUser();
  const email = clerkUser?.emailAddresses?.[0]?.emailAddress ?? null;
  const name =
    [clerkUser?.firstName, clerkUser?.lastName].filter(Boolean).join(" ") ||
    clerkUser?.username ||
    null;
  const image = clerkUser?.imageUrl ?? null;

  return await prisma.user.upsert({
    where: { clerkId: userId },
    update: { email, name, image },
    create: { clerkId: userId, email, name, image },
  });
}

/**
 * Lightweight guard that returns the Prisma user id or null.
 * Use inside API route handlers to short-circuit unauthenticated requests.
 */
export async function requireUserId() {
  const { userId } = await auth();
  if (!userId) return null;
  const user = await prisma.user.findUnique({ where: { clerkId: userId } });
  return user?.id ?? null;
}
