# GSAP Animation System - Quick Start

Get up and running with professional animations in 5 minutes.

## ✅ Installation Complete

The system is already installed and configured:
- ✅ `gsap` (v3.15.0)
- ✅ `@gsap/react` (latest)
- ✅ Animation utilities created
- ✅ React hooks configured
- ✅ Home.tsx updated with examples

## 🚀 Start Using Animations Now

### 1. Import What You Need

```typescript
import { useGSAP } from './lib/useGSAP';
import { textStagger, parallax, scrollReveal } from './lib/animations';
```

### 2. Create Refs for Your Elements

```typescript
const containerRef = useRef<HTMLDivElement>(null);
```

### 3. Add Animations in useGSAP Hook

```typescript
useGSAP(() => {
  // Your animations here - cleanup is automatic!
  scrollReveal.fadeInUp(containerRef.current);
}, []);
```

### 4. Attach Refs to Your JSX

```typescript
return <div ref={containerRef}>Content</div>;
```

## 📋 Copy-Paste Templates

### Template 1: Simple Fade In

```typescript
import { useRef } from 'react';
import { useGSAP } from './lib/useGSAP';
import { scrollReveal } from './lib/animations';

function MyComponent() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    scrollReveal.fadeInUp(containerRef.current);
  }, []);

  return (
    <div ref={containerRef}>
      <h2>This will fade in when scrolled into view</h2>
    </div>
  );
}
```

### Template 2: Text Stagger

```typescript
import { useRef } from 'react';
import { useGSAP } from './lib/useGSAP';
import { textStagger } from './lib/animations';

function MyComponent() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const items = containerRef.current?.querySelectorAll('.item');
    textStagger.fadeInUp(items, { stagger: 0.1 });
  }, []);

  return (
    <div ref={containerRef}>
      <h2 className="item">First item</h2>
      <p className="item">Second item</p>
      <button className="item">Third item</button>
    </div>
  );
}
```

### Template 3: Hero with Parallax

```typescript
import { useRef } from 'react';
import { useGSAP } from './lib/useGSAP';
import { parallax, ambient, textStagger } from './lib/animations';

function Hero() {
  const bgRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Background layer
    parallax.vertical(bgRef.current, { speed: 30 });
    ambient.scale(bgRef.current, { from: 1, to: 1.2 });
    
    // Midground layer
    ambient.fade(overlayRef.current, { from: 0.7, to: 0.9 });
    
    // Foreground layer
    const items = contentRef.current?.querySelectorAll('.animate');
    textStagger.fadeInUp(items, { stagger: 0.2 });
  }, []);

  return (
    <section className="relative h-screen overflow-hidden">
      <div ref={bgRef} className="absolute inset-0 bg-cover will-change-transform" />
      <div ref={overlayRef} className="absolute inset-0 bg-black/70" />
      <div ref={contentRef} className="relative z-10 flex items-center justify-center h-full">
        <div className="text-center text-white">
          <h1 className="animate text-6xl font-bold mb-4">Hero Title</h1>
          <p className="animate text-xl mb-8">Hero subtitle</p>
          <button className="animate bg-blue-600 px-8 py-4">CTA Button</button>
        </div>
      </div>
    </section>
  );
}
```

### Template 4: Card Grid

```typescript
import { useRef } from 'react';
import { useGSAP } from './lib/useGSAP';
import { scrollReveal, parallax } from './lib/animations';

function CardGrid() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const cards = containerRef.current?.querySelectorAll('.card');
    
    cards?.forEach((card, index) => {
      const direction = index % 2 === 0 ? -60 : 60;
      
      // Entrance
      scrollReveal.fadeInUp(card);
      
      // Parallax
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

### Template 5: Counter

```typescript
import { useRef } from 'react';
import { useGSAP } from './lib/useGSAP';
import { animationUtils } from './lib/animations';

