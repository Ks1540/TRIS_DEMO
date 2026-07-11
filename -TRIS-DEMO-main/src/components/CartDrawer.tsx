import { X, Trash2, Gift, ShieldAlert, ArrowRight, ShoppingBag } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onUpdateQuantity: (productId: string, quantity: number, size?: string) => void;
  onRemoveItem: (productId: string, size?: string) => void;
  onCheckout: () => void;
  giftWrapping: boolean;
  setGiftWrapping: (val: boolean) => void;
}

export default function CartDrawer({
  isOpen,
  onClose,
  cart,
  onUpdateQuantity,
  onRemoveItem,
  onCheckout,
  giftWrapping,
  setGiftWrapping
}: CartDrawerProps) {
  const subtotal = cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  const giftWrappingFee = giftWrapping ? 250 : 0;
  const shippingFee = subtotal > 5000 || subtotal === 0 ? 0 : 150;
  const grandTotal = subtotal + giftWrappingFee + shippingFee;

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-hidden" id="cart-drawer-container">
        {/* Backdrop filter */}
        <div className="absolute inset-0 bg-black/50 backdrop-blur-xs" onClick={onClose} />

        <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="w-screen max-w-md bg-brand-cream border-l border-brand-lime/30 shadow-2xl flex flex-col justify-between"
          >
            {/* Header */}
            <div className="p-6 border-b border-brand-cream-dim flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-brand-olive" />
                <h3 className="font-display font-extrabold text-lg text-brand-charcoal-light">Your Treasures</h3>
                <span className="px-2.5 py-0.5 bg-brand-lime text-brand-charcoal text-xs font-semibold rounded-full">
                  {cart.reduce((sum, item) => sum + item.quantity, 0)}
                </span>
              </div>
              <button
                onClick={onClose}
                className="p-2 text-brand-gray hover:text-brand-charcoal rounded-full hover:bg-brand-cream-dark transition-colors"
                id="close-cart-drawer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Cart Items List */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {cart.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-brand-lime/20 flex items-center justify-center text-brand-olive">
                    <ShoppingBag className="w-8 h-8" />
                  </div>
                  <div className="space-y-1">
                    <p className="font-display font-bold text-base text-brand-charcoal">Your cart is empty</p>
                    <p className="text-xs text-brand-gray">Explore local hand-curated craft treasures and fill it up!</p>
                  </div>
                  <button
                    onClick={onClose}
                    className="px-6 py-2.5 bg-brand-olive text-white rounded-full font-display text-xs font-bold uppercase tracking-wider shadow hover:bg-brand-charcoal transition-all"
                  >
                    Start Shopping
                  </button>
                </div>
              ) : (
                cart.map((item, index) => (
                  <div
                    key={`${item.product.id}-${item.selectedSize || index}`}
                    className="flex gap-4 p-4 bg-white border border-brand-lime/10 rounded-2xl shadow-xs hover:shadow-md transition-all relative"
                  >
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      referrerPolicy="no-referrer"
                      className="w-20 h-20 object-cover rounded-xl border border-brand-cream-dim"
                    />
                    <div className="flex-1 space-y-1.5">
                      <div className="flex justify-between items-start pr-6">
                        <h4 className="font-display font-bold text-sm text-brand-charcoal leading-snug">
                          {item.product.name}
                        </h4>
                      </div>

                      {item.selectedSize && (
                        <span className="inline-block text-[10px] font-mono font-semibold text-brand-olive bg-brand-lime/30 px-2 py-0.5 rounded-full">
                          Option: {item.selectedSize}
                        </span>
                      )}

                      <div className="flex justify-between items-center pt-1.5">
                        {/* Quantity Counter */}
                        <div className="flex items-center gap-2 bg-brand-cream border border-brand-cream-dim rounded-full p-1">
                          <button
                            onClick={() => onUpdateQuantity(item.product.id, Math.max(1, item.quantity - 1), item.selectedSize)}
                            className="w-6 h-6 flex items-center justify-center rounded-full bg-white hover:bg-brand-cream-dim transition-all text-xs font-bold text-brand-charcoal"
                          >
                            -
                          </button>
                          <span className="w-6 text-center text-xs font-bold font-display text-brand-charcoal">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1, item.selectedSize)}
                            className="w-6 h-6 flex items-center justify-center rounded-full bg-white hover:bg-brand-cream-dim transition-all text-xs font-bold text-brand-charcoal"
                          >
                            +
                          </button>
                        </div>

                        <span className="font-display font-bold text-sm text-brand-olive">
                          ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                        </span>
                      </div>
                    </div>

                    {/* Trash Button */}
                    <button
                      onClick={() => onRemoveItem(item.product.id, item.selectedSize)}
                      className="absolute top-4 right-4 p-1.5 text-brand-gray hover:text-red-500 rounded-full hover:bg-red-50 transition-colors"
                      title="Remove Item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))
              )}
            </div>

            {/* Summary Panel */}
            {cart.length > 0 && (
              <div className="p-6 bg-white border-t border-brand-cream-dim space-y-4">
                {/* Custom Gift Box Wrap */}
                <div className="p-4 bg-brand-cream border border-brand-lime/20 rounded-2xl flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-brand-lime/40 flex items-center justify-center text-brand-olive">
                      <Gift className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="block text-xs font-display font-bold text-brand-charcoal leading-snug">
                        Artisanal Gift Box Wrapping
                      </span>
                      <span className="block text-[10px] text-brand-gray">
                        Handmade box with fresh pine/fern scent (+₹250)
                      </span>
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    checked={giftWrapping}
                    onChange={(e) => setGiftWrapping(e.target.checked)}
                    className="w-4 h-4 text-brand-olive border-brand-cream-dim rounded focus:ring-brand-olive accent-brand-olive cursor-pointer"
                  />
                </div>

                {/* Costs breakdown */}
                <div className="space-y-2 text-sm text-brand-gray">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="font-display font-semibold text-brand-charcoal">
                      ₹{subtotal.toLocaleString('en-IN')}
                    </span>
                  </div>
                  {giftWrapping && (
                    <div className="flex justify-between text-xs">
                      <span>Gift Wrapping Box Fee</span>
                      <span className="font-display font-semibold text-brand-charcoal">+₹{giftWrappingFee}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    {shippingFee === 0 ? (
                      <span className="text-xs text-brand-jungle font-semibold font-mono uppercase tracking-wider bg-brand-jungle/10 px-2 py-0.5 rounded-full">
                        FREE Shipping
                      </span>
                    ) : (
                      <span className="font-display font-semibold text-brand-charcoal">₹{shippingFee}</span>
                    )}
                  </div>
                  {shippingFee > 0 && (
                    <div className="text-[10px] text-brand-olive flex items-center gap-1">
                      <ShieldAlert className="w-3 h-3" />
                      Add ₹{(5000 - subtotal).toLocaleString('en-IN')} more for free shipping!
                    </div>
                  )}

                  <div className="h-[1px] bg-brand-cream-dim my-2" />

                  <div className="flex justify-between text-base font-display font-bold text-brand-charcoal">
                    <span>Grand Total</span>
                    <span className="text-brand-olive">₹{grandTotal.toLocaleString('en-IN')}</span>
                  </div>
                </div>

                {/* Checkout CTA */}
                <button
                  onClick={onCheckout}
                  className="w-full flex items-center justify-center gap-2 py-3.5 bg-brand-olive hover:bg-brand-charcoal text-white rounded-full font-display font-bold text-sm uppercase tracking-wider transition-all shadow-md hover:scale-[1.01]"
                  id="checkout-drawer-button"
                >
                  Checkout Items
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </AnimatePresence>
  );
}
