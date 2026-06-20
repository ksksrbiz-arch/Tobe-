// Thin wrapper around Groq's OpenAI-compatible Chat Completions API.
//
// Groq is a drop-in for the OpenAI chat API (same request/response shape) and
// has a generous free tier, so we call it directly with fetch instead of
// pulling in an SDK. The key lives in GROQ_API_KEY; the model can be overridden
// with GROQ_MODEL (defaults to a fast, capable Llama 3.3 model).

import { fetchWithTimeout } from "@/lib/server/functionHardening";

const GROQ_ENDPOINT = "https://api.groq.com/openai/v1/chat/completions";
const DEFAULT_MODEL = "llama-3.3-70b-versatile";

export function getGroqApiKey(): string | undefined {
  return process.env.GROQ_API_KEY;
}

interface ChatJSONOptions {
  system: string;
  user: string;
  temperature?: number;
  maxTokens?: number;
  timeoutMs?: number;
}

/**
 * Run a single chat completion that is constrained to return a JSON object
 * (Groq's `response_format: { type: "json_object" }`), parse it, and return the
 * decoded value. Throws on transport, HTTP, empty-body, or JSON-parse errors so
 * callers can map them to a single failure path.
 */
export async function chatJSON<T = unknown>({
  system,
  user,
  temperature = 0.5,
  maxTokens = 1024,
  timeoutMs = 15_000,
}: ChatJSONOptions): Promise<T> {
  const apiKey = getGroqApiKey();
  if (!apiKey) {
    throw new Error("GROQ_API_KEY is not set.");
  }

  const res = await fetchWithTimeout(
    GROQ_ENDPOINT,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: process.env.GROQ_MODEL ?? DEFAULT_MODEL,
        temperature,
        max_tokens: maxTokens,
        response_format: { type: "json_object" },
        messages: [
          { role: "system", content: system },
          { role: "user", content: user },
        ],
      }),
    },
    timeoutMs,
  );

  if (!res.ok) {
    const detail = await res.text().catch(() => "");
    throw new Error(`Groq request failed (HTTP ${res.status}): ${detail.slice(0, 200)}`);
  }

  const payload = (await res.json()) as {
    choices?: Array<{ message?: { content?: string } }>;
  };
  const content = payload.choices?.[0]?.message?.content;
  if (!content) {
    throw new Error("Groq returned an empty response.");
  }

  return JSON.parse(content) as T;
}
