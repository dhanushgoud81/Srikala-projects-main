# GSAP Animation Cheat Sheet

## Quick Import

```typescript
import { useGSAP } from './lib/useGSAP';
import { 
  textStagger, 
  parallax, 
  ambient, 
  scrollReveal, 
  animationUtils 
} from './lib/animations';
```

## Layer System

| Layer | Purpose | Effects | Use Cases |
|-------|---------|---------|-----------|
| **Foreground** | Text & Interactive | Stagger, Split Text | Headlines, Buttons, Lists |
| **Midground** | Structural Elements | Parallax | Cards, Images, Beams |
| **Background** | Ambient | Fade, Scale, Glow | Videos, Gradients, Overlays |

## Common Patterns

### 🎯 Hero Section (All 3 Layers)

```typescript
useGSAP(() => {
  // Background: Parallax + Scale
  parallax.vertical(bgRef.current, { speed: 30 });
  ambient.scale(bgRef.current, { from: 1, to: 1.2 });
  
  // Midground: Overlay fade
  ambient.fade(overlayRef.current, { from: 0.7, to: 0.9 });
  
  // Foreground: Text stagger
  textStagger.fadeInUp(contentRef.current.children, { stagger: 0.2 });
}, []);
```

### 📦 Card Grid with Alternating Entrance

```typescript
useGSAP(() => {
  cards.forEach((card, i) => {
    const dir = i % 2 === 0 ? -60 : 60;
    scrollReveal.fadeInUp(card);
    parallax.horizontal(card, { speed: dir * 0.3 });
  });
}, []);
```

### 🔢 Counter Animation

```typescript
useGSAP(() => {
  animationUtils.counter(numRef.current, {
    target: 500,
    suffix: '+',
    duration: 2
  });
}, []);
```

### 📝 Character-by-Character Text

```typescript
useGSAP(() => {
  textStagger.splitText(titleRef.current, { stagger: 0.03 });
}, []);
```

## API Reference

### textStagger

```typescript
// Fade in and slide up
textStagger.fadeInUp(elements, { 
  delay: 0, 
  stagger: 0.1, 
  duration: 0.8, 
  y: 40 
});

// Horizontal slide
textStagger.fadeInSlide(elements, { 
  stagger: 0.15, 
  x: 60 
});

// Split text animation
textStagger.splitText(element, { 
  stagger: 0.03 
});
```

### parallax

```typescript
// Vertical parallax
parallax.vertical(element, { 
  speed: 30,           // yPercent movement
  start: 'top top',    // When to start
  end: 'bottom top'    // When to end
});

// Horizontal parallax
parallax.horizontal(element, { 
  speed: 50,           // x movement in pixels
  start: 'top bottom',
  end: 'bottom top'
});

// Multi-layer
parallax.layered([
  { element: '.layer-1', speed: 10 },
  { element: '.layer-2', speed: 30 }
], container);
```

### ambient

```typescript
// Fade effect
ambient.fade(element, { 
  from: 1, 
  to: 0,
  start: 'top top',
  end: 'bottom top'
});

// Scale effect
ambient.scale(element, { 
  from: 1, 
  to: 1.1 
});

// Continuous glow
ambient.glow(element, { 
  duration: 3 
});
```

### scrollReveal

```typescript
// Fade in up
scrollReveal.fadeInUp(element, { 
  y: 60, 
  duration: 1, 
  start: 'top 85%' 
});

// Scale in
scrollReveal.scaleIn(element, { 
  scale: 0.9, 
  duration: 1 
});

// Stagger multiple
scrollReveal.staggerIn(elements, { 
  y: 40, 
  stagger: 0.2 
});
```

### animationUtils

```typescript
// Counter
animationUtils.counter(element, {
  target: 500,
  duration: 2,
  suffix: '+',
  start: 'top 80%'
});

// Cleanup all
animationUtils.cleanup();

// Refresh calculations
animationUtils.refresh();
```

