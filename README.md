<div align="center">
  <img src="./public/og.png" alt="Friend Circle Banner" width="100%" style="border-radius: 8px; margin-bottom: 20px;" />

  **A Next-Generation Tactical Adventure & Islamic Lifestyle Platform**

  [![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
  [![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://mongodb.com)
  [![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
  [![Framer Motion](https://img.shields.io/badge/Framer_Motion-0055FF?style=for-the-badge&logo=framer&logoColor=white)](https://framer.com/motion/)
  [![Progressive Web App](https://img.shields.io/badge/PWA-Ready-5a0fc8?style=for-the-badge&logo=pwa&logoColor=white)]()
  
  [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)
  [![Status](https://img.shields.io/badge/Status-Active_Deployment-success?style=for-the-badge&logo=vercel)]()
</div>

<br />

## 📖 System Overview

**Friend Circle** is a high-performance, full-stack web application engineered for the modern Muslim adventurer. Built with a highly premium, "military command console" aesthetic (bone, ink, and signal colors), it seamlessly bridges the gap between tactical outdoor coordination (offroading, hiking, convoys) and daily spiritual discipline (Tazkiyah).

<div align="center">
  <img src="./public/hero-mountains.jpg" width="100%" style="border-radius: 8px;" alt="Friend Circle Hero" />
  <br/>
  <i>No ridge is bigger than Fajr. Exploring Kashmir, Budgam, and Srinagar.</i>
</div>

---

## 📑 Table of Contents

- [System Overview](#-system-overview)
- [Core Modules & Features](#-core-modules--features)
- [The Aesthetic Philosophy](#-the-aesthetic-philosophy)
- [System Architecture](#-system-architecture)
- [Directory Structure](#-directory-structure)
- [Mission Logs & Expeditions](#-mission-logs--expeditions)
- [Future Roadmap](#-future-roadmap)
- [Local Setup & Installation](#-local-setup--installation)
- [Author & Architect](#-author--architect)

---

## ✨ Core Modules & Features

### ⚔️ Tactical & Live-Ops (Command Console)
- **Admin Dashboard:** A heavily stylized, operator-style UI for live-ops tracking, user verification, and telemetry.
- **Analytics & Telemetry:** Integrated with `recharts` to provide actionable, visual insights on financial health, tours, and engagement.
- **Convoy & Loadout System:** Dynamic payload calculation, gear packing lists, and real-time mock telemetry for tracking off-road convoys.
- **Progressive Web App (PWA):** Fully installable on iOS and Android devices with offline-mode capabilities using Service Workers and IndexedDB.

### 🕌 Tazkiyah (Spiritual Discipline)
- **Live AR Qibla Finder:** A custom-built, device-hardware powered Augmented Reality HUD. It uses geodesic math and phone magnetometers/gyroscopes to point operators precisely to Makkah in real-time.
- **Advanced Quran Reader:** Features beautiful Arabic typography, clean layouts, and immersive reading views.
- **Daily Companions:** Interactive Asma-ul-Husna (99 Names of Allah), Daily Hadith, and digital Tasbih with haptic-like animations.
- **Live Prayer Times:** Live integration with the Aladhan API to track prayer times globally, complete with a tactical countdown to the next prayer.

---

## 🎨 The Aesthetic Philosophy

Friend Circle isn't just an app; it's an experience. The UI/UX is deeply inspired by military HUDs, terminal interfaces, and high-end tactical gear. 
- **Typography:** Monospace fonts for data readouts paired with elegant serifs for Arabic text.
- **Color Palette:** High contrast "Ink" (deep black), "Bone" (off-white), and "Signal" (tactical green/orange).
- **Micro-interactions:** Extensive use of `framer-motion` for spring-physics animations, blurred backdrops (glassmorphism), and CRT-style scanline overlays.

<div align="center">
  <img src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExc3I3cnYyeXo3dW84MWI5ZjJ1ZGhmcXQ2emZzaWlxMWl5cmMxcXRlNyZlcD12MV9naWZzX3NlYXJjaCZjdD1n/11Tsyjflf2xq2A/giphy.gif" alt="Tactical HUD Demo" width="600" style="border-radius: 8px; border: 1px solid #333;" />
  <br/>
  <i>(Tactical HUD & AR Systems)</i>
</div>

---

## 🏗 System Architecture

Friend Circle is built on a modern **MERN stack** adapted for the serverless edge:

- **Frontend & Routing:** React 19 and Next.js (App Router) for hybrid Server-Side Rendering (SSR) and Client-Side rendering.
- **State & Animations:** Heavy utilization of `framer-motion` for complex micro-animations and layout transitions.
- **Database Layer:** MongoDB with Mongoose ODMs, featuring optimized schema designs for Trip Memories, Operator Profiles, and Ledger finances.
- **Authentication:** Highly secure `NextAuth.js` implementation supporting Credentials (OTP) and OAuth providers.
- **Media Optimization:** `ImageKit.io` integration combined with on-device browser image compression to handle high-res expedition photos efficiently.
- **Edge Deployment:** Configured with `netlify.toml` for seamless edge deployment and caching on Netlify.

---

## 📂 Directory Structure

A look under the hood at how the Next.js App Router is organized:

```bash
Friend-circle/
├── src/
│   ├── app/                # Next.js 15 App Router (Pages, Layouts, API routes)
│   │   ├── admin/          # Admin Command Console (Live-Ops)
│   │   ├── api/            # Serverless API routes (Auth, Telemetry, Weather)
│   │   ├── convoy/         # Convoy loadout & tracking
│   │   ├── memory/         # Expedition logs and ImageKit galleries
│   │   └── tazkiyah/       # Islamic lifestyle module (Quran, Qibla, Tasbih)
│   ├── components/         # Reusable UI components (Framer Motion, Glassmorphism)
│   ├── lib/                # Database connections, utility functions, auth logic
│   ├── models/             # Mongoose Schemas (User, TripMemory, Ledger)
│   └── types/              # TypeScript type definitions
├── public/                 # Static assets, PWA manifest, service workers
├── next.config.mjs         # Next.js configuration
├── netlify.toml            # Deployment and Edge runtime config
└── tailwind.config.ts      # Custom utility classes and color palette
```

---

## 🏔️ Mission Logs & Expeditions

Friend Circle is rooted in real-world exploration. The platform serves as the digital headquarters for our physical expeditions across the breathtaking landscapes of Kashmir:

- **Trekking & Hiking:** Scaling ridges across Srinagar and Chadoora.
- **Offroading & Convoys:** Coordinating 4x4 operations in remote Budgam territories.
- **Camping & Survival:** Managing loadouts and gear distribution for multi-day camps.
- **Photography & Memory Logging:** High-res archival of our fishing and outdoor operations.

---

## 🚀 Future Roadmap

- [ ] **Real-Time GPS Tracking:** WebSocket integration for live convoy tracking on a tactical map.
- [ ] **Offline Maps Integration:** Mapbox GL integration with downloadable regions for deep-wilderness operations.
- [ ] **Enhanced Admin Roles:** Granular permissions for "Commanders", "Medics", and "Operators".
- [ ] **Push Notifications:** Web Push API integration for prayer time alerts and convoy distress signals.

---

## ⚙️ Local Setup & Installation

**1. Clone the repository:**
```bash
git clone https://github.com/Zuhaib-dev/Friend-circle.git
cd Friend-circle
```

**2. Install dependencies:**
```bash
npm install
```

**3. Configure Environment Variables:**
Create a `.env.local` file in the root directory:
```env
# Database
MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/friend-circle

# Authentication
NEXTAUTH_SECRET=your_super_secret_string
NEXTAUTH_URL=http://localhost:3000

# Media Handling
NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT=https://ik.imagekit.io/your_id
NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY=your_public_key
IMAGEKIT_PRIVATE_KEY=your_private_key
```

**4. Engage Systems:**
```bash
npm run dev
```
Navigate to `http://localhost:3000` to access the command console.

---

## 👨‍💻 Author & Architect

**Zuhaib**  
*Full-Stack Engineer & UI/UX Designer*

I build high-performance, aesthetically striking web applications. Friend Circle is a testament to blending complex system architecture with premium, immersive design.

- 🌐 **Portfolio:** [zuhaibrashid.com](https://zuhaibrashid.com)
- 🐙 **GitHub:** [@Zuhaib-dev](https://github.com/Zuhaib-dev)
- 💼 **LinkedIn:** [linkedin.com/in/zuhaib](https://www.linkedin.com/in/zuhaib-rashid-661345318/)
- 𝕏 **Twitter/X:** [@xuhaib_x9](https://x.com/xuhaib_x9)

---
<div align="center">
  <i>Built with precision and purpose. No ridge is bigger than Fajr.</i>
</div>
