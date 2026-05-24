import React, { useRef, useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowRight, CheckCircle2, Thermometer, Shield, Wind, Layers,
  ChevronLeft, ChevronRight, Maximize2, Volume2, X, Sun, Droplets, Wrench
} from 'lucide-react';
import { PageWrapper } from './components/Shared';
import UPVCProductDetail from './components/UPVCProductDetail';
import { useGSAP } from './lib/useGSAP';
import { scrollReveal, textStagger, ambient } from './lib/animations';
import { textReveal, magnetic } from './lib/stunningAnimations';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// ─── Why uPVC ─────────────────────────────────────────────────────────────────
const WHY_UPVC = [
  {
    icon: Thermometer,
    title: 'Thermal Insulation',
    desc: 'Multi-chamber uPVC profiles trap air, dramatically reducing heat transfer. Keeps interiors cool in summer and warm in winter — cutting energy bills year-round.',
  },
  {
    icon: Volume2,
    title: 'Sound Insulation',
    desc: 'Double and triple-glazed uPVC windows reduce external noise by up to 45 dB — ideal for homes near busy roads, airports, or commercial zones.',
  },
  {
    icon: Shield,
    title: 'Security',
    desc: 'Multi-point locking systems and reinforced steel inside every profile make uPVC windows highly resistant to forced entry.',
  },
  {
    icon: Wind,
    title: 'Wind & Weather Resistance',
    desc: 'uPVC profiles are engineered to withstand wind loads up to 2 kPa and resist UV degradation, rain, and humidity without warping or rusting.',
  },
  {
    icon: Wrench,
    title: 'Zero Maintenance',
    desc: 'Unlike wood, uPVC never needs painting, polishing, or treating. A simple wipe-down keeps it looking new for decades.',
  },
  {
    icon: Sun,
    title: 'UV & Corrosion Resistant',
    desc: 'UV-stabilised outer layer prevents discolouration and degradation even in harsh Indian climates — coastal, tropical, or extreme heat.',
  },
  {
    icon: Droplets,
    title: 'Waterproof',
    desc: 'uPVC is completely waterproof and does not swell, rot, or corrode — making it the ideal choice for bathrooms, kitchens, and coastal buildings.',
  },
  {
    icon: Layers,
    title: 'Design Flexibility',
    desc: 'Available in white and wood-look laminations — Walnut, Dark Oak, Mahogany, Golden Oak — to complement any architectural style.',
  },
];

