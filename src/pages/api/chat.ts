import type { APIRoute } from 'astro';
import { ordersliftKnowledge } from '../../data/orderslift-knowledge';

// This route renders on-demand as a Netlify function (everything else stays static).
export const prerender = false;

// Free-tier Gemini model. Swap here if you change models/providers.
// Note: gemini-2.0-flash had a free-tier quota of 0 on this account;
// gemini-2.5-flash has free quota. Thinking is disabled below for fast,
// cheap chat replies (otherwise it burns the output-token budget thinking).
const GEMINI_MODEL = 'gemini-2.5-flash';

// Auto-extract each demo's knowledge straight from its data.ts — eagerly bundled
// at build time, so the bot always reflects the site's *current* content.
const demoData = import.meta.glob('../../components/demos/*/data.ts', { eager: true }) as Record<
  string,
  Record<string, unknown>
>;

// Map slug -> serialised knowledge string.
const demoKnowledge: Record<string, string> = {};
for (const [path, mod] of Object.entries(demoData)) {
  const slug = path.match(/demos\/([^/]+)\/data\.ts$/)?.[1];
  if (!slug) continue;
  // Drop functions; keep all data exports.
  const data = Object.fromEntries(
    Object.entries(mod).filter(([, v]) => typeof v !== 'function'),
  );
  demoKnowledge[slug] = JSON.stringify(data, null, 0);
}

function knowledgeFor(siteId: string): string {
  if (siteId === 'orderslift') return JSON.stringify(ordersliftKnowledge);
  return demoKnowledge[siteId] ?? '';
}

type Turn = { role: string; text: string };

export const POST: APIRoute = async ({ request }) => {
  let body: { siteId?: string; brand?: string; messages?: Turn[] };
  try {
    body = await request.json();
  } catch {
    return json({ reply: 'Sorry, I could not read that request.' }, 400);
  }

  const siteId = (body.siteId ?? '').trim();
  const brand = (body.brand ?? 'this business').trim();
  const history = Array.isArray(body.messages) ? body.messages.slice(-10) : [];
  const knowledge = knowledgeFor(siteId);

  if (!knowledge) {
    return json({ reply: "I don't have information for this site yet." }, 200);
  }

  const apiKey = import.meta.env.GEMINI_API_KEY ?? process.env.GEMINI_API_KEY;
  if (!apiKey) {
    // No key configured — fail gracefully so the widget still works in dev.
    return json(
      { reply: 'The assistant is not configured yet. Please add a GEMINI_API_KEY.' },
      200,
    );
  }

  const system = [
    `You are the friendly AI assistant for "${brand}", embedded on its website.`,
    'Answer the visitor using ONLY the KNOWLEDGE below. Be concise, warm and helpful — 1 to 3 short sentences.',
    "If the answer isn't in the knowledge, say you don't have that detail and suggest they contact the business or use the booking/contact option. Never invent prices, hours, or facts.",
    'Do not mention "knowledge base", JSON, or that you are an AI model.',
    '',
    `KNOWLEDGE:\n${knowledge}`,
  ].join('\n');

  const contents = history
    .filter((m) => m.text?.trim())
    .map((m) => ({
      role: m.role === 'user' ? 'user' : 'model',
      parts: [{ text: m.text }],
    }));

  try {
    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          system_instruction: { parts: [{ text: system }] },
          contents,
          generationConfig: {
            temperature: 0.4,
            maxOutputTokens: 400,
            thinkingConfig: { thinkingBudget: 0 },
          },
        }),
      },
    );

    if (!res.ok) {
      const detail = await res.text();
      console.error('[chat] Gemini error', res.status, detail);
      return json(
        {
          reply: "Sorry, I'm having trouble right now. Please try again in a moment.",
          error: { status: res.status, detail },
        },
        200,
      );
    }

    const data: any = await res.json();
    const reply =
      data?.candidates?.[0]?.content?.parts?.map((p: any) => p.text).join('').trim() ||
      "Sorry, I didn't catch that — could you rephrase?";

    return json({ reply }, 200);
  } catch {
    return json({ reply: "Sorry, I'm having trouble connecting. Please try again shortly." }, 200);
  }
};

function json(payload: unknown, status: number): Response {
  return new Response(JSON.stringify(payload), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}
