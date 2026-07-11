import { useState, useEffect, useRef } from 'react';
import { Compass, ShoppingBag, ArrowRight, Star, Heart, MapPin, Eye, X, Calendar, Sun, CloudRain, Wind, HelpCircle, ChevronDown, Check, Award, MessageSquare, Handshake, ShieldQuestion } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { ParallaxHero } from './ParallaxHero';

// Pure vector-based illustrations used for immersive 3D horizontal parallax scroll

interface HomeViewProps {
  onShopClick: () => void;
  onPlanClick: () => void;
}

interface TouristPlace {
  id: string;
  title: string;
  location: string;
  category: string;
  description: string;
  longDescription: string;
  bestTime: string;
  coordinates: string;
  trekDifficulty: 'Easy' | 'Moderate' | 'Challenging';
  highlights: string[];
  localTip: string;
  recommendedProduct: {
    name: string;
    reason: string;
  };
  image: string;
}

const TOURIST_PLACES: TouristPlace[] = [
  {
    id: 'spot-1',
    title: "Double-Decker Living Root Bridge",
    location: "Nongriat Village, Cherrapunji",
    category: "Bio-Engineering",
    description: "Centuries-old living suspension bridges carefully grown from rubber tree roots by indigenous Khasi tribal engineers.",
    longDescription: "Deep in the sub-tropical valleys near Cherrapunji, Khasi elders train the roots of the Ficus elastica trees across river streams using hollowed betel nut trunks. Over decades, these roots grow strong enough to support over 50 people at once. Nongriat's double-decker structure is the most famous living bridge in the world, standing as a pristine tribute to sustainable human-nature harmony.",
    bestTime: "September to May (avoid peak monsoons for safer trekking)",
    coordinates: "25.2508° N, 91.7706° E",
    trekDifficulty: "Challenging",
    highlights: ["3,200 steep stone steps", "Deep blue natural swimming pools", "Multiple suspended wire bridges"],
    localTip: "Start your trek early in the morning (around 6 AM) to beat the humidity and return before sunset. Hire a local guide from Tyrna village to support the community and listen to authentic folk tales.",
    recommendedProduct: {
      name: "Khasi Traditional Hat (Knup)",
      reason: "Hand-woven from palm leaves, it serves as the ultimate shield against sudden highland rainfall during the long trek."
    },
    image: "https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?q=80&w=800"
  },
  {
    id: 'spot-2',
    title: "Krang Shuri Waterfalls",
    location: "Jowai, Jaintia Hills",
    category: "Waterfalls & Lagoons",
    description: "A breathtaking waterfall cascading into an ethereal, turquoise blue natural limestone pool tucked in a dense forest canopy.",
    longDescription: "Located deep within the Jaintia Hills district, Krang Shuri is widely regarded as the most aesthetic plunge pool waterfall in Meghalaya. The water flows over limestone beds, filtering it into a rare neon-turquoise hue that is absolutely magical. The surrounding paths are paved using local multi-colored river gravel, preserving the organic atmosphere of the forest.",
    bestTime: "October to February (water turns brilliant blue post-monsoon)",
    coordinates: "25.3456° N, 92.5182° E",
    trekDifficulty: "Easy",
    highlights: ["Lush forest walking trail", "Turquoise natural plunge swimming", "Bamboo boating on the river"],
    localTip: "Life jackets are strictly mandatory for swimming here and can be rented at the entrance for ₹50. Visit during weekdays to experience the tranquil forest sounds in absolute solitude.",
    recommendedProduct: {
      name: "Wild Forest Honey",
      reason: "A jar of pure jungle honey sourced from Jaintia mountain hives is perfect to re-energize after a relaxing swim."
    },
    image: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?q=80&w=800"
  },
  {
    id: 'spot-3',
    title: "Nohkalikai Waterfalls",
    location: "Sohra (Cherrapunji)",
    category: "Waterfalls",
    description: "The tallest plunge waterfall in India, roaring down 1,115 feet into an emerald-green forest lagoon draped in dense mist.",
    longDescription: "Plunging from a dramatic highland plateau, Nohkalikai represents the raw, majestic water power of Cherrapunji—one of the wettest places on earth. The falls are steeped in a hauntingly beautiful Khasi legend of a mother named Likai. The viewpoint offers panoramic cliffs, cascading mountain streams, and endless cloud formations rising from the plains of Bangladesh.",
    bestTime: "June to September for massive thunderous volume; October to April for clear views",
    coordinates: "25.2753° N, 91.6854° E",
    trekDifficulty: "Easy",
    highlights: ["Highest waterfall viewpoint", "Dramatic canyon cloud-rise", "Artisan local market stalls"],
    localTip: "Bring a light windcheater or shawl as the wind at the Nohkalikai canyon edge is incredibly strong and can carry cool cloud spray even on sunny afternoons.",
    recommendedProduct: {
      name: "Lakadong Turmeric Powder",
      reason: "Grown near these wet slopes, its exceptionally high curcumin content is perfect to brew warm, restorative highland tea."
    },
    image: "https://images.unsplash.com/photo-1448375240586-882707db888b?q=80&w=800"
  },
  {
    id: 'spot-4',
    title: "Laitlum Canyons",
    location: "Smit, East Khasi Hills",
    category: "Hills & Vistas",
    description: "Popularly known as the 'End of Hills', boasting sheer 3,000-feet cliff drops, velvet-green valleys, and floating mountain mists.",
    longDescription: "Laitlum translates literally to 'The End of the Hills'. It is a vast, wind-swept plateau offering sweeping 360-degree views of deep gorges, sheer rocky cliffs, and tiny tribal villages nestled thousands of feet below. It's common to watch clouds roll upwards from the plains, entirely blanketing the canyon in a matter of seconds before clearing up to reveal golden sunshine.",
    bestTime: "September to April (visit during sunrise/sunset for dramatic rays)",
    coordinates: "25.4485° N, 91.8967° E",
    trekDifficulty: "Moderate",
    highlights: ["Dramatic sheer rock drops", "Ancient wooden ropeways", "Lush grassy picnic ridges"],
    localTip: "There is a steep, 3,000-step stone path down to the village of Rasong. Walk down to experience raw rural valley life, but remember that ascending back up requires good physical endurance!",
    recommendedProduct: {
      name: "Hand-Woven Khasi Shawl",
      reason: "Woven by our master crafters, this cozy premium wool shawl keeps you warm against the chilling wind at the canyon edge."
    },
    image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=800"
  },
  {
    id: 'spot-5',
    title: "Umngot River (Dawki)",
    location: "Dawki, Border Region",
    category: "Crystal Waters",
    description: "A miracle of transparency—where glass-like waters make traditional wooden boats look like they are floating in mid-air.",
    longDescription: "Flowing gracefully through the West Jaintia Hills and bordering Bangladesh, the Umngot River is world-renowned for its absolute, glass-like clarity. During the winter season, the water is completely transparent, allowing you to count pebbles on the riverbed 20 feet below. Colorful Khasi and Jaintia fishing boats glide effortlessly over this liquid glass.",
    bestTime: "November to March (the dry winter months are essential for crystal clarity)",
    coordinates: "25.1842° N, 92.0151° E",
    trekDifficulty: "Easy",
    highlights: ["Suspension bridge panorama", "Snorkeling and cliff diving", "Traditional wooden boat tours"],
    localTip: "Ask your boatman to row you past the suspension bridge into the quieter stone gorges. The rocky rock formations and quiet nature echoes here are incredibly peaceful.",
    recommendedProduct: {
      name: "Traditional Bamboo Flute",
      reason: "Its clear, resonant acoustic notes mimic the peaceful, dripping echoes of the Dawki stone canyon gorges."
    },
    image: "https://images.unsplash.com/photo-1581540222194-0def2dda95b8?q=80&w=800"
  }
];

