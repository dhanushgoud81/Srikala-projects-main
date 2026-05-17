import React, { useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ArrowUp } from 'lucide-react';

export const ScrollToTop = () => {
  const btnRef = useRef<HTMLButtonElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useGSAP(() => {
    const handleScroll = () => {
      const show = window.scrollY > 300;
      if (show !== isVisible) {
        setIsVisible(show);
        gsap.to(btnRef.current, {
          opacity: show ? 1 : 0,
          scale: show ? 1 : 0.8,
          pointerEvents: show ? 'auto' : 'none',
          duration: 0.3,
          ease: 'power2.out',
        });
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isVisible]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <button
      ref={btnRef}
      onClick={scrollToTop}
      style={{ opacity: 0, pointerEvents: 'none', scale: 0.8 }}
      className="fixed bottom-6 right-6 z-50 p-3 bg-electric-blue text-white rounded-full shadow-2xl hover:bg-slate-900 transition-colors duration-300 border border-transparent hover:border-electric-blue"
      aria-label="Scroll to top"
    >
      <ArrowUp className="w-6 h-6" />
    </button>
  );
};
