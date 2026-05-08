'use client'
import { useState, useRef, useEffect } from 'react'
import { MessageCircle, X, Send, Minimize2, Bot, User, Loader2 } from 'lucide-react'
import s from './Chatbot.module.css'

interface Message {
  role: 'user' | 'assistant'
  content: string
}

const SYSTEM_PROMPT = `You are D-Shastho AI, a helpful health assistant for D-Shastho (ডি-স্বাস্থ্য) — Bangladesh's first complete AI-powered diabetes management platform.

You help users with:
- Understanding diabetes (Type 1, Type 2, pre-diabetes, gestational)
- Blood glucose levels, HbA1c, and what readings mean
- Medications commonly used in Bangladesh (Metformin, Glibenclamide, Insulin, etc.)
- Diet advice suited for Bangladeshi foods (rice, dal, roti, biryani, hilsa, etc.)
- Exercise and lifestyle recommendations
- Understanding lab tests and reports
- When to see a doctor
- Using D-Shastho app features

You respond in the same language the user writes in — Bengali or English.
Keep answers concise, warm, and practical. Always recommend consulting a doctor for medical decisions.
Never diagnose. Never prescribe specific doses. Always encourage professional medical care.`

export default function Chatbot() {
  const [open, setOpen]         = useState(false)
  const [minimized, setMin]     = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: "Hi! I'm D-Shastho AI 👋 Ask me anything about diabetes, your medications, diet, or how to use the app. আমি বাংলায়ও সাহায্য করতে পারি!" }
  ])
  const [input, setInput]   = useState('')
  const [loading, setLoad]  = useState(false)
  const bottomRef           = useRef<HTMLDivElement>(null)
  const inputRef            = useRef<HTMLInputElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, open])

  useEffect(() => {
    if (open && !minimized) inputRef.current?.focus()
  }, [open, minimized])

  const send = async () => {
    const text = input.trim()
    if (!text || loading) return
    setInput('')

    const newMessages: Message[] = [...messages, { role: 'user', content: text }]
    setMessages(newMessages)
    setLoad(true)

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: newMessages }),
      })
      const data = await res.json()
      setMessages(prev => [...prev, { role: 'assistant', content: data.content }])
    } catch {
      setMessages(prev => [...prev, { role: 'assistant', content: 'Sorry, something went wrong. Please try again.' }])
    } finally {
      setLoad(false)
    }
  }

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send() }
  }

  return (
    <>
      {/* Floating button */}
      {!open && (
        <button className={s.fab} onClick={() => setOpen(true)} aria-label="Open chat">
          <MessageCircle size={24} />
          <span className={s.fabPulse} />
        </button>
      )}

      {/* Chat window */}
      {open && (
        <div className={`${s.window} ${minimized ? s.windowMin : ''}`}>
          {/* Header */}
          <div className={s.header}>
            <div className={s.headerLeft}>
              <div className={s.avatar}><Bot size={16} /></div>
              <div>
                <div className={s.name}>D-Shastho AI</div>
                <div className={s.status}><span className={s.dot} />Online</div>
              </div>
            </div>
            <div className={s.headerActions}>
              <button onClick={() => setMin(p => !p)} aria-label="Minimize"><Minimize2 size={15} /></button>
              <button onClick={() => setOpen(false)} aria-label="Close"><X size={15} /></button>
            </div>
          </div>

          {!minimized && (
            <>
              {/* Messages */}
              <div className={s.messages}>
                {messages.map((m, i) => (
                  <div key={i} className={`${s.msg} ${m.role === 'user' ? s.msgUser : s.msgBot}`}>
                    {m.role === 'assistant' && (
                      <div className={s.msgAvatar}><Bot size={13} /></div>
                    )}
                    <div className={s.bubble}>{m.content}</div>
                    {m.role === 'user' && (
                      <div className={s.msgAvatar}><User size={13} /></div>
                    )}
                  </div>
                ))}
                {loading && (
                  <div className={`${s.msg} ${s.msgBot}`}>
                    <div className={s.msgAvatar}><Bot size={13} /></div>
                    <div className={s.bubble}><Loader2 size={14} className={s.spin} /></div>
                  </div>
                )}
                <div ref={bottomRef} />
              </div>

              {/* Input */}
              <div className={s.inputRow}>
                <input
                  ref={inputRef}
                  className={s.input}
                  placeholder="Ask about diabetes, diet, meds..."
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={onKey}
                  disabled={loading}
                />
                <button className={s.sendBtn} onClick={send} disabled={!input.trim() || loading} aria-label="Send">
                  <Send size={16} />
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </>
  )
}

export { SYSTEM_PROMPT }
