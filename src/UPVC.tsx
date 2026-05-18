import React, { useRef, useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowRight, CheckCircle2, Thermometer, Shield, Wind, Layers,
  ChevronLeft, ChevronRight, ExternalLink, Maximize2, Ruler, Volume2
} from 'lucide-react';
import { PageWrapper } from './components/Shared';
import { useGSAP } from './lib/useGSAP';
import { scrollReveal, textStagger, ambient } from './lib/animations';
import { textReveal, magnetic } from './lib/stunningAnimations';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// ─── Product Lines (from aluplast documents) ──────────────────────────────────
const PRODUCTS = [
  {
    id: 'prima-slide',
    name: 'prima-slide',
    tagline: 'Robust Sliding Series',
    badge: 'Made in India',
    desc: 'The Aluplast Prima Sliding Series is designed for residential and commercial applications requiring robust sliding window solutions. It offers reliable performance under wind loads while maintaining ease of operation and aesthetic appeal.',
    specs: [
      { label: 'Construction Depth', value: '54 mm' },
      { label: 'Wind Pressure Resistance', value: 'Up to 2 kPa' },
      { label: 'Max Width', value: '2.2 m' },
      { label: 'Max Height', value: '2.1 m' },
      { label: 'Glazing Thickness', value: 'Up to 11 mm' },
      { label: 'Track Options', value: '2-track / 3-track' },
    ],
    features: [
      'Suitable for both windows and doors',
      'Available in 2-track and 3-track with additional track option',
      'Additional static bar support for enhanced rigidity',
      'High-quality uPVC profiles — durable, thermally efficient, low maintenance',
      '2 mm thick reinforced steel static bar for structural support',
      'Good resistance to wind load',
    ],
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB3pBe9jBFlkTEdFU2gFCqYYZqyhCQ7jahlbJH1vCC9pjTFsPbUFft2mPKx_6ArATke7P3ar8YCFWcjR1SKONNb4HCFp0CXGKtDD-P6vIl8bU40eTTMcICvs4eUGF3sx7uhJXc6Tn-T3aoMevSxcIkahhFxdin3C5E6BWnfeI87H1tMJl3Zt4viRzp1KUXh3m4zfHz5HpBOycAJB4KSrN12uWmQecLiRiZWcM3jQX1VDBFj_ep1Ffx7GH0B1s3TBh-tJsz3mcvYxdc',
    color: 'bg-slate-950',
  },
  {
    id: 'ideal-1000',
    name: 'IDEAL 1000',
    tagline: 'Outward Open Window System',
    badge: 'Made in India',
    desc: 'The IDEAL 1000 is a 54 mm 3-chamber profile system engineered for outward open windows. Designed and manufactured in India for Indian climatic conditions, it delivers durability, minimal maintenance, and energy efficiency.',
    specs: [
      { label: 'Construction Depth', value: '54 mm' },
      { label: 'Profile System', value: '3-Chamber' },
      { label: 'Glazing Thickness', value: 'Up to 24 mm' },
      { label: 'Application', value: 'Outward Open Windows' },
      { label: 'Glazing Beads', value: 'Compatible' },
      { label: 'Finish', value: 'Tropical White' },
    ],
    features: [
      '3-chamber profile system for superior thermal performance',
      'Good choice for outward open windows',
      'Accommodates glass up to 24 mm thickness',
      'Suitable with existing glazing beads',
      'Engineered for diverse Indian climatic conditions',
      'Compatible with Mivan Construction technology',
    ],
    img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=900&q=80',
    color: 'bg-white',
  },
];

// ─── Why aluplast (partner info from brochure) ────────────────────────────────
const PARTNER_FACTS = [
  { value: '1982', label: 'Founded' },
  { value: '24+', label: 'Production Sites Worldwide' },
  { value: 'Made in India', label: 'For Indian Market' },
  { value: 'ISO', label: 'Quality Standards' },
];

