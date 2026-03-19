# TooSoon — App Strategy & Technical Roadmap

---

## 🏛️ Architecture Overview

```
┌─────────────────────────────────────────────────────┐
│                    CLIENTS                          │
│  Web (Next.js)  │  iOS (React Native)  │  Android  │
└────────┬────────┴──────────┬───────────┴───────────┘
         │                   │
         ▼                   ▼
┌─────────────────────────────────────────────────────┐
│              VERCEL (Edge Functions)                │
│   Next.js API Routes + Middleware + Rate Limiting   │
└────────────────────┬────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────┐
│                  SUPABASE                           │
│  PostgreSQL │ Auth │ Realtime │ Storage │ Edge Fn   │
└─────────────────────────────────────────────────────┘
```

---

## 📊 Database Schema

### Core Tables

```sql
-- Users (managed by Supabase Auth, extended here)
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id),
  username TEXT UNIQUE NOT NULL,
  display_name TEXT,
  avatar_url TEXT,
  bio TEXT,
  toosoon_score FLOAT DEFAULT 50.0,  -- moral compass rating 0-100
  is_pro BOOLEAN DEFAULT FALSE,
  posts_today INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Posts (the takes)
CREATE TABLE posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  author_id UUID REFERENCES profiles(id),
  text TEXT NOT NULL CHECK (char_length(text) BETWEEN 5 AND 280),
  category TEXT NOT NULL DEFAULT 'general',
  visibility TEXT NOT NULL DEFAULT 'public' CHECK (visibility IN ('public', 'private', 'anonymous')),
  too_soon_count INT DEFAULT 0,
  not_too_soon_count INT DEFAULT 0,
  total_votes INT DEFAULT 0,
  too_soon_percent FLOAT DEFAULT 50.0,
  is_featured BOOLEAN DEFAULT FALSE,
  is_sponsored BOOLEAN DEFAULT FALSE,
  sponsor_name TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  expires_at TIMESTAMPTZ  -- optional expiry for time-sensitive takes
);

-- Votes
CREATE TABLE votes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id UUID REFERENCES posts(id) ON DELETE CASCADE,
  user_id UUID REFERENCES profiles(id),
  vote TEXT NOT NULL CHECK (vote IN ('too_soon', 'not_too_soon')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(post_id, user_id)  -- one vote per user per post
);

-- Categories
CREATE TABLE categories (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  emoji TEXT,
  description TEXT,
  is_custom BOOLEAN DEFAULT FALSE,
  created_by UUID REFERENCES profiles(id),
  post_count INT DEFAULT 0
);

-- Waitlist (pre-launch)
CREATE TABLE waitlist (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  referral_code TEXT UNIQUE,
  referred_by UUID REFERENCES waitlist(id),
  referral_count INT DEFAULT 0,
  signed_up_at TIMESTAMPTZ DEFAULT NOW()
);

-- Reports (content moderation)
CREATE TABLE reports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id UUID REFERENCES posts(id),
  reporter_id UUID REFERENCES profiles(id),
  reason TEXT NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'reviewed', 'removed', 'dismissed')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

### Indexes

```sql
CREATE INDEX idx_posts_category ON posts(category);
CREATE INDEX idx_posts_created ON posts(created_at DESC);
CREATE INDEX idx_posts_trending ON posts(total_votes DESC, created_at DESC);
CREATE INDEX idx_votes_post ON votes(post_id);
CREATE INDEX idx_votes_user ON votes(user_id);
CREATE INDEX idx_profiles_username ON profiles(username);
```

### Row Level Security

```sql
-- Users can read all public posts
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public posts readable by all" ON posts
  FOR SELECT USING (visibility = 'public' OR author_id = auth.uid());

-- Users can only create their own posts
CREATE POLICY "Users create own posts" ON posts
  FOR INSERT WITH CHECK (author_id = auth.uid());

-- Users can only vote once per post
ALTER TABLE votes ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users vote once" ON votes
  FOR INSERT WITH CHECK (user_id = auth.uid());
  
-- Users can read all votes (for percentages)
CREATE POLICY "Votes readable" ON votes
  FOR SELECT USING (true);
```

---

## 🔐 Auth Strategy

### SSO Providers (via Supabase Auth)
1. **Google** — largest reach, easiest onboarding
2. **Apple** — required for iOS App Store
3. **Twitter/X** — natural fit (hot takes audience)
4. **Discord** — gaming/meme community
5. **Email/Password** — fallback

### Auth Flow
```
User clicks "Sign Up" → Supabase Auth popup → Provider SSO
→ Callback to /auth/callback → Create/update profile
→ Redirect to feed → Start voting
```

### Rate Limiting
- Free tier: 3 posts/day, unlimited votes
- Pro tier: unlimited posts, advanced analytics
- API: 100 requests/min per user, 1000/min per IP

---

## 🗳️ Voting System

### Real-Time Architecture
```
User votes → API call → Supabase insert
                      → Supabase Realtime broadcast
                      → All connected clients update instantly
