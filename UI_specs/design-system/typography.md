# Typography Design Tokens

## BuildMySite Typography System

Font: **Inter** (Google Fonts) - weights 400, 500, 600, 700

---

## Font Families

```css
:root {
  --font-sans: 'Inter', ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  --font-mono: 'JetBrains Mono', ui-monospace, SFMono-Regular, 'SF Mono', Menlo, Consolas, 'Liberation Mono', monospace;
  
  /* Fallback for AI-generated websites */
  --font-website: 'Inter', system-ui, sans-serif;
}
```

**Loading** (layout.tsx):
```typescript
const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
<body className={inter.className}>
```

---

## Font Sizes

```css
:root {
  /* Base: 16px */
  --text-xs: 0.75rem;    /* 12px - Badges, timestamps, fine print */
  --text-sm: 0.875rem;   /* 14px - Labels, secondary text, form help */
  --text-base: 1rem;     /* 16px - Body text, inputs (prevents iOS zoom) */
  --text-lg: 1.125rem;   /* 18px - Large body, card descriptions */
  --text-xl: 1.25rem;    /* 20px - Subheadings, card titles */
  --text-2xl: 1.5rem;    /* 24px - Section headings */
  --text-3xl: 1.875rem;  /* 30px - Page headings */
  --text-4xl: 2.25rem;   /* 36px - Hero headings (mobile) */
  --text-5xl: 3rem;      /* 48px - Hero headings (tablet) */
  --text-6xl: 3.75rem;   /* 60px - Hero headings (desktop) */
}
```

### Responsive Scale
```css
/* Mobile First */
.text-responsive-xl {
  font-size: var(--text-3xl);  /* 30px */
}
@media (min-width: 768px) {
  .text-responsive-xl {
    font-size: var(--text-4xl);  /* 36px */
  }
}
@media (min-width: 1024px) {
  .text-responsive-xl {
    font-size: var(--text-5xl);  /* 48px */
  }
}
```

---

## Font Weights

```css
:root {
  --font-normal: 400;    /* Body text, paragraphs */
  --font-medium: 500;    /* Labels, emphasis, button text */
  --font-semibold: 600;  /* Card titles, important numbers */
  --font-bold: 700;      /* Headings, hero text, logos */
}
```

**Usage Mapping**:
| Weight | Usage |
|--------|-------|
| 400 | Paragraphs, descriptions, input values |
| 500 | Form labels, button text, navigation links |
| 600 | Card headings, statistics, section titles |
| 700 | Page titles, hero headlines, logo |

---

## Line Heights

```css
:root {
  --leading-none: 1;           /* Headings, tight */
  --leading-tight: 1.1;        /* Large headings */
  --leading-snug: 1.375;       /* Medium headings */
  --leading-normal: 1.5;       /* Body text (default) */
  --leading-relaxed: 1.625;    /* Long-form content */
  --leading-loose: 2;          /* Spacious, readable */
}
```

**Mapping**:
| Size | Line Height |
|------|-------------|
| 6xl-4xl | 1.1 (tight) |
| 3xl-2xl | 1.25 (snug) |
| xl-base | 1.5 (normal) |
| lg+ | 1.625 (relaxed) |

---

## Letter Spacing

```css
:root {
  --tracking-tighter: -0.05em;  /* Large headings */
  --tracking-tight: -0.025em;   /* Headings */
  --tracking-normal: 0;         /* Body */
  --tracking-wide: 0.025em;     /* Buttons, labels */
  --tracking-wider: 0.05em;     /* Uppercase, tracking */
  --tracking-widest: 0.1em;     /* Letter-spaced headings */
}
```

---

## Text Styles (Component-Level)

### Heading 1 (Hero)
```css
.text-h1 {
  font-size: var(--text-4xl);      /* 36px mobile */
  font-weight: var(--font-bold);
  line-height: var(--leading-tight);
  letter-spacing: var(--tracking-tighter);
  @media (min-width: 768px) { font-size: var(--text-5xl); }  /* 48px */
  @media (min-width: 1024px) { font-size: var(--text-6xl); } /* 60px */
}
```

### Heading 2 (Page Title)
```css
.text-h2 {
  font-size: var(--text-3xl);      /* 30px */
  font-weight: var(--font-bold);
  line-height: var(--leading-snug);
  letter-spacing: var(--tracking-tight);
}
```

### Heading 3 (Section Title)
```css
.text-h3 {
  font-size: var(--text-2xl);      /* 24px */
  font-weight: var(--font-bold);
  line-height: var(--leading-snug);
}
```

