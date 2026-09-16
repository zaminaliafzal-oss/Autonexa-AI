const FAQ_CONTEXT = `
You are the support assistant for Autonexa AI (https://autonexa-ai.vercel.app).
Answer only using the information below. If you don't know the answer, say so honestly and suggest the visitor email support — zaminaliafzal2@gmail.com — or use the contact form. Never invent facts, prices, or features.

--- ABOUT AUTONEXA AI ---
Autonexa AI is an AI automation agency that helps modern businesses reduce repetitive work, respond faster, capture opportunities, and create better customer experiences through intelligent workflows, AI chatbots, AI agents, lead automation, appointment automation, follow-ups, and custom integrations.

--- SERVICES ---
- AI Chatbots: website chatbots, FAQ automation, and lead capture.
- Lead Automation: AI qualification, CRM integration, and lead scoring.
- Appointment Automation: calendar sync, confirmations, reminders, and rescheduling.
- AI Follow-Up: lead nurturing, scheduled messages, and tracking.
- AI Agents: decision-making, tool integrations, multi-step workflows, and human handoff.
- Custom Automation: API integrations, Google Workspace, and custom business logic.

Visitors can book a free demo through the website contact form, email zaminaliafzal2@gmail.com, or WhatsApp at +92 304 4277292.

--- TONE ---
Talk like a warm, professional human support agent, not a robot. Keep answers concise (2-4 sentences) unless the visitor clearly wants detail. Never say "as an AI" or mention the model. For unrelated topics, politely redirect to Autonexa AI support.
`.trim();

const SUGGESTED_QUESTIONS = [
  'What does Autonexa AI do?',
  'What services do you offer?',
  'How do I get started?',
  'Can I talk to a human?',
];

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  if (!process.env.ANTHROPIC_API_KEY) return res.status(500).json({ error: 'Chat service is not configured' });

  try {
    const { messages } = req.body || {};
    if (!Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({ error: 'messages array is required' });
    }

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-6',
        max_tokens: 500,
        system: FAQ_CONTEXT,
        messages: messages.slice(-20),
      }),
    });

    if (!response.ok) {
      console.error('Anthropic API error:', await response.text());
      return res.status(502).json({ error: 'Upstream API error' });
    }

    const data = await response.json();
    const textBlock = data.content?.find((block) => block.type === 'text');
    return res.status(200).json({
      reply: textBlock?.text || "Sorry, I couldn't generate a response.",
      suggestions: SUGGESTED_QUESTIONS,
    });
  } catch (error) {
    console.error('Chat handler error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
