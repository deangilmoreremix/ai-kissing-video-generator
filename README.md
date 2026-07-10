# 💖 AI Kissing Video Generator — Open-Source AI Romance Video SaaS (Powered by Veo 3, Wan 2.7 & Gemini Omni)

> **Merge two portrait photos into a photorealistic romantic kissing video in seconds.** A production-ready, self-hostable Next.js SaaS boilerplate with multi-model AI video generation (Veo 3, Wan 2.7, Gemini Omni, Grok), webhook-backed async delivery, a personal video gallery, and built-in Stripe billing. Powered by the MuAPI AI engine.

**Tech stack:** Next.js 14 (App Router) · Prisma · PostgreSQL · NextAuth (Google OAuth) · Stripe · Tailwind CSS · MuAPI · Webhook-backed async delivery
**Use cases:** Romance content creators · Couples apps · Valentine's Day apps · Social media viral videos · AI entertainment · Fun video generators · Creative gifting tools · Short-form video content

<p align="center">
  <a href="https://github.com/Anil-matcha/awesome-generative-ai-apps">
    <img src="https://img.shields.io/badge/Part%20of-Awesome%20Generative%20AI%20Apps-FFD700?style=for-the-badge&logo=github&logoColor=black" alt="Awesome Generative AI Apps">
  </a>
</p>

