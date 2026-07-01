<div align="center">
  <img src="https://capsule-render.vercel.app/api?type=waving&color=16a34a&height=200&section=header&text=Friend%20Circle&fontSize=80&fontColor=ffffff&animation=fadeIn" alt="Friend Circle Banner" />

  **A Next-Generation Tactical Adventure & Islamic Lifestyle Platform**

  [![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
  [![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://mongodb.com)
  [![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
  [![Framer Motion](https://img.shields.io/badge/Framer_Motion-0055FF?style=for-the-badge&logo=framer&logoColor=white)](https://framer.com/motion/)
  [![Progressive Web App](https://img.shields.io/badge/PWA-Ready-5a0fc8?style=for-the-badge&logo=pwa&logoColor=white)]()
</div>

<br />

## 📖 Overview

**Friend Circle** is a high-performance web application engineered for the modern Muslim adventurer. Built with a highly premium, "military command console" aesthetic (bone, ink, and signal colors), it seamlessly bridges the gap between tactical outdoor coordination (offroading, hiking, convoys) and daily spiritual discipline (Tazkiyah).

![Platform Preview](https://raw.githubusercontent.com/Zuhaib-dev/Friend-circle/main/public/manifest-icon-512.png) 
*(Note: Replace the image URL above with a GIF of your actual app in action!)*

---

## ✨ Core Modules & Features

### ⚔️ Tactical & Live-Ops
- **Admin Command Console:** A heavily stylized dashboard for live-ops tracking, operator verification, and telemetry.
- **Analytics Dashboard:** Integrated with `recharts` to provide actionable, visual insights on financial health, tours, and engagement.
- **Convoy & Loadout System:** Dynamic payload calculation, gear packing lists, and real-time mock telemetry for tracking off-road convoys.
- **Progressive Web App (PWA):** Fully installable on iOS and Android devices with offline-mode capabilities using Service Workers and IndexedDB.

### 🕌 Tazkiyah (Spiritual Discipline)
- **Live AR Qibla Finder:** A custom-built, device-hardware powered Augmented Reality HUD that uses geodesic math and phone magnetometers to point operators precisely to Makkah.
- **Advanced Quran Reader:** Features beautiful Arabic typography and immersive reading views.
- **Daily Companions:** Interactive Asma-ul-Husna (99 Names of Allah), Daily Hadith, and digital Tasbih.
- **Prayer Times:** Live integration with the Aladhan API to track prayer times globally.

---

## 🏗 System Architecture

Friend Circle is built on a modern **MERN stack** adapted for the serverless era:

- **Frontend & Routing:** React 19 and Next.js (App Router) for hybrid Server-Side Rendering (SSR) and Client-Side rendering.
- **State & Animations:** Heavy utilization of `framer-motion` for complex micro-animations and layout transitions, creating a fluid, app-like feel.
- **Database Layer:** MongoDB with Mongoose ODMs, featuring optimized schema designs for Trip Memories, Operator Profiles, and Ledger finances.
- **Authentication:** Highly secure `NextAuth.js` implementation supporting Credentials (OTP) and OAuth providers.
- **Media Optimization:** `ImageKit.io` integration combined with on-device browser image compression to handle high-res expedition photos efficiently.
- **Edge Deployment:** Configured with `netlify.toml` for seamless edge deployment and caching on Netlify.

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

- 🌐 **Portfolio:** [zuhaib.dev](https://zuhaib.dev) *(Update this link)*
- 🐙 **GitHub:** [@Zuhaib-dev](https://github.com/Zuhaib-dev)
- 💼 **LinkedIn:** [linkedin.com/in/zuhaib](https://linkedin.com/in/zuhaib) *(Update this link)*
- 𝕏 **Twitter/X:** [@zuhaib_dev](https://twitter.com/zuhaib_dev) *(Update this link)*

---
<div align="center">
  <i>Built with precision and purpose. No ridge is bigger than Fajr.</i>
</div>