// ─── Profile Types ────────────────────────────────────────────────────────────
const PROFILES = [
  {
    id: 'ideal-1000',
    name: 'IDEAL 1000',
    tagline: '54 mm · 3-Chamber Casement',
    desc: 'The optimal aluplast 3-chamber casement system engineered for Indian tropical conditions. Suited for outward open windows, providing stable construction depth and fully compatible with existing glazing beads.',
    specs: [
      { label: 'Construction Depth', value: '54 mm' },
      { label: 'Profile System', value: '3-Chamber' },
      { label: 'Glazing Thickness', value: 'Up to 24 mm' },
      { label: 'Ideal Application', value: 'Outward Open Windows' },
      { label: 'Glazing Beads', value: 'Compatible' },
      { label: 'Country Launch', value: 'Made in India' },
    ],
    features: [
      '54 mm construction depth for stable outer walls',
      'Accommodates glass up to 24 mm thickness',
      'Certified 3-chamber structural insulation system',
      'Good choice for outward opening casement panes',
      'Perfect styling with existing architectural glazing beads',
      'Compatible with Mivan Construction technology guidelines',
    ],
    img: '/images/profile-casement.png',
  },
  {
    id: 'prima-slide',
    name: 'prima-slide',
    tagline: '54 mm · 2 & 3-Track Sliding',
    desc: 'The specialized aluplast India sliding system built for both windows and doors. Engineered to withstand heavy winds with smooth track performance and extra track slot options.',
    specs: [
      { label: 'Construction Depth', value: '54 mm' },
      { label: 'Wind Resistance', value: 'High Wind Loads' },
      { label: 'Glazing Thickness', value: 'Up to 11 mm' },
      { label: 'Track Options', value: '2-track & 3-track' },
      { label: 'Extra Track', value: 'Additional option' },
      { label: 'System Suitability', value: 'Windows & Doors' },
    ],
    features: [
      '54 mm Construction depth for smooth sliding operation',
      'Available in 2-track and 3-track sliding layouts',
      'Accommodates glass panes up to 11 mm thickness',
      'Designed with high static resistance to severe wind load',
      'Additional track option for mosquito fly mesh profiles',
      'Engineered specifically for Indian climatic extremes',
    ],
    img: '/images/profile-sliding.png',
  },
  {
    id: 'ideal-2000',
    name: 'IDEAL 2000®',
    tagline: '60 mm · 3-Chamber Core System',
    desc: 'Engineered with classic aluplast-technology, the IDEAL 2000® system features a 60 mm construction depth and a 3-chamber core. It delivers excellent thermal values and outstanding sound insulation up to 43 dB (class IV).',
    specs: [
      { label: 'Construction Depth', value: '60 mm' },
      { label: 'Profile System', value: '3-Chamber Core' },
      { label: 'Glazing Thickness', value: 'Up to 35 mm' },
      { label: 'Thermal Insulation', value: 'Uf = 1.6 W/m²K' },
      { label: 'Sound Protection', value: 'Up to 43 dB (Class IV)' },
      { label: 'Sealing Gaskets', value: 'EPDM Seals' },
    ],
    features: [
      '60 mm construction depth for perfect structural stability',
      '3-chamber profile core providing an excellent thermal barrier',
      'Glazing thickness support up to 35 mm for robust double glazing',
      'Outstanding thermal insulation value of Uf = 1.6 W/m²K',
      'Outstanding sound insulation up to sound transmission class IV (43 dB)',
      'Highly resistant to weathering and extreme tropical climate conditions',
    ],
    img: '/images/profile-ideal-2000.png',
  },
  {
    id: 'ideal-4000',
    name: 'IDEAL 4000®',
    tagline: '70 mm · 5-Chamber Premium',
    desc: 'The ultimate aluplast heavy-duty casement profile system. Delivers top-tier thermal insulation and sound dampening class up to 45 dB with option for aluskin® aluminum cover shells.',
    specs: [
      { label: 'Construction Depth', value: '70 mm' },
      { label: 'Thermal Core', value: 'Uf = 1.3 W/m²K' },
      { label: 'Total Value', value: 'Uw = 0.99 W/m²K' },
      { label: 'Glazing Thickness', value: 'Up to 41 mm' },
      { label: 'Sound Barrier', value: 'Up to 45 dB (Class 4)' },
      { label: 'Alu covers', value: 'aluskin® compatible' },
    ],
    features: [
      'Premium 70 mm construction depth with 5 thermal chambers',
      'Unmatched acoustic insulation dampening up to 45 dB',
      'Outstanding Uw energy values down to 0.99 W/m²K',
      'Supports thick structural safety double & triple glass up to 41 mm',
      'Optional aluskin® clip-on external aluminum covers possible',
      'Available in numerous premium color and timber decor variations',
    ],
    img: '/images/profile-ideal-4000.png',
  },
  {
    id: 'smart-slide',
    name: 'smart-slide',
    tagline: '70 mm · Premium Sliding Star',
    desc: 'The next generation of high-end sliding doors. Features a compact 70 mm construction depth, an ultra-low Uf value of 1.4 W/m²K, innovative concealed hardware technology, a self-closing mechanism, and continuous compression gaskets for excellent sealing.',
    specs: [
      { label: 'Construction Depth', value: '70 mm' },
      { label: 'Thermal Value', value: 'Uf = 1.4 W/m²K' },
      { label: 'Glazing Thickness', value: 'Up to 41 mm' },
      { label: 'Opening Schema', value: 'Schema A + C' },
      { label: 'Hardware Tech', value: 'Fully Concealed' },
      { label: 'Adhesive Tech', value: 'Optional Bonding' },
    ],
    features: [
      '70 mm premium construction depth for sleek minimalist design',
      'Outstanding heat barrier value of Uf = 1.4 W/m²K',
      'Accommodates single- to triple-glazed performance units up to 41 mm',
      'Modern classic-line profiles presenting elegant clean edges',
      'Concealed hardware technology ensuring complete security & luxury',
      'Convenient self-closing and continuous compression for excellent sealing',
    ],
    img: '/images/profile-smart-slide.png',
  },
  {
    id: 'vario-slide',
    name: 'vario-slide',
    tagline: '2 & 3-Track · Highly Versatile Sliding',
    desc: 'A highly flexible, premium sliding system supporting 2-track and 3-track configurations. Compatible with woodec and aludec surfaces, it provides a stable aluminium interlock and excellent statics for large architectural elements.',
    specs: [
      { label: 'Glazing Range', value: '4 mm - 24 mm' },
      { label: 'Track Versions', value: '2 or 3-track' },
      { label: 'Surface Finishes', value: 'woodec / aludec' },
      { label: 'Drainage Tech', value: 'Concealed drainage' },
      { label: 'Interlock Support', value: 'Aluminium Bar' },
      { label: 'Statics Rating', value: 'High Element Statics' },
    ],
    features: [
      'Glazing flexibility ranging from 4 mm up to 24 mm thickness',
      'Available in highly custom 2-track and 3-track configurations',
      'Support for ultra-premium woodec and aludec modern finishes',
      'Concealed drainage paths and standard profile aeration features',
      'Stable mechanical interlock with internal architectural aluminium',
      'Excellent structural statics for grand, double-height sliding elements',
    ],
    img: '/images/profile-vario-slide.png',
  },
  {
    id: 'easy-slide',
    name: 'easy-slide',
    tagline: 'Elegant · High-Reinforcement Sliding',
    desc: 'An elegant sliding system featuring exchangeable gaskets and integrated structural steel reinforcement. Perfect for standard openings requiring lightweight, durable operations.',
    specs: [
      { label: 'Glazing Thickness', value: 'Up to 20 mm' },
      { label: 'Gasket System', value: 'Exchangeable gaskets' },
      { label: 'Steel Reinforce', value: 'Frame & Sash' },
      { label: 'Aesthetics', value: 'Elegant Design' },
      { label: 'Operation', value: 'Smooth Gliding' },
      { label: 'Weather Seal', value: 'EPDM Seals' },
    ],
    features: [
      'Accommodates performance insulated glass units up to 20 mm',
      'Elegant, minimalist framing contours to maximize daylight intake',
      'Exchangeable continuous gaskets for simple future maintenance',
      'High-grade steel reinforcement integrated inside both frame and sash',
      'Superb structural values resisting local tropical wind loads',
      'Engineered for long-lasting, smooth horizontal gliding',
    ],
    img: '/images/profile-easy-slide.png',
  },
  {
    id: 'mono-slide',
    name: 'mono-slide',
    tagline: '60 mm · Monorail Sliding Concept',
    desc: 'A unique monorail system combining fixed and movable panes in a single frame. Built on a standardized 60 mm frame, it features a built-in PVC interlock for perfect weather sealing.',
    specs: [
      { label: 'Glazing Thickness', value: 'Up to 8 mm' },
      { label: 'Layout Concept', value: 'Fixed + Movable sashes' },
      { label: 'Gaskets System', value: 'Exchangeable gaskets' },
      { label: 'Frame Standard', value: '60 mm System' },
      { label: 'Sealing Tech', value: 'Integrated PVC Interlock' },
      { label: 'Combinations', value: 'Fanlights Available' },
    ],
    features: [
      'Designed to accommodate single glazing sheets up to 8 mm thickness',
      'Unique sliding window coupling a fixed picture pane with a moving sash',
      'Integrated PVC interlock profile to guarantee perfect airtight sealing',
      'Exchangeable weather gaskets for excellent protection',
      'Standardized 60 mm frame depth compatible with extensive accessories',
      'Supports complex custom layouts, including fanlights and window combos',
    ],
    img: '/images/profile-mono-slide.png',
  }
];

// ─── Company Stats ────────────────────────────────────────────────────────────
const COMPANY_STATS = [
  { value: '500+', label: 'Projects Completed' },
  { value: '10+', label: 'Years Experience' },
  { value: 'Pan India', label: 'Service Coverage' },
  { value: 'ISO', label: 'Quality Standards' },
];

