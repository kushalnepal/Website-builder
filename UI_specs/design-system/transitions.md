# Transitions Design Tokens

## BuildMySite Animation & Transition System

Consistent motion language for all interactions.

---

## Duration Scale

```css
:root {
  --duration-instant: 0ms;        /* No animation */
  --duration-fast: 75ms;          /* Micro-interactions */
  --duration-normal: 150ms;       /* Standard transitions */
  --duration-slow: 200ms;         /* Card hover, modals */
  --duration-slower: 300ms;       /* Page transitions, complex */
  --duration-slowest: 500ms;      /* Major state changes */
}
```

---

## Easing Functions

```css
:root {
  --ease-linear: linear;
  --ease-in: cubic-bezier(0.4, 0, 1, 1);
  --ease-out: cubic-bezier(0, 0, 0.2, 1);
  --ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
  --ease-out-back: cubic-bezier(0.34, 1.56, 0.64, 1);  /* Bouncy */
  --ease-spring: cubic-bezier(0.175, 0.885, 0.32, 1.275);  /* Spring-like */
}
```

**Default**: `--ease-out` (most natural for UI)

---

## Transition Presets

```css
:root {
  /* Standard property transitions */
  --transition-color: color var(--duration-normal) var(--ease-out);
  --transition-bg: background-color var(--duration-normal) var(--ease-out);
  --transition-border: border-color var(--duration-normal) var(--ease-out);
  --transition-shadow: box-shadow var(--duration-normal) var(--ease-out);
  --transition-transform: transform var(--duration-fast) var(--ease-out);
  --transition-opacity: opacity var(--duration-normal) var(--ease-out);
  
  /* Combined shorthand */
  --transition-all: all var(--duration-normal) var(--ease-out);
  --transition-fast: all var(--duration-fast) var(--ease-out);
  --transition-slow: all var(--duration-slow) var(--ease-out);
  
  /* Specific combinations */
  --transition-hover: 
    background-color var(--duration-normal) var(--ease-out),
    color var(--duration-normal) var(--ease-out),
    border-color var(--duration-normal) var(--ease-out),
    box-shadow var(--duration-normal) var(--ease-out);
  
  --transition-card:
    box-shadow var(--duration-normal) var(--ease-out),
    transform var(--duration-fast) var(--ease-out);
  
  --transition-button:
    background-color var(--duration-normal) var(--ease-out),
    color var(--duration-normal) var(--ease-out),
    transform var(--duration-fast) var(--ease-out);
  
  --transition-input:
    border-color var(--duration-normal) var(--ease-out),
    box-shadow var(--duration-normal) var(--ease-out),
    background-color var(--duration-normal) var(--ease-out);
  
  --transition-modal:
    opacity var(--duration-slow) var(--ease-out),
    transform var(--duration-slow) var(--ease-out);
}
```

---

## Component Transition Mapping

| Component | Properties | Duration | Easing | Trigger |
|-----------|------------|----------|--------|---------|
| **Buttons (Primary)** | bg, color, transform | 150ms | ease-out | hover, active, focus |
| **Buttons (Ghost)** | color, bg | 150ms | ease-out | hover |
| **Icon Buttons** | bg, color | 150ms | ease-out | hover |
| **Cards (Interactive)** | shadow, transform | 150ms/75ms | ease-out | hover |
| **Template Cards** | transform (scale) | 300ms | ease-out | group-hover |
| **Inputs** | border, shadow, bg | 150ms | ease-out | focus |
| **Badges** | bg, color | 150ms | ease-out | state change |
| **Dark Mode Toggle** | transform (rotate), color | 150ms | ease-out | click |
| **Sidebar (Builder)** | width, opacity | 200ms | ease-out | view toggle |
| **Modals/Dialogs** | opacity, transform | 200ms | ease-out | open/close |
| **Dropdowns** | opacity, transform | 150ms | ease-out | open/close |
| **Tooltips** | opacity, transform | 75ms | ease-out | hover |
| **Loading Spinners** | transform (rotate) | 1000ms | linear | infinite |
| **Page Transitions** | opacity, transform | 300ms | ease-in-out | route change |
| **AI Generation** | opacity, pulse | 1500ms | ease-in-out | generating |

---

## Keyframe Animations

