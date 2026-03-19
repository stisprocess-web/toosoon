'use client'

import { useState, useEffect } from 'react'

const EXAMPLE_POSTS = [
  { text: "Making memes about the latest celebrity scandal", tooSoon: 72, notTooSoon: 28 },
  { text: "Asking someone out 2 weeks after their breakup", tooSoon: 54, notTooSoon: 46 },
  { text: "Naming your WiFi 'FBI Van' after a real FBI raid on your street", tooSoon: 67, notTooSoon: 33 },
  { text: "Wearing a costume of a recent news event for Halloween", tooSoon: 61, notTooSoon: 39 },
  { text: "Starting Christmas music before Thanksgiving", tooSoon: 78, notTooSoon: 22 },
  { text: "Texting 'you up?' at 2am on a Tuesday", tooSoon: 35, notTooSoon: 65 },
]

function VoteCard({ text, tooSoon, notTooSoon }: { text: string; tooSoon: number; notTooSoon: number }) {
  const [voted, setVoted] = useState<'too-soon' | 'not-too-soon' | null>(null)
  const [ts, setTs] = useState(tooSoon)
  const [nts, setNts] = useState(notTooSoon)

  const handleVote = (choice: 'too-soon' | 'not-too-soon') => {
    if (voted) return
    setVoted(choice)
    if (choice === 'too-soon') setTs(ts + 1)
    else setNts(nts + 1)
  }

  const total = ts + nts
  const tsPercent = Math.round((ts / total) * 100)
  const ntsPercent = 100 - tsPercent

  return (
    <div className="vote-card group">
      <p className="text-lg font-medium mb-6 text-white/90">&ldquo;{text}&rdquo;</p>
      
      {!voted ? (
        <div className="flex gap-3">
          <button
            onClick={() => handleVote('too-soon')}
            className="flex-1 py-3 px-4 rounded-xl bg-toosoon-red/20 border border-toosoon-red/30 text-toosoon-red font-semibold hover:bg-toosoon-red/30 hover:border-toosoon-red/50 transition-all active:scale-95"
          >
            🔥 Too Soon
          </button>
          <button
            onClick={() => handleVote('not-too-soon')}
            className="flex-1 py-3 px-4 rounded-xl bg-toosoon-green/20 border border-toosoon-green/30 text-toosoon-green font-semibold hover:bg-toosoon-green/30 hover:border-toosoon-green/50 transition-all active:scale-95"
          >
            ✅ Not Too Soon
          </button>
        </div>
      ) : (
        <div className="space-y-2">
          <div className="flex justify-between text-sm mb-1">
            <span className="text-toosoon-red font-medium">🔥 Too Soon — {tsPercent}%</span>
            <span className="text-toosoon-green font-medium">✅ Not Too Soon — {ntsPercent}%</span>
          </div>
          <div className="w-full h-3 bg-white/5 rounded-full overflow-hidden flex">
            <div 
              className="h-full bg-gradient-to-r from-toosoon-red to-toosoon-red/70 transition-all duration-700 ease-out rounded-l-full"
              style={{ width: `${tsPercent}%` }}
            />
            <div 
              className="h-full bg-gradient-to-r from-toosoon-green/70 to-toosoon-green transition-all duration-700 ease-out rounded-r-full"
              style={{ width: `${ntsPercent}%` }}
            />
          </div>
          <p className="text-center text-white/40 text-xs mt-2">{total.toLocaleString()} votes</p>
        </div>
      )}
    </div>
  )
}

function SignupForm() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    setLoading(true)
    
    // TODO: Connect to Supabase or email service
    // For now, simulate signup
    await new Promise(resolve => setTimeout(resolve, 800))
    
    setSubmitted(true)
    setLoading(false)
  }

  if (submitted) {
    return (
      <div className="text-center py-4">
        <div className="text-4xl mb-3">🎉</div>
        <p className="text-xl font-semibold text-toosoon-green">You&apos;re on the list!</p>
        <p className="text-white/50 mt-1">We&apos;ll let you know when it&apos;s Not Too Soon to launch.</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 w-full max-w-md mx-auto">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="your@email.com"
        required
        className="flex-1 px-5 py-3.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-toosoon-purple/50 focus:ring-2 focus:ring-toosoon-purple/20 transition-all"
      />
      <button
        type="submit"
        disabled={loading}
        className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-toosoon-purple to-toosoon-red font-semibold text-white hover:opacity-90 transition-all active:scale-95 disabled:opacity-50 whitespace-nowrap glow-purple"
      >
        {loading ? '...' : 'Get Early Access'}
      </button>
    </form>
  )
}

