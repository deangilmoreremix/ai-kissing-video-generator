import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";

// Returns the current user's app-level profile (credits + API key status)
export async function GET() {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    return NextResponse.json({
      id: user.id,
      credits: user.credits,
      hasApiKey: Boolean(user.muApiKey),
    });
  } catch (error) {
    console.error("[USER_GET_ERROR]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
