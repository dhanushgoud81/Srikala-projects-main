/**
 * Animation Demo Component
 * 
 * This file demonstrates all the animation patterns available in the system.
 * Use this as a reference when implementing animations in your components.
 */

import React, { useRef } from 'react';
import { useGSAP } from '../lib/useGSAP';
import { 
  textStagger, 
  parallax, 
  ambient, 
  scrollReveal, 
  animationUtils 
} from '../lib/animations';
import { Rocket, Shield, Zap } from 'lucide-react';

/**
 * DEMO 1: Hero Section with Three Layers
 * Background: Parallax image + scale
 * Midground: Fading overlay
 * Foreground: Staggered text
 */
export const HeroDemo: React.FC = () => {
  const backgroundRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // BACKGROUND LAYER
    if (backgroundRef.current) {
      parallax.vertical(backgroundRef.current, { speed: 30 });
      ambient.scale(backgroundRef.current, { from: 1, to: 1.2 });
    }

    // MIDGROUND LAYER
    if (overlayRef.current) {
      ambient.fade(overlayRef.current, { from: 0.7, to: 0.9 });
    }

    // FOREGROUND LAYER
    if (contentRef.current) {
      const elements = contentRef.current.querySelectorAll('.animate-item');
      textStagger.fadeInUp(elements, { stagger: 0.2, delay: 0.3 });
    }
  }, []);

  return (
    <section className="relative h-screen overflow-hidden">
      {/* Background Layer */}
      <div
        ref={backgroundRef}
        className="absolute inset-0 bg-gradient-to-br from-blue-600 to-purple-600 will-change-transform"
      />

      {/* Midground Layer */}
      <div ref={overlayRef} className="absolute inset-0 bg-black/70" />

      {/* Foreground Layer */}
      <div
        ref={contentRef}
        className="relative z-10 h-full flex items-center justify-center px-6"
      >
        <div className="text-center text-white max-w-4xl">
          <h1 className="animate-item text-6xl md:text-8xl font-bold mb-6">
            Three Layer Animation
          </h1>
          <p className="animate-item text-xl mb-8 text-slate-300">
            Background parallax + Midground fade + Foreground stagger
          </p>
          <button className="animate-item bg-white text-black px-8 py-4 font-bold hover:scale-105 transition-transform">
            Get Started
          </button>
        </div>
      </div>
    </section>
  );
};

/**
 * DEMO 2: Card Grid with Alternating Entrance
 * Cards slide in from alternating directions with continuous parallax
 */
