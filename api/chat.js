// api/chat.js
// Vercel Serverless Function — AI chat/generation endpoint using Google Gemini.
// Frontend is NEVER given the API key directly — it always calls this endpoint.
//
// ENV VAR needed (set in Vercel Project Settings -> Environment Variables):
//   GEMINI_API_KEY = your-google-gemini-api-key

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { message, history = [] } = req.body;

    if (!message || typeof message !== "string") {
      return res.status(400).json({ error: "'message' (string) is required" });
    }

    // Gemini format: history + new message ko "contents" array mein convert karte hain
    const contents = [
      ...history.map((h) => ({
        role: h.role === "assistant" ? "model" : "user",
        parts: [{ text: h.content }],
      })),
      { role: "user", parts: [{ text: message }] },
    ];

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contents }),
      }
    );

    if (!response.ok) {
      const errText = await response.text();
      console.error("Gemini API error:", errText);
      return res.status(502).json({ error: "AI service error" });
    }

    const data = await response.json();
    const reply = data.candidates?.[0]?.content?.parts?.[0]?.text || "";

    return res.status(200).json({ reply });
  } catch (err) {
    console.error("chat.js error:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
}