## ScrollTrigger Start/End Values

| Value | Meaning |
|-------|---------|
| `'top top'` | Element top hits viewport top |
| `'top center'` | Element top hits viewport center |
| `'top bottom'` | Element top hits viewport bottom |
| `'center center'` | Element center hits viewport center |
| `'bottom top'` | Element bottom hits viewport top |
| `'top 80%'` | Element top hits 80% down viewport |

## Performance Classes

```tsx
{/* Add to animated elements */}
<div className="will-change-transform">
  {/* Parallax content */}
</div>

<div className="will-change-opacity">
  {/* Fade content */}
</div>
```

## Common Speeds

| Effect | Speed | Result |
|--------|-------|--------|
| Subtle parallax | 10-20 | Gentle depth |
| Standard parallax | 30-50 | Noticeable 3D |
| Dramatic parallax | 60-100 | Strong effect |
| Horizontal drift | 0.2-0.5 | Subtle movement |

## Timing Values

| Duration | Use Case |
|----------|----------|
| 0.3-0.5s | Quick interactions |
| 0.8-1.0s | Standard reveals |
| 1.2-1.5s | Hero entrances |
| 2.0-3.0s | Counters, complex |

## Stagger Values

| Stagger | Use Case |
|---------|----------|
| 0.03s | Character split |
| 0.1s | Word stagger |
| 0.15-0.2s | List items |
| 0.3s+ | Large sections |

## Easing Functions

```typescript
// Power eases (most common)
ease: 'power3.out'    // Smooth deceleration
ease: 'power2.inOut'  // Smooth both ends

// Back eases (overshoot)
ease: 'back.out(1.7)' // Bouncy effect

// Elastic (spring-like)
ease: 'elastic.out(1, 0.3)'

// None (linear, for parallax)
ease: 'none'
```

## Template: Basic Component

```typescript
import { useRef } from 'react';
import { useGSAP } from './lib/useGSAP';
import { scrollReveal } from './lib/animations';

function MyComponent() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (containerRef.current) {
      const elements = containerRef.current.querySelectorAll('.animate');
      scrollReveal.fadeInUp(elements);
    }
  }, []);

  return (
    <div ref={containerRef}>
      <h2 className="animate">Title</h2>
      <p className="animate">Content</p>
    </div>
  );
}
```

## Debugging

```typescript
// Log all active ScrollTriggers
console.log(ScrollTrigger.getAll());

// Kill all ScrollTriggers
animationUtils.cleanup();

// Show visual markers (dev only)
ScrollTrigger.create({
  trigger: element,
  markers: true
});
```

## Do's and Don'ts

### ✅ Do

- Use `useGSAP` for automatic cleanup
- Use refs to target elements
- Add `will-change` to animated elements
- Group similar animations
- Use transforms (x, y, scale) over position/size

### ❌ Don't

- Use `useEffect` for GSAP animations
- Target elements with class selectors globally
- Animate width, height, top, left
- Create too many parallax elements
- Forget to test on mobile

## Mobile Considerations

```typescript
// Disable parallax on mobile
useGSAP(() => {
  if (window.innerWidth > 768) {
    parallax.vertical(element);
  }
}, []);

// Reduce animation complexity
const isMobile = window.innerWidth < 768;

useGSAP(() => {
  textStagger.fadeInUp(elements, {
    stagger: isMobile ? 0.05 : 0.1,
    duration: isMobile ? 0.5 : 0.8
  });
}, []);
```

## Quick Fixes

### Animation not playing?
1. Check if ref is assigned: `console.log(ref.current)`
2. Verify element exists when animation runs
3. Check ScrollTrigger start position

### Janky performance?
1. Add `will-change-transform`
2. Reduce parallax elements
3. Use `scrub: 1` for smooth scrolling
4. Avoid animating layout properties

### Memory leak?
1. Use `useGSAP` instead of `useEffect`
2. Don't manually kill ScrollTriggers
3. Let @gsap/react handle cleanup
