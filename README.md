# IBD Auto LK - Certified Pre-Owned Vehicle Platform & Dealership Console

A modern, high-performance automotive dealership platform and dealership administration operating system built with **React 19**, **Vite**, **TypeScript**, **Tailwind CSS v4**, **shadcn/ui**, **TanStack Router & Query**, and **Supabase**.

---

## 🌟 Key Features

### 🚗 Public Showroom & Buyer Experience
- **Interactive Vehicle Catalogue**: Fast multi-criteria vehicle filtering by brand, price range, year, transmission, fuel type, and body style.
- **Detailed Vehicle Profiles**: Rich media galleries, DMT certification status, hoist inspection highlights, specifications, and live availability.
- **Physical Inspection & Test Drive Booking**: Seamless booking dialog with date/time selection and custom buyer requirements.
- **Buyer Inquiry & Booking Tracking**: Prospective buyers can track the status of their test-drive booking or trade-in inquiries in real time.
- **Responsive Mobile First Experience**: Native-feeling mobile navigation, bottom sheets, and responsive touch controls.

### 🛡️ Dealership Administration Console (`/admin`)
- **Operational Command Center**: Compact 2x2 mobile KPI metric cards and full desktop operational overview (fleet size, active test drives, inventory asset value, unread inquiries).
- **Daily Manifest & Reservation Drawer**: Inspection schedule management with detailed slide-over sheets for customer contact, target vehicle verification, and one-tap status updates (*Pending*, *Confirmed*, *Completed*, *Cancelled*).
- **Vehicle Fleet Management**: Full CRUD operations for vehicle stock, photo uploads, live pricing updates, and status toggles (*Available*, *Reserved*, *Sold*).
- **Customer Inquiry Desk**: Real-time customer message center with instant read/unread markers and direct phone/email shortcuts.
- **Dark / Light Theme Toggle**: Persistent atmospheric themes tailored for showroom display and night-time operation.

---

## 🛠️ Tech Stack

- **Framework**: React 19 + Vite (TypeScript)
- **Routing**: `@tanstack/react-router` (File-based, type-safe client-side routing)
- **Data Fetching & State**: `@tanstack/react-query`
- **Styling**: Tailwind CSS v4 (`@tailwindcss/vite`)
- **UI & Components**: shadcn/ui + Radix UI + Lucide Icons
- **Backend & Database**: Supabase (`@supabase/supabase-js`)
- **Forms & Validation**: Zod + React Hook Form
- **Notifications**: Sonner

---

## 🚀 Getting Started Locally

### Prerequisites
- Node.js 18+ or 20+
- npm, pnpm, or yarn

### 1. Clone Repository & Install Dependencies
```bash
git clone https://github.com/your-username/ibd-auto-lk.git
cd ibd-auto-lk
npm install
```

### 2. Configure Environment Variables
Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```
Fill in your Supabase project credentials in `.env`:
```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

### 3. Run Development Server
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### 4. Build for Production
```bash
npm run build
```
The compiled, production-ready assets will be generated in `dist/`.

---

## 🌐 Deploying to Netlify

This project is pre-configured for automated continuous deployment with Netlify via `netlify.toml` and `public/_redirects`.

### Option A: One-Click Deploy via GitHub
1. Push this repository to GitHub (see instructions below).
2. Go to [Netlify](https://app.netlify.com/) and click **"Add new site"** > **"Import an existing project"**.
3. Choose **GitHub** and select your repository.
4. Netlify will automatically detect settings from `netlify.toml`:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
5. Under **Environment variables**, add:
   - `VITE_SUPABASE_URL`: Your Supabase URL
   - `VITE_SUPABASE_ANON_KEY`: Your Supabase Anon Key
6. Click **"Deploy site"**.

### Option B: Netlify CLI
```bash
npm install -g netlify-cli
netlify login
netlify init
netlify deploy --prod
```

---

## 📦 Pushing to GitHub

To push this project to a new GitHub repository:

```bash
# 1. Initialize Git repository
git init -b main

# 2. Add all files
git add .

# 3. Create initial commit
git commit -m "feat: complete dealership platform with admin console and netlify config"

# 4. Link your remote GitHub repository
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPOSITORY.git

# 5. Push to GitHub
git push -u origin main
```

---

## 🔒 Security & Environment Secrets
- Secrets (`.env`) are strictly excluded via `.gitignore`.
- Production builds enforce security headers (`X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`, `Strict-Transport-Security`, `Referrer-Policy: strict-origin-when-cross-origin`) via `netlify.toml`.
- Client-side routes are directed cleanly to `/index.html` with HTTP 200 to prevent 404 errors on deep linking or page refreshing.

---

## 📄 License
MIT © IBD Auto LK
