# Friend Circle

A next-generation, high-performance web application built with a modern tech stack. Designed with a sleek, operator-style UI ("CMD"), it integrates advanced dashboards, live telemetry simulations, authentication, and a dedicated Islamic lifestyle module (Tazkiyah).

## ✨ Features

- **Advanced UI/UX**: Sleek, operator-themed interface with smooth Framer Motion micro-animations, glassmorphism, and a highly responsive layout.
- **Tazkiyah Module**: 
  - Comprehensive Quran Reader with Arabic fonts and auto-scrolling audio.
  - Interactive 99 Names of Allah (Asma-ul-Husna) with immersive 3D/holographic styling.
  - Live Prayer Times (Aladhan API integration) and Qibla Compass.
- **Live Ops & Surveillance**: Real-time mock telemetry, convoy tracking, and weather data visualizations.
- **Loadout System**: Dynamic payload calculation and gear packing lists.
- **Team & Operator Management**: 
  - Users can apply to join the "Crew" by uploading a dossier (Profile Picture, Bio, Social links).
  - **Admin Command Console**: Admins can review pending operators, verify their details, and grant clearance.
- **Media Uploads**: Integrated with ImageKit for optimized, compressed image handling.

## 🛠 Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (App Router, React 19)
- **Styling**: Tailwind CSS v4 (with custom utility classes and animations)
- **Database**: MongoDB (via Mongoose)
- **Authentication**: NextAuth.js (Credentials/OTP-based authentication)
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Media**: ImageKit & Browser Image Compression

## ⚙️ Environment Variables

To run this project locally, create a `.env.local` file in the root directory and add the following variables:

```env
# MongoDB Connection String
MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/your-db?retryWrites=true&w=majority

# NextAuth Configuration
NEXTAUTH_SECRET=your_super_secret_string
NEXTAUTH_URL=http://localhost:3000

# Google OAuth Configuration
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

# ImageKit Configuration
NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT=https://ik.imagekit.io/your_id
NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY=your_public_key
IMAGEKIT_PRIVATE_KEY=your_private_key
```

## 🚀 Local Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Zuhaib-dev/Friend-circle.git
   cd Friend-circle
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Run the development server:**
   ```bash
   npm run dev
   ```

4. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000) to see the application in action.

## 🚢 Deployment

This project is optimized for deployment on modern edge platforms like **Netlify** or **Vercel**. 

- If deploying to Netlify, ensure your `middleware.ts` is correctly configured at the root of the `src` directory, and that `NEXTAUTH_URL` is set to your production domain (e.g., `https://your-domain.netlify.app`).
- Set all the environment variables in your hosting provider's dashboard.

## 🛡 Admin / Team Flow

1. **User Registration:** Users sign up using OTP verification.
2. **Enlistment:** Users navigate to `/apply-team` to submit their Operator application (Photo, Bio, Phone, Social Handle).
3. **Verification:** An Admin logs into the Command Console (`/admin`), navigates to **OPERATORS**, reviews the expanded dossiers, and clicks **GRANT CLEARANCE**.
4. **Access:** Approved team members gain access to exclusive `/team` dossier intel and capabilities.

---
*Built with precision and purpose.*
