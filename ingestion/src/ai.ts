import { fileURLToPath } from "node:url";
import OpenAI from "openai";

try {
  process.loadEnvFile(fileURLToPath(new URL("../../.env", import.meta.url)));
} catch (error) {
  if (
    !(error instanceof Error) ||
    !("code" in error) ||
    error.code !== "ENOENT"
  )
    throw error;
}

const defaultModel = "deepseek/deepseek-v4-flash-0731";

export function createAIClient(): OpenAI {
  if (!process.env.OPENROUTER_API_KEY)
    throw new Error(
      "OPENROUTER_API_KEY is required for discovery, classification, extraction, and synthesis. Use tests with injected mocks.",
    );
  return new OpenAI({
    apiKey: process.env.OPENROUTER_API_KEY,
    baseURL: process.env.OPENROUTER_BASE_URL ?? "https://openrouter.ai/api/v1",
    defaultHeaders: {
      ...(process.env.OPENROUTER_HTTP_REFERER
        ? { "HTTP-Referer": process.env.OPENROUTER_HTTP_REFERER }
        : {}),
      "X-OpenRouter-Title":
        process.env.OPENROUTER_APP_NAME ?? "AI Knowledge Wiki",
    },
  });
}

export const model =
  process.env.OPENWIKI_MODEL_ID ?? process.env.OPENROUTER_MODEL ?? defaultModel;
