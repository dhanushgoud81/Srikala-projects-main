import React, { useRef, useEffect, useState } from 'react';
import { 
  Box, Layers, Building2, Grid3X3, Square, HardHat, 
  CheckCircle2, ArrowRight, ShieldCheck, Flame, Compass, Wrench, Thermometer
} from 'lucide-react';
import { PageWrapper } from './components/Shared';
import { cn } from './lib/utils';
import { useGSAP } from './lib/useGSAP';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface SpecItem {
  label: string;
  value: string;
}

interface Solution {
  id: string;
  title: string;
  badge: string;
  icon: React.ComponentType<any>;
  desc: string;
  img: string;
  features: string[];
  specs: SpecItem[];
}

const solutions: Solution[] = [
  {
    id: 'upvc',
    title: 'UPVC Manufacturing',
    badge: 'Window & Door Division',
    icon: Square,
    desc: 'Srikala Projects designs, fabricates, and installs high-performance uPVC windows and doors — structurally engineered for extreme tropical climates and built for luxurious lasting beauty.',
    img: '/images/upvc-hero-luxury.png',
    features: [
      'Multi-chamber profiles designed for thermal & acoustic insulation',
      'Internal galvanized steel static bar reinforcement for high rigidity',
      'Advanced UV-stabilized polymer outer layer to prevent discoloration'
    ],
    specs: [
      { label: 'Profile Base', value: 'Multi-Chamber Core' },
      { label: 'Wind Resistance', value: 'Up to 2.0 kPa' },
      { label: 'Thermal Rating', value: 'Uf ≤ 1.6 W/m²K' },
      { label: 'Glazing Support', value: 'Up to 24mm DGU' }
    ]
  },
  {
    id: 'fabrication',
    title: 'Heavy Fabrication',
    badge: 'Industrial Steel Division',
    icon: HardHat,
    desc: 'Specialized heavy-duty structural metal fabrication for infrastructure and industrial applications. Our advanced facility features robotic welding and high-precision CNC setups.',
    img: '/images/heavy-fabrication.png',
    features: [
      'Robotic precision welding ensuring structural load consistency',
      'Custom CNC plasma & high-power laser cutting for precise tolerances',
      'Heavy-duty industrial assemblies built to international standards'
    ],
    specs: [
      { label: 'Steel Grade', value: 'IS 2062 / High-Tensile' },
      { label: 'Welding Standard', value: 'AWS D1.1 Certified' },
      { label: 'Precision Tolerance', value: 'Within ±0.5 mm' },
      { label: 'Finish Coating', value: 'Epoxy / Hot-Dip Galv' }
    ]
  },
  {
    id: 'peb',
    title: 'PEB Solutions',
    badge: 'Structural Engineering',
    icon: Building2,
    desc: 'Scalable, cost-effective, and rapidly deployable Pre-Engineered Building solutions. Our PEB systems optimize material usage while providing expansive, clear-span columns.',
    img: '/images/pre-engineered.png',
    features: [
      'Optimized structural steel design reducing overall dead load',
      'Rapid on-site bolt-up assembly minimizing project timeline',
      'Expansive clear-span capabilities ideal for warehouses & factories'
    ],
    specs: [
      { label: 'Clear Span Limit', value: 'Up to 60 meters' },
      { label: 'Design Standard', value: 'AISC / MBMA Codes' },
      { label: 'Cladding Profile', value: 'High-Tensile Galvalume' },
      { label: 'Erection Time', value: 'Up to 50% faster' }
    ]
  },
  {
    id: 'roofing',
    title: 'Roofing Systems',
    badge: 'Environmental Shielding',
    icon: Box,
    desc: 'Durable and weather-resistant roofing profiles designed for longevity. Srikala offers a variety of leak-proof standing seam and corrugated systems in high-reflectivity Galvalume.',
    img: '/images/roofing-system.png',
    features: [
      'Leak-proof standing seam technology with mechanical seaming',
      'High solar reflective index (SRI) coatings to reduce heat intake',
      'Advanced corrosion-resistant Galvalume shielding against rainfall'
    ],
    specs: [
      { label: 'Material Coating', value: 'AZ150 Galvalume' },
      { label: 'Tensile Strength', value: 'G550 MPa Steel' },
      { label: 'Thickness Range', value: '0.50 mm - 0.80 mm' },
      { label: 'Joint Profile', value: 'Standing Seam / Clip' }
    ]
  },
  {
    id: 'acp',
    title: 'ACP Cladding',
    badge: 'Exterior Facade Design',
    icon: Layers,
    desc: 'Premium external facade solutions using high-grade Aluminum Composite Panels. Our architectural cladding provides a sleek modern aesthetic while offering superior weatherproofing.',
    img: '/images/acp.png',
    features: [
      'Class A2 fire-retardant core options for complete safety',
      'Superior flat surface finish resisting environmental staining',
      'Advanced PVDF coatings preserving vibrant finishes for decades'
    ],
    specs: [
      { label: 'Panel Thickness', value: '3 mm / 4 mm / 6 mm' },
      { label: 'Finish Coating', value: 'PVDF (2/3 Coats)' },
      { label: 'Fire Class', value: 'Class A2 / FR Grade' },
      { label: 'Alloy Grade', value: 'AA 3003 / 5005' }
    ]
  },
  {
    id: 'glazing',
    title: 'Structural Glazing',
    badge: 'Architectural Glazing',
    icon: Grid3X3,
    desc: 'Engineered glass curtain walls that redefine modern architectural boundaries. Our structural glazing systems maximize natural light while ensuring high wind-load resistance.',
    img: '/images/structural-glazing.png',
    features: [
      'Unitized and semi-unitized curtain wall designs for speed',
      'High-performance double-glazed units (DGU) for acoustic shielding',
      'Point-supported glass structures using high-tensile spider fittings'
    ],
    specs: [
      { label: 'System Variety', value: 'Unitized / Semi-Unitized' },
      { label: 'Glass Tech', value: 'Toughened DGU / Low-E' },
      { label: 'Structural Seal', value: 'Dow Corning Silicone' },
      { label: 'Spider Material', value: 'SUS 316 Stainless Steel' }
    ]
  }
];

