import { NextResponse } from "next/server";
import { AIService } from "@/lib/services/ai";
import { createAdminClient } from "@/lib/supabase";

const supabase = () => createAdminClient();

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const requestId = searchParams.get("requestId");

    if (requestId) {
      const statusData = await AIService.checkStatus(requestId);
      return NextResponse.json(statusData);
    }

    const db = supabase();
    const { data: creations, error } = await db
      .from("kissing_video_creations")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("[CREATIONS_GET_ERROR]", error);
      return new NextResponse("Internal Error", { status: 500 });
    }

    return NextResponse.json(creations || []);
  } catch (error) {
    console.error("[CREATIONS_GET_ERROR]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function POST(req) {
  try {
    const { maleImage, femaleImage, stitchedImage, prompt, modelId, aspectRatio, duration, resolution } = await req.json();

    if (!maleImage || !femaleImage || !stitchedImage) {
      return new NextResponse("Missing maleImage, femaleImage or stitchedImage", { status: 400 });
    }
    if (!prompt) {
      return new NextResponse("Missing prompt", { status: 400 });
    }
    if (!modelId) {
      return new NextResponse("Missing modelId", { status: 400 });
    }

    const creation = await AIService.generate({
      maleImage,
      femaleImage,
      stitchedImage,
      prompt,
      modelId,
      aspectRatio: aspectRatio || "16:9",
      duration,
      resolution,
    });

    return NextResponse.json(creation);
  } catch (error) {
    console.error("[CREATIONS_POST_ERROR]", error);
    return new NextResponse(error.message || "Internal Error", { status: 500 });
  }
}
