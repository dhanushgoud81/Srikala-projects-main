/**
 * Advanced ScrollTrigger Utilities
 * 
 * Enhanced ScrollTrigger patterns based on official GSAP documentation
 * https://gsap.com/docs/v3/Plugins/ScrollTrigger/
 */

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * PINNING EFFECTS
 * Pin elements in place while scrolling
 */
export const pinning = {
  /**
   * Pin an element for a specific duration
   */
  pinForDuration: (
    element: gsap.DOMTarget,
    options: {
      duration?: string | number;
      start?: string;
      pinSpacing?: boolean;
      anticipatePin?: number;
    } = {}
  ) => {
    const { duration = '100%', start = 'top top', pinSpacing = true, anticipatePin = 1 } = options;

    return ScrollTrigger.create({
      trigger: element,
      pin: true,
      start,
      end: `+=${duration}`,
      pinSpacing,
      anticipatePin,
    });
  },

  /**
   * Pin element with reparenting (escapes ancestor transforms)
   */
  pinWithReparent: (
    element: gsap.DOMTarget,
    options: {
      start?: string;
      end?: string;
    } = {}
  ) => {
    const { start = 'top top', end = 'bottom top' } = options;

    return ScrollTrigger.create({
      trigger: element,
      pin: true,
      pinReparent: true,
      start,
      end,
    });
  },

  /**
   * Pin multiple sections sequentially
   */
  pinSequence: (sections: gsap.DOMTarget[]) => {
    return sections.map((section) =>
      ScrollTrigger.create({
        trigger: section,
        pin: true,
        start: 'top top',
        end: 'bottom top',
        pinSpacing: false,
      })
    );
  },
};

/**
 * SCRUBBING EFFECTS
 * Link animations directly to scroll position
 * 
 * Note: These return ScrollTrigger configs to use when creating animations
 */
export const scrubbing = {
  /**
   * Smooth scrub with catch-up time
   * Returns config object to use in animation creation
   */
  smoothScrub: (options: {
    trigger: gsap.DOMTarget;
    start?: string;
    end?: string;
    scrub?: number;
  }) => {
    const { trigger, start = 'top bottom', end = 'bottom top', scrub = 1 } = options;

    return {
      trigger,
      start,
      end,
      scrub, // Takes 1 second to catch up
    };
  },

  /**
   * Instant scrub (no smoothing)
   * Returns config object to use in animation creation
   */
  instantScrub: (options: {
    trigger: gsap.DOMTarget;
    start?: string;
    end?: string;
  }) => {
    const { trigger, start = 'top bottom', end = 'bottom top' } = options;

    return {
      trigger,
      start,
      end,
      scrub: true, // Instant, no smoothing
    };
  },

  /**
   * Scrub with progress callback
   * Returns config object to use in animation creation
   */
  scrubWithProgress: (options: {
    trigger: gsap.DOMTarget;
    onUpdate?: (self: ScrollTrigger) => void;
    start?: string;
    end?: string;
  }) => {
    const { trigger, onUpdate, start = 'top bottom', end = 'bottom top' } = options;

    return {
      trigger,
      start,
      end,
      scrub: 1,
      onUpdate: onUpdate || ((self) => console.log('Progress:', self.progress)),
    };
  },
};

/**
 * SNAPPING EFFECTS
 * Snap to specific scroll positions
 * 
 * Note: These return ScrollTrigger configs to use when creating animations
 */
export const snapping = {
  /**
   * Snap to increments
   * Returns config object to use in animation creation
   */
  snapToIncrements: (options: {
    trigger: gsap.DOMTarget;
    increment?: number;
    duration?: number;
  }) => {
    const { trigger, increment = 0.1, duration = 0.5 } = options;

    return {
      trigger,
      start: 'top top',
      end: 'bottom top',
      scrub: 1,
      snap: {
        snapTo: increment,
        duration,
        ease: 'power1.inOut',
      },
    };
  },

  /**
   * Snap to timeline labels
   * Returns config object to use in timeline creation
   */
  snapToLabels: (options: {
    trigger: gsap.DOMTarget;
    directional?: boolean;
  }) => {
    const { trigger, directional = true } = options;

    return {
      trigger,
      start: 'top top',
      end: 'bottom top',
      scrub: 1,
      snap: (directional ? 'labelsDirectional' : 'labels') as 'labels' | 'labelsDirectional',
    };
  },

  /**
   * Snap to specific points
   * Returns config object to use in animation creation
   */
  snapToPoints: (options: {
    trigger: gsap.DOMTarget;
    points: number[];
  }) => {
    const { trigger, points } = options;

    return {
      trigger,
      start: 'top top',
      end: 'bottom top',
      scrub: 1,
      snap: {
        snapTo: points,
        duration: 0.3,
      },
    };
  },
};