// ─── Lamination Options ───────────────────────────────────────────────────────
const ALUDEC_LAMINATIONS = [
  { name: 'aludec DB703',       bg: '#4f5255', desc: 'Metallic iron mica with sparkles' },
  { name: 'aludec jet black',   bg: '#111215', desc: 'Ultra-matt deep black finish' },
  { name: 'aludec window grey', bg: '#8d9296', desc: 'Sleek industrial grey coating' },
  { name: 'aludec basalt grey', bg: '#4b4d50', desc: 'Elegant volcanic basalt stone' },
  { name: 'aludec anthracite',  bg: '#2f3133', desc: 'Prestige dark charcoal grey' },
  { name: 'aludec traffic white',bg: '#f0f2f2', desc: 'Satin powder traffic white' },
  { name: 'aludec umbra grey',  bg: '#4b4a45', desc: 'Warm organic earthy grey' },
];

const WOODEC_LAMINATIONS = [
  { name: 'sheffield oak alpine', bg: '#cdbeab', desc: 'Pale Scandinavian timber grain' },
  { name: 'sheffield oak concrete',bg: '#9f9284', desc: 'Cool concrete grey oak touch' },
  { name: 'turner oak toffee',   bg: '#b08754', desc: 'Rich honey oak woodgrain' },
  { name: 'turner oak malt',     bg: '#c5b095', desc: 'Sandy-malt natural wood aesthetic' },
];

// ─── Window Types ─────────────────────────────────────────────────────────────
const WINDOW_TYPES = [
  { num: '01', title: 'Sliding Windows', desc: 'Sleek and space-saving — sliding windows provide smooth operation and modern aesthetics for any room.', img: '/images/sliding-windows.png', overview: 'Glide horizontally on tracks requiring no swing space. Available in 2-track and 3-track configurations with wind resistance up to 2 kPa.', features: ['2-track & 3-track configurations', 'Wind resistance up to 2 kPa', 'Smooth stainless steel rollers', 'Anti-lift security locks', 'Glazing up to 11 mm', 'Max size 2.2 m × 2.1 m'], applications: ['Apartments & high-rises', 'Commercial buildings', 'Industrial facilities'] },
  { num: '02', title: 'Casement Windows', desc: 'Reliable, energy-efficient, and versatile — casement windows offer maximum ventilation and superior security.', img: '/images/casement-windows.png', overview: 'Hinged at the side and opening outward like a door, casement windows provide excellent ventilation, unobstructed views, and a tight seal when closed.', features: ['Maximum ventilation with full opening', 'Multi-point locking for superior security', 'Excellent thermal and acoustic insulation', 'Available in single and double sash', 'Easy to clean from inside', 'Compatible with mosquito mesh'], applications: ['Residential bedrooms & living rooms', 'Commercial offices', 'Schools & institutions'] },
  { num: '03', title: 'Arch Windows', desc: "Elevate your home's aesthetic with beautifully designed arch windows that bring timeless charm.", img: '/images/arch-windows.png', overview: 'Curved top adds elegance and grandeur to any facade. Available as fixed or with operable lower sections in any radius.', features: ['Custom arch profiles to any radius', 'Fixed or operable lower section', 'Seamless curved uPVC extrusion', 'Matches standard window systems', 'Available in all lamination finishes', 'Adds architectural character'], applications: ['Heritage & luxury residences', 'Churches & institutions', 'Premium commercial buildings'] },
  { num: '04', title: 'Combination Windows', desc: 'Versatile combination systems that blend fixed, sliding, and casement panels into one seamless unit.', img: '/images/combination-windows.jpg', overview: 'Combination windows merge multiple window types — fixed, operable, and ventilator — into a single frame system, maximising light, ventilation, and design flexibility.', features: ['Mix of fixed and operable panels', 'Custom configurations available', 'Seamless frame joining', 'Maximises natural light', 'Suitable for large openings', 'Available in all profile systems'], applications: ['Living rooms & lobbies', 'Commercial facades', 'Institutional buildings'] },
  { num: '05', title: 'Tilt and Turn Windows', desc: "Innovative and flexible — tilt-and-turn windows offer easy ventilation control and enhanced security.", img: '/images/tilt-turn-windows.jpg', overview: "Two opening modes with a single handle — tilt inward from the top for secure ventilation, or turn fully open like a casement. Ideal for high-rise buildings.", features: ['Two opening modes with one handle', 'Tilt mode for secure ventilation', 'Turn mode for full access & cleaning', 'Child-safe ventilation position', 'Excellent burglar resistance', 'Ideal for high-rise buildings'], applications: ['High-rise apartments', 'Hotels & serviced apartments', 'Healthcare facilities'] },
  { num: '06', title: 'Villa Windows', desc: 'Premium large-format uPVC windows designed for villas and luxury residences demanding elegance and performance.', img: '/images/villa-windows.jpg', overview: 'Villa windows are large-format, high-performance uPVC systems designed for premium residences. They combine expansive glass areas with robust profiles for maximum light, views, and thermal comfort.', features: ['Large-format glass panels', 'Premium multi-point locking', 'Superior thermal & acoustic performance', 'Floor-to-ceiling options available', 'Available in all lamination finishes', 'Custom sizes for any opening'], applications: ['Luxury villas & bungalows', 'Premium residential projects', 'Resort & hospitality buildings'] },
];

