import React, { useState, useEffect } from 'react';
import { 
  MapPin, Hotel, Car, Compass, Calendar, Check, Info, ShieldCheck, 
  ArrowRight, ArrowLeft, Plus, Minus, User, Star, CloudSun, Briefcase, 
  Sparkles, CheckSquare, Square, ThumbsUp, Map, Eye, Compass as CompassIcon,
  Tent, Trees, Heart, Printer, CheckCircle, Users, MessageSquare, Share2, Send
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface PlannerViewProps {
  onBackToHome: () => void;
  onBookNowClick: () => void; // Link to the "Book Now" multi-step payment page
  isCollaborating?: boolean;
  setIsCollaborating?: (val: boolean) => void;
}

interface Location {
  id: string;
  name: string;
  tagline: string;
  image: string;
  vibe: string;
  weather: string;
  description: string;
}

interface Stay {
  id: string;
  name: string;
  type: string;
  pricePerNight: number;
  image: string;
  rating: number;
  location: string;
  features: string[];
}

interface Transport {
  id: string;
  name: string;
  model: string;
  pricePerDay: number;
  image: string;
  capacity: string;
  type: string;
}

interface Spot {
  id: string;
  name: string;
  category: string;
  image: string;
  location: string;
  timeNeeded: string;
  description: string;
}

interface Activity {
  id: string;
  name: string;
  price: number;
  icon: string;
  description: string;
}

const LOCATIONS: Location[] = [
  {
    id: 'loc-1',
    name: 'Shillong',
    tagline: 'The Scotland of the East',
    image: 'https://images.unsplash.com/photo-1593693397690-362cb9666fc2?q=80&w=800',
    vibe: 'Pine forests, modern cafes, heritage cottages, rock music',
    weather: '15°C - 22°C (Pleasant hills breeze)',
    description: 'A vibrant hill station surrounded by pine-covered ridges, colonial-era architecture, and a buzzing indie music scene.'
  },
  {
    id: 'loc-2',
    name: 'Cherrapunjee (Sohra)',
    tagline: 'Land of Rain & Deep Caverns',
    image: 'https://images.unsplash.com/photo-1508873696983-2df519f0397e?q=80&w=800',
    vibe: 'Misty gorges, roaring waterfalls, vertical cliffs, living bridges',
    weather: '12°C - 18°C (Cool, high humidity, frequent mists)',
    description: 'The iconic high-altitude plateau legendary for its spectacular canyons, cloud-shrouded viewpoints, and deep limestone caves.'
  },
  {
    id: 'loc-3',
    name: 'Dawki & Mawlynnong',
    tagline: 'Crystal waters & Asia\'s cleanest village',
    image: 'https://images.unsplash.com/photo-1540979388789-6cee28a1edd9?q=80&w=800',
    vibe: 'Glass-like rivers, bamboo skywalks, living root bridges, organic orchids',
    weather: '18°C - 26°C (Tropical warmth, refreshing rivers)',
    description: 'Journey to the borderlands to sail on the gravity-defying transparent waters of Umngot River and stroll the floral alleys of Mawlynnong.'
  },
  {
    id: 'loc-4',
    name: 'Jowai & Jaintia Hills',
    tagline: 'The Blue Pools & Monoliths',
    image: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?q=80&w=800',
    vibe: 'Ethereal blue waterfalls, rolling green meadows, ancient sacred monoliths',
    weather: '14°C - 21°C (Sunny, cool breezes)',
    description: 'The unexplored heartland of ancient tribal monolith gardens, golden crop plateaus, and stunning turquoise forest pools.'
  }
];

const STAYS: Stay[] = [
  {
    id: 'stay-1',
    name: 'Ri Kynjai Serenity Resort',
    type: 'Luxury Lakeside Resort',
    pricePerNight: 12500,
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=800',
    rating: 4.9,
    location: 'Shillong (Umiam Lake)',
    features: ['Lake-view cottage', 'Traditional Spa', 'Pine Wood Furnishing', 'Local Khasi Diner']
  },
  {
    id: 'stay-2',
    name: 'Sohra Eco Forest Cabins',
    type: 'Eco-Friendly Forest Retreat',
    pricePerNight: 6800,
    image: 'https://images.unsplash.com/photo-1510798831971-661eb04b3739?q=80&w=800',
    rating: 4.7,
    location: 'Cherrapunjee',
    features: ['Mist-view balcony', 'Fireplace', 'Natural spring water', 'Organic kitchen garden']
  },
  {
    id: 'stay-3',
    name: 'Mawlynnong Community Tribal Homestay',
    type: 'Immersive Local Homestay',
    pricePerNight: 3500,
    image: 'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?q=80&w=800',
    rating: 4.8,
    location: 'Mawlynnong',
    features: ['Traditional bamboo architecture', 'Home-cooked tribal food', 'Host family guided walks', '100% sustainable']
  },
  {
    id: 'stay-4',
    name: 'The Jowai Highlands Woodhouse',
    type: 'Boutique Heritage Villa',
    pricePerNight: 5500,
    image: 'https://images.unsplash.com/photo-1449034446853-66c86144b0ad?q=80&w=800',
    rating: 4.6,
    location: 'Jowai',
    features: ['Heritage estate', 'Panoramic orchid gardens', 'Campfire pits', 'High-altitude viewpoints']
  }
];

const TRANSPORTS: Transport[] = [
  {
    id: 'tr-1',
    name: 'Highland Cruiser',
    model: 'Toyota Innova Crysta (AC)',
    pricePerDay: 4800,
    image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?q=80&w=800',
    capacity: '6 Seats',
    type: 'Luxury Spacious SUV'
  },
  {
    id: 'tr-2',
    name: 'Mountain Trailblazer',
    model: 'Mahindra Thar 4x4 (Hardtop)',
    pricePerDay: 5500,
    image: 'https://images.unsplash.com/photo-1632245889029-e406faaa34cd?q=80&w=800',
    capacity: '4 Seats',
    type: 'Off-Road Adventurer SUV'
  },
  {
    id: 'tr-3',
    name: 'Classic Highland Rider',
    model: 'Royal Enfield Himalayan 450',
    pricePerDay: 2200,
    image: 'https://images.unsplash.com/photo-1609521263047-f8f205293f24?q=80&w=800',
    capacity: 'Solo/Duo',
    type: 'Adventure Motorcycle'
  },
  {
    id: 'tr-4',
    name: 'Highland Coaster',
    model: 'Force Traveller Luxury (AC)',
    pricePerDay: 8500,
    image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=800',
    capacity: '12 Seats',
    type: 'Spacious Group Explorer Coach'
  }
];

const SPOTS: Spot[] = [
  {
    id: 'spot-1',
    name: 'Double Decker Living Root Bridge',
    category: 'Bio-Engineering Wonder',
    image: 'https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?q=80&w=800',
    location: 'Cherrapunjee (Nongriat Trek)',
    timeNeeded: '5-6 Hours (Deep trek)',
    description: 'A mind-blowing bridge grown over centuries by Khasi tribal ancestors from aerial roots of rubber fig trees.'
  },
  {
    id: 'spot-2',
    name: 'Krang Suri Turquoise Falls',
    category: 'Scenic Forest Waterfall',
    image: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?q=80&w=800',
    location: 'Jowai (Jaintia Hills)',
    timeNeeded: '2 Hours',
    description: 'Possibly India\'s most breathtaking waterfall, falling into a deep, magical turquoise pool perfect for refreshing swims.'
  },
  {
    id: 'spot-3',
    name: 'Laitlum Canyons',
    category: 'Panoramic Gorge Viewpoint',
    image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=800',
    location: 'East Khasi Hills',
    timeNeeded: '1.5 Hours',
    description: 'Standing on the edge of massive emerald mountains looking down thousands of feet into mist-veiled green farming villages.'
  },
  {
    id: 'spot-4',
    name: 'Umngot Glass River Boat Ride',
    category: 'Water Adventure',
    image: 'https://images.unsplash.com/photo-1540979388789-6cee28a1edd9?q=80&w=800',
    location: 'Dawki',
    timeNeeded: '1 Hour',
    description: 'Boat through gravity-defying glass-like crystal waters where the boat shadow on the riverbed makes it look like it\'s flying.'
  },
  {
    id: 'spot-5',
    name: 'Mawryngkhang Bamboo Trail',
    category: 'Extreme Trekking',
    image: 'https://images.unsplash.com/photo-1448375240586-882707db888b?q=80&w=800',
    location: 'Wahkhen Village',
    timeNeeded: '3.5 Hours (Strenuous)',
    description: 'A spectacular skywalk crafted out of organic bamboo tied to the sheer cliff faces of massive granite domes.'
  },
  {
    id: 'spot-6',
    name: 'Mawsmai Limestone Caves',
    category: 'Speleology / Exploration',
    image: 'https://images.unsplash.com/photo-1508873696983-2df519f0397e?q=80&w=800',
    location: 'Cherrapunjee',
    timeNeeded: '1 Hour',
    description: 'Fascinating naturally lit limestone caverns filled with towering stalactites and stalagmites sculpted over millennia.'
  }
];

const ACTIVITIES: Activity[] = [
  {
    id: 'act-1',
    name: 'Extreme Ziplining Over Sohra Gorges',
    price: 1800,
    icon: '⚡',
    description: 'Fly 500 feet above roaring forest rivers on a breathtaking zip line with a bird\'s-eye view of misty mountains.'
  },
  {
    id: 'act-2',
    name: 'Certified Tribal Naturalist Guide',
    price: 2500,
    icon: '🌿',
    description: 'Walk with an experienced local guide who shares secrets of tribal medicinal plants, tree-root weaves, and folklore.'
  },
  {
    id: 'act-3',
    name: 'Traditional Khasi Culinary Platter',
    price: 950,
    icon: '🍲',
    description: 'An authentic community wood-fired feast including Jadoh (red rice cooked with local spices), Dohneiiong, and Sohphlang salads.'
  },
  {
    id: 'act-4',
    name: 'Sacred Grove Tribal Ceremony Entry',
    price: 1200,
    icon: '🎭',
    description: 'Enter the pristine, strictly conserved Mawphlang forest grove with local guardians to witness traditional ancestral altars.'
  }
];

export default function PlannerView({ 
  onBackToHome, 
  onBookNowClick,
  isCollaborating = false,
  setIsCollaborating
}: PlannerViewProps) {
  // Navigation
  const [activeSubTab, setActiveSubTab] = useState<'locations' | 'stays' | 'ride' | 'spots' | 'review'>('locations');
  
  // Selection States
  const [selectedLocations, setSelectedLocations] = useState<string[]>(['loc-1', 'loc-2']); // default Shillong & Cherra
  const [selectedStay, setSelectedStay] = useState<string>('stay-1');
  const [selectedTransport, setSelectedTransport] = useState<string>('tr-1');
  const [selectedSpots, setSelectedSpots] = useState<string[]>(['spot-1', 'spot-2', 'spot-3']);
  const [selectedActivities, setSelectedActivities] = useState<string[]>(['act-2']);
  
  // Dates & Travelers
  const [duration, setDuration] = useState<number>(5);
  const [adults, setAdults] = useState<number>(2);
  const [kids, setKids] = useState<number>(0);
  const [startDate, setStartDate] = useState<string>('15 Oct 2026');
  
  // Confirmation State
  const [isConfirmed, setIsConfirmed] = useState<boolean>(false);
  const [confirmedCode, setConfirmedCode] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // Live Collaboration Session States
  const [copied, setCopied] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    { sender: 'Tenzing (Local Guide)', role: 'guide', text: 'Kublei (Welcome)! I have joined the board to help you custom-build your Meghalaya journey.', time: 'Just now' },
    { sender: 'Preeti', role: 'friend', text: 'Hey guys! Super excited for this trip. The Double Decker bridge is a must!', time: '1m ago' },
  ]);
  const [inputText, setInputText] = useState('');
  const [liveEvents, setLiveEvents] = useState([
    { id: 1, text: 'Preeti joined the planning room.', type: 'info' },
    { id: 2, text: 'Karan connected from Delhi.', type: 'info' },
    { id: 3, text: 'Tenzing (Certified Guide) joined the room.', type: 'guide' },
  ]);

  // Handle Copy Link
  const handleCopyLink = () => {
    navigator.clipboard.writeText('https://tris-meghalaya.com/planner/collab?session=TRIS-7491-MEG');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Simulate active friends clicking and commenting
  useEffect(() => {
    if (!isCollaborating) return;

    // Set up an interval to periodically simulate a live update from Preeti, Karan or Tenzing!
    const interval = setInterval(() => {
      const messages = [
        { sender: 'Karan', role: 'friend', text: 'I really love the Ri Kynjai resort, the lake view is incredible!', target: 'stay-1' },
        { sender: 'Preeti', role: 'friend', text: 'Let’s make sure we book an SUV like the Highland Cruiser. The roads can be muddy near canyons!', target: 'tr-1' },
        { sender: 'Tenzing (Local Guide)', role: 'guide', text: 'For sightseeing, Krang Suri Falls is spectacular during October because the water level is perfect.', target: 'spot-2' },
        { sender: 'Karan', role: 'friend', text: 'Should we do ziplining? It looks thrilling!', target: 'act-1' },
        { sender: 'Tenzing (Local Guide)', role: 'guide', text: 'The traditional Khasi platter is served in local earthen pots and is fully organic.', target: 'act-3' },
      ];

      const chosen = messages[Math.floor(Math.random() * messages.length)];
      
      // Add message
      setChatMessages(prev => [
        ...prev,
        { sender: chosen.sender, role: chosen.role, text: chosen.text, time: 'Just now' }
      ]);

      // Add corresponding live event
      const eventText = chosen.role === 'guide' 
        ? `${chosen.sender} added a native recommendation.`
        : `${chosen.sender} voted on a selection.`;
        
      setLiveEvents(prev => [
        ...prev,
        { id: Date.now(), text: eventText, type: chosen.role }
      ]);
    }, 24000); // Trigger every 24 seconds to be gentle but active

    return () => clearInterval(interval);
  }, [isCollaborating]);

  // Handle user sending message
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const userMsg = inputText;
    setChatMessages(prev => [
      ...prev,
      { sender: 'You', role: 'user', text: userMsg, time: 'Just now' }
    ]);
    setInputText('');

    // Scroll chat body down
    setTimeout(() => {
      const el = document.getElementById('collab-chat-body');
      if (el) el.scrollTop = el.scrollHeight;
    }, 100);

    // Trigger local guide/friend smart response!
    setTimeout(() => {
      let reply = "That sounds like a wonderful choice! Let's lock that in.";
      let responder = 'Tenzing (Local Guide)';
      let responderRole = 'guide';

      const lower = userMsg.toLowerCase();
      if (lower.includes('waterfall') || lower.includes('falls') || lower.includes('krang') || lower.includes('root') || lower.includes('bridge') || lower.includes('trek')) {
        reply = "Yes! Nongriat has deep tropical valleys. Ensure we carry quick-dry athletic wear, as the double decker bridge trek has over 3,000 stone steps.";
        responder = 'Tenzing (Local Guide)';
      } else if (lower.includes('hotel') || lower.includes('stay') || lower.includes('resort') || lower.includes('where') || lower.includes('sleep')) {
        reply = "Ri Kynjai is premium luxury, whereas the Mawlynnong Homestay is deep tribal immersion. I recommend doing at least one night of homestay!";
        responder = 'Tenzing (Local Guide)';
      } else if (lower.includes('car') || lower.includes('suv') || lower.includes('drive') || lower.includes('transport')) {
        reply = "Highly advise the 4x4 Thar if you're exploring off-beat tracks, otherwise the Innova Crysta is very smooth for mountain highways.";
        responder = 'Tenzing (Local Guide)';
      } else if (lower.includes('food') || lower.includes('eat') || lower.includes('khasi') || lower.includes('meal')) {
        reply = "The local culinary platter is amazing. You'll love Jadoh (spiced rice) and our native wild fruit preserves.";
        responder = 'Tenzing (Local Guide)';
      } else if (lower.includes('cost') || lower.includes('price') || lower.includes('budget') || lower.includes('expensive')) {
        reply = "The current estimate is fully inclusive of driver, fuel, guide certifications, and stays. We can adjust the stay tier to optimize cost!";
        responder = 'Tenzing (Local Guide)';
      } else {
        // Fallback random co-traveler message
        const replies = [
          "Awesome point! Let's check that out together.",
          "I agree completely, adding that would be amazing.",
          "Tenzing, what do you think about doing this on Day 3?",
          "Can we adjust the dates to stay an extra day in Cherrapunjee?"
        ];
        reply = replies[Math.floor(Math.random() * replies.length)];
        responder = Math.random() > 0.5 ? 'Preeti' : 'Karan';
        responderRole = 'friend';
      }

      setChatMessages(prev => [
        ...prev,
        { sender: responder, role: responderRole, text: reply, time: 'Just now' }
      ]);

      setLiveEvents(prev => [
        ...prev,
        { id: Date.now(), text: `${responder} replied to your message.`, type: responderRole }
      ]);

      setTimeout(() => {
        const el = document.getElementById('collab-chat-body');
        if (el) el.scrollTop = el.scrollHeight;
      }, 100);
    }, 1200);
  };

  // Monitor selections to feed the Live Collaboration logs in real time
  useEffect(() => {
    if (!isCollaborating) return;
    const s = STAYS.find(st => st.id === selectedStay);
    if (s) {
      setLiveEvents(prev => [
        ...prev,
        { id: Date.now(), text: `You updated stay to: ${s.name}`, type: 'user' }
      ]);
    }
  }, [selectedStay, isCollaborating]);

  useEffect(() => {
    if (!isCollaborating) return;
    const t = TRANSPORTS.find(tr => tr.id === selectedTransport);
    if (t) {
      setLiveEvents(prev => [
        ...prev,
        { id: Date.now(), text: `You selected transport: ${t.name}`, type: 'user' }
      ]);
    }
  }, [selectedTransport, isCollaborating]);

  useEffect(() => {
    if (!isCollaborating) return;
    setLiveEvents(prev => [
      ...prev,
      { id: Date.now(), text: `You updated group size: ${adults} Adults, ${kids} Kids`, type: 'user' }
    ]);
  }, [adults, kids, isCollaborating]);

  useEffect(() => {
    if (!isCollaborating) return;
    setLiveEvents(prev => [
      ...prev,
      { id: Date.now(), text: `You adjusted trip duration: ${duration} days`, type: 'user' }
    ]);
  }, [duration, isCollaborating]);

  // Auto scroll to top on tab change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeSubTab]);

  // Find Selected Objects
  const currentStay = STAYS.find(s => s.id === selectedStay) || STAYS[0];
  const currentTransport = TRANSPORTS.find(t => t.id === selectedTransport) || TRANSPORTS[0];
  const locationsCount = selectedLocations.length;
  const spotsCount = selectedSpots.length;

  // Pricing Calculation
  const stayCost = currentStay.pricePerNight * duration;
  const transportCost = currentTransport.pricePerDay * duration;
  const activitiesCost = selectedActivities.reduce((sum, actId) => {
    const act = ACTIVITIES.find(a => a.id === actId);
    return sum + (act ? act.price : 0);
  }, 0) * (adults + kids * 0.5);
  
  const totalCost = stayCost + transportCost + activitiesCost;

  // Handlers
  const toggleLocation = (locId: string) => {
    if (selectedLocations.includes(locId)) {
      if (selectedLocations.length > 1) {
        setSelectedLocations(selectedLocations.filter(id => id !== locId));
      }
    } else {
      setSelectedLocations([...selectedLocations, locId]);
    }
  };

  const toggleSpot = (spotId: string) => {
    if (selectedSpots.includes(spotId)) {
      setSelectedSpots(selectedSpots.filter(id => id !== spotId));
    } else {
      setSelectedSpots([...selectedSpots, spotId]);
    }
  };

  const toggleActivity = (actId: string) => {
    if (selectedActivities.includes(actId)) {
      setSelectedActivities(selectedActivities.filter(id => id !== actId));
    } else {
      setSelectedActivities([...selectedActivities, actId]);
    }
  };

  const handleConfirmPlanner = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      const randomCode = `TRIS-PLAN-${Math.floor(100000 + Math.random() * 900000)}`;
      setConfirmedCode(randomCode);
      setIsConfirmed(true);
    }, 1500);
  };

  // Nav helper
  const tabsList: { id: typeof activeSubTab; label: string; icon: string }[] = [
    { id: 'locations', label: '1. Locations', icon: '🗺️' },
    { id: 'stays', label: '2. Stays', icon: '🏨' },
    { id: 'ride', label: '3. Transport', icon: '🚗' },
    { id: 'spots', label: '4. Sightseeing', icon: '🌲' },
    { id: 'review', label: '5. Review Plan', icon: '✨' },
  ];

  return (
    <div className="bg-brand-cream min-h-screen text-brand-charcoal font-sans" id="planner-view-root">
      
      {/* Immersive Top Banner */}
      <div className="relative bg-brand-charcoal py-16 text-center text-white overflow-hidden px-4" id="planner-banner">
        {/* Soft mountain mist background pattern */}
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-30 pointer-events-none" 
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=1200')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-brand-charcoal/20 to-brand-charcoal z-0 pointer-events-none" />

        <div className="relative z-10 max-w-4xl mx-auto space-y-3">
          <span className="text-xs font-mono font-bold tracking-widest text-brand-lime uppercase bg-brand-olive/50 px-3 py-1 rounded-full inline-block">
            Highland Designer
          </span>
          <h1 className="font-display font-black text-4xl sm:text-5xl tracking-tight leading-none">
            Tailor-Make Your <span className="text-brand-lime">Meghalaya Itinerary</span>
          </h1>
          <p className="text-sm text-brand-cream/85 max-w-2xl mx-auto font-sans font-medium">
            Mix and match mountain towns, boutique eco-resorts, rugged off-road SUVs, and local guide experiences. Build your dream itinerary dynamically.
          </p>
        </div>
      </div>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        
        {isConfirmed ? (
          /* ========================================================
             SUCCESS / ITINERARY CONFIRMED VIEW
             ======================================================== */
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-4xl mx-auto space-y-8"
            id="confirmed-itinerary-panel"
          >
            <div className="bg-white border border-brand-cream-dim rounded-[2.5rem] p-6 sm:p-12 shadow-2xl text-center space-y-6 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-3 bg-brand-olive" />

              <div className="w-16 h-16 bg-[#f4f7ed] border border-brand-olive/30 rounded-full flex items-center justify-center text-brand-olive mx-auto shadow-xs">
                <Check className="w-8 h-8 stroke-[3.5px]" />
              </div>
              <div className="space-y-2">
                <h2 className="font-display font-extrabold text-3xl text-brand-charcoal tracking-tight">
                  Itinerary Successfully Locked!
                </h2>
                <p className="text-sm text-brand-gray leading-relaxed max-w-xl mx-auto font-sans font-medium">
                  We've successfully designed and registered your customized Meghalaya adventure plan. A pristine digital itinerary has been saved under code <strong className="text-brand-charcoal">{confirmedCode}</strong>.
                </p>
              </div>

              {/* High-fidelity custom printable voucher */}
              <div className="p-6 sm:p-8 bg-brand-cream border border-brand-cream-dim/70 rounded-[2rem] text-left space-y-6 font-sans shadow-xs relative">
                {/* Visual stamp badge */}
                <div className="absolute right-6 top-6 border-2 border-dashed border-brand-olive/40 px-3 py-1.5 rounded-xl rotate-12 text-[10px] font-mono font-bold text-brand-olive tracking-widest hidden sm:block">
                  TRIS APPROVED
                </div>

                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 pb-4 border-b border-brand-cream-dim">
                  <div>
                    <span className="block text-[10px] font-mono font-bold text-brand-gray tracking-wider">ITINERARY VOUCHER REF:</span>
                    <span className="font-display font-extrabold text-brand-charcoal text-sm">{confirmedCode}</span>
                  </div>
                  <div>
                    <span className="block text-[10px] font-mono font-bold text-brand-gray tracking-wider text-left sm:text-right">PLAN DURATION:</span>
                    <span className="font-display font-extrabold text-brand-charcoal text-sm text-left sm:text-right block">{duration} Days of Exploration</span>
                  </div>
                </div>

                {/* Grid details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs sm:text-sm">
                  <div className="space-y-4">
                    <div className="space-y-1">
                      <span className="text-brand-gray font-mono font-semibold text-[10px] tracking-wider block uppercase">Selected Hubs</span>
                      <div className="flex flex-wrap gap-1.5">
                        {selectedLocations.map(locId => {
                          const l = LOCATIONS.find(loc => loc.id === locId);
                          return (
                            <span key={locId} className="px-2 py-1 bg-white border border-brand-cream-dim rounded-lg font-bold text-[11px] text-brand-olive flex items-center gap-1">
                              <MapPin className="w-3 h-3" /> {l?.name}
                            </span>
                          );
                        })}
                      </div>
                    </div>

                    <div className="space-y-1">
                      <span className="text-brand-gray font-mono font-semibold text-[10px] tracking-wider block uppercase">Cozy Accommodations</span>
                      <span className="font-bold text-brand-charcoal block">{currentStay.name}</span>
                      <span className="text-xs text-brand-gray font-medium leading-none">{currentStay.type} • {currentStay.location}</span>
                    </div>

                    <div className="space-y-1">
                      <span className="text-brand-gray font-mono font-semibold text-[10px] tracking-wider block uppercase">Highland Private Vehicle</span>
                      <span className="font-bold text-brand-charcoal block">{currentTransport.name}</span>
                      <span className="text-xs text-brand-gray font-medium leading-none">{currentTransport.model} ({currentTransport.capacity})</span>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-1">
                      <span className="text-brand-gray font-mono font-semibold text-[10px] tracking-wider block uppercase">Scenic Tourist Spots ({spotsCount})</span>
                      <div className="text-xs text-brand-charcoal space-y-1 max-h-24 overflow-y-auto pr-2">
                        {selectedSpots.map(spotId => {
                          const s = SPOTS.find(sp => sp.id === spotId);
                          return (
                            <div key={spotId} className="flex items-center gap-1.5 font-semibold text-brand-charcoal-light">
                              <div className="w-1.5 h-1.5 rounded-full bg-brand-olive shrink-0" />
                              <span>{s?.name} ({s?.location})</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    <div className="space-y-1">
                      <span className="text-brand-gray font-mono font-semibold text-[10px] tracking-wider block uppercase">Curated Local Experiences</span>
                      <div className="text-xs text-brand-charcoal space-y-1">
                        {selectedActivities.length === 0 ? (
                          <span className="text-brand-gray italic font-medium">None selected</span>
                        ) : (
                          selectedActivities.map(actId => {
                            const a = ACTIVITIES.find(ac => ac.id === actId);
                            return (
                              <div key={actId} className="flex items-center gap-1.5 font-bold text-brand-olive">
                                <span>{a?.icon}</span>
                                <span>{a?.name}</span>
                              </div>
                            );
                          })
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="h-[1px] bg-brand-cream-dim" />

                {/* Est summary */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pt-1">
                  <div>
                    <span className="block text-[10px] font-mono font-bold text-brand-gray tracking-wider uppercase">Planning Budget Estimate:</span>
                    <div className="flex items-baseline gap-2">
                      <span className="font-display font-black text-2xl text-brand-olive">₹{totalCost.toLocaleString('en-IN')}</span>
                      <span className="text-[10px] text-brand-gray font-medium font-sans">For {adults} Adults {kids > 0 ? `& ${kids} Kids` : ''}</span>
                    </div>
                  </div>
                  
                  {/* Actions */}
                  <div className="flex gap-2 w-full sm:w-auto">
                    <button
                      onClick={() => onBookNowClick()}
                      className="flex-1 sm:flex-initial px-6 py-3 bg-brand-olive hover:bg-brand-charcoal text-white rounded-full font-display text-xs font-bold uppercase tracking-widest transition-colors flex items-center justify-center gap-2 shadow-xs cursor-pointer"
                    >
                      <span>Proceed to Book Now</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Packing checklist / stuff section */}
              <div className="p-6 bg-[#f4f7ed] border border-[#e2ebd3] rounded-2xl text-left space-y-3.5">
                <div className="flex items-center gap-2 text-brand-olive font-display font-bold text-sm">
                  <CloudSun className="w-5 h-5" />
                  <h3>Highland Preparation & Packing Checklist</h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-brand-gray font-medium">
                  <div className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-brand-olive shrink-0 mt-0.5" />
                    <span>Bring heavy rainwear & quick-dry trekking shoes (essential for root bridge trekking).</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-brand-olive shrink-0 mt-0.5" />
                    <span>Pre-apply for Inner Line Permits (included automatically with your plan).</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-brand-olive shrink-0 mt-0.5" />
                    <span>Carry light fleece jackets; mountain temperatures fall to 12°C at night in mists.</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-brand-olive shrink-0 mt-0.5" />
                    <span>Keep emergency cash handy; mobile network coverage is spotty inside deep limestone caves.</span>
                  </div>
                </div>
              </div>

              {/* Action row */}
              <div className="pt-4 flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => {
                    setIsConfirmed(false);
                    setActiveSubTab('locations');
                  }}
                  className="flex-1 py-4 border border-brand-cream-dim hover:border-brand-olive text-brand-gray hover:text-brand-charcoal rounded-full font-display text-xs font-bold uppercase tracking-wider transition-all cursor-pointer"
                >
                  Create New Plan
                </button>
                <button
                  onClick={() => window.print()}
                  className="flex-1 py-4 bg-brand-cream border border-brand-cream-dim text-brand-charcoal hover:bg-brand-cream-dark rounded-full font-display text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Printer className="w-4 h-4" />
                  Print Trip Itinerary
                </button>
              </div>

            </div>
          </motion.div>
        ) : (
          /* ========================================================
             ACTIVE PLANNING DESIGNER
             ======================================================== */
          <>
            {isCollaborating && (
              <motion.div 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-8 bg-[#09140e] border border-white/10 rounded-[2.5rem] p-6 text-white shadow-2xl space-y-6"
                id="collab-session-banner"
              >
                {/* Top row: Status, Avatars, Share link */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-white/10">
                  <div className="flex items-center gap-3">
                    <span className="relative flex h-3.5 w-3.5 shrink-0">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-lime opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-brand-lime"></span>
                    </span>
                    <div>
                      <h2 className="font-display font-extrabold text-lg text-white flex items-center gap-2">
                        Live Group Room: <span className="text-brand-lime font-mono">TRIS-7491-MEG</span>
                      </h2>
                      <p className="text-xs text-white/60 font-medium font-sans">Synced with your travel companions and certified local guide</p>
                    </div>
                  </div>

                  {/* Active avatars with tooltips */}
                  <div className="flex items-center gap-4">
                    <div className="flex -space-x-2.5 overflow-hidden">
                      <div className="inline-flex h-8.5 w-8.5 items-center justify-center rounded-full bg-brand-lime text-[11px] font-bold text-brand-charcoal border-2 border-[#09140e]" title="You (Organizer)">
                        YO
                      </div>
                      <div className="inline-flex h-8.5 w-8.5 items-center justify-center rounded-full bg-amber-500 text-[11px] font-bold text-white border-2 border-[#09140e]" title="Preeti">
                        PS
                      </div>
                      <div className="inline-flex h-8.5 w-8.5 items-center justify-center rounded-full bg-blue-500 text-[11px] font-bold text-white border-2 border-[#09140e]" title="Karan">
                        KM
                      </div>
                      <div className="inline-flex h-8.5 w-8.5 items-center justify-center rounded-full bg-[#155e37] text-[11px] font-bold text-brand-lime border-2 border-brand-lime/40" title="Tenzing (Certified Native Guide)">
                        TG
                      </div>
                    </div>

                    <div className="h-6 w-[1px] bg-white/15" />

                    {/* Share Button */}
                    <button 
                      onClick={handleCopyLink}
                      className="px-4 py-2 bg-white/10 hover:bg-white/15 text-xs font-bold rounded-full border border-white/10 transition-all flex items-center gap-2 cursor-pointer"
                    >
                      {copied ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-brand-lime" />
                          <span className="text-brand-lime">Copied Session!</span>
                        </>
                      ) : (
                        <>
                          <Share2 className="w-3.5 h-3.5" />
                          <span>Share Invitation</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* Split layout: Event log & Chat interface */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
                  
                  {/* Event Logs - Spans 5 columns */}
                  <div className="lg:col-span-5 bg-black/30 border border-white/5 rounded-2xl p-4 flex flex-col justify-between h-[280px]">
                    <div>
                      <h3 className="text-xs font-bold text-white/80 uppercase tracking-wider mb-3 flex items-center gap-1.5 font-display">
                        <Compass className="w-3.5 h-3.5 text-brand-lime" />
                        Live Activity Sync
                      </h3>
                      <div className="space-y-2 max-h-[190px] overflow-y-auto pr-1 text-[11px] leading-relaxed no-scrollbar">
                        <AnimatePresence initial={false}>
                          {liveEvents.slice().reverse().map((evt) => (
                            <motion.div 
                              key={evt.id}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              className="flex items-start gap-2 text-white/70 font-sans"
                            >
                              <span className="text-brand-lime select-none">›</span>
                              <span className="font-medium">
                                {evt.type === 'guide' ? (
                                  <strong className="text-brand-lime">{evt.text}</strong>
                                ) : evt.type === 'user' ? (
                                  <span className="text-white font-semibold">{evt.text}</span>
                                ) : (
                                  <span>{evt.text}</span>
                                )}
                              </span>
                            </motion.div>
                          ))}
                        </AnimatePresence>
                      </div>
                    </div>
                    <div className="pt-2 text-[10px] text-white/40 italic flex items-center gap-1 font-sans">
                      <span>●</span> 
                      <span>Changes sync automatically to your group board</span>
                    </div>
                  </div>

                  {/* Chat Interface - Spans 7 columns */}
                  <div className="lg:col-span-7 bg-black/20 border border-white/5 rounded-2xl p-4 flex flex-col h-[280px]">
                    <h3 className="text-xs font-bold text-white/80 uppercase tracking-wider mb-3 flex items-center gap-1.5 font-display">
                      <MessageSquare className="w-3.5 h-3.5 text-brand-lime" />
                      Room Consultation Chat
                    </h3>
                    
                    {/* Messages Body */}
                    <div className="flex-1 overflow-y-auto space-y-3 pr-1 mb-3 text-xs leading-relaxed no-scrollbar scroll-smooth" id="collab-chat-body">
                      {chatMessages.map((msg, idx) => {
                        const isGuide = msg.role === 'guide';
                        const isUser = msg.role === 'user';
                        return (
                          <div 
                            key={idx} 
                            className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}
                          >
                            <div className="flex items-center gap-1.5 mb-0.5 text-[10px] text-white/50 font-sans">
                              <span className={`font-bold ${isGuide ? 'text-brand-lime' : isUser ? 'text-white/80' : 'text-amber-300'}`}>
                                {msg.sender}
                              </span>
                              {isGuide && <span className="bg-[#155e37] text-brand-lime px-1.5 py-0.2 rounded text-[8px] font-black uppercase">Guide</span>}
                              <span>•</span>
                              <span>{msg.time}</span>
                            </div>
                            <div className={`p-2.5 rounded-xl max-w-[85%] font-medium leading-relaxed font-sans ${
                              isUser 
                                ? 'bg-[#155e37] text-white rounded-tr-none' 
                                : isGuide 
                                  ? 'bg-[#155e37]/25 text-[#f1fcf4] border border-[#155e37]/40 rounded-tl-none' 
                                  : 'bg-white/10 text-white rounded-tl-none'
                            }`}>
                              {msg.text}
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {/* Send form */}
                    <form onSubmit={handleSendMessage} className="flex gap-2">
                      <input 
                        type="text" 
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                        placeholder="Ask Tenzing the guide or co-planners about bridges, cars, meals..." 
                        className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-xs font-medium text-white placeholder-white/40 focus:outline-none focus:border-brand-lime focus:ring-1 focus:ring-brand-lime"
                      />
                      <button 
                        type="submit"
                        className="p-2.5 bg-brand-lime hover:bg-brand-lime/90 text-brand-charcoal font-bold rounded-xl transition-all cursor-pointer flex items-center justify-center shrink-0"
                      >
                        <Send className="w-4 h-4" />
                      </button>
                    </form>
                  </div>

                </div>
              </motion.div>
            )}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start" id="planner-layout-grid">
            
            {/* Left Content Area: Tab Views (9 Columns) */}
            <div className="lg:col-span-8 space-y-6">
              
              {/* Horizontal planning steps sub-tab bar */}
              <div className="bg-white border border-brand-cream-dim/60 rounded-2xl p-2 shadow-xs overflow-x-auto no-scrollbar flex items-center space-x-1" id="planner-subtabs">
                {tabsList.map((tab) => {
                  const isActive = activeSubTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveSubTab(tab.id)}
                      className={`px-4 py-2.5 rounded-xl font-display text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-all flex items-center gap-1.5 cursor-pointer select-none ${
                        isActive
                          ? 'bg-brand-olive text-white shadow-xs'
                          : 'text-brand-gray hover:text-brand-charcoal hover:bg-brand-cream/60'
                      }`}
                    >
                      <span>{tab.icon}</span>
                      <span>{tab.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* Subtab Content Panels */}
              <div className="bg-white border border-brand-cream-dim/60 rounded-[2rem] p-6 sm:p-8 shadow-xs" id="planner-subtab-panel">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeSubTab}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.25 }}
                  >
                    
                    {/* ==================== 1. LOCATIONS ==================== */}
                    {activeSubTab === 'locations' && (
                      <div className="space-y-6" id="planner-locations">
                        <div>
                          <h2 className="font-display font-extrabold text-2xl text-brand-charcoal">
                            Where do you want to explore?
                          </h2>
                          <p className="text-xs text-brand-gray mt-1 font-medium">
                            Select one or multiple highland hubs to include in your customizable circular loop trek.
                          </p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                          {LOCATIONS.map((loc) => {
                            const isSelected = selectedLocations.includes(loc.id);
                            return (
                              <div
                                key={loc.id}
                                onClick={() => toggleLocation(loc.id)}
                                className={`group rounded-2xl overflow-hidden border-2 text-left cursor-pointer transition-all select-none flex flex-col ${
                                  isSelected
                                    ? 'border-brand-olive bg-[#f4f7ed]/50 shadow-xs'
                                    : 'border-brand-cream-dim bg-white hover:border-brand-olive/40'
                                }`}
                              >
                                <div className="h-40 relative overflow-hidden">
                                  <img 
                                    src={loc.image} 
                                    alt={loc.name}
                                    referrerPolicy="no-referrer"
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                  />
                                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
                                  
                                  {/* Selection Checkmark Bubble */}
                                  <div className={`absolute top-3 right-3 w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 transition-all ${
                                    isSelected ? 'bg-brand-olive border-brand-olive text-white' : 'bg-black/30 border-white text-white'
                                  }`}>
                                    {isSelected ? <Check className="w-3.5 h-3.5 stroke-[3px]" /> : null}
                                  </div>

                                  <div className="absolute bottom-3 left-4 text-white">
                                    <span className="text-[10px] font-mono tracking-widest uppercase text-brand-lime font-bold">
                                      {loc.tagline}
                                    </span>
                                    <h3 className="font-display font-extrabold text-lg leading-tight mt-0.5">
                                      {loc.name}
                                    </h3>
                                  </div>
                                </div>

                                <div className="p-4 space-y-2 flex-grow flex flex-col justify-between">
                                  <p className="text-xs text-brand-gray font-medium leading-relaxed">
                                    {loc.description}
                                  </p>
                                  <div className="pt-2 border-t border-brand-cream-dim/60 space-y-1.5 text-[11px] font-medium text-brand-charcoal-light">
                                    <div className="flex items-center gap-1.5">
                                      <Trees className="w-3.5 h-3.5 text-brand-olive shrink-0" />
                                      <span>Vibe: <span className="font-semibold text-brand-gray">{loc.vibe}</span></span>
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                      <CloudSun className="w-3.5 h-3.5 text-brand-olive shrink-0" />
                                      <span>Avg Temp: <span className="font-semibold text-brand-gray">{loc.weather}</span></span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>

                        <div className="pt-4 flex justify-end">
                          <button
                            onClick={() => setActiveSubTab('stays')}
                            className="px-6 py-3 bg-brand-olive hover:bg-brand-charcoal text-white rounded-full font-display text-xs font-bold uppercase tracking-widest transition-colors flex items-center gap-2 cursor-pointer"
                          >
                            <span>Select Cozy Stays</span>
                            <ArrowRight className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    )}

                    {/* ==================== 2. STAYS ==================== */}
                    {activeSubTab === 'stays' && (
                      <div className="space-y-6" id="planner-stays">
                        <div>
                          <h2 className="font-display font-extrabold text-2xl text-brand-charcoal">
                            Choose Your Cozy Highland Base
                          </h2>
                          <p className="text-xs text-brand-gray mt-1 font-medium">
                            Select an eco-luxury resort or a highly curated organic community homestay.
                          </p>
                        </div>

                        <div className="space-y-4">
                          {STAYS.map((stay) => {
                            const isSelected = selectedStay === stay.id;
                            return (
                              <div
                                key={stay.id}
                                onClick={() => setSelectedStay(stay.id)}
                                className={`p-4 sm:p-5 rounded-2xl border-2 text-left cursor-pointer transition-all flex flex-col sm:flex-row gap-5 select-none ${
                                  isSelected
                                    ? 'border-brand-olive bg-[#f4f7ed]/50 shadow-xs'
                                    : 'border-brand-cream-dim bg-white hover:border-brand-olive/30'
                                }`}
                              >
                                <div className="w-full sm:w-48 h-32 rounded-xl overflow-hidden shrink-0">
                                  <img 
                                    src={stay.image} 
                                    alt={stay.name}
                                    referrerPolicy="no-referrer"
                                    className="w-full h-full object-cover"
                                  />
                                </div>

                                <div className="space-y-2 flex-grow flex flex-col justify-between">
                                  <div>
                                    <div className="flex justify-between items-start">
                                      <div>
                                        <span className="text-[10px] font-mono tracking-widest uppercase font-bold text-brand-gray">
                                          {stay.type} • {stay.location}
                                        </span>
                                        <h3 className="font-display font-black text-base text-brand-charcoal leading-snug mt-0.5">
                                          {stay.name}
                                        </h3>
                                      </div>
                                      <div className="flex items-center gap-1 bg-[#f4f7ed] px-2 py-1 rounded-lg text-brand-olive font-bold text-xs">
                                        <Star className="w-3 h-3 fill-brand-olive text-brand-olive" />
                                        <span>{stay.rating}</span>
                                      </div>
                                    </div>

                                    {/* Features badge roll */}
                                    <div className="flex flex-wrap gap-1.5 mt-2.5">
                                      {stay.features.map(feat => (
                                        <span key={feat} className="px-2 py-0.5 bg-brand-cream border border-brand-cream-dim rounded-md text-[10px] font-bold text-brand-gray">
                                          {feat}
                                        </span>
                                      ))}
                                    </div>
                                  </div>

                                  <div className="pt-3 border-t border-brand-cream-dim/60 flex justify-between items-center">
                                    <div className="flex items-baseline gap-1">
                                      <span className="font-display font-extrabold text-brand-olive text-base">₹{stay.pricePerNight.toLocaleString('en-IN')}</span>
                                      <span className="text-[10px] text-brand-gray font-semibold">/ Night</span>
                                    </div>
                                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${
                                      isSelected ? 'border-brand-olive bg-brand-olive text-white' : 'border-brand-cream-dim'
                                    }`}>
                                      {isSelected && <Check className="w-3 h-3 stroke-[3px]" />}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>

                        <div className="pt-4 flex justify-between">
                          <button
                            onClick={() => setActiveSubTab('locations')}
                            className="px-5 py-3 border border-brand-cream-dim hover:border-brand-olive text-brand-gray rounded-full font-display text-xs font-bold uppercase tracking-widest transition-all cursor-pointer"
                          >
                            Back
                          </button>
                          <button
                            onClick={() => setActiveSubTab('ride')}
                            className="px-6 py-3 bg-brand-olive hover:bg-brand-charcoal text-white rounded-full font-display text-xs font-bold uppercase tracking-widest transition-colors flex items-center gap-2 cursor-pointer"
                          >
                            <span>Choose Transport</span>
                            <ArrowRight className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    )}

                    {/* ==================== 3. TRANSPORT ==================== */}
                    {activeSubTab === 'ride' && (
                      <div className="space-y-6" id="planner-transport">
                        <div>
                          <h2 className="font-display font-extrabold text-2xl text-brand-charcoal">
                            Choose Your Mountain Transit
                          </h2>
                          <p className="text-xs text-brand-gray mt-1 font-medium">
                            Select a rugged off-road Thar 4x4, spacious luxury Innova, or an adventure motorcycle.
                          </p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                          {TRANSPORTS.map((tr) => {
                            const isSelected = selectedTransport === tr.id;
                            return (
                              <div
                                key={tr.id}
                                onClick={() => setSelectedTransport(tr.id)}
                                className={`rounded-2xl border-2 overflow-hidden text-left cursor-pointer transition-all select-none flex flex-col justify-between bg-white ${
                                  isSelected
                                    ? 'border-brand-olive bg-[#f4f7ed]/40 shadow-xs'
                                    : 'border-brand-cream-dim hover:border-brand-olive/35'
                                }`}
                              >
                                <div className="h-40 relative">
                                  <img 
                                    src={tr.image} 
                                    alt={tr.name}
                                    referrerPolicy="no-referrer"
                                    className="w-full h-full object-cover"
                                  />
                                  <div className="absolute top-3 left-3 bg-brand-charcoal/80 text-white px-2 py-0.5 rounded-lg text-[10px] font-mono tracking-widest font-bold uppercase">
                                    {tr.capacity}
                                  </div>
                                </div>

                                <div className="p-4 space-y-3 flex-grow flex flex-col justify-between">
                                  <div>
                                    <span className="text-[10px] font-mono text-brand-gray font-bold tracking-wider uppercase block">
                                      {tr.type}
                                    </span>
                                    <h3 className="font-display font-black text-sm text-brand-charcoal mt-0.5">
                                      {tr.name}
                                    </h3>
                                    <span className="text-xs text-brand-gray font-medium">{tr.model}</span>
                                  </div>

                                  <div className="pt-3 border-t border-brand-cream-dim/60 flex justify-between items-center">
                                    <div className="flex items-baseline gap-1">
                                      <span className="font-display font-extrabold text-brand-olive text-sm">₹{tr.pricePerDay.toLocaleString('en-IN')}</span>
                                      <span className="text-[10px] text-brand-gray font-semibold">/ Day</span>
                                    </div>
                                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${
                                      isSelected ? 'border-brand-olive bg-brand-olive text-white' : 'border-brand-cream-dim'
                                    }`}>
                                      {isSelected && <Check className="w-3 h-3 stroke-[3px]" />}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>

                        <div className="pt-4 flex justify-between">
                          <button
                            onClick={() => setActiveSubTab('stays')}
                            className="px-5 py-3 border border-brand-cream-dim hover:border-brand-olive text-brand-gray rounded-full font-display text-xs font-bold uppercase tracking-widest transition-all cursor-pointer"
                          >
                            Back
                          </button>
                          <button
                            onClick={() => setActiveSubTab('spots')}
                            className="px-6 py-3 bg-brand-olive hover:bg-brand-charcoal text-white rounded-full font-display text-xs font-bold uppercase tracking-widest transition-colors flex items-center gap-2 cursor-pointer"
                          >
                            <span>Pick Sightseeing Spots</span>
                            <ArrowRight className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    )}

                    {/* ==================== 4. SIGHTSEEING ==================== */}
                    {activeSubTab === 'spots' && (
                      <div className="space-y-6" id="planner-sightseeing">
                        <div>
                          <h2 className="font-display font-extrabold text-2xl text-brand-charcoal">
                            Pick Scenic Tourist Spots to Visit
                          </h2>
                          <p className="text-xs text-brand-gray mt-1 font-medium">
                            Tailor-select bio-engineered root bridges, turquoise waterfalls, deep caverns, or skywalk bamboo cliffs.
                          </p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          {SPOTS.map((spot) => {
                            const isSelected = selectedSpots.includes(spot.id);
                            return (
                              <div
                                key={spot.id}
                                onClick={() => toggleSpot(spot.id)}
                                className={`p-4 rounded-xl border text-left cursor-pointer transition-all flex gap-4 select-none ${
                                  isSelected
                                    ? 'border-brand-olive bg-[#f4f7ed]/50 shadow-xs'
                                    : 'border-brand-cream-dim bg-white hover:border-brand-olive/30'
                                }`}
                              >
                                <div className="w-20 h-20 rounded-lg overflow-hidden shrink-0">
                                  <img 
                                    src={spot.image} 
                                    alt={spot.name}
                                    referrerPolicy="no-referrer"
                                    className="w-full h-full object-cover"
                                  />
                                </div>

                                <div className="space-y-1.5 flex-grow">
                                  <div className="flex justify-between items-start gap-1">
                                    <div>
                                      <span className="text-[9px] font-mono font-bold text-brand-gray uppercase tracking-wider block leading-none">
                                        {spot.category} • {spot.location}
                                      </span>
                                      <h3 className="font-display font-extrabold text-xs text-brand-charcoal leading-snug mt-1">
                                        {spot.name}
                                      </h3>
                                    </div>
                                    <div className={`w-4 h-4 rounded-md border flex items-center justify-center shrink-0 mt-0.5 ${
                                      isSelected ? 'border-brand-olive bg-brand-olive text-white' : 'border-brand-cream-dim'
                                    }`}>
                                      {isSelected && <Check className="w-3.5 h-3.5 stroke-[3px]" />}
                                    </div>
                                  </div>
                                  <p className="text-[11px] text-brand-gray font-medium leading-normal line-clamp-2">
                                    {spot.description}
                                  </p>
                                  <span className="block text-[10px] font-bold text-brand-olive">
                                    ⏱️ Duration: {spot.timeNeeded}
                                  </span>
                                </div>
                              </div>
                            );
                          })}
                        </div>

                        <div className="pt-4 flex justify-between">
                          <button
                            onClick={() => setActiveSubTab('ride')}
                            className="px-5 py-3 border border-brand-cream-dim hover:border-brand-olive text-brand-gray rounded-full font-display text-xs font-bold uppercase tracking-widest transition-all cursor-pointer"
                          >
                            Back
                          </button>
                          <button
                            onClick={() => setActiveSubTab('review')}
                            className="px-6 py-3 bg-brand-olive hover:bg-brand-charcoal text-white rounded-full font-display text-xs font-bold uppercase tracking-widest transition-colors flex items-center gap-2 cursor-pointer"
                          >
                            <span>Review Itinerary</span>
                            <ArrowRight className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    )}

                    {/* ==================== 5. REVIEW PLAN ==================== */}
                    {activeSubTab === 'review' && (
                      <div className="space-y-6" id="planner-review">
                        <div>
                          <h2 className="font-display font-extrabold text-2xl text-brand-charcoal">
                            Review & Add Experiences Stuff
                          </h2>
                          <p className="text-xs text-brand-gray mt-1 font-medium">
                            Elevate your planned highland journey with local culinary feasts, professional guides, or ziplining sports.
                          </p>
                        </div>

                        {/* Custom Addons Selection list */}
                        <div className="space-y-3.5" id="addons-selection">
                          {ACTIVITIES.map((act) => {
                            const isSelected = selectedActivities.includes(act.id);
                            return (
                              <div
                                key={act.id}
                                onClick={() => toggleActivity(act.id)}
                                className={`p-4 rounded-xl border text-left cursor-pointer transition-all flex items-start gap-4 select-none ${
                                  isSelected
                                    ? 'border-brand-olive bg-[#f4f7ed]/65 shadow-xs'
                                    : 'border-brand-cream-dim bg-white hover:border-brand-olive/30'
                                }`}
                              >
                                <div className="text-2xl bg-brand-cream p-2.5 rounded-xl border border-brand-cream-dim shrink-0">
                                  {act.icon}
                                </div>
                                <div className="flex-grow space-y-0.5">
                                  <div className="flex justify-between items-center">
                                    <h3 className="font-display font-extrabold text-sm text-brand-charcoal">
                                      {act.name}
                                    </h3>
                                    <span className="font-display font-bold text-xs text-brand-olive shrink-0">
                                      + ₹{act.price.toLocaleString('en-IN')}
                                    </span>
                                  </div>
                                  <p className="text-xs text-brand-gray font-medium leading-relaxed">
                                    {act.description}
                                  </p>
                                </div>
                                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 mt-1 ${
                                  isSelected ? 'border-brand-olive bg-brand-olive text-white' : 'border-brand-cream-dim'
                                }`}>
                                  {isSelected && <Check className="w-3 h-3 stroke-[3px]" />}
                                </div>
                              </div>
                            );
                          })}
                        </div>

                        {/* Optional custom message */}
                        <div className="p-5 bg-[#fbfbf8] border border-brand-cream-dim/65 rounded-2xl space-y-3">
                          <label className="text-xs font-bold text-brand-charcoal block">Any specific customization note?</label>
                          <textarea
                            rows={3}
                            placeholder="Specify if you require physical travel permits arranged for senior citizens, infant car seat availability, high altitude acclimatization breaks, or local Khasi folk singers at campfires..."
                            className="w-full bg-white border border-brand-cream-dim rounded-xl px-4 py-3 text-xs font-semibold focus:outline-none focus:border-brand-olive focus:ring-1 focus:ring-brand-olive resize-none"
                          />
                        </div>

                        {/* Bottom Nav Buttons */}
                        <div className="pt-4 flex justify-between">
                          <button
                            onClick={() => setActiveSubTab('spots')}
                            className="px-5 py-3 border border-brand-cream-dim hover:border-brand-olive text-brand-gray rounded-full font-display text-xs font-bold uppercase tracking-widest transition-all cursor-pointer"
                          >
                            Back
                          </button>
                          
                          <button
                            onClick={handleConfirmPlanner}
                            disabled={isSubmitting}
                            className="px-8 py-3.5 bg-brand-olive hover:bg-brand-charcoal disabled:bg-brand-gray text-white rounded-full font-display text-xs font-bold uppercase tracking-widest transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
                          >
                            {isSubmitting ? (
                              <span className="flex items-center gap-2">
                                <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                                </svg>
                                Locking Itinerary...
                              </span>
                            ) : (
                              <>
                                <span>Confirm & Lock Itinerary</span>
                                <Sparkles className="w-4 h-4" />
                              </>
                            )}
                          </button>
                        </div>
                      </div>
                    )}

                  </motion.div>
                </AnimatePresence>
              </div>

            </div>

            {/* Right Panel: Live Itinerary Sticky Card (4 Columns) */}
            <div className="lg:col-span-4 lg:sticky lg:top-24 space-y-6" id="planner-sticky-summary">
              
              {/* Dynamic Live Summary Card */}
              <div className="bg-white border border-brand-cream-dim/60 rounded-[2rem] p-6 sm:p-7 shadow-xs space-y-6">
                <div className="flex justify-between items-center pb-3 border-b border-brand-cream-dim/70">
                  <h3 className="font-display font-extrabold text-base text-brand-charcoal flex items-center gap-1.5">
                    <CompassIcon className="w-4.5 h-4.5 text-brand-olive" />
                    Live Itinerary
                  </h3>
                  <span className="text-[9px] font-mono font-bold text-brand-gray uppercase tracking-widest bg-brand-cream px-2 py-0.5 rounded-md">
                    Estimator
                  </span>
                </div>

                {/* Itinerary configuration sliders */}
                <div className="space-y-4 text-xs font-sans">
                  
                  {/* Duration Slider */}
                  <div className="space-y-1.5">
                    <div className="flex justify-between font-bold text-brand-charcoal">
                      <span>Trip Duration:</span>
                      <span className="text-brand-olive">{duration} Days / {duration - 1} Nights</span>
                    </div>
                    <input 
                      type="range" 
                      min="3" 
                      max="10" 
                      value={duration}
                      onChange={(e) => setDuration(Number(e.target.value))}
                      className="w-full accent-brand-olive bg-brand-cream h-1.5 rounded-lg appearance-none cursor-pointer"
                    />
                  </div>

                  {/* Travelers Counter */}
                  <div className="space-y-1.5">
                    <span className="font-bold text-brand-charcoal block">Travelers Group Size:</span>
                    <div className="flex items-center justify-between gap-4 p-2 bg-brand-cream border border-brand-cream-dim/50 rounded-xl">
                      <div className="flex items-center gap-1.5 pl-1.5">
                        <User className="w-4 h-4 text-brand-gray" />
                        <span className="font-bold text-brand-charcoal text-[11px]">
                          {adults} Adults {kids > 0 ? `, ${kids} Kids` : ''}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <button 
                          onClick={() => setAdults(Math.max(1, adults - 1))}
                          className="w-7 h-7 bg-white rounded-lg border border-brand-cream-dim/80 flex items-center justify-center font-bold text-brand-charcoal hover:bg-brand-cream-dark transition-all"
                        >
                          -
                        </button>
                        <button 
                          onClick={() => setAdults(Math.min(8, adults + 1))}
                          className="w-7 h-7 bg-white rounded-lg border border-brand-cream-dim/80 flex items-center justify-center font-bold text-brand-charcoal hover:bg-brand-cream-dark transition-all"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Dates calendar preview */}
                  <div className="space-y-1.5">
                    <label className="font-bold text-brand-charcoal block">Arrival Date:</label>
                    <div className="relative">
                      <input 
                        type="text" 
                        value={startDate} 
                        onChange={(e) => setStartDate(e.target.value)}
                        className="w-full bg-brand-cream border border-brand-cream-dim/50 rounded-xl px-3.5 py-2.5 font-semibold text-brand-charcoal focus:outline-none focus:border-brand-olive text-xs"
                      />
                      <Calendar className="w-4 h-4 text-brand-gray absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    </div>
                  </div>
                </div>

                <div className="h-[1px] bg-brand-cream-dim" />

                {/* Selection Checklist Feed */}
                <div className="space-y-3.5 text-xs">
                  
                  {/* Location selected item */}
                  <div className="flex items-start gap-3">
                    <div className="w-4.5 h-4.5 rounded-full bg-brand-cream border border-brand-cream-dim flex items-center justify-center text-[10px] shrink-0">
                      🗺️
                    </div>
                    <div>
                      <span className="block text-brand-gray font-bold text-[10px] uppercase leading-none tracking-wider mb-1">SELECTED AREAS</span>
                      <span className="font-bold text-brand-charcoal block leading-tight">
                        {selectedLocations.map(id => LOCATIONS.find(l => l.id === id)?.name).join(', ')}
                      </span>
                    </div>
                  </div>

                  {/* Accommodation selected item */}
                  <div className="flex items-start gap-3">
                    <div className="w-4.5 h-4.5 rounded-full bg-brand-cream border border-brand-cream-dim flex items-center justify-center text-[10px] shrink-0">
                      🏨
                    </div>
                    <div>
                      <span className="block text-brand-gray font-bold text-[10px] uppercase leading-none tracking-wider mb-1">COZY ACCOMMODATION</span>
                      <span className="font-bold text-brand-charcoal block leading-tight">
                        {currentStay.name}
                      </span>
                    </div>
                  </div>

                  {/* Ride selected item */}
                  <div className="flex items-start gap-3">
                    <div className="w-4.5 h-4.5 rounded-full bg-brand-cream border border-brand-cream-dim flex items-center justify-center text-[10px] shrink-0">
                      🚗
                    </div>
                    <div>
                      <span className="block text-brand-gray font-bold text-[10px] uppercase leading-none tracking-wider mb-1">MOUNTAIN VEHICLE</span>
                      <span className="font-bold text-brand-charcoal block leading-tight">
                        {currentTransport.name} ({currentTransport.model})
                      </span>
                    </div>
                  </div>

                  {/* Sightseeing spots count */}
                  <div className="flex items-start gap-3">
                    <div className="w-4.5 h-4.5 rounded-full bg-brand-cream border border-brand-cream-dim flex items-center justify-center text-[10px] shrink-0">
                      🌲
                    </div>
                    <div>
                      <span className="block text-brand-gray font-bold text-[10px] uppercase leading-none tracking-wider mb-1">SIGHTSEEING SCENE</span>
                      <span className="font-bold text-brand-charcoal block leading-tight">
                        {spotsCount} Scenic Spot{spotsCount > 1 ? 's' : ''} Selected
                      </span>
                    </div>
                  </div>
                </div>

                {/* Sub-Pricing block with forest olive theme */}
                <div className="bg-brand-cream border border-brand-cream-dim rounded-2xl p-4 space-y-2.5">
                  <div className="flex justify-between items-baseline">
                    <span className="text-[10px] font-mono text-brand-gray font-bold uppercase tracking-wider">
                      Budget Estimate:
                    </span>
                    <span className="font-display font-black text-xl text-brand-olive">
                      ₹{totalCost.toLocaleString('en-IN')}
                    </span>
                  </div>
                  <div className="text-[10px] text-brand-gray leading-normal space-y-1">
                    <div className="flex justify-between">
                      <span>Stay Cost ({duration} Nights):</span>
                      <span className="font-semibold text-brand-charcoal-light">₹{stayCost.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Vehicle ride ({duration} Days):</span>
                      <span className="font-semibold text-brand-charcoal-light">₹{transportCost.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Activities / guide addons:</span>
                      <span className="font-semibold text-brand-charcoal-light">₹{activitiesCost.toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                {/* Lock in plan Button */}
                <button
                  onClick={handleConfirmPlanner}
                  disabled={isSubmitting}
                  className="w-full py-4 bg-[#155e37] hover:bg-[#0e4425] text-white rounded-full font-display text-xs font-bold uppercase tracking-widest transition-all cursor-pointer flex items-center justify-center gap-1.5 shadow"
                >
                  {isSubmitting ? 'Securing Plan...' : 'Confirm & Generate Plan'}
                </button>
              </div>

              {/* Secure guarantee badge */}
              <div className="p-5 border border-brand-cream-dim/60 bg-white rounded-2xl text-xs flex gap-3 text-brand-gray">
                <ShieldCheck className="w-5 h-5 text-brand-olive shrink-0 mt-0.5" />
                <div className="space-y-0.5 font-medium leading-relaxed">
                  <h4 className="font-bold text-brand-charcoal">Flexible Highland Guarantee</h4>
                  <p>All customized travel plans feature free dates rescheduling up to 48 hours prior to local arrival.</p>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      </div>
    </div>
  );
}
