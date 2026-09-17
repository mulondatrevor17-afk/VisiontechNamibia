import { Router } from 'express'

const router = Router()

let genAI: any = null
async function getGemini() {
  if (genAI) return genAI
  const { GoogleGenAI } = await import('@google/genai')
  genAI = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY })
  return genAI
}

router.post('/chat', async (req, res) => {
  const { message } = req.body

  if (!message) {
    return res.status(400).json({ error: 'Message is required' })
  }

  if (!process.env.GEMINI_API_KEY) {
    return res.json({
      reply: fallbackReply(message),
      source: 'fallback',
    })
  }

  try {
    const ai = await getGemini()
    const result = await ai.models.generateContent({
      model: 'gemini-2.0-flash',
      contents: [
        { role: 'user', parts: [{ text: message }] }
      ],
    })

    res.json({ reply: result.text, source: 'gemini' })
  } catch (error) {
    console.error('Gemini error:', error)
    res.status(500).json({
      reply: 'Sorry, I encountered an error. Please try again later.',
      source: 'error-fallback',
    })
  }
})

function fallbackReply(message: string): string {
  const lower = message.toLowerCase()

  if (lower.includes('price') || lower.includes('cost')) {
    return 'Our pricing varies by project scope. Contact us at info@visiontechna.online for a custom quote.'
  }

  if (lower.includes('service')) {
    return 'We offer web development, UI/UX design, mobile apps, and AI solutions. Check our Services page!'
  }

  return 'Thanks for reaching out! A team member will get back to you shortly.'
}

export default router