export const CardGridDemo: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const cards = [
    { icon: Rocket, title: 'Fast', description: 'Lightning-fast performance' },
    { icon: Shield, title: 'Secure', description: 'Enterprise-grade security' },
    { icon: Zap, title: 'Powerful', description: 'Unlimited possibilities' },
  ];

  useGSAP(() => {
    if (containerRef.current) {
      const cardElements = containerRef.current.querySelectorAll('.card-item');

      cardElements.forEach((card, index) => {
        const direction = index % 2 === 0 ? -60 : 60;

        // Entrance animation
        scrollReveal.fadeInUp(card, { y: 40, duration: 1 });

        // Continuous parallax
        parallax.horizontal(card, { 
          speed: direction * 0.3,
          start: 'top bottom',
          end: 'bottom top'
        });
      });
    }
  }, []);

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-16">
          Alternating Card Grid
        </h2>
        <div
          ref={containerRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {cards.map((card, index) => (
            <div
              key={index}
              className="card-item bg-slate-50 p-8 rounded-lg shadow-lg hover:shadow-2xl transition-shadow"
            >
              <card.icon className="w-12 h-12 text-blue-600 mb-4" />
              <h3 className="text-2xl font-bold mb-4">{card.title}</h3>
              <p className="text-slate-600">{card.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

/**
 * DEMO 3: Stats Counter
 * Numbers animate from 0 to target value on scroll
 */
export const StatsDemo: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const stats = [
    { value: 500, label: 'Projects Completed' },
    { value: 200, label: 'Happy Clients' },
    { value: 25, label: 'Years Experience' },
  ];

  useGSAP(() => {
    if (containerRef.current) {
      // Stagger entrance
      const statElements = containerRef.current.querySelectorAll('.stat-item');
      textStagger.fadeInUp(statElements, { stagger: 0.2 });

      // Animate numbers
      const numbers = containerRef.current.querySelectorAll('.stat-number');
      numbers.forEach((num) => {
        const target = parseInt(num.getAttribute('data-value') || '0');
        
        animationUtils.counter(num as HTMLElement, {
          target,
          duration: 2,
          suffix: '+',
          start: 'top 80%'
        });
      });
    }
  }, []);

  return (
    <section className="py-24 bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-16">
          Counter Animation
        </h2>
        <div
          ref={containerRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-12"
        >
          {stats.map((stat, index) => (
            <div key={index} className="stat-item text-center">
              <div
                className="stat-number text-6xl font-bold text-blue-400 mb-2"
                data-value={stat.value}
              >
                0+
              </div>
              <div className="text-sm uppercase tracking-widest text-slate-400">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

/**
 * DEMO 4: Text Reveal
 * Character-by-character text animation
 */
export const TextRevealDemo: React.FC = () => {
  const titleRef = useRef<HTMLHeadingElement>(null);

  useGSAP(() => {
    if (titleRef.current) {
      textStagger.splitText(titleRef.current, { 
        stagger: 0.03,
        delay: 0.5 
      });
    }
  }, []);

  return (
    <section className="py-24 bg-gradient-to-br from-purple-600 to-blue-600">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h2
          ref={titleRef}
          className="text-5xl md:text-7xl font-bold text-white"
        >
          Character Split Animation
        </h2>
      </div>
    </section>
  );
};

/**
 * DEMO 5: Parallax Layers
 * Multiple layers moving at different speeds
 */
export const ParallaxLayersDemo: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const layer1Ref = useRef<HTMLDivElement>(null);
  const layer2Ref = useRef<HTMLDivElement>(null);
  const layer3Ref = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (containerRef.current) {
      // Each layer moves at a different speed
      if (layer1Ref.current) {
        parallax.vertical(layer1Ref.current, { speed: 10 });
      }
      if (layer2Ref.current) {
        parallax.vertical(layer2Ref.current, { speed: 30 });
      }
      if (layer3Ref.current) {
        parallax.vertical(layer3Ref.current, { speed: 50 });
      }
    }
  }, []);

  return (
    <section ref={containerRef} className="relative h-screen overflow-hidden bg-slate-900">
      {/* Layer 1 - Slowest */}
      <div
        ref={layer1Ref}
        className="absolute inset-0 flex items-center justify-center will-change-transform"
      >
        <div className="w-96 h-96 bg-blue-500/20 rounded-full blur-3xl" />
      </div>

      {/* Layer 2 - Medium */}
      <div
        ref={layer2Ref}
        className="absolute inset-0 flex items-center justify-center will-change-transform"
      >
        <div className="w-64 h-64 bg-purple-500/30 rounded-full blur-2xl" />
      </div>

      {/* Layer 3 - Fastest */}
      <div
        ref={layer3Ref}
        className="absolute inset-0 flex items-center justify-center will-change-transform"
      >
        <h2 className="text-6xl font-bold text-white">Multi-Layer Parallax</h2>
      </div>
    </section>
  );
};

/**
 * DEMO 6: Scroll Reveal Variations
 * Different scroll-triggered animations
 */
export const ScrollRevealDemo: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (containerRef.current) {
      const fadeUpElements = containerRef.current.querySelectorAll('.fade-up');
      const scaleElements = containerRef.current.querySelectorAll('.scale-in');
      const staggerElements = containerRef.current.querySelectorAll('.stagger-item');

      // Fade up
      fadeUpElements.forEach((el) => {
        scrollReveal.fadeInUp(el);
      });

      // Scale in
      scaleElements.forEach((el) => {
        scrollReveal.scaleIn(el);
      });

      // Stagger
      scrollReveal.staggerIn(staggerElements, { stagger: 0.15 });
    }
  }, []);

  return (
    <section className="py-24 bg-white">
      <div ref={containerRef} className="max-w-7xl mx-auto px-6 space-y-24">
        {/* Fade Up */}
        <div className="fade-up">
          <h3 className="text-3xl font-bold mb-4">Fade Up Animation</h3>
          <p className="text-slate-600">Elements fade in and slide up when entering viewport</p>
        </div>

        {/* Scale In */}
        <div className="scale-in">
          <h3 className="text-3xl font-bold mb-4">Scale In Animation</h3>
          <p className="text-slate-600">Elements scale from 90% to 100% while fading in</p>
        </div>

        {/* Stagger */}
        <div>
          <h3 className="text-3xl font-bold mb-8">Stagger Animation</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="stagger-item bg-blue-100 p-8 rounded-lg text-center"
              >
                <div className="text-2xl font-bold">Item {i}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

/**
 * Full Demo Page
 * Combines all demos into one scrollable page
 */
export const AnimationDemoPage: React.FC = () => {
  return (
    <div className="overflow-x-hidden">
      <HeroDemo />
      <CardGridDemo />
      <StatsDemo />
      <TextRevealDemo />
      <ParallaxLayersDemo />
      <ScrollRevealDemo />
    </div>
  );
};

export default AnimationDemoPage;