```css
/* Fade In (Landing hero) */
@keyframes fade-in {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
.animate-fade-in {
  animation: fade-in var(--duration-slower) var(--ease-out) forwards;
}

/* Pulse (Loading states) */
@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}
.animate-pulse {
  animation: pulse 2s var(--ease-in-out) infinite;
}

/* Spin (Loading spinners) */
@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
.animate-spin {
  animation: spin 1s linear infinite;
}

/* Slide In (Sidebar, Drawers) */
@keyframes slide-in-right {
  from { transform: translateX(100%); opacity: 0; }
  to { transform: translateX(0); opacity: 1; }
}
@keyframes slide-out-right {
  from { transform: translateX(0); opacity: 1; }
  to { transform: translateX(100%); opacity: 0; }
}
.animate-slide-in-right {
  animation: slide-in-right var(--duration-slow) var(--ease-out);
}
.animate-slide-out-right {
  animation: slide-out-right var(--duration-slow) var(--ease-in);
}

/* Scale In (Modals, Popovers) */
@keyframes scale-in {
  from { transform: scale(0.95); opacity: 0; }
  to { transform: scale(1); opacity: 1; }
}
.animate-scale-in {
  animation: scale-in var(--duration-slow) var(--ease-out);
}

/* Shimmer (Skeleton loading) */
@keyframes shimmer {
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}
.animate-shimmer {
  background: linear-gradient(90deg, var(--color-bg-tertiary) 25%, var(--color-hover-light) 50%, var(--color-bg-tertiary) 75%);
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
}
```

---

## Reduced Motion

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

---

## Tailwind Integration

```javascript
// tailwind.config.ts
module.exports = {
  theme: {
    extend: {
      transitionDuration: {
        '0': '0ms',
        '75': '75ms',
        '150': '150ms',
        '200': '200ms',
        '300': '300ms',
        '500': '500ms',
      },
      transitionTimingFunction: {
        'linear': 'linear',
        'in': 'cubic-bezier(0.4, 0, 1, 1)',
        'out': 'cubic-bezier(0, 0, 0.2, 1)',
        'in-out': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
      animation: {
        'fade-in': 'fade-in 200ms ease-out forwards',
        'pulse': 'pulse 2s ease-in-out infinite',
        'spin': 'spin 1s linear infinite',
        'slide-in-right': 'slide-in-right 200ms ease-out',
        'slide-out-right': 'slide-out-right 200ms ease-in',
        'scale-in': 'scale-in 200ms ease-out',
        'shimmer': 'shimmer 1.5s infinite',
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'pulse': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.5' },
        },
        'spin': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        'slide-in-right': {
          '0%': { transform: 'translateX(100%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        'slide-out-right': {
          '0%': { transform: 'translateX(0)', opacity: '1' },
          '100%': { transform: 'translateX(100%)', opacity: '0' },
        },
        'scale-in': {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        'shimmer': {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
    },
  },
};
```

---

## Usage in Components

### Button Hover
```tsx
<button className="transition-colors duration-150 ease-out hover:bg-primary-700">
```

### Card Hover
```tsx
<div className="transition-all duration-150 ease-out hover:shadow-md hover:-translate-y-0.5">
```

### Template Card (Group Hover)
```tsx
<div className="group relative overflow-hidden rounded-2xl">
  <img className="transition-transform duration-300 group-hover:scale-105" />
  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
</div>
```

### Input Focus
```tsx
<input className="transition-colors duration-150 focus:border-primary-500 focus:outline-none" />
```

### Dark Mode Toggle
```tsx
<button className="transition-colors duration-150">
  {darkMode ? <Sun className="transition-transform duration-150" /> : <Moon />}
</button>
```

### Loading States
```tsx
{loading && <Sparkles className="animate-spin" />}
<div className="animate-pulse">Loading...</div>
<div className="animate-shimmer h-4 w-full rounded" />
```

### Modal/Dialog
```tsx
<div className="animate-scale-in">Modal Content</div>
```

### Sidebar (Builder)
```tsx
<div className={view === "editor" ? "w-80 transition-all duration-200" : "w-0 transition-all duration-200"}>
```

---

## Performance Guidelines

1. **Animate Transform/Opacity Only** - GPU accelerated
2. **Avoid Layout Properties** - width, height, margin, padding trigger reflow
3. **Use `will-change` Sparingly** - Only for elements animating frequently
4. **Limit Concurrent Animations** - Max 2-3 simultaneous
5. **Test on Low-End Devices** - 60fps target

```css
/* Good: GPU accelerated */
.hover-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-lg);
}

/* Avoid: Triggers layout */
.hover-card:hover {
  margin-top: -4px;
  padding-bottom: 4px;
}
```

---

## Do's and Don'ts

| ✅ Do | ❌ Don't |
|-------|----------|
| Use `transition-colors` for color changes | Use `transition-all` everywhere |
| Combine transform + shadow for cards | Animate width/height/margin |
| Respect `prefers-reduced-motion` | Disable animations globally |
| Use standard durations (150ms, 200ms, 300ms) | Custom arbitrary durations |
| Test on mobile performance | Assume desktop performance = mobile |

---

## Related Files
- `UI_specs/design-system/colors.md` (transition colors)
- `UI_specs/design-system/shadows.md` (shadow transitions)
- `UI_specs/components/button.md` (button transitions)
- `UI_specs/components/card.md` (card hover transitions)
- `UI_specs/components/dark-mode-toggle.md` (toggle animation)
- `frontend/tailwind.config.ts` (custom animations)