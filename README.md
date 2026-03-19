# 🔥 TooSoon

**Is it too soon? Let the people decide.**

A social voting platform where users submit statements, jokes, opinions, or takes — and the community votes whether it's **Too Soon** or **Not Too Soon**.

🌐 **Website:** [nottoosoon.com](https://nottoosoon.com)

## Stack

- **Frontend:** Next.js 14 + React + Tailwind CSS
- **Backend:** Next.js API Routes
- **Database:** Supabase (PostgreSQL)
- **Auth:** Supabase Auth (Google, Apple, Twitter SSO)
- **Hosting:** Vercel
- **Real-time:** Supabase Realtime

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project Structure

```
├── src/
│   ├── app/
│   │   ├── page.tsx          # Landing page with signup
│   │   ├── layout.tsx        # Root layout + meta
│   │   ├── globals.css       # Tailwind + custom styles
│   │   └── api/
│   │       └── signup/
│   │           └── route.ts  # Waitlist signup endpoint
│   └── components/           # (coming soon)
├── BUSINESS_PLAN.md          # Full business plan & strategy
├── APP_STRATEGY.md           # Technical app strategy & roadmap
└── package.json
```

## Roadmap

See [BUSINESS_PLAN.md](./BUSINESS_PLAN.md) and [APP_STRATEGY.md](./APP_STRATEGY.md) for the full strategy.

## License

Private — All rights reserved.
