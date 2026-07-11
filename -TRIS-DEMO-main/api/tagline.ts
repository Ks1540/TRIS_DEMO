import type { VercelRequest, VercelResponse } from '@vercel/node';

export default function handler(req: VercelRequest, res: VercelResponse) {
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

  let tagline = "";
  if (Math.random() > 0.5) {
    tagline = fallbackTaglines[Math.floor(Math.random() * fallbackTaglines.length)];
  } else {
    const l = leads[Math.floor(Math.random() * leads.length)];
    const c = centers[Math.floor(Math.random() * centers.length)];
    const e = ends[Math.floor(Math.random() * ends.length)];
    tagline = `${l} ${c} ${e}`;
  }

  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Content-Type', 'application/json');
  return res.status(200).json({ tagline });
}