export default function Home() {
  const [count, setCount] = useState(2847)
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCount(c => c + Math.floor(Math.random() * 3))
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  return (
    <main className="min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-toosoon-red/10 rounded-full blur-3xl animate-pulse-glow" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-toosoon-purple/10 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: '1.5s' }} />
          <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-toosoon-green/5 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: '3s' }} />
        </div>
        
        <div className="relative max-w-6xl mx-auto px-4 pt-20 pb-16 text-center">
          {/* Logo/Brand */}
          <div className="mb-8">
            <h1 className="font-display text-7xl sm:text-8xl md:text-9xl font-bold tracking-tight">
              <span className="gradient-text">Too</span>
              <span className="text-white">Soon</span>
              <span className="gradient-text">?</span>
            </h1>
          </div>
          
          <p className="text-xl sm:text-2xl text-white/60 max-w-2xl mx-auto mb-4 font-light">
            The crowd-powered moral compass for the internet age.
          </p>
          <p className="text-lg text-white/40 max-w-xl mx-auto mb-10">
            Submit a take. The people vote. Find out if it&apos;s too soon — or if the world is ready.
          </p>

          {/* Signup */}
          <div className="mb-6">
            <SignupForm />
          </div>
          <p className="text-white/30 text-sm">
            🔥 <span className="text-white/50 font-medium">{count.toLocaleString()}</span> people already waiting. Don&apos;t be too late.
          </p>
        </div>
      </section>

      {/* Live Demo */}
      <section className="max-w-4xl mx-auto px-4 py-16">
        <div className="text-center mb-10">
          <h2 className="font-display text-3xl sm:text-4xl font-bold mb-3">
            Try it <span className="gradient-text">right now</span>
          </h2>
          <p className="text-white/50">Vote on these. You know you want to.</p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-4">
          {EXAMPLE_POSTS.map((post, i) => (
            <VoteCard key={i} {...post} />
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="max-w-4xl mx-auto px-4 py-16">
        <h2 className="font-display text-3xl sm:text-4xl font-bold text-center mb-12">
          How it <span className="gradient-text">works</span>
        </h2>
        
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="text-5xl mb-4">✍️</div>
            <h3 className="font-display text-xl font-semibold mb-2">Post a Take</h3>
            <p className="text-white/50">Something you said, want to say, or saw someone say. Public or anonymous — your call.</p>
          </div>
          <div className="text-center">
            <div className="text-5xl mb-4">🗳️</div>
            <h3 className="font-display text-xl font-semibold mb-2">The People Vote</h3>
            <p className="text-white/50">Too Soon or Not Too Soon. Real-time results. No judgment (okay, some judgment).</p>
          </div>
          <div className="text-center">
            <div className="text-5xl mb-4">📊</div>
            <h3 className="font-display text-xl font-semibold mb-2">See the Verdict</h3>
            <p className="text-white/50">Watch consensus form. Share the results. Win arguments at dinner parties.</p>
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="max-w-4xl mx-auto px-4 py-16">
        <h2 className="font-display text-3xl sm:text-4xl font-bold text-center mb-12">
          For <span className="gradient-text">everyone</span>
        </h2>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div className="vote-card">
            <div className="text-3xl mb-3">😂</div>
            <h3 className="font-display text-lg font-semibold mb-2">Comedians & Creators</h3>
            <p className="text-white/50">Test your material before it goes live. Find the line — without crossing it on stage.</p>
          </div>
          <div className="vote-card">
            <div className="text-3xl mb-3">📱</div>
            <h3 className="font-display text-lg font-semibold mb-2">Social Media Managers</h3>
            <p className="text-white/50">Should your brand post about that trending topic? Find out before the ratio hits.</p>
          </div>
          <div className="vote-card">
            <div className="text-3xl mb-3">🎤</div>
            <h3 className="font-display text-lg font-semibold mb-2">Regular Humans</h3>
            <p className="text-white/50">Settle debates with friends. Is it too soon to text your ex? The internet will tell you.</p>
          </div>
          <div className="vote-card">
            <div className="text-3xl mb-3">📰</div>
            <h3 className="font-display text-lg font-semibold mb-2">PR & Communications</h3>
            <p className="text-white/50">Gauge public sentiment timing for press releases, campaigns, and public statements.</p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-4xl mx-auto px-4 py-20 text-center">
        <h2 className="font-display text-4xl sm:text-5xl font-bold mb-4">
          Is it too soon to <span className="gradient-text">sign up</span>?
        </h2>
        <p className="text-xl text-white/50 mb-8">Not Too Soon. Definitely not.</p>
        <SignupForm />
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 py-8">
        <div className="max-w-4xl mx-auto px-4 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="font-display text-lg font-semibold">
            <span className="gradient-text">Too</span>Soon
          </div>
          <div className="flex gap-6 text-white/30 text-sm">
            <a href="#" className="hover:text-white/60 transition-colors">Twitter</a>
            <a href="#" className="hover:text-white/60 transition-colors">TikTok</a>
            <a href="#" className="hover:text-white/60 transition-colors">Instagram</a>
          </div>
          <p className="text-white/20 text-sm">© 2026 TooSoon. All takes welcome.</p>
        </div>
      </footer>
    </main>
  )
}
