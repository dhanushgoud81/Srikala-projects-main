/**
 * Stunning Professional Animations
 * 
 * High-impact, visually impressive animations for modern web experiences
 */

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * MAGNETIC EFFECTS
 * Elements that follow or react to cursor movement
 */
export const magnetic = {
  /**
   * Magnetic button - follows cursor when hovering
   */
  button: (element: HTMLElement, strength: number = 0.5) => {
    const handleMouseMove = (e: MouseEvent) => {
      const rect = element.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      const deltaX = (e.clientX - centerX) * strength;
      const deltaY = (e.clientY - centerY) * strength;

      gsap.to(element, {
        x: deltaX,
        y: deltaY,
        duration: 0.3,
        ease: 'power2.out',
      });
    };

    const handleMouseLeave = () => {
      gsap.to(element, {
        x: 0,
        y: 0,
        duration: 0.5,
        ease: 'elastic.out(1, 0.3)',
      });
    };

    element.addEventListener('mousemove', handleMouseMove);
    element.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      element.removeEventListener('mousemove', handleMouseMove);
      element.removeEventListener('mouseleave', handleMouseLeave);
    };
  },

  /**
   * Magnetic area - elements follow cursor in a container
   */
  area: (container: HTMLElement, items: HTMLElement[], strength: number = 0.3) => {
    const handleMouseMove = (e: MouseEvent) => {
      items.forEach((item) => {
        const rect = item.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        const deltaX = (e.clientX - centerX) * strength;
        const deltaY = (e.clientY - centerY) * strength;

        gsap.to(item, {
          x: deltaX,
          y: deltaY,
          duration: 0.5,
          ease: 'power2.out',
        });
      });
    };

    const handleMouseLeave = () => {
      items.forEach((item) => {
        gsap.to(item, {
          x: 0,
          y: 0,
          duration: 0.8,
          ease: 'elastic.out(1, 0.3)',
        });
      });
    };

    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseleave', handleMouseLeave);
    };
  },
};

/**
 * TEXT REVEAL ANIMATIONS
 * Stunning text entrance effects
 */
export const textReveal = {
  /**
   * Split text by characters and animate
   */
  splitChars: (element: HTMLElement, options: {
    stagger?: number;
    duration?: number;
    ease?: string;
    from?: 'top' | 'bottom' | 'left' | 'right';
  } = {}) => {
    const { stagger = 0.03, duration = 0.6, ease = 'back.out(1.7)', from = 'bottom' } = options;
    
    const text = element.textContent || '';
    const words = text.split(' ').filter(w => w.length > 0);
    
    element.innerHTML = words
      .map((word) => {
        const wordChars = word.split('').map(char => 
          `<span class="char inline-block" style="display: inline-block;">${char}</span>`
        ).join('');
        return `<span class="inline-block whitespace-nowrap">${wordChars}</span>`;
      })
      .join(' ');

    const charElements = element.querySelectorAll('.char');
    
    const fromProps: any = { opacity: 0 };
    if (from === 'bottom') fromProps.y = 50;
    if (from === 'top') fromProps.y = -50;
    if (from === 'left') fromProps.x = -50;
    if (from === 'right') fromProps.x = 50;

    return gsap.from(charElements, {
      ...fromProps,
      duration,
      stagger,
      ease,
      scrollTrigger: {
        trigger: element,
        start: 'top 85%',
      },
    });
  },

  /**
   * Clip path reveal
   */
  clipPath: (element: HTMLElement, direction: 'left' | 'right' | 'top' | 'bottom' = 'left') => {
    const clipPaths = {
      left: 'polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)',
      right: 'polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)',
      top: 'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)',
      bottom: 'polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)',
    };

    return gsap.fromTo(
      element,
      { clipPath: clipPaths[direction] },
      {
        clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
        duration: 1.2,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: element,
          start: 'top 80%',
        },
      }
    );
  },

  typewriter: (element: HTMLElement, speed: number = 50) => {
    const text = element.textContent || '';
    element.textContent = '';
    
    let index = 0;
    const interval = setInterval(() => {
      if (index < text.length) {
        element.textContent += text[index];
        index++;
      } else {
        clearInterval(interval);
      }
    }, speed);

    return () => clearInterval(interval);
  },

  /**
   * Reading effect (words dim to bright on scroll)
   */
  readingEffect: (element: HTMLElement) => {
    const text = element.textContent || '';
    
    // Split text into words, then characters to preserve word wrapping
    const words = text.split(' ').filter(w => w.trim() !== '');
    
    element.innerHTML = words
      .map((word) => {
        const chars = word.split('').map(char => 
          `<span class="reading-char inline-block" style="opacity: 0.15; color: #64748b; filter: blur(1px); transition: all 0.3s ease;">${char}</span>`
        ).join('');
        return `<span class="inline-block whitespace-nowrap">${chars}</span>`;
      })
      .join(' '); // Join words with an actual space for proper line breaking

    const charElements = element.querySelectorAll('.reading-char');

    return gsap.to(charElements, {
      opacity: 1,
      color: '#ffffff',
      textShadow: '0px 0px 8px rgba(255, 255, 255, 0.4)',
      filter: 'blur(0px)',
      stagger: 0.1, // Fine-grained stagger for characters
      ease: 'power1.inOut',
      scrollTrigger: {
        trigger: element,
        start: 'top 85%',
        end: 'bottom 40%',
        scrub: true,
      },
    });
  },
};

