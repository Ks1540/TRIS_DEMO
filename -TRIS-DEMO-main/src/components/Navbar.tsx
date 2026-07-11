import { Search, User, Heart, ShoppingCart, Calendar, Menu, X, Users } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useState, useEffect } from 'react';
import { CartItem } from '../types';

interface NavbarProps {
  activeTab: 'home' | 'about' | 'trips' | 'shop' | 'plan' | 'planner';
  setActiveTab: (tab: 'home' | 'about' | 'trips' | 'shop' | 'plan' | 'planner') => void;
  cart: CartItem[];
  setIsCartOpen: (open: boolean) => void;
  wishlistCount: number;
  isCollaborating?: boolean;
  onCollaborateClick?: () => void;
}

export default function Navbar({
  activeTab,
  setActiveTab,
  cart,
  setIsCartOpen,
  wishlistCount,
  isCollaborating = false,
  onCollaborateClick
}: NavbarProps) {
  const totalCartItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  // Monitor scroll height to transition header styles and toggle visibility
  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY;
      
      if (activeTab === 'home') {
        // Hide navbar on Home page until scrolled past 75% of the viewport height (approx. 500px+)
        const threshold = window.innerHeight * 0.75;
        if (scrollPos > threshold) {
          setIsVisible(true);
          setIsScrolled(true);
        } else {
          setIsVisible(false);
          setIsScrolled(false);
        }
      } else {
        // Always visible on other tabs, styled based on classic scroll offset
        setIsVisible(true);
        if (scrollPos > 40) {
          setIsScrolled(true);
        } else {
          setIsScrolled(false);
        }
      }
    };

    // Initialize state on mount/tab change
    handleScroll();

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [activeTab]);

  // Helper to scroll to specific section on the home page
  const handleScrollTo = (sectionId: string) => {
    setMobileMenuOpen(false);
    setActiveTab('home');
    setTimeout(() => {
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }, 150);
  };

  // Check if we are on the Home page or Plan page to apply transparent header
  const isTransparentTheme = activeTab === 'home' || activeTab === 'plan' || activeTab === 'planner';
  const useTransparent = isTransparentTheme && !isScrolled;

  return (
    <motion.nav 
      initial={{ y: -80, opacity: 0 }}
      animate={{ 
        y: isVisible ? 0 : -80, 
        opacity: isVisible ? 1 : 0 
      }}
      transition={{ type: "spring", stiffness: 120, damping: 20 }}
      style={{ pointerEvents: isVisible ? 'auto' : 'none' }}
      className={`top-0 left-0 right-0 z-50 w-full transition-all duration-300 ${
        useTransparent 
          ? 'absolute bg-transparent border-b border-white/10' 
          : 'sticky bg-[#09140e]/85 backdrop-blur-xl border-b border-white/10 shadow-xl'
      }`}
      id="nav-container"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo Brand precisely matching screenshot style */}
          <div 
            onClick={() => {
              setActiveTab('home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }} 
            className="flex items-center gap-2 cursor-pointer group"
            id="nav-logo-group"
          >
            <div className="relative flex items-center justify-center w-9 h-9 rounded-full transition-all bg-white/10 group-hover:bg-white/20 text-white">
              <svg 
                className="w-5 h-5" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2.5" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
              </svg>
            </div>
            <div>
              <span className="font-sans font-black text-xl tracking-tight text-white">
                TRIS
              </span>
              <span className="block text-[8px] font-mono tracking-widest uppercase leading-none text-brand-lime">
                Meghalaya
              </span>
            </div>
          </div>

          {/* Dynamic Navigation Links based on page mode */}
          <div className="hidden md:flex items-center space-x-8" id="nav-links">
            {/* About Link */}
            <button
              onClick={() => handleScrollTo('philosophy-section')}
              className="font-sans text-xs font-semibold tracking-wider uppercase transition-colors py-1 text-white/80 hover:text-brand-lime cursor-pointer"
            >
              About
            </button>



            {/* Gallery Link */}
            <button
              onClick={() => handleScrollTo('gallery-section')}
              className="font-sans text-xs font-semibold tracking-wider uppercase transition-colors py-1 text-white/80 hover:text-brand-lime cursor-pointer"
            >
              Gallery
            </button>

            {/* Testimonials Link */}
            <button
              onClick={() => handleScrollTo('testimonials-section')}
              className="font-sans text-xs font-semibold tracking-wider uppercase transition-colors py-1 text-white/80 hover:text-brand-lime cursor-pointer"
            >
              Testimonials
            </button>

            {/* FAQ Link */}
            <button
              onClick={() => handleScrollTo('faq-section')}
              className="font-sans text-xs font-semibold tracking-wider uppercase transition-colors py-1 text-white/80 hover:text-brand-lime cursor-pointer"
            >
              FAQ
            </button>

            {/* Collaborate Link */}
            <button
              onClick={onCollaborateClick}
              className="font-sans text-xs font-bold tracking-wider uppercase transition-all py-1.5 px-4 rounded-full cursor-pointer flex items-center gap-1.5 border bg-white/5 hover:bg-brand-lime hover:text-[#050e08] hover:border-brand-lime text-white border-white/10"
              id="btn-nav-collaborate"
            >
              <Users className="w-3.5 h-3.5 shrink-0 text-brand-lime group-hover:text-inherit" />
              <span>Collaborate</span>
            </button>
          </div>

          {/* Action Area (Right Side) */}
          <div className="flex items-center gap-2 sm:gap-4" id="nav-actions">
            
            {/* Show search & favorites icons only in Shop Tab for a cleaner landing page view */}
            {activeTab === 'shop' && (
              <>
                {/* Favorites/Wishlist */}
                <button 
                  onClick={() => {}}
                  className="p-2 text-brand-gray hover:text-brand-charcoal transition-colors rounded-full hover:bg-brand-cream-dark/50"
                  title="Wishlist"
                  id="btn-wishlist"
                >
                  <Heart className="w-5 h-5" />
                  {wishlistCount > 0 && (
                    <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-brand-olive text-[9px] font-bold text-white">
                      {wishlistCount}
                    </span>
                  )}
                </button>

                {/* Shopping Cart Button */}
                <button 
                  onClick={() => setIsCartOpen(true)}
                  className="relative p-2 text-brand-gray hover:text-brand-charcoal transition-colors rounded-full hover:bg-brand-cream-dark/50"
                  title="Open Shopping Cart"
                  id="btn-cart"
                >
                  <ShoppingCart className="w-5 h-5" />
                  {totalCartItems > 0 && (
                    <motion.span 
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-brand-olive text-[10px] font-bold text-white shadow"
                    >
                      {totalCartItems}
                    </motion.span>
                  )}
                </button>
              </>
            )}

            {/* Solid CTA Button */}
            {activeTab === 'plan' ? (
              // On Plan (Book Now) page, show simple back home button
              <button
                onClick={() => setActiveTab('home')}
                className={`px-5 py-2.5 font-sans font-bold text-xs uppercase tracking-wider rounded-full transition-all border cursor-pointer hidden sm:block ${
                  useTransparent
                    ? 'bg-white/10 hover:bg-white/20 text-white border-white/10'
                    : 'bg-brand-cream-dark hover:bg-brand-cream-dim text-brand-charcoal border-brand-cream-dim'
                }`}
                id="btn-nav-home"
              >
                Back Home
              </button>
            ) : (
              // For all other pages, show the green "Book Now" CTA precisely matching Home style
              <button
                onClick={() => setActiveTab('plan')}
                className="px-6 py-2.5 bg-[#155e37] hover:bg-[#0e4425] text-white font-sans font-bold text-xs uppercase tracking-widest rounded-full border border-white transition-all shadow-md hover:scale-102 active:scale-98 cursor-pointer hidden sm:block"
                id="btn-book-now"
              >
                Book Now
              </button>
            )}

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-full md:hidden transition-colors text-white hover:bg-white/10"
              id="btn-mobile-menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>
 
      {/* Mobile Menu Dropdown Panel */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-b border-white/10 bg-[#09140e]/95 backdrop-blur-2xl text-white"
          >
            <div className="px-4 pt-4 pb-6 space-y-3">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setActiveTab('home');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="block w-full text-left py-2 text-sm font-semibold tracking-wide text-white hover:text-brand-lime"
              >
                Home
              </button>
              <button
                onClick={() => handleScrollTo('philosophy-section')}
                className="block w-full text-left py-2 text-sm font-semibold tracking-wide text-white hover:text-brand-lime"
              >
                About
              </button>

              <button
                onClick={() => handleScrollTo('gallery-section')}
                className="block w-full text-left py-2 text-sm font-semibold tracking-wide text-white hover:text-brand-lime"
              >
                Gallery
              </button>
              <button
                onClick={() => handleScrollTo('testimonials-section')}
                className="block w-full text-left py-2 text-sm font-semibold tracking-wide text-white hover:text-brand-lime"
              >
                Testimonials
              </button>
              <button
                onClick={() => handleScrollTo('faq-section')}
                className="block w-full text-left py-2 text-sm font-semibold tracking-wide text-white hover:text-brand-lime"
              >
                FAQ
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  if (onCollaborateClick) onCollaborateClick();
                }}
                className="block w-full text-left py-2.5 px-3 rounded-lg text-sm font-bold tracking-wide flex items-center gap-2.5 transition-all text-white hover:text-brand-lime hover:bg-white/5"
              >
                <Users className="w-4 h-4 text-brand-lime" />
                <span>Collaborate (Tribal Co-Op)</span>
              </button>
              {activeTab !== 'plan' && (
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setActiveTab('plan');
                  }}
                  className="block w-full py-3 bg-[#155e37] text-white text-center rounded-full border border-white text-xs font-bold uppercase tracking-wider"
                >
                  Book Now
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