/**
 * BATCH ANIMATIONS
 * Coordinate multiple ScrollTriggers
 */
export const batching = {
  /**
   * Batch elements that enter viewport together
   */
  batchReveal: (
    selector: string,
    options: {
      interval?: number;
      batchMax?: number;
      onEnter?: (batch: Element[]) => void;
    } = {}
  ) => {
    const { interval = 0.1, batchMax = 3, onEnter } = options;

    return ScrollTrigger.batch(selector, {
      interval,
      batchMax,
      onEnter: onEnter || ((batch) => {
        gsap.from(batch, {
          opacity: 0,
          y: 60,
          stagger: 0.15,
          duration: 1,
          ease: 'power3.out',
        });
      }),
    });
  },

  /**
   * Batch with custom callbacks
   */
  batchCustom: (
    selector: string,
    callbacks: {
      onEnter?: (batch: Element[]) => void;
      onLeave?: (batch: Element[]) => void;
      onEnterBack?: (batch: Element[]) => void;
      onLeaveBack?: (batch: Element[]) => void;
    }
  ) => {
    return ScrollTrigger.batch(selector, {
      ...callbacks,
    });
  },
};

/**
 * TOGGLE ACTIONS
 * Control animations at different scroll points
 * 
 * Note: These return ScrollTrigger configs to use when creating animations
 */
export const toggleActions = {
  /**
   * Play once on enter
   * Returns config object to use in animation creation
   */
  playOnce: (trigger: gsap.DOMTarget) => {
    return {
      trigger,
      start: 'top 80%',
      toggleActions: 'play none none none',
      once: true,
    };
  },

  /**
   * Play/reverse on enter/leave
   * Returns config object to use in animation creation
   */
  playReverse: (trigger: gsap.DOMTarget) => {
    return {
      trigger,
      start: 'top 80%',
      end: 'bottom 20%',
      toggleActions: 'play reverse play reverse',
    };
  },

  /**
   * Play/pause/resume/reset
   * Returns config object to use in animation creation
   */
  fullControl: (trigger: gsap.DOMTarget) => {
    return {
      trigger,
      start: 'top 80%',
      end: 'bottom 20%',
      toggleActions: 'play pause resume reset',
    };
  },
};

/**
 * HORIZONTAL SCROLLING
 * Create horizontal scroll sections
 */
export const horizontal = {
  /**
   * Horizontal scroll container
   */
  createHorizontalScroll: (
    container: gsap.DOMTarget,
    options: {
      pin?: boolean;
      scrub?: number | boolean;
    } = {}
  ) => {
    const { pin = true, scrub = 1 } = options;

    const sections = gsap.utils.toArray(`${container} > *`) as Element[];
    
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        pin,
        scrub,
        end: () => `+=${(container as Element).scrollWidth}`,
      },
    });

    tl.to(sections, {
      xPercent: -100 * (sections.length - 1),
      ease: 'none',
    });

    return tl;
  },

  /**
   * Horizontal scroll with individual triggers
   */
  horizontalWithTriggers: (
    container: gsap.DOMTarget,
    itemSelector: string
  ) => {
    const containerAnimation = gsap.to(container, {
      x: () => -(container as Element).scrollWidth + window.innerWidth,
      ease: 'none',
      scrollTrigger: {
        trigger: container,
        pin: true,
        scrub: 1,
        end: () => `+=${(container as Element).scrollWidth}`,
      },
    });

    // Individual item animations
    gsap.utils.toArray(itemSelector).forEach((item) => {
      gsap.from(item as Element, {
        opacity: 0,
        scale: 0.8,
        scrollTrigger: {
          trigger: item as Element,
          containerAnimation,
          start: 'left right',
          end: 'right left',
          scrub: true,
        },
      });
    });

    return containerAnimation;
  },
};

/**
 * CALLBACKS & EVENTS
 * Advanced callback patterns
 */
export const callbacks = {
  /**
   * Create with all callbacks
   */
  withAllCallbacks: (
    trigger: gsap.DOMTarget,
    handlers: {
      onEnter?: (self: ScrollTrigger) => void;
      onLeave?: (self: ScrollTrigger) => void;
      onEnterBack?: (self: ScrollTrigger) => void;
      onLeaveBack?: (self: ScrollTrigger) => void;
      onUpdate?: (self: ScrollTrigger) => void;
      onToggle?: (self: ScrollTrigger) => void;
    }
  ) => {
    return ScrollTrigger.create({
      trigger,
      start: 'top 80%',
      end: 'bottom 20%',
      ...handlers,
    });
  },

  /**
   * Velocity-based callback
   */
  onVelocityChange: (
    trigger: gsap.DOMTarget,
    callback: (velocity: number) => void
  ) => {
    return ScrollTrigger.create({
      trigger,
      onUpdate: (self) => {
        callback(self.getVelocity());
      },
    });
  },
};

