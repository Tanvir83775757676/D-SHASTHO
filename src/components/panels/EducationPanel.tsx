'use client'
import { useState } from 'react'
import s from '@/components/panels/EducationPanel.module.css'

const ARTICLES = [
  { id: 1, category: 'Nutrition', icon: '🍛', title: 'GI Guide: Bangladeshi Foods for Diabetics', desc: 'Rice, dal, roti — learn which staples to eat and how much. Includes local food GI chart.', readTime: '5 min', saved: false, color: '#1A8A5A' },
  { id: 2, category: 'Exercise', icon: '🏃', title: 'Simple 20-Minute Morning Routine for Diabetics', desc: 'Low-impact exercises to lower blood sugar without a gym. Suitable for all ages.', readTime: '4 min', saved: true, color: '#0A6E6E' },
  { id: 3, category: 'Medication', icon: '💊', title: 'Understanding Metformin: When, How & Why', desc: 'Everything you need to know about the most prescribed diabetes medication in Bangladesh.', readTime: '6 min', saved: false, color: '#5A70C0' },
  { id: 4, category: 'Monitoring', icon: '📊', title: 'How to Read Your Blood Sugar Numbers', desc: 'Fasting, post-meal, random — what each number means and what action to take.', readTime: '3 min', saved: false, color: '#F0A500' },
  { id: 5, category: 'Complications', icon: '🫀', title: 'Protecting Your Heart as a Diabetic', desc: 'Diabetes and heart disease are closely linked. Here\'s how to reduce your risk.', readTime: '7 min', saved: true, color: '#E8553E' },
  { id: 6, category: 'Lifestyle', icon: '😴', title: 'How Sleep Affects Your Blood Sugar', desc: 'Poor sleep raises glucose levels significantly. Tips for better sleep with diabetes.', readTime: '4 min', saved: false, color: '#0D8A8A' },
]

const VIDEOS = [
  { icon: '▶️', title: 'Diabetes 101 — Understanding Your Condition', duration: '12 min', views: '24k', category: 'Basics' },
  { icon: '▶️', title: 'How to Use a Glucometer Correctly', duration: '7 min', views: '18k', category: 'Monitoring' },
  { icon: '▶️', title: 'Meal Planning for Bangladeshi Diabetics', duration: '15 min', views: '31k', category: 'Nutrition' },
  { icon: '▶️', title: 'Managing Diabetes During Ramadan', duration: '10 min', views: '14k', category: 'Lifestyle' },
]

const CATEGORIES = ['All', 'Nutrition', 'Exercise', 'Medication', 'Monitoring', 'Complications', 'Lifestyle']

const QUIZ = [
  { q: 'What is the normal fasting blood glucose range (mg/dL)?', options: ['Less than 70', '70–99', '100–125', 'Above 126'], answer: 1 },
  { q: 'Which type of food has the lowest Glycemic Index (GI)?', options: ['White rice', 'Brown rice', 'Vegetables', 'White bread'], answer: 2 },
  { q: 'How often should a Type 2 diabetic check HbA1c?', options: ['Every month', 'Every 3 months', 'Every 6 months', 'Once a year'], answer: 1 },
]

