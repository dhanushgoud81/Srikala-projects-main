# GSAP Animation System Guide

## Overview

This project uses a professional three-layer animation system built with GSAP, @gsap/react, and ScrollTrigger. The system provides automatic cleanup, preventing memory leaks and animation glitches during navigation.

## Architecture

### Three Animation Layers

```
┌─────────────────────────────────────────────────────────┐
│ FOREGROUND LAYER (Text & Interactive Elements)         │
│ • Stagger animations                                    │
│ • Character-by-character reveals                        │
│ • Button hover effects                                  │
└─────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────┐
│ MIDGROUND LAYER (Cards, Images, Structural Elements)   │
│ • Parallax scrolling                                    │
│ • Horizontal/vertical movement                          │
│ • Creates 3D depth perception                           │
└─────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────┐
│ BACKGROUND LAYER (Video, Gradients, Ambient Effects)   │
│ • Subtle fade effects                                   │
│ • Scale animations                                      │
│ • Glow/pulse effects                                    │
└─────────────────────────────────────────────────────────┘
```

## Installation

The required packages are already installed:

```bash
npm install gsap @gsap/react
```

## Core Modules

### 1. `src/lib/animations.ts`

Provides reusable animation utilities organized by layer:

#### Foreground Layer: Text Stagger

```typescript
import { textStagger } from './lib/animations';

// Fade in and slide up with stagger
textStagger.fadeInUp(elements, {
  delay: 0,
  stagger: 0.1,
  duration: 0.8,
  y: 40
});

// Horizontal slide with stagger
textStagger.fadeInSlide(elements, {
  stagger: 0.15,
  x: 60
});

// Character-by-character reveal
textStagger.splitText(element, {
  stagger: 0.03
});
```

#### Midground Layer: Parallax

```typescript
import { parallax } from './lib/animations';

// Vertical parallax (slower than scroll)
parallax.vertical(element, {
  speed: 30,
  start: 'top top',
  end: 'bottom top'
});

// Horizontal parallax
parallax.horizontal(element, {
  speed: 50
});

// Multi-layer parallax
parallax.layered([
  { element: '.layer-1', speed: 10 },
  { element: '.layer-2', speed: 30 },
  { element: '.layer-3', speed: 50 }
], container);
```

#### Background Layer: Ambient Effects

```typescript
import { ambient } from './lib/animations';

// Fade on scroll
ambient.fade(element, {
  from: 1,
  to: 0
});

// Scale effect
ambient.scale(element, {
  from: 1,
  to: 1.1
});

// Continuous glow/pulse
ambient.glow(element, {
  duration: 3
});
```

#### Scroll-Triggered Animations

```typescript
import { scrollReveal } from './lib/animations';

// Fade in when entering viewport
scrollReveal.fadeInUp(element, {
  y: 60,
  duration: 1,
  start: 'top 85%'
});

// Scale in
scrollReveal.scaleIn(element, {
  scale: 0.9
});

// Stagger multiple elements
scrollReveal.staggerIn(elements, {
  stagger: 0.2
});
```

#### Utility Functions

```typescript
import { animationUtils } from './lib/animations';

// Counter animation
animationUtils.counter(element, {
  target: 500,
  duration: 2,
  suffix: '+',
  start: 'top 80%'
});

// Cleanup all ScrollTriggers
animationUtils.cleanup();

// Refresh ScrollTrigger calculations
animationUtils.refresh();
```

### 2. `src/lib/useGSAP.ts`

React hooks with automatic cleanup:

```typescript
import { useGSAP } from './lib/useGSAP';

function MyComponent() {
  const containerRef = useRef(null);

  // Basic usage - cleanup is automatic
  useGSAP(() => {
    gsap.to('.box', { x: 100 });
  }, []);

  // Scoped animations (only affect elements inside container)
  useGSAPScoped(containerRef, () => {
    gsap.to('.card', { y: 100 });
  }, []);

  return <div ref={containerRef}>...</div>;
}
```

