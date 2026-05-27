/**
 * DivisionCard Component
 * 
 * Reusable card with GSAP curtain reveal animation
 * Simple and clean implementation
 */

import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, LucideIcon } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface DivisionCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  image: string;
  onLearnMore: () => void;
}

export const DivisionCard: React.FC<DivisionCardProps> = ({
  icon: Icon,
  title,
  description,
  image,
  onLearnMore,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const maskRef = useRef<HTMLDivElement>(null);

  const [tilt, setTilt] = React.useState({ x: 0, y: 0 });
  const [glare, setGlare] = React.useState({ x: 50, y: 50, opacity: 0 });

  useGSAP(() => {
    // The Legacy Style Animation: Staggered Fade + Slide Up
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: cardRef.current,
        start: 'top 85%', 
        toggleActions: 'play none none none',
      }
    });

    // 1. Fade in the image container
    tl.from(
      maskRef.current,
      { opacity: 0, y: 20, duration: 0.8, ease: 'power3.out' }
    );

    // 2. Staggered slide up and fade in for text elements
    const textElements = cardRef.current?.querySelectorAll('.text-content > *');
    if (textElements && textElements.length > 0) {
      tl.from(
        textElements,
        { opacity: 0, y: 30, duration: 0.8, stagger: 0.15, ease: 'power3.out' },
        "-=0.6" // start before image animation finishes
      );
    }
  }, { scope: cardRef });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const xc = rect.width / 2;
    const yc = rect.height / 2;

    const rotX = -((y - yc) / yc) * 10; 
    const rotY = ((x - xc) / xc) * 10;

    setTilt({ x: rotX, y: rotY });
    setGlare({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
      opacity: 0.18
    });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
    setGlare(prev => ({ ...prev, opacity: 0 }));
  };

  return (
    <div 
      ref={cardRef} 
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="card-container glass-card overflow-hidden relative"
      style={{
        perspective: 1000,
        transformStyle: 'preserve-3d',
        transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        transition: tilt.x === 0 && tilt.y === 0 ? 'transform 0.5s cubic-bezier(0.25, 0.8, 0.25, 1)' : 'none',
        willChange: 'transform'
      }}
    >
      {/* Glare effect overlay */}
      <div 
        className="absolute inset-0 pointer-events-none transition-opacity duration-300 z-30"
        style={{
          background: `radial-gradient(circle at ${glare.x}% ${glare.y}%, rgba(255, 255, 255, 0.2) 0%, transparent 60%)`,
          opacity: glare.opacity
        }}
      />

      {/* Image */}
      <div 
        ref={maskRef} 
        className="relative"
        style={{
          width: '100%',
          height: '250px',
          overflow: 'hidden',
          transform: 'translateZ(20px)', // Pushes image forward in 3D space
          transformStyle: 'preserve-3d'
        }}
      >
        <img 
          src={image} 
          alt={title}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transform: 'scale(1.1) translateZ(10px)', // Slight zoom for extra depth
          }}
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        {/* Icon */}
        <Icon className="absolute bottom-4 left-4 w-10 h-10 text-white drop-shadow-lg" />
      </div>

      {/* Text Content */}
      <div 
        className="text-content px-8 py-6"
        style={{ transform: 'translateZ(15px)' }}
      >
        <h3 className="text-xl font-bold mb-4 uppercase">{title}</h3>
        <p className="text-slate-500 mb-6 text-sm">{description}</p>
        <button
          onClick={onLearnMore}
          className="text-electric-blue font-bold text-xs uppercase tracking-widest flex items-center gap-2 hover:gap-4 transition-all"
        >
          LEARN MORE <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default DivisionCard;