export default function EducationPanel() {
  const [tab, setTab] = useState('articles')
  const [catFilter, setCatFilter] = useState('All')
  const [articles, setArticles] = useState(ARTICLES)
  const [quizStep, setQuizStep] = useState(0)
  const [quizAnswers, setQuizAnswers] = useState([])
  const [quizDone, setQuizDone] = useState(false)

  const filtered = catFilter === 'All' ? articles : articles.filter(a => a.category === catFilter)
  const toggleSave = (id) => setArticles(prev => prev.map(a => a.id === id ? { ...a, saved: !a.saved } : a))

  const handleQuizAnswer = (idx) => {
    const newAnswers = [...quizAnswers, idx]
    setQuizAnswers(newAnswers)
    if (quizStep < QUIZ.length - 1) {
      setQuizStep(quizStep + 1)
    } else {
      setQuizDone(true)
    }
  }

  const score = quizAnswers.filter((a, i) => a === QUIZ[i]?.answer).length

  return (
    <div className={s.panel}>
      <div className={s.tabs}>
        {[['articles', '📚 Articles'], ['videos', '▶️ Videos'], ['quiz', '🧠 Knowledge Quiz']].map(([id, label]) => (
          <button key={id} className={`${s.tab} ${tab === id ? s.tabActive : ''}`} onClick={() => setTab(id)}>
            {label}
          </button>
        ))}
      </div>

      {/* Articles */}
      {tab === 'articles' && (
        <div>
          <div className={s.catRow}>
            {CATEGORIES.map(cat => (
              <button key={cat} className={`${s.catChip} ${catFilter === cat ? s.catActive : ''}`} onClick={() => setCatFilter(cat)}>
                {cat}
              </button>
            ))}
          </div>
          <div className={s.articleGrid}>
            {filtered.map(article => (
              <div key={article.id} className={s.articleCard}>
                <div className={s.articleTop}>
                  <span className={s.articleCat} style={{ background: article.color + '20', color: article.color }}>{article.category}</span>
                  <button className={`${s.saveBtn} ${article.saved ? s.saveBtnActive : ''}`} onClick={() => toggleSave(article.id)}>
                    {article.saved ? '🔖' : '🔖'}
                  </button>
                </div>
                <div className={s.articleIcon}>{article.icon}</div>
                <div className={s.articleTitle}>{article.title}</div>
                <div className={s.articleDesc}>{article.desc}</div>
                <div className={s.articleMeta}>
                  <span>⏱ {article.readTime} read</span>
                  <button className={s.readBtn}>Read →</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Videos */}
      {tab === 'videos' && (
        <div>
          <div className={s.sectionDesc}>Expert-created videos in Bengali to help you understand and manage diabetes better.</div>
          <div className={s.videoGrid}>
            {VIDEOS.map((v, i) => (
              <div key={i} className={s.videoCard}>
                <div className={s.videoThumb}>
                  <div className={s.playBtn}>{v.icon}</div>
                </div>
                <div className={s.videoInfo}>
                  <span className={s.videoCat}>{v.category}</span>
                  <div className={s.videoTitle}>{v.title}</div>
                  <div className={s.videoMeta}>{v.duration} · {v.views} views</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Quiz */}
      {tab === 'quiz' && (
        <div className={s.quizWrap}>
          {!quizDone ? (
            <div className={s.quizCard}>
              <div className={s.quizProgress}>Question {quizStep + 1} of {QUIZ.length}</div>
              <div className={s.quizProgressBar}>
                <div className={s.quizProgressFill} style={{ width: `${((quizStep) / QUIZ.length) * 100}%` }} />
              </div>
              <div className={s.quizQ}>{QUIZ[quizStep].q}</div>
              <div className={s.quizOptions}>
                {QUIZ[quizStep].options.map((opt, i) => (
                  <button key={i} className={s.quizOption} onClick={() => handleQuizAnswer(i)}>
                    <span className={s.optLetter}>{String.fromCharCode(65 + i)}</span>
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className={s.quizResult}>
              <div className={s.resultIcon}>{score === QUIZ.length ? '🏆' : score >= 2 ? '👍' : '📚'}</div>
              <div className={s.resultScore}>{score}/{QUIZ.length}</div>
              <div className={s.resultLabel}>{score === QUIZ.length ? 'Perfect Score!' : score >= 2 ? 'Good Job!' : 'Keep Learning!'}</div>
              <div className={s.resultAnswers}>
                {QUIZ.map((q, i) => (
                  <div key={i} className={`${s.resultRow} ${quizAnswers[i] === q.answer ? s.resultCorrect : s.resultWrong}`}>
                    <span>{quizAnswers[i] === q.answer ? '✓' : '✗'}</span>
                    <span>{q.q}</span>
                    <span className={s.resultAns}>Correct: {q.options[q.answer]}</span>
                  </div>
                ))}
              </div>
              <button className={s.retryBtn} onClick={() => { setQuizStep(0); setQuizAnswers([]); setQuizDone(false) }}>
                Try Again
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

