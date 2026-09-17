export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  if (!process.env.MAKE_WEBHOOK_URL) {
    return res.status(503).json({
      error: 'Lead automation is not configured yet.'
    });
  }

  try {
    const lead = req.body || {};

    const payload = {
      source: 'Autonexa AI website',
      submitted_at: new Date().toISOString(),
      name: lead.name || '',
      business: lead.business || '',
      email: lead.email || '',
      whatsapp: lead.whatsapp || '',
      industry: lead.industry || '',
      message: lead.message || ''
    };

    const response = await fetch(process.env.MAKE_WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      throw new Error(`Make webhook returned ${response.status}`);
    }

    return res.status(200).json({
      ok: true,
      message: 'Lead submitted successfully'
    });

  } catch (error) {
    console.error('Lead handler error:', error);

    return res.status(500).json({
      error: 'Lead automation is temporarily unavailable.'
    });
  }
}
