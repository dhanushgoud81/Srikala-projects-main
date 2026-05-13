# Curtain Reveal Animation Guide

## 🎬 Overview

The **Curtain Reveal** animation creates a stunning sequential image reveal effect where each service card's image "unfolds" from bottom to top as you scroll. This creates a dramatic, professional entrance that captures attention.

## 🌐 View It Live

**Open your browser:**
- **Local:** http://localhost:3000/
- **Network:** http://192.168.56.1:3000/

**Scroll down to the "Our Core Divisions" section to see the effect!**

## ✨ The Effect

### What Happens:
1. **Cards enter viewport** - Each card fades in and slides up
2. **Image reveals** - The image "unfolds" from bottom to top using clip-path
3. **Golden glow** - A subtle golden border appears during the reveal
4. **Image scales** - The image scales from 130% to 100% during reveal
5. **Staggered timing** - Each card reveals slightly after the previous one

### Visual Sequence:
```
Before Scroll:
┌─────────────┐
│  [GREY]     │  ← Loading placeholder
│  [GREY]     │
│  [GREY]     │
├─────────────┤
│ UPVC        │  ← Title visible
│ Description │
│ LEARN MORE  │
└─────────────┘

During Reveal (70%):
┌─────────────┐
│ [IMAGE]     │  ← Image revealing
│ [IMAGE]     │     with golden glow
│ [GREY]      │  ← Still masked
├─────────────┤
│ UPVC        │
│ Description │
│ LEARN MORE  │
└─────────────┘

After Reveal:
┌─────────────┐
│ [IMAGE]     │  ← Fully revealed
│ [IMAGE]     │
│ [IMAGE]     │
├─────────────┤
│ UPVC        │
│ Description │
│ LEARN MORE  │
└─────────────┘
```

## 🏗️ Architecture

### Modular Component Structure

```
DivisionCard Component
├── Card Container (cardRef)
│   ├── Golden Glow Border (glowRef)
│   ├── Image Container
│   │   ├── Loading Placeholder (grey background)
│   │   └── Masked Image (maskRef)
│   │       ├── Image (imageRef) - scales during reveal
│   │       ├── Gradient Overlay
│   │       └── Icon
│   └── Content
│       ├── Title
│       ├── Description
│       └── Learn More Button
```

## 🎨 Animation Breakdown

### 1. Curtain Reveal (clip-path)

```typescript
gsap.fromTo(
  maskRef.current,
  {
    clipPath: 'inset(100% 0% 0% 0%)', // Fully masked from bottom
  },
  {
    clipPath: 'inset(0% 0% 0% 0%)',   // Fully revealed
    duration: 1.2,
    ease: 'expo.out',                  // Crisp, precise ease
    scrollTrigger: {
      trigger: cardRef.current,
      start: 'top 90%',                // Starts near bottom of screen
      toggleActions: 'play none none none',
    },
  }
);
```

**How it works:**
- `inset(100% 0% 0% 0%)` = Clip from bottom (100% from top)
- `inset(0% 0% 0% 0%)` = Show everything
- `expo.out` = Fast start, slow end (dramatic reveal)

### 2. Image Scale Effect

```typescript
gsap.fromTo(
  imageRef.current,
  { scale: 1.3 },      // Start zoomed in
  {
    scale: 1,          // End at normal size
    duration: 1.2,
    ease: 'expo.out',
  }
);
```

**Why:** Creates a "Ken Burns" effect - the image appears to zoom out as it reveals.

### 3. Golden Glow Border

```typescript
// Fade in glow
gsap.fromTo(glowRef.current, { opacity: 0 }, { opacity: 1, duration: 0.6 });

// Fade out after reveal
gsap.to(glowRef.current, { opacity: 0, duration: 0.4, delay: 1.2 });
```

**CSS:**
```css
box-shadow: 
  0 0 30px 5px rgba(255, 215, 0, 0.6),      /* Outer glow */
  inset 0 0 30px 5px rgba(255, 215, 0, 0.3) /* Inner glow */
```

### 4. Card Entrance

```typescript
gsap.fromTo(
  cardRef.current,
  { opacity: 0, y: 60 },
  {
    opacity: 1,
    y: 0,
    duration: 0.8,
    delay: index * 0.1,  // Stagger: 0s, 0.1s, 0.2s, etc.
    ease: 'power3.out',
  }
);
```

**Stagger:** Each card starts 0.1s after the previous one.

## 📊 Timing Diagram

```
Time:  0ms    200ms   400ms   600ms   800ms   1000ms  1200ms
       │      │       │       │       │       │       │
Card:  Fade in────────────────────────────────────────┘
       │      │       │       │       │       │       │
Mask:  │      Reveal starts──────────────────────────┘
       │      │       │       │       │       │       │
Image: │      Scale 1.3 → 1.0────────────────────────┘
       │      │       │       │       │       │       │
Glow:  │      │       Fade in─────┐  │       │       │
       │      │       │       │    Fade out──────────┘

Total Duration: 1.2 seconds per card
Stagger: 0.1s between cards
```