const PINE_TREES = [
  // Left side scattered trees (on the left hill, y around 380 - 460)
  { x: 30, y: 395, scale: 1.1, opacity: 0.95 },
  { x: 75, y: 405, scale: 1.45, opacity: 1.0 },
  { x: 130, y: 420, scale: 1.0, opacity: 0.9 },
  { x: 190, y: 445, scale: 1.25, opacity: 0.95 },
  { x: 250, y: 460, scale: 0.9, opacity: 0.85 },
  
  // Center valley/meadow smaller background trees (y around 480 - 510)
  { x: 340, y: 485, scale: 0.6, opacity: 0.75 },
  { x: 390, y: 495, scale: 0.5, opacity: 0.8 },
  { x: 450, y: 505, scale: 0.45, opacity: 0.75 },
  { x: 520, y: 512, scale: 0.55, opacity: 0.8 },
  { x: 590, y: 502, scale: 0.7, opacity: 0.85 },
  { x: 650, y: 485, scale: 0.85, opacity: 0.9 },

  // Right side dense forest (y climbing up from 450 to 280)
  { x: 710, y: 445, scale: 1.2, opacity: 0.9 },
  { x: 750, y: 410, scale: 1.45, opacity: 0.95 },
  { x: 790, y: 375, scale: 1.7, opacity: 1.0 },
  { x: 830, y: 340, scale: 1.95, opacity: 1.0 },
  { x: 870, y: 305, scale: 2.25, opacity: 1.0 },
  { x: 915, y: 275, scale: 2.5, opacity: 1.0 },
  { x: 960, y: 245, scale: 2.8, opacity: 1.0 },
  { x: 995, y: 220, scale: 2.9, opacity: 1.0 },

  // Foreground offset trees on the right forest for dense overlapping feel
  { x: 730, y: 455, scale: 1.35, opacity: 0.95 },
  { x: 775, y: 415, scale: 1.6, opacity: 1.0 },
  { x: 815, y: 380, scale: 1.9, opacity: 1.0 },
  { x: 855, y: 345, scale: 2.1, opacity: 1.0 },
  { x: 900, y: 310, scale: 2.4, opacity: 1.0 },
  { x: 945, y: 275, scale: 2.7, opacity: 1.0 },
  { x: 980, y: 245, scale: 2.85, opacity: 1.0 }
];

const LEAF_IMAGE = "https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&w=600&q=80";

const GALLERY_IMAGES = [
  {
    id: "g1",
    title: "Double-Decker Root Bridge",
    location: "Cherrapunji",
    caption: "A living bio-engineered suspension bridge grown organically over decades from rubber tree roots.",
    url: "https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?auto=format&fit=crop&w=1200&q=80",
    size: "md:col-span-2 md:row-span-2",
  },
  {
    id: "g2",
    title: "Dawki Liquid Glass",
    location: "Umngot River",
    caption: "Traditional wooden canoes floating on the crystal-clear turquoise waters bordering Bangladesh.",
    url: "https://images.unsplash.com/photo-1581540222194-0def2dda95b8?auto=format&fit=crop&w=1200&q=80",
    size: "md:col-span-1 md:row-span-1",
  },
  {
    id: "g3",
    title: "Laitlum Canyon Cliff Edge",
    location: "Smit Valley",
    caption: "Sheer rock drops and velvet-green mountains disappearing into dense, rolling canyon mists.",
    url: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=1200&q=80",
    size: "md:col-span-1 md:row-span-2",
  },
  {
    id: "g4",
    title: "Mawphlang Sacred Canopy",
    location: "Sacred Forest",
    caption: "Ancient moss-covered trees protected for centuries by traditional Khasi environmental laws.",
    url: "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1200&q=80",
    size: "md:col-span-1 md:row-span-1",
  },
  {
    id: "g5",
    title: "Krang Shuri Limestone Pool",
    location: "Jowai",
    caption: "Limestone filtered waters cascading into a vibrant neon turquoise jungle plunge pool.",
    url: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&w=1200&q=80",
    size: "md:col-span-2 md:row-span-1",
  }
];

