# Border Radius Design Tokens

## BuildMySite Border Radius System

Consistent rounding scale for all components.

---

## Radius Scale

```css
:root {
  --radius-none: 0;
  --radius-xs: 0.125rem;   /* 2px - Tiny elements, badges */
  --radius-sm: 0.25rem;    /* 4px - Small inputs, tight corners */
  --radius-md: 0.375rem;   /* 6px - Standard buttons, tags */
  --radius-lg: 0.5rem;     /* 8px - Default cards, inputs, modals */
  --radius-xl: 0.75rem;    /* 12px - Large cards, hero sections */
  --radius-2xl: 1rem;      /* 16px - Major cards, auth forms */
  --radius-3xl: 1.5rem;    /* 24px - Hero containers, full-screen */
  --radius-full: 9999px;   /* Pills, circles, avatars */
}
```

---

## Component Radius Mapping

| Component | Radius | Token | Notes |
|-----------|--------|-------|-------|
| **Buttons (Primary)** | 12px | `--radius-xl` | `rounded-xl` |
| **Buttons (Secondary)** | 8px | `--radius-lg` | `rounded-lg` |
| **Buttons (Icon)** | 8px | `--radius-lg` | `rounded-lg` |
| **Inputs (Standard)** | 12px | `--radius-xl` | `rounded-xl` |
| **Inputs (Compact)** | 8px | `--radius-lg` | `rounded-lg` |
| **Textareas** | 12px | `--radius-xl` | `rounded-xl` |
| **Cards (Standard)** | 16px | `--radius-2xl` | `rounded-2xl` |
| **Cards (Compact)** | 12px | `--radius-xl` | `rounded-xl` |
| **Auth Cards** | 16px | `--radius-2xl` | `rounded-2xl` |
| **Website Cards** | 16px | `--radius-2xl` | `rounded-2xl` |
| **Template Cards** | 16px | `--radius-2xl` | `rounded-2xl` |
| **Badges/Status** | 9999px | `--radius-full` | `rounded-full` |
| **Quick Action Tags** | 9999px | `--radius-full` | `rounded-full` |
| **Modals/Dialogs** | 16px | `--radius-2xl` | `rounded-2xl` |
| **Dropdowns** | 8px | `--radius-lg` | `rounded-lg` |
| **Tooltips** | 6px | `--radius-md` | `rounded-md` |
| **Avatars** | 9999px | `--radius-full` | `rounded-full` |
| **Images (Gallery)** | 12px | `--radius-xl` | `rounded-xl` |
| **Images (Hero bg)** | 0 | `--radius-none` | Full bleed |
| **Navbar** | 0 | `--radius-none` | Full width |
| **Sidebar** | 0 | `--radius-none` | Full height |
| **Preview Container** | 12px | `--radius-xl` | `rounded-xl` |

---

## Semantic Radius Aliases

```css
:root {
  /* Interactive Elements */
  --radius-button: var(--radius-xl);      /* Primary buttons */
  --radius-button-secondary: var(--radius-lg); /* Secondary/ghost */
  --radius-button-icon: var(--radius-lg);  /* Icon buttons */

  /* Form Elements */
  --radius-input: var(--radius-xl);       /* Standard inputs */
  --radius-input-compact: var(--radius-lg); /* Compact inputs */
  --radius-textarea: var(--radius-xl);    /* Textareas */

  /* Containers */
  --radius-card: var(--radius-2xl);       /* Standard cards */
  --radius-card-compact: var(--radius-xl); /* Compact cards */
  --radius-card-spacious: var(--radius-3xl); /* Hero cards */

  /* Pills & Tags */
  --radius-pill: var(--radius-full);      /* Badges, tags, pills */
  --radius-badge: var(--radius-full);     /* Status badges */

  /* Overlays */
  --radius-modal: var(--radius-2xl);      /* Modals, dialogs */
  --radius-popover: var(--radius-lg);     /* Popovers, dropdowns */
  --radius-tooltip: var(--radius-md);     /* Tooltips */

  /* Media */
  --radius-image: var(--radius-xl);       /* Content images */
  --radius-avatar: var(--radius-full);    /* User avatars */
  --radius-thumbnail: var(--radius-lg);   /* Small thumbnails */
}
```

