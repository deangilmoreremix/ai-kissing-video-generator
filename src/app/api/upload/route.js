import { NextResponse } from "next/server";
import config from "@/lib/config";

export async function POST(req) {
  try {
    const key = req.headers.get("x-mu-api-key") || config.ai.apiKey;
    if (!key) {
      return new NextResponse("MUAPI key missing. Please add your key in Settings.", { status: 400 });
    }

    const formData = await req.formData();
    const file = formData.get("file");

    if (!file) {
      return new NextResponse("No file provided", { status: 400 });
    }

    console.log(`[UPLOAD_API] File details: name=${file.name}, size=${file.size}, type=${file.type}`);

    const muapiFormData = new FormData();
    muapiFormData.append("file", file);

    const response = await fetch(config.ai.uploadEndpoint, {
      method: "POST",
      headers: {
        "x-api-key": key,
      },
      body: muapiFormData,
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`[UPLOAD_API] MuAPI returned error status ${response.status}: ${errorText}`);
      throw new Error(`MuAPI Upload Failed: ${response.status} ${errorText}`);
    }

    const data = await response.json();
    console.log(`[UPLOAD_API] MuAPI returned success data:`, data);
    return NextResponse.json(data);
  } catch (error) {
    console.error("[UPLOAD_ERROR_DETAILED]", error);
    return new NextResponse(error.message || "Internal Error", { status: 500 });
  }
}