## 🎯 Key Features

### 1. **Sequential Reveal**
- Cards reveal one after another
- Top row first, then bottom row
- Creates a "building" effect

### 2. **Loading Placeholder**
- Grey background shows before image loads
- "Loading..." text for clarity
- Smooth transition to revealed image

### 3. **Golden Glow**
- Appears during reveal
- Fades out after completion
- Draws attention to active card

### 4. **Image Zoom**
- Starts at 130% scale
- Scales to 100% during reveal
- Creates dynamic movement

### 5. **Smooth Easing**
- `expo.out` for dramatic effect
- Fast start, slow end
- Professional feel

## 💻 Implementation

### Using the Component

```typescript
import { DivisionCard } from './components/DivisionCard';
import { Square } from 'lucide-react';

<DivisionCard
  icon={Square}
  title="UPVC Solutions"
  description="Energy-efficient window systems..."
  image="https://example.com/image.jpg"
  onLearnMore={() => navigate('/solutions')}
  index={0}  // Important for stagger timing
/>
```

### Props

| Prop | Type | Description |
|------|------|-------------|
| `icon` | LucideIcon | Icon component to display |
| `title` | string | Card title |
| `description` | string | Card description |
| `image` | string | Image URL |
| `onLearnMore` | function | Click handler for button |
| `index` | number | Card index (for stagger) |

## 🎨 Customization

### Change Reveal Direction

```typescript
// Bottom to top (current)
clipPath: 'inset(100% 0% 0% 0%)' → 'inset(0% 0% 0% 0%)'

// Top to bottom
clipPath: 'inset(0% 0% 100% 0%)' → 'inset(0% 0% 0% 0%)'

// Left to right
clipPath: 'inset(0% 100% 0% 0%)' → 'inset(0% 0% 0% 0%)'

// Right to left
clipPath: 'inset(0% 0% 0% 100%)' → 'inset(0% 0% 0% 0%)'
```

### Adjust Timing

```typescript
// Faster reveal
duration: 0.8,

// Slower reveal
duration: 1.6,

// More stagger
delay: index * 0.2,

// Less stagger
delay: index * 0.05,
```

### Change Glow Color

```typescript
// Blue glow
boxShadow: '0 0 30px 5px rgba(33, 128, 255, 0.6)'

// Purple glow
boxShadow: '0 0 30px 5px rgba(147, 51, 234, 0.6)'

// Green glow
boxShadow: '0 0 30px 5px rgba(34, 197, 94, 0.6)'
```

### Adjust Image Scale

```typescript
// More zoom
scale: 1.5 → 1

// Less zoom
scale: 1.1 → 1

// No zoom
scale: 1 → 1
```

## 🚀 Performance

### Optimizations Applied

1. **GPU Acceleration**
   - Uses `transform` and `clip-path`
   - Hardware accelerated properties

2. **will-change**
   - Added to animated elements
   - Prepares browser for animation

3. **Automatic Cleanup**
   - Via `@gsap/react` hook
   - No memory leaks

4. **Efficient Triggers**
   - `start: 'top 90%'` - Starts before fully visible
   - `toggleActions: 'play none none none'` - Plays once

## 📱 Mobile Considerations

The animation works great on mobile:
- Touch-friendly
- Smooth on all devices
- Optimized performance
- Responsive layout

## 🎓 Learning Points

### Why clip-path?

- **Smooth:** GPU accelerated
- **Flexible:** Any shape possible
- **Clean:** No overflow issues
- **Modern:** Well-supported

### Why expo.out easing?

- **Dramatic:** Fast start catches attention
- **Smooth:** Slow end feels polished
- **Professional:** Used in high-end sites

### Why stagger?

- **Sequential:** Guides eye movement
- **Organized:** Not overwhelming
- **Engaging:** Keeps user watching

## 🎉 Result

You now have:

✅ **Modular component** - Reusable DivisionCard
✅ **Curtain reveal** - Dramatic image unfold
✅ **Golden glow** - Attention-grabbing effect
✅ **Image zoom** - Dynamic movement
✅ **Staggered timing** - Sequential reveals
✅ **Loading state** - Grey placeholder
✅ **Professional polish** - Expo.out easing

## 🌟 See It In Action

1. **Open** http://localhost:3000/
2. **Scroll down** to "Our Core Divisions"
3. **Watch** as each card reveals sequentially
4. **Notice** the golden glow during reveal
5. **Observe** the image zoom effect
6. **Enjoy** the professional animation!

---

**The curtain reveal animation is now live on your website!** 🎬✨

This is the same quality of animation you see on award-winning websites like Apple, Stripe, and modern design agencies.
