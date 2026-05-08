import { NextRequest, NextResponse } from 'next/server'

const SYSTEM_PROMPT = `You are D-Shastho AI, a helpful health assistant for D-Shastho (ডি-স্বাস্থ্য) — Bangladesh's first complete AI-powered diabetes management platform.

You help users with:
- Understanding diabetes (Type 1, Type 2, pre-diabetes, gestational)
- Blood glucose levels, HbA1c, and what readings mean
- Medications commonly used in Bangladesh (Metformin, Glibenclamide, Insulin, etc.)
- Diet advice suited for Bangladeshi foods (rice, dal, roti, biryani, hilsa, pithas, etc.)
- Exercise and lifestyle recommendations for Bangladeshi context
- Understanding lab tests and reports on the platform
- When to see a doctor
- How to use D-Shastho app features

You respond in the same language the user writes in — Bengali or English.
Keep answers concise, warm, and practical. Always recommend consulting a doctor for medical decisions.
Never diagnose. Never prescribe specific doses. Always encourage professional medical care.`

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json()

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY || '',
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-haiku-4-5-20251001',
        max_tokens: 1024,
        system: SYSTEM_PROMPT,
        messages: messages.map((m: { role: string; content: string }) => ({
          role: m.role,
          content: m.content,
        })),
      }),
    })

    if (!response.ok) {
      const err = await response.text()
      console.error('Anthropic API error:', err)
      return NextResponse.json({ content: 'Sorry, I could not process your request. Please try again.' }, { status: 500 })
    }

    const data = await response.json()
    const content = data.content?.[0]?.text || 'Sorry, I did not understand that.'
    return NextResponse.json({ content })
  } catch (error) {
    console.error('Chat API error:', error)
    return NextResponse.json({ content: 'Something went wrong. Please try again.' }, { status: 500 })
  }
}
