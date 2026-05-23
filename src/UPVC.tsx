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
    id: 'sliding',
    name: 'Sliding Profile',
    tagline: '54 mm · 2-Track & 3-Track',
    desc: 'Our sliding uPVC profile system is built for smooth horizontal operation. Ideal for large openings where swing space is limited. Available in 2-track and 3-track configurations with reinforced steel bar support for wind resistance up to 2 kPa.',
    specs: [
      { label: 'Construction Depth', value: '54 mm' },
      { label: 'Wind Resistance', value: 'Up to 2 kPa' },
      { label: 'Max Width', value: '2.2 m' },
      { label: 'Max Height', value: '2.1 m' },
      { label: 'Glazing Thickness', value: 'Up to 11 mm' },
      { label: 'Track Options', value: '2-track / 3-track' },
    ],
    features: [
      'Suitable for windows and sliding doors',
      '2-track and 3-track configurations',
      'Reinforced steel static bar for rigidity',
      'Smooth stainless steel rollers',
      'Anti-lift security locks',
      'Low maintenance uPVC construction',
    ],
    img: '/images/profile-sliding.png',
  },
  {
    id: 'casement',
    name: 'Casement Profile',
    tagline: '54 mm · 3-Chamber System',
    desc: 'Our 3-chamber casement profile is engineered for outward open windows. The multi-chamber design delivers superior thermal performance and accommodates glazing up to 24 mm — ideal for India\'s diverse climatic conditions.',
    specs: [
      { label: 'Construction Depth', value: '54 mm' },
      { label: 'Profile System', value: '3-Chamber' },
      { label: 'Glazing Thickness', value: 'Up to 24 mm' },
      { label: 'Application', value: 'Outward Open Windows' },
      { label: 'Glazing Beads', value: 'Compatible' },
      { label: 'Finish', value: 'Tropical White' },
    ],
    features: [
      '3-chamber system for superior thermal performance',
      'Best suited for outward open casement windows',
      'Accommodates glass up to 24 mm thickness',
      'Compatible with existing glazing beads',
      'Engineered for Indian climatic conditions',
      'Compatible with Mivan Construction technology',
    ],
    img: '/images/profile-casement.png',
  },
  {
    id: 'villa',
    name: 'Villa Profile',
    tagline: '62 mm · Double Sash System',
    desc: 'Our premium villa frame profile features a unique double-sash chamber engineered to house a glass pane, insect mesh screen, and an integrated structural steel grill, achieving ultimate safety in luxury bungalows.',
    specs: [
      { label: 'Construction Depth', value: '62 mm' },
      { label: 'Profile Chambers', value: '5-Chamber Core' },
      { label: 'Grill Support', value: 'Integrated Steel' },
      { label: 'Glazing Thickness', value: 'Up to 24 mm' },
      { label: 'Mesh Integration', value: 'Dedicated Slot' },
      { label: 'Monsoon Seal', value: 'Triple EPDM' },
    ],
    features: [
      'Built-in secure structural grill adapters',
      'Dual independent sashes for mesh & glass sashes',
      'Advanced 5-chamber noise and thermal core',
      'EPDM triple compression rain weather-seals',
      'Highly resistant to tropical wind load dynamics',
      'Luxurious Timber lamination matching teakwood',
    ],
    img: '/images/profile-villa.png',
  },
  {
    id: 'bifold',
    name: 'Slide & Fold Profile',
    tagline: '74 mm · Heavy-Duty Multi-Pane',
    desc: 'Designed for grand openings, our bi-fold profile utilizes an advanced heavy-duty bottom track sliding guide roller system that allows multiple glass panels to fold flat against the wall, creating wide open rooms.',
    specs: [
      { label: 'Construction Depth', value: '74 mm' },
      { label: 'Max Panel Load', value: '120 kg' },
      { label: 'Glazing Thickness', value: 'Up to 32 mm' },
      { label: 'Folding Panel Limit', value: 'Up to 7 Panels' },
      { label: 'Hinge Hardware', value: 'Stainless Steel' },
      { label: 'Profile System', value: 'Multi-Chamber' },
    ],
    features: [
      'Supports massive grand-opening apertures',
      'Heavy-duty bottom-hung guide track system',
      'Fold sashes flat to completely enlarge rooms',
      'Accommodates heavy double/triple glaze layers',
      'Smooth architectural sliding guide rollers',
      'Advanced wind-load structural couplings',
    ],
    img: '/images/profile-bifold.png',
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
const LAMINATIONS = [
  { name: 'Walnut',           bg: '#7c4d30' },
  { name: 'Dark Oak',         bg: '#352317' },
  { name: 'Mahogany',         bg: '#57222b' },
  { name: 'Golden Oak',       bg: '#c58737' },
  { name: 'Asian Ivory White',bg: '#f7f4ec' },
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
              <button onClick={() => document.getElementById('upvc-what')?.scrollIntoView({ behavior: 'smooth' })} className="border-2 border-white/50 text-white px-8 md:px-10 py-3 md:py-4 text-xs font-bold uppercase tracking-widest hover:bg-white/10 transition-all duration-200">LEARN MORE</button>
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
      <section className="py-20 md:py-24 bg-slate-50" id="upvc-lamination">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          
          <div className="text-center mb-14">
            <span className="text-[11px] font-bold text-electric-blue uppercase tracking-[0.2em] block mb-2">SURFACE FINISHES</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 uppercase tracking-wide mb-4">LAMINATION OPTIONS</h2>
            <div className="w-16 h-[3px] bg-electric-blue mx-auto mb-6" />
            <p className="text-slate-500 max-w-3xl mx-auto text-sm md:text-base leading-relaxed">
              We offer a range of lamination &amp; texture options — natural wood finish in Golden Oak, Walnut, Dark Oak, Mahogany, or simply Asian Ivory White.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8 max-w-5xl mx-auto justify-center mb-10">
            {LAMINATIONS.map((lam, i) => (
              <div key={i} className="flex flex-col items-center gap-4">
                <div 
                  className={`w-full aspect-square max-w-[160px] rounded-2xl shadow-md hover:shadow-lg hover:scale-[1.03] transition-all duration-300 ${
                    lam.name === 'Asian Ivory White' ? 'border border-slate-200/80' : 'border border-black/5'
                  }`}
                  style={{ backgroundColor: lam.bg }} 
                />
                <span className="text-[10px] font-black text-slate-800 uppercase tracking-widest text-center px-1">
                  {lam.name}
                </span>
              </div>
            ))}
          </div>

          <p className="text-center text-slate-400 text-[10px] font-bold uppercase tracking-[0.15em] mt-12">
            CUSTOM LAMINATION OPTIONS AVAILABLE ON REQUEST · CONTACT US FOR SAMPLES
          </p>

        </div>
      </section>

      {/* ── What is uPVC ──────────────────────────────────────────────────── */}
      <section className="py-20 md:py-24 bg-white" id="upvc-what">
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row gap-12 md:gap-16 items-center">
          <div className="flex-1">
            <span className="text-xs font-bold text-electric-blue uppercase tracking-widest block mb-4">About the Material</span>
            <h2 className="text-3xl md:text-4xl font-bold uppercase tracking-tighter mb-6 leading-none">What is uPVC?</h2>
            <p className="text-slate-500 text-base md:text-lg mb-5 border-l-2 border-electric-blue pl-5 leading-relaxed">
              uPVC stands for <strong>Unplasticised Polyvinyl Chloride</strong> — a rigid, high-performance plastic material used to manufacture windows, doors, and frames. Unlike regular PVC, uPVC contains no plasticisers, making it harder, stronger, and more durable.
            </p>
            <p className="text-slate-500 text-base leading-relaxed mb-5">
              uPVC profiles are engineered with multiple internal chambers that trap air, creating a natural thermal barrier. Steel reinforcement is inserted inside the profiles for structural strength, while the outer surface is UV-stabilised to resist discolouration and degradation.
            </p>
            <p className="text-slate-500 text-base leading-relaxed">
              The result is a window system that outperforms wood and aluminium in thermal efficiency, sound insulation, security, and longevity — with virtually zero maintenance required.
            </p>
          </div>
          <div className="flex-1 w-full grid grid-cols-2 gap-4">
            {[
              { label: 'Material', value: 'Unplasticised PVC' },
              { label: 'Chambers', value: '3 to 6 chambers' },
              { label: 'Reinforcement', value: 'Galvanised steel' },
              { label: 'Thermal Value', value: 'Uf ≤ 1.6 W/m²K' },
              { label: 'Sound Reduction', value: 'Up to 45 dB' },
              { label: 'Lifespan', value: '30–50 years' },
            ].map((s, i) => (
              <div key={i} className="bg-slate-50 border border-slate-100 px-5 py-4">
                <p className="text-[10px] uppercase tracking-widest text-slate-400 mb-1">{s.label}</p>
                <p className="font-black text-slate-900 text-sm">{s.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Why uPVC ──────────────────────────────────────────────────────── */}
      <section className="py-20 md:py-24 bg-slate-950 text-white" id="upvc-why">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center mb-14">
            <span className="text-xs font-bold text-electric-blue uppercase tracking-widest block mb-4">Benefits</span>
            <h2 className="text-3xl md:text-4xl font-bold uppercase tracking-widest mb-4">Why Choose uPVC?</h2>
            <div className="w-16 h-1 bg-electric-blue mx-auto mb-6" />
            <p className="text-slate-400 max-w-2xl mx-auto text-base leading-relaxed">
              uPVC windows and doors outperform wood and aluminium across every metric — thermal efficiency, security, durability, and cost of ownership.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {WHY_UPVC.map((w, i) => (
              <div key={i} className="p-6 border border-white/10 hover:border-electric-blue transition-all duration-300 group">
                <w.icon className="w-7 h-7 text-electric-blue mb-4 group-hover:scale-110 transition-transform duration-300" />
                <h4 className="text-sm font-bold uppercase tracking-tight mb-2">{w.title}</h4>
                <p className="text-xs text-slate-400 leading-relaxed">{w.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </PageWrapper>
  );
}