```

### Vote Mechanics
- One vote per user per post (enforced at DB level)
- Can change vote (update, not re-insert)
- Vote counts cached on post row (denormalized for speed)
- Percentage recalculated on each vote via trigger

### Anti-Gaming
- Rate limit votes (max 60/min)
- New accounts can't vote for 5 min (anti-bot)
- Suspicious patterns → shadow-limit (votes don't count but user doesn't know)
- IP-based duplicate detection for logged-out users

---

## 📱 Mobile Strategy

### React Native (Expo)
- Shared codebase with web components
- Push notifications for trending posts
- Swipe-to-vote (Tinder-style UX for mobile)
- Share cards → auto-generated images for social media

### App Store Timeline
- **Month 3:** Internal TestFlight beta
- **Month 4:** Public beta (100 users)
- **Month 5:** App Store + Play Store submission
- **Month 6:** Public launch

---

## 💵 Monetization Implementation

### Stripe Integration
```
Free → Pro upgrade flow:
1. User clicks "Go Pro" → Stripe Checkout session
2. Stripe webhook → Supabase function → Update profile.is_pro
3. Unlock features client-side based on profile.is_pro
```

### Subscription Tiers
| Feature | Free | Pro ($4.99/mo) |
|---------|------|----------------|
| Posts per day | 3 | Unlimited |
| Vote analytics | Basic (%) | Demographics, trends |
| Categories | Default | Custom |
| Ads | Yes | No |
| Anonymous posts | 1/day | Unlimited |
| Profile badges | None | Pro badge + themes |
| API access | No | Yes (100 req/day) |

### B2B Sentiment API (Phase 3)
```
GET /api/v1/sentiment?topic=climate+change&period=30d

Response:
{
  "topic": "climate change",
  "period": "30d",
  "total_posts": 1247,
  "total_votes": 89420,
  "too_soon_percent": 23.4,
  "trend": "decreasing",  // getting less "too soon" over time
  "demographics": {
    "18-24": { "too_soon": 15.2, "not_too_soon": 84.8 },
    "25-34": { "too_soon": 22.1, "not_too_soon": 77.9 },
    "35-50": { "too_soon": 31.8, "not_too_soon": 68.2 }
  }
}
```

Price: $500-5,000/mo based on query volume and data depth.

---

## 🚀 Deployment Pipeline

```
Developer pushes to GitHub
  → Vercel auto-deploys preview (PR branches)
  → Merge to main → Vercel auto-deploys production
  → Supabase migrations run via CLI
```

### Environments
- **Preview:** `preview.nottoosoon.com` (auto per PR)
- **Staging:** `staging.nottoosoon.com` (main branch)
- **Production:** `nottoosoon.com` (release tags)

### CI/CD
- GitHub Actions: lint + type check + test on every PR
- Vercel: auto-deploy on merge
- Supabase: migration files in `/supabase/migrations/`

---

## 📈 Analytics & Tracking

### PostHog (Self-Hosted)
- Page views, user flows, feature usage
- A/B testing for onboarding flows
- Funnel: Visit → Signup → First Vote → First Post → Return Visit → Pro Upgrade

### Key Events to Track
```
- page_view (all pages)
- signup_started
- signup_completed
- vote_cast (too_soon / not_too_soon)
- post_created
- post_shared
- pro_upgrade_started
- pro_upgrade_completed
- category_browsed
- search_performed
```

---

## 🛡️ Content Moderation Strategy

### Automated
- Profanity filter (configurable, not heavy-handed)
- Spam detection (duplicate posts, rate limiting)
- AI-powered toxicity scoring (flag for review, don't auto-remove)

### Community
- Report button on every post
- "Community Guidelines" violations → 3 strikes
- Top users get "moderator" status (gamification)

### Philosophy
"Too Soon" is inherently edgy — the moderation line is harassment/threats, not "offensive." 
The whole point is to push boundaries. Moderate for safety, not sensitivity.

---

## 🔮 Future Features (Phase 3+)

### TooSoon Score
- Every user gets a 0-100 "moral compass" score
- Based on how often your votes align with majority
- High score = "reads the room," low score = "provocateur"
- Displayed on profile, leaderboards

### Live Events Mode
- During award shows, elections, sports → real-time TooSoon feed
- "Is it too soon to call the game?" during the 3rd quarter
- Partnership opportunities with broadcasters

### AI Predictions
- "Based on trends, this topic will be Not Too Soon in ~3 days"
- Uses historical voting patterns + news cycle analysis
- Premium feature for Pro users

### Internationalization
- Culture-specific "too soon" varies massively
- Japan vs USA vs Brazil = wildly different thresholds
- Regional leaderboards and trending

---

*This is a living document. Updated as the product evolves.*
