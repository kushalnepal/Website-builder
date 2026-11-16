# Shadows Design Tokens

## BuildMySite Shadow System

Layered elevation system for depth and hierarchy.

---

## Shadow Scale

```css
:root {
  /* None */
  --shadow-none: none;

  /* Subtle - Barely visible, for cards on same bg */
  --shadow-xs: 0 1px 2px 0 rgb(0 0 0 / 0.03);
  --shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);

  /* Low - Cards, dropdowns */
  --shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1),
               0 2px 4px -2px rgb(0 0 0 / 0.1);

  /* Medium - Modals, popovers, hover elevation */
  --shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1),
               0 4px 6px -4px rgb(0 0 0 / 0.1);

  /* High - Tooltips, floating panels */
  --shadow-xl: 0 20px 25px -5px rgb(0 0 0 / 0.1),
               0 8px 10px -6px rgb(0 0 0 / 0.1);

  /* Maximum - Full-screen modals */
  --shadow-2xl: 0 25px 50px -12px rgb(0 0 0 / 0.25);

  /* Inner - Inset for pressed states */
  --shadow-inner: inset 0 2px 4px 0 rgb(0 0 0 / 0.05);

  /* Focus Ring (not a shadow but related) */
  --focus-ring: 0 0 0 2px var(--color-primary-500);
  --focus-ring-offset: 0 0 0 2px var(--color-bg-primary);
}
```

---

## Dark Mode Shadows

```css
.dark {
  /* Dark mode shadows are more subtle (less visible on dark bg) */
  --shadow-xs: 0 1px 2px 0 rgb(0 0 0 / 0.1);
  --shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.15);
  --shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.2),
               0 2px 4px -2px rgb(0 0 0 / 0.15);
  --shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.3),
               0 4px 6px -4px rgb(0 0 0 / 0.2);
  --shadow-xl: 0 20px 25px -5px rgb(0 0 0 / 0.4),
               0 8px 10px -6px rgb(0 0 0 / 0.25);
  --shadow-2xl: 0 25px 50px -12px rgb(0 0 0 / 0.5);
  --shadow-inner: inset 0 2px 4px 0 rgb(0 0 0 / 0.2);
}
```

---

## Component Shadow Mapping

| Component | Default | Hover | Active/Focus |
|-----------|---------|-------|--------------|
| **Cards (Standard)** | shadow-sm | shadow-md | - |
| **Cards (Interactive)** | shadow-sm | shadow-lg | - |
| **Website Cards** | shadow-sm | - | - |
| **Auth Cards** | shadow-sm | - | - |
| **Template Cards** | - (image) | scale-105 | - |
| **Buttons (Primary)** | - | - | shadow-inner (pressed) |
| **Dropdowns/Modals** | shadow-xl | - | - |
| **Navbar** | shadow-sm (fixed) | - | - |
| **Hero Overlay** | - | - | - |
| **Sidebar (Builder)** | border-r only | - | - |
| **Preview Container** | - | - | - |
| **Tooltips** | shadow-lg | - | - |

---

## Special Shadows

### Colored Shadows (Primary Actions)
```css
:root {
  --shadow-primary-sm: 0 2px 4px 0 rgb(59 130 246 / 0.2);
  --shadow-primary-md: 0 4px 8px 0 rgb(59 130 246 / 0.25);
  --shadow-primary-lg: 0 8px 16px 0 rgb(59 130 246 / 0.3);
}
```

**Usage**: Primary button hover, focus rings, active states

### Glow Effects (AI Generation)
```css
:root {
  --shadow-ai-glow: 0 0 20px 4px rgb(59 130 246 / 0.15);
  --shadow-ai-pulse: 0 0 30px 8px rgb(59 130 246 / 0.1);
}
```

**Usage**: Loading spinners, generating states, AI-powered badges

### Navbar Shadow
```css
/* Fixed header with subtle shadow */
.navbar-shadow {
  box-shadow: var(--shadow-sm);
  /* Dark mode handled by CSS variable */
}
```

### Card Hover Transition
```css
.card-interactive {
  box-shadow: var(--shadow-sm);
  transition: box-shadow var(--transition-normal), transform var(--transition-fast);
}
.card-interactive:hover {
  box-shadow: var(--shadow-md);
  transform: translateY(-2px);
}
```

---

## Tailwind Integration

```javascript
// tailwind.config.ts
module.exports = {
  theme: {
    extend: {
      boxShadow: {
        'xs': 'var(--shadow-xs)',
        'sm': 'var(--shadow-sm)',
        'md': 'var(--shadow-md)',
        'lg': 'var(--shadow-lg)',
        'xl': 'var(--shadow-xl)',
        '2xl': 'var(--shadow-2xl)',
        'inner': 'var(--shadow-inner)',
        'primary': 'var(--shadow-primary-md)',
        'ai-glow': 'var(--shadow-ai-glow)',
      },
    },
  },
};
```

**Usage in Components**:
```tsx
// Standard card
<div className="bg-white dark:bg-gray-700 rounded-2xl shadow-sm hover:shadow-md transition-shadow">

// Interactive card
<div className="bg-white dark:bg-gray-700 rounded-2xl shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all">

// Modal/Dialog
<div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl">

// Navbar
<header className="fixed top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-sm border-b border-gray-200 dark:border-gray-700">
```

---

## Shadow Best Practices

### Do's
- Use `shadow-sm` as default for cards on white/gray backgrounds
- Elevate on hover for interactive elements (`hover:shadow-md` or `hover:shadow-lg`)
- Use colored shadows sparingly (primary actions only)
- Match shadow intensity to background (darker bg = stronger shadow)
- Transition shadows for smooth interactions

### Don'ts
- Don't stack multiple shadows (use single token)
- Don't use `shadow-xl` or `2xl` for standard cards
- Don't use shadows on elements with colored backgrounds (use borders instead)
- Don't forget dark mode adjustments
- Don't animate `box-shadow` alone (combine with transform for performance)

---

## Performance Notes

- **CSS Variables**: Shadows defined as variables for theme switching
- **Transition**: Only transition `box-shadow` when necessary
- **GPU Acceleration**: Combine with `transform` for hover effects
- **Will-Change**: Consider `will-change: box-shadow, transform` for frequent animations

---

## Related Files
- `UI_specs/design-system/border-radius.md` (card rounding)
- `UI_specs/design-system/transitions.md` (shadow transitions)
- `UI_specs/components/card.md` (card shadow usage)
- `UI_specs/components/button.md` (button shadows)
- `frontend/tailwind.config.ts` (custom shadows)