# TRIS: Immersive Meghalaya Travel & Crafts Boutique

TRIS is a premium web platform designed to celebrate, plan, and support sustainable travel and indigenous artisan crafts in Meghalaya, India. Built with a focus on immersive aesthetics and high-performance frontend micro-interactions, TRIS transports travelers directly into the "Abode of Clouds."

---

## ✨ Features

### 1. Cinematic Scroll-Bound Parallax Hero
- **3D Depth Layout**: Multi-layered kinetic scroll parallax that layers background skies, misty mountain ranges, floating vectors, and foreground cliffs.
- **Atmospheric Animations**: Drifting vector cloud layers and flight-path bird loops passing behind and in front of the typography to create a physical sense of space.
- **Editorial Typography**: Large stylized brand text utilizing the **Permanent Marker** brush font with high letter-spacing and soft drop-shadows.

### 2. Immersive Bento Grid Spot Explorer
- Interactive grid highlighting Meghalaya's top travel destinations:
  - **Double-Decker Living Root Bridge** (Bio-Engineering)
  - **Krang Shuri Waterfalls** (Waterfalls & Lagoons)
  - **Nohkalikai Waterfalls** (Tallest Plunge Falls)
  - **Laitlum Canyons** (End of Hills Vista)
  - **Umngot River in Dawki** (Liquid Glass Waters)
- Detailed drawers showing maps, difficulty tiers, geographical coordinates, weather by seasons, packing advice, and local tribal pathfinder secrets.

### 3. Fair-Trade Artisan Boutique (Shop)
- Boutique catalog containing hand-made organic products (traditional Khasi *Knup* hats, Lakadong Turmeric, Wild Forest Honey, Bamboo Flutes).
- Built-in cart drawer, gift wrapping toggles, local wishlist storage, size selectors, and checkout flows.

### 4. Custom Journey Planner & Homestay Bookings
- Live trip planner supporting custom inputs:
  - Multi-day trip date picks
  - SUV vehicle rentals (Toyota Innova, Mahindra Thar, Force Traveler)
  - Activity tags (Cave exploration, tribal weaving workshops, river canyoning)
  - Real-time costing sheets with step-by-step checkouts.

---

## 🛠️ Technology Stack

- **Core**: React 19 (TypeScript) + Vite
- **Styling**: Tailwind CSS v4 (incorporating high-end design tokens)
- **Animations**: Framer Motion (`motion/react`)
- **Backend API**: Node.js + Express (serving custom taglines)
- **Tooling**: TypeScript, Esbuild, TSX

---

## 🚀 Running Locally

Follow these steps to get the development environment running on your machine:

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed (version 18+ recommended).

### 1. Install Dependencies
Navigate to the project directory and install node modules:
```bash
cd -TRIS-DEMO-main
npm install
```

### 2. Configure Environment Variables
Create a `.env` or `.env.local` file in the project directory:
```env
GEMINI_API_KEY=your_gemini_api_key_here
PORT=3000
```

### 3. Run Development Server
Launch the development server running Express and Vite middleware:
```bash
npm run dev
```
Open your browser and navigate to `http://localhost:3000`.

### 4. Build and Production Run
To bundle static assets and build the Express server code:
```bash
npm run build
npm start
```

---

## 📂 Codebase Directory Structure

```
-TRIS-DEMO-main/
â”œâ”€â”€ public/                # Static assets (images, logos)
â”œâ”€â”€ src/                   # React frontend
â”‚   â”œâ”€â”€ components/        # UI components
â”‚   â”‚   â”œâ”€â”€ ParallaxHero.tsx  # Redesigned parallax hero
â”‚   â”‚   â”œâ”€â”€ HomeView.tsx      # Bento spots grid and season panels
â”‚   â”‚   â”œâ”€â”€ ShopView.tsx      # Artisan boutique catalogue
â”‚   â”‚   â”œâ”€â”€ PlannerView.tsx   # Custom itinerary booking forms
â”‚   â”‚   â””â”€â”€ Navbar.tsx        # Floating global navigation header
â”‚   â”œâ”€â”€ data.ts            # Spot lists, products, and vehicles
â”‚   â”œâ”€â”€ index.css          # Design tokens and theme animations
â”‚   â””â”€â”€ App.tsx            # Main tab switchboard routing
â”œâ”€â”€ server.ts              # Express API server entry
â”œâ”€â”€ package.json           # Scripts and dependencies
â””â”€â”€ vite.config.ts         # Vite build configuration
```