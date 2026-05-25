import React, { useEffect, useRef } from 'react';
import { animate, scroll, spring } from 'motion';
import { Square, Box, Factory, Layers, Grid3X3 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const SERVICES = [
  {
    icon: Square,
    title: 'uPVC Windows & Doors',
    desc: 'Energy-efficient window and door systems for modern architectural aesthetics.',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80',
    color: 'bg-slate-900'
  },
  {
    icon: Factory,
    title: 'Pre-Engineered Buildings',
    desc: 'Optimized PEB structural frames for maximum internal space utilization.',
    image: '/images/pre-engineered.png',
    color: 'bg-slate-800'
  },
  {
    icon: Box,
    title: 'Roofing Systems',
    desc: 'Advanced industrial roofing solutions with superior thermal insulation.',
    image: '/images/roofing-system.png',
    color: 'bg-slate-900'
  },
  {
    icon: Factory,
    title: 'Heavy Fabrication',
    desc: 'Precision steel fabrication for critical infrastructure components.',
    image: '/images/heavy-fabrication.png',
    color: 'bg-slate-800'
  },
  {
    icon: Layers,
    title: 'ACP Cladding',
    desc: 'High-grade aluminum composite panels for exterior environmental protection.',
    image: '/images/acp.png',
    color: 'bg-slate-900'
  },
  {
    icon: Grid3X3,
    title: 'Structural Glazing',
    desc: 'Sophisticated glass facade solutions that combine integrity with transparency.',
    image: '/images/structural-glazing.png',
    color: 'bg-slate-800'
  },
];

export const CoreDivisionsHorizontal = () => {
  const ulRef = useRef<HTMLUListElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!ulRef.current || !sectionRef.current) return;
    
    const items = ulRef.current.querySelectorAll('li');

    const controls = animate(
      ulRef.current,
      {
        transform: ['none', `translateX(-${items.length - 1}00vw)`],
      } as any,
      { ease: spring() as any }
    );
    
    scroll(controls, { target: sectionRef.current });

    const segmentLength = 1 / items.length;
    items.forEach((item, i) => {
      const header = item.querySelector('h2.bg-text');

      if (header) {
        scroll(animate([header] as any, { x: [800, -800] } as any), {
          target: sectionRef.current!,
          offset: [
            [i * segmentLength, 1],
            [(i + 1) * segmentLength, 0],
          ],
        });
      }
    });
  }, []);

  return (
    <div className="bg-white">
      <header className='text-slate-950 relative w-full bg-white grid place-content-center py-16 md:py-24 border-b border-slate-100'>
        <div className="max-w-7xl mx-auto px-6 md:px-12 text-center">
            <h2 className="text-3xl md:text-5xl font-bold uppercase mb-4 tracking-tighter">Our Core Divisions</h2>
            <div className="w-20 h-1 bg-electric-blue mx-auto mb-6 md:mb-8" />
            <p className='text-base md:text-xl text-slate-500 font-medium text-center max-w-2xl mx-auto leading-relaxed'>
              Specialized engineering divisions delivering turnkey solutions for complex structural requirements.
              <span className="hidden md:inline"> Scroll to explore! 👇</span>
            </p>
        </div>
      </header>

      {/* ── Mobile: vertical card grid ──────────────────────────────────── */}
      <div className="md:hidden bg-white">
        {SERVICES.map((service, index) => {
          const Icon = service.icon;
          return (
            <div key={index} className={`${service.color} px-6 py-10 flex flex-col gap-6`}>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center shrink-0">
                  <Icon className="w-6 h-6 text-electric-blue" />
                </div>
                <h3 className="text-2xl font-bold uppercase tracking-tighter text-white">{service.title}</h3>
              </div>
              <div className="w-full h-48 rounded-lg overflow-hidden shadow-xl">
                <img src={service.image} alt={service.title} className="w-full h-full object-cover" loading="lazy" />
              </div>
              <p className="text-slate-300 text-sm leading-relaxed">{service.desc}</p>
              <button
                onClick={() => navigate(service.title === 'uPVC Windows & Doors' ? '/upvc' : '/solutions')}
                className="w-fit bg-electric-blue text-white px-6 py-3 text-xs font-bold uppercase tracking-widest hover:scale-105 transition-transform"
              >
                Learn More
              </button>
            </div>
          );
        })}
      </div>

      {/* ── Desktop: horizontal scroll ──────────────────────────────────── */}
      <section ref={sectionRef} className='hidden md:block h-[600vh] relative'>
        <ul ref={ulRef} className='flex sticky top-0'>
          {SERVICES.map((service, index) => {
            const Icon = service.icon;
            return (
              <li key={index} className={`h-screen w-screen ${service.color} flex flex-col justify-center overflow-hidden items-center shrink-0 relative`}>
                <h2 className='bg-text text-[8vw] font-black tracking-tighter uppercase whitespace-nowrap text-white/5 absolute top-1/4 select-none pointer-events-none'>
                  {service.title}
                </h2>
                <div className="relative z-10 w-full max-w-7xl mx-auto px-12 flex flex-row items-center gap-12 mt-20">
                  <div className="flex-1 text-white text-left">
                    <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mb-8">
                      <Icon className="w-8 h-8 text-electric-blue" />
                    </div>
                    <h3 className="text-5xl font-bold uppercase mb-6 tracking-tighter">{service.title}</h3>
                    <p className="text-lg text-slate-300 leading-relaxed mb-8 max-w-lg">{service.desc}</p>
                    <button
                      onClick={() => navigate(service.title === 'uPVC Windows & Doors' ? '/upvc' : '/solutions')}
                      className="bg-electric-blue text-white px-8 py-4 text-sm font-bold uppercase tracking-widest hover:scale-105 transition-transform"
                    >
                      Learn More
                    </button>
                  </div>
                  <div className="flex-1 w-full relative h-[60vh] rounded-lg overflow-hidden shadow-2xl">
                    <img src={service.image} alt={service.title} className='w-full h-full object-cover hover:scale-105 transition-transform duration-700' />
                    <div className="absolute inset-0 bg-slate-950/30 mix-blend-multiply pointer-events-none" />
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </section>
    </div>
  );
};
