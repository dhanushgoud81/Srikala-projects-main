/**
 * Advanced ScrollTrigger Demo
 * 
 * Demonstrates advanced ScrollTrigger features from the official documentation
 * https://gsap.com/docs/v3/Plugins/ScrollTrigger/
 */

import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '../lib/useGSAP';
import { pinning, scrubbing, snapping, batching, horizontal, patterns } from '../lib/advancedScrollTrigger';
import { Box, Layers, Zap, Star } from 'lucide-react';

/**
 * DEMO 1: Pinned Section
 * Section stays pinned while content scrolls
 */
export const PinnedSectionDemo: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (sectionRef.current && contentRef.current) {
      // Pin the section
      pinning.pinForDuration(sectionRef.current, {
        duration: '200%',
        start: 'top top',
        anticipatePin: 1,
      });

      // Animate content while pinned
      gsap.to(contentRef.current, {
        scale: 1.5,
        rotation: 360,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=200%',
          scrub: 1,
        },
      });
    }
  }, []);

  return (
    <section ref={sectionRef} className="h-screen flex items-center justify-center bg-gradient-to-br from-purple-600 to-blue-600">
      <div ref={contentRef} className="text-white text-center">
        <Box className="w-24 h-24 mx-auto mb-4" />
        <h2 className="text-5xl font-bold">Pinned Section</h2>
        <p className="text-xl mt-4">This section stays pinned while scrolling</p>
      </div>
    </section>
  );
};

/**
 * DEMO 2: Smooth Scrubbing
 * Animation linked to scroll with smooth catch-up
 */
export const SmoothScrubDemo: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const boxRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (containerRef.current && boxRef.current) {
      const tl = gsap.timeline({
        scrollTrigger: scrubbing.smoothScrub({
          trigger: containerRef.current,
          start: 'top center',
          end: 'bottom center',
          scrub: 1,
        })
      });
      
      tl.to(boxRef.current, {
        x: 500,
        rotation: 360,
        backgroundColor: '#10b981',
        duration: 1,
      })
      .to(boxRef.current, {
        y: 200,
        scale: 1.5,
        duration: 1,
      })
      .to(boxRef.current, {
        x: 0,
        rotation: 0,
        backgroundColor: '#3b82f6',
        duration: 1,
      });
    }
  }, []);

  return (
    <section ref={containerRef} className="min-h-screen flex items-center justify-center bg-slate-100 py-24">
      <div className="text-center">
        <h2 className="text-4xl font-bold mb-8">Smooth Scrubbing</h2>
        <p className="text-slate-600 mb-12">Animation smoothly catches up to scroll position</p>
        <div ref={boxRef} className="w-24 h-24 bg-blue-600 mx-auto rounded-lg" />
      </div>
    </section>
  );
};

/**
 * DEMO 3: Snap to Labels
 * Snaps to specific points in timeline
 */
export const SnapToLabelsDemo: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const boxRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (containerRef.current && boxRef.current) {
      const tl = gsap.timeline({
        scrollTrigger: snapping.snapToLabels({
          trigger: containerRef.current,
          directional: true,
        })
      });

      tl.addLabel('start')
        .to(boxRef.current, { x: 200, duration: 1 })
        .addLabel('middle')
        .to(boxRef.current, { y: 200, duration: 1 })
        .addLabel('end')
        .to(boxRef.current, { x: 0, y: 0, duration: 1 });
    }
  }, []);

  return (
    <section ref={containerRef} className="min-h-screen flex items-center justify-center bg-white py-24">
      <div className="text-center">
        <h2 className="text-4xl font-bold mb-8">Snap to Labels</h2>
        <p className="text-slate-600 mb-12">Snaps to timeline labels when you stop scrolling</p>
        <div className="relative w-96 h-96 border-2 border-slate-300 mx-auto">
          <div ref={boxRef} className="absolute top-0 left-0 w-24 h-24 bg-purple-600 rounded-lg" />
        </div>
      </div>
    </section>
  );
};

/**
 * DEMO 4: Batch Animations
 * Multiple elements animate together
 */
