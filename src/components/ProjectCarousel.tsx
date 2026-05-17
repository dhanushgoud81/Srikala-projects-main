import React, { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, EffectFade, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const PROJECTS = [
  { id: 1, title: 'Omega Facility', type: 'PEB Structure', image: '/images/pre-engineered.png' },
  { id: 2, title: 'Nova Logistics Park', type: 'Roofing Systems', image: '/images/roofing-system.png' },
  { id: 3, title: 'Zenith Tech Hub', type: 'Structural Glazing', image: '/images/structural-glazing.png' }
];

export const ProjectCarousel = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Scroll reveal animation for the whole carousel
    gsap.fromTo(containerRef.current,
      { opacity: 0, scale: 0.95, y: 50 },
      { 
        opacity: 1, scale: 1, y: 0, duration: 1.2, ease: 'power3.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none'
        }
      }
    );
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="py-24 bg-slate-950 relative overflow-hidden" id="projects">
      <div className="max-w-7xl mx-auto px-6 md:px-12 mb-12">
        <h2 className="text-4xl font-bold text-white uppercase mb-2">Featured Projects</h2>
        <div className="w-20 h-1 bg-electric-blue" />
      </div>

      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <div className="w-full relative group shadow-2xl rounded-sm overflow-hidden">
          <Swiper
            modules={[Navigation, Pagination, EffectFade, Autoplay]}
            effect="fade"
            speed={1000}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            pagination={{ clickable: true, dynamicBullets: true }}
            navigation={{
              nextEl: '.swiper-button-next-custom',
              prevEl: '.swiper-button-prev-custom',
            }}
            loop={true}
            className="h-[60vh] md:h-[70vh] w-full"
          >
            {PROJECTS.map((project) => (
              <SwiperSlide key={project.id}>
                <div className="relative w-full h-full overflow-hidden">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-full object-cover transform scale-105 hover:scale-110 transition-transform duration-[10s] ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
                  
                  <div className="absolute bottom-12 left-6 md:left-12 text-white">
                    <p className="text-electric-blue uppercase tracking-[0.2em] text-xs font-bold mb-2">{project.type}</p>
                    <h3 className="text-4xl md:text-5xl font-black uppercase mb-4 tracking-tighter">{project.title}</h3>
                    <button className="flex items-center gap-2 text-sm font-bold hover:text-electric-blue transition-colors group/btn">
                      VIEW CASE STUDY
                      <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-2 transition-transform" />
                    </button>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Custom Navigation */}
          <div className="swiper-button-prev-custom absolute left-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 flex items-center justify-center bg-slate-950/50 backdrop-blur-md text-white cursor-pointer hover:bg-electric-blue transition-colors border border-white/20 opacity-0 group-hover:opacity-100">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
          </div>
          <div className="swiper-button-next-custom absolute right-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 flex items-center justify-center bg-slate-950/50 backdrop-blur-md text-white cursor-pointer hover:bg-electric-blue transition-colors border border-white/20 opacity-0 group-hover:opacity-100">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
};
