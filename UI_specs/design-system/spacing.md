# Spacing Design Tokens

## BuildMySite Spacing System

Base unit: **4px** (0.25rem) - All spacing derived from this unit.

---

## Spacing Scale

```css
:root {
  /* Base Units */
  --space-0: 0;
  --space-1: 0.25rem;   /* 4px  - Micro gaps, icon padding */
  --space-2: 0.5rem;    /* 8px  - Small gaps, tight padding */
  --space-3: 0.75rem;   /* 12px - Medium gaps */
  --space-4: 1rem;      /* 16px - Standard gap, base padding */
  --space-5: 1.25rem;   /* 20px - Large gaps */
  --space-6: 1.5rem;    /* 24px - Section padding, card gaps */
  --space-7: 1.75rem;   /* 28px - Large section padding */
  --space-8: 2rem;      /* 32px - Major section padding */
  --space-10: 2.5rem;   /* 40px - Hero padding */
  --space-12: 3rem;     /* 48px - Large hero padding */
  --space-16: 4rem;     /* 64px - Page-level padding */
  --space-20: 5rem;     /* 80px - Major vertical rhythm */
  --space-24: 6rem;     /* 96px - Extra large */
  --space-32: 8rem;     /* 128px - Hero heights */
}
```

---

## Semantic Spacing Aliases

```css
:root {
  /* Component Padding */
  --padding-xs: var(--space-2);     /* 8px - Badge, icon button */
  --padding-sm: var(--space-3);     /* 12px - Compact card, input */
  --padding-md: var(--space-4);     /* 16px - Standard card, button */
  --padding-lg: var(--space-6);     /* 24px - Spacious card, form */
  --padding-xl: var(--space-8);     /* 32px - Page sections, auth cards */

  /* Component Gaps */
  --gap-xs: var(--space-1);         /* 4px - Icon + text */
  --gap-sm: var(--space-2);         /* 8px - Inline items */
  --gap-md: var(--space-4);         /* 16px - Form fields, card grid */
  --gap-lg: var(--space-6);         /* 24px - Section elements */
  --gap-xl: var(--space-8);         /* 32px - Major layout */

  /* Layout Margins */
  --margin-xs: var(--space-1);      /* 4px - Tight */
  --margin-sm: var(--space-2);      /* 8px - Small */
  --margin-md: var(--space-4);      /* 16px - Standard */
  --margin-lg: var(--space-6);      /* 24px - Section */
  --margin-xl: var(--space-8);      /* 32px - Major */
  --margin-2xl: var(--space-12);    /* 48px - Hero bottom */

  /* Container */
  --container-max: 80rem;           /* 1280px - max-w-7xl */
  --container-padding: var(--space-4);  /* 16px mobile */
  --container-padding-sm: var(--space-6); /* 24px tablet */
  --container-padding-lg: var(--space-8); /* 32px desktop */
}
```

---

## Component-Specific Spacing

### Buttons
| Size | Padding X | Padding Y | Gap (icon) |
|------|-----------|-----------|------------|
| xs | 2 (8px) | 1 (4px) | 1 (4px) |
| sm | 3 (12px) | 1.5 (6px) | 1.5 (6px) |
| md | 4 (16px) | 2 (8px) | 2 (8px) |
| lg | 6 (24px) | 3 (12px) | 2 (8px) |
| xl | 8 (32px) | 4 (16px) | 2 (8px) |

### Inputs
| Variant | Padding X | Padding Y | Icon Offset |
|---------|-----------|-----------|-------------|
| Standard | 4 (16px) | 3 (12px) | 10 (40px) |
| Textarea | 4 (16px) | 4 (16px) | N/A |
| Compact | 3 (12px) | 2 (8px) | 8 (32px) |

### Cards
| Variant | Padding | Gap (children) |
|---------|---------|----------------|
| Compact | 4 (16px) | 3 (12px) |
| Standard | 6 (24px) | 4 (16px) |
| Spacious | 8 (32px) | 6 (24px) |

### Layout Sections
| Section | Vertical Padding | Horizontal Padding |
|---------|------------------|-------------------|
| Hero | 20 (80px) / 32 (128px) | 4 (16px) / 6 (24px) / 8 (32px) |
| Features | 20 (80px) | 4/6/8 |
| Content | 12 (48px) | 4/6/8 |
| Footer | 12 (48px) | 4/6/8 |

---

## Grid & Flex Gaps

