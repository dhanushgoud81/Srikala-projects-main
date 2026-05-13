/**
 * AnimatedSection Component
 * 
 * Demonstrates the three-layer animation system:
 * - Foreground: Text stagger effects
 * - Midground: Parallax movement
 * - Background: Ambient fade & scale
 */

import React, { useRef } from 'react';
import { useGSAP } from '../lib/useGSAP';
import { textStagger, parallax, ambient, scrollReveal } from '../lib/animations';

interface AnimatedSectionProps {
  children?: React.ReactNode;
  className?: string;
}

/**
 * Example: Hero Section with Layered Animations
 */
export const AnimatedHero: React.FC<{
  backgroundImage: string;
  title: string;
  subtitle: string;
  onCTAClick?: () => void;
}> = ({ backgroundImage, title, subtitle, onCTAClick }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const backgroundRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // BACKGROUND LAYER: Parallax + Scale
    if (backgroundRef.current) {
      parallax.vertical(backgroundRef.current, { speed: 30 });
      ambient.scale(backgroundRef.current, { from: 1, to: 1.2 });
    }

    // MIDGROUND LAYER: Overlay fade
    if (overlayRef.current) {
      ambient.fade(overlayRef.current, { from: 0.7, to: 0.9 });
    }

    // FOREGROUND LAYER: Content stagger
    if (contentRef.current) {
      const elements = contentRef.current.querySelectorAll('.animate-item');
      textStagger.fadeInUp(elements, { stagger: 0.2, delay: 0.3 });
    }
  }, []);

  return (
    <section ref={containerRef} className="relative h-screen overflow-hidden">
      {/* Background Layer */}
      <div
        ref={backgroundRef}
        className="absolute inset-0 w-full h-full bg-cover bg-center will-change-transform"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      />

      {/* Midground Layer */}
      <div ref={overlayRef} className="absolute inset-0 bg-slate-950/70" />

      {/* Foreground Layer */}
      <div
        ref={contentRef}
        className="relative z-10 h-full flex items-center justify-center px-6"
      >
        <div className="text-center text-white max-w-4xl">
          <h1 className="animate-item text-6xl md:text-8xl font-bold mb-6 uppercase">
            {title}
          </h1>
          <p className="animate-item text-xl md:text-2xl mb-8 text-slate-300">
            {subtitle}
          </p>
          <button
            onClick={onCTAClick}
            className="animate-item bg-electric-blue px-12 py-4 text-sm font-bold uppercase tracking-widest hover:scale-105 transition-transform"
          >
            Get Started
          </button>
        </div>
      </div>
    </section>
  );
};

/**
 * Example: Card Grid with Alternating Entrance
 */
export const AnimatedCardGrid: React.FC<{
  cards: Array<{ title: string; description: string; icon?: React.ReactNode }>;
}> = ({ cards }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (containerRef.current) {
      const cardElements = containerRef.current.querySelectorAll('.card-item');

      cardElements.forEach((card, index) => {
        const direction = index % 2 === 0 ? -60 : 60;

        // Entrance animation
        scrollReveal.fadeInUp(card, { y: 40 });

        // Continuous parallax
        parallax.horizontal(card, { speed: direction * 0.3 });
      });
    }
  }, [cards]);

  return (
    <div
      ref={containerRef}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 py-24"
    >
      {cards.map((card, index) => (
        <div
          key={index}
          className="card-item bg-white p-8 rounded-lg shadow-lg hover:shadow-2xl transition-shadow"
        >
          {card.icon && <div className="mb-4">{card.icon}</div>}
          <h3 className="text-2xl font-bold mb-4">{card.title}</h3>
          <p className="text-slate-600">{card.description}</p>
        </div>
      ))}
    </div>
  );
};

/**
 * Example: Stats Counter with Scroll Trigger
 */
export const AnimatedStats: React.FC<{
  stats: Array<{ value: number; label: string }>;
}> = ({ stats }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (containerRef.current) {
      const statElements = containerRef.current.querySelectorAll('.stat-item');

      // Stagger entrance
      textStagger.fadeInUp(statElements, { stagger: 0.2 });

      // Animate numbers
      const numbers = containerRef.current.querySelectorAll('.stat-number');
      numbers.forEach((num) => {
        const target = parseInt(num.getAttribute('data-value') || '0');
        
        scrollReveal.fadeInUp(num, {
          duration: 2,
          start: 'top 80%',
        });
      });
    }
  }, [stats]);

  return (
    <div
      ref={containerRef}
      className="grid grid-cols-1 md:grid-cols-3 gap-12 py-24"
    >
      {stats.map((stat, index) => (
        <div key={index} className="stat-item text-center">
          <div
            className="stat-number text-6xl font-bold text-electric-blue mb-2"
            data-value={stat.value}
          >
            {stat.value}+
          </div>
          <div className="text-sm uppercase tracking-widest text-slate-500">
            {stat.label}
          </div>
        </div>
      ))}
    </div>
  );
};

/**
 * Example: Parallax Section with Multiple Layers
 */
export const ParallaxSection: React.FC<{
  layers: Array<{
    content: React.ReactNode;
    speed: number;
    zIndex: number;
  }>;
}> = ({ layers }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (containerRef.current) {
      const layerElements = containerRef.current.querySelectorAll('.parallax-layer');

      layerElements.forEach((layer, index) => {
        const speed = layers[index]?.speed || 0;
        parallax.vertical(layer, { speed });
      });
    }
  }, [layers]);

  return (
    <div ref={containerRef} className="relative h-screen overflow-hidden">
      {layers.map((layer, index) => (
        <div
          key={index}
          className="parallax-layer absolute inset-0"
          style={{ zIndex: layer.zIndex }}
        >
          {layer.content}
        </div>
      ))}
    </div>
  );
};

/**
 * Example: Text Reveal with Character Split
 */
export const AnimatedTextReveal: React.FC<{
  text: string;
  className?: string;
}> = ({ text, className = '' }) => {
  const textRef = useRef<HTMLHeadingElement>(null);

  useGSAP(() => {
    if (textRef.current) {
      textStagger.splitText(textRef.current, { stagger: 0.03 });
    }
  }, [text]);

  return (
    <h2 ref={textRef} className={className}>
      {text}
    </h2>
  );
};

// Export all components individually (no default export needed)
