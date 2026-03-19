'use client'

import { useState, useEffect } from 'react'

const EXAMPLE_POSTS = [
  { text: "Sliding into the DMs of someone whose spouse just died in the Iran strikes", tooSoon: 94, notTooSoon: 6, category: "☠️ Unhinged" },
  { text: "Trump comparing bombing Iran to Pearl Harbor IN FRONT OF JAPAN'S PM and the translator just standing there like 🧍", tooSoon: 69, notTooSoon: 31, category: "😂 Ironic" },
  { text: "Starting a GoFundMe for Iran's gas field and using the money for a pool", tooSoon: 88, notTooSoon: 12, category: "☠️ Unhinged" },
  { text: "Asking Kevin Spacey if he's available to babysit now that he's free from court", tooSoon: 96, notTooSoon: 4, category: "☠️ Unhinged" },
  { text: "Telling your therapist the Strait of Hormuz has more stability than your marriage", tooSoon: 22, notTooSoon: 78, category: "😂 Ironic" },
  { text: "Pitching 'The Real Housewives of Epstein Island' now that the files are dropping", tooSoon: 85, notTooSoon: 15, category: "☠️ Unhinged" },
  { text: "Listing 'survived 3 pandemics and a world war' on your Hinge profile as a personality trait", tooSoon: 28, notTooSoon: 72, category: "😂 Ironic" },
  { text: "Buying Lockheed Martin stock and writing your kid a thank-you card addressed to Iran", tooSoon: 79, notTooSoon: 21, category: "💰 Finance" },
  { text: "Norway's princess rehearsing her Epstein apology while her son is literally on trial for rape in the next room", tooSoon: 91, notTooSoon: 9, category: "☠️ Unhinged" },
  { text: "Setting your Tinder location to a war zone because the competition is lower", tooSoon: 83, notTooSoon: 17, category: "☠️ Unhinged" },
  { text: "Naming your March Madness bracket 'Epstein's Client List' because it's full of surprises nobody saw coming", tooSoon: 76, notTooSoon: 24, category: "😂 Ironic" },
  { text: "TSA agents working for free and you hit them with a 'thanks for your service' in the same tone you use at Chick-fil-A", tooSoon: 37, notTooSoon: 63, category: "😂 Ironic" },
  { text: "Booking a honeymoon in Tehran because the Airbnbs are basically free right now", tooSoon: 93, notTooSoon: 7, category: "☠️ Unhinged" },
  { text: "Asking Denmark to blow up your ex's car since they've got demolition experience now", tooSoon: 35, notTooSoon: 65, category: "😂 Ironic" },
]

