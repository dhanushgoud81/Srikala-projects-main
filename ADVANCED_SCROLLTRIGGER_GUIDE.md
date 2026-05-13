# Advanced ScrollTrigger Guide

Complete guide to advanced ScrollTrigger features based on the [official GSAP documentation](https://gsap.com/docs/v3/Plugins/ScrollTrigger/).

## 📚 Table of Contents

1. [Pinning](#pinning)
2. [Scrubbing](#scrubbing)
3. [Snapping](#snapping)
4. [Batch Animations](#batch-animations)
5. [Horizontal Scrolling](#horizontal-scrolling)
6. [Toggle Actions](#toggle-actions)
7. [Callbacks & Events](#callbacks--events)
8. [Responsive ScrollTriggers](#responsive-scrolltriggers)
9. [Advanced Patterns](#advanced-patterns)
10. [Utilities](#utilities)

---

## Pinning

Pin elements in place while scrolling continues.

### Basic Pinning

```typescript
import { pinning } from './lib/advancedScrollTrigger';

// Pin for specific duration
pinning.pinForDuration(element, {
  duration: '200%',      // Pin for 200% of viewport height
  start: 'top top',      // Start when top hits top
  pinSpacing: true,      // Add spacing (default)
  anticipatePin: 1       // Anticipate pin by 1px (prevents flash)
});
```

### Pin with Reparenting

Use when ancestor elements have transforms that break `position: fixed`:

```typescript
pinning.pinWithReparent(element, {
  start: 'top top',
  end: 'bottom top'
});
```

### Sequential Pinning

Pin multiple sections one after another:

```typescript
const sections = [section1, section2, section3];
pinning.pinSequence(sections);
```

### Key Options

| Option | Type | Description |
|--------|------|-------------|
| `pin` | Boolean/Element | Element to pin (true = trigger element) |
| `pinSpacing` | Boolean/String | Add spacing (true, false, "margin") |
| `anticipatePin` | Number | Anticipate pin by N pixels |
| `pinReparent` | Boolean | Reparent to body (escape transforms) |
| `pinType` | String | "fixed" or "transform" |

---

## Scrubbing

Link animation progress directly to scroll position.

### Smooth Scrub

Animation smoothly catches up to scroll:

```typescript
import { scrubbing } from './lib/advancedScrollTrigger';

const tl = gsap.timeline();
tl.to('.box', { x: 500, rotation: 360 });

scrubbing.smoothScrub(tl, {
  trigger: '.container',
  scrub: 1  // Takes 1 second to catch up
});
```

### Instant Scrub

No smoothing, instant response:

```typescript
scrubbing.instantScrub(animation, {
  trigger: '.container',
  start: 'top bottom',
  end: 'bottom top'
});
```

### Scrub with Progress Callback

Track progress while scrubbing:

```typescript
scrubbing.scrubWithProgress(animation, {
  trigger: '.container',
  onUpdate: (self) => {
    console.log('Progress:', self.progress);
    console.log('Direction:', self.direction);
    console.log('Velocity:', self.getVelocity());
  }
});
```

### Scrub Values

| Value | Behavior |
|-------|----------|
| `true` | Instant, no smoothing |
| `0.5` | 0.5 second catch-up |
| `1` | 1 second catch-up (recommended) |
| `2` | 2 second catch-up (very smooth) |

---

## Snapping

Snap to specific scroll positions when user stops scrolling.

### Snap to Increments

```typescript
import { snapping } from './lib/advancedScrollTrigger';

snapping.snapToIncrements(animation, {
  trigger: '.container',
  increment: 0.1,  // Snap to 10%, 20%, 30%, etc.
  duration: 0.5    // Snap animation duration
});
```

### Snap to Timeline Labels

```typescript
const tl = gsap.timeline();
tl.addLabel('start')
  .to('.box', { x: 100 })
  .addLabel('middle')
  .to('.box', { y: 100 })
  .addLabel('end');

snapping.snapToLabels(tl, {
  trigger: '.container',
  directional: true  // Snap in scroll direction
});
```

### Snap to Specific Points

```typescript
snapping.snapToPoints(animation, {
  trigger: '.container',
  points: [0, 0.25, 0.5, 0.75, 1]  // Snap to these progress values
});
```

### Snap Configuration

```typescript
{
  snapTo: 0.1,                    // Increment, array, function, or "labels"
  duration: 0.3,                  // Snap animation duration
  delay: 0.1,                     // Delay after last scroll
  ease: 'power1.inOut',           // Snap easing
  directional: true,              // Snap in scroll direction
  inertia: true,                  // Factor in scroll inertia
  onStart: () => {},              // Snap start callback
  onComplete: () => {},           // Snap complete callback
  onInterrupt: () => {}           // Snap interrupted callback
}
```

---

## Batch Animations

Coordinate multiple ScrollTriggers that enter viewport together.

### Basic Batch Reveal

```typescript
import { batching } from './lib/advancedScrollTrigger';

batching.batchReveal('.card', {
  interval: 0.1,    // Time window to batch elements
  batchMax: 3,      // Max elements per batch
  onEnter: (batch) => {
    gsap.from(batch, {
      opacity: 0,
      y: 60,
      stagger: 0.15,
      duration: 1
    });
  }
});
```

### Custom Batch Callbacks

```typescript
batching.batchCustom('.item', {
  onEnter: (batch) => {
    // Elements entering viewport
    gsap.from(batch, { opacity: 0, scale: 0.8 });
  },
  onLeave: (batch) => {
    // Elements leaving viewport
    gsap.to(batch, { opacity: 0.5 });
  },
  onEnterBack: (batch) => {
    // Elements re-entering from bottom
    gsap.to(batch, { opacity: 1 });
  },
  onLeaveBack: (batch) => {
    // Elements leaving from top
    gsap.to(batch, { opacity: 0 });
  }
});
```

---

## Horizontal Scrolling

Create horizontal scrolling sections driven by vertical scroll.

### Basic Horizontal Scroll

```typescript
import { horizontal } from './lib/advancedScrollTrigger';

horizontal.createHorizontalScroll('.container', {
  pin: true,
  scrub: 1
});
```

### HTML Structure

```html
<div class="container">
  <div class="panel">Panel 1</div>
  <div class="panel">Panel 2</div>
  <div class="panel">Panel 3</div>
</div>
```

### CSS

```css
.container {
  display: flex;
  width: fit-content;
}

.panel {
  min-width: 100vw;
  height: 100vh;
}
```

### Horizontal with Individual Triggers

Trigger animations as elements come into view horizontally:

```typescript
horizontal.horizontalWithTriggers('.container', '.item');
```

---

## Toggle Actions

Control animations at different scroll points.

### Play Once

Animation plays once when entering viewport:

```typescript
import { toggleActions } from './lib/advancedScrollTrigger';

toggleActions.playOnce(animation, trigger);
```

### Play/Reverse

Animation plays forward on enter, reverses on leave:

```typescript
toggleActions.playReverse(animation, trigger);
```

### Full Control

Complete control over all four toggle points:

```typescript
toggleActions.fullControl(animation, trigger);
// toggleActions: "play pause resume reset"
```

### Toggle Actions Syntax

Format: `"onEnter onLeave onEnterBack onLeaveBack"`

| Action | Description |
|--------|-------------|
| `play` | Play animation forward |
| `pause` | Pause animation |
| `resume` | Resume from current position |
| `reset` | Reset to beginning |
| `restart` | Restart from beginning |
| `complete` | Jump to end |
| `reverse` | Play in reverse |
| `none` | Do nothing |

**Examples:**
- `"play none none none"` - Play once on enter
- `"play reverse play reverse"` - Play/reverse on enter/leave
- `"play pause resume reset"` - Full control

---

## Callbacks & Events

Advanced callback patterns for custom behavior.

### All Callbacks

```typescript
import { callbacks } from './lib/advancedScrollTrigger';

callbacks.withAllCallbacks(trigger, {
  onEnter: (self) => {
    console.log('Entered', self.progress);
  },
  onLeave: (self) => {
    console.log('Left', self.progress);
  },
  onEnterBack: (self) => {
    console.log('Entered back', self.progress);
  },
  onLeaveBack: (self) => {
    console.log('Left back', self.progress);
  },
  onUpdate: (self) => {
    console.log('Updated', self.progress);
  },
  onToggle: (self) => {
    console.log('Toggled', self.isActive);
  }
});
```

### Velocity-Based Callback

```typescript
callbacks.onVelocityChange(trigger, (velocity) => {
  console.log('Scroll velocity:', velocity, 'px/s');
});
```

### ScrollTrigger Instance Properties

Available in all callbacks:

```typescript
onUpdate: (self) => {
  self.progress      // 0 to 1
  self.direction     // 1 (forward) or -1 (backward)
  self.isActive      // Boolean
  self.start         // Start scroll position (px)
  self.end           // End scroll position (px)
  self.getVelocity() // Current velocity (px/s)
}
```

---

## Responsive ScrollTriggers

Different animations for different screen sizes.

### Match Media

```typescript
import { responsive } from './lib/advancedScrollTrigger';

responsive.matchMedia({
  // Mobile
  '(max-width: 768px)': () => {
    gsap.to('.box', {
      x: 100,
      scrollTrigger: {
        trigger: '.box',
        start: 'top 80%'
      }
    });
  },
  
  // Desktop
  '(min-width: 769px)': () => {
    gsap.to('.box', {
      x: 500,
      scrollTrigger: {
        trigger: '.box',
        start: 'top 80%',
        scrub: 1
      }
    });
  }
});
```

### Mobile vs Desktop Helper

```typescript
responsive.mobileDesktop(
  // Mobile setup
  () => {
    // Simpler animations
    gsap.to('.box', { x: 100 });
  },
  // Desktop setup
  () => {
    // Complex animations with parallax
    gsap.to('.box', { x: 500, scrollTrigger: { scrub: 1 } });
  }
);
```

---

## Advanced Patterns

### Toggle Class

Add/remove CSS classes based on scroll position:

```typescript
import { patterns } from './lib/advancedScrollTrigger';

patterns.revealWithClass(element, 'active');
```

```css
.element {
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.5s;
}

.element.active {
  opacity: 1;
  transform: translateY(0);
}
```

### Prevent Overlapping Animations

Force previous animations to complete:

```typescript
patterns.preventOverlaps(animation, trigger, 'group1');
```

### Fast Scroll End

Complete animation if scrolling too fast:

```typescript
patterns.fastScrollEnd(animation, trigger, 2500); // 2500px/s threshold
```

### Clamp Positions

Keep start/end within page bounds:

```typescript
patterns.clampPositions(animation, trigger);
// Uses: start: "clamp(top bottom)", end: "clamp(bottom top)"
```

---

## Utilities

Helpful utility functions.

### Check if in Viewport

```typescript
import { utils } from './lib/advancedScrollTrigger';

if (utils.isInViewport(element, 0.5)) {
  // At least 50% of element is visible
}
```

### Get Position in Viewport

```typescript
const position = utils.positionInViewport(element, 'top');
// Returns 0-1 (0 = top of viewport, 1 = bottom)
```

### Get Max Scroll

```typescript
const maxScroll = utils.maxScroll();
console.log('Max scroll position:', maxScroll);
```

### Check if Scrolling

```typescript
if (utils.isScrolling()) {
  console.log('User is scrolling');
}
```

### Refresh All

```typescript
utils.refreshAll();
// Recalculates all ScrollTrigger positions
```

### Get ScrollTrigger by ID

```typescript
ScrollTrigger.create({
  id: 'myTrigger',
  trigger: '.box'
});

const st = utils.getById('myTrigger');
```

### Get All ScrollTriggers

```typescript
const allTriggers = utils.getAll();
console.log('Total ScrollTriggers:', allTriggers.length);
```

---

## Complete Examples

### Example 1: Pinned Section with Animation

```typescript
import { useRef } from 'react';
import { useGSAP } from './lib/useGSAP';
import { pinning } from './lib/advancedScrollTrigger';

function PinnedSection() {
  const sectionRef = useRef(null);
  const contentRef = useRef(null);

  useGSAP(() => {
    // Pin the section
    pinning.pinForDuration(sectionRef.current, {
      duration: '200%',
      start: 'top top'
    });

    // Animate while pinned
    gsap.to(contentRef.current, {
      scale: 2,
      rotation: 360,
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top top',
        end: '+=200%',
        scrub: 1
      }
    });
  }, []);

  return (
    <section ref={sectionRef} className="h-screen">
      <div ref={contentRef}>Content</div>
    </section>
  );
}
```

### Example 2: Horizontal Scroll Gallery

```typescript
function HorizontalGallery() {
  const containerRef = useRef(null);

  useGSAP(() => {
    horizontal.createHorizontalScroll(containerRef.current, {
      pin: true,
      scrub: 1
    });
  }, []);

  return (
    <div ref={containerRef} className="flex">
      <div className="min-w-full">Panel 1</div>
      <div className="min-w-full">Panel 2</div>
      <div className="min-w-full">Panel 3</div>
    </div>
  );
}
```

### Example 3: Batch Card Reveal

```typescript
function CardGrid() {
  const containerRef = useRef(null);

  useGSAP(() => {
    batching.batchReveal('.card', {
      interval: 0.1,
      batchMax: 3,
      onEnter: (batch) => {
        gsap.from(batch, {
          opacity: 0,
          y: 60,
          stagger: 0.15,
          duration: 1,
          ease: 'power3.out'
        });
      }
    });
  }, []);

  return (
    <div ref={containerRef} className="grid grid-cols-3 gap-4">
      {[...Array(12)].map((_, i) => (
        <div key={i} className="card">Card {i + 1}</div>
      ))}
    </div>
  );
}
```

---

## Best Practices

### 1. Create in Order

Always create ScrollTriggers in the order they appear on the page (top to bottom):

```typescript
// ✅ Good
ScrollTrigger.create({ trigger: '.section1' });
ScrollTrigger.create({ trigger: '.section2' });
ScrollTrigger.create({ trigger: '.section3' });

// ❌ Bad
ScrollTrigger.create({ trigger: '.section3' });
ScrollTrigger.create({ trigger: '.section1' });
```

### 2. Use Anticipate Pin

Prevent flash of unpinned content:

```typescript
pin: true,
anticipatePin: 1  // Anticipate by 1px
```

### 3. Avoid Animating Pinned Elements

Don't animate the pinned element itself:

```typescript
// ❌ Bad
pin: '.box',
animation: gsap.to('.box', { x: 100 })

// ✅ Good
pin: '.box',
animation: gsap.to('.box .content', { x: 100 })
```

### 4. Use Scrub for Smooth Scrolling

```typescript
scrub: 1  // Recommended for smooth effect
```

### 5. Cleanup with useGSAP

Always use `useGSAP` hook for automatic cleanup:

```typescript
useGSAP(() => {
  // ScrollTriggers here
  // Cleanup is automatic!
}, []);
```

---

## Troubleshooting

### Pinning Issues

**Problem:** Pinned element jumps or moves incorrectly

**Solutions:**
1. Check for ancestor transforms: `pinReparent: true`
2. Create ScrollTriggers in order (top to bottom)
3. Avoid `content-visibility: auto` in CSS
4. Use proper cleanup in React

### Performance Issues

**Problem:** Janky scrolling

**Solutions:**
1. Reduce number of ScrollTriggers
2. Use `scrub` for smooth animations
3. Add `will-change-transform` to animated elements
4. Avoid animating expensive properties

### Refresh Issues

**Problem:** Positions are wrong after resize

**Solutions:**
1. Call `ScrollTrigger.refresh()` after DOM changes
2. Use `invalidateOnRefresh: true` for dynamic content
3. Wait for images to load before creating ScrollTriggers

---

## Resources

- **Official Docs:** https://gsap.com/docs/v3/Plugins/ScrollTrigger/
- **Demos:** https://codepen.io/collection/AEbkkJ
- **Forum:** https://greensock.com/forums/
- **Video Course:** https://www.snorkl.tv/scrolltrigger-express/

---

**Next Steps:**
1. Check `src/examples/AdvancedScrollTriggerDemo.tsx` for working examples
2. Read `ANIMATION_GUIDE.md` for basic patterns
3. Experiment with different configurations
4. Build your own advanced scroll experiences!
