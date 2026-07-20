import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";

export async function GET() {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    return NextResponse.json({
      id: user.id,
      credits: user.credits,
      name: user.name,
      email: user.email,
      image: user.image,
    });
  } catch (error) {
    console.error("[ME_API_ERROR]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