export default function Solutions() {
  const [activeTab, setActiveTab] = useState('upvc');
  const contentRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // Scroll-spy: update active tab as sections scroll into view
  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    solutions.forEach((s) => {
      const el = document.getElementById(s.id);
      if (!el) return;

      const obs = new IntersectionObserver(
        ([entry]) => { 
          if (entry.isIntersecting) {
            setActiveTab(s.id); 
          }
        },
        { rootMargin: '-30% 0px -60% 0px' }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  useGSAP(() => {
    if (!contentRef.current) return;

    contentRef.current.querySelectorAll('.solution-section').forEach((section) => {
      gsap.from(section, {
        opacity: 0,
        y: 60,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: { 
          trigger: section, 
          start: 'top 82%', 
          once: true 
        },
      });
    });
  }, []);

  const handleSidebarClick = (id: string) => {
    setActiveTab(id);
    const element = document.getElementById(id);
    if (element) {
      const offset = 80; // offset for the sticky header
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <PageWrapper>
      
      {/* ── Solutions Header Section ────────────────────────────────────── */}
      <section className="bg-slate-900 text-white py-16 md:py-24 relative overflow-hidden">
        {/* Abstract structural glow */}
        <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[500px] h-[500px] bg-electric-blue/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="dot-grid absolute inset-0 opacity-15 pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-electric-blue/30 bg-electric-blue/10 backdrop-blur-md mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-electric-blue animate-pulse" />
              <span className="text-[9px] font-extrabold tracking-[0.2em] uppercase text-electric-blue">
                Srikala Core Divisions
              </span>
            </div>
            <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-6 leading-none">
              Precision Engineering &<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-electric-blue to-cyan-400">
                Industrial Solutions
              </span>
            </h1>
            <p className="text-slate-400 text-base md:text-lg max-w-2xl leading-relaxed">
              Forty years of defining structural integrity and manufacturing excellence. Srikala Projects delivers custom engineering capabilities structurally designed to exceed code across India.
            </p>
          </div>
        </div>
      </section>

      <div className="flex flex-col lg:flex-row min-h-[90vh] bg-slate-50 relative">
        
        {/* ── Sticky Sidebar ────────────────────────────────────────────── */}
        <aside className="lg:w-80 bg-white border-r border-slate-200/80 p-8 lg:sticky lg:top-16 lg:h-[calc(100vh-4rem)] overflow-y-auto z-20 flex flex-col justify-between shrink-0">
          <div>
            <h3 className="text-slate-900 font-extrabold mb-8 uppercase tracking-widest text-[10px] border-b border-slate-100 pb-4">
              Engineering Divisions
            </h3>
            <nav className="flex flex-col gap-2">
              {solutions.map((s) => (
                <button
                  key={s.id}
                  onClick={() => handleSidebarClick(s.id)}
                  className={cn(
                    'flex items-center gap-4 px-4 py-3.5 text-xs uppercase tracking-wider transition-all duration-350 text-left border rounded-xl',
                    activeTab === s.id
                      ? 'bg-electric-blue/[0.04] text-electric-blue border-electric-blue/30 font-bold shadow-[0_4px_12px_rgba(33,128,255,0.05)]'
                      : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50 border-transparent'
                  )}
                >
                  <s.icon className={cn("w-4 h-4 shrink-0 transition-transform duration-300", activeTab === s.id ? "scale-110" : "")} />
                  <span className="font-bold">{s.title}</span>
                </button>
              ))}
            </nav>
          </div>

          <div className="hidden lg:block pt-8 border-t border-slate-100 mt-10">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-relaxed">
              Srikala Projects Ltd.<br />
              ISO 9001:2015 Certified
            </p>
          </div>
        </aside>

        {/* ── Main Content Grid ────────────────────────────────────────── */}
        <div ref={contentRef} className="flex-1 px-6 lg:px-16 py-16 lg:py-24 space-y-36 max-w-6xl mx-auto">
          {solutions.map((s, idx) => {
            const isUPVC = s.id === 'upvc';
            
            return (
              <section
                key={s.id}
                id={s.id}
                className={cn(
                  'solution-section flex flex-col gap-12 lg:gap-20 group relative',
                  idx % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                )}
              >
                {/* Visual Showcase Box */}
                <div className="w-full md:w-1/2 relative">
                  <div className="absolute -inset-2 bg-gradient-to-tr from-slate-200/50 to-cyan-100/30 rounded-2xl blur-lg opacity-40 group-hover:opacity-75 transition-opacity duration-500" />
                  <div className="w-full h-[360px] md:h-[480px] overflow-hidden rounded-2xl border border-slate-200/80 shadow-[0_15px_45px_rgba(0,0,0,0.02)] bg-white relative group">
                    <img
                      className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700 ease-out"
                      src={s.img}
                      alt={s.title}
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/20 via-transparent to-transparent" />
                    
                    {/* Quality Overlay Badge */}
                    <div className="absolute bottom-5 left-5 bg-slate-900/90 backdrop-blur-sm text-[8px] font-black tracking-widest px-3.5 py-2 uppercase rounded-full border border-white/5 text-white flex items-center gap-1.5 shadow-md">
                      <ShieldCheck className="w-3 h-3 text-cyan-400" /> Standard ISO Quality
                    </div>
                  </div>
                </div>

                {/* Content Block */}
                <div className="w-full md:w-1/2 flex flex-col justify-center">
                  <span className="text-[10px] font-extrabold text-electric-blue uppercase tracking-[0.25em] block mb-3">
                    {s.badge}
                  </span>
                  <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-6 uppercase tracking-tighter leading-none">
                    {s.title}
                  </h2>
                  <p className="text-slate-500 text-sm md:text-base mb-8 leading-relaxed border-l-2 border-electric-blue pl-6">
                    {s.desc}
                  </p>

                  {/* Engineered Specs Cockpit Grid */}
                  <div className="grid grid-cols-2 gap-px bg-slate-200/80 border border-slate-200/80 rounded-xl overflow-hidden mb-8 shadow-sm">
                    {s.specs.map((sp, i) => (
                      <div key={i} className="bg-white px-5 py-3.5">
                        <p className="text-[9px] uppercase tracking-widest text-slate-400 font-bold mb-1">{sp.label}</p>
                        <p className="font-extrabold text-slate-800 text-xs tracking-tight">{sp.value}</p>
                      </div>
                    ))}
                  </div>

                  {/* Core Features list */}
                  <ul className="space-y-3.5 mb-10">
                    {s.features.map((f, i) => (
                      <li key={i} className="flex items-start gap-3.5 text-slate-700">
                        <CheckCircle2 className="text-electric-blue w-4 h-4 shrink-0 mt-0.5" />
                        <span className="text-xs md:text-sm font-medium leading-relaxed">{f}</span>
                      </li>
                    ))}
                  </ul>

                  {/* CTAs */}
                  {isUPVC ? (
                    <button
                      onClick={() => navigate('/upvc')}
                      className="w-fit flex items-center gap-2.5 bg-electric-blue text-white px-9 py-3.5 text-xs font-black uppercase tracking-widest hover:scale-105 transition-all shadow-[0_4px_20px_rgba(0,95,184,0.3)] hover:shadow-[0_4px_25px_rgba(0,95,184,0.45)]"
                    >
                      Explore UPVC Systems <ArrowRight className="w-4 h-4" />
                    </button>
                  ) : (
                    <button
                      onClick={() => navigate('/contact')}
                      className="w-fit flex items-center gap-2.5 bg-slate-900 text-white px-9 py-3.5 text-xs font-black uppercase tracking-widest hover:bg-electric-blue transition-colors shadow-md hover:shadow-[0_4px_20px_rgba(33,128,255,0.25)]"
                    >
                      Get Quote <ArrowRight className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </section>
            );
          })}
        </div>

      </div>
    </PageWrapper>
  );
}