### 3. `src/components/AnimatedSection.tsx`

Pre-built animated components:

```typescript
import { AnimatedHero, AnimatedCardGrid, AnimatedStats } from './components/AnimatedSection';

// Hero with layered animations
<AnimatedHero
  backgroundImage="/hero.jpg"
  title="Welcome"
  subtitle="Build something amazing"
  onCTAClick={() => {}}
/>

// Card grid with alternating entrance
<AnimatedCardGrid
  cards={[
    { title: 'Card 1', description: 'Description' },
    { title: 'Card 2', description: 'Description' }
  ]}
/>

// Stats with counter animation
<AnimatedStats
  stats={[
    { value: 500, label: 'Projects' },
    { value: 200, label: 'Clients' }
  ]}
/>
```

## Implementation Examples

### Example 1: Hero Section with All Three Layers

```typescript
import { useGSAP } from './lib/useGSAP';
import { parallax, ambient, textStagger } from './lib/animations';

function Hero() {
  const backgroundRef = useRef(null);
  const overlayRef = useRef(null);
  const contentRef = useRef(null);

  useGSAP(() => {
    // BACKGROUND: Parallax + Scale
    parallax.vertical(backgroundRef.current, { speed: 30 });
    ambient.scale(backgroundRef.current, { from: 1, to: 1.2 });

    // MIDGROUND: Overlay fade
    ambient.fade(overlayRef.current, { from: 0.7, to: 0.9 });

    // FOREGROUND: Content stagger
    const elements = contentRef.current.querySelectorAll('.animate-item');
    textStagger.fadeInUp(elements, { stagger: 0.2 });
  }, []);

  return (
    <section className="relative h-screen overflow-hidden">
      {/* Background Layer */}
      <div ref={backgroundRef} className="absolute inset-0 bg-cover" />
      
      {/* Midground Layer */}
      <div ref={overlayRef} className="absolute inset-0 bg-black/70" />
      
      {/* Foreground Layer */}
      <div ref={contentRef} className="relative z-10">
        <h1 className="animate-item">Title</h1>
        <p className="animate-item">Subtitle</p>
        <button className="animate-item">CTA</button>
      </div>
    </section>
  );
}
```

### Example 2: Card Grid with Parallax

```typescript
function CardGrid() {
  const containerRef = useRef(null);

  useGSAP(() => {
    const cards = containerRef.current.querySelectorAll('.card');

    cards.forEach((card, index) => {
      const direction = index % 2 === 0 ? -60 : 60;

      // Entrance animation
      scrollReveal.fadeInUp(card, { y: 40 });

      // Continuous parallax
      parallax.horizontal(card, { speed: direction * 0.3 });
    });
  }, []);

  return (
    <div ref={containerRef} className="grid grid-cols-3 gap-8">
      <div className="card">Card 1</div>
      <div className="card">Card 2</div>
      <div className="card">Card 3</div>
    </div>
  );
}
```

### Example 3: Stats Counter

```typescript
function Stats() {
  const statsRef = useRef(null);

  useGSAP(() => {
    const numbers = statsRef.current.querySelectorAll('.stat-number');

    numbers.forEach((num) => {
      const target = parseInt(num.getAttribute('data-value'));
      
      animationUtils.counter(num, {
        target,
        duration: 2,
        suffix: '+',
        start: 'top 80%'
      });
    });
  }, []);

  return (
    <div ref={statsRef}>
      <div className="stat-number" data-value="500">0+</div>
      <div className="stat-number" data-value="200">0+</div>
    </div>
  );
}
```

## Best Practices

### 1. Always Use `useGSAP` Hook

❌ **Don't:**
```typescript
useEffect(() => {
  gsap.to('.box', { x: 100 });
  
  return () => {
    ScrollTrigger.getAll().forEach(t => t.kill());
  };
}, []);
```

