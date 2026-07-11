import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import ShopView from './components/ShopView';
import PlanTripView from './components/PlanTripView';
import PlannerView from './components/PlannerView';
import HomeView from './components/HomeView';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';
import ProductQuickView from './components/ProductQuickView';
import { Product, CartItem, Journey } from './types';
import { VEHICLES, EXPERIENCES } from './data';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  // Navigation active state
  const [activeTab, setActiveTab] = useState<'home' | 'about' | 'trips' | 'shop' | 'plan' | 'planner'>('home');
  const [isCollaborating, setIsCollaborating] = useState(false);
  
  // Shopping Cart & Wishlist states
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [giftWrapping, setGiftWrapping] = useState(false);

  // Active product details modal
  const [activeProduct, setActiveProduct] = useState<Product | null>(null);

  // Travel Journey State initialized to exactly match screenshot #2
  const [journey, setJourney] = useState<Journey>({
    startDate: '12 Oct',
    endDate: '18 Oct',
    days: 6,
    nights: 5,
    vehicle: VEHICLES[0], // Toyota Innova Crysta
    adults: 2,
    kids: 0,
    experience: EXPERIENCES[0], // Cultural Immersion & Hidden Waterfalls
    paymentMethod: 'card',
    step: 1
  });

  // Local Storage synchronizer
  useEffect(() => {
    const savedCart = localStorage.getItem('tris_cart');
    const savedWishlist = localStorage.getItem('tris_wishlist');
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (e) {
        console.error(e);
      }
    }
    if (savedWishlist) {
      try {
        setWishlist(JSON.parse(savedWishlist));
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  const saveCartToStorage = (newCart: CartItem[]) => {
    setCart(newCart);
    localStorage.setItem('tris_cart', JSON.stringify(newCart));
  };

  const saveWishlistToStorage = (newWishlist: string[]) => {
    setWishlist(newWishlist);
    localStorage.setItem('tris_wishlist', JSON.stringify(newWishlist));
  };

  // Add to Cart
  const handleAddToCart = (product: Product, quantity: number, size?: string) => {
    const existingIndex = cart.findIndex(
      (item) => item.product.id === product.id && item.selectedSize === size
    );

    let newCart = [...cart];
    if (existingIndex > -1) {
      newCart[existingIndex].quantity += quantity;
    } else {
      newCart.push({ product, quantity, selectedSize: size });
    }
    saveCartToStorage(newCart);
    setIsCartOpen(true); // Open the side drawer on add
  };

  // Update Cart Quantity
  const handleUpdateQuantity = (productId: string, quantity: number, size?: string) => {
    const newCart = cart.map((item) => {
      if (item.product.id === productId && item.selectedSize === size) {
        return { ...item, quantity };
      }
      return item;
    });
    saveCartToStorage(newCart);
  };

  // Remove from Cart
  const handleRemoveItem = (productId: string, size?: string) => {
    const newCart = cart.filter(
      (item) => !(item.product.id === productId && item.selectedSize === size)
    );
    saveCartToStorage(newCart);
  };

  // Toggle Wishlist
  const handleToggleWishlist = (productId: string) => {
    let newWishlist = [...wishlist];
    if (newWishlist.includes(productId)) {
      newWishlist = newWishlist.filter((id) => id !== productId);
    } else {
      newWishlist.push(productId);
    }
    saveWishlistToStorage(newWishlist);
  };

  // Clear cart upon Checkout items success
  const handleCartCheckout = () => {
    alert("Thank you for supporting our artisans! Your premium craft treasures are booked for courier delivery.");
    saveCartToStorage([]);
    setIsCartOpen(false);
  };

  // Custom alert on final trip payment completion
  const handleConfirmBooking = () => {
    // PlanTripView handles success view, no alert needed.
  };

  return (
    <div className="flex flex-col min-h-screen bg-brand-cream relative selection:bg-brand-lime selection:text-brand-charcoal" id="tris-meghalaya-app">
      
      {/* Premium Navigation Header */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={(tab) => {
          setActiveTab(tab);
          if (tab !== 'planner') {
            setIsCollaborating(false);
          }
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        cart={cart}
        setIsCartOpen={setIsCartOpen}
        wishlistCount={wishlist.length}
        isCollaborating={isCollaborating}
        onCollaborateClick={() => {
          setActiveTab('home');
          setTimeout(() => {
            const el = document.getElementById('collaborate-section');
            if (el) {
              el.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
          }, 150);
        }}
      />

      {/* Main Switchboard for Interactive Views */}
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4 }}
          >
            {activeTab === 'home' && (
              <HomeView 
                onShopClick={() => setActiveTab('shop')} 
                onPlanClick={() => {
                  setActiveTab('planner');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }} 
              />
            )}
            
            {activeTab === 'about' && (
              <HomeView 
                onShopClick={() => setActiveTab('shop')} 
                onPlanClick={() => {
                  setActiveTab('planner');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }} 
              />
            )}

            {activeTab === 'trips' && (
              <HomeView 
                onShopClick={() => setActiveTab('shop')} 
                onPlanClick={() => {
                  setActiveTab('planner');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }} 
              />
            )}

            {activeTab === 'shop' && (
              <ShopView
                onProductClick={setActiveProduct}
                onAddToCart={handleAddToCart}
                wishlist={wishlist}
                onToggleWishlist={handleToggleWishlist}
              />
            )}

            {activeTab === 'plan' && (
              <PlanTripView
                journey={journey}
                setJourney={setJourney}
                onConfirmBooking={handleConfirmBooking}
              />
            )}

            {activeTab === 'planner' && (
              <PlannerView 
                isCollaborating={isCollaborating}
                setIsCollaborating={setIsCollaborating}
                onBackToHome={() => {
                  setActiveTab('home');
                  setIsCollaborating(false);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                onBookNowClick={() => {
                  setActiveTab('plan');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Shared Boutique Footer */}
      <Footer 
        onHomeClick={() => {
          setActiveTab('home');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onShopClick={() => {
          setActiveTab('shop');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onPlanClick={() => {
          setActiveTab('planner');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      {/* Slide-out Shopping Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onCheckout={handleCartCheckout}
        giftWrapping={giftWrapping}
        setGiftWrapping={setGiftWrapping}
      />

      {/* Product Details Modal Dialog */}
      <ProductQuickView
        product={activeProduct}
        onClose={() => setActiveProduct(null)}
        onAddToCart={handleAddToCart}
        isWishlisted={activeProduct ? wishlist.includes(activeProduct.id) : false}
        onToggleWishlist={handleToggleWishlist}
      />
    </div>
  );
}
