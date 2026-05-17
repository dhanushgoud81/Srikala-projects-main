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

  return (
    <div 
      ref={cardRef} 
      className="card-container glass-card overflow-hidden"
    >
      {/* Image */}
      <div 
        ref={maskRef} 
        className="relative"
        style={{
          width: '100%',
          height: '250px',
          overflow: 'hidden',
        }}
      >
        <img 
          src={image} 
          alt={title}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transform: 'scale(1.1)', // Slight zoom for extra depth
          }}
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        {/* Icon */}
        <Icon className="absolute bottom-4 left-4 w-10 h-10 text-white drop-shadow-lg" />
      </div>

      {/* Text Content */}
      <div className="text-content px-8 py-6">
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