✅ **Do:**
```typescript
useGSAP(() => {
  gsap.to('.box', { x: 100 });
  // Cleanup is automatic!
}, []);
```

### 2. Use Refs for Element Targeting

❌ **Don't:**
```typescript
useGSAP(() => {
  gsap.to('.my-element', { x: 100 }); // Might affect elements outside component
}, []);
```

✅ **Do:**
```typescript
const elementRef = useRef(null);

useGSAP(() => {
  gsap.to(elementRef.current, { x: 100 });
}, []);
```

### 3. Organize by Animation Layer

```typescript
useGSAP(() => {
  // BACKGROUND LAYER
  parallax.vertical(backgroundRef.current);
  ambient.scale(backgroundRef.current);

  // MIDGROUND LAYER
  parallax.horizontal(cardsRef.current);

  // FOREGROUND LAYER
  textStagger.fadeInUp(textElements);
}, []);
```

### 4. Use `will-change` for Performance

```tsx
<div 
  ref={parallaxRef}
  className="will-change-transform"
>
  {/* Parallax content */}
</div>
```

### 5. Optimize ScrollTrigger

```typescript
// Use scrub for smooth scroll-linked animations
parallax.vertical(element, { speed: 30 }); // Uses scrub: 1

// Use toggleActions for one-time animations
scrollReveal.fadeInUp(element); // Uses toggleActions: 'play none none none'
```

## Performance Tips

1. **Limit Parallax Elements**: Only apply parallax to key visual elements
2. **Use `will-change`**: Add to elements that will animate
3. **Batch Animations**: Group similar animations together
4. **Avoid Layout Thrashing**: Use transforms instead of position/size changes
5. **Debounce Resize**: If using resize listeners, debounce them

## Debugging

### Check Active ScrollTriggers

```typescript
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Log all active triggers
console.log(ScrollTrigger.getAll());

// Kill all triggers
ScrollTrigger.getAll().forEach(t => t.kill());
```

### Visual Debugging

```typescript
parallax.vertical(element, {
  speed: 30,
  markers: true // Shows start/end markers (development only)
});
```

## Common Patterns

### Pattern 1: Hero with Parallax Background

```typescript
useGSAP(() => {
  parallax.vertical(backgroundRef.current, { speed: 30 });
  ambient.fade(overlayRef.current, { from: 0.7, to: 0.9 });
  textStagger.fadeInUp(contentRef.current.children, { stagger: 0.2 });
}, []);
```

### Pattern 2: Alternating Card Grid

```typescript
useGSAP(() => {
  cards.forEach((card, i) => {
    const dir = i % 2 === 0 ? -60 : 60;
    scrollReveal.fadeInUp(card);
    parallax.horizontal(card, { speed: dir * 0.3 });
  });
}, []);
```

### Pattern 3: Stats with Counter

```typescript
useGSAP(() => {
  textStagger.fadeInUp(statElements, { stagger: 0.2 });
  numbers.forEach(num => {
    animationUtils.counter(num, { target: getValue(num) });
  });
}, []);
```

## Resources

- [GSAP Documentation](https://greensock.com/docs/)
- [ScrollTrigger Docs](https://greensock.com/docs/v3/Plugins/ScrollTrigger)
- [@gsap/react Docs](https://greensock.com/react/)

## Troubleshooting

### Animations Not Working

1. Check if refs are properly assigned
2. Verify elements exist when animation runs
3. Check console for GSAP errors
4. Ensure ScrollTrigger is registered

### Memory Leaks

- Always use `useGSAP` instead of `useEffect`
- Don't manually create/kill ScrollTriggers
- Let @gsap/react handle cleanup

### Janky Animations

- Add `will-change-transform` to animated elements
- Reduce number of parallax elements
- Use `scrub` values between 1-2 for smooth scrolling
- Avoid animating expensive properties (width, height, etc.)
