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
const HERO_SLIDES = [
  {
    image: '/images/home.jpeg',
    title: 'BUILDING THE FUTURE',
    desc: 'Precision-engineered steel structures and structural frameworks for the modern industrial landscape.'
  },
  {
    image: '/images/pre-engineered.png',
    title: 'PRE-ENGINEERED BUILDINGS',
    desc: 'Optimized PEB structural frames designed for maximum space utilization and robust load statics.'
  },
  {
    image: '/images/heavy-fabrication.png',
    title: 'HEAVY FABRICATION',
    desc: 'Precision fabrication and welding of heavy industrial steel blocks and complex girders.'
  },
  {
    image: '/images/structural-glazing.png',
    title: 'STRUCTURAL GLAZING',
    desc: 'High-performance glass facades and structural glazing solutions that combine aesthetics with strength.'
  },
  {
    image: '/images/upvc-hero-luxury.png',
    title: 'LUXURY uPVC SYSTEMS',
    desc: 'Premium uPVC window and door systems fabricated to standard international weather tightness.'
  }
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
  const [prevImageIndex, setPrevImageIndex] = useState(-1);
  const [direction, setDirection] = useState<'next' | 'prev'>('next');

  const nextSlide = () => {
    setDirection('next');
    setPrevImageIndex(currentImageIndex);
    setCurrentImageIndex((prev) => (prev + 1) % HERO_SLIDES.length);
  };

  const prevSlide = () => {
    setDirection('prev');
    setPrevImageIndex(currentImageIndex);
    setCurrentImageIndex((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 7000);
    return () => clearInterval(timer);
  }, [currentImageIndex]);

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
        yPercent: -15,
        scale: 1.06,
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
      <section className="relative h-screen w-full flex items-start pt-32 md:pt-40 -mt-16 bg-slate-950" id="hero">
        
        <style>{`
          @keyframes kenburns {
            0% { transform: scale(1) translate(0, 0); }
            50% { transform: scale(1.08) translate(0.5%, -0.5%); }
            100% { transform: scale(1) translate(0, 0); }
          }
          @keyframes slideInUp {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .animate-slide-up {
            animation: slideInUp 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
          }
        `}</style>

        {/* Dynamic Image Slideshow with Parallax/Ken-Burns Zoom */}
        <div ref={heroImageRef} className="absolute inset-0 w-full h-full overflow-hidden select-none pointer-events-none z-0">
          {HERO_SLIDES.map((slide, idx) => {
            const isActive = idx === currentImageIndex;
            const isPrev   = idx === prevImageIndex;
            
            let translationClass = 'translate-x-full opacity-0 z-0';
            if (isActive) {
              translationClass = 'translate-x-0 opacity-100 z-10';
            } else if (isPrev) {
              translationClass = direction === 'next' ? '-translate-x-full opacity-0 z-0' : 'translate-x-full opacity-0 z-0';
            } else {
              translationClass = idx > currentImageIndex ? 'translate-x-full opacity-0 z-0' : '-translate-x-full opacity-0 z-0';
            }

            return (
              <img
                key={slide.image}
                className={`absolute inset-0 w-full h-full object-cover transform transition-all duration-[1200ms] ease-out ${translationClass}`}
                style={{
                  transition: 'transform 1.2s cubic-bezier(0.16, 1, 0.3, 1), opacity 1.2s ease-in-out',
                  animation: isActive ? 'kenburns 24s ease-in-out infinite' : 'none',
                  willChange: 'opacity, transform',
                }}
                src={slide.image}
                alt="Srikala Engineering Project Facade"
                loading={idx === 0 ? "eager" : "lazy"}
              />
            );
          })}
        </div>

        <div ref={heroOverlayRef} className="absolute inset-0 bg-slate-950/70 z-0" />

        {/* Left & Right Manual Slide Navigation Controls */}
        {/* Left & Right Manual Slide Navigation Controls */}
        <button 
          onClick={prevSlide}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-20 w-12 h-14 flex items-center justify-center text-white bg-slate-950/75 hover:bg-electric-blue hover:text-white transition-all duration-300 font-mono text-lg rounded-none group active:scale-95 shadow-lg border-y border-r border-white/5"
          aria-label="Previous Slide"
        >
          <span className="transform group-hover:-translate-x-0.5 transition-transform">←</span>
        </button>
        <button 
          onClick={nextSlide}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-20 w-12 h-14 flex items-center justify-center text-white bg-slate-950/75 hover:bg-electric-blue hover:text-white transition-all duration-300 font-mono text-lg rounded-none group active:scale-95 shadow-lg border-y border-l border-white/5"
          aria-label="Next Slide"
        >
          <span className="transform group-hover:translate-x-0.5 transition-transform">→</span>
        </button>

        {/* Hero Slider Content with state-keyed transitions */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full pt-10">
          <div ref={heroContentRef} className="max-w-3xl text-left">
            <div 
              key={currentImageIndex} 
              className="animate-slide-up"
            >
              <h1
                ref={heroTitleRef}
                className="text-4xl sm:text-6xl md:text-[76px] font-oswald font-bold text-white mb-5 md:mb-7 uppercase tracking-tight leading-[1]"
              >
                {HERO_SLIDES[currentImageIndex].title}
              </h1>
              <p className="w-full max-w-[600px] text-base md:text-[17.5px] text-slate-200 mb-8 md:mb-12 leading-relaxed">
                {HERO_SLIDES[currentImageIndex].desc}
              </p>
            </div>
            
            <div className="hero-animate flex flex-wrap gap-3 md:gap-4 mt-4">
              <button
                ref={heroCTARef}
                onClick={() => navigate('/contact')}
                className="rounded-none bg-electric-blue text-white font-oswald font-bold tracking-widest px-8 md:px-10 py-4 text-xs uppercase hover:bg-blue-600 hover:text-white hover:scale-105 active:scale-95 transition-all duration-200 shadow-lg flex items-center gap-2.5"
              >
                GET QUOTE <ArrowRight className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => navigate('/solutions')}
                className="rounded-none border-2 border-white/70 backdrop-blur-sm text-white font-oswald font-bold tracking-widest px-8 md:px-10 py-4 text-xs uppercase hover:bg-electric-blue hover:border-electric-blue hover:scale-105 active:scale-95 transition-all duration-200 flex items-center gap-2.5 bg-transparent"
              >
                EXPLORE SERVICES <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
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