```css
:root {
  /* Grid Gaps */
  --grid-gap-sm: var(--space-4);    /* 16px - Tight grids */
  --grid-gap-md: var(--space-6);    /* 24px - Standard grids */
  --grid-gap-lg: var(--space-8);    /* 32px - Spacious grids */

  /* Flex Gaps */
  --flex-gap-xs: var(--space-1);    /* 4px - Icon + text */
  --flex-gap-sm: var(--space-2);    /* 8px - Button groups */
  --flex-gap-md: var(--space-4);    /* 16px - Nav items */
  --flex-gap-lg: var(--space-6);    /* 24px - Card actions */
  --flex-gap-xl: var(--space-8);    /* 32px - Major sections */
}
```

### Responsive Grid Patterns
```css
/* 5-column features (landing) */
.grid-features {
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: var(--grid-gap-md);
}
@media (min-width: 640px) { .grid-features { grid-template-columns: repeat(2, 1fr); } }
@media (min-width: 768px) { .grid-features { grid-template-columns: repeat(3, 1fr); } }
@media (min-width: 1024px) { .grid-features { grid-template-columns: repeat(4, 1fr); } }
@media (min-width: 1280px) { .grid-features { grid-template-columns: repeat(5, 1fr); } }

/* 4-column templates (landing) */
.grid-templates { /* ... repeat(4) at xl ... */ }

/* 3-column websites (dashboard) */
.grid-websites { /* ... repeat(3) at lg ... */ }
```

---

## Vertical Rhythm

```css
:root {
  /* Baseline: 4px */
  --rhythm-xs: var(--space-2);   /* 8px - Tight */
  --rhythm-sm: var(--space-4);   /* 16px - Base */
  --rhythm-md: var(--space-6);   /* 24px - Comfortable */
  --rhythm-lg: var(--space-8);   /* 32px - Generous */
  --rhythm-xl: var(--space-12);  /* 48px - Section */
  --rhythm-2xl: var(--space-16); /* 64px - Major */
}
```

### Text Spacing
```css
:root {
  --text-gap-xs: var(--space-1);   /* 4px - Heading + subtitle */
  --text-gap-sm: var(--space-2);   /* 8px - Title + description */
  --text-gap-md: var(--space-4);   /* 16px - Paragraph margins */
  --text-gap-lg: var(--space-6);   /* 24px - Section text blocks */
}
```

---

## Tailwind Integration

```javascript
// tailwind.config.ts
module.exports = {
  theme: {
    extend: {
      spacing: {
        // Already covered by default Tailwind (4px base)
        // Custom semantic additions:
        '18': '4.5rem',   /* 72px */
        '22': '5.5rem',   /* 88px */
        '26': '6.5rem',   /* 104px */
        '30': '7.5rem',   /* 120px */
      },
    },
  },
};
```

**Note**: Tailwind's default spacing scale (0.25rem increments) matches our system exactly. Use standard Tailwind classes: `p-4`, `m-6`, `gap-8`, `space-y-6`.

---

## Usage Examples

### Landing Page Hero
```tsx
<section className="pt-32 pb-20 px-4">           /* 128px / 80px vertical, 16px horizontal */
  <div className="max-w-4xl mx-auto text-center">
    <h1 className="mb-6">...</h1>                /* 24px bottom */
    <p className="mb-10">...</p>                 /* 40px bottom */
    <div className="mb-6">...</div>              /* 24px bottom */
  </div>
</section>
```

### Dashboard Grid
```tsx
<div className="grid md:grid-cols-3 gap-6">      /* 24px gap */
  <WebsiteCard />
</div>
```

### Form Fields
```tsx
<form className="space-y-6">                     /* 24px between fields */
  <div>...</div>
  <div>...</div>
</form>
```

### Card Content
```tsx
<div className="p-6 space-y-4">                  /* 24px padding, 16px gaps */
  <h3 className="mb-1">...</h3>                  /* 4px bottom */
  <p className="mb-4">...</p>                    /* 16px bottom */
</div>
```

---

## Do's and Don'ts

| ✅ Do | ❌ Don't |
|-------|----------|
| Use Tailwind spacing classes (p-4, m-6) | Hardcode pixel values |
| Follow vertical rhythm (multiples of 4px) | Use arbitrary values (mt-7, pb-13) |
| Use semantic gap variables for components | Mix gap sizes in same component |
| Maintain consistent container padding | Change horizontal padding per page |
| Test mobile/tablet/desktop spacing | Only test one breakpoint |

---

## Related Files
- `UI_specs/design-system/typography.md` (text spacing)
- `UI_specs/design-system/border-radius.md` (card rounding)
- `UI_specs/components/card.md` (card padding specs)
- `frontend/tailwind.config.ts` (custom spacing)