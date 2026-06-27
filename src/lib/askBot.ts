// Shared client helper used by every demo chat widget and the main-site widget.
// Sends the conversation to the /api/chat serverless function (Gemini Flash)
// and returns the grounded reply text.

export type ChatTurn = { role: 'user' | 'bot'; text: string };

export async function askBot(
  siteId: string,
  brand: string,
  messages: ChatTurn[],
): Promise<string> {
  try {
    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ siteId, brand, messages }),
    });
    const data = await res.json();
    return (data?.reply as string) || "Sorry, I didn't catch that — could you try again?";
  } catch {
    return "Sorry, I'm having trouble connecting right now. Please try again in a moment.";
  }
}
