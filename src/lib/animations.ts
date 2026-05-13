/**
 * GSAP Animation Utilities
 * 
 * This module provides reusable animation patterns organized by UI layers:
 * - Foreground: Text stagger effects for "building" animations
 * - Midground: Parallax effects for depth perception
 * - Background: Subtle fade & scale for ambient movement
 */

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register plugins
gsap.registerPlugin(ScrollTrigger);

/**
 * FOREGROUND LAYER: Text Stagger Animations
 * Creates a "building" effect where words/elements appear one by one
 */
export const textStagger = {
  /**
   * Animates text elements with a stagger effect
   * @param elements - DOM elements or selector
   * @param options - Animation configuration
   */
  fadeInUp: (
    elements: gsap.TweenTarget,
    options: {
      delay?: number;
      stagger?: number;
      duration?: number;
      y?: number;
    } = {}
  ) => {
    const { delay = 0, stagger = 0.1, duration = 0.8, y = 40 } = options;

    return gsap.fromTo(
      elements,
      { opacity: 0, y },
      {
        opacity: 1,
        y: 0,
        duration,
        delay,
        stagger,
        ease: 'power3.out',
      }
    );
  },

  /**
   * Animates text with horizontal stagger
   */
  fadeInSlide: (
    elements: gsap.TweenTarget,
    options: {
      delay?: number;
      stagger?: number;
      duration?: number;
      x?: number;
    } = {}
  ) => {
    const { delay = 0, stagger = 0.15, duration = 1, x = 60 } = options;

    return gsap.fromTo(
      elements,
      { opacity: 0, x },
      {
        opacity: 1,
        x: 0,
        duration,
        delay,
        stagger,
        ease: 'power3.out',
      }
    );
  },

  /**
   * Animates characters individually for dramatic effect
   */
  splitText: (
    element: HTMLElement,
    options: {
      delay?: number;
      stagger?: number;
      duration?: number;
    } = {}
  ) => {
    const { delay = 0, stagger = 0.03, duration = 0.6 } = options;
    const text = element.textContent || '';
    const chars = text.split('');
    
    element.innerHTML = chars
      .map((char) => `<span class="inline-block">${char === ' ' ? '&nbsp;' : char}</span>`)
      .join('');

    return gsap.fromTo(
      element.children,
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration,
        delay,
        stagger,
        ease: 'back.out(1.7)',
      }
    );
  },
};

/**
 * MIDGROUND LAYER: Parallax Effects
 * Creates depth by moving elements at different speeds
 */
export const parallax = {
  /**
   * Standard parallax effect - element moves slower than scroll
   */
  vertical: (
    element: gsap.TweenTarget,
    options: {
      speed?: number;
      start?: string;
      end?: string;
    } = {}
  ) => {
    const { speed = 30, start = 'top top', end = 'bottom top' } = options;

    return gsap.to(element, {
      yPercent: speed,
      ease: 'none',
      scrollTrigger: {
        trigger: element as gsap.DOMTarget,
        start,
        end,
        scrub: 1,
      },
    });
  },

  /**
   * Horizontal parallax for side-to-side movement
   */
  horizontal: (
    element: gsap.TweenTarget,
    options: {
      speed?: number;
      start?: string;
      end?: string;
    } = {}
  ) => {
    const { speed = 50, start = 'top bottom', end = 'bottom top' } = options;

    return gsap.to(element, {
      x: speed,
      ease: 'none',
      scrollTrigger: {
        trigger: element as gsap.DOMTarget,
        start,
        end,
        scrub: 1.5,
      },
    });
  },

  /**
   * Creates 3D depth effect with multiple layers
   */
  layered: (
    layers: { element: gsap.TweenTarget; speed: number }[],
    container: Element
  ) => {
    return layers.map(({ element, speed }) =>
      gsap.to(element, {
        yPercent: speed,
        ease: 'none',
        scrollTrigger: {
          trigger: container,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        },
      })
    );
  },
};

/**
 * BACKGROUND LAYER: Ambient Animations
 * Subtle movements that make the site feel "alive"
 */
export const ambient = {
  /**
   * Gentle fade effect on scroll
   */
  fade: (
    element: gsap.TweenTarget,
    options: {
      from?: number;
      to?: number;
      start?: string;
      end?: string;
    } = {}
  ) => {
    const { from = 1, to = 0, start = 'top top', end = 'bottom top' } = options;

    return gsap.fromTo(
      element,
      { opacity: from },
      {
        opacity: to,
        ease: 'none',
        scrollTrigger: {
          trigger: element as gsap.DOMTarget,
          start,
          end,
          scrub: 1,
        },
      }
    );
  },

  /**
   * Subtle scale animation
   */
  scale: (
    element: gsap.TweenTarget,
    options: {
      from?: number;
      to?: number;
      start?: string;
      end?: string;
    } = {}
  ) => {
    const { from = 1, to = 1.1, start = 'top bottom', end = 'bottom top' } = options;

    return gsap.fromTo(
      element,
      { scale: from },
      {
        scale: to,
        ease: 'none',
        scrollTrigger: {
          trigger: element as gsap.DOMTarget,
          start,
          end,
          scrub: 2,
        },
      }
    );
  },

  /**
   * Glow effect that pulses subtly
   */
  glow: (element: gsap.TweenTarget, options: { duration?: number } = {}) => {
    const { duration = 3 } = options;

    return gsap.to(element, {
      opacity: 0.6,
      duration,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    });
  },
};

