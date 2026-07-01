/**
 * Centralized configuration for the AI Kissing Video Generator application.
 */

const config = {
  appName: "Ai Kissing Video Generator",
  webhookUrl: process.env.WEBHOOK_URL || process.env.NEXTAUTH_URL || "http://localhost:3000",
  ai: {
    apiKey: process.env.MU_API_KEY,
    uploadEndpoint: "https://api.muapi.ai/api/v1/upload_file",
    pollEndpoint: (requestId) => `https://api.muapi.ai/api/v1/predictions/${requestId}/result`,
    models: {
      "veo3.1-image-to-video": {
        id: "veo3.1-image-to-video",
        name: "Veo 3.1 Pro (Image to Video)",
        creditCost: 25,
        endpoint: "https://api.muapi.ai/api/v1/veo3.1-image-to-video",
        description: "Google's state-of-the-art cinematic video generator, producing 8s high-quality videos."
      },
      "wan2.7-image-to-video": {
        id: "wan2.7-image-to-video",
        name: "Wan 2.7 (Image to Video)",
        creditCost: 1,
        endpoint: "https://api.muapi.ai/api/v1/wan2.7-image-to-video",
        description: "Ultra-fast high-motion video generator, great for quick dynamic kisses."
      },
      "gemini-omni-image-to-video": {
        id: "gemini-omni-image-to-video",
        name: "Gemini Omni (Image to Video)",
        creditCost: 15,
        endpoint: "https://api.muapi.ai/api/v1/gemini-omni-image-to-video",
        description: "Highly semantic Google Omni model with excellent facial and hand coherence."
      },
      "grok-imagine-image-to-video": {
        id: "grok-imagine-image-to-video",
        name: "Grok Imagine (Image to Video)",
        creditCost: 2,
        endpoint: "https://api.muapi.ai/api/v1/grok-imagine-image-to-video",
        description: "X's Grok dynamic video creator with extreme creative layout understanding."
      }
    }
  },
};

export default config;
