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

    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': 'https://d-shastho.vercel.app',
        'X-Title': 'D-Shastho',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.0-flash-001',
        max_tokens: 1024,
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          ...messages.map((m: { role: string; content: string }) => ({
            role: m.role,
            content: m.content,
          })),
        ],
      }),
    })

    if (!response.ok) {
      const err = await response.text()
      console.error('OpenRouter API error:', err)
      return NextResponse.json(
        { content: 'Sorry, I could not process your request. Please try again.' },
        { status: 500 }
      )
    }

    const data = await response.json()
    const content = data.choices?.[0]?.message?.content || 'Sorry, I did not understand that.'
    return NextResponse.json({ content })
  } catch (error) {
    console.error('Chat API error:', error)
    return NextResponse.json(
      { content: 'Something went wrong. Please try again.' },
      { status: 500 }
    )
  }
}
