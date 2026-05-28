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
  const navigate = useNavigate();

  return (
    <div className="bg-baumeister-charcoal relative">
      {/* 1. Header is rendered first with relative layout and lower z-index */}
      <header className='text-white relative z-10 w-full bg-baumeister-charcoal grid place-content-center pt-60 md:pt-80 pb-16 md:pb-24 border-b border-white/5'>
        <div className="max-w-7xl mx-auto px-6 md:px-12 text-center">
            <h2 className="text-3xl md:text-5xl font-oswald font-bold uppercase mb-4 tracking-tighter">Our Core Divisions</h2>
            <div className="w-20 h-1 bg-electric-blue mx-auto mb-6 md:mb-8" />
            <p className='text-base md:text-xl text-slate-400 font-medium text-center max-w-2xl mx-auto leading-relaxed'>
              Specialized engineering divisions delivering turnkey solutions for complex structural requirements.
            </p>
        </div>
      </header>

      {/* 2. Overlapping Cards container rendered after header with higher z-index (z-40) for perfect stacking context */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-7xl px-6 md:px-12 flex flex-row overflow-x-auto no-scrollbar snap-x snap-mandatory md:grid md:grid-cols-3 gap-6 z-40 pointer-events-auto">
        {[
          {
            src: '/images/pre-engineered.png',
            title: 'High standard',
            desc: 'High-strength structural steel warehouses & PEB frame projects engineered to lasted standard specifications.',
            path: '/solutions'
          },
          {
            src: '/images/heavy-fabrication.png',
            title: 'Reconstruction',
            desc: 'Precision structural steel blocks, custom welding, & complex frame restorations.',
            path: '/solutions'
          },
          {
            src: '/images/structural-glazing.png',
            title: 'Execution',
            desc: 'Sophisticated architectural glass facades & premium high-performance weather-tight uPVC systems.',
            path: '/upvc'
          }
        ].map((card, idx) => (
          <div 
            key={idx}
            onClick={() => { navigate(card.path); window.scrollTo(0, 0); }}
            className="bg-white border-[7px] border-white shadow-[0_15px_40px_rgba(0,0,0,0.12)] hover:shadow-[0_22px_50px_rgba(0,0,0,0.2)] hover:-translate-y-3 transition-all duration-500 group cursor-pointer shrink-0 w-[82vw] sm:w-[45vw] md:w-auto snap-center"
          >
            <div className="overflow-hidden aspect-[4/3] relative bg-slate-100">
              <img 
                src={card.src} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" 
                alt={card.title}
              />
              <div className="absolute inset-0 bg-slate-950/5 group-hover:bg-slate-950/0 transition-colors duration-300" />
            </div>
            <div className="p-6 text-center bg-white">
              <h4 className="font-oswald font-bold text-slate-900 text-sm sm:text-base uppercase tracking-widest group-hover:text-electric-blue transition-colors duration-300">
                {card.title}
              </h4>
              <p className="text-slate-500 text-[11.5px] font-medium leading-relaxed mt-2 px-2">
                {card.desc}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* ── Standard Vertical Alternating Divisions List ── */}
      <div className="flex flex-col w-full">
        {SERVICES.map((service, index) => {
          const Icon = service.icon;
          const isEven = index % 2 === 0;

          return (
            <section 
              key={index} 
              className="w-full py-24 md:py-36 overflow-hidden relative flex items-center min-h-[55vh] border-b border-white/5 group"
            >
              {/* Full-Width Background Image */}
              <div className="absolute inset-0 w-full h-full overflow-hidden select-none pointer-events-none z-0">
                <img 
                  src={service.image} 
                  alt={service.title} 
                  className="w-full h-full object-cover transition-transform duration-[2000ms] ease-out hover:scale-105" 
                  style={{
                    filter: 'brightness(0.6)',
                  }}
                  loading="lazy"
                />
                {/* Dark Vignette Gradient Overlay for Text Legibility - Always left-to-right to support left text alignment */}
                <div 
                  className="absolute inset-0 transition-opacity duration-500"
                  style={{
                    background: 'linear-gradient(to right, rgba(15,23,42,0.95) 0%, rgba(15,23,42,0.82) 45%, rgba(15,23,42,0.3) 100%)'
                  }}
                />
              </div>

              <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12">
                <div className="flex w-full justify-start">
                  
                  {/* Plain Text Content Block - Fades in on hovering anywhere on the section */}
                  <div className="w-full md:w-[48%] text-white text-left flex flex-col justify-center transition-opacity duration-700 ease-out opacity-0 group-hover:opacity-100 z-10">
                    
                    {/* Clean Icon Render */}
                    <div className="mb-6">
                      <Icon className="w-9 h-9 text-electric-blue" />
                    </div>

                    <h3 className="text-3xl md:text-4xl font-oswald font-extrabold uppercase mb-4 tracking-tighter group-hover:text-electric-blue transition-colors duration-500 text-white">
                      {service.title}
                    </h3>
                    <p className="text-sm md:text-base text-slate-300 leading-relaxed mb-8 max-w-lg">
                      {service.desc}
                    </p>

                    {/* State-of-the-art interactive "Blueprint Sweep" Action Button */}
                    <button
                      onClick={() => navigate(service.title === 'uPVC Windows & Doors' ? '/upvc' : '/solutions')}
                      className="relative group/btn overflow-hidden rounded-none border border-electric-blue/40 px-7 py-3.5 text-[10px] font-oswald font-bold uppercase tracking-[0.2em] text-white transition-all w-fit select-none shadow-lg active:scale-[0.98] duration-150"
                    >
                      {/* Dynamic slide background color sweep */}
                      <div className="absolute inset-y-0 left-0 w-0 bg-electric-blue group-hover/btn:w-full transition-all duration-500 ease-out z-0" />
                      
                      <span className="relative z-10 flex items-center gap-3">
                        EXPLORE DIVISION
                        <span className="relative flex items-center justify-center w-5 h-5 border border-white/20 rounded-none group-hover/btn:border-white/50 group-hover/btn:rotate-45 transition-all duration-500 bg-white/5 font-mono text-sm leading-none pt-[1px] text-white">
                          →
                        </span>
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
};