// ─── Core capabilities ────────────────────────────────────────────────────────
const CAPABILITIES = [
  {
    icon: Thermometer,
    title: 'Thermal Efficiency',
    desc: 'Multi-chamber uPVC profiles trap air to reduce heat transfer. IDEAL 1000 achieves Uf = 1.6 W/m²K, cutting energy costs year-round.',
  },
  {
    icon: Shield,
    title: 'Structural Rigidity',
    desc: 'Galvanized steel reinforcement (2 mm thick) inside prima-slide profiles provides enhanced rigidity and stability under wind loads up to 2 kPa.',
  },
  {
    icon: Wind,
    title: 'Wind Load Resistance',
    desc: 'Prima-slide withstands wind pressure up to 2 kPa with an additional static bar support incorporated into the design.',
  },
  {
    icon: Volume2,
    title: 'Sound Insulation',
    desc: 'Double and triple-glazed options available. IDEAL 4000 range achieves up to 45 dB sound insulation (class 4).',
  },
  {
    icon: Maximize2,
    title: 'Dimensional Flexibility',
    desc: 'Prima-slide supports max width 2.2 m × height 2.1 m. Available in 2-track and 3-track configurations for any opening.',
  },
  {
    icon: Layers,
    title: 'Design Versatility',
    desc: 'Available in woodec (wood-look) and aludec (aluminium-look) surface finishes. Numerous decor foils and colour options.',
  },
];

// ─── Lamination Options ───────────────────────────────────────────────────────
const LAMINATIONS = [
  {
    name: 'Walnut',
    color: '#7B3F1E',
    gradient: 'linear-gradient(135deg, #8B4513 0%, #6B3410 40%, #7B3F1E 70%, #9B5523 100%)',
    texture: 'repeating-linear-gradient(90deg, rgba(0,0,0,0.03) 0px, rgba(0,0,0,0) 2px, rgba(0,0,0,0.02) 4px)',
  },
  {
    name: 'Dark Oak',
    color: '#3B1F0E',
    gradient: 'linear-gradient(135deg, #2C1503 0%, #3B1F0E 40%, #4A2810 70%, #2C1503 100%)',
    texture: 'repeating-linear-gradient(90deg, rgba(255,255,255,0.02) 0px, rgba(0,0,0,0) 2px, rgba(255,255,255,0.01) 4px)',
  },
  {
    name: 'Mahogany',
    color: '#4A1C2C',
    gradient: 'linear-gradient(135deg, #5C1F2E 0%, #4A1C2C 40%, #3D1525 70%, #5C1F2E 100%)',
    texture: 'repeating-linear-gradient(90deg, rgba(0,0,0,0.03) 0px, rgba(0,0,0,0) 3px, rgba(0,0,0,0.02) 5px)',
  },
  {
    name: 'Golden Oak',
    color: '#B8732A',
    gradient: 'linear-gradient(135deg, #C8832A 0%, #B8732A 40%, #A86320 70%, #C8832A 100%)',
    texture: 'repeating-linear-gradient(90deg, rgba(0,0,0,0.03) 0px, rgba(0,0,0,0) 2px, rgba(0,0,0,0.02) 4px)',
  },
  {
    name: 'Asian Ivory White',
    color: '#F5F0E8',
    gradient: 'linear-gradient(135deg, #FAF7F2 0%, #F5F0E8 50%, #EDE8E0 100%)',
    texture: '',
  },
];
// ─────────────────────────────────────────────────────────────────────────────

