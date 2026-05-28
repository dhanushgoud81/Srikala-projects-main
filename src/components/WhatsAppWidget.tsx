import React, { useRef } from 'react';
import { MessageCircle } from 'lucide-react';
import { useGSAP } from '../lib/useGSAP';
import gsap from 'gsap';

export const WhatsAppWidget = () => {
  const widgetRef = useRef<HTMLAnchorElement>(null);

  useGSAP(() => {
    // Premium entrance animation
    gsap.fromTo(widgetRef.current,
      { opacity: 0, scale: 0.5, y: 30 },
      { opacity: 1, scale: 1, y: 0, duration: 0.8, ease: 'back.out(1.7)', delay: 1.2 }
    );

    // Continuous premium CAD blueprint style breathing animation
    gsap.to(widgetRef.current, {
      y: -6,
      duration: 2.2,
      repeat: -1,
      yoyo: true,
      ease: 'power1.inOut'
    });
  }, []);

  return (
    <a
      ref={widgetRef}
      href="https://wa.me/919866089771?text=Hi%20Srikala%20Projects%2C%20I'm%20interested%20in%20your%20uPVC%20Windows%20%26%20Doors%20solutions.%20Could%20you%20please%20share%20more%20details%3F"
      target="_blank"
      rel="noopener noreferrer"
      style={{ scale: 0, opacity: 0 }}
      className="fixed bottom-24 right-6 z-50 p-3.5 bg-[#25D366] text-white rounded-full shadow-[0_8px_30px_rgba(37,211,102,0.4)] hover:bg-[#128C7E] hover:shadow-[0_8px_30px_rgba(18,140,126,0.6)] hover:scale-110 active:scale-95 transition-all duration-300 flex items-center justify-center group"
      aria-label="Chat on WhatsApp"
    >
      {/* Sleek Tooltip */}
      <span className="absolute right-16 bg-slate-950 text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-sm opacity-0 translate-x-3 pointer-events-none group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 whitespace-nowrap shadow-xl border border-white/10">
        Chat on WhatsApp
      </span>
      
      {/* Tactical ripple border ping effect */}
      <span className="absolute inset-0 rounded-full border border-[#25D366] animate-ping opacity-60 pointer-events-none" />

      {/* White outlined chat bubble icon (matches user's image) */}
      <MessageCircle className="w-6 h-6 text-white stroke-[2.2]" />
    </a>
  );
};
