# Color Design Tokens

## BuildMySite Color System

All colors defined as CSS custom properties for theme switching and Tailwind integration.

---

## Brand Colors

```css
:root {
  /* Primary Blue */
  --color-primary-50: #eff6ff;
  --color-primary-100: #dbeafe;
  --color-primary-200: #bfdbfe;
  --color-primary-300: #93c5fd;
  --color-primary-400: #60a5fa;
  --color-primary-500: #3b82f6;  /* Main brand */
  --color-primary-600: #2563eb;  /* Hover states */
  --color-primary-700: #1d4ed8;  /* Active/pressed */
  --color-primary-800: #1e40af;
  --color-primary-900: #1e3a8a;
  --color-primary-950: #172554;
}
```

**Usage**:
- Primary buttons, links, focus rings
- Icon accents in cards
- Gradient starts

---

## Semantic Colors

### Success (Green)
```css
--color-success-50: #f0fdf4;
--color-success-100: #dcfce7;
--color-success-500: #22c55e;
--color-success-600: #16a34a;  /* Published badge */
--color-success-700: #15803d;
```

### Warning (Amber/Yellow)
```css
--color-warning-50: #fffbeb;
--color-warning-100: #fef3c7;
--color-warning-500: #f59e0b;  /* Accent color default */
--color-warning-600: #d97706;  /* Draft badge */
--color-warning-700: #b45309;
```

### Error (Red)
```css
--color-error-50: #fef2f2;
--color-error-100: #fee2e2;
--color-error-500: #ef4444;
--color-error-600: #dc2626;  /* Destructive actions */
--color-error-700: #b91c1c;
```

### Info (Blue)
```css
--color-info-50: #eff6ff;
--color-info-100: #dbeafe;
--color-info-500: #3b82f6;
--color-info-600: #2563eb;  /* Processing badges */
--color-info-700: #1d4ed8;
```

---

## Neutral Colors (Light Mode)

```css
:root {
  /* Backgrounds */
  --color-bg-primary: #ffffff;        /* Page/card backgrounds */
  --color-bg-secondary: #f9fafb;      /* Section backgrounds (gray-50) */
  --color-bg-tertiary: #f3f4f6;       /* Input backgrounds (gray-100) */
  --color-bg-inverse: #111827;        /* Dark sections (gray-900) */

  /* Text */
  --color-text-primary: #111827;      /* Headings (gray-900) */
  --color-text-secondary: #4b5563;    /* Body text (gray-600) */
  --color-text-muted: #9ca3af;        /* Placeholders (gray-400) */
  --color-text-inverse: #f9fafb;      /* On dark backgrounds */

  /* Borders */
  --color-border-light: #e5e7eb;      /* Default borders (gray-200) */
  --color-border-medium: #d1d5db;     /* Input borders (gray-300) */
  --color-border-dark: #9ca3af;       /* Focus/hover (gray-400) */

  /* Interactive */
  --color-hover-light: #f3f4f6;       /* Hover backgrounds (gray-100) */
  --color-active-light: #e5e7eb;      /* Active/pressed (gray-200) */
}
```

---

## Neutral Colors (Dark Mode)

```css
.dark {
  /* Backgrounds */
  --color-bg-primary: #111827;        /* Page/card (gray-900) */
  --color-bg-secondary: #1f2937;      /* Cards (gray-800) */
  --color-bg-tertiary: #374151;       /* Inputs (gray-700) */
  --color-bg-inverse: #f9fafb;        /* Light sections */

  /* Text */
  --color-text-primary: #f9fafb;      /* Headings (gray-50) */
  --color-text-secondary: #d1d5db;    /* Body (gray-300) */
  --color-text-muted: #9ca3af;        /* Placeholders (gray-400) */
  --color-text-inverse: #111827;      /* On light backgrounds */

  /* Borders */
  --color-border-light: #374151;      /* Default (gray-700) */
  --color-border-medium: #4b5563;     /* Inputs (gray-600) */
  --color-border-dark: #6b7280;       /* Focus (gray-500) */

  /* Interactive */
  --color-hover-light: #1f2937;       /* Hover (gray-800) */
  --color-active-light: #374151;      /* Active (gray-700) */
}
```

---

## AI-Generated Theme Colors (Dynamic)

These are set at runtime via CSS variables from website JSON:

```css
/* Applied by WebsiteRenderer.tsx */
:root {
  --primary: #3b82f6;      /* From theme.primary_color */
  --secondary: #1f2937;    /* From theme.secondary_color */
  --accent: #f59e0b;       /* From theme.accent_color */
}
```

