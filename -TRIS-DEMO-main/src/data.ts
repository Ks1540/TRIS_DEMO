import { Product, Vehicle, Experience } from './types';

export const PRODUCTS: Product[] = [
  {
    id: 'prod-1',
    name: 'Hand-Woven Khasi Shawl',
    price: 9900,
    image: 'https://images.unsplash.com/photo-1544441893-675973e31985?q=80&w=600',
    category: 'Arts & Crafts',
    description: 'Traditional geometric patterns intricately woven by master weavers of the Khasi hills, showcasing generations of tribal textile heritage.',
    rating: 4.9,
    bestSeller: true,
    sizes: ['Standard', 'Large']
  },
  {
    id: 'prod-2',
    name: 'Wild Forest Honey',
    price: 2300,
    image: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?q=80&w=600',
    category: 'Beverages',
    description: 'Raw, unpasteurized amber honey sourced directly from deep wild hives in the dense, pristine sub-tropical jungles of Meghalaya.',
    rating: 4.8,
    bestSeller: true,
    newArrival: true,
    sizes: ['250g', '500g', '1kg']
  },
  {
    id: 'prod-3',
    name: 'Traditional Bamboo Flute',
    price: 3700,
    image: 'https://images.unsplash.com/photo-1615190097035-f7b9e894f068?q=80&w=600',
    category: 'Musical instrument',
    description: 'Hand-carved resonant bamboo flute carefully tuned by local artisans of Nongtnger village to produce authentic, ethereal mountain melodies.',
    rating: 4.7,
    newArrival: true,
    sizes: ['Key C', 'Key G']
  },
  {
    id: 'prod-4',
    name: 'Khasi Traditional Hat (Knup)',
    price: 1800,
    image: 'https://images.unsplash.com/photo-1533575770077-052fa2c609fc?q=80&w=600',
    category: 'Souvenirs',
    description: 'A beautiful, protective rain shield handcrafted using woven bamboo slips and broad dried palm leaves, traditional to high-rainfall farming.',
    rating: 4.6,
    sizes: ['Medium', 'Large']
  },
  {
    id: 'prod-5',
    name: 'Lakadong Turmeric Powder',
    price: 850,
    image: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?q=80&w=600',
    category: 'Beverages',
    description: 'World-renowned premium turmeric grown in Jaintia Hills, harvested with traditional methods and boasting an exceptionally high curcumin content of 7-12%.',
    rating: 4.9,
    bestSeller: true,
    sizes: ['150g', '300g']
  },
  {
    id: 'prod-6',
    name: 'Handmade Cane Planter',
    price: 2100,
    image: 'https://images.unsplash.com/photo-1535158651416-600c99df3d7a?q=80&w=600',
    category: 'Arts & Crafts',
    description: 'Elegant, lightweight plant holder intricately woven from premium indigenous mountain cane, treated naturally to withstand humidity.',
    rating: 4.5,
    sizes: ['Small', 'Medium', 'Large']
  },
  {
    id: 'prod-7',
    name: 'Wild Sohiong Berry Conserve',
    price: 650,
    image: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?q=80&w=600',
    category: 'Beverages',
    description: 'Artisanal low-sugar preserve made of wild Sohiong black cherries handpicked from high-altitude community orchards in the East Khasi Hills.',
    rating: 4.7,
    newArrival: true,
    sizes: ['200g', '400g']
  },
  {
    id: 'prod-8',
    name: 'Jaintia Beaded Coral Necklace',
    price: 14500,
    image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=600',
    category: 'Traditional Jewellery',
    description: 'Stunning ceremonial necklace (Paila) meticulously strung with polished organic red coral beads and heavy, hand-beaten gold plated spheres.',
    rating: 5.0,
    bestSeller: true,
    sizes: ['Standard 18"']
  },
  {
    id: 'prod-9',
    name: 'Mawphlang Sacred Monolith Replica',
    price: 4200,
    image: 'https://images.unsplash.com/photo-1605721911519-3dfeb3be25e7?q=80&w=600',
    category: 'Souvenirs',
    description: 'A miniature replica sculptured in native riverbed slate stone, paying homage to the sacred ancestral monoliths of the Mawphlang sacred groves.',
    rating: 4.8,
    sizes: ['4 inch', '6 inch']
  }
];

export const VEHICLES: Vehicle[] = [
  {
    name: 'Trusted Local Ride',
    model: 'Toyota Innova Crysta',
    basePrice: 42000,
    image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?q=80&w=600'
  },
  {
    name: 'Highland Adventurer',
    model: 'Mahindra Thar 4x4',
    basePrice: 48000,
    image: 'https://images.unsplash.com/photo-1632245889029-e406faaa34cd?q=80&w=600'
  },
  {
    name: 'Classic Off-Roader',
    model: 'Maruti Suzuki Gypsy',
    basePrice: 35000,
    image: 'https://images.unsplash.com/photo-1609521263047-f8f205293f24?q=80&w=600'
  }
];

export const EXPERIENCES: Experience[] = [
  {
    name: 'Cultural Immersion & Hidden Waterfalls',
    description: 'Deep dive into Khasi folklore, sacred groves, community-led lunches, and private treks to lesser-known turquoise lagoons.',
    fee: 6500,
    image: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?q=80&w=600'
  },
  {
    name: 'Living Root Bridges & Village Homestays',
    description: 'Walk across the double-decker living root bridge of Nongriat, stay in the cleanest village Mawlynnong, and dine with village elders.',
    fee: 8000,
    image: 'https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?q=80&w=600'
  },
  {
    name: 'Sacred Forest Trek & Caving Expedition',
    description: 'A thrilling spelunking tour inside Krem Liat Prah or Mawsmai caves paired with botanical exploration in mystical wet forests.',
    fee: 7500,
    image: 'https://images.unsplash.com/photo-1448375240586-882707db888b?q=80&w=600'
  }
];