/**
 * IMAGE HOVER EFFECTS
 * Stunning image interactions
 */
export const imageHover = {
  /**
   * Scale and tilt on hover
   */
  scaleTilt: (image: HTMLElement, scale: number = 1.1, tilt: number = 5) => {
    const handleMouseEnter = () => {
      gsap.to(image, {
        scale,
        rotationY: tilt,
        rotationX: tilt / 2,
        duration: 0.6,
        ease: 'power2.out',
      });
    };

    const handleMouseLeave = () => {
      gsap.to(image, {
        scale: 1,
        rotationY: 0,
        rotationX: 0,
        duration: 0.6,
        ease: 'power2.out',
      });
    };

    image.addEventListener('mouseenter', handleMouseEnter);
    image.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      image.removeEventListener('mouseenter', handleMouseEnter);
      image.removeEventListener('mouseleave', handleMouseLeave);
    };
  },

  /**
   * Parallax on mouse move
   */
  parallaxMove: (container: HTMLElement, image: HTMLElement, strength: number = 20) => {
    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;

      gsap.to(image, {
        x: x * strength,
        y: y * strength,
        duration: 0.5,
        ease: 'power2.out',
      });
    };

    const handleMouseLeave = () => {
      gsap.to(image, {
        x: 0,
        y: 0,
        duration: 0.8,
        ease: 'power2.out',
      });
    };

    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseleave', handleMouseLeave);
    };
  },

  /**
   * Reveal with overlay
   */
  overlayReveal: (container: HTMLElement, image: HTMLElement, overlay: HTMLElement) => {
    const tl = gsap.timeline({ paused: true });
    
    tl.to(overlay, {
      scaleX: 1,
      duration: 0.6,
      ease: 'power4.inOut',
    })
    .to(image, {
      scale: 1.2,
      duration: 0.6,
      ease: 'power2.out',
    }, 0)
    .to(overlay, {
      scaleX: 0,
      transformOrigin: 'right',
      duration: 0.6,
      ease: 'power4.inOut',
    });

    const handleMouseEnter = () => tl.play();
    const handleMouseLeave = () => tl.reverse();

    container.addEventListener('mouseenter', handleMouseEnter);
    container.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      container.removeEventListener('mouseenter', handleMouseEnter);
      container.removeEventListener('mouseleave', handleMouseLeave);
    };
  },
};

/**
 * CARD ANIMATIONS
 * 3D card effects
 */
export const cardEffects = {
  /**
   * 3D flip on hover
   */
  flip3D: (card: HTMLElement) => {
    const handleMouseEnter = () => {
      gsap.to(card, {
        rotationY: 180,
        duration: 0.8,
        ease: 'power2.inOut',
      });
    };

    const handleMouseLeave = () => {
      gsap.to(card, {
        rotationY: 0,
        duration: 0.8,
        ease: 'power2.inOut',
      });
    };

    card.addEventListener('mouseenter', handleMouseEnter);
    card.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      card.removeEventListener('mouseenter', handleMouseEnter);
      card.removeEventListener('mouseleave', handleMouseLeave);
    };
  },

  /**
   * Tilt on mouse move
   */
  tilt: (card: HTMLElement, maxTilt: number = 15) => {
    const handleMouseMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;

      gsap.to(card, {
        rotationY: x * maxTilt,
        rotationX: -y * maxTilt,
        duration: 0.5,
        ease: 'power2.out',
        transformPerspective: 1000,
      });
    };

    const handleMouseLeave = () => {
      gsap.to(card, {
        rotationY: 0,
        rotationX: 0,
        duration: 0.8,
        ease: 'power2.out',
      });
    };

    card.addEventListener('mousemove', handleMouseMove);
    card.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      card.removeEventListener('mousemove', handleMouseMove);
      card.removeEventListener('mouseleave', handleMouseLeave);
    };
  },

  /**
   * Lift and glow on hover
   */
  liftGlow: (card: HTMLElement) => {
    const handleMouseEnter = () => {
      gsap.to(card, {
        y: -20,
        scale: 1.05,
        boxShadow: '0 30px 60px rgba(0,0,0,0.3)',
        duration: 0.5,
        ease: 'power2.out',
      });
    };

    const handleMouseLeave = () => {
      gsap.to(card, {
        y: 0,
        scale: 1,
        boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
        duration: 0.5,
        ease: 'power2.out',
      });
    };

    card.addEventListener('mouseenter', handleMouseEnter);
    card.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      card.removeEventListener('mouseenter', handleMouseEnter);
      card.removeEventListener('mouseleave', handleMouseLeave);
    };
  },
};

