// api/chat.js
// Vercel Serverless Function — AI chat/generation endpoint.
// Frontend is NEVER given the API key directly — it always calls this endpoint.
//
// ENV VAR needed (set in Vercel Project Settings -> Environment Variables):
//   ANTHROPIC_API_KEY = sk-ant-xxxxxxxx

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { message, history = [] } = req.body;

    if (!message || typeof message !== "string") {
      return res.status(400).json({ error: "'message' (string) is required" });
    }

    const messages = [
      ...history, // [{ role: "user"|"assistant", content: "..." }, ...]
      { role: "user", content: message },
    ];

    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.ANTHROPIC_API_KEY,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-6",
        max_tokens: 1024,
        messages,
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error("Anthropic API error:", errText);
      return res.status(502).json({ error: "AI service error" });
    }

    const data = await response.json();
    const reply = data.content?.[0]?.text || "";

    return res.status(200).json({ reply });
  } catch (err) {
    console.error("chat.js error:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
}