export default function HomeView({ onShopClick, onPlanClick }: HomeViewProps) {
  const [selectedSpot, setSelectedSpot] = useState<TouristPlace | null>(null);
  const [activeSeason, setActiveSeason] = useState<'monsoon' | 'autumn' | 'winter' | 'spring'>('winter');
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [activeGalleryImage, setActiveGalleryImage] = useState<typeof GALLERY_IMAGES[0] | null>(null);
  const [tagline, setTagline] = useState<string>("Where Clouds Kiss the Hills");

  useEffect(() => {
    fetch("/api/tagline")
      .then((res) => res.json())
      .then((data) => {
        if (data.tagline) {
          setTagline(data.tagline);
        }
      })
      .catch((err) => console.error("Error fetching tagline from API:", err));
  }, []);

  const SEASONS_DATA = {
    monsoon: {
      months: "June - September",
      title: "The Wet, Emerald Awakening",
      description: "Witness Nohkalikai and other falls at their thunderous, record-breaking peak volume. The entire state becomes a vibrant, misty green jungle.",
      temp: "18°C - 23°C",
      humidity: "Very High (Rainy)",
      icon: CloudRain,
    },
    autumn: {
      months: "October - November",
      title: "Golden Sunsets & Clean Air",
      description: "As the rains withdraw, clear blue skies reveal panoramic valley views. Perfect for clicking photos of the high canyons and sacred groves.",
      temp: "15°C - 20°C",
      humidity: "Pleasant & Breezy",
      icon: Wind,
    },
    winter: {
      months: "December - February",
      title: "The Floating Glass Season",
      description: "The ideal time to visit the Umngot River in Dawki. The water is completely dry and crystal clear, looking exactly like transparent glass.",
      temp: "6°C - 16°C",
      humidity: "Crisp & Cold",
      icon: Sun,
    },
    spring: {
      months: "March - May",
      title: "Blooming Orchids & Warm Trails",
      description: "Highland orchids burst into full bloom. Warm days are perfect for long cave explorations and multi-day root bridge trekking adventures.",
      temp: "14°C - 25°C",
      humidity: "Mild & Spring-like",
      icon: Compass,
    }
  };

  const FAQs = [
    {
      q: "How do we get local entry permits and tribal clearances?",
      a: "TRIS handles 100% of the paperwork for you. When you book a route through our Plan Your Trip platform, we secure your Meghalaya Entry Tourism Permits, community clearances for sacred forests, and tribal homestay approvals well in advance."
    },
    {
      q: "Is it safe to travel to remote root bridges and waterfalls?",
      a: "Absolutely. All of our guided treks are led by native Khasi and Jaintia pathfinders from local villages (like Nongriat or Tyrna). They have intimate knowledge of the terrain, weather patterns, and safe passage ways, ensuring a secure and culturally enriching journey."
    },
    {
      q: "How does TRIS support local indigenous communities?",
      a: "Sustainable tourism is our absolute core. Over 85% of your travel booking fee goes directly back to local tribal homestays, community-based forest conservation groups, and indigenous guides. Additionally, our boutique shop practices direct-fair-trade with master cane weavers and clay sculptors."
    },
    {
      q: "What is your cancellation and refund policy?",
      a: "We offer full refunds up to 7 days before your journey starts. Because we pay tribal homestays and community permits in advance to secure bookings, cancellations within 7 days receive a 50% refund or a full credit to reschedule for any future date."
    }
  ];

  const TESTIMONIALS = [
    {
      text: "Trekking deep into Nongriat to cross the double-decker root bridge was a spiritual experience. Staying at a local Khasi home and sharing dinner by the fire was something I will cherish forever.",
      author: "Aditi Sen",
      location: "Kolkata, India",
      rating: 5
    },
    {
      text: "The boat ride in Dawki was exactly like floating on transparent glass. TRIS organized everything seamlessly—the SUV, private local guide, and permits. Highly professional and deeply authentic.",
      author: "Robert Miller",
      location: "London, UK",
      rating: 5
    },
    {
      text: "I bought a hand-woven cane planter and some Lakadong turmeric from their shop. The quality is exquisite, and knowing that it supports local Khasi women weavers makes it incredibly special.",
      author: "Priya Sharma",
      location: "Mumbai, India",
      rating: 5
    }
  ];

  const SeasonIcon = SEASONS_DATA[activeSeason].icon;

  return (
    <div className="bg-brand-cream min-h-screen text-brand-charcoal" id="home-view-root">
      
      {/* 1. CINEMATIC VERTICAL PARALLAX STORYTELLING CANVASES (Enabling reusable multi-speed scroll-bound elements) */}
      <ParallaxHero 
        onShopClick={onShopClick}
        onPlanClick={onPlanClick}
        tagline={tagline}
      />

      {/* 2. DYNAMIC BENTO GRID OF TOURIST SPOTS */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24" id="about-tris-section">
        <div className="space-y-4 mb-16 text-center md:text-left">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-brand-olive bg-brand-lime/50 px-3.5 py-1.5 rounded-full">
            Mystical Trails & Wonders
          </span>
          <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-brand-charcoal-light tracking-tight leading-tight">
            Discover Meghalaya's Wonders
          </h2>
          <p className="text-sm text-brand-gray max-w-2xl leading-relaxed font-sans">
            Click on any iconic destination below to discover custom trekking trails, local travel tips, geographical coordinates, and authentic recommended gear.
          </p>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" id="bento-grid">
          
          {/* Bento Card 1: Nongriat Root Bridge */}
          <div 
            onClick={() => setSelectedSpot(TOURIST_PLACES[0])}
            className="md:col-span-2 group relative overflow-hidden rounded-3xl bg-brand-charcoal border border-brand-lime/10 shadow-sm hover:shadow-xl hover:scale-[1.01] transition-all cursor-pointer h-96"
          >
            <img 
              src={TOURIST_PLACES[0].image} 
              alt={TOURIST_PLACES[0].title}
              referrerPolicy="no-referrer"
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-80"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
            
            <div className="absolute top-5 left-5 flex gap-2">
              <span className="px-3 py-1 bg-brand-olive text-white text-[10px] font-mono uppercase tracking-wider font-bold rounded-full">
                {TOURIST_PLACES[0].category}
              </span>
              <span className="px-3 py-1 bg-red-600 text-white text-[10px] font-mono uppercase tracking-wider font-bold rounded-full">
                Difficulty: {TOURIST_PLACES[0].trekDifficulty}
              </span>
            </div>

            <div className="absolute bottom-6 left-6 right-6 space-y-2 text-white">
              <div className="flex items-center gap-1.5 text-brand-lime text-xs font-mono">
                <MapPin className="w-3.5 h-3.5" />
                <span>{TOURIST_PLACES[0].location}</span>
              </div>
              <h3 className="font-display font-extrabold text-xl sm:text-2xl leading-tight">
                {TOURIST_PLACES[0].title}
              </h3>
              <p className="text-xs text-white/80 line-clamp-2 max-w-xl font-sans">
                {TOURIST_PLACES[0].description}
              </p>
              <div className="pt-2 flex items-center gap-1.5 text-xs text-brand-lime font-bold group-hover:translate-x-1 transition-transform">
                <span>View Trek Guide & Local Secrets</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          </div>

          {/* Bento Card 2: Krang Shuri */}
          <div 
            onClick={() => setSelectedSpot(TOURIST_PLACES[1])}
            className="lg:row-span-2 group relative overflow-hidden rounded-3xl bg-brand-charcoal border border-brand-lime/10 shadow-sm hover:shadow-xl hover:scale-[1.01] transition-all cursor-pointer h-96 lg:h-full min-h-[384px]"
          >
            <img 
              src={TOURIST_PLACES[1].image} 
              alt={TOURIST_PLACES[1].title}
              referrerPolicy="no-referrer"
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-85"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
            
            <div className="absolute top-5 left-5">
              <span className="px-3 py-1 bg-brand-olive text-white text-[10px] font-mono uppercase tracking-wider font-bold rounded-full">
                {TOURIST_PLACES[1].category}
              </span>
            </div>

            <div className="absolute bottom-6 left-6 right-6 space-y-2 text-white">
              <div className="flex items-center gap-1.5 text-brand-lime text-xs font-mono">
                <MapPin className="w-3.5 h-3.5" />
                <span>{TOURIST_PLACES[1].location}</span>
              </div>
              <h3 className="font-display font-extrabold text-xl leading-tight">
                {TOURIST_PLACES[1].title}
              </h3>
              <p className="text-xs text-white/80 line-clamp-3 font-sans">
                {TOURIST_PLACES[1].description}
              </p>
              <div className="pt-2 flex items-center gap-1.5 text-xs text-brand-lime font-bold group-hover:translate-x-1 transition-transform">
                <span>View Trek Guide & Local Secrets</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          </div>

          {/* Bento Card 3: Nohkalikai */}
          <div 
            onClick={() => setSelectedSpot(TOURIST_PLACES[2])}
            className="group relative overflow-hidden rounded-3xl bg-brand-charcoal border border-brand-lime/10 shadow-sm hover:shadow-xl hover:scale-[1.01] transition-all cursor-pointer h-80"
          >
            <img 
              src={TOURIST_PLACES[2].image} 
              alt={TOURIST_PLACES[2].title}
              referrerPolicy="no-referrer"
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-80"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
            
            <div className="absolute top-5 left-5">
              <span className="px-3 py-1 bg-brand-olive text-white text-[10px] font-mono uppercase tracking-wider font-bold rounded-full">
                {TOURIST_PLACES[2].category}
              </span>
            </div>

            <div className="absolute bottom-6 left-6 right-6 space-y-2 text-white">
              <div className="flex items-center gap-1.5 text-brand-lime text-xs font-mono">
                <MapPin className="w-3.5 h-3.5" />
                <span>{TOURIST_PLACES[2].location}</span>
              </div>
              <h3 className="font-display font-extrabold text-lg leading-tight">
                {TOURIST_PLACES[2].title}
              </h3>
              <p className="text-xs text-white/80 line-clamp-2 font-sans">
                {TOURIST_PLACES[2].description}
              </p>
              <div className="pt-1.5 flex items-center gap-1.5 text-xs text-brand-lime font-bold">
                <span>View Guide</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>
          </div>

          {/* Bento Card 4: Laitlum Canyons */}
          <div 
            onClick={() => setSelectedSpot(TOURIST_PLACES[3])}
            className="group relative overflow-hidden rounded-3xl bg-brand-charcoal border border-brand-lime/10 shadow-sm hover:shadow-xl hover:scale-[1.01] transition-all cursor-pointer h-80"
          >
            <img 
              src={TOURIST_PLACES[3].image} 
              alt={TOURIST_PLACES[3].title}
              referrerPolicy="no-referrer"
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-80"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
            
            <div className="absolute top-5 left-5">
              <span className="px-3 py-1 bg-brand-olive text-white text-[10px] font-mono uppercase tracking-wider font-bold rounded-full">
                {TOURIST_PLACES[3].category}
              </span>
            </div>

            <div className="absolute bottom-6 left-6 right-6 space-y-2 text-white">
              <div className="flex items-center gap-1.5 text-brand-lime text-xs font-mono">
                <MapPin className="w-3.5 h-3.5" />
                <span>{TOURIST_PLACES[3].location}</span>
              </div>
              <h3 className="font-display font-extrabold text-lg leading-tight">
                {TOURIST_PLACES[3].title}
              </h3>
              <p className="text-xs text-white/80 line-clamp-2 font-sans">
                {TOURIST_PLACES[3].description}
              </p>
              <div className="pt-1.5 flex items-center gap-1.5 text-xs text-brand-lime font-bold">
                <span>View Guide</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>
          </div>

          {/* Bento Card 5: Dawki Umngot River */}
          <div 
            onClick={() => setSelectedSpot(TOURIST_PLACES[4])}
            className="md:col-span-2 group relative overflow-hidden rounded-3xl bg-brand-charcoal border border-brand-lime/10 shadow-sm hover:shadow-xl hover:scale-[1.01] transition-all cursor-pointer h-80"
          >
            <img 
              src={TOURIST_PLACES[4].image} 
              alt={TOURIST_PLACES[4].title}
              referrerPolicy="no-referrer"
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-80"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-transparent" />
            
            <div className="absolute top-5 left-5">
              <span className="px-3 py-1 bg-brand-olive text-white text-[10px] font-mono uppercase tracking-wider font-bold rounded-full">
                {TOURIST_PLACES[4].category}
              </span>
            </div>

            <div className="absolute bottom-6 left-6 right-6 space-y-2 text-white">
              <div className="flex items-center gap-1.5 text-brand-lime text-xs font-mono">
                <MapPin className="w-3.5 h-3.5" />
                <span>{TOURIST_PLACES[4].location}</span>
              </div>
              <h3 className="font-display font-extrabold text-xl sm:text-2xl leading-tight">
                {TOURIST_PLACES[4].title}
              </h3>
              <p className="text-xs text-white/80 line-clamp-2 max-w-xl font-sans">
                {TOURIST_PLACES[4].description}
              </p>
              <div className="pt-2 flex items-center gap-1.5 text-xs text-brand-lime font-bold group-hover:translate-x-1 transition-transform">
                <span>View Trek Guide & Local Secrets</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* 3. INTERACTIVE SEASONS & CLIMATE ENGINE */}
      <div className="bg-brand-cream-dark py-20 border-y border-brand-cream-dim" id="interactive-seasons">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left explanation text */}
            <div className="lg:col-span-5 space-y-6">
              <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-brand-olive bg-white px-3 py-1.5 rounded-full border border-brand-cream-dim">
                Highland Climate Guide
              </span>
              <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-brand-charcoal-light tracking-tight leading-tight">
                When is the perfect time to visit?
              </h2>
              <p className="text-xs sm:text-sm text-brand-gray leading-relaxed font-sans">
                Meghalaya represents different moods across the year. Use our seasonal visualizer to understand what to expect, packing guidelines, and the current state of local waterways.
              </p>

              {/* Season Selection Buttons */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                {(['monsoon', 'autumn', 'winter', 'spring'] as const).map((season) => (
                  <button
                    key={season}
                    onClick={() => setActiveSeason(season)}
                    className={`px-4 py-3 text-xs font-display font-bold uppercase tracking-wider rounded-xl border text-center transition-all cursor-pointer ${
                      activeSeason === season
                        ? 'bg-[#155e37] border-[#155e37] text-white shadow-md scale-102'
                        : 'bg-white border-brand-cream-dim text-brand-gray hover:border-brand-olive/50'
                    }`}
                  >
                    {season}
                  </button>
                ))}
              </div>
            </div>

            {/* Right Interactive Information Panel */}
            <div className="lg:col-span-7">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeSeason}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.35 }}
                  className="bg-white border border-brand-lime/15 rounded-3xl p-6 sm:p-10 shadow-lg space-y-6 relative overflow-hidden"
                >
                  {/* Watermark season icon */}
                  <div className="absolute -top-10 -right-10 text-brand-lime/20 pointer-events-none">
                    <SeasonIcon className="w-40 h-40" />
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold uppercase tracking-wider text-brand-olive bg-brand-lime/30 px-3 py-1 rounded-full">
                      {SEASONS_DATA[activeSeason].months}
                    </span>
                    <div className="flex gap-4 text-xs font-semibold text-brand-gray">
                      <span>Avg Temp: <strong className="text-brand-charcoal font-mono">{SEASONS_DATA[activeSeason].temp}</strong></span>
                      <span>Humidity: <strong className="text-brand-charcoal font-mono">{SEASONS_DATA[activeSeason].humidity}</strong></span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h3 className="font-display font-extrabold text-xl sm:text-2xl text-brand-charcoal-light">
                      {SEASONS_DATA[activeSeason].title}
                    </h3>
                    <p className="text-sm text-brand-gray leading-relaxed font-sans">
                      {SEASONS_DATA[activeSeason].description}
                    </p>
                  </div>

                  {/* Highlights checklist */}
                  <div className="border-t border-brand-cream-dim pt-4 space-y-3">
                    <span className="block text-[10px] font-mono font-bold uppercase tracking-widest text-brand-gray">
                      Recommended Activities
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-brand-charcoal font-semibold">
                      {activeSeason === 'monsoon' && (
                        <>
                          <div className="flex items-center gap-2">🟢 Waterfall Sightseeing</div>
                          <div className="flex items-center gap-2">🟢 Monsoon Photography</div>
                          <div className="flex items-center gap-2">🟢 Local Tea Tastings</div>
                          <div className="flex items-center gap-2">🟢 Traditional Rain Hat Wearing</div>
                        </>
                      )}
                      {activeSeason === 'autumn' && (
                        <>
                          <div className="flex items-center gap-2">🍁 Laitlum Canyon Treks</div>
                          <div className="flex items-center gap-2">🍁 Mawphlang Sacred Walks</div>
                          <div className="flex items-center gap-2">🍁 Open-air picnics</div>
                          <div className="flex items-center gap-2">🍁 Village homestays</div>
                        </>
                      )}
                      {activeSeason === 'winter' && (
                        <>
                          <div className="flex items-center gap-2">❄️ Dawki Glass Boating</div>
                          <div className="flex items-center gap-2">❄️ Deep Cave spelunking</div>
                          <div className="flex items-center gap-2">❄️ Shnongpdeng camping</div>
                          <div className="flex items-center gap-2">❄️ Bonfire folk music</div>
                        </>
                      )}
                      {activeSeason === 'spring' && (
                        <>
                          <div className="flex items-center gap-2">🌸 Root Bridge Hikes</div>
                          <div className="flex items-center gap-2">🌸 Orchid flower tours</div>
                          <div className="flex items-center gap-2">🌸 Cultural village festivals</div>
                          <div className="flex items-center gap-2">🌸 High altitude peak trails</div>
                        </>
                      )}
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

          </div>
        </div>
      </div>

      {/* 4. PHILOSOPHY SECTION (ABOUT TRIS) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24" id="philosophy-section">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-brand-olive bg-brand-lime/40 px-3 py-1 rounded-full">
              Our Vision
            </span>
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-brand-charcoal-light tracking-tight leading-tight">
              Soulful Journeys, Authentic Living
            </h2>
            <p className="text-sm text-brand-gray leading-relaxed font-sans">
              TRIS Meghalaya is born out of deep respect for nature, tribal wisdom, and slow living. We build conscious, sustainable tourism pathways that support indigenous Khasi, Jaintia, and Garo households while preserving the delicate biodiversity of North-East India.
            </p>
            <p className="text-sm text-brand-gray leading-relaxed font-sans">
              From our zero-plastic community homestays near double-decker living root bridges, to our direct-fair-trade handicraft store, every detail represents true highland luxury—pure, organic, and meticulously crafted.
            </p>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-4">
              <div className="rounded-2xl overflow-hidden shadow-sm aspect-square">
                <img
                  src="https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=400"
                  alt="Highland Pine Trees"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="bg-[#f4f7ed] rounded-2xl p-6 text-center border border-[#e2ebd3]">
                <span className="block font-display font-extrabold text-3xl text-[#155e37]">24+</span>
                <span className="text-xs font-mono font-semibold text-brand-gray">Master Weavers</span>
              </div>
            </div>
            <div className="space-y-4 pt-8">
              <div className="bg-[#155e37] rounded-2xl p-6 text-center text-white shadow-md">
                <span className="block font-display font-extrabold text-3xl text-brand-lime">100%</span>
                <span className="text-xs font-mono font-semibold text-white/80">Ethically Sourced</span>
              </div>
              <div className="rounded-2xl overflow-hidden shadow-sm aspect-square">
                <img
                  src="https://images.unsplash.com/photo-1448375240586-882707db888b?q=80&w=400"
                  alt="Mist Waterfall"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 5. GORGEOUS TESTIMONIALS SECTION */}
      <div className="bg-brand-cream-dark border-t border-brand-cream-dim py-24" id="testimonials-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-4 mb-16 text-center">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#155e37] bg-[#e4edd4] px-3.5 py-1.5 rounded-full inline-flex items-center gap-1.5">
              <MessageSquare className="w-3.5 h-3.5" />
              Traveler Journeys
            </span>
            <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-brand-charcoal-light tracking-tight">
              Beloved by Adventurers
            </h2>
            <p className="text-sm text-brand-gray max-w-xl mx-auto leading-relaxed font-sans">
              Read pure stories and verified reviews from guest travelers who have experienced the magic of our curated highland routes.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TESTIMONIALS.map((t, idx) => (
              <div 
                key={idx} 
                className="bg-white border border-brand-cream-dim/60 rounded-3xl p-8 shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-6"
              >
                <div className="space-y-4">
                  {/* Rating Stars */}
                  <div className="flex gap-1 text-[#e2f6b5]">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-brand-olive text-brand-olive" />
                    ))}
                  </div>
                  <p className="text-xs sm:text-sm text-brand-charcoal leading-relaxed font-sans font-medium italic">
                    "{t.text}"
                  </p>
                </div>
                
                <div className="pt-4 border-t border-brand-cream-dim flex items-center justify-between">
                  <div>
                    <span className="block font-display font-bold text-sm text-brand-charcoal">
                      {t.author}
                    </span>
                    <span className="block text-[10px] text-brand-gray font-mono font-bold uppercase mt-0.5">
                      {t.location}
                    </span>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-[#f4f7ed] flex items-center justify-center text-brand-olive text-[10px] font-bold">
                    ✓
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 5.5. HIGHLAND PHOTO GALLERY SECTION (Bento Masonry Layout) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 border-t border-brand-cream-dim" id="gallery-section">
        <div className="space-y-4 mb-16 text-center">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#155e37] bg-[#e4edd4] px-3.5 py-1.5 rounded-full inline-flex items-center gap-1.5">
            <Eye className="w-3.5 h-3.5" />
            The Highland Chronicles
          </span>
          <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-brand-charcoal-light tracking-tight">
            A Visual Anthology
          </h2>
          <p className="text-sm text-brand-gray max-w-xl mx-auto leading-relaxed font-sans">
            Step into the shifting mists and pure liquid emerald coordinates of Meghalaya. Click any chronicle to inspect coordinates and story.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[280px]">
          {GALLERY_IMAGES.map((img) => (
            <motion.div
              key={img.id}
              onClick={() => setActiveGalleryImage(img)}
              className={`${img.size} relative rounded-[2rem] overflow-hidden group cursor-pointer shadow-xs border border-brand-cream-dim/35`}
              whileHover={{ scale: 1.015 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
            >
              <img
                src={img.url}
                alt={img.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 brightness-[0.95] group-hover:brightness-[0.85]"
              />
              
              {/* Blur Glass Grad Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-350 flex flex-col justify-end p-6 sm:p-8" />
              
              {/* Static subtle label when not hovered */}
              <div className="absolute bottom-4 left-6 z-10 font-sans text-[11px] font-bold text-white/90 bg-[#050e08]/60 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/5 group-hover:opacity-0 transition-opacity duration-300 flex items-center gap-2">
                <span>📍</span>
                <span>{img.location}</span>
              </div>

              {/* Rich hovered content */}
              <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8 text-white z-20 flex flex-col translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-350 pointer-events-none">
                <span className="text-[9px] font-mono font-bold uppercase tracking-widest text-brand-lime mb-1">
                  {img.location}
                </span>
                <h3 className="font-display font-extrabold text-lg sm:text-xl tracking-tight text-white mb-2 leading-tight">
                  {img.title}
                </h3>
                <p className="text-[11px] text-white/80 font-sans leading-relaxed line-clamp-2 mb-4">
                  {img.caption}
                </p>
                <div className="flex items-center gap-1.5 text-xs text-brand-lime font-bold font-mono tracking-widest uppercase">
                  <span>Inspect Coordinates</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* 6. COLLABORATE WITH COMMUNITIES SECTION */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 border-t border-brand-cream-dim" id="collaborate-section">
        <div className="bg-[#f4f7ed] border border-[#e2ebd3] rounded-[2.5rem] p-8 sm:p-14 shadow-xs relative overflow-hidden">
          {/* Subtle nature circle patterns in the background */}
          <div className="absolute -top-16 -right-16 w-48 h-48 rounded-full bg-[#155e37]/5 border border-[#155e37]/10" />
          <div className="absolute -bottom-24 -left-24 w-64 h-64 rounded-full bg-[#155e37]/5 border border-[#155e37]/10" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            <div className="lg:col-span-7 space-y-5">
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#155e37] bg-white border border-[#e2ebd3] px-3.5 py-1.5 rounded-full inline-flex items-center gap-1.5">
                <Handshake className="w-3.5 h-3.5" />
                Artisan Co-Op Collaboration
              </span>
              <h2 className="font-display font-extrabold text-2xl sm:text-4xl text-brand-charcoal tracking-tight leading-tight">
                Partner with Tribal Communities
              </h2>
              <p className="text-xs sm:text-sm text-brand-gray leading-relaxed font-sans">
                Are you a slow-fashion brand, eco-lodge builder, or organic farmer? TRIS bridges master tribal artisans and global travelers to sustain age-old craft techniques. Contact us to design co-branded boutique collections or arrange corporate nature workshops.
              </p>
            </div>
            
            <div className="lg:col-span-5 flex flex-col sm:flex-row lg:flex-col gap-4 w-full sm:w-auto lg:pl-12">
              <a
                href="mailto:partner@trismeghalaya.com"
                className="flex-1 py-4 bg-[#155e37] hover:bg-[#0e4425] text-white text-center font-sans font-bold text-xs uppercase tracking-widest rounded-full transition-all cursor-pointer shadow-sm hover:scale-102"
              >
                Become a Partner
              </a>
              <button
                onClick={onShopClick}
                className="flex-1 py-4 bg-white border border-[#e2ebd3] hover:border-brand-olive text-brand-charcoal text-center font-sans font-bold text-xs uppercase tracking-widest rounded-full transition-all cursor-pointer shadow-xs hover:scale-102"
              >
                Support our Co-Op Shop
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 7. FREQUENTLY ASKED QUESTIONS SECTION */}
      <div className="bg-brand-cream-dark border-t border-brand-cream-dim py-24" id="faq-section">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-4 mb-14 text-center">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#155e37] bg-[#e4edd4] px-3.5 py-1.5 rounded-full inline-flex items-center gap-1.5">
              <ShieldQuestion className="w-3.5 h-3.5" />
              Information Bureau
            </span>
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-brand-charcoal-light tracking-tight">
              Frequently Asked Questions
            </h2>
            <p className="text-sm text-brand-gray leading-relaxed font-sans">
              Everything you need to know about preparing for your custom, sustainable highland trip.
            </p>
          </div>

          <div className="space-y-4">
            {FAQs.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div 
                  key={index}
                  className="bg-white border border-brand-cream-dim/60 rounded-2xl overflow-hidden transition-all shadow-xs"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    className="w-full p-6 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-[#fbfbf9]"
                  >
                    <span className="font-display font-bold text-sm sm:text-base text-brand-charcoal-light pr-4 leading-tight">
                      {faq.q}
                    </span>
                    <ChevronDown className={`w-4 h-4 text-brand-gray shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
                  </button>
                  
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="overflow-hidden"
                      >
                        <div className="p-6 pt-0 border-t border-brand-cream-dim/40 text-xs sm:text-sm text-brand-gray leading-relaxed font-sans">
                          {faq.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* 8. TOURIST SPOTS DETAIL MODAL DRAWER */}
      <AnimatePresence>
        {selectedSpot && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md" id="spot-modal-overlay">
            
            {/* Clickable Backdrop to close */}
            <div className="absolute inset-0" onClick={() => setSelectedSpot(null)} />

            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="relative w-full max-w-3xl bg-brand-cream border border-brand-lime/30 rounded-3xl overflow-hidden shadow-2xl z-10 grid grid-cols-1 md:grid-cols-12 max-h-[90vh]"
              id="spot-detail-modal"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedSpot(null)}
                className="absolute top-4 right-4 z-20 p-2 text-brand-charcoal hover:text-brand-olive bg-white/80 backdrop-blur-sm rounded-full shadow-md transition-all cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Left Side: Photo with badging */}
              <div className="md:col-span-5 relative h-48 md:h-full min-h-[220px] bg-brand-cream-dark">
                <img
                  src={selectedSpot.image}
                  alt={selectedSpot.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
                
                <div className="absolute bottom-4 left-4 text-white">
                  <span className="block text-[10px] font-mono uppercase tracking-wider text-brand-lime/95 font-bold">
                    Coordinates
                  </span>
                  <span className="block text-xs font-mono font-semibold">
                    {selectedSpot.coordinates}
                  </span>
                </div>
              </div>

              {/* Right Side: Detailed Info */}
              <div className="md:col-span-7 p-6 sm:p-8 flex flex-col justify-between overflow-y-auto max-h-[60vh] md:max-h-[85vh]">
                <div className="space-y-5">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-mono uppercase tracking-widest text-brand-olive font-bold">
                      {selectedSpot.category}
                    </span>
                    <span className="text-[11px] font-mono font-semibold text-brand-gray flex items-center gap-1 bg-white border px-2.5 py-0.5 rounded-full">
                      📍 {selectedSpot.location.split(',')[1] || selectedSpot.location}
                    </span>
                  </div>

                  <div className="space-y-1">
                    <h2 className="font-display font-extrabold text-2xl text-brand-charcoal-light tracking-tight leading-snug">
                      {selectedSpot.title}
                    </h2>
                    <span className="block text-xs text-brand-olive font-bold font-mono">
                      Best Time: {selectedSpot.bestTime}
                    </span>
                  </div>

                  <div className="h-[1px] bg-brand-cream-dim" />

                  <p className="text-xs text-brand-gray leading-relaxed font-sans">
                    {selectedSpot.longDescription}
                  </p>

                  {/* Highlights checklist */}
                  <div className="space-y-2">
                    <span className="block text-[10px] font-mono font-bold uppercase tracking-wider text-brand-charcoal">
                      Trail Highlights
                    </span>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] text-brand-gray font-sans">
                      {selectedSpot.highlights.map((highlight) => (
                        <li key={highlight} className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 bg-brand-olive rounded-full" />
                          {highlight}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Local Secret/Tip */}
                  <div className="p-3 bg-brand-lime/20 border border-brand-lime/25 rounded-xl space-y-1 text-xs">
                    <span className="font-display font-extrabold text-brand-charcoal block font-bold">💡 Local Highland Secret Tip</span>
                    <p className="text-brand-gray leading-normal font-sans">{selectedSpot.localTip}</p>
                  </div>

                  {/* Recommended Artisan Craft Product */}
                  <div className="p-3 bg-brand-cream-dark border border-brand-cream-dim rounded-xl space-y-1 text-xs">
                    <span className="font-mono text-[9px] uppercase tracking-wider text-brand-olive font-extrabold block">🎒 Recommended Travel Craft Accessory</span>
                    <p className="text-brand-charcoal leading-normal font-sans">
                      🎒 <strong className="font-semibold text-brand-olive">{selectedSpot.recommendedProduct.name}</strong>: {selectedSpot.recommendedProduct.reason}
                    </p>
                  </div>
                </div>

                {/* Footer Buttons inside Drawer */}
                <div className="pt-6 flex gap-3">
                  <button
                    onClick={() => {
                      setSelectedSpot(null);
                      onShopClick();
                    }}
                    className="flex-1 py-3 border border-brand-cream-dim hover:border-brand-olive text-xs font-display font-bold uppercase tracking-wider text-brand-gray hover:text-brand-charcoal rounded-full transition-all text-center cursor-pointer"
                  >
                    Browse Local Shop
                  </button>
                  <button
                    onClick={() => {
                      setSelectedSpot(null);
                      onPlanClick();
                    }}
                    className="flex-1 py-3 bg-brand-olive text-white hover:bg-brand-charcoal text-xs font-display font-bold uppercase tracking-wider rounded-full transition-all text-center shadow cursor-pointer"
                  >
                    Add to Route & Plan
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 9. GALLERY PHOTO LIGHTBOX MODAL */}
      <AnimatePresence>
        {activeGalleryImage && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-lg" id="gallery-lightbox-overlay">
            
            {/* Clickable Backdrop to close */}
            <div className="absolute inset-0" onClick={() => setActiveGalleryImage(null)} />

            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="relative w-full max-w-4xl bg-[#09140e] border border-white/10 rounded-[2.5rem] overflow-hidden shadow-2xl z-10 flex flex-col md:flex-row max-h-[90vh]"
              id="gallery-lightbox-modal"
            >
              {/* Close Button */}
              <button
                onClick={() => setActiveGalleryImage(null)}
                className="absolute top-4 right-4 z-20 p-2 text-white bg-black/40 hover:bg-black/60 rounded-full transition-all cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Photo Area */}
              <div className="md:w-3/5 relative h-[45vh] md:h-auto min-h-[250px] bg-black">
                <img
                  src={activeGalleryImage.url}
                  alt={activeGalleryImage.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Info Area */}
              <div className="md:w-2/5 p-6 sm:p-10 flex flex-col justify-between text-white space-y-6">
                <div className="space-y-4">
                  <span className="inline-block text-[10px] font-mono uppercase tracking-widest text-brand-lime bg-white/5 border border-white/10 px-3 py-1 rounded-full">
                    📍 {activeGalleryImage.location}
                  </span>
                  
                  <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-white tracking-tight leading-tight">
                    {activeGalleryImage.title}
                  </h2>
                  
                  <div className="h-[1px] bg-white/10 w-12" />
                  
                  <p className="text-xs sm:text-sm text-white/75 leading-relaxed font-sans">
                    {activeGalleryImage.caption}
                  </p>
                </div>

                <button
                  onClick={() => {
                    setActiveGalleryImage(null);
                    onPlanClick();
                  }}
                  className="w-full py-4 bg-[#155e37] hover:bg-[#0e4425] text-white font-sans font-bold text-xs uppercase tracking-widest rounded-full border border-white/5 transition-all text-center cursor-pointer shadow-md"
                >
                  Plan Route Here
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