/**
 * SCROLL ANIMATIONS
 * Impressive scroll-based effects
 */
export const scrollEffects = {
  /**
   * Smooth reveal with scale
   */
  smoothReveal: (elements: HTMLElement[]) => {
    elements.forEach((element, index) => {
      gsap.fromTo(
        element,
        {
          opacity: 0,
          scale: 0.8,
          y: 100,
        },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 1,
          delay: index * 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: element,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      );
    });
  },

  /**
   * Fade and slide from sides
   */
  slideFromSides: (leftElements: HTMLElement[], rightElements: HTMLElement[]) => {
    leftElements.forEach((element) => {
      gsap.fromTo(
        element,
        { opacity: 0, x: -100 },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: element,
            start: 'top 85%',
          },
        }
      );
    });

    rightElements.forEach((element) => {
      gsap.fromTo(
        element,
        { opacity: 0, x: 100 },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: element,
            start: 'top 85%',
          },
        }
      );
    });
  },

  /**
   * Rotate and fade in
   */
  rotateFade: (elements: HTMLElement[]) => {
    elements.forEach((element) => {
      gsap.fromTo(
        element,
        {
          opacity: 0,
          rotation: -45,
          scale: 0.5,
        },
        {
          opacity: 1,
          rotation: 0,
          scale: 1,
          duration: 1.2,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: element,
            start: 'top 85%',
          },
        }
      );
    });
  },
};

/**
 * BUTTON ANIMATIONS
 * Interactive button effects
 */
export const buttonEffects = {
  /**
   * Ripple effect on click
   */
  ripple: (button: HTMLElement) => {
    const handleClick = (e: MouseEvent) => {
      const rect = button.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const ripple = document.createElement('span');
      ripple.style.cssText = `
        position: absolute;
        left: ${x}px;
        top: ${y}px;
        width: 0;
        height: 0;
        border-radius: 50%;
        background: rgba(255,255,255,0.5);
        transform: translate(-50%, -50%);
        pointer-events: none;
      `;

      button.appendChild(ripple);

      gsap.to(ripple, {
        width: Math.max(rect.width, rect.height) * 2,
        height: Math.max(rect.width, rect.height) * 2,
        opacity: 0,
        duration: 0.6,
        ease: 'power2.out',
        onComplete: () => ripple.remove(),
      });
    };

    button.addEventListener('click', handleClick);
    return () => button.removeEventListener('click', handleClick);
  },

  /**
   * Pulse on hover
   */
  pulse: (button: HTMLElement) => {
    let tl: gsap.core.Timeline;

    const handleMouseEnter = () => {
      tl = gsap.timeline({ repeat: -1 });
      tl.to(button, {
        scale: 1.05,
        duration: 0.5,
        ease: 'power1.inOut',
      }).to(button, {
        scale: 1,
        duration: 0.5,
        ease: 'power1.inOut',
      });
    };

    const handleMouseLeave = () => {
      if (tl) tl.kill();
      gsap.to(button, {
        scale: 1,
        duration: 0.3,
      });
    };

    button.addEventListener('mouseenter', handleMouseEnter);
    button.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      button.removeEventListener('mouseenter', handleMouseEnter);
      button.removeEventListener('mouseleave', handleMouseLeave);
    };
  },

  /**
   * Shine effect
   */
  shine: (button: HTMLElement) => {
    const shine = document.createElement('div');
    shine.style.cssText = `
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
      pointer-events: none;
    `;
    button.appendChild(shine);

    const handleMouseEnter = () => {
      gsap.to(shine, {
        left: '100%',
        duration: 0.6,
        ease: 'power2.inOut',
      });
    };

    button.addEventListener('mouseenter', handleMouseEnter);
    return () => button.removeEventListener('mouseenter', handleMouseEnter);
  },
};

/**
 * LOADING ANIMATIONS
 * Page load effects
 */
export const loadingEffects = {
  /**
   * Curtain reveal
   */
  curtainReveal: (curtain: HTMLElement, content: HTMLElement) => {
    const tl = gsap.timeline();
    
    tl.to(curtain, {
      yPercent: -100,
      duration: 1.2,
      ease: 'power4.inOut',
    })
    .from(content, {
      opacity: 0,
      y: 50,
      duration: 0.8,
      ease: 'power3.out',
    }, '-=0.4');

    return tl;
  },

  /**
   * Fade in stagger
   */
  fadeInStagger: (elements: HTMLElement[]) => {
    return gsap.from(elements, {
      opacity: 0,
      y: 30,
      stagger: 0.1,
      duration: 0.8,
      ease: 'power3.out',
    });
  },
};

export default {
  magnetic,
  textReveal,
  imageHover,
  cardEffects,
  scrollEffects,
  buttonEffects,
  loadingEffects,
};