/**
 * SCROLL-TRIGGERED ANIMATIONS
 * Animations that trigger when elements enter viewport
 */
export const scrollReveal = {
  /**
   * Fade in and slide up when element enters viewport
   */
  fadeInUp: (
    element: gsap.TweenTarget,
    options: {
      y?: number;
      duration?: number;
      start?: string;
    } = {}
  ) => {
    const { y = 60, duration = 1, start = 'top 85%' } = options;

    return gsap.fromTo(
      element,
      { opacity: 0, y },
      {
        opacity: 1,
        y: 0,
        duration,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: element as gsap.DOMTarget,
          start,
          toggleActions: 'play none none none',
        },
      }
    );
  },

  /**
   * Scale and fade in
   */
  scaleIn: (
    element: gsap.TweenTarget,
    options: {
      scale?: number;
      duration?: number;
      start?: string;
    } = {}
  ) => {
    const { scale = 0.9, duration = 1, start = 'top 80%' } = options;

    return gsap.fromTo(
      element,
      { opacity: 0, scale },
      {
        opacity: 1,
        scale: 1,
        duration,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: element as gsap.DOMTarget,
          start,
          toggleActions: 'play none none none',
        },
      }
    );
  },

  /**
   * Stagger animation for multiple elements
   */
  staggerIn: (
    elements: gsap.TweenTarget,
    options: {
      y?: number;
      stagger?: number;
      duration?: number;
      start?: string;
    } = {}
  ) => {
    const { y = 40, stagger = 0.2, duration = 0.8, start = 'top 85%' } = options;

    return gsap.fromTo(
      elements,
      { opacity: 0, y },
      {
        opacity: 1,
        y: 0,
        duration,
        stagger,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: elements as gsap.DOMTarget,
          start,
          toggleActions: 'play none none none',
        },
      }
    );
  },
};

/**
 * UTILITY FUNCTIONS
 */
export const animationUtils = {
  /**
   * Cleanup all ScrollTrigger instances
   */
  cleanup: () => {
    ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
  },

  /**
   * Refresh ScrollTrigger calculations
   */
  refresh: () => {
    ScrollTrigger.refresh();
  },

  /**
   * Counter animation for numbers
   */
  counter: (
    element: HTMLElement,
    options: {
      target: number;
      duration?: number;
      suffix?: string;
      start?: string;
    }
  ) => {
    const { target, duration = 2, suffix = '+', start = 'top 80%' } = options;

    return gsap.fromTo(
      element,
      { textContent: 0 },
      {
        textContent: target,
        duration,
        ease: 'power2.out',
        snap: { textContent: 1 },
        scrollTrigger: {
          trigger: element,
          start,
        },
        onUpdate: function () {
          const current = Math.ceil(gsap.getProperty(element, 'textContent') as number);
          element.textContent = current + suffix;
        },
      }
    );
  },
};

/**
 * PRESET ANIMATION COMBINATIONS
 * Common animation patterns ready to use
 */
export const presets = {
  /**
   * Hero section with parallax background and staggered content
   */
  hero: (
    background: gsap.TweenTarget,
    overlay: gsap.TweenTarget,
    content: gsap.TweenTarget
  ) => {
    const animations = [
      parallax.vertical(background, { speed: 30 }),
      ambient.fade(overlay, { from: 0.7, to: 0.9 }),
      gsap.fromTo(
        content,
        { opacity: 0, y: 60 },
        { opacity: 1, y: 0, duration: 1.2, delay: 0.3, ease: 'power3.out' }
      ),
    ];

    return animations;
  },

  /**
   * Card grid with alternating horizontal entrance
   */
  cardGrid: (cards: Element[], container: Element) => {
    const animations: gsap.core.Tween[] = [];

    cards.forEach((card, index) => {
      const direction = index % 2 === 0 ? -60 : 60;

      // Entrance animation
      animations.push(
        gsap.fromTo(
          card,
          { opacity: 0, x: direction, y: 40 },
          {
            opacity: 1,
            x: 0,
            y: 0,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        )
      );

      // Parallax on scroll
      animations.push(
        gsap.to(card, {
          x: direction * 0.3,
          ease: 'none',
          scrollTrigger: {
            trigger: container,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.5,
          },
        })
      );
    });

    return animations;
  },
};
