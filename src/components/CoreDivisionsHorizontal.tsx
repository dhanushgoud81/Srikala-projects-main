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
      <header className='text-white relative z-10 w-full bg-baumeister-charcoal grid place-content-center pt-36 md:pt-48 pb-16 md:pb-24 border-b border-white/5'>
        <div className="max-w-7xl mx-auto px-6 md:px-12 text-center">
            <h2 className="text-3xl md:text-5xl font-oswald font-bold uppercase mb-4 tracking-tighter">Our Core Divisions</h2>
            <div className="w-20 h-1 bg-baumeister-yellow mx-auto mb-6 md:mb-8" />
            <p className='text-base md:text-xl text-slate-400 font-medium text-center max-w-2xl mx-auto leading-relaxed'>
              Specialized engineering divisions delivering turnkey solutions for complex structural requirements.
            </p>
        </div>
      </header>

      {/* 2. Overlapping Cards container rendered after header with higher z-index (z-40) for perfect stacking context */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-7xl px-6 md:px-12 grid grid-cols-1 md:grid-cols-3 gap-6 z-40 pointer-events-auto">
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
            className="bg-white border-[7px] border-white shadow-[0_15px_40px_rgba(0,0,0,0.12)] hover:shadow-[0_22px_50px_rgba(0,0,0,0.2)] hover:-translate-y-3 transition-all duration-500 group cursor-pointer"
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
              <h4 className="font-oswald font-bold text-slate-900 text-sm sm:text-base uppercase tracking-widest group-hover:text-baumeister-yellow transition-colors duration-300">
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
              className={`w-full py-20 md:py-28 ${service.color} overflow-hidden relative flex items-center min-h-[50vh]`}
            >


              <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12">
                <div className={`flex flex-col ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-12 md:gap-16`}>
                  
                  {/* Text Content Block */}
                  <div className="w-full md:w-1/2 text-white text-left flex flex-col justify-center">
                    <div className="w-14 h-14 bg-white/10 rounded-full flex items-center justify-center mb-6">
                      <Icon className="w-7 h-7 text-baumeister-yellow" />
                    </div>
                    <h3 className="text-3xl md:text-4xl font-oswald font-extrabold uppercase mb-4 tracking-tighter">{service.title}</h3>
                    <p className="text-sm md:text-base text-slate-350 leading-relaxed mb-8 max-w-lg">{service.desc}</p>
                    <button
                      onClick={() => navigate(service.title === 'uPVC Windows & Doors' ? '/upvc' : '/solutions')}
                      className="bg-baumeister-yellow text-slate-950 px-8 py-3.5 text-xs font-oswald font-bold uppercase tracking-widest hover:bg-white hover:text-slate-950 transition-colors w-fit shadow-lg active:scale-95 duration-200 rounded-none"
                    >
                      Learn More
                    </button>
                  </div>

                  {/* Image Block */}
                  <div className="w-full md:w-1/2 relative h-[250px] md:h-[400px] rounded-xl overflow-hidden shadow-2xl group">
                    <img 
                      src={service.image} 
                      alt={service.title} 
                      className='w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105' 
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-slate-950/20 mix-blend-multiply pointer-events-none" />
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
