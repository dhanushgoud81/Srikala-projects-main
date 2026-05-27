import React, { useRef, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Shield, Rocket, Truck, Verified, Square, Box, Factory, Layers, Grid3X3 } from 'lucide-react';
import { PageWrapper } from './components/Shared';
import { DivisionCard } from './components/DivisionCard';
import { CoreDivisionsHorizontal } from './components/CoreDivisionsHorizontal';
import { ScrollReadingText } from './components/ScrollReadingText';
import { PrecisionRulerAccent } from './components/PrecisionRulerAccent';
import { useGSAP } from './lib/useGSAP';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { parallax, ambient, scrollReveal, textStagger, animationUtils } from './lib/animations';
import { magnetic, textReveal, scrollEffects } from './lib/stunningAnimations';

gsap.registerPlugin(ScrollTrigger);

// ─── Static data outside component (no re-creation on render) ────────────────
const HERO_IMAGES = [
  '/images/home.jpeg',
  '/images/pre-engineered.png',
  '/images/heavy-fabrication.png',
  '/images/structural-glazing.png',
  '/images/upvc-hero-luxury.png'
];

const SERVICES = [
  {
    icon: Square,
    title: 'uPVC Windows & Doors',
    desc: 'Energy-efficient window and door systems for modern architectural aesthetics.',
    image: '/images/structural-glazing.png', // closest match available
  },
  {
    icon: Factory,
    title: 'Pre-Engineered Buildings',
    desc: 'Optimized PEB structural frames for maximum internal space utilization.',
    image: '/images/pre-engineered.png',
  },
  {
    icon: Box,
    title: 'Roofing Systems',
    desc: 'Advanced industrial roofing solutions with superior thermal insulation.',
    image: '/images/roofing-system.png',
  },
  {
    icon: Factory,
    title: 'Heavy Fabrication',
    desc: 'Precision steel fabrication for critical infrastructure components.',
    image: '/images/heavy-fabrication.png',
  },
  {
    icon: Layers,
    title: 'ACP Cladding',
    desc: 'High-grade aluminum composite panels for exterior environmental protection.',
    image: '/images/acp.png',
  },
  {
    icon: Grid3X3,
    title: 'Structural Glazing',
    desc: 'Sophisticated glass facade solutions that combine integrity with transparency.',
    image: '/images/structural-glazing.png',
  },
];

const PILLARS = [
  { icon: Verified, title: 'Quality Assurance',  desc: 'ISO certified manufacturing processes ensuring zero-defect outputs.' },
  { icon: Shield,   title: 'Tested Durability',  desc: 'Materials engineered to resist corrosion and structural fatigue.' },
  { icon: Rocket,   title: 'Innovation Driven',  desc: 'Continuous R&D in structural engineering for efficient solutions.' },
  { icon: Truck,    title: 'Timely Delivery',    desc: 'Lean logistics frameworks ensuring on-time project completion.' },
];

const STATS = [
  { val: 500, label: 'Projects Completed' },
  { val: 200, label: 'Global Clients'     },
  { val: 25,  label: 'Years Excellence'   },
];
// ─────────────────────────────────────────────────────────────────────────────

