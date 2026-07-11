import { Mail, Phone, Instagram, MessageCircle, Share2, Globe, ArrowUp } from 'lucide-react';

interface FooterProps {
  onPlanClick: () => void;
  onHomeClick: () => void;
  onShopClick: () => void;
}

export default function Footer({ onPlanClick, onHomeClick, onShopClick }: FooterProps) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-brand-cream-dark border-t border-brand-cream-dim pt-16 pb-8" id="shared-footer">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Column 1: Brand Info */}
          <div className="space-y-4" id="footer-brand-column">
            <div className="flex items-center gap-2 cursor-pointer" onClick={onHomeClick}>
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-brand-olive/20 text-brand-olive">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
                </svg>
              </div>
              <div>
                <span className="font-display font-bold text-xl text-brand-charcoal">TRIS</span>
                <span className="block text-[8px] font-mono tracking-widest text-brand-olive uppercase leading-none">Meghalaya</span>
              </div>
            </div>
            <p className="text-sm text-brand-gray leading-relaxed font-sans max-w-xs">
              Designing soulful, sustainable journeys and curated collections celebrating the indigenous master artisans of the Khasi and Jaintia Hills.
            </p>
            <div className="text-xs text-brand-olive font-mono uppercase tracking-wider font-semibold">
              Ethereal Highland Collection
            </div>
          </div>

          {/* Column 2: Contact Info */}
          <div className="space-y-4" id="footer-contact-column">
            <h4 className="font-display font-bold text-sm tracking-wide text-brand-charcoal uppercase">
              Contact
            </h4>
            <ul className="space-y-3 text-sm text-brand-gray">
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-brand-olive" />
                <a href="mailto:hello@trismeghalaya.com" className="hover:text-brand-charcoal transition-colors">
                  hello@trismeghalaya.com
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-brand-olive" />
                <a href="tel:+919876543210" className="hover:text-brand-charcoal transition-colors">
                  +91 98765 43210
                </a>
              </li>
            </ul>
            <div className="flex gap-3 pt-2">
              <a href="#" className="p-2 bg-brand-cream rounded-full text-brand-gray hover:text-brand-charcoal transition-all shadow-sm hover:scale-105" title="Instagram">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="https://wa.me/919876543210" target="_blank" rel="noreferrer" className="p-2 bg-brand-cream rounded-full text-brand-gray hover:text-brand-charcoal transition-all shadow-sm hover:scale-105" title="WhatsApp">
                <MessageCircle className="w-4 h-4" />
              </a>
              <button className="p-2 bg-brand-cream rounded-full text-brand-gray hover:text-brand-charcoal transition-all shadow-sm hover:scale-105" title="Share App" onClick={() => navigator.clipboard.writeText(window.location.href)}>
                <Share2 className="w-4 h-4" />
              </button>
              <a href="#" className="p-2 bg-brand-cream rounded-full text-brand-gray hover:text-brand-charcoal transition-all shadow-sm hover:scale-105" title="Global Site">
                <Globe className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 3: Quick Links */}
          <div className="space-y-4" id="footer-quicklinks-column">
            <h4 className="font-display font-bold text-sm tracking-wide text-brand-charcoal uppercase">
              Quick Links
            </h4>
            <ul className="space-y-2 text-sm text-brand-gray">
              <li>
                <button onClick={onHomeClick} className="hover:text-brand-charcoal transition-colors text-left">
                  About Us & Mission
                </button>
              </li>
              <li>
                <button onClick={onPlanClick} className="hover:text-brand-charcoal transition-colors text-left">
                  Destinations & Trails
                </button>
              </li>
              <li>
                <button onClick={onPlanClick} className="hover:text-brand-charcoal transition-colors text-left">
                  Experiential Packages
                </button>
              </li>
              <li>
                <button onClick={onShopClick} className="hover:text-brand-charcoal transition-colors text-left">
                  Boutique Craft Shop
                </button>
              </li>
              <li>
                <button onClick={onHomeClick} className="hover:text-brand-charcoal transition-colors text-left">
                  Artisan Co-Op FAQ
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Policies & Legal */}
          <div className="space-y-4" id="footer-policies-column">
            <h4 className="font-display font-bold text-sm tracking-wide text-brand-charcoal uppercase">
              Policies
            </h4>
            <ul className="space-y-2 text-sm text-brand-gray">
              <li>
                <a href="#" className="hover:text-brand-charcoal transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-brand-charcoal transition-colors">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-brand-charcoal transition-colors">
                  Shipping & Returns
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-brand-charcoal transition-colors">
                  Cancellation & Refund Policy
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-brand-cream-dim pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs text-brand-gray/80 text-center sm:text-left">
            © 2026 TRIS Meghalaya. All rights reserved. Celebrating pure craftsmanship and eco-tourism.
          </div>
          <button 
            onClick={scrollToTop}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-brand-cream border border-brand-cream-dim text-xs font-semibold text-brand-gray hover:text-brand-charcoal hover:border-brand-olive rounded-full transition-all"
            id="btn-scroll-top"
          >
            Back to Top
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
}