export const BatchAnimationDemo: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (containerRef.current) {
      batching.batchReveal('.batch-item', {
        interval: 0.1,
        batchMax: 3,
        onEnter: (batch) => {
          gsap.from(batch, {
            opacity: 0,
            y: 60,
            scale: 0.8,
            stagger: 0.15,
            duration: 1,
            ease: 'back.out(1.7)',
          });
        },
      });
    }
  }, []);

  const items = Array.from({ length: 12 }, (_, i) => i + 1);

  return (
    <section ref={containerRef} className="min-h-screen bg-slate-900 text-white py-24">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-8">Batch Animations</h2>
        <p className="text-slate-400 text-center mb-12">Elements that enter together animate together</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {items.map((item) => (
            <div
              key={item}
              className="batch-item bg-gradient-to-br from-blue-500 to-purple-600 p-8 rounded-lg text-center"
            >
              <Layers className="w-12 h-12 mx-auto mb-4" />
              <div className="text-2xl font-bold">Item {item}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

/**
 * DEMO 5: Horizontal Scroll
 * Horizontal scrolling section
 */
export const HorizontalScrollDemo: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (containerRef.current) {
      horizontal.createHorizontalScroll(containerRef.current, {
        pin: true,
        scrub: 1,
      });
    }
  }, []);

  const panels = [
    { color: 'from-red-500 to-orange-500', title: 'Panel 1' },
    { color: 'from-blue-500 to-cyan-500', title: 'Panel 2' },
    { color: 'from-green-500 to-emerald-500', title: 'Panel 3' },
    { color: 'from-purple-500 to-pink-500', title: 'Panel 4' },
  ];

  return (
    <section className="overflow-hidden">
      <div className="py-24 text-center bg-white">
        <h2 className="text-4xl font-bold mb-4">Horizontal Scroll</h2>
        <p className="text-slate-600">Scroll down to move horizontally</p>
      </div>
      <div ref={containerRef} className="flex h-screen">
        {panels.map((panel, index) => (
          <div
            key={index}
            className={`min-w-full h-full flex items-center justify-center bg-gradient-to-br ${panel.color}`}
          >
            <div className="text-white text-center">
              <Star className="w-24 h-24 mx-auto mb-4" />
              <h3 className="text-6xl font-bold">{panel.title}</h3>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

/**
 * DEMO 6: Toggle Class
 * Add/remove classes based on scroll position
 */
export const ToggleClassDemo: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (containerRef.current) {
      const items = containerRef.current.querySelectorAll('.toggle-item');
      
      items.forEach((item) => {
        patterns.revealWithClass(item, 'active');
      });
    }
  }, []);

  return (
    <section ref={containerRef} className="min-h-screen bg-slate-100 py-24">
      <div className="max-w-4xl mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-8">Toggle Class</h2>
        <p className="text-slate-600 text-center mb-12">Classes toggle as elements enter/leave viewport</p>
        
        <style>{`
          .toggle-item {
            opacity: 0.3;
            transform: scale(0.9);
            transition: all 0.5s ease;
          }
          .toggle-item.active {
            opacity: 1;
            transform: scale(1);
          }
        `}</style>

        <div className="space-y-12">
          {[1, 2, 3, 4].map((item) => (
            <div
              key={item}
              className="toggle-item bg-white p-12 rounded-lg shadow-lg"
            >
              <Zap className="w-16 h-16 text-yellow-500 mb-4" />
              <h3 className="text-2xl font-bold mb-2">Section {item}</h3>
              <p className="text-slate-600">
                This section becomes active when it enters the viewport
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

/**
 * DEMO 7: Progress Indicator
 * Show scroll progress
 */
export const ProgressIndicatorDemo: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const percentRef = useRef<HTMLSpanElement>(null);

  useGSAP(() => {
    if (containerRef.current && progressRef.current && percentRef.current) {
      gsap.to(progressRef.current, {
        scaleX: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: true,
          onUpdate: (self) => {
            if (percentRef.current) {
              percentRef.current.textContent = Math.round(self.progress * 100) + '%';
            }
          },
        },
      });
    }
  }, []);

  return (
    <section ref={containerRef} className="min-h-[200vh] bg-gradient-to-b from-slate-900 to-slate-700 py-24 relative">
      {/* Fixed progress bar */}
      <div className="fixed top-0 left-0 w-full h-2 bg-slate-800 z-50">
        <div
          ref={progressRef}
          className="h-full bg-gradient-to-r from-blue-500 to-purple-500 origin-left"
          style={{ transform: 'scaleX(0)' }}
        />
      </div>

      <div className="max-w-4xl mx-auto px-6 text-white text-center">
        <h2 className="text-4xl font-bold mb-8">Progress Indicator</h2>
        <p className="text-slate-300 mb-12">Watch the progress bar at the top</p>
        
        <div className="text-8xl font-bold mb-12">
          <span ref={percentRef}>0%</span>
        </div>

        <div className="space-y-24">
          {[1, 2, 3, 4, 5].map((item) => (
            <div key={item} className="bg-white/10 backdrop-blur-sm p-12 rounded-lg">
              <h3 className="text-3xl font-bold mb-4">Section {item}</h3>
              <p className="text-slate-300">Scroll to see progress</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

/**
 * Full Demo Page
 */
export const AdvancedScrollTriggerDemoPage: React.FC = () => {
  return (
    <div className="overflow-x-hidden">
      <div className="bg-slate-900 text-white py-24 text-center">
        <h1 className="text-6xl font-bold mb-4">Advanced ScrollTrigger</h1>
        <p className="text-xl text-slate-400">Based on official GSAP documentation</p>
      </div>

      <PinnedSectionDemo />
      <SmoothScrubDemo />
      <SnapToLabelsDemo />
      <BatchAnimationDemo />
      <HorizontalScrollDemo />
      <ToggleClassDemo />
      <ProgressIndicatorDemo />

      <div className="bg-slate-900 text-white py-24 text-center">
        <h2 className="text-4xl font-bold mb-4">End of Demos</h2>
        <p className="text-slate-400">Scroll back up to see them again!</p>
      </div>
    </div>
  );
};

export default AdvancedScrollTriggerDemoPage;
