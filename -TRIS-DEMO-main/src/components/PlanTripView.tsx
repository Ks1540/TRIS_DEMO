import { useState } from 'react';
import { Calendar, Car, Users, Compass, Info, ShieldCheck, Edit, Check, CreditCard, Wallet, Landmark, Banknote, CheckCircle, ArrowRight, ArrowLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Journey } from '../types';
import { VEHICLES, EXPERIENCES } from '../data';

interface PlanTripViewProps {
  journey: Journey;
  setJourney: (journey: Journey) => void;
  onConfirmBooking: () => void;
}

export default function PlanTripView({
  journey,
  setJourney,
  onConfirmBooking
}: PlanTripViewProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [tempJourney, setTempJourney] = useState<Journey>({ ...journey });
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [loading, setLoading] = useState(false);

  // Calculate pricing based on current journey selections
  const baseFair = journey.vehicle.basePrice;
  const experienceFees = journey.experience.fee;
  const totalAmount = baseFair + experienceFees;

  // Handle saving the inline edits on Step 4
  const handleSaveEdits = () => {
    setJourney({ ...tempJourney });
    setIsEditing(false);
  };

  // Trigger payment final confirmation
  const handlePaymentSubmit = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setIsConfirmed(true);
      onConfirmBooking();
    }, 1800);
  };

  // Render Step 1: Vehicle & Dates (Exactly matching screenshot #2)
  if (journey.step === 1) {
    return (
      <div 
        className="relative min-h-screen bg-cover bg-center flex flex-col justify-between pt-28 pb-16 px-4 sm:px-6 lg:px-8 text-white overflow-hidden" 
        id="plan-trip-step1-root"
        style={{ 
          backgroundImage: "url('https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=1600')",
          backgroundAttachment: 'fixed'
        }}
      >
        {/* Dark dimming ambient overlay for high readability */}
        <div className="absolute inset-0 bg-black/40 z-0 pointer-events-none" />

        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10 my-auto">
          {/* Left Column: Title & Steps */}
          <div className="lg:col-span-5 text-white space-y-8 pr-4">
            <div>
              <motion.h1 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                className="font-display font-extrabold text-5xl md:text-6xl tracking-tight leading-none"
              >
                Craft My <br />
                <span className="text-[#d0eb8d]">Journey.</span>
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="mt-4 text-white/95 text-sm sm:text-base leading-relaxed font-sans max-w-md font-medium"
              >
                Let us design your perfect getaway to the clouds. Tell us your story, and we'll weave the path.
              </motion.p>
            </div>
            
            {/* Steps Timeline Stack */}
            <div className="space-y-5">
              {[
                { n: 1, text: "Tell us your dates & travel style.", active: true },
                { n: 2, text: "We design the perfect itinerary.", active: false },
                { n: 3, text: "Pack your bags for Meghalaya.", active: false }
              ].map((s) => (
                <div key={s.n} className="flex items-center gap-4">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold font-display text-sm shrink-0 transition-colors ${
                    s.active 
                      ? 'bg-[#d0eb8d] text-[#2a301d]' 
                      : 'bg-white/20 text-white/80 border border-white/10'
                  }`}>
                    {s.n}
                  </div>
                  <span className={`font-sans text-sm font-semibold transition-colors ${
                    s.active ? 'text-white' : 'text-white/60'
                  }`}>
                    {s.text}
                  </span>
                </div>
              ))}
            </div>

            <div>
              <button className="px-6 py-3.5 bg-white/15 backdrop-blur-md border border-white/15 text-white hover:bg-white/25 rounded-full font-display text-xs font-bold uppercase tracking-widest transition-colors cursor-pointer">
                More Info
              </button>
            </div>
          </div>

          {/* Right Column: Floating Step Card */}
          <div className="lg:col-span-7">
            <motion.div 
              initial={{ opacity: 0, x: 25 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white/85 backdrop-blur-2xl border border-white/20 rounded-[2rem] p-6 sm:p-10 shadow-2xl space-y-6 text-brand-charcoal max-w-xl lg:ml-auto"
            >
              <div className="flex justify-between items-center pb-3 border-b border-brand-charcoal/10">
                <span className="text-[10px] font-mono font-bold tracking-widest text-brand-gray uppercase">
                  STEP 1: VEHICLE & DATES
                </span>
                <span className="text-[10px] font-mono font-bold text-brand-olive uppercase tracking-wider">
                  25% Complete
                </span>
              </div>

              {/* Date Pickers */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-brand-charcoal block">Arrival Date *</label>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="dd-mm-yyyy"
                      value={journey.startDate}
                      onChange={(e) => setJourney({ ...journey, startDate: e.target.value })}
                      className="w-full bg-white/60 border border-brand-cream-dim rounded-xl px-4 py-3 text-xs sm:text-sm font-semibold text-brand-charcoal focus:outline-none focus:border-brand-olive focus:bg-white/90 transition-colors"
                    />
                    <Calendar className="w-4 h-4 text-brand-gray absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                  <span className="text-[10px] text-brand-gray/90 leading-none block font-medium">Please book at least 5 days in advance.</span>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-brand-charcoal block">Departure Date *</label>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="dd-mm-yyyy"
                      value={journey.endDate}
                      onChange={(e) => setJourney({ ...journey, endDate: e.target.value })}
                      className="w-full bg-white/60 border border-brand-cream-dim rounded-xl px-4 py-3 text-xs sm:text-sm font-semibold text-brand-charcoal focus:outline-none focus:border-brand-olive focus:bg-white/90 transition-colors"
                    />
                    <Calendar className="w-4 h-4 text-brand-gray absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                </div>
              </div>

              {/* Vehicle & Travelers */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-brand-charcoal block">Preferred Vehicle *</label>
                  <div className="relative">
                    <select
                      value={journey.vehicle.name}
                      onChange={(e) => {
                        const v = VEHICLES.find(vehicle => vehicle.name === e.target.value) || VEHICLES[0];
                        setJourney({ ...journey, vehicle: v });
                      }}
                      className="w-full bg-white/60 border border-brand-cream-dim rounded-xl px-4 py-3 text-xs sm:text-sm font-semibold text-brand-charcoal focus:outline-none focus:border-brand-olive focus:bg-white/90 transition-colors appearance-none cursor-pointer"
                    >
                      {VEHICLES.map(vehicle => (
                        <option key={vehicle.name} value={vehicle.name}>
                          {vehicle.name} ({vehicle.model})
                        </option>
                      ))}
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-brand-gray">
                      <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                      </svg>
                    </div>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-brand-charcoal block">Number of Travelers *</label>
                  <div className="relative">
                    <select
                      value={journey.adults}
                      onChange={(e) => setJourney({ ...journey, adults: Number(e.target.value) })}
                      className="w-full bg-white/60 border border-brand-cream-dim rounded-xl px-4 py-3 text-xs sm:text-sm font-semibold text-brand-charcoal focus:outline-none focus:border-brand-olive focus:bg-white/90 transition-colors appearance-none cursor-pointer"
                    >
                      {[1, 2, 3, 4, 5, 6, 7, 8].map(n => (
                        <option key={n} value={n}>{n} Guest{n > 1 ? 's' : ''}</option>
                      ))}
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-brand-gray">
                      <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Navigation Row */}
              <div className="flex items-center justify-between pt-5 border-t border-brand-charcoal/10">
                <div>
                  <span className="block text-[10px] text-brand-gray font-semibold uppercase tracking-wider">Estimated Start</span>
                  <span className="font-display font-extrabold text-lg sm:text-xl text-brand-olive">
                    ₹ {journey.vehicle.basePrice.toLocaleString('en-IN')}
                  </span>
                </div>

                <button
                  onClick={() => setJourney({ ...journey, step: 2 })}
                  className="px-6 py-3.5 bg-[#d0eb8d] hover:bg-[#bce067] text-[#2a301d] rounded-full font-display font-bold text-xs uppercase tracking-widest transition-all flex items-center gap-2 cursor-pointer shadow-sm hover:shadow-md hover:scale-[1.02]"
                >
                  Next Step
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    );
  }

  // Render Step 2: Choose Experience
  if (journey.step === 2) {
    return (
      <div 
        className="relative min-h-screen bg-cover bg-center flex flex-col justify-between pt-28 pb-16 px-4 sm:px-6 lg:px-8 text-white overflow-hidden" 
        id="plan-trip-step2-root"
        style={{ 
          backgroundImage: "url('https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=1600')",
          backgroundAttachment: 'fixed'
        }}
      >
        <div className="absolute inset-0 bg-black/45 z-0 pointer-events-none" />

        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10 my-auto">
          {/* Left Column: Title & Timeline */}
          <div className="lg:col-span-5 text-white space-y-8 pr-4">
            <div>
              <h1 className="font-display font-extrabold text-5xl md:text-6xl tracking-tight leading-none">
                Select Your <br />
                <span className="text-[#d0eb8d]">Experience.</span>
              </h1>
              <p className="mt-4 text-white/95 text-sm sm:text-base leading-relaxed font-sans max-w-md font-medium">
                Choose a curated, community-guided trail to experience the genuine heart and soul of Meghalaya.
              </p>
            </div>
            
            <div className="space-y-5">
              {[
                { n: 1, text: "Tell us your dates & travel style.", completed: true },
                { n: 2, text: "We design the perfect itinerary.", active: true },
                { n: 3, text: "Pack your bags for Meghalaya.", active: false }
              ].map((s) => (
                <div key={s.n} className="flex items-center gap-4">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold font-display text-sm shrink-0 transition-colors ${
                    s.completed 
                      ? 'bg-brand-olive text-white' 
                      : s.active
                        ? 'bg-[#d0eb8d] text-[#2a301d]'
                        : 'bg-white/20 text-white/80 border border-white/10'
                  }`}>
                    {s.completed ? <Check className="w-4 h-4 text-white" /> : s.n}
                  </div>
                  <span className={`font-sans text-sm font-semibold transition-colors ${
                    s.active || s.completed ? 'text-white' : 'text-white/60'
                  }`}>
                    {s.text}
                  </span>
                </div>
              ))}
            </div>

            <div>
              <button 
                onClick={() => setJourney({ ...journey, step: 1 })}
                className="px-6 py-3.5 bg-white/10 border border-white/20 text-white hover:bg-white/20 rounded-full font-display text-xs font-bold uppercase tracking-widest transition-colors flex items-center gap-2 cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Dates
              </button>
            </div>
          </div>

          {/* Right Column: Experience Options Card */}
          <div className="lg:col-span-7">
            <motion.div 
              initial={{ opacity: 0, x: 25 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white/85 backdrop-blur-2xl border border-white/20 rounded-[2rem] p-6 sm:p-10 shadow-2xl space-y-6 text-brand-charcoal max-w-xl lg:ml-auto"
            >
              <div className="flex justify-between items-center pb-3 border-b border-brand-charcoal/10">
                <span className="text-[10px] font-mono font-bold tracking-widest text-brand-gray uppercase">
                  STEP 2: EXPERIENCE TRACK
                </span>
                <span className="text-[10px] font-mono font-bold text-brand-olive uppercase tracking-wider">
                  50% Complete
                </span>
              </div>

              {/* Experiences Selection list */}
              <div className="space-y-3.5" id="experience-selection-list">
                {EXPERIENCES.map((exp) => {
                  const isSelected = journey.experience.name === exp.name;
                  return (
                    <div
                      key={exp.name}
                      onClick={() => setJourney({ ...journey, experience: exp })}
                      className={`p-4 rounded-2xl border-2 text-left cursor-pointer transition-all flex items-start gap-3.5 select-none ${
                        isSelected
                          ? 'border-brand-olive bg-[#f4f7ed]/90 shadow-sm'
                          : 'border-brand-cream-dim bg-white/70 hover:bg-white/90 hover:border-brand-olive/45'
                      }`}
                    >
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 mt-0.5 ${
                        isSelected ? 'border-brand-olive bg-brand-olive text-white' : 'border-brand-cream-dim'
                      }`}>
                        {isSelected && <Check className="w-3 h-3 stroke-[3px]" />}
                      </div>
                      <div className="space-y-1">
                        <span className="block font-display font-extrabold text-sm text-brand-charcoal leading-tight">
                          {exp.name}
                        </span>
                        <p className="text-xs text-brand-gray font-medium leading-normal">
                          {exp.description}
                        </p>
                        <span className="block text-xs font-bold text-brand-olive font-display mt-1">
                          + ₹{exp.fee.toLocaleString('en-IN')} package fee
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Bottom Navigation Row */}
              <div className="flex items-center justify-between pt-5 border-t border-brand-charcoal/10">
                <div>
                  <span className="block text-[10px] text-brand-gray font-semibold uppercase tracking-wider">Estimated Total</span>
                  <span className="font-display font-extrabold text-lg sm:text-xl text-brand-olive">
                    ₹ {(journey.vehicle.basePrice + journey.experience.fee).toLocaleString('en-IN')}
                  </span>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => setJourney({ ...journey, step: 1 })}
                    className="px-4 py-3.5 border-2 border-brand-cream-dim hover:border-brand-olive/50 text-brand-gray rounded-full font-display font-bold text-xs uppercase tracking-widest transition-all cursor-pointer"
                  >
                    Back
                  </button>
                  <button
                    onClick={() => setJourney({ ...journey, step: 3 })}
                    className="px-6 py-3.5 bg-[#d0eb8d] hover:bg-[#bce067] text-[#2a301d] rounded-full font-display font-bold text-xs uppercase tracking-widest transition-all flex items-center gap-2 cursor-pointer shadow-sm hover:shadow-md hover:scale-[1.02]"
                  >
                    Next Step
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    );
  }

  // Render Step 3: Guests Count and Customization
  if (journey.step === 3) {
    return (
      <div 
        className="relative min-h-screen bg-cover bg-center flex flex-col justify-between pt-28 pb-16 px-4 sm:px-6 lg:px-8 text-white overflow-hidden" 
        id="plan-trip-step3-root"
        style={{ 
          backgroundImage: "url('https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=1600')",
          backgroundAttachment: 'fixed'
        }}
      >
        <div className="absolute inset-0 bg-black/45 z-0 pointer-events-none" />

        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10 my-auto">
          {/* Left Column: Title & Timeline */}
          <div className="lg:col-span-5 text-white space-y-8 pr-4">
            <div>
              <h1 className="font-display font-extrabold text-5xl md:text-6xl tracking-tight leading-none">
                Who Is <br />
                <span className="text-[#d0eb8d]">Traveling?</span>
              </h1>
              <p className="mt-4 text-white/95 text-sm sm:text-base leading-relaxed font-sans max-w-md font-medium">
                Provide guest details so we can arrange secure local entry permits, tribal homestay approvals, and private transport amenities.
              </p>
            </div>
            
            <div className="space-y-5">
              {[
                { n: 1, text: "Tell us your dates & travel style.", completed: true },
                { n: 2, text: "We design the perfect itinerary.", completed: true },
                { n: 3, text: "Pack your bags for Meghalaya.", active: true }
              ].map((s) => (
                <div key={s.n} className="flex items-center gap-4">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold font-display text-sm shrink-0 transition-colors ${
                    s.completed 
                      ? 'bg-brand-olive text-white' 
                      : 'bg-[#d0eb8d] text-[#2a301d]'
                  }`}>
                    {s.completed ? <Check className="w-4 h-4 text-white" /> : s.n}
                  </div>
                  <span className={`font-sans text-sm font-semibold transition-colors ${
                    s.active || s.completed ? 'text-white' : 'text-white/60'
                  }`}>
                    {s.text}
                  </span>
                </div>
              ))}
            </div>

            <div>
              <button 
                onClick={() => setJourney({ ...journey, step: 2 })}
                className="px-6 py-3.5 bg-white/10 border border-white/20 text-white hover:bg-white/20 rounded-full font-display text-xs font-bold uppercase tracking-widest transition-colors flex items-center gap-2 cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Experience
              </button>
            </div>
          </div>

          {/* Right Column: Custom Guest Details form */}
          <div className="lg:col-span-7">
            <motion.div 
              initial={{ opacity: 0, x: 25 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white/85 backdrop-blur-2xl border border-white/20 rounded-[2rem] p-6 sm:p-10 shadow-2xl space-y-6 text-brand-charcoal max-w-xl lg:ml-auto"
            >
              <div className="flex justify-between items-center pb-3 border-b border-brand-charcoal/10">
                <span className="text-[10px] font-mono font-bold tracking-widest text-brand-gray uppercase">
                  STEP 3: GUEST CONFIGURATION
                </span>
                <span className="text-[10px] font-mono font-bold text-brand-olive uppercase tracking-wider">
                  75% Complete
                </span>
              </div>

              {/* Adults & Kids pickers */}
              <div className="grid grid-cols-2 gap-5">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-brand-charcoal block">Adults (12+ Years) *</label>
                  <select
                    value={journey.adults}
                    onChange={(e) => setJourney({ ...journey, adults: Number(e.target.value) })}
                    className="w-full bg-white/60 border border-brand-cream-dim rounded-xl px-4 py-3 text-xs sm:text-sm font-semibold text-brand-charcoal focus:outline-none focus:border-brand-olive focus:bg-white/90"
                  >
                    {[1, 2, 3, 4, 5, 6].map(n => (
                      <option key={n} value={n}>{n} Adult{n > 1 ? 's' : ''}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-brand-charcoal block">Children (2-11 Years)</label>
                  <select
                    value={journey.kids}
                    onChange={(e) => setJourney({ ...journey, kids: Number(e.target.value) })}
                    className="w-full bg-white/60 border border-brand-cream-dim rounded-xl px-4 py-3 text-xs sm:text-sm font-semibold text-brand-charcoal focus:outline-none focus:border-brand-olive focus:bg-white/90"
                  >
                    {[0, 1, 2, 3, 4].map(n => (
                      <option key={n} value={n}>{n} Kid{n > 1 ? 's' : n === 0 ? 's (None)' : ''}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Optional Contact email or note input */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-brand-charcoal block">Primary Traveler Name *</label>
                <input
                  type="text"
                  placeholder="E.g. Priyesh Sharma"
                  defaultValue="Priyesh Sharma"
                  className="w-full bg-white/60 border border-brand-cream-dim rounded-xl px-4 py-3 text-xs sm:text-sm font-semibold text-brand-charcoal focus:outline-none focus:border-brand-olive focus:bg-white/90"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-brand-charcoal block">Dietary & Custom Requests (Optional)</label>
                <textarea
                  rows={2}
                  placeholder="Specify any food allergies, senior citizen accessibility needs, or bedding preferences..."
                  className="w-full bg-white/60 border border-brand-cream-dim rounded-xl px-4 py-3 text-xs sm:text-sm font-semibold text-brand-charcoal focus:outline-none focus:border-brand-olive focus:bg-white/90 resize-none"
                />
              </div>

              {/* Bottom Navigation Row */}
              <div className="flex items-center justify-between pt-5 border-t border-brand-charcoal/10">
                <div>
                  <span className="block text-[10px] text-brand-gray font-semibold uppercase tracking-wider">Estimated Total</span>
                  <span className="font-display font-extrabold text-lg sm:text-xl text-brand-olive">
                    ₹ {totalAmount.toLocaleString('en-IN')}
                  </span>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => setJourney({ ...journey, step: 2 })}
                    className="px-4 py-3.5 border-2 border-brand-cream-dim hover:border-brand-olive/50 text-brand-gray rounded-full font-display font-bold text-xs uppercase tracking-widest transition-all cursor-pointer"
                  >
                    Back
                  </button>
                  <button
                    onClick={() => setJourney({ ...journey, step: 4 })}
                    className="px-6 py-3.5 bg-[#d0eb8d] hover:bg-[#bce067] text-[#2a301d] rounded-full font-display font-bold text-xs uppercase tracking-widest transition-all flex items-center gap-2 cursor-pointer shadow-sm hover:shadow-md hover:scale-[1.02]"
                  >
                    Review Details
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    );
  }

  // Render Step 4: Final Payment (Perfect replica of screenshot #1)
  return (
    <div className="bg-brand-cream min-h-screen pb-24 text-brand-charcoal font-sans" id="plan-trip-view-root">
      
      {/* Framed top banner matching screenshot #1 */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="relative h-64 sm:h-72 md:h-80 rounded-[2.5rem] overflow-hidden shadow-xs" id="plan-hero">
          <img
            src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=1200"
            alt="Scenic Meghalaya Highlands"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Step Progress Tracker Timeline - matching screenshot #1 */}
        <div className="py-10 max-w-4xl mx-auto" id="step-timeline">
          <div className="flex flex-row items-center justify-between gap-2 md:gap-4 overflow-x-auto py-2 no-scrollbar">
            {[
              { id: 1, label: 'Vehicle & Dates', completed: true },
              { id: 2, label: 'Experience', completed: true },
              { id: 3, label: 'Guests', completed: true },
              { id: 4, label: 'Payment', completed: false, active: true }
            ].map((step, idx) => (
              <div key={step.id} className="flex items-center flex-1 last:flex-none shrink-0">
                <div className="flex items-center gap-2.5">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center font-display text-[10px] font-bold shrink-0 ${
                    step.completed 
                      ? 'bg-brand-olive text-white'
                      : 'border-2 border-brand-olive text-brand-charcoal bg-transparent'
                  }`}>
                    {step.completed ? <Check className="w-3.5 h-3.5 stroke-[3px]" /> : step.id}
                  </div>
                  <span className={`text-xs font-semibold font-sans whitespace-nowrap ${
                    step.active || step.completed ? 'text-brand-charcoal font-bold' : 'text-brand-gray'
                  }`}>
                    {step.label}
                  </span>
                </div>
                {idx < 3 && (
                  <div className="hidden sm:block flex-1 h-[1px] bg-brand-cream-dim mx-4 min-w-[2rem]" />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Dynamic Multi-Step Checkout States */}
        <AnimatePresence mode="wait">
          {isConfirmed ? (
            /* booking confirmed state styled exquisitely */
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              className="bg-white border border-brand-cream-dim rounded-[2.5rem] p-6 sm:p-12 shadow-xl max-w-2xl mx-auto text-center space-y-6"
              id="success-receipt"
            >
              <div className="w-20 h-20 bg-[#f4f7ed] border border-brand-olive/30 rounded-full flex items-center justify-center text-brand-olive mx-auto shadow-xs">
                <Check className="w-10 h-10 stroke-[3px]" />
              </div>
              <div className="space-y-2">
                <h2 className="font-display font-extrabold text-3xl text-brand-charcoal tracking-tight">Your Journey is Confirmed!</h2>
                <p className="text-sm text-brand-gray leading-relaxed max-w-md mx-auto font-sans font-medium">
                  We've secured your custom highland itinerary. A detailed PDF summary, private driver contact, and tribal permits have been dispatched to your email.
                </p>
              </div>

              {/* Receipt Grid */}
              <div className="p-6 sm:p-8 bg-brand-cream border border-brand-cream-dim rounded-[2rem] text-left space-y-4 font-sans shadow-xs">
                <div className="flex justify-between items-center text-xs font-mono text-brand-gray font-semibold">
                  <span>TRANSACTION ID:</span>
                  <span className="font-bold text-brand-charcoal">TRIS-MEG-289410</span>
                </div>
                <div className="h-[1px] bg-brand-cream-dim" />
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-brand-gray font-medium">Travel Dates:</span>
                    <span className="font-bold text-brand-charcoal">{journey.startDate} - {journey.endDate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-brand-gray font-medium">Highland Ride:</span>
                    <span className="font-bold text-brand-charcoal">{journey.vehicle.name} ({journey.vehicle.model})</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-brand-gray font-medium">Experience Package:</span>
                    <span className="font-bold text-brand-charcoal max-w-xs text-right leading-tight block">{journey.experience.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-brand-gray font-medium">Guests Count:</span>
                    <span className="font-bold text-brand-charcoal">{journey.adults} Adults {journey.kids > 0 ? `, ${journey.kids} Children` : ''}</span>
                  </div>
                </div>
                <div className="h-[1px] bg-brand-cream-dim" />
                <div className="flex justify-between text-base font-display font-extrabold text-brand-charcoal">
                  <span>Total Paid ({journey.paymentMethod.toUpperCase()}):</span>
                  <span className="text-brand-olive text-lg">₹{totalAmount.toLocaleString('en-IN')}</span>
                </div>
              </div>

              <div className="pt-4 flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => {
                    setIsConfirmed(false);
                    setJourney({ ...journey, step: 1 });
                  }}
                  className="flex-1 py-4 border border-brand-cream-dim hover:border-brand-olive text-brand-gray hover:text-brand-charcoal rounded-full font-display text-xs font-bold uppercase tracking-wider transition-all cursor-pointer"
                >
                  Create Another Journey
                </button>
                <button
                  onClick={() => window.print()}
                  className="flex-1 py-4 bg-brand-olive text-white rounded-full font-display text-xs font-bold uppercase tracking-wider shadow-sm hover:bg-brand-charcoal transition-all cursor-pointer"
                >
                  Print Invoice Receipt
                </button>
              </div>
            </motion.div>
          ) : (
            /* Review & Payment Layout Grid matching screenshot #1 */
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start" id="payment-layout">
              
              {/* Left Panel: Journey Summary */}
              <div className="lg:col-span-2 space-y-6">
                <div className="bg-white border border-brand-cream-dim/60 rounded-[2.5rem] p-6 sm:p-10 shadow-xs space-y-8">
                  
                  {/* Summary Title and Edit Button */}
                  <div className="flex items-center justify-between">
                    <h2 className="font-display font-extrabold text-2xl text-brand-charcoal">
                      Journey Summary
                    </h2>
                    
                    {!isEditing ? (
                      <button
                        onClick={() => {
                          setTempJourney({ ...journey });
                          setIsEditing(true);
                        }}
                        className="flex items-center gap-1.5 text-xs font-bold text-brand-gray hover:text-brand-charcoal transition-colors cursor-pointer"
                      >
                        <Edit className="w-3.5 h-3.5" />
                        Edit
                      </button>
                    ) : (
                      <div className="flex gap-2">
                        <button
                          onClick={() => setIsEditing(false)}
                          className="px-4 py-2 bg-brand-cream border border-brand-cream-dim text-xs font-semibold rounded-full text-brand-gray hover:text-brand-charcoal cursor-pointer"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={handleSaveEdits}
                          className="px-4 py-2 bg-brand-olive text-white text-xs font-bold rounded-full flex items-center gap-1 hover:bg-brand-charcoal transition-colors cursor-pointer"
                        >
                          <Check className="w-3.5 h-3.5" />
                          Save
                        </button>
                      </div>
                    )}
                  </div>

                  <div className="h-[1px] bg-brand-cream-dim" />

                  {/* Summary Info / Edit Forms */}
                  {!isEditing ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-8 gap-x-6" id="summary-cards">
                      {/* Dates */}
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-xl bg-[#ebf1d8] flex items-center justify-center text-brand-olive shrink-0">
                          <Calendar className="w-5 h-5" />
                        </div>
                        <div>
                          <span className="block text-xs text-brand-gray font-medium mb-1">
                            Dates
                          </span>
                          <span className="block font-display font-extrabold text-sm text-brand-charcoal leading-snug">
                            {journey.startDate} - {journey.endDate}
                          </span>
                          <span className="block text-xs text-brand-gray mt-1">
                            {journey.days} Days | {journey.nights} Nights
                          </span>
                        </div>
                      </div>

                      {/* Vehicle */}
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-xl bg-[#ebf1d8] flex items-center justify-center text-brand-olive shrink-0">
                          <Car className="w-5 h-5" />
                        </div>
                        <div>
                          <span className="block text-xs text-brand-gray font-medium mb-1">
                            Vehicle
                          </span>
                          <span className="block font-display font-extrabold text-sm text-brand-charcoal leading-snug">
                            {journey.vehicle.name === 'Trusted Local Ride' ? 'Trusted Local Ride' : journey.vehicle.name}
                          </span>
                          <span className="block text-xs text-brand-gray mt-1">
                            {journey.vehicle.model}
                          </span>
                        </div>
                      </div>

                      {/* Travelers */}
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-xl bg-[#ebf1d8] flex items-center justify-center text-brand-olive shrink-0">
                          <Users className="w-5 h-5" />
                        </div>
                        <div>
                          <span className="block text-xs text-brand-gray font-medium mb-1">
                            Travelers
                          </span>
                          <span className="block font-display font-extrabold text-sm text-brand-charcoal leading-snug">
                            {journey.adults} Adults
                          </span>
                          {journey.kids > 0 && (
                            <span className="block text-xs text-brand-gray mt-1">
                              {journey.kids} Kids
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Experience */}
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-xl bg-[#ebf1d8] flex items-center justify-center text-brand-olive shrink-0">
                          <Compass className="w-5 h-5" />
                        </div>
                        <div>
                          <span className="block text-xs text-brand-gray font-medium mb-1">
                            Experience
                          </span>
                          <span className="block font-display font-extrabold text-sm text-brand-charcoal leading-snug whitespace-pre-wrap max-w-xs">
                            {journey.experience.name}
                          </span>
                        </div>
                      </div>
                    </div>
                  ) : (
                    /* EDITING ACTIVE FORMS */
                    <div className="space-y-6" id="edit-summary-form">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <label className="text-xs font-semibold text-brand-gray">Start Date</label>
                          <input
                            type="text"
                            value={tempJourney.startDate}
                            onChange={(e) => setTempJourney({ ...tempJourney, startDate: e.target.value })}
                            className="w-full bg-brand-cream border border-brand-cream-dim rounded-xl px-4 py-2.5 text-xs font-semibold text-brand-charcoal"
                          />
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-xs font-semibold text-brand-gray">End Date</label>
                          <input
                            type="text"
                            value={tempJourney.endDate}
                            onChange={(e) => setTempJourney({ ...tempJourney, endDate: e.target.value })}
                            className="w-full bg-brand-cream border border-brand-cream-dim rounded-xl px-4 py-2.5 text-xs font-semibold text-brand-charcoal"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <label className="text-xs font-semibold text-brand-gray">Adults Count</label>
                          <select
                            value={tempJourney.adults}
                            onChange={(e) => setTempJourney({ ...tempJourney, adults: Number(e.target.value) })}
                            className="w-full bg-brand-cream border border-brand-cream-dim rounded-xl px-4 py-2.5 text-xs font-semibold text-brand-charcoal appearance-none"
                          >
                            {[1, 2, 3, 4, 5, 6].map(n => (
                              <option key={n} value={n}>{n} Adults</option>
                            ))}
                          </select>
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-xs font-semibold text-brand-gray">Kids Count</label>
                          <select
                            value={tempJourney.kids}
                            onChange={(e) => setTempJourney({ ...tempJourney, kids: Number(e.target.value) })}
                            className="w-full bg-brand-cream border border-brand-cream-dim rounded-xl px-4 py-2.5 text-xs font-semibold text-brand-charcoal appearance-none"
                          >
                            {[0, 1, 2, 3, 4].map(n => (
                              <option key={n} value={n}>{n} Kids</option>
                            ))}
                          </select>
                        </div>
                      </div>

                      {/* Choose Vehicle */}
                      <div className="space-y-3">
                        <label className="text-xs font-semibold text-brand-gray block">Choose Vehicle</label>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                          {VEHICLES.map((vehicle) => (
                            <div
                              key={vehicle.name}
                              onClick={() => setTempJourney({ ...tempJourney, vehicle })}
                              className={`p-4 rounded-xl border text-left cursor-pointer transition-all ${
                                tempJourney.vehicle.name === vehicle.name
                                  ? 'border-brand-olive bg-[#f4f7ed] shadow-xs'
                                  : 'border-brand-cream-dim bg-white hover:border-brand-olive/50'
                              }`}
                            >
                              <span className="block font-display font-extrabold text-xs text-brand-charcoal">{vehicle.name}</span>
                              <span className="block text-[10px] text-brand-gray mt-0.5">{vehicle.model}</span>
                              <span className="block text-xs font-bold text-brand-olive mt-2">₹{vehicle.basePrice.toLocaleString()}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Choose Experience */}
                      <div className="space-y-3">
                        <label className="text-xs font-semibold text-brand-gray block">Choose Experience Package</label>
                        <div className="space-y-2">
                          {EXPERIENCES.map((exp) => (
                            <div
                              key={exp.name}
                              onClick={() => setTempJourney({ ...tempJourney, experience: exp })}
                              className={`p-4 rounded-xl border text-left cursor-pointer transition-all flex items-center justify-between gap-4 ${
                                tempJourney.experience.name === exp.name
                                  ? 'border-brand-olive bg-[#f4f7ed] shadow-xs'
                                  : 'border-brand-cream-dim bg-white hover:border-brand-olive/50'
                              }`}
                            >
                              <div className="space-y-1">
                                <span className="block font-display font-extrabold text-xs text-brand-charcoal">{exp.name}</span>
                                <span className="block text-[10px] text-brand-gray leading-tight">{exp.description}</span>
                              </div>
                              <span className="font-display font-bold text-xs text-brand-olive shrink-0">
                                ₹{exp.fee.toLocaleString()}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="h-[1px] bg-brand-cream-dim" />

                  {/* Policy banner at bottom of Left Card - exactly matching screenshot #1 */}
                  <div className="p-5 bg-[#f4f7ed] border border-[#e2ebd3] rounded-2xl flex gap-3.5 items-start">
                    <Info className="w-5 h-5 text-brand-olive shrink-0 mt-0.5" />
                    <p className="text-xs text-brand-gray leading-relaxed font-sans font-medium">
                      Our curated journey includes all local transportation, permits, guided nature walks, and community experiences as per your selection.
                    </p>
                  </div>

                </div>
              </div>

              {/* Right Panel: Checkout Sidebar Details */}
              <div className="space-y-6" id="checkout-sidebar">
                
                {/* Total Amount Pricing Card - Exact visual replica of screenshot #1 */}
                <div className="bg-brand-olive rounded-[2rem] p-6 sm:p-8 text-white shadow-xs space-y-6 relative overflow-hidden">
                  <div className="space-y-2">
                    <span className="block text-xs text-brand-cream/80 font-medium">
                      Total Amount
                    </span>
                    <div className="flex items-baseline gap-3">
                      <span className="font-display font-extrabold text-4xl sm:text-5xl text-white tracking-tight">
                        ₹{totalAmount.toLocaleString('en-IN')}
                      </span>
                      <span className="text-[10px] text-brand-cream/70 leading-tight font-sans font-medium">
                        Inclusive <br /> of tax
                      </span>
                    </div>
                  </div>

                  <div className="h-[1px] bg-white/15" />

                  <div className="space-y-3 pt-1 text-xs">
                    <div className="flex justify-between items-center text-brand-cream/90">
                      <span className="font-sans font-medium">Base Fair</span>
                      <span className="font-display font-bold text-white">₹{baseFair.toLocaleString('en-IN')}</span>
                    </div>
                    <div className="flex justify-between items-center text-brand-cream/90">
                      <span className="font-sans font-medium">Experience Fees</span>
                      <span className="font-display font-bold text-white">₹{experienceFees.toLocaleString('en-IN')}</span>
                    </div>
                  </div>
                </div>

                {/* Payment Method Selector Card - exact style of screenshot #1 */}
                <div className="bg-white border border-brand-cream-dim/60 rounded-[2rem] p-6 sm:p-8 shadow-xs space-y-6">
                  <h3 className="font-display font-extrabold text-base text-brand-charcoal">
                    Payment Method
                  </h3>

                  <div className="space-y-3.5 font-sans" id="payment-options">
                    {[
                      { id: 'card', label: 'Credit / Debit Card', icon: CreditCard },
                      { id: 'upi', label: 'UPI / GPay', icon: Wallet },
                      { id: 'netbanking', label: 'Net Banking', icon: Landmark },
                      { id: 'cash', label: 'Cash on Arrival', icon: Banknote, note: 'Pay locally at destination' }
                    ].map((method) => {
                      const isActive = journey.paymentMethod === method.id;
                      const Icon = method.icon;
                      return (
                        <div
                          key={method.id}
                          onClick={() => setJourney({ ...journey, paymentMethod: method.id as any })}
                          className={`p-4 rounded-2xl border flex items-center justify-between cursor-pointer transition-all ${
                            isActive
                              ? 'border-brand-olive bg-[#f4f7ed] shadow-xs'
                              : 'border-brand-cream-dim bg-white hover:border-brand-olive/30'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <Icon className={`w-5 h-5 ${isActive ? 'text-brand-olive' : 'text-brand-gray'}`} />
                            <div>
                              <span className="block text-xs font-bold text-brand-charcoal">
                                {method.label}
                              </span>
                              {method.note && (
                                <span className="block text-[10px] text-brand-gray font-medium leading-none mt-1">
                                  {method.note}
                                </span>
                              )}
                            </div>
                          </div>
                          
                          <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${
                            isActive ? 'border-brand-olive' : 'border-brand-cream-dim'
                          }`}>
                            {isActive && <div className="w-2.5 h-2.5 rounded-full bg-brand-olive" />}
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Confirm & Pay action CTA button */}
                  <button
                    onClick={handlePaymentSubmit}
                    disabled={loading}
                    className="w-full py-4 bg-brand-olive hover:bg-brand-charcoal disabled:bg-brand-gray text-white font-display font-bold text-xs uppercase tracking-widest rounded-full shadow-xs transition-all flex items-center justify-center cursor-pointer select-none"
                    id="confirm-pay-button"
                  >
                    {loading ? (
                      <span className="flex items-center gap-2">
                        <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                        </svg>
                        Securing connection...
                      </span>
                    ) : (
                      "Confirm & Pay"
                    )}
                  </button>

                  {/* Trust Badge and Legal Disclaimer match screenshot #1 */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-center gap-1.5 text-xs text-brand-gray text-center font-medium">
                      <ShieldCheck className="w-4.5 h-4.5 text-brand-olive" />
                      <span>Secure SSL Encryption</span>
                    </div>
                    <p className="text-[10px] text-brand-gray text-center leading-normal font-sans">
                      By continuing, you agree to TRIS <a href="#" className="underline font-medium hover:text-brand-charcoal">Terms & Conditions</a>.
                    </p>
                  </div>
                </div>
              </div>

            </div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}
