import { GoogleGenAI, type Content } from "@google/genai";
import { buildSystemPrompt } from "@/lib/systemPrompt";
import { checkRateLimit, getClientKey } from "@/lib/rateLimit";

export const runtime = "nodejs";

// gemini-3.5-flash: free tier on Google AI Studio (no credit card), good
// quality/latency balance for a conversational portfolio chat. Verified live
// against the API (2026-09): gemini-2.5-flash and gemini-2.5-flash-lite are
// retired for new accounts, and gemini-3.6-flash was returning persistent 503s
// (high demand) — gemini-3.5-flash was the newest tier responding reliably.
// If this later needs to change, verify live with a one-off generateContent
// call before trusting any cached docs/training-data model name.
const MODEL = process.env.GEMINI_MODEL || "gemini-3.5-flash";
// Headroom so an answer never gets chopped mid-word. The system prompt is
// what actually keeps replies short (2-4 sentences); this is just the hard
// ceiling behind it, not the intended length.
const MAX_OUTPUT_TOKENS = 1400;
const MAX_MESSAGES = 12; // how many turns of history we forward to the model
const MAX_MESSAGE_CHARS = 1200;

type ChatMessage = { role: "user" | "assistant"; content: string };

function isValidHistory(value: unknown): value is ChatMessage[] {
  if (!Array.isArray(value) || value.length === 0) return false;
  return value.every(
    (m) =>
      m &&
      typeof m === "object" &&
      (m.role === "user" || m.role === "assistant") &&
      typeof m.content === "string" &&
      m.content.length > 0 &&
      m.content.length <= MAX_MESSAGE_CHARS
  );
}

export async function POST(req: Request) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return jsonError(
      500,
      "El chat aún no está configurado: falta GEMINI_API_KEY en el servidor."
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return jsonError(400, "Cuerpo de la solicitud inválido.");
  }

  const messages =
    body && typeof body === "object" ? (body as Record<string, unknown>).messages : undefined;

  if (!isValidHistory(messages)) {
    return jsonError(
      400,
      "Formato de mensajes inválido o mensaje demasiado largo (máx. 1200 caracteres)."
    );
  }

  const clientKey = getClientKey(req.headers);
  const rate = checkRateLimit(clientKey);
  if (!rate.allowed) {
    const minutes = Math.ceil(rate.resetInMs / 60000);
    return jsonError(
      429,
      `Has alcanzado el límite de mensajes por ahora. Intenta de nuevo en ~${minutes} min.`
    );
  }

  const trimmedHistory = messages.slice(-MAX_MESSAGES);
  const contents: Content[] = trimmedHistory.map((m) => ({
    role: m.role === "assistant" ? "model" : "user",
    parts: [{ text: m.content }],
  }));

  const ai = new GoogleGenAI({ apiKey });

  try {
    const stream = await ai.models.generateContentStream({
      model: MODEL,
      contents,
      config: {
        systemInstruction: buildSystemPrompt(),
        maxOutputTokens: MAX_OUTPUT_TOKENS,
        // Critical: Gemini 3.x models spend "thinking" tokens out of the SAME
        // maxOutputTokens budget. Left on, a question that needs any reasoning
        // burns the whole budget internally and the visible answer comes back
        // truncated mid-word — or completely empty. This chat just restates
        // facts already in the system prompt, so reasoning buys nothing here.
        thinkingConfig: { thinkingBudget: 0 },
      },
    });

    const encoder = new TextEncoder();
    const readable = new ReadableStream<Uint8Array>({
      async start(controller) {
        try {
          for await (const chunk of stream) {
            const text = chunk.text;
            if (text) controller.enqueue(encoder.encode(text));
          }
          controller.close();
        } catch (err) {
          controller.error(err);
        }
      },
    });

    return new Response(readable, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-store",
        "X-RateLimit-Remaining": String(rate.remaining),
      },
    });
  } catch (err) {
    console.error("Gemini API error:", err);
    return jsonError(502, "Error del proveedor de IA generando la respuesta.");
  }
}

function jsonError(status: number, message: string) {
  return new Response(JSON.stringify({ error: message }), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}