// ─── Gallery slides ────────────────────────────────────────────────────────────
const GALLERY = [
  { src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB3pBe9jBFlkTEdFU2gFCqYYZqyhCQ7jahlbJH1vCC9pjTFsPbUFft2mPKx_6ArATke7P3ar8YCFWcjR1SKONNb4HCFp0CXGKtDD-P6vIl8bU40eTTMcICvs4eUGF3sx7uhJXc6Tn-T3aoMevSxcIkahhFxdin3C5E6BWnfeI87H1tMJl3Zt4viRzp1KUXh3m4zfHz5HpBOycAJB4KSrN12uWmQecLiRiZWcM3jQX1VDBFj_ep1Ffx7GH0B1s3TBh-tJsz3mcvYxdc', label: 'Sliding Window Installation', caption: 'Robust 2-track sliding uPVC system — smooth operation for residential & commercial facades.' },
  { src: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1400&q=80', label: 'Casement Window System', caption: 'Outward open casement windows — 54 mm 3-chamber profile, glazing up to 24 mm.' },
  { src: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1400&q=80', label: 'Commercial Project', caption: 'Large-scale commercial installation — 3-track sliding uPVC configuration.' },
  { src: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1400&q=80', label: 'Hospitality Complex', caption: 'uPVC systems delivering comfort and aesthetics for resort guests.' },
];

// ── Image Slider ──────────────────────────────────────────────────────────────
function ImageSlider() {
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);
  const curtainRef = useRef<HTMLDivElement>(null);
  const captionRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);

  const slideTo = useCallback((next: number) => {
    if (animating || next === current) return;
    setAnimating(true);
    const tl = gsap.timeline({ onComplete: () => { setCurrent(next); setAnimating(false); } });
    tl.fromTo(curtainRef.current, { scaleX: 0, transformOrigin: 'left center' }, { scaleX: 1, duration: 0.45, ease: 'power3.inOut' })
      .call(() => { if (trackRef.current) gsap.set(trackRef.current, { x: `-${next * 100}%` }); })
      .to(curtainRef.current, { scaleX: 0, transformOrigin: 'right center', duration: 0.45, ease: 'power3.inOut' })
      .fromTo(captionRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' }, '-=0.2');
    if (counterRef.current) gsap.fromTo(counterRef.current, { y: -16, opacity: 0 }, { y: 0, opacity: 1, duration: 0.3, ease: 'power2.out', delay: 0.3 });
  }, [animating, current]);

  const prev = useCallback(() => slideTo((current - 1 + GALLERY.length) % GALLERY.length), [current, slideTo]);
  const next = useCallback(() => slideTo((current + 1) % GALLERY.length), [current, slideTo]);

  useEffect(() => {
    const id = setInterval(() => slideTo((current + 1) % GALLERY.length), 4500);
    return () => clearInterval(id);
  }, [current, slideTo]);

  const wrapperRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!wrapperRef.current) return;
    gsap.fromTo(wrapperRef.current, { opacity: 0, y: 60 }, { opacity: 1, y: 0, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: wrapperRef.current, start: 'top 85%', once: true } });
  }, []);

  return (
    <div ref={wrapperRef} className="relative w-full h-[70vh] min-h-[420px] overflow-hidden bg-slate-950 select-none">
      <div ref={trackRef} className="flex h-full will-change-transform" style={{ width: `${GALLERY.length * 100}%` }}>
        {GALLERY.map((slide, i) => (
          <div key={i} className="relative h-full" style={{ width: `${100 / GALLERY.length}%` }}>
            <img src={slide.src} alt={slide.label} className="w-full h-full object-cover" loading={i === 0 ? 'eager' : 'lazy'} />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />
          </div>
        ))}
      </div>
      <div ref={curtainRef} className="absolute inset-0 bg-electric-blue z-20 pointer-events-none" style={{ transform: 'scaleX(0)', transformOrigin: 'left center' }} />
      <div ref={captionRef} className="absolute bottom-10 left-8 md:left-16 z-10 max-w-lg">
        <span className="text-electric-blue text-[10px] font-bold uppercase tracking-widest block mb-2">{GALLERY[current].label}</span>
        <p className="text-white text-lg md:text-xl font-semibold leading-snug">{GALLERY[current].caption}</p>
      </div>
      <div className="absolute bottom-10 right-8 md:right-16 z-10 flex items-end gap-1 text-white/60 font-mono text-sm">
        <span ref={counterRef} className="text-white font-black text-3xl leading-none">{String(current + 1).padStart(2, '0')}</span>
        <span className="mb-1">/ {String(GALLERY.length).padStart(2, '0')}</span>
      </div>
      <div className="absolute top-6 left-1/2 -translate-x-1/2 z-10 flex gap-2">
        {GALLERY.map((_, i) => (<button key={i} onClick={() => slideTo(i)} aria-label={`Go to slide ${i + 1}`} className={`h-1 rounded-full transition-all duration-500 ${i === current ? 'w-8 bg-electric-blue' : 'w-4 bg-white/30 hover:bg-white/60'}`} />))}
      </div>
      <button onClick={prev} aria-label="Previous slide" className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-10 w-12 h-12 flex items-center justify-center border border-white/20 bg-slate-950/50 backdrop-blur-sm text-white hover:bg-electric-blue hover:border-electric-blue transition-all duration-300"><ChevronLeft className="w-5 h-5" /></button>
      <button onClick={next} aria-label="Next slide" className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-10 w-12 h-12 flex items-center justify-center border border-white/20 bg-slate-950/50 backdrop-blur-sm text-white hover:bg-electric-blue hover:border-electric-blue transition-all duration-300"><ChevronRight className="w-5 h-5" /></button>
      <ProgressBar key={current} duration={4500} />
    </div>
  );
}

function ProgressBar({ duration }: { duration: number }) {
  const barRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!barRef.current) return;
    gsap.fromTo(barRef.current, { scaleX: 0, transformOrigin: 'left center' }, { scaleX: 1, duration: duration / 1000, ease: 'none' });
  }, [duration]);
  return (
    <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-white/10 z-10">
      <div ref={barRef} className="h-full bg-electric-blue will-change-transform" style={{ transformOrigin: 'left center' }} />
    </div>
  );
}