/**
 * RESPONSIVE SCROLLTRIGGERS
 * Media query based ScrollTriggers
 */
export const responsive = {
  /**
   * Different animations for different screen sizes
   */
  matchMedia: (configs: {
    [query: string]: () => void | (() => void);
  }) => {
    ScrollTrigger.matchMedia(configs);
  },

  /**
   * Mobile vs Desktop
   */
  mobileDesktop: (
    mobileSetup: () => void,
    desktopSetup: () => void
  ) => {
    ScrollTrigger.matchMedia({
      '(max-width: 768px)': mobileSetup,
      '(min-width: 769px)': desktopSetup,
    });
  },
};

/**
 * UTILITY FUNCTIONS
 */
export const utils = {
  /**
   * Check if element is in viewport
   */
  isInViewport: (
    element: Element | string,
    proportion: number = 0
  ): boolean => {
    return ScrollTrigger.isInViewport(element, proportion);
  },

  /**
   * Get element position in viewport
   */
  positionInViewport: (
    element: Element | string,
    referencePoint: string = 'top'
  ): number => {
    return ScrollTrigger.positionInViewport(element, referencePoint);
  },

  /**
   * Get max scroll position
   */
  maxScroll: (
    scroller?: HTMLElement | Window,
    horizontal: boolean = false
  ): number => {
    return ScrollTrigger.maxScroll(scroller || window, horizontal);
  },

  /**
   * Check if scrolling
   */
  isScrolling: (): boolean => {
    return ScrollTrigger.isScrolling();
  },

  /**
   * Refresh all ScrollTriggers
   */
  refreshAll: () => {
    ScrollTrigger.refresh();
  },

  /**
   * Kill all ScrollTriggers
   */
  killAll: () => {
    ScrollTrigger.killAll();
  },

  /**
   * Get ScrollTrigger by ID
   */
  getById: (id: string): ScrollTrigger | undefined => {
    return ScrollTrigger.getById(id);
  },

  /**
   * Get all ScrollTriggers
   */
  getAll: (): ScrollTrigger[] => {
    return ScrollTrigger.getAll();
  },
};

/**
 * ADVANCED PATTERNS
 */
export const patterns = {
  /**
   * Reveal on scroll with class toggle
   */
  revealWithClass: (
    trigger: gsap.DOMTarget,
    className: string = 'active'
  ) => {
    return ScrollTrigger.create({
      trigger,
      start: 'top 80%',
      end: 'bottom 20%',
      toggleClass: className,
    });
  },

  /**
   * Prevent overlapping animations
   * Returns config object to use in animation creation
   */
  preventOverlaps: (
    trigger: gsap.DOMTarget,
    group: string = 'default'
  ) => {
    return {
      trigger,
      start: 'top 80%',
      preventOverlaps: group,
    };
  },

  /**
   * Fast scroll end
   * Returns config object to use in animation creation
   */
  fastScrollEnd: (
    trigger: gsap.DOMTarget,
    velocity: number = 2500
  ) => {
    return {
      trigger,
      start: 'top 80%',
      end: 'bottom 20%',
      fastScrollEnd: velocity,
    };
  },

  /**
   * Clamp start/end positions
   * Returns config object to use in animation creation
   */
  clampPositions: (trigger: gsap.DOMTarget) => {
    return {
      trigger,
      start: 'clamp(top bottom)',
      end: 'clamp(bottom top)',
      scrub: 1,
    };
  },
};

/**
 * PRESET COMBINATIONS
 */
export const presets = {
  /**
   * Full-screen pinned section with scrub
   * Returns config object to use in animation creation
   */
  pinnedSection: (section: gsap.DOMTarget) => {
    return {
      trigger: section,
      pin: true,
      scrub: 1,
      start: 'top top',
      end: '+=100%',
      anticipatePin: 1,
    };
  },

  /**
   * Horizontal scroll section
   */
  horizontalSection: (container: gsap.DOMTarget) => {
    return horizontal.createHorizontalScroll(container, {
      pin: true,
      scrub: 1,
    });
  },

  /**
   * Batch reveal cards
   */
  batchCards: (selector: string) => {
    return batching.batchReveal(selector, {
      interval: 0.1,
      batchMax: 3,
    });
  },
};

export default {
  pinning,
  scrubbing,
  snapping,
  batching,
  toggleActions,
  horizontal,
  callbacks,
  responsive,
  utils,
  patterns,
  presets,
};
