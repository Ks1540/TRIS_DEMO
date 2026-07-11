import { useState, useEffect } from 'react';
import { X, Star, ShoppingBag, Heart, Shield, RotateCcw } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Product } from '../types';

interface ProductQuickViewProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, quantity: number, size?: string) => void;
  isWishlisted: boolean;
  onToggleWishlist: (productId: string) => void;
}

export default function ProductQuickView({
  product,
  onClose,
  onAddToCart,
  isWishlisted,
  onToggleWishlist
}: ProductQuickViewProps) {
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState('');

  useEffect(() => {
    if (product) {
      setQuantity(1);
      setSelectedSize(product.sizes && product.sizes.length > 0 ? product.sizes[0] : '');
    }
  }, [product]);

  if (!product) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md" id="quick-view-overlay">
        {/* Backdrop clickable */}
        <div className="absolute inset-0" onClick={onClose}></div>

        <motion.div
          initial={{ scale: 0.95, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 20 }}
          transition={{ type: "spring", duration: 0.5 }}
          className="relative w-full max-w-4xl bg-brand-cream border border-brand-lime/30 rounded-3xl overflow-hidden shadow-2xl z-10 grid grid-cols-1 md:grid-cols-2"
          id="quick-view-modal"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 p-2 text-brand-charcoal hover:text-brand-olive bg-white/80 backdrop-blur-sm rounded-full shadow-md transition-all"
            id="close-quickview"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Left Column: Premium Image with Badges */}
          <div className="relative h-64 md:h-full bg-brand-cream-dark">
            <img
              src={product.image}
              alt={product.name}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none" />
            
            {/* Wishlist floating toggle */}
            <button
              onClick={() => onToggleWishlist(product.id)}
              className="absolute bottom-4 left-4 p-3 bg-white/95 rounded-full shadow-lg text-red-500 hover:scale-110 active:scale-95 transition-all"
            >
              <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-red-500 text-red-500' : 'text-brand-gray'}`} />
            </button>

            {/* Badges */}
            <div className="absolute top-4 left-4 flex flex-col gap-2">
              {product.bestSeller && (
                <span className="px-3 py-1 bg-brand-olive text-white text-[10px] font-mono uppercase tracking-widest font-bold rounded-full shadow-sm">
                  Best Seller
                </span>
              )}
              {product.newArrival && (
                <span className="px-3 py-1 bg-brand-lime text-brand-charcoal text-[10px] font-mono uppercase tracking-widest font-bold rounded-full shadow-sm">
                  New Arrival
                </span>
              )}
            </div>
          </div>

          {/* Right Column: Premium Details and Controls */}
          <div className="p-6 md:p-10 flex flex-col justify-between overflow-y-auto max-h-[85vh] md:max-h-none">
            <div className="space-y-6">
              {/* Category & Rating */}
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono uppercase tracking-widest text-brand-olive font-bold">
                  {product.category}
                </span>
                <div className="flex items-center gap-1.5 px-2.5 py-1 bg-white/90 rounded-full border border-brand-lime/20 text-xs text-amber-500 font-semibold shadow-xs">
                  <Star className="w-3.5 h-3.5 fill-amber-500" />
                  {product.rating} / 5.0
                </div>
              </div>

              {/* Title & Price */}
              <div className="space-y-2">
                <h2 className="font-display font-extrabold text-2xl md:text-3xl text-brand-charcoal-light tracking-tight leading-tight">
                  {product.name}
                </h2>
                <div className="text-2xl font-display font-bold text-brand-olive">
                  ₹{product.price.toLocaleString('en-IN')}
                </div>
              </div>

              {/* Divider */}
              <div className="h-[1px] bg-brand-cream-dim" />

              {/* Description */}
              <p className="text-sm text-brand-gray leading-relaxed font-sans">
                {product.description}
              </p>

              {/* Size Selectors (if any) */}
              {product.sizes && product.sizes.length > 0 && (
                <div className="space-y-3">
                  <span className="block text-xs font-mono uppercase tracking-wider text-brand-charcoal font-bold">
                    Select Option / Size
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`px-4 py-2 text-xs font-semibold rounded-full border transition-all ${
                          selectedSize === size
                            ? 'bg-brand-olive border-brand-olive text-white shadow-sm'
                            : 'bg-white border-brand-cream-dim text-brand-gray hover:border-brand-olive/50'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity Selector */}
              <div className="space-y-3">
                <span className="block text-xs font-mono uppercase tracking-wider text-brand-charcoal font-bold">
                  Quantity
                </span>
                <div className="flex items-center gap-3 w-32 bg-white/80 border border-brand-cream-dim rounded-full p-1.5">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="flex items-center justify-center w-8 h-8 rounded-full bg-brand-cream hover:bg-brand-cream-dim transition-all text-brand-charcoal"
                  >
                    -
                  </button>
                  <span className="flex-1 text-center font-display font-bold text-sm text-brand-charcoal">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="flex items-center justify-center w-8 h-8 rounded-full bg-brand-cream hover:bg-brand-cream-dim transition-all text-brand-charcoal"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            {/* Action Buttons & Guarantees */}
            <div className="space-y-4 pt-8">
              <button
                onClick={() => {
                  onAddToCart(product, quantity, selectedSize);
                  onClose();
                }}
                className="w-full flex items-center justify-center gap-2 py-4 bg-brand-olive text-white hover:bg-brand-charcoal transition-all font-display font-bold text-sm uppercase tracking-wider rounded-full shadow-md hover:scale-[1.01] active:scale-[0.99]"
              >
                <ShoppingBag className="w-4 h-4" />
                Add to Cart • ₹{(product.price * quantity).toLocaleString('en-IN')}
              </button>

              {/* Trust badges */}
              <div className="grid grid-cols-2 gap-4 pt-2 text-[11px] text-brand-gray">
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-brand-jungle" />
                  <span>100% Authentic Handcraft</span>
                </div>
                <div className="flex items-center gap-2">
                  <RotateCcw className="w-4 h-4 text-brand-jungle" />
                  <span>7-Day Return Policy</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
