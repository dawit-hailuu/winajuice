<<<<<<< HEAD
# 🥤 Wina Juice ዊና ጁስ — Website
this is ma first change ddd
A modern, premium, mobile-first website for **Wina Juice**, a juice house in Summit Fiyel Bet, Addis Ababa.

Built with **Next.js 15**, **TypeScript**, **Tailwind CSS**, and **shadcn/ui**.

![Wina Juice](https://img.shields.io/badge/Next.js-15-black?style=flat-square&logo=next.js) ![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript) ![Tailwind](https://img.shields.io/badge/Tailwind-3.4-06B6D4?style=flat-square&logo=tailwindcss)

---

## ✨ Features

- 🏠 **Home page** — Hero with floating fruits, animated gradients, brand storytelling
- 🍹 **Full menu** — 22 Ethiopian juices, smoothies, salads, breakfast & hot drinks
- 🔍 **Search & filter** — by category, name, ingredient, or health benefit
- ⭐ **Featured carousel** — "Most Popular" items in a swipeable horizontal scroll
- 📱 **QR Menu** — Dedicated `/menu` page optimised for QR-code scanning at tables
- 🎨 **QR generator** — Download a printable PNG of your menu QR
- 🌙 **Dark mode** — Toggle between light and dark themes
- 🔐 **Admin dashboard** — Password-protected `/admin` to add, edit, delete items
- 💬 **WhatsApp ordering** — Floating button + per-item order links
- 📍 **Location & contact** — Embedded Google Map, all 4 branch addresses, social links
- 🔍 **SEO-optimized** — Open Graph, Twitter cards, sitemap, robots.txt
- ♿ **Accessible** — Semantic HTML, ARIA labels, keyboard navigation
- 🚀 **Fast** — Server components, static generation where possible, optimized fonts

---

## 🚀 Quick Start

```bash
# 1. Install dependencies
npm install

# 2. (Optional) Set your admin password
cp .env.example .env.local
# Edit .env.local and change ADMIN_KEY

# 3. Run dev server
npm run dev

# Open http://localhost:3000
```

---

## 🔑 Admin Access

Visit **`/admin`** (or click "Owner login" in the footer).

- **Default password:** `wina2024`
- **To change it:** edit `ADMIN_KEY` in your `.env.local` (or set it as an env var on Vercel)

From the dashboard you can:

- ✅ Add new menu items (with ingredients, health benefits, price, emoji/image)
- ✏️ Edit any existing item
- 🗑️ Delete items
- ⭐ Mark items as "Most Popular"
- 📊 View live stats (total items, popular count, price range)
- 🔎 Search and filter by category

Changes are saved to `data/menu.json` and reflected immediately on the live site.

---

## 📱 QR Code Menu

The `/menu` page is purpose-built for QR scanning:

- Large readable text
- Sticky category navigation
- Minimal design, fast loading
- One tap → full ingredients + health benefits + order on WhatsApp

The QR code itself is generated on the homepage (see the dark "Scan, sip, enjoy" section). **Download it as a PNG** and print it for your tables.

---

## 📁 Project Structure

```
wina-juice/
├── app/
│   ├── layout.tsx              # Fonts, SEO metadata, theme provider
│   ├── page.tsx                # Home page
│   ├── globals.css             # Tailwind + brand palette + dark mode
│   ├── menu/page.tsx           # QR-friendly /menu page
│   ├── admin/page.tsx          # Owner dashboard
│   ├── sitemap.ts, robots.ts   # SEO
│   └── api/
│       ├── admin/login/        # Password verification
│       └── menu/
│           ├── route.ts        # GET (list), POST (create)
│           └── [id]/route.ts   # PATCH (edit), DELETE (remove)
├── components/
│   ├── ui/                     # shadcn primitives
│   ├── navbar.tsx, footer.tsx, logo.tsx
│   ├── hero.tsx                # Floating fruit hero
│   ├── menu-section.tsx        # Search + filter + carousel
│   ├── menu-card.tsx           # Individual juice card
│   ├── menu-item-dialog.tsx    # Detail modal
│   ├── menu-page-client.tsx    # /menu interactive UI
│   ├── about.tsx, reviews.tsx, contact.tsx
│   ├── qr-section.tsx          # Live QR generator
│   ├── whatsapp-float.tsx      # Order button
│   ├── theme-provider.tsx
│   ├── theme-toggle.tsx
│   └── admin-client.tsx        # CRUD dashboard
├── lib/
│   ├── types.ts                # MenuItem, Category types
│   ├── utils.ts                # cn() helper
│   └── menu-store.ts           # JSON read/write
├── data/
│   └── menu.json               # Menu items (22 seeded)
├── .env.example
├── tailwind.config.ts
├── tsconfig.json
├── next.config.mjs
└── package.json
```

---

## ☁️ Deploy to Vercel

### Option 1 — One-click via GitHub

1. Push this project to a GitHub repo
2. Go to [vercel.com/new](https://vercel.com/new) and import the repo
3. In the project settings, add the environment variable:
   - `ADMIN_KEY` = your secure admin password
   - `SITE_URL` = `https://your-domain.com` (used for sitemap)
4. Click **Deploy** — done!

### Option 2 — Vercel CLI

```bash
npm i -g vercel
vercel
# Follow the prompts. After first deploy:
vercel env add ADMIN_KEY production
vercel --prod
```

### ⚠️ Important note on data persistence on Vercel

Vercel's serverless filesystem is **read-only at runtime**. The included JSON-based storage works perfectly for **development**, **demos**, and **single-server deployments** (e.g., Railway, Render, a VPS, or `vercel dev`), but for production on Vercel you should swap `lib/menu-store.ts` to use one of:

- **Vercel KV** (Redis) — simplest swap
- **Vercel Postgres** or **Neon** — for richer queries
- **Supabase** — Postgres + auth + storage
- **PlanetScale** or **Turso** (SQLite at the edge)

The `lib/menu-store.ts` module is intentionally small and isolated — replace the five exported functions (`readMenu`, `writeMenu`, `addItem`, `updateItem`, `deleteItem`) and everything else keeps working.

**For local dev / self-hosted servers / non-Vercel hosts** the JSON file works out of the box.

---

## 🎨 Customisation

### Colors

Open `app/globals.css` — all brand colors live in the `:root` block as HSL variables.
Edit them once and they propagate through the whole site (cards, badges, buttons, gradients).

The palette:
- `--primary` — Deep forest green (`152 50% 24%`)
- `--accent` — Coral-orange (`16 78% 55%`)
- `--leaf`, `--citrus`, `--sunshine`, `--coral`, `--cream` — Accent ramps

### Fonts

In `app/layout.tsx`:
- `Fraunces` — Display (headings)
- `Plus Jakarta Sans` — Body

Both load from `next/font/google` with `display: swap` and are zero-config.

### Menu data

Two options:
1. **Through the UI** — sign in at `/admin` and use the dashboard
2. **Directly in JSON** — edit `data/menu.json` (matches the `MenuItem` type in `lib/types.ts`)

### Branches & contact

- Phone, Telegram, Instagram, Facebook → `components/contact.tsx` and `components/footer.tsx`
- 4 branch addresses → `BRANCHES` array in `components/contact.tsx`
- Google Maps embed → inside `Contact` component, change the `src` query

### WhatsApp number

Search project-wide for `251945292929` and replace if needed (appears in `navbar`, `menu-item-dialog`, `whatsapp-float`, `menu-page-client`, `contact`, `footer`).

---

## 🛠️ Scripts

| Command | What it does |
|---|---|
| `npm run dev` | Start dev server on `http://localhost:3000` |
| `npm run build` | Production build |
| `npm run start` | Run production build |
| `npm run lint` | Lint check |

---

## 🧰 Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript 5
- **Styling:** Tailwind CSS 3.4 + `tailwindcss-animate`
- **Components:** shadcn/ui (Radix UI primitives) — Button, Card, Dialog, Tabs, Badge, Input, Label, Textarea
- **Icons:** lucide-react
- **Fonts:** Fraunces + Plus Jakarta Sans (Google Fonts via next/font)
- **QR generation:** qrcode (canvas)
- **Theme:** next-themes (light/dark)
- **Storage:** JSON file (swap-friendly interface in `lib/menu-store.ts`)

---

## 📞 Contact (Wina Juice)

- 📍 **Summit Fiyel Bet, Addis Ababa, Ethiopia** (flagship)
- 📞 +251 94 529 2929
- ✈️ Telegram: [@winajuices](https://t.me/winajuices)
- 📘 Facebook: [WINA JUICE ዊና ጁስ](https://www.facebook.com/WinaJuices/)
- 📸 Instagram: [@winajuices](https://instagram.com/winajuices)

Other branches: Ras Desta Hospital · Shola Gebeya · Addisu Gebeya

---

## 📄 License

This project is delivered as a custom build for Wina Juice. Reuse and adaptation rights as agreed in your engagement.

---

Made with 🍊 in Addis Ababa.
=======
"# winajuice" 
>>>>>>> 43c7b262647fa807d4c57052e961335de579bad1
