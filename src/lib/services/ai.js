import config from "@/lib/config";
import { calculateCreditCost } from "@/lib/utils/pricing";
import { createAdminClient } from "@/lib/supabase";

const supabase = () => createAdminClient();

export const AIService = {
  getCreditCost(modelId, duration, resolution) {
    return calculateCreditCost(modelId, duration, resolution);
  },

  async generate({ maleImage, femaleImage, prompt, modelId, aspectRatio = "16:9", duration, stitchedImage, resolution }) {
    if (!maleImage || !femaleImage) {
      throw new Error("Both male and female images are required.");
    }
    if (!stitchedImage) {
      throw new Error("Merged image is required.");
    }

    const model = config.ai.models[modelId];
    if (!model) throw new Error(`Invalid model selected: ${modelId}`);

    const cost = this.getCreditCost(modelId, duration, resolution);

    const apiKey = config.ai.apiKey;
    if (!apiKey) throw new Error("MUAPIAPP_API_KEY is not configured");

    const bodyPayload = {
      prompt: prompt,
      webhook: `${config.auth.webhook_url}/api/webhooks/ai`
    };

    if (modelId === "veo3.1-image-to-video") {
      bodyPayload.image_url = stitchedImage;
      bodyPayload.aspect_ratio = aspectRatio;
      bodyPayload.duration = 8;
      bodyPayload.resolution = resolution || "720p";
    } else if (modelId === "wan2.7-image-to-video") {
      bodyPayload.image_url = stitchedImage;
      bodyPayload.resolution = resolution || "720p";
      bodyPayload.duration = parseInt(duration) || 5;
    } else if (modelId === "gemini-omni-image-to-video") {
      bodyPayload.image_urls = [stitchedImage];
      bodyPayload.aspect_ratio = aspectRatio;
      bodyPayload.resolution = resolution || "1080p";
      bodyPayload.duration = parseInt(duration) || 8;
    } else if (modelId === "grok-imagine-image-to-video") {
      bodyPayload.images_list = [stitchedImage];
      bodyPayload.aspect_ratio = aspectRatio;
      bodyPayload.resolution = resolution || "480p";
      bodyPayload.duration = parseInt(duration) || 6;
      bodyPayload.mode = "normal";
    } else {
      bodyPayload.image_url = stitchedImage;
      bodyPayload.aspect_ratio = aspectRatio;
    }

    const submitRes = await fetch(model.endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
      },
      body: JSON.stringify(bodyPayload),
    });

    if (!submitRes.ok) {
      const errorText = await submitRes.text();
      throw new Error(`API Submission Failed: ${submitRes.status} ${errorText}`);
    }

    const { request_id } = await submitRes.json();
    if (!request_id) {
      throw new Error("No request_id received from API");
    }

    const db = supabase();
    const { data: creation, error } = await db
      .from("kissing_video_creations")
      .insert({
        male_image: maleImage,
        female_image: femaleImage,
        stitched_image: stitchedImage,
        prompt: prompt,
        model_id: modelId,
        aspect_ratio: aspectRatio,
        duration: modelId === "veo3.1-image-to-video" ? 8 : (parseInt(duration) || 5),
        request_id: request_id,
        status: "processing",
        credit_cost: cost,
        resolution: resolution || "720p",
      })
      .select("*")
      .single();

    if (error) throw new Error(`Database insert failed: ${error.message}`);

    return creation;
  },

  async processResult(requestId, result) {
    console.log("[AI_SERVICE_PROCESS_RESULT] RequestId:", requestId);
    console.log("[AI_SERVICE_PROCESS_RESULT] Payload:", JSON.stringify(result));

    const db = supabase();
    const { data: creation, error } = await db
      .from("kissing_video_creations")
      .select("*")
      .eq("request_id", requestId)
      .maybeSingle();

    if (error || !creation) return null;

    if (creation.status === "completed") {
      return { status: "completed", resultVideo: creation.result_video };
    }

    if (creation.status === "failed") {
      return { status: "failed", error: creation.error };
    }

    const status = result.status || result.state;
    if (status === "completed" || status === "succeeded") {
      const outputs = result.outputs || [];
      const outputUrl = outputs[0] || (typeof result.output === 'string' ? result.output : result.output?.urls?.get || result.output?.video);

      if (outputUrl) {
        const { data: updated } = await db
          .from("kissing_video_creations")
          .update({
            status: "completed",
            result_video: outputUrl,
          })
          .eq("request_id", requestId)
          .select("*")
          .single();

        return { status: "completed", resultVideo: updated?.result_video || outputUrl };
      }
    } else if (status === "failed") {
      const errorMsg = result.error || "Prediction failed";

      await db
        .from("kissing_video_creations")
        .update({
          status: "failed",
          error: errorMsg,
        })
        .eq("request_id", requestId);

      return { status: "failed", error: errorMsg };
    }

    return { status: "processing" };
  },

  async checkStatus(requestId) {
    const res = await this.processResult(requestId, {});
    if (res && res.status !== "processing") return res;

    const apiKey = config.ai.apiKey;
    if (!apiKey) throw new Error("API Key is not configured");

    try {
      const res = await fetch(config.ai.pollEndpoint(requestId), {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": apiKey,
        }
      });

      if (res.ok) {
        const result = await res.json();
        return await this.processResult(requestId, result);
      }
    } catch (e) {
      console.error("Polling error:", e);
    }

    return { status: "processing" };
  }
};