function VoteCard({ text, tooSoon, notTooSoon, category }: { text: string; tooSoon: number; notTooSoon: number; category: string }) {
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
      <div className="flex items-center gap-2 mb-3">
        <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-white/5 text-white/40 border border-white/10">{category}</span>
      </div>
      <p className="text-lg font-medium mb-6 text-white/90 leading-relaxed">&ldquo;{text}&rdquo;</p>
      
      {!voted ? (
        <div className="flex gap-3">
          <button
            onClick={() => handleVote('too-soon')}
            className="flex-1 py-3 px-4 rounded-xl bg-toosoon-red/20 border border-toosoon-red/30 text-toosoon-red font-bold text-lg hover:bg-toosoon-red/30 hover:border-toosoon-red/50 transition-all active:scale-95 hover:glow-red"
          >
            🔥 TOO SOON
          </button>
          <button
            onClick={() => handleVote('not-too-soon')}
            className="flex-1 py-3 px-4 rounded-xl bg-toosoon-green/20 border border-toosoon-green/30 text-toosoon-green font-bold text-lg hover:bg-toosoon-green/30 hover:border-toosoon-green/50 transition-all active:scale-95 hover:glow-green"
          >
            ✅ FAIR GAME
          </button>
        </div>
      ) : (
        <div className="space-y-2">
          <div className="flex justify-between text-sm mb-1">
            <span className={`font-bold ${voted === 'too-soon' ? 'text-toosoon-red' : 'text-white/40'}`}>🔥 Too Soon — {tsPercent}%</span>
            <span className={`font-bold ${voted === 'not-too-soon' ? 'text-toosoon-green' : 'text-white/40'}`}>✅ Fair Game — {ntsPercent}%</span>
          </div>
          <div className="w-full h-4 bg-white/5 rounded-full overflow-hidden flex">
            <div 
              className="h-full bg-gradient-to-r from-red-600 to-toosoon-red transition-all duration-700 ease-out rounded-l-full"
              style={{ width: `${tsPercent}%` }}
            />
            <div 
              className="h-full bg-gradient-to-r from-toosoon-green to-green-500 transition-all duration-700 ease-out rounded-r-full"
              style={{ width: `${ntsPercent}%` }}
            />
          </div>
          <p className="text-center text-white/30 text-xs mt-2">{(total * 137).toLocaleString()} votes</p>
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
    await new Promise(resolve => setTimeout(resolve, 800))
    setSubmitted(true)
    setLoading(false)
  }

  if (submitted) {
    return (
      <div className="text-center py-4">
        <div className="text-5xl mb-3">💀</div>
        <p className="text-2xl font-bold text-toosoon-green">You&apos;re in.</p>
        <p className="text-white/50 mt-2">We&apos;ll hit you up when it&apos;s time. Try not to get cancelled before then.</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 w-full max-w-lg mx-auto">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="your@email.com"
        required
        className="flex-1 px-5 py-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-toosoon-purple/50 focus:ring-2 focus:ring-toosoon-purple/20 transition-all text-lg"
      />
      <button
        type="submit"
        disabled={loading}
        className="px-8 py-4 rounded-xl bg-gradient-to-r from-toosoon-red via-toosoon-purple to-toosoon-red font-bold text-white text-lg hover:opacity-90 transition-all active:scale-95 disabled:opacity-50 whitespace-nowrap glow-purple bg-[length:200%] hover:bg-right"
      >
        {loading ? '...' : "I'M IN 🔥"}
      </button>
    </form>
  )
}

function TickerBar() {
  const headlines = [
    "🔥 96% say Too Soon to ask Kevin Spacey to babysit",
    "✅ 78% say Fair Game — Strait of Hormuz more stable than your marriage",
    "🔥 94% say Too Soon to DM a war widow",
    "💀 69% split on Trump's Pearl Harbor joke in front of Japan's PM",
    "✅ 72% say Fair Game to flex surviving WW3 on your dating profile",
    "🔥 91% say Too Soon — Norway's princess apologizing while her son's in court for rape",
    "✅ 65% say Fair Game to ask Denmark to blow up your ex's car",
    "🔥 93% say Too Soon to honeymoon in Tehran for the cheap Airbnbs",
  ]

  return (
    <div className="w-full overflow-hidden bg-white/5 border-y border-white/10 py-2">
      <div className="flex animate-scroll whitespace-nowrap">
        {[...headlines, ...headlines].map((h, i) => (
          <span key={i} className="mx-8 text-sm text-white/50 font-medium">{h}</span>
        ))}
      </div>
    </div>
  )
}

export default function Home() {
  const [count, setCount] = useState(11_847)
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCount(c => c + Math.floor(Math.random() * 5) + 1)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <main className="min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-toosoon-red/15 rounded-full blur-3xl animate-pulse-glow" />
          <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-toosoon-purple/15 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: '1.5s' }} />
          <div className="absolute top-1/2 left-1/2 w-[500px] h-[500px] bg-toosoon-green/8 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: '3s' }} />
        </div>
        
        <div className="relative max-w-6xl mx-auto px-4 pt-16 pb-8 text-center">
          {/* Logo/Brand */}
          <div className="mb-6">
            <div className="inline-block mb-4 px-4 py-1.5 rounded-full bg-toosoon-red/10 border border-toosoon-red/20">
              <span className="text-toosoon-red text-sm font-semibold tracking-wide">THE INTERNET&apos;S MORAL COMPASS</span>
            </div>
            <h1 className="font-display text-7xl sm:text-8xl md:text-[10rem] font-bold tracking-tighter leading-none">
              <span className="gradient-text">Too</span>
              <span className="text-white">Soon</span>
              <span className="text-toosoon-red animate-pulse">.</span>
            </h1>
          </div>
          
          <p className="text-2xl sm:text-3xl text-white/70 max-w-3xl mx-auto mb-3 font-light leading-relaxed">
            Everyone&apos;s thinking it. We&apos;re voting on it.
          </p>
          <p className="text-lg text-white/40 max-w-xl mx-auto mb-10">
            Drop a take. The crowd decides if the world is ready — or if you need to read the room.
          </p>

          {/* Signup */}
          <div className="mb-6">
            <SignupForm />
          </div>
          <p className="text-white/30 text-sm mb-8">
            💀 <span className="text-white/60 font-bold">{count.toLocaleString()}</span> degenerates already on the waitlist
          </p>
        </div>
      </section>

      {/* Ticker */}
      <TickerBar />

      {/* Live Demo */}
      <section className="max-w-5xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="font-display text-4xl sm:text-5xl font-bold mb-4">
            Today&apos;s <span className="gradient-text">Hot Takes</span>
          </h2>
          <p className="text-white/40 text-lg">Based on real headlines. Right now. Vote or get voted on.</p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-5">
          {EXAMPLE_POSTS.map((post, i) => (
            <VoteCard key={i} {...post} />
          ))}
        </div>

        <div className="text-center mt-10">
          <p className="text-white/30 text-sm italic">&ldquo;If you&apos;re not offending someone, you&apos;re not saying anything.&rdquo;</p>
        </div>
      </section>

      {/* How It Works */}
      <section className="max-w-5xl mx-auto px-4 py-16">
        <h2 className="font-display text-4xl sm:text-5xl font-bold text-center mb-14">
          Dead <span className="gradient-text">simple</span>
        </h2>
        
        <div className="grid md:grid-cols-3 gap-10">
          <div className="text-center">
            <div className="text-6xl mb-5">🎤</div>
            <h3 className="font-display text-2xl font-bold mb-3">Drop Your Take</h3>
            <p className="text-white/50 text-lg">That thing you said at dinner that made everyone go quiet? Yeah, post that. Go anonymous if you&apos;re scared.</p>
          </div>
          <div className="text-center">
            <div className="text-6xl mb-5">⚖️</div>
            <h3 className="font-display text-2xl font-bold mb-3">The Court Rules</h3>
            <p className="text-white/50 text-lg">Thousands of strangers decide your fate in real time. Too Soon or Fair Game. No appeals.</p>
          </div>
          <div className="text-center">
            <div className="text-6xl mb-5">📢</div>
            <h3 className="font-display text-2xl font-bold mb-3">Share the Verdict</h3>
            <p className="text-white/50 text-lg">Screenshot it. Send it. Win the argument. Lose friends. Worth it.</p>
          </div>
        </div>
      </section>

      {/* Who It's For */}
      <section className="max-w-5xl mx-auto px-4 py-16">
        <h2 className="font-display text-4xl sm:text-5xl font-bold text-center mb-14">
          Built for people who <span className="gradient-text">say things</span>
        </h2>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div className="vote-card hover:border-toosoon-red/30">
            <div className="text-4xl mb-4">🎙️</div>
            <h3 className="font-display text-xl font-bold mb-3">Comedians</h3>
            <p className="text-white/50 text-lg">Test your darkest material on strangers before you test it on a room full of people holding drinks.</p>
          </div>
          <div className="vote-card hover:border-toosoon-purple/30">
            <div className="text-4xl mb-4">📱</div>
            <h3 className="font-display text-xl font-bold mb-3">Social Media Managers</h3>
            <p className="text-white/50 text-lg">Your brand wants to post about the war. Should they? Get the answer before the ratio gets you fired.</p>
          </div>
          <div className="vote-card hover:border-toosoon-green/30">
            <div className="text-4xl mb-4">💀</div>
            <h3 className="font-display text-xl font-bold mb-3">People With No Filter</h3>
            <p className="text-white/50 text-lg">You know who you are. The one who says the thing everyone&apos;s thinking. Finally, a place that rewards it.</p>
          </div>
          <div className="vote-card hover:border-toosoon-red/30">
            <div className="text-4xl mb-4">🏢</div>
            <h3 className="font-display text-xl font-bold mb-3">PR Teams & Brands</h3>
            <p className="text-white/50 text-lg">Real-time sentiment data on what&apos;s fair game vs what&apos;ll get you on the front page of Reddit for the wrong reason.</p>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="border-y border-white/5 bg-white/[0.02] py-12">
        <div className="max-w-5xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="font-display text-4xl font-bold gradient-text">2.4M+</div>
            <div className="text-white/40 mt-1">Votes Cast</div>
          </div>
          <div>
            <div className="font-display text-4xl font-bold gradient-text">147K</div>
            <div className="text-white/40 mt-1">Takes Posted</div>
          </div>
          <div>
            <div className="font-display text-4xl font-bold gradient-text">89%</div>
            <div className="text-white/40 mt-1">Say It&apos;s Never Too Soon</div>
          </div>
          <div>
            <div className="font-display text-4xl font-bold gradient-text">0</div>
            <div className="text-white/40 mt-1">F*cks Given</div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-4xl mx-auto px-4 py-24 text-center">
        <h2 className="font-display text-5xl sm:text-6xl font-bold mb-3">
          Stop overthinking it.
        </h2>
        <p className="text-2xl text-white/50 mb-3">Is it too soon to sign up?</p>
        <p className="text-4xl font-bold text-toosoon-green mb-8">Never.</p>
        <SignupForm />
        <p className="text-white/20 text-sm mt-6">No spam. Just chaos. Unsubscribe whenever.</p>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 py-8">
        <div className="max-w-5xl mx-auto px-4 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="font-display text-xl font-bold">
            <span className="gradient-text">Too</span>Soon<span className="text-toosoon-red">.</span>
          </div>
          <div className="flex gap-6 text-white/30 text-sm">
            <a href="#" className="hover:text-white/60 transition-colors">Twitter</a>
            <a href="#" className="hover:text-white/60 transition-colors">TikTok</a>
            <a href="#" className="hover:text-white/60 transition-colors">Instagram</a>
            <a href="#" className="hover:text-white/60 transition-colors">Discord</a>
          </div>
          <p className="text-white/20 text-sm">© 2026 TooSoon. All takes welcome. No refunds on opinions.</p>
        </div>
      </footer>
    </main>
  )
}
