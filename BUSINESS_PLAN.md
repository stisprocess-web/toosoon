# TooSoon — Business Plan

**Domain:** nottoosoon.com
**Tagline:** "Is it too soon? Let the people decide."

---

## 🎯 The Concept

TooSoon is a social voting platform where users submit statements, jokes, opinions, or takes — and the community votes whether it's **"Too Soon"** or **"Not Too Soon"** to say it.

Think Reddit meets Hot Takes meets Cards Against Humanity — but with a real-time moral compass powered by crowd consensus.

### Examples:
- "Making jokes about [recent event]" → 72% say Too Soon
- "Asking someone out 2 weeks after their breakup" → 54% say Not Too Soon
- "Wearing white after Labor Day" → 89% say Not Too Soon
- "Naming your WiFi 'FBI Surveillance Van' after a real FBI raid on your street" → 67% say Too Soon

---

## 💰 Revenue Model

### 1. Freemium Subscriptions — **TooSoon Pro** ($4.99/mo or $39.99/yr)
- Unlimited posts (free tier: 3/day)
- Advanced analytics on your posts (demographic breakdown of votes)
- Custom categories
- Early access to trending posts
- Ad-free experience
- Custom profile badges & themes

### 2. Advertising
- Native in-feed sponsored posts ("Is it too soon to switch to [Brand]?")
- Banner ads between vote cards
- Sponsored categories/events (e.g., "Super Bowl TooSoon presented by Bud Light")
- **Target:** $5-15 CPM at scale

### 3. Brand Partnerships & Market Research
- **This is the real money.** Companies pay to understand public sentiment timing.
- "When is it appropriate to market around [sensitive topic]?" — brands will PAY for that data
- PR firms use TooSoon data to time press releases and public statements
- Political campaigns gauge public readiness for policy positions
- Anonymized sentiment data sold as API access ($500-5,000/mo per client)

### 4. In-App Purchases
- Premium "vote bombs" — boost your post to more users ($0.99-$4.99)
- Custom reaction emojis beyond thumbs up/down
- "TooSoon Shield" — post anonymously even on public posts ($0.49 each)
- Seasonal packs (holiday themes, event tie-ins)

### 5. Creator Program (Phase 3)
- Top creators with high engagement get revenue share from ads on their posts
- Incentivizes quality content and retention
- Creator tools: scheduled posts, audience insights, collaboration features

---

## 📊 Market Opportunity

### Target Market
- **Primary:** 18-35 year olds (meme culture, social media native)
- **Secondary:** 35-50 (culture commentary, news junkies)
- **Tertiary:** Brands, PR firms, political consultants (B2B data)

### Comparable Exits
- **Yik Yak** — anonymous local voting, peaked at $400M valuation
- **Wishbone** — A/B voting app, acquired by Science Inc
- **Gas** — anonymous polling, acquired by Discord (~$15M)
- **Reddit** — community voting at scale, IPO'd at $6.4B

### Market Size
- Social media market: $250B+ globally
- Market research / sentiment analysis: $5.5B and growing 14% YoY
- **TooSoon SAM:** $500M (social voting + sentiment data)

---

## 🏗️ Product Strategy

### Phase 1 — Launch (Months 1-3): Landing Page + Waitlist
- ✅ nottoosoon.com landing page with email signup
- Build hype on TikTok/Twitter with "Too Soon?" content
- Collect 10,000 signups before app launch
- **Goal:** Validate demand, build community

### Phase 2 — MVP App (Months 3-6)
- Web app (Next.js) + iOS + Android (React Native)
- Core features:
  - Post a statement
  - Vote Too Soon / Not Too Soon
  - Public vs Private voting modes
  - Categories (relationships, politics, humor, workplace, pop culture)
  - User profiles with vote history
  - Trending feed
  - SSO login (Google, Apple, Twitter/X)
- **Goal:** 50,000 users, 500K votes/month

### Phase 3 — Growth (Months 6-12)
- TooSoon Pro subscription launch
- Brand dashboard for sentiment data
- Creator program
- Push notifications for trending topics
- "TooSoon Score" — your personal moral compass rating
- API for B2B clients
- **Goal:** 500,000 users, $50K MRR

### Phase 4 — Scale (Year 2+)
- Internationalization (culture-specific "too soon" varies wildly)
- Live event mode (award shows, sports, elections)
- AI-powered trend prediction ("this topic will be Not Too Soon in 3 days")
- Partnerships with media companies
- **Goal:** 5M users, $500K MRR, Series A

---

## 🔧 Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | Next.js 14 (React) + Tailwind CSS |
| Mobile | React Native (Expo) |
| Backend | Next.js API Routes → Node.js |
| Database | PostgreSQL (Supabase) |
| Auth | Supabase Auth (Google, Apple, Twitter SSO) |
| Real-time | Supabase Realtime (live vote counts) |
| Hosting | Vercel (web) + Supabase (backend) |
| CDN | Cloudflare |
| Analytics | PostHog (open source) |
| Payments | Stripe |

### Why Supabase?
- Built-in auth with SSO providers
- Real-time subscriptions (perfect for live voting)
- PostgreSQL = serious queries for analytics
- Row Level Security = privacy controls baked in
- Free tier gets you to 50K users before paying

---

## 💡 Competitive Advantages

1. **Timing is the product.** No one else focuses on the *when* of social acceptability.
2. **Dual revenue.** Consumer app + B2B data is a rare combo at this stage.
3. **Viral mechanics.** Every post is inherently shareable ("72% of people think it's Too Soon to ___")
4. **Low content moderation burden.** Users vote on appropriateness — the crowd IS the moderation.
5. **Cultural moment.** Cancel culture + "read the room" anxiety = everyone wants to know "is it too soon?"

---

## 📈 Key Metrics to Track

- **DAU/MAU ratio** (target: 30%+)
- **Votes per user per session** (target: 10+)
- **Post creation rate** (target: 5% of DAU creates content)
- **Viral coefficient** (shares per post)
- **Time to first vote** (onboarding speed)
- **Pro conversion rate** (target: 3-5% of MAU)
- **B2B pipeline** (sentiment data inquiries)

---

## 🚀 Go-to-Market Strategy

1. **Seed TikTok/Reels** with "Too Soon?" content — screenshot format goes viral
2. **Partner with comedians/podcasters** who already do "too soon" jokes
3. **Launch on Product Hunt** — voting apps do well there
4. **Twitter/X engagement** — reply to trending topics with TooSoon polls
5. **College campus ambassadors** — this demographic lives for hot takes
6. **PR play:** "TooSoon data shows Americans think it's too soon to joke about [X]" — media loves this data

---

*Built by the TooSoon team. Is it too soon to build this? Not Too Soon. 🗳️*
