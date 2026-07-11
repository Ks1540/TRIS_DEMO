import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Middleware to parse JSON
  app.use(express.json());

  // API Route for tagline - generated locally without external API key dependencies
  app.get("/api/tagline", (req, res) => {
    const leads = [
      "Where Clouds Kiss",
      "Secrets of",
      "Whispers from",
      "Echoes across",
      "Nestled within",
      "Adventures in"
    ];
    const centers = [
      "the Misty",
      "the Sacred",
      "the Living",
      "the Emerald",
      "the Ancient",
      "the Rain-Swept"
    ];
    const ends = [
      "Hills",
      "Valleys",
      "Waterfalls",
      "Root Bridges",
      "Canyons",
      "Rainforests"
    ];

    const fallbackTaglines = [
      "Where Clouds Kiss the Hills",
      "The Land of the Floating Clouds",
      "Whispering Rivers and Living Bridges",
      "Canyons of Jade, Hills of Mist",
      "Secrets of the Sacred Rainforest",
      "Rain-Drenched Hills of Living Green",
      "Where Rivers Flow Through Jade",
      "The Scotland of the East"
    ];

    // 50% chance of a curated tagline, 50% chance of a dynamically synthesized tagline
    let tagline = "";
    if (Math.random() > 0.5) {
      tagline = fallbackTaglines[Math.floor(Math.random() * fallbackTaglines.length)];
    } else {
      const l = leads[Math.floor(Math.random() * leads.length)];
      const c = centers[Math.floor(Math.random() * centers.length)];
      const e = ends[Math.floor(Math.random() * ends.length)];
      tagline = `${l} ${c} ${e}`;
    }

    res.json({ tagline });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
