import React, { useEffect, useRef } from 'react';
import { animate, scroll, spring } from 'motion';
import { Square, Box, Factory, Layers, Grid3X3 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const SERVICES = [
  {
    icon: Square,
    title: 'uPVC Windows & Doors',
    titlePre: 'uPVC',
    titleHighlight: 'Windows',
    titlePost: '& Doors',
    desc: 'Energy-efficient, multi-chambered German uPVC window and door systems structurally engineered for luxurious lasting beauty.',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80',
    category: 'FENESTRATION DIVISION'
  },
  {
    icon: Factory,
    title: 'Pre-Engineered Buildings',
    titlePre: 'Pre-Engineered',
    titleHighlight: 'Buildings',
    titlePost: '',
    desc: 'High-strength structural steel warehouses, PEB industrial sheds, and multi-story structural steel frames designed for maximum volumetric efficiency.',
    image: '/images/pre-engineered.png',
    category: 'STEEL INFRASTRUCTURE'
  },
  {
    icon: Box,
    title: 'Roofing Systems',
    titlePre: 'Roofing',
    titleHighlight: 'Systems',
    titlePost: '',
    desc: 'Advanced industrial roofing solutions with stand-seam leak-proof tech and high solar reflectivity.',
    image: '/images/roofing-system.png',
    category: 'ENVIRONMENTAL SHIELDING'
  },
  {
    icon: Factory,
    title: 'Heavy Fabrication',
    titlePre: 'Heavy Steel',
    titleHighlight: 'Fabrication',
    titlePost: '',
    desc: 'Precision heavy steel fabrication, custom welding, and block assembly of critical industrial trusses and overhead crane girders.',
    image: '/images/heavy-fabrication.png',
    category: 'INDUSTRIAL STEEL'
  },
  {
    icon: Layers,
    title: 'ACP Cladding',
    titlePre: 'ACP',
    titleHighlight: 'Cladding',
    titlePost: 'Systems',
    desc: 'High-grade aluminum composite panels for exterior facade protection, featuring class A2 fire-retardant cores.',
    image: '/images/acp.png',
    category: 'FACADE DIVISION'
  },
  {
    icon: Grid3X3,
    title: 'Structural Glazing',
    titlePre: 'Structural',
    titleHighlight: 'Glazing',
    titlePost: '',
    desc: 'Sophisticated architectural glass facades and high-performance weather-tight curtain walls.',
    image: '/images/structural-glazing.png',
    category: 'ARCHITECTURAL GLAZING'
  },
];

export const CoreDivisionsHorizontal = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-baumeister-charcoal relative">
      {/* 1. Header is rendered with natural, clean spacing */}
      <header className='text-white relative z-10 w-full bg-baumeister-charcoal grid place-content-center pt-24 md:pt-36 pb-16 md:pb-24 border-b border-white/5'>
        <div className="max-w-7xl mx-auto px-6 md:px-12 text-center">
            <h2 className="text-3xl md:text-5xl font-oswald font-bold uppercase mb-4 tracking-tighter">Our Core Divisions</h2>
            <div className="w-20 h-1 bg-electric-blue mx-auto mb-6 md:mb-8" />
            <p className='text-base md:text-xl text-slate-400 font-medium text-center max-w-2xl mx-auto leading-relaxed'>
              Specialized engineering divisions delivering turnkey solutions for complex structural requirements.
            </p>
        </div>
      </header>

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
                  
                  {/* Plain Text Content Block - Always visible on mobile, fades in on hover on desktop */}
                  <div className="w-full md:w-[60%] text-white text-left flex flex-col justify-center transition-opacity duration-700 ease-out opacity-100 md:opacity-0 md:group-hover:opacity-100 z-10">
                    
                    {/* Small category tag exactly matching example screenshot */}
                    <span className="font-oswald font-bold text-[11px] tracking-[0.25em] text-slate-400 uppercase mb-3 block">
                      {service.category}
                    </span>

                    {/* Massive bold heading with highlighted word in yellow matching example screenshot */}
                    <h3 className="text-4xl sm:text-5xl md:text-[64px] font-oswald font-black uppercase mb-4 tracking-tighter leading-[1.05] text-white">
                      {service.titlePre}{' '}
                      <span className="text-[#fbb900]">{service.titleHighlight}</span>
                      {service.titlePost ? ` ${service.titlePost}` : ''}
                    </h3>

                    {/* Yellow horizontal thick underline bar matching example screenshot */}
                    <div className="w-16 h-[3px] bg-[#fbb900] my-6" />

                    {/* Highly legible paragraph description */}
                    <p className="text-sm md:text-[15px] text-slate-200 leading-relaxed mb-8 max-w-lg">
                      {service.desc}
                    </p>

                    {/* Solid yellow Explore button matching example screenshot */}
                    <button
                      onClick={() => navigate(service.title === 'uPVC Windows & Doors' ? '/upvc' : '/solutions')}
                      className="rounded-none bg-[#fbb900] px-8 py-4 text-[11px] font-oswald font-bold uppercase tracking-[0.2em] text-white hover:bg-white hover:text-slate-950 transition-colors duration-300 w-fit select-none shadow-lg active:scale-[0.98] duration-150 flex items-center gap-3"
                    >
                      <span>EXPLORE DIVISION</span>
                      <span className="font-mono text-sm leading-none">→</span>
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