---

## Responsive Radius

```css
:root {
  /* Mobile: Slightly tighter */
  --radius-card-mobile: var(--radius-xl);      /* 12px */
  --radius-button-mobile: var(--radius-lg);    /* 8px */
  --radius-input-mobile: var(--radius-lg);     /* 8px */

  /* Tablet: Standard */
  --radius-card-tablet: var(--radius-2xl);     /* 16px */
  --radius-button-tablet: var(--radius-xl);    /* 12px */
  --radius-input-tablet: var(--radius-xl);     /* 12px */

  /* Desktop: Full */
  --radius-card-desktop: var(--radius-2xl);    /* 16px */
  --radius-button-desktop: var(--radius-xl);   /* 12px */
  --radius-input-desktop: var(--radius-xl);    /* 12px */
}
```

---

## Special Cases

### WebsiteRenderer Sections
Sections rendered by AI have their own radius from JSON:
```json
{
  "style": {
    "layout": "split",
    "borderRadius": "xl"  // Maps to --radius-xl
  }
}
```

**Renderer applies**:
```typescript
style={{ borderRadius: section.style?.borderRadius || 'var(--radius-xl)' }}
```

### Gradient Cards (Website Cards)
```css
.website-card-header {
  /* Top corners only for gradient header */
  border-top-left-radius: var(--radius-2xl);
  border-top-right-radius: var(--radius-2xl);
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
}

.website-card-content {
  /* Bottom corners only */
  border-top-left-radius: 0;
  border-top-right-radius: 0;
  border-bottom-left-radius: var(--radius-2xl);
  border-bottom-right-radius: var(--radius-2xl);
}
```

---

## Tailwind Integration

```javascript
// tailwind.config.ts
module.exports = {
  theme: {
    extend: {
      borderRadius: {
        'xs': 'var(--radius-xs)',
        'sm': 'var(--radius-sm)',
        'md': 'var(--radius-md)',
        'lg': 'var(--radius-lg)',
        'xl': 'var(--radius-xl)',
        '2xl': 'var(--radius-2xl)',
        '3xl': 'var(--radius-3xl)',
        'full': 'var(--radius-full)',
        // Semantic
        'button': 'var(--radius-button)',
        'card': 'var(--radius-card)',
        'input': 'var(--radius-input)',
        'pill': 'var(--radius-pill)',
        'modal': 'var(--radius-modal)',
      },
    },
  },
};
```

**Usage**:
```tsx
// Standard classes (preferred)
<button className="rounded-xl">           // Primary button
<button className="rounded-lg">           // Secondary/icon button
<input className="rounded-xl" />
<div className="rounded-2xl">             // Card
<span className="rounded-full">           // Badge

// Semantic classes
<div className="rounded-card">
<button className="rounded-button">
<input className="rounded-input">
<span className="rounded-pill">
```

---

## Dark Mode Considerations

Border radius **does not change** in dark mode. However, visibility of rounded corners may need adjustment:

```css
.dark {
  /* Ensure rounded corners visible on dark backgrounds */
  --card-border: 1px solid var(--color-border-light);
}
```

---

## Do's and Don'ts

| ✅ Do | ❌ Don't |
|-------|----------|
| Use semantic radius tokens | Mix radius values randomly |
| Use `rounded-full` for all pills/badges | Use `rounded-lg` for pills |
| Keep cards at `rounded-2xl` (16px) | Use smaller radius for cards |
| Match input radius to button radius | Input `rounded-md` + Button `rounded-xl` |
| Use `rounded-xl` for hero sections | Sharp corners on hero |

---

## Related Files
- `UI_specs/design-system/shadows.md` (card elevation)
- `UI_specs/design-system/spacing.md` (card padding)
- `UI_specs/components/card.md` (card radius specs)
- `UI_specs/components/button.md` (button radius)
- `UI_specs/components/input-field.md` (input radius)
- `UI_specs/components/badge.md` (badge radius)
- `frontend/tailwind.config.ts` (custom radius)