### Heading 4 (Card Title)
```css
.text-h4 {
  font-size: var(--text-xl);       /* 20px */
  font-weight: var(--font-semibold);
  line-height: var(--leading-normal);
}
```

### Body Large (Lead)
```css
.text-body-lg {
  font-size: var(--text-lg);       /* 18px */
  font-weight: var(--font-normal);
  line-height: var(--leading-relaxed);
}
```

### Body (Default)
```css
.text-body {
  font-size: var(--text-base);     /* 16px */
  font-weight: var(--font-normal);
  line-height: var(--leading-normal);
}
```

### Body Small (Secondary)
```css
.text-body-sm {
  font-size: var(--text-sm);       /* 14px */
  font-weight: var(--font-normal);
  line-height: var(--leading-normal);
}
```

### Label / Button Text
```css
.text-label {
  font-size: var(--text-sm);       /* 14px */
  font-weight: var(--font-medium);
  line-height: var(--leading-normal);
  letter-spacing: var(--tracking-wide);
}
```

### Caption / Timestamp
```css
.text-caption {
  font-size: var(--text-xs);       /* 12px */
  font-weight: var(--font-normal);
  line-height: var(--leading-normal);
  color: var(--color-text-muted);
}
```

### Code / Mono
```css
.text-code {
  font-family: var(--font-mono);
  font-size: var(--text-sm);
  line-height: var(--leading-normal);
}
```

---

## Tailwind Integration

```javascript
// tailwind.config.ts
module.exports = {
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-sans)'],
        mono: ['var(--font-mono)'],
      },
      fontSize: {
        'h1': ['var(--text-4xl)', { lineHeight: 'var(--leading-tight)', letterSpacing: 'var(--tracking-tighter)' }],
        'h2': ['var(--text-3xl)', { lineHeight: 'var(--leading-snug)', letterSpacing: 'var(--tracking-tight)' }],
        'h3': ['var(--text-2xl)', { lineHeight: 'var(--leading-snug)' }],
        'h4': ['var(--text-xl)', { lineHeight: 'var(--leading-normal)', fontWeight: '600' }],
        'body-lg': ['var(--text-lg)', { lineHeight: 'var(--leading-relaxed)' }],
        'body': ['var(--text-base)', { lineHeight: 'var(--leading-normal)' }],
        'body-sm': ['var(--text-sm)', { lineHeight: 'var(--leading-normal)' }],
        'label': ['var(--text-sm)', { lineHeight: 'var(--leading-normal)', fontWeight: '500', letterSpacing: 'var(--tracking-wide)' }],
        'caption': ['var(--text-xs)', { lineHeight: 'var(--leading-normal)', color: 'var(--color-text-muted)' }],
      },
    },
  },
};
```

---

## Usage in Components

### Landing Hero
```tsx
<h1 className="text-h1 text-gray-900 dark:text-white mb-6">
  Create Beautiful Websites
  <span className="text-primary-600"> with AI</span>
</h1>
<p className="text-body-lg text-gray-600 dark:text-gray-300 mb-10 max-w-2xl mx-auto">
  Describe your business...
</p>
```

### Card Titles
```tsx
<h3 className="text-h4 font-semibold text-gray-900 dark:text-white mb-2">
  {feature.title}
</h3>
```

### Form Labels
```tsx
<label className="text-label text-gray-700 dark:text-gray-300 mb-2 block">
  Email
</label>
```

### Timestamps
```tsx
<p className="text-caption">
  Created {date.toLocaleDateString()}
</p>
```

---

## Dark Mode Adjustments

```css
.dark {
  /* Slightly lighter weights for dark mode readability */
  --font-normal: 400;
  --font-medium: 500;
  --font-semibold: 600;
  --font-bold: 700;
  
  /* Increase line height slightly for dark backgrounds */
  --leading-normal: 1.6;
  --leading-relaxed: 1.75;
}
```

---

## Do's and Don'ts

| ✅ Do | ❌ Don't |
|-------|----------|
| Use 16px minimum for inputs (iOS zoom) | Use text-sm for input values |
| Use semantic text styles (h1, body, label) | Hardcode font-size/weight |
| Maintain consistent line heights | Mix line heights randomly |
| Use font-medium for buttons/labels | Use font-normal for interactive text |
| Test readability on dark backgrounds | Assume light mode contrast works |

---

## Related Files
- `UI_specs/design-system/colors.md` (text colors)
- `UI_specs/design-system/spacing.md` (text spacing)
- `frontend/src/app/globals.css` (font loading)
- `frontend/tailwind.config.ts` (Tailwind config)