function Stats() {
  const stat1Ref = useRef<HTMLDivElement>(null);
  const stat2Ref = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    animationUtils.counter(stat1Ref.current!, {
      target: 500,
      suffix: '+',
      duration: 2
    });
    
    animationUtils.counter(stat2Ref.current!, {
      target: 200,
      suffix: '+',
      duration: 2
    });
  }, []);

  return (
    <div>
      <div ref={stat1Ref}>0+</div>
      <div ref={stat2Ref}>0+</div>
    </div>
  );
}
```

## 🎨 Common Patterns

### Pattern: Fade In on Scroll
```typescript
scrollReveal.fadeInUp(element);
```

### Pattern: Text Stagger
```typescript
textStagger.fadeInUp(elements, { stagger: 0.1 });
```

### Pattern: Parallax Background
```typescript
parallax.vertical(element, { speed: 30 });
```

### Pattern: Fade Overlay
```typescript
ambient.fade(element, { from: 0.7, to: 0.9 });
```

### Pattern: Scale Effect
```typescript
ambient.scale(element, { from: 1, to: 1.1 });
```

### Pattern: Counter
```typescript
animationUtils.counter(element, { target: 500, suffix: '+' });
```

## 🎯 Quick Reference

| What You Want | Function to Use |
|---------------|----------------|
| Fade in on scroll | `scrollReveal.fadeInUp()` |
| Text appears one by one | `textStagger.fadeInUp()` |
| Background moves slower | `parallax.vertical()` |
| Cards slide horizontally | `parallax.horizontal()` |
| Overlay fades | `ambient.fade()` |
| Element scales | `ambient.scale()` |
| Number counts up | `animationUtils.counter()` |
| Scale in on scroll | `scrollReveal.scaleIn()` |
| Multiple items stagger | `scrollReveal.staggerIn()` |

## ⚡ Performance Tips

1. **Add this class to animated elements:**
   ```tsx
   <div className="will-change-transform">
   ```

2. **Use refs, not class selectors:**
   ```typescript
   // ✅ Good
   scrollReveal.fadeInUp(myRef.current);
   
   // ❌ Avoid
   scrollReveal.fadeInUp('.my-class');
   ```

3. **Always use useGSAP, not useEffect:**
   ```typescript
   // ✅ Good
   useGSAP(() => { /* animations */ }, []);
   
   // ❌ Avoid
   useEffect(() => { /* animations */ }, []);
   ```

## 🐛 Troubleshooting

### Animation not playing?
```typescript
// Check if ref is assigned
console.log(myRef.current); // Should not be null

// Make sure element exists
useGSAP(() => {
  if (myRef.current) {
    scrollReveal.fadeInUp(myRef.current);
  }
}, []);
```

### Animation too fast/slow?
```typescript
// Adjust duration
scrollReveal.fadeInUp(element, { duration: 1.5 }); // Slower

// Adjust stagger
textStagger.fadeInUp(elements, { stagger: 0.2 }); // More delay
```

### Parallax too strong?
```typescript
// Reduce speed
parallax.vertical(element, { speed: 15 }); // Less movement
```

## 📚 Next Steps

1. **See it in action:** Check `src/Home.tsx` for production examples
2. **Learn more:** Read `ANIMATION_GUIDE.md` for complete documentation
3. **Quick lookup:** Use `ANIMATION_CHEATSHEET.md` as reference
4. **Visual guide:** Check `ANIMATION_VISUAL_GUIDE.md` for diagrams
5. **Examples:** Explore `src/examples/AnimationDemo.tsx`

## 🎓 Learning Path

1. ✅ **You are here** - Quick Start (5 minutes)
2. 📖 Copy a template and modify it (10 minutes)
3. 🎨 Read the cheatsheet for more options (15 minutes)
4. 📚 Study the full guide for advanced patterns (30 minutes)
5. 🚀 Build your own animations (ongoing)

## 💡 Pro Tips

- Start simple with `scrollReveal.fadeInUp()`
- Add parallax for depth with `parallax.vertical()`
- Use stagger for lists with `textStagger.fadeInUp()`
- Always test on mobile (reduce/disable parallax if needed)
- Check console for GSAP errors during development

## ✨ You're Ready!

Pick a template above, copy it into your component, and start animating. The system handles cleanup automatically, so you can focus on creating great experiences.

**Happy animating! 🎬**
