import { useState, useMemo } from 'react';
import { Heart, ChevronDown, Check, Star, ArrowRight, Eye, SlidersHorizontal, Plus, Minus } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Product } from '../types';
import { PRODUCTS } from '../data';

interface ShopViewProps {
  onProductClick: (product: Product) => void;
  onAddToCart: (product: Product, quantity: number, size?: string) => void;
  wishlist: string[];
  onToggleWishlist: (productId: string) => void;
}

export default function ShopView({
  onProductClick,
  onAddToCart,
  wishlist,
  onToggleWishlist
}: ShopViewProps) {
  // Filters & State
  const [selectedCategory, setSelectedCategory] = useState<string>('All Products');
  const [checkedTypes, setCheckedTypes] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<number>(15000);
  const [checkedSizes, setCheckedSizes] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<string>('featured');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Sidebar collapsibles
  const [isTypeOpen, setIsTypeOpen] = useState(true);
  const [isPriceOpen, setIsPriceOpen] = useState(true);
  const [isSizeOpen, setIsSizeOpen] = useState(true);

  // Available categories based on layout screenshot
  const categoriesList = [
    'All Products',
    '*Best Sellers*',
    '*New Arrivals*',
    'Arts & Crafts',
    'Beverages',
    'Musical instrument',
    'Souvenirs',
    'Traditional Jewellery'
  ];

  // Map user categories safely
  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    setCurrentPage(1);
    // Auto sync type checkboxes
    if (category !== 'All Products' && category !== '*Best Sellers*' && category !== '*New Arrivals*') {
      setCheckedTypes([category]);
    } else {
      setCheckedTypes([]);
    }
  };

  const handleTypeCheckboxChange = (type: string) => {
    if (checkedTypes.includes(type)) {
      setCheckedTypes(checkedTypes.filter(t => t !== type));
    } else {
      setCheckedTypes([...checkedTypes, type]);
    }
    setCurrentPage(1);
  };

  const handleSizeCheckboxChange = (size: string) => {
    if (checkedSizes.includes(size)) {
      setCheckedSizes(checkedSizes.filter(s => s !== size));
    } else {
      setCheckedSizes([...checkedSizes, size]);
    }
    setCurrentPage(1);
  };

  // Filter & Sort Logic
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter(product => {
      // Category filter (Sidebar menu selection)
      if (selectedCategory === '*Best Sellers*' && !product.bestSeller) return false;
      if (selectedCategory === '*New Arrivals*' && !product.newArrival) return false;
      if (
        selectedCategory !== 'All Products' &&
        selectedCategory !== '*Best Sellers*' &&
        selectedCategory !== '*New Arrivals*' &&
        product.category !== selectedCategory
      ) {
        return false;
      }

      // Checkbox Product Types
      if (checkedTypes.length > 0 && !checkedTypes.includes(product.category)) return false;

      // Price limit
      if (product.price > priceRange) return false;

      // Size checklist
      if (checkedSizes.length > 0) {
        if (!product.sizes) return false;
        const hasSize = product.sizes.some(size => checkedSizes.includes(size));
        if (!hasSize) return false;
      }

      // Search bar
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        return product.name.toLowerCase().includes(q) || product.description.toLowerCase().includes(q);
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      // 'featured' defaults to original data order (or bestSellers first)
      return (b.bestSeller ? 1 : 0) - (a.bestSeller ? 1 : 0);
    });
  }, [selectedCategory, checkedTypes, priceRange, checkedSizes, sortBy, searchQuery]);

  // Pagination bounds
  const itemsPerPage = 6;
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage) || 1;
  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredProducts.slice(start, start + itemsPerPage);
  }, [filteredProducts, currentPage]);

  const displayedCountText = useMemo(() => {
    const total = filteredProducts.length;
    if (total === 0) return 'Showing 0 products';
    const start = (currentPage - 1) * itemsPerPage + 1;
    const end = Math.min(currentPage * itemsPerPage, total);
    return `Showing ${start}-${end} of ${total} products`;
  }, [filteredProducts, currentPage]);

  return (
    <div className="flex flex-col min-h-screen bg-brand-cream" id="shop-view-root">
      {/* 1. Hero Banner with Parallax-esque background */}
      <div className="relative overflow-hidden py-24 px-4 text-center bg-brand-cream-dark border-b border-brand-lime/20" id="shop-hero">
        {/* Decorative backdrop graphics simulating hills and clouds */}
        <div className="absolute inset-0 opacity-15 pointer-events-none mix-blend-overlay">
          <img 
            src="https://images.unsplash.com/photo-1548013146-72479768bada?q=80&w=1200" 
            alt="Meghalaya Hills" 
            className="w-full h-full object-cover scale-105"
            style={{ filter: 'grayscale(30%)' }}
          />
        </div>
        
        {/* Soft floating mist circles */}
        <div className="absolute -top-12 -left-20 w-72 h-72 bg-brand-lime/40 rounded-full blur-3xl pointer-events-none animate-pulse" />
        <div className="absolute -bottom-16 -right-20 w-80 h-80 bg-brand-jungle/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-3xl mx-auto space-y-4">
          <motion.h1 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-display font-extrabold text-4xl md:text-6xl text-brand-charcoal-light tracking-tight"
          >
            The Meghalaya Collection
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.15 }}
            className="font-sans text-sm md:text-base text-brand-gray leading-relaxed max-w-2xl mx-auto"
          >
            Hand-curated treasures from the Abode of Clouds, crafted by local artisans with love and tradition.
          </motion.p>
        </div>
      </div>

      {/* 2. Marquee Endless Notice Bar */}
      <div className="bg-brand-charcoal py-3.5 text-white overflow-hidden relative border-y border-brand-lime/15" id="announcement-bar">
        <div className="flex whitespace-nowrap animate-marquee">
          <span className="text-xs font-mono tracking-widest uppercase flex items-center gap-4 mx-4">
            ✨ TRADITIONAL HAND-WOVEN TREASURES - LIMITED COLLECTION JUST FOR YOU
            <span className="text-brand-lime">•</span>
            💖 MESSAGE US ON WHATSAPP FOR QUICK ASSISTANCE
            <span className="text-brand-lime">•</span>
            🎁 WANT TO CUSTOMIZE A SPECIAL ARTISANAL GIFT BOX?
            <span className="text-brand-lime">•</span>
          </span>
          {/* Duplicated for smooth loop */}
          <span className="text-xs font-mono tracking-widest uppercase flex items-center gap-4 mx-4" aria-hidden="true">
            ✨ TRADITIONAL HAND-WOVEN TREASURES - LIMITED COLLECTION JUST FOR YOU
            <span className="text-brand-lime">•</span>
            💖 MESSAGE US ON WHATSAPP FOR QUICK ASSISTANCE
            <span className="text-brand-lime">•</span>
            🎁 WANT TO CUSTOMIZE A SPECIAL ARTISANAL GIFT BOX?
            <span className="text-brand-lime">•</span>
          </span>
        </div>
        <style>{`
          @keyframes marquee {
            0% { transform: translateX(0%); }
            100% { transform: translateX(-50%); }
          }
          .animate-marquee {
            display: inline-flex;
            animation: marquee 25s linear infinite;
            width: max-content;
          }
        `}</style>
      </div>

      {/* 3. Main Content Grid & Sidebars */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12" id="shop-main-layout">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
          
          {/* Sidebar Filters */}
          <div className="space-y-8" id="shop-sidebar">
            
            {/* Browse By */}
            <div className="bg-white/50 border border-brand-lime/10 rounded-2xl p-6 shadow-xs">
              <h3 className="font-display font-extrabold text-base text-brand-charcoal mb-4">
                Browse by
              </h3>
              <div className="flex flex-col space-y-1.5">
                {categoriesList.map((category) => (
                  <button
                    key={category}
                    onClick={() => handleCategorySelect(category)}
                    className={`text-left px-3 py-2 text-xs font-medium rounded-lg transition-all ${
                      selectedCategory === category
                        ? 'bg-brand-lime text-brand-charcoal font-semibold shadow-xs border-l-4 border-brand-olive'
                        : 'text-brand-gray hover:text-brand-charcoal hover:bg-brand-cream-dark/50'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            {/* Filter By Section */}
            <div className="bg-white/50 border border-brand-lime/10 rounded-2xl p-6 space-y-6 shadow-xs">
              <div className="flex items-center justify-between">
                <h3 className="font-display font-extrabold text-base text-brand-charcoal">
                  Filter by
                </h3>
                <SlidersHorizontal className="w-4 h-4 text-brand-olive" />
              </div>

              {/* Product Type (Category) Collapsible */}
              <div className="border-t border-brand-cream-dim pt-4">
                <button
                  onClick={() => setIsTypeOpen(!isTypeOpen)}
                  className="w-full flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-brand-charcoal hover:text-brand-olive py-1"
                >
                  <span>Product type</span>
                  {isTypeOpen ? <Minus className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                </button>
                
                <AnimatePresence>
                  {isTypeOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden space-y-2 mt-3 pl-1"
                    >
                      {['Arts & Crafts', 'Beverages', 'Musical instrument', 'Traditional Jewellery'].map((type) => (
                        <label key={type} className="flex items-center gap-2.5 text-xs text-brand-gray cursor-pointer hover:text-brand-charcoal">
                          <input
                            type="checkbox"
                            checked={checkedTypes.includes(type)}
                            onChange={() => handleTypeCheckboxChange(type)}
                            className="rounded border-brand-cream-dim text-brand-olive focus:ring-brand-olive accent-brand-olive w-3.5 h-3.5"
                          />
                          <span>{type}</span>
                        </label>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Price Collapsible */}
              <div className="border-t border-brand-cream-dim pt-4">
                <button
                  onClick={() => setIsPriceOpen(!isPriceOpen)}
                  className="w-full flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-brand-charcoal hover:text-brand-olive py-1"
                >
                  <span>Price</span>
                  {isPriceOpen ? <Minus className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                </button>
                
                <AnimatePresence>
                  {isPriceOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden mt-3 pl-1 space-y-2"
                    >
                      <input
                        type="range"
                        min="500"
                        max="15000"
                        step="500"
                        value={priceRange}
                        onChange={(e) => setPriceRange(Number(e.target.value))}
                        className="w-full h-1.5 bg-brand-cream-dim rounded-lg appearance-none cursor-pointer accent-brand-olive"
                      />
                      <div className="flex justify-between text-[11px] text-brand-gray font-mono">
                        <span>Min: ₹500</span>
                        <span className="text-brand-olive font-bold">Max: ₹{priceRange.toLocaleString()}</span>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Size Collapsible */}
              <div className="border-t border-brand-cream-dim pt-4">
                <button
                  onClick={() => setIsSizeOpen(!isSizeOpen)}
                  className="w-full flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-brand-charcoal hover:text-brand-olive py-1"
                >
                  <span>Size & Options</span>
                  {isSizeOpen ? <Minus className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                </button>
                
                <AnimatePresence>
                  {isSizeOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden mt-3 pl-1 space-y-2"
                    >
                      {['Standard', 'Large', '150g', '250g', '500g', '1kg', 'Key C', 'Key G'].map((sz) => (
                        <label key={sz} className="flex items-center gap-2.5 text-xs text-brand-gray cursor-pointer hover:text-brand-charcoal">
                          <input
                            type="checkbox"
                            checked={checkedSizes.includes(sz)}
                            onChange={() => handleSizeCheckboxChange(sz)}
                            className="rounded border-brand-cream-dim text-brand-olive focus:ring-brand-olive accent-brand-olive w-3.5 h-3.5"
                          />
                          <span>{sz}</span>
                        </label>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* Product Grid & Controls */}
          <div className="lg:col-span-3 space-y-8" id="shop-products-column">
            {/* Header controls */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-brand-cream-dim pb-4">
              <span className="text-xs font-semibold text-brand-gray font-mono">
                {displayedCountText}
              </span>
              
              <div className="flex items-center gap-3">
                <span className="text-xs text-brand-gray font-medium">Sort by:</span>
                <div className="relative">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="appearance-none bg-white border border-brand-cream-dim rounded-full py-1.5 pl-4 pr-10 text-xs font-medium text-brand-charcoal focus:outline-none focus:ring-1 focus:ring-brand-olive focus:border-brand-olive cursor-pointer"
                  >
                    <option value="featured">Featured</option>
                    <option value="price-asc">Price: Low to High</option>
                    <option value="price-desc">Price: High to Low</option>
                    <option value="rating">Top Rated</option>
                  </select>
                  <ChevronDown className="w-3.5 h-3.5 text-brand-gray absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Empty view */}
            {paginatedProducts.length === 0 && (
              <div className="text-center py-20 bg-white/40 rounded-3xl border border-dashed border-brand-cream-dim">
                <SlidersHorizontal className="w-10 h-10 text-brand-gray/60 mx-auto mb-4 animate-bounce" />
                <p className="font-display font-bold text-lg text-brand-charcoal">No products match your filters</p>
                <p className="text-xs text-brand-gray mt-1">Try resetting some of your checkmarks or expanding your budget.</p>
                <button
                  onClick={() => {
                    setSelectedCategory('All Products');
                    setCheckedTypes([]);
                    setPriceRange(15000);
                    setCheckedSizes([]);
                    setSortBy('featured');
                  }}
                  className="mt-4 px-6 py-2 bg-brand-olive text-white rounded-full font-display text-xs font-bold uppercase tracking-wider shadow"
                >
                  Reset All Filters
                </button>
              </div>
            )}

            {/* Products Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {paginatedProducts.map((product) => {
                const isWishlisted = wishlist.includes(product.id);
                return (
                  <motion.div
                    key={product.id}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                    className="bg-white border border-brand-lime/10 rounded-2xl overflow-hidden shadow-xs hover:shadow-xl hover:scale-[1.01] transition-all flex flex-col group relative"
                  >
                    {/* Image Canvas */}
                    <div className="relative aspect-square overflow-hidden bg-brand-cream-dark">
                      <img
                        src={product.image}
                        alt={product.name}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity" />

                      {/* Wishlist Heart Icon */}
                      <button
                        onClick={() => onToggleWishlist(product.id)}
                        className="absolute top-3.5 right-3.5 p-2 bg-white/95 rounded-full shadow-md text-red-500 hover:scale-110 active:scale-95 transition-all z-10"
                        title={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
                      >
                        <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-red-500 text-red-500' : 'text-brand-gray'}`} />
                      </button>

                      {/* Floating badging */}
                      {product.bestSeller && (
                        <span className="absolute top-3.5 left-3.5 px-2.5 py-0.5 bg-brand-olive text-white text-[9px] font-mono uppercase tracking-widest font-bold rounded-full">
                          Best Seller
                        </span>
                      )}

                      {/* Hover eye icon quick view button overlay */}
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-10">
                        <button
                          onClick={() => onProductClick(product)}
                          className="px-4 py-2.5 bg-brand-charcoal/90 text-white rounded-full text-xs font-display font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-all hover:bg-brand-olive"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          Quick View
                        </button>
                      </div>
                    </div>

                    {/* Card Body */}
                    <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                      <div className="space-y-1">
                        <h4 
                          onClick={() => onProductClick(product)}
                          className="font-display font-extrabold text-sm text-brand-charcoal-light hover:text-brand-olive cursor-pointer transition-colors leading-tight"
                        >
                          {product.name}
                        </h4>
                        <p className="text-[11px] text-brand-gray line-clamp-2 leading-relaxed">
                          {product.description}
                        </p>
                      </div>

                      <div className="flex items-center justify-between pt-2">
                        <span className="font-display font-bold text-sm text-brand-olive">
                          ₹{product.price.toLocaleString('en-IN')}
                        </span>
                        
                        <div className="flex items-center gap-1">
                          <span className="text-[10px] font-bold text-amber-500 flex items-center gap-0.5">
                            <Star className="w-3 h-3 fill-amber-500" />
                            {product.rating}
                          </span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-1.5 pt-6" id="shop-pagination">
                <button
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                  className="p-2 border border-brand-cream-dim bg-white rounded-full text-brand-gray hover:text-brand-charcoal disabled:opacity-40 transition-colors"
                >
                  &lt;
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                  <button
                    key={pageNum}
                    onClick={() => setCurrentPage(pageNum)}
                    className={`w-9 h-9 rounded-full flex items-center justify-center font-display text-xs font-bold transition-all ${
                      currentPage === pageNum
                        ? 'bg-brand-olive text-white shadow-md'
                        : 'bg-white border border-brand-cream-dim text-brand-gray hover:border-brand-olive/50'
                    }`}
                  >
                    {pageNum}
                  </button>
                ))}
                <button
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                  className="p-2 border border-brand-cream-dim bg-white rounded-full text-brand-gray hover:text-brand-charcoal disabled:opacity-40 transition-colors"
                >
                  &gt;
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 4. Support Local Artisans Box */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10" id="artisans-highlight">
        <div className="bg-brand-lime/30 border border-brand-lime/25 rounded-3xl p-6 sm:p-10 md:p-12 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="space-y-6">
            <h2 className="font-display font-extrabold text-2xl sm:text-3xl md:text-4xl text-brand-charcoal-light tracking-tight leading-tight">
              Supporting Local Artisans
            </h2>
            <p className="text-sm text-brand-gray leading-relaxed">
              Every purchase directly supports the indigenous communities of Meghalaya. We partner with families who have passed down these crafting traditions for generations, ensuring fair trade and sustainable practices while preserving their rich cultural heritage.
            </p>
            <button className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-brand-olive hover:text-brand-charcoal transition-colors group">
              Learn more about our mission
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
            </button>
          </div>
          <div className="relative rounded-2xl overflow-hidden aspect-video md:aspect-square max-h-80 shadow-lg border border-white/60">
            <img
              src="https://images.unsplash.com/photo-1590736969955-71cb94801759?q=80&w=600"
              alt="Hands weaving a basket"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