// ─── Window Types Grid ────────────────────────────────────────────────────────
const WINDOW_TYPES = [
  {
    num: '01',
    title: 'uPVC Casement Windows',
    desc: 'Reliable, energy-efficient, and versatile, casement windows offer maximum ventilation and superior security.',
    img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80',
  },
  {
    num: '02',
    title: 'uPVC French Windows',
    desc: 'Elegant and timeless, French windows bring natural light and a classic touch to your home\'s design.',
    img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80',
  },
  {
    num: '03',
    title: 'uPVC Sliding Windows',
    desc: 'Sleek and space-saving, sliding windows provide smooth operation and modern aesthetics for any room.',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB3pBe9jBFlkTEdFU2gFCqYYZqyhCQ7jahlbJH1vCC9pjTFsPbUFft2mPKx_6ArATke7P3ar8YCFWcjR1SKONNb4HCFp0CXGKtDD-P6vIl8bU40eTTMcICvs4eUGF3sx7uhJXc6Tn-T3aoMevSxcIkahhFxdin3C5E6BWnfeI87H1tMJl3Zt4viRzp1KUXh3m4zfHz5HpBOycAJB4KSrN12uWmQecLiRiZWcM3jQX1VDBFj_ep1Ffx7GH0B1s3TBh-tJsz3mcvYxdc',
  },
  {
    num: '04',
    title: 'uPVC Fixed Windows',
    desc: 'Perfect for framing views, fixed windows provide natural light and modern aesthetic without compromising insulation.',
    img: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=600&q=80',
  },
  {
    num: '05',
    title: 'uPVC Bay Windows',
    desc: 'Add elegance and extra space to your home with our stylish and functional bay windows.',
    img: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&q=80',
  },
  {
    num: '06',
    title: "uPVC Tilt 'n' Turn Windows",
    desc: "Innovative and flexible, tilt-and-turn windows offer easy ventilation control and enhanced security.",
    img: 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=600&q=80',
  },
  {
    num: '07',
    title: 'uPVC Arched Windows',
    desc: 'Elevate your home\'s aesthetic with beautifully designed arch windows that bring timeless charm.',
    img: 'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=600&q=80',
  },
  {
    num: '08',
    title: 'uPVC Awning Windows',
    desc: 'Ideal for ventilation, our awning windows offer protection from rain while allowing fresh air.',
    img: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=600&q=80',
  },
  {
    num: '09',
    title: 'uPVC Ventilator Windows',
    desc: 'Ensure continuous airflow with our durable and efficient ventilators designed for modern homes.',
    img: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&q=80',
  },
];
// ─────────────────────────────────────────────────────────────────────────────

// ─── Gallery slides ────────────────────────────────────────────────────────────
const GALLERY = [
  {
    src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB3pBe9jBFlkTEdFU2gFCqYYZqyhCQ7jahlbJH1vCC9pjTFsPbUFft2mPKx_6ArATke7P3ar8YCFWcjR1SKONNb4HCFp0CXGKtDD-P6vIl8bU40eTTMcICvs4eUGF3sx7uhJXc6Tn-T3aoMevSxcIkahhFxdin3C5E6BWnfeI87H1tMJl3Zt4viRzp1KUXh3m4zfHz5HpBOycAJB4KSrN12uWmQecLiRiZWcM3jQX1VDBFj_ep1Ffx7GH0B1s3TBh-tJsz3mcvYxdc',
    label: 'prima-slide Installation',
    caption: 'Aluplast prima-slide — robust 2-track sliding system for residential & commercial facades.',
  },
  {
    src: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1400&q=80',
    label: 'IDEAL 1000 Casement',
    caption: 'IDEAL 1000 outward open windows — 54 mm 3-chamber system, glazing up to 24 mm.',
  },
  {
    src: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1400&q=80',
    label: 'Commercial Project',
    caption: 'Large-scale commercial installation with prima-slide 3-track configuration.',
  },
  {
    src: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1400&q=80',
    label: 'Hospitality Complex',
    caption: 'Sliding UPVC systems delivering comfort and aesthetics for resort guests.',
  },
];

// ── Image Slider Component ────────────────────────────────────────────────────
function ImageSlider() {
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);
  const trackRef   = useRef<HTMLDivElement>(null);
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
    gsap.fromTo(wrapperRef.current, { opacity: 0, y: 60 }, {
      opacity: 1, y: 0, duration: 1, ease: 'power3.out',
      scrollTrigger: { trigger: wrapperRef.current, start: 'top 85%', once: true },
    });
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
        {GALLERY.map((_, i) => (
          <button key={i} onClick={() => slideTo(i)} aria-label={`Go to slide ${i + 1}`}
            className={`h-1 rounded-full transition-all duration-500 ${i === current ? 'w-8 bg-electric-blue' : 'w-4 bg-white/30 hover:bg-white/60'}`} />
        ))}
      </div>
      <button onClick={prev} aria-label="Previous slide" className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-10 w-12 h-12 flex items-center justify-center border border-white/20 bg-slate-950/50 backdrop-blur-sm text-white hover:bg-electric-blue hover:border-electric-blue transition-all duration-300">
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button onClick={next} aria-label="Next slide" className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-10 w-12 h-12 flex items-center justify-center border border-white/20 bg-slate-950/50 backdrop-blur-sm text-white hover:bg-electric-blue hover:border-electric-blue transition-all duration-300">
        <ChevronRight className="w-5 h-5" />
      </button>
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
// ─────────────────────────────────────────────────────────────────────────────