// ── Window Type Modal ─────────────────────────────────────────────────────────
function WindowModal({ win, onClose }: { win: typeof WINDOW_TYPES[0]; onClose: () => void }) {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm" onClick={onClose}>
      <div className="bg-white w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-xl shadow-2xl" onClick={e => e.stopPropagation()}>
        <div className="relative h-56 overflow-hidden rounded-t-xl">
          <img src={win.img} alt={win.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 to-transparent" />
          <div className="absolute bottom-4 left-6">
            <span className="text-white/60 text-xs uppercase tracking-widest">{win.num}</span>
            <h3 className="text-white text-2xl font-black uppercase tracking-tighter">{win.title}</h3>
          </div>
          <button onClick={onClose} className="absolute top-4 right-4 w-9 h-9 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-electric-blue transition-colors"><X className="w-4 h-4" /></button>
        </div>
        <div className="p-6 md:p-8">
          <p className="text-slate-600 leading-relaxed mb-6">{win.overview}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <h4 className="text-xs font-bold uppercase tracking-widest text-electric-blue mb-3">Key Features</h4>
              <ul className="space-y-2">
                {win.features.map((f, i) => (<li key={i} className="flex items-start gap-2 text-sm text-slate-700"><CheckCircle2 className="w-4 h-4 text-electric-blue shrink-0 mt-0.5" />{f}</li>))}
              </ul>
            </div>
            <div>
              <h4 className="text-xs font-bold uppercase tracking-widest text-electric-blue mb-3">Applications</h4>
              <ul className="space-y-2">
                {win.applications.map((a, i) => (<li key={i} className="flex items-start gap-2 text-sm text-slate-700"><ArrowRight className="w-4 h-4 text-electric-blue shrink-0 mt-0.5" />{a}</li>))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function UPVC() {
  const navigate = useNavigate();
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const heroImageRef   = useRef<HTMLImageElement>(null);
  const heroOverlayRef = useRef<HTMLDivElement>(null);
  const heroContentRef = useRef<HTMLDivElement>(null);
  const heroTitleRef   = useRef<HTMLHeadingElement>(null);
  const heroCTARef     = useRef<HTMLButtonElement>(null);

  useGSAP(() => {
    if (heroImageRef.current)   ambient.scale(heroImageRef.current, { from: 1, to: 1.12 });
    if (heroOverlayRef.current) ambient.fade(heroOverlayRef.current, { from: 0.7, to: 0.9 });
    if (heroContentRef.current) textStagger.fadeInUp(heroContentRef.current.querySelectorAll('.hero-animate'), { stagger: 0.2, delay: 0.3 });
    if (heroTitleRef.current)   textReveal.splitChars(heroTitleRef.current, { stagger: 0.025, duration: 0.8, ease: 'back.out(1.7)', from: 'bottom' });
    if (heroCTARef.current)     return magnetic.button(heroCTARef.current, 0.3);
  }, []);

  if (selectedProduct) {
    return (
      <UPVCProductDetail 
        productName={selectedProduct} 
        onBack={() => setSelectedProduct(null)} 
        onSelectProduct={(name) => setSelectedProduct(name)}
      />
    );
  }

  return (
    <PageWrapper>

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="relative h-screen w-full flex items-center overflow-hidden -mt-16" id="upvc-hero">
        <img ref={heroImageRef} className="absolute inset-0 w-full h-full object-cover will-change-transform"
          src="/images/upvc-hero-luxury.png"
          alt="UPVC Luxury Facade Window Systems" loading="eager" />
        <div ref={heroOverlayRef} className="absolute inset-0 bg-slate-950/70" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full">
          <div ref={heroContentRef} className="max-w-2xl">
            <span className="hero-animate text-electric-blue font-semibold tracking-[0.3em] uppercase mb-4 block text-xs">uPVC Windows & Doors · Srikala Projects</span>
            <h1 ref={heroTitleRef} className="text-4xl sm:text-5xl md:text-7xl font-bold text-white mb-6 uppercase tracking-tighter leading-none">uPVC Window & Door Systems</h1>
            <p className="hero-animate text-base md:text-lg text-slate-300 mb-10 max-w-lg">Srikala Projects designs, fabricates and installs premium uPVC windows and doors — built for India's climate, engineered for lasting performance.</p>
            <div className="hero-animate flex flex-wrap gap-3 md:gap-4">
              <button ref={heroCTARef} onClick={() => navigate('/contact')} className="bg-electric-blue text-white px-8 md:px-10 py-3 md:py-4 text-xs font-bold uppercase tracking-widest hover:scale-105 transition-transform duration-200">GET QUOTE</button>
              <button onClick={() => document.getElementById('upvc-types')?.scrollIntoView({ behavior: 'smooth' })} className="border-2 border-white/50 text-white px-8 md:px-10 py-3 md:py-4 text-xs font-bold uppercase tracking-widest hover:bg-white/10 transition-all duration-200">VIEW PRODUCTS</button>
            </div>
          </div>
        </div>
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/40">
          <span className="text-[10px] uppercase tracking-widest">Scroll</span>
          <div className="w-px h-10 bg-white/20 animate-pulse" />
        </div>
      </section>

      {/* ── Stats Bar ─────────────────────────────────────────────────────── */}
      <section className="bg-electric-blue text-white py-5">
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="text-sm font-black tracking-tight uppercase">Srikala Projects</span>
            <span className="text-white/40">·</span>
            <span className="text-[10px] uppercase tracking-widest text-white/70">uPVC Division</span>
          </div>
          <div className="flex flex-wrap gap-6 md:gap-8">
            {COMPANY_STATS.map((f, i) => (
              <div key={i} className="text-center">
                <div className="text-base md:text-lg font-black">{f.value}</div>
                <div className="text-[10px] uppercase tracking-widest text-white/70">{f.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Types of Windows ──────────────────────────────────────────────── */}
      <section className="py-20 md:py-24 bg-slate-50" id="upvc-types">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center mb-14">
            <span className="text-xs font-bold text-electric-blue uppercase tracking-widest block mb-4">Our Range</span>
            <h2 className="text-3xl md:text-4xl font-bold uppercase tracking-widest mb-4">We Manufacture All Types of uPVC Windows</h2>
            <div className="w-16 h-1 bg-electric-blue mx-auto mb-6" />
            <p className="text-slate-500 max-w-2xl mx-auto text-base leading-relaxed">
              From casement to sliding, fixed to tilt-and-turn — each type is designed with unique features combining durability, energy efficiency, and modern design.
            </p>
          </div>
          <div className="flex flex-col lg:flex-row w-full h-[700px] lg:h-[600px] overflow-hidden rounded-2xl gap-2 shadow-2xl bg-slate-900">
            {WINDOW_TYPES.map((w, i) => {
              const isHovered = hoveredIndex === i;
              const isAnyHovered = hoveredIndex !== null;
              
              // On desktop: dynamic flex grow sizer
              // On mobile: active panel stretches vertically
              const flexStyle = isHovered 
                ? 'flex-[4.5]' 
                : isAnyHovered 
                  ? 'flex-[0.5]' 
                  : 'flex-1';

              return (
                <div
                  key={i}
                  onMouseEnter={() => setHoveredIndex(i)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  onClick={() => setHoveredIndex(isHovered ? null : i)}
                  className={`relative overflow-hidden transition-all duration-500 ease-out cursor-pointer group h-full ${flexStyle}`}
                >
                  {/* Background Image */}
                  <img 
                    src={w.img} 
                    alt={w.title} 
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                  />
                  
                  {/* Ambient overlay shadows (darker on hover for readability) */}
                  <div className={`absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent transition-opacity duration-500 ${
                    isHovered ? 'opacity-85' : 'opacity-65'
                  }`} />

                  {/* Vertical Title (Shown on Desktop when NOT hovered) */}
                  <div className={`absolute inset-0 hidden lg:flex items-center justify-center transition-all duration-500 ${
                    isHovered ? 'opacity-0 scale-95 pointer-events-none' : 'opacity-100 scale-100'
                  }`}>
                    <span 
                      className="text-white text-lg md:text-xl font-extrabold uppercase tracking-widest whitespace-nowrap select-none border-b-2 border-white/40 pb-3"
                      style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
                    >
                      {w.title}
                    </span>
                  </div>

                  {/* Mobile Title (Shown on Small Screens when NOT hovered) */}
                  <div className={`absolute inset-0 flex lg:hidden items-center justify-center transition-all duration-500 ${
                    isHovered ? 'opacity-0 scale-95 pointer-events-none' : 'opacity-100 scale-100'
                  }`}>
                    <span className="text-white text-base font-black uppercase tracking-wider select-none border-b border-white/30 pb-1">
                      {w.title}
                    </span>
                  </div>

                  {/* Horizontal Detailed Description Content (Fades in when hovered) */}
                  <div className={`absolute inset-0 flex flex-col justify-end p-6 md:p-10 transition-all duration-500 ${
                    isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
                  }`}>
                    <span className="text-[10px] font-bold text-electric-blue uppercase tracking-[0.25em] block mb-2">
                      WINDOW TYPE {w.num}
                    </span>
                    <h3 className="text-white text-2xl md:text-3xl font-black uppercase tracking-tight mb-3">
                      {w.title}
                    </h3>
                    <p className="text-slate-300 text-xs md:text-sm leading-relaxed mb-6 max-w-md">
                      {w.desc}
                    </p>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedProduct(w.title);
                      }} 
                      className="w-fit bg-electric-blue text-white px-6 py-2.5 text-xs font-bold uppercase tracking-widest hover:bg-blue-600 transition-colors shadow-lg animate-pulse"
                    >
                      KNOW MORE
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Profile Types ─────────────────────────────────────────────────── */}
      <section className="py-20 md:py-24 bg-white" id="upvc-profiles">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center mb-14">
            <span className="text-xs font-bold text-electric-blue uppercase tracking-widest block mb-4">Profile Systems</span>
            <h2 className="text-3xl md:text-4xl font-bold uppercase tracking-widest mb-4">Types of uPVC Profiles</h2>
            <div className="w-16 h-1 bg-electric-blue mx-auto mb-6" />
            <p className="text-slate-500 max-w-2xl mx-auto text-base leading-relaxed">
              The profile is the backbone of every uPVC window. We fabricate using two primary profile systems — each engineered for specific applications and performance requirements.
            </p>
          </div>
          <div className="space-y-24">
            {PROFILES.map((p, idx) => (
              <div key={p.id} className={`flex flex-col gap-10 group ${idx % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                <div className="w-full md:w-1/2 relative overflow-hidden shadow-2xl h-[400px] md:h-[480px]">
                  <img src={p.img} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 to-transparent" />
                  <div className="absolute bottom-6 left-6">
                    <p className="text-white/60 text-xs uppercase tracking-widest mb-1">{p.tagline}</p>
                    <h3 className="text-white text-2xl md:text-3xl font-black uppercase tracking-tighter">{p.name}</h3>
                  </div>
                </div>
                <div className="w-full md:w-1/2 flex flex-col justify-center">
                  <span className="text-xs font-bold text-electric-blue uppercase tracking-widest block mb-3">{p.tagline}</span>
                  <h3 className="text-3xl md:text-4xl font-bold uppercase tracking-tighter mb-5 leading-none">{p.name}</h3>
                  <p className="text-slate-500 text-base mb-7 border-l-2 border-electric-blue pl-5 leading-relaxed">{p.desc}</p>
                  <div className="grid grid-cols-2 gap-px bg-slate-100 border border-slate-100 mb-7">
                    {p.specs.map((s, i) => (
                      <div key={i} className="bg-white px-4 py-3">
                        <p className="text-[10px] uppercase tracking-widest text-slate-400 mb-1">{s.label}</p>
                        <p className="font-black text-slate-900 text-sm">{s.value}</p>
                      </div>
                    ))}
                  </div>
                  <ul className="space-y-2 mb-7">
                    {p.features.map((f, i) => (
                      <li key={i} className="flex items-start gap-3 text-slate-700">
                        <CheckCircle2 className="text-electric-blue w-4 h-4 shrink-0 mt-0.5" />
                        <span className="text-sm">{f}</span>
                      </li>
                    ))}
                  </ul>
                  <button onClick={() => navigate('/contact')} className="w-fit flex items-center gap-2 bg-slate-950 text-white px-8 py-4 text-xs font-bold uppercase tracking-widest hover:bg-electric-blue transition-all duration-300">
                    GET A QUOTE <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Lamination ────────────────────────────────────────────────────── */}
      <section className="py-20 md:py-24 bg-slate-50 border-b border-slate-200" id="upvc-lamination">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          
          <div className="text-center mb-16">
            <span className="text-[11px] font-bold text-electric-blue uppercase tracking-[0.2em] block mb-2">aluplast Surface Coatings</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 uppercase tracking-wide mb-4">Lamination Options</h2>
            <div className="w-16 h-[3px] bg-electric-blue mx-auto mb-6" />
            <p className="text-slate-500 max-w-3xl mx-auto text-sm md:text-base leading-relaxed">
              Experience the dual aesthetic catalogs of aluplast GmbH. Choose between the high-tech, powder-coated look of our aluminium style finishes or the warm, texturized touch of natural woodgrains.
            </p>
          </div>

          <div className="space-y-20 max-w-6xl mx-auto">
            
            {/* aludec - inspired by style */}
            <div className="flex flex-col gap-6">
              <div className="border-l-4 border-[#e30613] pl-4">
                <h3 className="text-2xl font-black uppercase tracking-tight text-slate-800">
                  <span className="text-[#e30613]">aludec</span> <span className="font-light text-slate-500">inspired by style</span>
                </h3>
                <p className="text-slate-500 text-xs md:text-sm mt-2 max-w-4xl leading-relaxed">
                  Perfect aluminium look and a pleasant feel: aludec offers the high-quality look of an aluminium shell combined with easy processing and a pleasant feel. It has never been easier and more resource-saving to produce a uPVC window in aluminium look!
                </p>
              </div>

              {/* Seamless vertical swatches board */}
              <div className="flex w-full h-[320px] md:h-[380px] rounded-2xl overflow-hidden shadow-xl border border-slate-200/60 bg-white">
                {[
                  { name: 'aludec traffic white', bg: '#f0f2f2', desc: 'Satin traffic white' },
                  { name: 'aludec window grey', bg: '#8d9296', desc: 'Sleek industrial grey' },
                  { name: 'aludec umbra grey', bg: '#4b4a45', desc: 'Warm organic grey' },
                  { name: 'aludec basalt grey', bg: '#4b4d50', desc: 'Elegant basalt tone' },
                  { name: 'aludec jet black', bg: '#111215', desc: 'Ultra-matt deep black' },
                  { name: 'aludec DB703', bg: '#4f5255', desc: 'Metallic iron mica' },
                  { name: 'aludec anthracite grey', bg: '#2f3133', desc: 'Prestige dark charcoal' }
                ].map((lam, i) => {
                  const isLight = lam.name === 'aludec traffic white';
                  return (
                    <div 
                      key={i} 
                      className="group flex-1 hover:flex-[2.5] relative transition-all duration-500 ease-out cursor-pointer overflow-hidden border-r border-black/5 last:border-r-0 select-none"
                      style={{ backgroundColor: lam.bg }}
                    >
                      {/* Technical metallic micro-texture overlay */}
                      <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent pointer-events-none" />
                      
                      {/* Vertical color label */}
                      <div className="absolute inset-0 flex items-end justify-center pb-8 md:pb-12 pointer-events-none z-10">
                        <span 
                          className={`text-[9px] md:text-[10px] font-black uppercase tracking-[0.25em] whitespace-nowrap transition-transform duration-500 group-hover:scale-105 ${
                            isLight ? 'text-slate-800/80 group-hover:text-slate-900' : 'text-white/80 group-hover:text-white'
                          }`}
                          style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
                        >
                          {lam.name}
                        </span>
                      </div>

                      {/* Hover Info cockpit overlay */}
                      <div className="absolute inset-x-0 bottom-0 p-5 bg-slate-950/80 backdrop-blur-md border-t border-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out flex flex-col justify-end z-20">
                        <span className="text-[7px] font-bold text-electric-blue uppercase tracking-widest block mb-0.5">Surface Coating</span>
                        <p className="text-white font-extrabold text-xs uppercase tracking-tight truncate">{lam.name.replace('aludec ', '')}</p>
                        <p className="text-slate-400 text-[8px] mt-0.5 leading-tight">{lam.desc}</p>
                        <span className="text-white/40 text-[7px] font-mono mt-1.5 block">{lam.bg.toUpperCase()}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* woodec - inspired by nature */}
            <div className="flex flex-col gap-6">
              <div className="border-l-4 border-[#8a4f30] pl-4">
                <h3 className="text-2xl font-black uppercase tracking-tight text-slate-800">
                  <span className="text-[#8a4f30]">woodec</span> <span className="font-light text-slate-500">inspired by nature</span>
                </h3>
                <p className="text-slate-500 text-xs md:text-sm mt-2 max-w-4xl leading-relaxed">
                  An astonishing wood look and a unique feel, combined with all the advantages of a uPVC window: this is what the new, impressive woodec surface for aluplast window and door systems offers. Use this advantage for yourself and your customers!
                </p>
              </div>

              {/* Seamless vertical swatches board */}
              <div className="flex w-full h-[320px] md:h-[380px] rounded-2xl overflow-hidden shadow-xl border border-slate-200/60 bg-white">
                {[
                  { name: 'sheffield oak alpine', bg: '#cdbeab', desc: 'Pale Scandinavian timber grain' },
                  { name: 'sheffield oak concrete', bg: '#9f9284', desc: 'Cool concrete grey oak touch' },
                  { name: 'turner oak toffee', bg: '#b08754', desc: 'Rich honey oak woodgrain' },
                  { name: 'turner oak malt', bg: '#c5b095', desc: 'Sandy-malt natural wood' }
                ].map((lam, i) => {
                  const isLight = lam.name === 'sheffield oak alpine';
                  return (
                    <div 
                      key={i} 
                      className="group flex-1 hover:flex-[2.5] relative transition-all duration-500 ease-out cursor-pointer overflow-hidden border-r border-black/5 last:border-r-0 select-none"
                      style={{ backgroundColor: lam.bg }}
                    >
                      {/* Woodgrain visual lining overlay */}
                      <div className="absolute inset-0 bg-gradient-to-r from-black/5 via-transparent to-white/5 opacity-40 pointer-events-none" />
                      <div 
                        className="absolute inset-0 opacity-15 pointer-events-none"
                        style={{
                          backgroundImage: 'linear-gradient(to right, rgba(0,0,0,0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.04) 1px, transparent 1px)',
                          backgroundSize: '4px 100%'
                        }}
                      />
                      
                      {/* Vertical color label */}
                      <div className="absolute inset-0 flex items-end justify-center pb-8 md:pb-12 pointer-events-none z-10">
                        <span 
                          className={`text-[9px] md:text-[10px] font-black uppercase tracking-[0.25em] whitespace-nowrap transition-transform duration-500 group-hover:scale-105 ${
                            isLight ? 'text-slate-800/80 group-hover:text-slate-900' : 'text-white/80 group-hover:text-white'
                          }`}
                          style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
                        >
                          {lam.name}
                        </span>
                      </div>

                      {/* Hover Info cockpit overlay */}
                      <div className="absolute inset-x-0 bottom-0 p-5 bg-slate-950/80 backdrop-blur-md border-t border-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out flex flex-col justify-end z-20">
                        <span className="text-[7px] font-bold text-[#b08754] uppercase tracking-widest block mb-0.5">Woodgrain Surface</span>
                        <p className="text-white font-extrabold text-xs uppercase tracking-tight truncate">{lam.name.replace('sheffield ', '').replace('turner ', '')}</p>
                        <p className="text-slate-400 text-[8px] mt-0.5 leading-tight">{lam.desc}</p>
                        <span className="text-white/40 text-[7px] font-mono mt-1.5 block">{lam.bg.toUpperCase()}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>

          <p className="text-center text-slate-400 text-[10px] font-bold uppercase tracking-[0.15em] mt-16">
            ALL aluplast SYSTEMS OFFER SUPERIOR UV AND CLIMATE RESISTANCE · SAMPLE SWATCHES AVAILABLE
          </p>

        </div>
      </section>

      {/* ── aluplast Partnership & Manufacturing Unit Banner ────────────────── */}
      <section className="py-20 md:py-24 bg-white relative overflow-hidden border-b border-slate-200">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(0,95,184,0.03)_0%,transparent_50%)] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Left Column: Corporate & Partnership Content */}
            <div className="lg:col-span-7 flex flex-col justify-center">
              <span className="text-xs font-bold text-electric-blue uppercase tracking-widest block mb-4">Official aluplast Partnership</span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 uppercase tracking-tight mb-6 leading-tight">
                German Technology <br className="hidden md:inline" />
                <span className="text-electric-blue">Made for the Indian Climate</span>
              </h2>
              <div className="w-16 h-[3px] bg-electric-blue mb-8" />
              
              <p className="text-slate-500 text-sm md:text-base leading-relaxed mb-6">
                Srikala Projects is proud to partner with <strong>aluplast GmbH</strong>, a global leader in uPVC window and door systems. Headquartered in Karlsruhe, Germany and founded in 1982 by Manfred J. Seitz, aluplast operates 24+ production sites worldwide.
              </p>
              
              <p className="text-slate-500 text-sm md:text-base leading-relaxed mb-8">
                Every aluplast profile we fabricate is extruded using advanced tropicalized formulations at their state-of-the-art extrusion plant in <strong>Savli, Vadodara, Gujarat</strong>. Engineered specifically to withstand the extreme Indian monsoon, intense wind loads, and heavy UV exposure, our systems guarantee long-lasting performance and structural longevity.
              </p>

              {/* Technical badges grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                <div className="bg-slate-50 border border-slate-200/60 p-4 rounded-lg">
                  <span className="text-slate-400 text-[9px] font-bold uppercase tracking-wider block mb-1">Extrusion Plant</span>
                  <span className="font-extrabold text-slate-800 text-xs block">Savli GIDC, Gujarat</span>
                </div>
                <div className="bg-slate-50 border border-slate-200/60 p-4 rounded-lg">
                  <span className="text-slate-400 text-[9px] font-bold uppercase tracking-wider block mb-1">Global Heritage</span>
                  <span className="font-extrabold text-slate-800 text-xs block">Karlsruhe, Germany</span>
                </div>
                <div className="bg-slate-50 border border-slate-200/60 p-4 rounded-lg">
                  <span className="text-slate-400 text-[9px] font-bold uppercase tracking-wider block mb-1">Indian Market</span>
                  <span className="font-extrabold text-slate-800 text-xs block">Mivan Comp. Profiles</span>
                </div>
              </div>
            </div>

            {/* Right Column: Factory Image Frame */}
            <div className="lg:col-span-5 relative group">
              <div className="absolute -inset-2 bg-gradient-to-tr from-blue-600/10 to-emerald-600/10 rounded-2xl blur-xl group-hover:scale-105 transition-transform duration-500" />
              <div className="relative bg-white border border-slate-200 p-3 rounded-2xl shadow-xl overflow-hidden">
                <img 
                  src="/images/aluplast-factory-savli.png" 
                  alt="aluplast India Savli Vadodara Extrusion Plant" 
                  className="w-full h-80 object-cover rounded-xl group-hover:scale-[1.02] transition-transform duration-500"
                />
                <div className="absolute inset-x-3 bottom-3 p-4 bg-slate-900/80 backdrop-blur-sm rounded-b-xl border-t border-white/10">
                  <p className="text-white text-[11px] font-black uppercase tracking-wider">aluplast India Extrusion Plant</p>
                  <p className="text-white/60 text-[9px] mt-0.5">Plot No. 730-A, GIDC Savli, Vadodara, Gujarat</p>
                </div>
              </div>
            </div>

          </div>

          {/* Showrooms sub-grid */}
          <div className="mt-20 pt-16 border-t border-slate-100">
            <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-8 text-center">Experience Our Products in Person</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <div className="bg-slate-50/80 border border-slate-200/60 p-6 rounded-xl flex gap-4 hover:shadow-md transition-shadow">
                <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center shrink-0 border border-blue-100">
                  <span className="text-electric-blue font-bold text-sm">DL</span>
                </div>
                <div>
                  <h4 className="font-extrabold text-slate-800 text-xs uppercase tracking-wide mb-1">Delhi Showroom</h4>
                  <p className="text-slate-500 text-[11px] leading-relaxed mb-2">
                    Unit no. 29 & 30, Ground Floor, ABW Rectangle One, D-4 Saket, Block M, New Delhi - 110017
                  </p>
                  <span className="text-[9px] font-mono text-[#005fb8]">Toll Free: 1800 233 477</span>
                </div>
              </div>

              <div className="bg-slate-50/80 border border-slate-200/60 p-6 rounded-xl flex gap-4 hover:shadow-md transition-shadow">
                <div className="w-10 h-10 rounded-lg bg-emerald-50 flex items-center justify-center shrink-0 border border-emerald-100">
                  <span className="text-emerald-700 font-bold text-sm">BLR</span>
                </div>
                <div>
                  <h4 className="font-extrabold text-slate-800 text-xs uppercase tracking-wide mb-1">Bengaluru Showroom</h4>
                  <p className="text-slate-500 text-[11px] leading-relaxed mb-2">
                    Unit no. 302, 3rd Floor, Eva Mall, 60, Brigade Road, Bengaluru - 560 025
                  </p>
                  <span className="text-[9px] font-mono text-emerald-700">Email: info.in@aluplast.net</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>


    </PageWrapper>
  );
}
