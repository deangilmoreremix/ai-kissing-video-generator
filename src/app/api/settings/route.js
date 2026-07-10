import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

// GET the current user's stored API key (masked) and connection status
export async function GET() {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const dbUser = await prisma.user.findUnique({
      where: { id: user.id },
      select: { muApiKey: true },
    });

    const hasKey = Boolean(dbUser?.muApiKey);

    return NextResponse.json({
      hasKey,
      // Return a masked preview so the UI can show the key is set without leaking it
      maskedKey: hasKey ? maskKey(dbUser.muApiKey) : null,
    });
  } catch (error) {
    console.error("[SETTINGS_GET_ERROR]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

// POST to save (or clear) the user's MuAPI key
export async function POST(req) {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { muApiKey } = await req.json();

    // Accept a trimmed key, or allow clearing by sending an empty string
    const cleaned = typeof muApiKey === "string" ? muApiKey.trim() : "";

    await prisma.user.update({
      where: { id: user.id },
      data: { muApiKey: cleaned || null },
    });

    const hasKey = Boolean(cleaned);

    return NextResponse.json({
      hasKey,
      maskedKey: hasKey ? maskKey(cleaned) : null,
    });
  } catch (error) {
    console.error("[SETTINGS_POST_ERROR]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

function maskKey(key) {
  if (!key || key.length <= 8) return "••••••••";
  return `${key.slice(0, 4)}••••••••${key.slice(-4)}`;
}