export default function Home() {
  const navigate = useNavigate();

  const heroImageRef    = useRef<HTMLDivElement>(null);
  const heroContentRef  = useRef<HTMLDivElement>(null);
  const heroOverlayRef  = useRef<HTMLDivElement>(null);
  const heroTitleRef    = useRef<HTMLHeadingElement>(null);
  const heroCTARef      = useRef<HTMLButtonElement>(null);
  const divisionsTitleRef = useRef<HTMLDivElement>(null);
  const statsRef        = useRef<HTMLDivElement>(null);
  const pillarsTitleRef = useRef<HTMLDivElement>(null);
  const pillarsRef      = useRef<HTMLDivElement>(null);
  const ctaRef          = useRef<HTMLDivElement>(null);

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  useGSAP(() => {
    // Pinned Hero Section scroll reveal effect (replicating Baumeister Qode Slider)
    ScrollTrigger.create({
      trigger: '#hero',
      start: 'top top',
      end: 'bottom top',
      pin: true,
      pinSpacing: false,
    });

    // Parallax & Fade timeline scrubbed on scroll
    const heroTl = gsap.timeline({
      scrollTrigger: {
        trigger: '#hero',
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      }
    });

    if (heroImageRef.current) {
      // Intended exit opacity fade
      gsap.fromTo(heroImageRef.current, { opacity: 0 }, { opacity: 1, duration: 1.5, ease: 'power2.out' });
      
      heroTl.to(heroImageRef.current, {
        yPercent: 20,
        scale: 0.96,
        ease: 'none'
      }, 0);
    }

    // Overlay fade
    if (heroOverlayRef.current) {
      ambient.fade(heroOverlayRef.current, { from: 0.7, to: 0.9 });
      
      heroTl.to(heroOverlayRef.current, {
        opacity: 0.95,
        ease: 'none'
      }, 0);
    }

    // Hero content stagger
    if (heroContentRef.current) {
      const els = heroContentRef.current.querySelectorAll('.hero-animate');
      textStagger.fadeInUp(els, { stagger: 0.2, delay: 0.3 });
      
      heroTl.to(heroContentRef.current, {
        y: -125,
        opacity: 0,
        ease: 'none'
      }, 0);
    }

    // Character-by-character title
    if (heroTitleRef.current) {
      textReveal.splitChars(heroTitleRef.current, {
        stagger: 0.02,
        duration: 0.8,
        ease: 'back.out(1.7)',
        from: 'bottom',
      });
    }

    // Magnetic CTA
    if (heroCTARef.current) {
      return magnetic.button(heroCTARef.current, 0.3);
    }

    // Divisions title
    if (divisionsTitleRef.current) {
      scrollReveal.fadeInUp(divisionsTitleRef.current);
    }

    // Stats
    if (statsRef.current) {
      const statItems = statsRef.current.querySelectorAll('.stat-item');
      textStagger.fadeInUp(statItems, { stagger: 0.2 });

      statsRef.current.querySelectorAll('.stat-number').forEach((num) => {
        const value = parseInt(num.getAttribute('data-value') ?? '0');
        animationUtils.counter(num as HTMLElement, { target: value, duration: 2, suffix: '+', start: 'top 80%' });
      });
    }

    // Pillars title
    if (pillarsTitleRef.current) {
      scrollReveal.fadeInUp(pillarsTitleRef.current);
    }

    // Pillars cards
    if (pillarsRef.current) {
      const cards = Array.from(pillarsRef.current.querySelectorAll('.pillar-card')) as HTMLElement[];
      scrollEffects.rotateFade(cards);
    }

    // CTA
    if (ctaRef.current) {
      scrollReveal.scaleIn(ctaRef.current, { scale: 0.95, duration: 1 });
    }
  }, []);

  return (
    <PageWrapper>
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="relative h-screen w-full flex items-center overflow-hidden -mt-16" id="hero">
        
        <style>{`
          @keyframes kenburns {
            0% { transform: scale(1) translate(0, 0); }
            50% { transform: scale(1.08) translate(0.5%, -0.5%); }
            100% { transform: scale(1) translate(0, 0); }
          }
        `}</style>

        {/* Dynamic Image Slideshow with Parallax/Ken-Burns Zoom */}
        <div ref={heroImageRef} className="absolute inset-0 w-full h-full overflow-hidden select-none pointer-events-none">
          {HERO_IMAGES.map((src, idx) => {
            const isActive = idx === currentImageIndex;
            return (
              <img
                key={src}
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-[2000ms] ease-in-out ${
                  isActive ? 'opacity-100' : 'opacity-0'
                }`}
                style={{
                  animation: isActive ? 'kenburns 24s ease-in-out infinite' : 'none',
                  willChange: 'opacity, transform',
                }}
                src={src}
                alt="Srikala Engineering Project Facade"
                loading={idx === 0 ? "eager" : "lazy"}
              />
            );
          })}
        </div>

        <div ref={heroOverlayRef} className="absolute inset-0 bg-slate-950/70" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full">
          <div ref={heroContentRef} className="max-w-2xl">
            <h1
              ref={heroTitleRef}
              className="text-4xl sm:text-5xl md:text-7xl font-bold text-white mb-4 md:mb-6 uppercase tracking-tighter leading-none"
            >
              Engineering Strength. Building Future.
            </h1>
            <p className="hero-animate text-base md:text-lg text-slate-300 mb-8 md:mb-10 max-w-lg">
              Precision-engineered solutions for the modern industrial landscape. We specialize in
              high-performance structures designed to withstand the test of time.
            </p>
            <div className="hero-animate flex flex-wrap gap-3 md:gap-4">
              <button
                ref={heroCTARef}
                onClick={() => navigate('/contact')}
                className="relative bg-electric-blue text-white px-7 md:px-10 py-3 md:py-4 text-xs font-bold uppercase tracking-widest hover:scale-105 transition-transform duration-200 overflow-hidden"
              >
                GET QUOTE
              </button>
              <button
                onClick={() => navigate('/solutions')}
                className="border-2 border-white/50 backdrop-blur-sm text-white px-7 md:px-10 py-3 md:py-4 text-xs font-bold uppercase tracking-widest hover:bg-white/10 transition-all duration-200"
              >
                EXPLORE SERVICES
              </button>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/40">
          <span className="text-[10px] uppercase tracking-widest">Scroll</span>
          <div className="w-px h-10 bg-white/20 animate-pulse" />
        </div>
      </section>

      {/* ── Core Divisions ───────────────────────────────────────────────── */}
      <CoreDivisionsHorizontal />

      {/* ── Stats ────────────────────────────────────────────────────────── */}
      <section className="py-24 bg-slate-950 text-white overflow-hidden" id="stats">
        <div className="max-w-7xl mx-auto px-6 md:px-12" ref={statsRef}>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 md:gap-12">
            {STATS.map((stat, idx) => (
              <div key={idx} className="stat-item border-l-2 border-electric-blue pl-6">
                <div
                  className="stat-number text-5xl md:text-6xl font-bold mb-2"
                  data-value={stat.val}
                >
                  {stat.val}+
                </div>
                <div className="text-[10px] uppercase tracking-widest text-slate-500">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>



      {/* ── Precision Pillars ────────────────────────────────────────────── */}
      <section className="py-24 bg-white" id="pillars">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div ref={pillarsTitleRef} className="text-center mb-12 md:mb-16">
            <h2 className="text-2xl md:text-3xl font-bold uppercase tracking-widest mb-4">Precision Pillars</h2>
            <PrecisionRulerAccent />
          </div>
          <div ref={pillarsRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {PILLARS.map((pillar, idx) => (
              <div
                key={idx}
                className="pillar-card p-6 md:p-8 border border-slate-100 hover:border-electric-blue transition-all duration-500 will-change-transform"
                style={{ transformStyle: 'preserve-3d' }}
              >
                <pillar.icon className="w-7 h-7 md:w-8 md:h-8 text-electric-blue mb-5 md:mb-6" />
                <h4 className="text-base md:text-lg font-bold mb-2 uppercase">{pillar.title}</h4>
                <p className="text-sm text-slate-500">{pillar.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────────── */}
      <section className="py-24 px-6" id="home-cta">
        <div
          ref={ctaRef}
          className="max-w-7xl mx-auto bg-slate-950 text-white p-8 md:p-20 relative overflow-hidden rounded-sm shadow-2xl"
        >
          <div className="absolute top-0 right-0 w-1/2 h-full opacity-20 pointer-events-none bg-[radial-gradient(circle_at_center,_#2180ff_0%,transparent_70%)]" />
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8 md:gap-10">
            <div className="max-w-xl text-center md:text-left">
              <h2 className="text-3xl md:text-5xl font-bold uppercase mb-4 md:mb-6 leading-tight">
                Let's Build Something <br />
                <span className="text-electric-blue">Strong Together</span>
              </h2>
              <ScrollReadingText className="text-base md:text-2xl leading-relaxed mt-3 md:mt-4">
                Consult with our engineering experts to turn your industrial vision into a structural reality.
              </ScrollReadingText>
            </div>
            <button
              onClick={() => navigate('/contact')}
              className="w-full md:w-auto bg-white text-slate-950 px-8 md:px-12 py-4 md:py-5 text-sm font-bold hover:bg-electric-blue hover:text-white hover:scale-105 transition-all duration-300 uppercase tracking-widest whitespace-nowrap"
            >
              CONTACT US <ArrowRight className="inline-block ml-2 w-4 h-4" />
            </button>
          </div>
        </div>
      </section>
    </PageWrapper>
  );
}
