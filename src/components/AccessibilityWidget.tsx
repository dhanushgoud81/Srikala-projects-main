import React, { useState, useRef } from 'react';
import { Accessibility, Eye, Type, ZoomIn, Contrast } from 'lucide-react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

export const AccessibilityWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (isOpen) {
      gsap.fromTo(menuRef.current, 
        { opacity: 0, scale: 0.8, y: 20, transformOrigin: 'bottom left' },
        { opacity: 1, scale: 1, y: 0, duration: 0.3, ease: 'power2.out' }
      );
    }
  }, [isOpen]);

  return (
    <div className="fixed bottom-6 left-6 z-50">
      {isOpen && (
        <div 
          ref={menuRef}
          className="absolute bottom-16 left-0 bg-slate-950 border border-white/10 shadow-2xl p-4 w-48 rounded-sm"
        >
          <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3 border-b border-white/10 pb-2">Accessibility</div>
          <ul className="space-y-3">
            {[
              { icon: Type, label: 'Readable Text' },
              { icon: ZoomIn, label: 'Magnifier' },
              { icon: Contrast, label: 'High Contrast' },
              { icon: Eye, label: 'Highlight Links' },
            ].map((item, i) => (
              <li key={i}>
                <button className="flex items-center gap-3 w-full text-slate-300 hover:text-electric-blue text-sm transition-colors text-left group">
                  <item.icon className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  <span>{item.label}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-3 bg-slate-900 text-white rounded-full shadow-2xl border border-white/10 hover:bg-electric-blue transition-colors duration-300"
        aria-label="Accessibility options"
      >
        <Accessibility className="w-6 h-6" />
      </button>
    </div>
  );
};
