import { Product } from '../types';

export const MOCK_PRODUCTS: Product[] = [
  // PHONES
  {
    id: '1',
    name: 'iPhone 15 Pro Max',
    description: 'The definitive smartphone. Forged in aerospace-grade titanium with the A17 Pro chip.',
    category: 'Phones',
    images: [
      'https://images.unsplash.com/photo-1695048133142-1a20484d2569?q=90&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1696446701796-da61225697cc?q=90&w=1200&auto=format&fit=crop'
    ],
    specs: { 'Processor': 'A17 Pro', 'Space': '1TB', 'Color': 'Natural Titanium' },
    startPrice: 159900.00,
    currentPrice: 159900.00,
    reservePrice: 89000.00,
    endsAt: new Date(Date.now() + 1000 * 60 * 60 * 2), // 2 hours
    status: 'active',
    bidders: 142
  },
  {
    id: '102',
    name: 'Samsung Galaxy S24 Ultra',
    description: 'Galaxy AI is here. The ultimate Android experience with Titanium frame and Snapdragon 8 Gen 3.',
    category: 'Phones',
    images: [
      'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?q=90&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1678911820864-e5c67e784b73?q=90&w=1200&auto=format&fit=crop'
    ],
    specs: { 'Processor': 'Snapdragon 8 Gen 3', 'S-Pen': 'Included', 'Camera': '200MP' },
    startPrice: 139999.00,
    currentPrice: 139999.00,
    reservePrice: 95000.00,
    endsAt: new Date(Date.now() + 1000 * 60 * 60 * 5),
    status: 'active',
    bidders: 89
  },
  {
    id: '103',
    name: 'Google Pixel 8 Pro',
    description: 'The most pro Pixel yet. With Gemini Nano and the best computational photography in the game.',
    category: 'Phones',
    images: [
      'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=90&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1512054502232-10a0a035d672?q=90&w=1200&auto=format&fit=crop'
    ],
    specs: { 'Chip': 'Tensor G3', 'Display': 'Super Actua', 'AI': 'Gemini Built-in' },
    startPrice: 106999.00,
    currentPrice: 106999.00,
    reservePrice: 75000.00,
    endsAt: new Date(Date.now() + 1000 * 60 * 45), // 45 mins
    status: 'active',
    bidders: 210
  },

  // PHOTOGRAPHY
  {
    id: '2',
    name: 'Leica Q3',
    description: 'The soul of street photography. Full-frame compact masterpiece with 60MP sensor.',
    category: 'Photography',
    images: [
      'https://images.unsplash.com/photo-1516961642265-531546e84af2?q=90&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1617005082133-548c4dd27f35?q=90&w=1200&auto=format&fit=crop'
    ],
    specs: { 'Sensor': '60MP Full-Frame', 'Lens': 'Summilux 28mm', 'Video': '8K' },
    startPrice: 545000.00,
    currentPrice: 545000.00,
    reservePrice: 420000.00,
    endsAt: new Date(Date.now() + 1000 * 60 * 60 * 4),
    status: 'active',
    bidders: 84
  },
  {
    id: '6',
    name: 'Fujifilm X100VI',
    description: 'The viral sensation. 40MP APS-C sensor with IBIS in a classic rangefinder body.',
    category: 'Photography',
    images: [
      'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?q=90&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1510127034890-ba27508e9f1c?q=90&w=1200&auto=format&fit=crop'
    ],
    specs: { 'Sensor': '40.2MP X-Trans', 'Simulations': '20 Modes', 'IBIS': '6-Stop' },
    startPrice: 164000.00,
    currentPrice: 164000.00,
    reservePrice: 135000.00,
    endsAt: new Date(Date.now() + 1000 * 60 * 15), // 15 mins
    status: 'active',
    bidders: 620
  },
  {
    id: '203',
    name: 'Sony A7R V',
    description: 'Resolution meets intelligence. 61MP sensor with AI-based autofocus processing unit.',
    category: 'Photography',
    images: [
      'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=90&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1624823183483-e8bdce0df082?q=90&w=1200&auto=format&fit=crop'
    ],
    specs: { 'Sensor': '61MP Exmor R', 'Focus': 'Real-time Tracking', 'LCD': '4-Axis' },
    startPrice: 359990.00,
    currentPrice: 359990.00,
    reservePrice: 280000.00,
    endsAt: new Date(Date.now() + 1000 * 60 * 60 * 8),
    status: 'active',
    bidders: 45
  },

  // COMPUTING
  {
    id: '3',
    name: 'MacBook Pro 16"',
    description: 'Mind-blowing performance. M3 Max chip with Space Black finish.',
    category: 'Computing',
    images: [
      'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=90&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?q=90&w=1200&auto=format&fit=crop'
    ],
    specs: { 'Chip': 'M3 Max', 'Ram': '48GB', 'SSD': '1TB' },
    startPrice: 349900.00,
    currentPrice: 349900.00,
    reservePrice: 280000.00,
    endsAt: new Date(Date.now() + 1000 * 60 * 60 * 1),
    status: 'active',
    bidders: 213
  },
  {
    id: '5',
    name: 'ASUS ROG Zephyrus G14',
    description: 'Gaming sleakness. OLED display, CNC aluminum chassis, and RTX 4070 power.',
    category: 'Computing',
    images: [
      'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?q=90&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=90&w=1200&auto=format&fit=crop'
    ],
    specs: { 'GPU': 'RTX 4070', 'Screen': '3K OLED', 'Weight': '1.50kg' },
    startPrice: 189000.00,
    currentPrice: 189000.00,
    reservePrice: 142000.00,
    endsAt: new Date(Date.now() + 1000 * 60 * 60 * 12),
    status: 'active',
    bidders: 312
  },
  {
    id: '303',
    name: 'Dell XPS 15',
    description: 'The creative workhorse. InfinityEdge display with woven glass fiber palm rest.',
    category: 'Computing',
    images: [
      'https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?q=90&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1588872657578-139a62838589?q=90&w=1200&auto=format&fit=crop'
    ],
    specs: { 'CPU': 'Core i9', 'Display': '4K UHD+', 'Chassis': 'Aluminum' },
    startPrice: 245000.00,
    currentPrice: 245000.00,
    reservePrice: 190000.00,
    endsAt: new Date(Date.now() + 1000 * 60 * 60 * 24),
    status: 'active',
    bidders: 112
  },

  // AUDIO
  {
    id: '4',
    name: 'Sony WH-1000XM5',
    description: 'Silence the world. Industry-leading noise cancellation.',
    category: 'Audio',
    images: [
      'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?q=90&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1546435770-a3e426bf472b?q=90&w=1200&auto=format&fit=crop'
    ],
    specs: { 'Driver': '30mm', 'Battery': '30h', 'Chip': 'V1' },
    startPrice: 29900.00,
    currentPrice: 29900.00,
    reservePrice: 19500.00,
    endsAt: new Date(Date.now() + 1000 * 60 * 60 * 3),
    status: 'active',
    bidders: 450
  },
  {
    id: '402',
    name: 'AirPods Max',
    description: 'High-fidelity audio. Computational audio with the H1 chip.',
    category: 'Audio',
    images: [
      'https://images.unsplash.com/photo-1613040809024-b4ef7ba99bc3?q=90&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1628202926206-c63a34b1618f?q=90&w=1200&auto=format&fit=crop'
    ],
    specs: { 'Driver': 'Apple Dynamic', 'Build': 'Stainless Steel', 'Spatial': 'Dolby Atmos' },
    startPrice: 59900.00,
    currentPrice: 59900.00,
    reservePrice: 35000.00,
    endsAt: new Date(Date.now() + 1000 * 60 * 60 * 1.5),
    status: 'active',
    bidders: 560
  },
  {
    id: '403',
    name: 'Bang & Olufsen Beosound',
    description: 'Portable luxury. 360-degree sound in an aluminum masterpiece.',
    category: 'Audio',
    images: [
      'https://images.unsplash.com/photo-1545454675-3531b543be5d?q=90&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1589003077984-894e133dabab?q=90&w=1200&auto=format&fit=crop'
    ],
    specs: { 'Material': 'Aluminium', 'Playtime': '18h', 'Rating': 'IP67' },
    startPrice: 48000.00,
    currentPrice: 48000.00,
    reservePrice: 32000.00,
    endsAt: new Date(Date.now() + 1000 * 60 * 60 * 10),
    status: 'active',
    bidders: 78
  },

  // GAMING / MIX
  {
    id: '501',
    name: 'PlayStation 5 Slim',
    description: 'Play Has No Limits. Lightning fast loading with high-speed SSD.',
    category: 'Gaming',
    images: [
      'https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?q=90&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1621259182902-3b836c824e24?q=90&w=1200&auto=format&fit=crop'
    ],
    specs: { 'Storage': '1TB SSD', 'Haptics': 'DualSense', 'Resolution': '4K/120Hz' },
    startPrice: 54990.00,
    currentPrice: 54990.00,
    reservePrice: 40000.00,
    endsAt: new Date(Date.now() + 1000 * 60 * 60 * 6),
    status: 'active',
    bidders: 990
  },
  {
    id: '502',
    name: 'Steam Deck OLED',
    description: 'Gaming handheld perfected. HDR OLED screen with longer battery life.',
    category: 'Gaming',
    images: [
      'https://images.unsplash.com/photo-1585620385456-4759f9b5c7d9?q=90&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1587202372634-32705e0bd1a9?q=90&w=1200&auto=format&fit=crop'
    ],
    specs: { 'Screen': '7.4" OLED', 'Refresh': '90Hz', 'Storage': '512GB' },
    startPrice: 48000.00,
    currentPrice: 48000.00,
    reservePrice: 35000.00,
    endsAt: new Date(Date.now() + 1000 * 60 * 30), // 30 mins
    status: 'active',
    bidders: 325
  },
  {
    id: '503',
    name: 'Nintendo Switch OLED',
    description: 'Vibrant visuals. 7-inch OLED screen for tabletop and handheld play.',
    category: 'Gaming',
    images: [
      'https://images.unsplash.com/photo-1578303512597-81e6cc155b3e?q=90&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1612036782180-6f0b6cd846fe?q=90&w=1200&auto=format&fit=crop'
    ],
    specs: { 'Mode': 'Tv/Tabletop', 'Storage': '64GB', 'Audio': 'Enhanced' },
    startPrice: 32000.00,
    currentPrice: 32000.00,
    reservePrice: 22000.00,
    endsAt: new Date(Date.now() + 1000 * 60 * 60 * 48),
    status: 'active',
    bidders: 156
  }
];