export default function UPVC() {
  const navigate = useNavigate();

  const heroImageRef     = useRef<HTMLImageElement>(null);
  const heroOverlayRef   = useRef<HTMLDivElement>(null);
  const heroContentRef   = useRef<HTMLDivElement>(null);
  const heroTitleRef     = useRef<HTMLHeadingElement>(null);
  const heroCTARef       = useRef<HTMLButtonElement>(null);
  const productsTitleRef = useRef<HTMLDivElement>(null);
  const capsTitleRef     = useRef<HTMLDivElement>(null);
  const capsRef          = useRef<HTMLDivElement>(null);
  const partnerRef       = useRef<HTMLDivElement>(null);
  const ctaRef           = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (heroImageRef.current)   ambient.scale(heroImageRef.current, { from: 1, to: 1.12 });
    if (heroOverlayRef.current) ambient.fade(heroOverlayRef.current, { from: 0.65, to: 0.85 });
    if (heroContentRef.current) {
      const els = heroContentRef.current.querySelectorAll('.hero-animate');
      textStagger.fadeInUp(els, { stagger: 0.2, delay: 0.3 });
    }
    if (heroTitleRef.current) textReveal.splitChars(heroTitleRef.current, { stagger: 0.025, duration: 0.8, ease: 'back.out(1.7)', from: 'bottom' });
    if (heroCTARef.current) return magnetic.button(heroCTARef.current, 0.3);
    if (productsTitleRef.current) scrollReveal.fadeInUp(productsTitleRef.current);
    if (capsTitleRef.current) scrollReveal.fadeInUp(capsTitleRef.current);
    if (capsRef.current) textStagger.fadeInUp(capsRef.current.querySelectorAll('.cap-card'), { stagger: 0.1 });
    if (partnerRef.current) scrollReveal.scaleIn(partnerRef.current, { scale: 0.97, duration: 1 });
    if (ctaRef.current) scrollReveal.scaleIn(ctaRef.current, { scale: 0.95, duration: 1 });
  }, []);

  return (
    <PageWrapper>

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="relative h-screen w-full flex items-center overflow-hidden -mt-16" id="upvc-hero">
        <img ref={heroImageRef} className="absolute inset-0 w-full h-full object-cover will-change-transform"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuB3pBe9jBFlkTEdFU2gFCqYYZqyhCQ7jahlbJH1vCC9pjTFsPbUFft2mPKx_6ArATke7P3ar8YCFWcjR1SKONNb4HCFp0CXGKtDD-P6vIl8bU40eTTMcICvs4eUGF3sx7uhJXc6Tn-T3aoMevSxcIkahhFxdin3C5E6BWnfeI87H1tMJl3Zt4viRzp1KUXh3m4zfHz5HpBOycAJB4KSrN12uWmQecLiRiZWcM3jQX1VDBFj_ep1Ffx7GH0B1s3TBh-tJsz3mcvYxdc"
          alt="UPVC Window Systems" loading="eager" />
        <div ref={heroOverlayRef} className="absolute inset-0 bg-slate-950/70" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full">
          <div ref={heroContentRef} className="max-w-2xl">
            <span className="hero-animate text-electric-blue font-semibold tracking-[0.3em] uppercase mb-4 block text-xs">
              Authorised Fabricator · aluplast India
            </span>
            <h1 ref={heroTitleRef} className="text-5xl md:text-7xl font-bold text-white mb-6 uppercase tracking-tighter leading-none">
              uPVC Window & Door Systems
            </h1>
            <p className="hero-animate text-lg text-slate-300 mb-10 max-w-lg">
              We fabricate and install aluplast uPVC window and door systems — prima-slide and IDEAL 1000 —
              engineered in India for India's diverse climatic conditions.
            </p>
            <div className="hero-animate flex flex-wrap gap-4">
              <button ref={heroCTARef} onClick={() => navigate('/contact')}
                className="relative bg-electric-blue text-white px-10 py-4 text-xs font-bold uppercase tracking-widest hover:scale-105 transition-transform duration-200">
                GET QUOTE
              </button>
              <button onClick={() => document.getElementById('upvc-products')?.scrollIntoView({ behavior: 'smooth' })}
                className="border-2 border-white/50 backdrop-blur-sm text-white px-10 py-4 text-xs font-bold uppercase tracking-widest hover:bg-white/10 transition-all duration-200">
                VIEW PRODUCTS
              </button>
            </div>
          </div>
        </div>
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/40">
          <span className="text-[10px] uppercase tracking-widest">Scroll</span>
          <div className="w-px h-12 bg-white/20 animate-pulse" />
        </div>
      </section>

      {/* ── Partner Banner ────────────────────────────────────────────────── */}
      <section className="bg-electric-blue text-white py-5">
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <span className="text-[10px] uppercase tracking-widest text-white/70">Authorised Fabricator of</span>
            <span className="text-xl font-black tracking-tight">aluplast®</span>
            <span className="text-[10px] uppercase tracking-widest text-white/70">Kunststoff-Fenstersysteme</span>
          </div>
          <div className="flex flex-wrap gap-8">
            {PARTNER_FACTS.map((f, i) => (
              <div key={i} className="text-center">
                <div className="text-lg font-black">{f.value}</div>
                <div className="text-[10px] uppercase tracking-widest text-white/70">{f.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Product Lines ─────────────────────────────────────────────────── */}
      <section className="py-24 bg-white" id="upvc-products">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div ref={productsTitleRef} className="text-center mb-20">
            <span className="text-xs font-bold text-electric-blue uppercase tracking-widest block mb-4">Our Product Range</span>
            <h2 className="text-4xl font-bold uppercase tracking-widest mb-4">aluplast Systems We Install</h2>
            <div className="w-16 h-1 bg-electric-blue mx-auto mb-6" />
            <p className="text-slate-500 max-w-2xl mx-auto text-lg">
              We are authorised fabricators of aluplast India's "Made in India, Made for India" uPVC window and door systems —
              designed for India's diverse climatic conditions with stringent quality standards.
            </p>
          </div>

          <div className="space-y-32">
            {PRODUCTS.map((product, idx) => (
              <div key={product.id} id={product.id}
                className={`flex flex-col gap-12 group ${idx % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                {/* Image */}
                <div className="w-full md:w-1/2 relative overflow-hidden shadow-2xl h-[480px]">
                  <img src={product.img} alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 to-transparent" />
                  <div className="absolute top-6 left-6">
                    <span className="bg-electric-blue text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1">
                      {product.badge}
                    </span>
                  </div>
                  <div className="absolute bottom-6 left-6">
                    <p className="text-white/60 text-xs uppercase tracking-widest">{product.tagline}</p>
                    <h3 className="text-white text-3xl font-black uppercase tracking-tighter">{product.name}</h3>
                  </div>
                </div>

                {/* Content */}
                <div className="w-full md:w-1/2 flex flex-col justify-center">
                  <span className="text-xs font-bold text-electric-blue uppercase tracking-widest block mb-3">{product.tagline}</span>
                  <h3 className="text-4xl font-bold uppercase tracking-tighter mb-6 leading-none">{product.name}</h3>
                  <p className="text-slate-500 text-base mb-8 border-l-2 border-electric-blue pl-5 leading-relaxed">{product.desc}</p>

                  {/* Spec grid */}
                  <div className="grid grid-cols-2 gap-px bg-slate-100 border border-slate-100 mb-8">
                    {product.specs.map((s, i) => (
                      <div key={i} className="bg-white px-4 py-3">
                        <p className="text-[10px] uppercase tracking-widest text-slate-400 mb-1">{s.label}</p>
                        <p className="font-black text-slate-900 text-sm">{s.value}</p>
                      </div>
                    ))}
                  </div>

                  {/* Features */}
                  <ul className="space-y-2 mb-8">
                    {product.features.map((f, i) => (
                      <li key={i} className="flex items-start gap-3 text-slate-700">
                        <CheckCircle2 className="text-electric-blue w-4 h-4 shrink-0 mt-0.5" />
                        <span className="text-sm">{f}</span>
                      </li>
                    ))}
                  </ul>

                  <button onClick={() => navigate('/contact')}
                    className="w-fit flex items-center gap-2 bg-slate-950 text-white px-8 py-4 text-xs font-bold uppercase tracking-widest hover:bg-electric-blue transition-all duration-300">
                    GET A QUOTE <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Image Gallery Slider ──────────────────────────────────────────── */}
      <section id="upvc-gallery" className="bg-slate-50">
        <div className="max-w-7xl mx-auto px-6 md:px-12 pt-16 pb-6">
          <div className="flex items-end justify-between mb-8">
            <div>
              <span className="text-xs font-bold text-electric-blue uppercase tracking-widest block mb-2">Project Gallery</span>
              <h2 className="text-3xl font-bold uppercase tracking-widest">Our Work in Action</h2>
            </div>
            <div className="w-16 h-1 bg-electric-blue mb-1" />
          </div>
        </div>
        <ImageSlider />
      </section>

      {/* ── Window Types Grid ─────────────────────────────────────────────── */}
      <section className="py-24 bg-slate-50" id="upvc-types">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center mb-16">
            <span className="text-xs font-bold text-electric-blue uppercase tracking-widest block mb-4">Our Range</span>
            <h2 className="text-3xl md:text-4xl font-bold uppercase tracking-widest mb-4">
              We Manufacture All Types of uPVC Windows
            </h2>
            <div className="w-16 h-1 bg-electric-blue mx-auto mb-6" />
            <p className="text-slate-500 max-w-2xl mx-auto text-base leading-relaxed">
              uPVC windows come in a variety of styles to suit different needs, from maximizing ventilation
              to enhancing aesthetics. Each type is designed with unique features that combine durability,
              energy efficiency, and modern design.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {WINDOW_TYPES.map((w, idx) => (
              <div
                key={idx}
                className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg border border-slate-100 hover:border-electric-blue/30 transition-all duration-300 group"
              >
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={w.img}
                    alt={w.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                </div>

                {/* Content */}
                <div className="p-6">
                  <span className="text-slate-400 text-sm font-bold block mb-2">{w.num}</span>
                  <h3 className="text-base font-bold text-slate-900 mb-3 uppercase tracking-tight">{w.title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed mb-5">{w.desc}</p>
                  <button
                    onClick={() => navigate('/contact')}
                    className="bg-electric-blue text-white px-5 py-2 text-xs font-bold uppercase tracking-widest rounded hover:bg-blue-700 transition-colors duration-200"
                  >
                    Know More
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Lamination Options ────────────────────────────────────────────── */}
      <section className="py-24 bg-white" id="upvc-lamination">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center mb-16">
            <span className="text-xs font-bold text-electric-blue uppercase tracking-widest block mb-4">Surface Finishes</span>
            <h2 className="text-3xl md:text-4xl font-bold uppercase tracking-widest mb-4">Lamination</h2>
            <div className="w-16 h-1 bg-electric-blue mx-auto mb-6" />
            <p className="text-slate-500 max-w-2xl mx-auto text-base leading-relaxed">
              We offer a range of lamination &amp; texture options, including natural wood finish in
              Golden Oak, Walnut, Dark Oak or Mahogany — or simply an Asian Ivory White.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-10 md:gap-16">
            {LAMINATIONS.map((lam, idx) => (
              <div key={idx} className="flex flex-col items-center gap-4 group">
                {/* Swatch */}
                <div
                  className="w-36 h-36 md:w-44 md:h-44 rounded-lg shadow-md group-hover:shadow-xl group-hover:scale-105 transition-all duration-300 border border-black/10"
                  style={{ background: lam.gradient }}
                >
                  {/* Wood grain texture overlay */}
                  <div
                    className="w-full h-full rounded-lg opacity-60"
                    style={{ background: lam.texture }}
                  />
                </div>
                {/* Label */}
                <span className="text-sm font-bold text-slate-800 uppercase tracking-widest text-center">
                  {lam.name}
                </span>
              </div>
            ))}
          </div>

          {/* Note */}
          <p className="text-center text-slate-400 text-xs uppercase tracking-widest mt-12">
            Custom lamination options available on request · Contact us for samples
          </p>
        </div>
      </section>

      {/* ── Core Capabilities ─────────────────────────────────────────────── */}
      <section className="py-24 bg-slate-950 text-white" id="upvc-capabilities">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div ref={capsTitleRef} className="text-center mb-16">
            <span className="text-xs font-bold text-electric-blue uppercase tracking-widest block mb-4">Why Choose aluplast uPVC</span>
            <h2 className="text-3xl font-bold uppercase tracking-widest mb-4">Core Capabilities</h2>
            <div className="w-16 h-1 bg-electric-blue mx-auto" />
          </div>
          <div ref={capsRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {CAPABILITIES.map((cap, idx) => (
              <div key={idx} className="cap-card p-8 border border-white/10 hover:border-electric-blue transition-all duration-500 group">
                <cap.icon className="w-8 h-8 text-electric-blue mb-6 group-hover:scale-110 transition-transform duration-300" />
                <h4 className="text-lg font-bold mb-3 uppercase tracking-tight">{cap.title}</h4>
                <p className="text-sm text-slate-400 leading-relaxed">{cap.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── About aluplast Partner Section ────────────────────────────────── */}
      <section className="py-24 bg-white" id="upvc-partner">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div ref={partnerRef} className="flex flex-col md:flex-row gap-16 items-center">
            <div className="flex-1">
              <span className="text-xs font-bold text-electric-blue uppercase tracking-widest block mb-4">Our Technology Partner</span>
              <h2 className="text-4xl font-bold uppercase tracking-tighter mb-6 leading-none">
                Powered by<br /><span className="text-electric-blue">aluplast®</span>
              </h2>
              <p className="text-slate-500 text-lg mb-6 border-l-2 border-electric-blue pl-6 leading-relaxed">
                aluplast GmbH is one of the leading system providers of PVC windows, main entrance doors, roller shutters
                and controlled domestic ventilation systems. Founded in 1982, the family-owned company is headquartered
                in Karlsruhe, Germany with more than 24 production sites and sales offices worldwide.
              </p>
              <p className="text-slate-500 text-base mb-8 leading-relaxed">
                Their "Made in India, Made for India" uPVC windows and doors are committed to meeting stringent quality
                standards — known for durability, minimal maintenance, and energy efficiency. Engineered to excel in
                India's diverse climatic conditions, and compatible with Mivan Construction technology.
              </p>
              <a href="https://www.aluplast.net/in" target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 border border-slate-300 px-8 py-4 text-xs font-bold uppercase tracking-widest hover:bg-slate-950 hover:text-white hover:border-slate-950 transition-all duration-300">
                Visit aluplast India <ExternalLink className="w-4 h-4" />
              </a>
            </div>
            <div className="flex-1 grid grid-cols-2 gap-4">
              {[
                { title: 'prima-slide', sub: '54 mm · Sliding System · 2 kPa wind resistance' },
                { title: 'IDEAL 1000', sub: '54 mm · 3-Chamber · Up to 24 mm glazing' },
                { title: 'IDEAL 2000®', sub: '60 mm · Uf = 1.6 W/m²K · Up to 43 dB' },
                { title: 'IDEAL 4000®', sub: '70 mm · Uf = 1.3 W/m²K · Up to 45 dB' },
              ].map((p, i) => (
                <div key={i} className={`p-6 border ${i < 2 ? 'border-electric-blue bg-electric-blue/5' : 'border-slate-100 bg-slate-50'}`}>
                  <p className="font-black text-slate-900 text-lg mb-1">{p.title}</p>
                  <p className="text-xs text-slate-500 leading-relaxed">{p.sub}</p>
                  {i < 2 && <span className="mt-3 inline-block text-[10px] font-bold text-electric-blue uppercase tracking-widest">We Install This</span>}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────────── */}
      <section className="py-24 px-6" id="upvc-cta">
        <div ref={ctaRef} className="max-w-7xl mx-auto bg-slate-950 text-white p-12 md:p-20 relative overflow-hidden rounded-sm shadow-2xl">
          <div className="absolute top-0 right-0 w-1/2 h-full opacity-20 pointer-events-none bg-[radial-gradient(circle_at_center,_#2180ff_0%,transparent_70%)]" />
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-10">
            <div className="max-w-xl text-center md:text-left">
              <h2 className="text-4xl md:text-5xl font-bold uppercase mb-6 leading-tight">
                Ready to Upgrade<br />
                <span className="text-electric-blue">Your Facade?</span>
              </h2>
              <p className="text-slate-400 text-lg leading-relaxed">
                Talk to our uPVC specialists. We'll help you choose the right aluplast system —
                prima-slide or IDEAL 1000 — for your project requirements and budget.
              </p>
            </div>
            <button onClick={() => navigate('/contact')}
              className="bg-white text-slate-950 px-12 py-5 text-sm font-bold hover:bg-electric-blue hover:text-white hover:scale-105 transition-all duration-300 uppercase tracking-widest whitespace-nowrap">
              CONTACT US <ArrowRight className="inline-block ml-2 w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

    </PageWrapper>
  );
}