**Fallback Values** (if AI doesn't provide):
- Primary: `#3b82f6` (Blue-600)
- Secondary: `#1f2937` (Gray-800)
- Accent: `#f59e0b` (Amber-500)

---

## Nepal-Specific Colors

```css
:root {
  /* Nepal Flag Colors */
  --color-nepal-crimson: #DC143C;    /* Flag primary */
  --color-nepal-blue: #003893;       /* Flag border */
  --color-nepal-white: #FFFFFF;      /* Flag symbols */

  /* Balen City Green */
  --color-balen-green: #00A651;      /* Balen branding */
  --color-balen-dark: #007A3D;       /* Hover state */
}
```

**Usage**:
- Nepal flag in headers/footers
- Balen City badges and links
- AI prompt context for Nepali businesses

---

## Business Type Color Mapping (AI Guidelines)

| Business Type | Primary | Secondary | Accent | Example |
|---------------|---------|-----------|--------|---------|
| Trekking/Nature | `#059669` (Emerald-600) | `#1F2937` | `#F97316` | Summit Trekking |
| Tech/Corporate | `#2563EB` (Blue-600) | `#1E40AF` | `#06B6D4` | Tech Startup |
| Food/Restaurant | `#F97316` (Orange-500) | `#C41E3A` | `#FFC107` | Restaurant |
| Authentic Restaurant | `#C41E3A` (Red-700) | `#1A1A2E` | `#FFD700` | Himalayan Kitchen |
| Luxury/Premium | `#1F2937` (Gray-800) | `#111827` | `#F59E0B` | High-end |
| Creative/Portfolio | `#7C3AED` (Violet-600) | `#5B21B6` | `#F472B6` | Portfolio |
| Medical/Health | `#0D9488` (Teal-600) | `#115E59` | `#F59E0B` | Clinic |
| Education | `#2563EB` (Blue-600) | `#1E3A8A` | `#F59E0B` | School |

---

## Gradient Definitions

```css
:root {
  /* Primary gradients */
  --gradient-primary: linear-gradient(135deg, var(--color-primary-600), var(--color-primary-800));
  --gradient-primary-light: linear-gradient(135deg, var(--color-primary-400), var(--color-primary-600));
  
  /* Card gradients (website cards) */
  --gradient-card-light: linear-gradient(135deg, var(--color-primary-100), var(--color-primary-200));
  --gradient-card-dark: linear-gradient(135deg, var(--color-primary-900), var(--color-primary-800));
  
  /* Hero backgrounds */
  --gradient-hero-light: linear-gradient(180deg, var(--color-bg-primary), var(--color-bg-secondary));
  --gradient-hero-dark: linear-gradient(180deg, var(--color-bg-primary), var(--color-bg-secondary));
  
  /* Overlay gradients */
  --gradient-overlay-dark: linear-gradient(180deg, rgba(0,0,0,0.7), transparent);
  --gradient-overlay-light: linear-gradient(180deg, rgba(0,0,0,0.3), transparent);
}
```

---

## Tailwind Integration

```javascript
// tailwind.config.ts
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: {
          50: 'var(--color-primary-50)',
          // ... all shades
          DEFAULT: 'var(--color-primary-600)',
        },
        success: { /* ... */ },
        warning: { /* ... */ },
        error: { /* ... */ },
        // Semantic aliases
        bg: {
          primary: 'var(--color-bg-primary)',
          secondary: 'var(--color-bg-secondary)',
          tertiary: 'var(--color-bg-tertiary)',
        },
        text: {
          primary: 'var(--color-text-primary)',
          secondary: 'var(--color-text-secondary)',
          muted: 'var(--color-text-muted)',
        },
        border: {
          light: 'var(--color-border-light)',
          medium: 'var(--color-border-medium)',
        },
      },
    },
  },
};
```

---

## Accessibility Contrast Ratios

| Combination | Ratio | WCAG Level |
|-------------|-------|------------|
| Primary-600 on White | 4.5:1 | AA ✓ |
| Primary-700 on White | 6.1:1 | AAA ✓ |
| Text-primary on bg-primary | 15.3:1 | AAA ✓ |
| Text-secondary on bg-primary | 7.3:1 | AAA ✓ |
| Error-600 on White | 4.5:1 | AA ✓ |
| Warning-600 on White | 3.0:1 | AA Large only ⚠️ |

**Note**: Warning yellow on white fails AA for normal text. Use Warning-700 or add dark border.

---

## Do's and Don'ts

| ✅ Do | ❌ Don't |
|-------|----------|
| Use CSS variables for theming | Hardcode hex values in components |
| Reference semantic names (success, error) | Use color names (green, red) directly |
| Test both light/dark modes | Assume light mode works in dark |
| Maintain 4.5:1 minimum contrast | Use low-contrast combinations |
| Use opacity variants for dark mode badges | Use solid dark backgrounds |

---

## Related Files
- `UI_specs/design-system/typography.md`
- `UI_specs/design-system/spacing.md`
- `UI_specs/components/badge.md` (uses semantic colors)
- `UI_specs/components/card.md` (uses gradients)
- `frontend/src/components/WebsiteRenderer.tsx` (applies dynamic theme)