> 🎨 **[Explore 50+ more open-source AI apps →](https://github.com/Anil-matcha/awesome-generative-ai-apps)**

## 🌐 Project Details

**GitHub Repository:** [github.com/SamurAIGPT/ai-kissing-video-generator](https://github.com/SamurAIGPT/ai-kissing-video-generator)

**Live Demo Preview:** [ai-kissing-video-generator-amber.vercel.app](https://ai-kissing-video-generator-amber.vercel.app/)

---

## 📸 Application Showcase

![AI Kissing Video Generator Showcase](https://cdn.muapi.ai/data/2/820860332478/Screenshot_2026-05-26_151233.png)

---

AI Kissing Video Generator is a production-ready, highly-optimized AI web application. Out of the box, it seamlessly manages User Authentication, Credits & Billing, Image Upload Proxying, and asynchronous AI scene rendering using a sleek Next.js (App Router) architecture. It empowers romance content creators, couples, and marketing agencies to create high-fidelity emotional animations featuring two separate individuals merged into a single beautiful video scene.

**Why use AI Kissing Video Generator?**

- **Production-Ready SaaS** — Complete with Google OAuth and Stripe Checkout workflows built-in.
- **Side-by-Side Auto-Stitching** — Take exactly two images (male and female) and stitch them together dynamically in the frontend canvas before submitting.
- **Multiple Models** — Support for Google's cinematic `veo3.1-image-to-video`, fast high-motion `wan2.7-image-to-video`, coherent `gemini-omni-image-to-video`, and creative `grok-imagine-image-to-video`.
- **Webhook-Backed AI Delivery** — MuAPI async webhook delivers results directly into the database (`/api/webhooks/ai`), keeping API routes non-blocking and preventing request timeouts.
- **Creations History Gallery** — All generated romantic videos are saved to PostgreSQL. Users can review, compare, play, and download their videos from the gallery or the main workspace page.
- **Responsive Screen-Fitting** — Designed with a fluid layout that fits perfectly on all screens (mobile, tablet, desktop) using stacked adaptive grids on mobile and viewport-locked scrolling on desktop.

---

## ✨ Core Features

### 🎨 AI Kissing Studio (Main Page `/`)
- Two distinct photo dropzones: Left Image (Male) and Right Image (Female).
- Real-time side-by-side composite canvas stitching to seamlessly combine both profiles.
- 4 AI Models with dynamic resolution and duration-based pricing:
  - **Veo 3.1 Pro** — Renders cinematic high-fidelity exactly at 8s. Supports `720p` (500 Hearts), `1080p` (650 Hearts), and `4k` (740 Hearts).
  - **Gemini Omni** — High semantic coherence. Supports `4-10s` and `720p/1080p` (60 + 30 * duration Hearts) or `4k` (300 + 30 * duration Hearts).
  - **Grok Imagine** — Dynamic layout composition. Supports `6-30s` and `480p` (5 * duration Hearts) or `720p` (10 * duration Hearts).
  - **Wan 2.7** — Extreme high-speed dynamic movement. Supports `2-15s` and `720p` (26 * duration Hearts) or `1080p` (40 * duration Hearts).
- Editable default prompt: customizable to fit various kissing speeds, backdrops, and styles.

### 🖼️ Creations History Gallery
- Bottom horizontal thumbnail grid of all generated kissing videos.
- Cards show a thumbnail and indicators for status (`processing` / `completed` / `failed`).
- Playback details with an overlay, prompt details, model ID, and original reference image references.
- Auto-polls every 4 seconds for processing gallery items, plus 3 seconds active generation polling.

### 💳 Stripe Credit Billing (`/pricing`)
- Four romance-themed credit packs (purchasing **Hearts** at `$1 = 200 Hearts`):
  - **Basic Kiss Pack** ($5 / 1,000 Hearts) — Up to 2 Veo 3.1 or 7 Wan 2.7 generations.
  - **Sweetheart Pack** ($10 / 2,000 Hearts) — Up to 4 Veo 3.1, 15 Wan 2.7, or 6 Gemini Omni generations.
  - **Romance Pro Pack** ($20 / 4,000 Hearts — Most Popular) — Up to 8 Veo 3.1, 30 Wan 2.7, or 13 Gemini Omni generations.
  - **Cupid Elite Pack** ($50 / 10,000 Hearts) — Up to 20 Veo 3.1, 76 Wan 2.7, or 33 Gemini Omni generations.
- Credit balance is automatically topped up via Stripe webhook on checkout completion.

### 🔐 Clerk Auth + Per-User API Keys + Credit Persistence
- Authentication is handled by [Clerk](https://clerk.com) (`@clerk/nextjs`) via `clerkMiddleware` and `<ClerkProvider>`. Each Clerk identity is linked to a Prisma `User` record (by `clerkId`), so credit balances and galleries persist per account.
- Users can add their **own MuAPI key** in **Settings (`/settings`)** so generations run under their account; otherwise the shared `MU_API_KEY` is used as a fallback.
- Credits and the saved API-key status are displayed live in the Navbar.

---

## ⚡ Deployment: Vercel & Production

This architecture is engineered explicitly for **Vercel** serverless environments.

### One-Click Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/SamurAIGPT/ai-kissing-video-generator)

### 🔑 Required Environment Variables

To successfully deploy and run, you must populate the following environment variables in your Vercel project settings:

| Service | Variable | Description & Source |
| :--- | :--- | :--- |
| **Database (Supabase)** | `DATABASE_URL` | Supabase Postgres connection string (pooled) |
| | `DIRECT_URL` | Supabase direct (non-pooling) PostgreSQL URL for migrations |
| **App URL** | `NEXT_PUBLIC_APP_URL` | Public base URL of the app (Stripe redirects, webhooks) |
| | `WEBHOOK_URL` | Public URL for MuAPI async callbacks (defaults to `NEXT_PUBLIC_APP_URL`) |
| **Clerk Auth** | `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | Get from [Clerk Dashboard](https://dashboard.clerk.com) |
| | `CLERK_SECRET_KEY` | Get from [Clerk Dashboard](https://dashboard.clerk.com) |
| | `NEXT_PUBLIC_CLERK_SIGN_IN_URL` | Path to the sign-in page (e.g. `/login`) |
| **Stripe Billing** | `STRIPE_SECRET_KEY` | Get from [Stripe Dashboard](https://dashboard.stripe.com/apikeys) |
| | `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Get from [Stripe Dashboard](https://dashboard.stripe.com/apikeys) |
| | `STRIPE_WEBHOOK_SECRET` | Webhook secret for resolving credit purchases |
| **AI Generation** | `MU_API_KEY` | Server-wide fallback MuAPI key from [muapi.ai/access-keys](https://muapi.ai/access-keys?utm_source=github&utm_medium=readme&utm_campaign=ai-kissing-video-generator). Users can also supply their own key in Settings. |

### 🚀 Launching on Vercel: Step-by-Step

1. **Database Provisioning**: Create a new Postgres database (via Supabase or Neon). Retrieve the connection string (`DATABASE_URL`).
2. **Project Creation**: Import your GitHub fork into the Vercel dashboard.
3. **Configure Environment Variables**: Copy the variables above into the Vercel project settings environment tab.
4. **Deploy**: Hit "Deploy". Vercel will automatically run the build steps (`npm run build`).
5. **Database Push**: Run `npx prisma db push` to synchronize database models before launching.
6. **Integrations Setup**:
   - Establish a **Google Cloud OAuth app**, enabling the callback URL: `https://your-app.vercel.app/api/auth/callback/google`
   - Setup a **Stripe Webhook**, pointing to `https://your-app.vercel.app/api/stripe/webhook` and selecting the `checkout.session.completed` event.
   - Register a **MuAPI Webhook** pointing to `https://your-app.vercel.app/api/webhooks/ai` to receive async generation results.

---

## 🛠️ Local Development

Ready to iterate locally? Setup is straightforward.

### Prerequisites

- [Node.js](https://nodejs.org/en/) (v18 or higher)
- A local PostgreSQL instance or a free cloud Database URL.
- [ngrok](https://ngrok.com) (optional, for local MuAPI webhook testing)

### Setup

```bash
# 1. Clone the repository
git clone https://github.com/SamurAIGPT/ai-kissing-video-generator
cd ai-kissing-video-generator

# 2. Install dependencies
npm install

# 3. Setup Environment
cp .env.example .env
# Open .env and insert your specific keys.

# 4. Initialize Database Schema
# Note: Because the database is shared, see the Safety Warning below!
npx prisma generate
npx prisma db push

# 5. Start the Development Server
npm run dev
```

The console should now be active on `http://localhost:3000`.

---

## ⚠️ Database Safety Warning (Shared Pool)

The workspace database is shared with other applications. Running `npx prisma db push` on a clean, empty schema will drop tables belonging to other applications. Always follow the **Pull-Declare-Push-Cleanup** sequence:

1. Run `npx prisma db pull` to fetch all database tables.
2. Declare your `KissingVideoCreation` table and update the relations on the `User` model.
3. Run `npx prisma db push` to add your changes safely.
4. Clean up `schema.prisma` to keep only NextAuth models, `KissingVideoCreation`, and the updated `User` relations.
5. Run `npx prisma generate` to rebuild the type-safe client.

---

## 🏗️ Technical Architecture

```
ai-kissing-video-generator/
├── prisma/
│   └── schema.prisma                  # PostgreSQL models (User, Account, Session, KissingVideoCreation)
├── src/
│   ├── app/                           # Next.js App Router
│   │   ├── page.js                    # Main Kiss Workspace (Uploads, aspect, models, prompts)
│   │   ├── pricing/                   # Pricing page with 4 credit billing plans
│   │   │   └── page.js
│   │   ├── gallery/                   # Gallery route with completions CSS grid
│   │   │   └── page.js
│   │   ├── globals.css                # Global CSS configurations (Tailwind 4)
│   │   ├── layout.js                  # App router top-level layout
│   │   └── api/
│   │       ├── auth/                  # NextAuth credentials handling
│   │       │   └── [...nextauth]/
│   │       │       └── route.js
│   │       ├── creations/             # GET (fetch history & polling) and POST (submit new tasks)
│   │       │   └── route.js
│   │       ├── upload/                # Proxy to forward images securely to MuAPI
│   │       │   └── route.js
│   │       ├── stripe/                # Stripe billing routes
│   │       │   ├── checkout/
│   │       │   │   └── route.js       # Create checkout session
│   │       │   └── webhook/
│   │       │       └── route.js       # Stripe event fulfillment callback
│   │       └── webhooks/              # MuAPI webhooks
│   │           └── ai/
│   │               └── route.js       # Async generation completion callback
│   ├── components/
│   │   ├── Providers.jsx              # SessionProvider wrapper
│   │   └── saas/
│   │       ├── AuthButtons.jsx        # Google Login & Logout controls
│   │       ├── CreditBadge.jsx        # Navbar credit status heart indicator
│   │       └── Navbar.jsx             # Sticky layout navbar header
│   └── lib/
│       ├── auth.js                    # NextAuth adapter configuration
│       ├── config.js                  # Central environment configurations
│       ├── prisma.js                  # Cached Prisma Client instance
│       ├── stripe.js                  # Stripe client initialization
│       └── services/
│           ├── ai.js                  # Submit task, check status, and process callbacks
│           ├── billing.js             # Checkout creation and webhook processing
│           └── user.js                # Add, deduct, and refund credit balances
```

---

## 📄 License

MIT Licensed.

---

_AI Kissing Video Generator: A premium, high-contrast, fully responsive AI kissing video studio built for romance creators, couples, and marketing agencies._
