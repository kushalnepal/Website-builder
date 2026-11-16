# UI SPECIFICATIONS - Design System & Components

## BuildMySite - Complete UI Design Documentation

This folder contains detailed specifications for every UI component, page, and interaction pattern to preserve design consistency.

---

## 📁 FOLDER STRUCTURE

```
UI_specs/
├── components/           # Individual component specs
│   ├── header.md
│   ├── dark-mode-toggle.md
│   ├── button.md
│   ├── input-field.md
│   ├── card.md
│   ├── badge.md
│   ├── website-card.md
│   ├── prompt-input.md
│   └── website-renderer.md
├── pages/               # Page-level specifications
│   ├── landing-page.md
│   ├── login-page.md
│   ├── register-page.md
│   ├── dashboard-page.md
│   └── builder-page.md
├── design-system/       # Design tokens & guidelines
│   ├── colors.md
│   ├── typography.md
│   ├── spacing.md
│   ├── shadows.md
│   ├── border-radius.md
│   ├── transitions.md
│   └── icons.md
├── interactions/        # Interaction patterns
│   ├── dark-mode.md
│   ├── auth-flow.md
│   ├── ai-generation.md
│   ├── editor-interactions.md
│   └── responsive.md
└── README.md            # This file
```

---

## 🎨 DESIGN TOKENS QUICK REFERENCE

### Colors
```css
/* Primary Brand */
--primary: #3b82f6 (Blue-600)
--primary-hover: #2563eb (Blue-700)
--primary-light: #dbeafe (Blue-100)

/* Semantic */
--success: #10b981 (Emerald-500)
--warning: #f59e0b (Amber-500)
--error: #ef4444 (Red-500)
--info: #3b82f6 (Blue-500)

/* Neutral Light */
--bg-primary: #ffffff
--bg-secondary: #f9fafb (Gray-50)
--bg-tertiary: #f3f4f6 (Gray-100)
--text-primary: #111827 (Gray-900)
--text-secondary: #4b5563 (Gray-600)
--text-muted: #9ca3af (Gray-400)
--border-light: #e5e7eb (Gray-200)

/* Neutral Dark */
--bg-primary-dark: #111827 (Gray-900)
--bg-secondary-dark: #1f2937 (Gray-800)
--bg-tertiary-dark: #374151 (Gray-700)
--text-primary-dark: #f9fafb (Gray-50)
--text-secondary-dark: #d1d5db (Gray-300)
--text-muted-dark: #9ca3af (Gray-400)
--border-dark: #374151 (Gray-700)
```

### Typography
```css
/* Font Family */
--font-sans: 'Inter', system-ui, sans-serif;

/* Scale */
--text-xs: 0.75rem (12px)
--text-sm: 0.875rem (14px)
--text-base: 1rem (16px)
--text-lg: 1.125rem (18px)
--text-xl: 1.25rem (20px)
--text-2xl: 1.5rem (24px)
--text-3xl: 1.875rem (30px)
--text-4xl: 2.25rem (36px)
--text-5xl: 3rem (48px)
--text-6xl: 3.75rem (60px)

/* Weights */
--font-normal: 400
--font-medium: 500
--font-semibold: 600
--font-bold: 700
```

### Spacing (4px base)
```css
--space-1: 0.25rem (4px)
--space-2: 0.5rem (8px)
--space-3: 0.75rem (12px)
--space-4: 1rem (16px)
--space-5: 1.25rem (20px)
--space-6: 1.5rem (24px)
--space-8: 2rem (32px)
--space-10: 2.5rem (40px)
--space-12: 3rem (48px)
--space-16: 4rem (64px)
--space-20: 5rem (80px)
```

### Border Radius
```css
--radius-sm: 0.375rem (6px)
--radius-md: 0.5rem (8px)
--radius-lg: 0.75rem (12px)
--radius-xl: 1rem (16px)
--radius-2xl: 1.5rem (24px)
--radius-full: 9999px
```

### Shadows
```css
--shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05)
--shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1)
--shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1)
--shadow-xl: 0 20px 25px -5px rgb(0 0 0 / 0.1)
```

### Transitions
```css
--transition-fast: 150ms ease
--transition-normal: 200ms ease
--transition-slow: 300ms ease
```

---

## 📋 COMPONENT INDEX

| Component | File | Used In |
|-----------|------|---------|
| Header/Nav | `components/header.md` | All pages |
| DarkModeToggle | `components/dark-mode-toggle.md` | All pages |
| Button (Primary/Secondary/Ghost) | `components/button.md` | All pages |
| Input Field | `components/input-field.md` | Auth, Builder, Dashboard |
| Card (Base/Website/Feature/Template) | `components/card.md` | Dashboard, Landing |
| Badge (Status) | `components/badge.md` | Dashboard, Builder |
| Website Card | `components/website-card.md` | Dashboard |
| Prompt Input | `components/prompt-input.md` | Landing, Dashboard, Builder |
| WebsiteRenderer | `components/website-renderer.md` | Builder Preview, Public |

---

## 📄 PAGE INDEX

| Page | File | Route |
|------|------|-------|
| Landing | `pages/landing-page.md` | `/` |
| Login | `pages/login-page.md` | `/login` |
| Register | `pages/register-page.md` | `/register` |
| Dashboard | `pages/dashboard-page.md` | `/dashboard` |
| Builder | `pages/builder-page.md` | `/builder/[id]` |

---

## 🔧 USAGE GUIDELINES

### For Developers
1. **Always reference** these specs before modifying UI
2. **Use design tokens** - never hardcode colors/spacing
3. **Follow interaction patterns** - consistency over creativity
4. **Test dark mode** - every component must work in both themes

### For Designers
1. **Update specs first** - then implement
2. **Document rationale** - why this color/spacing/interaction
3. **Consider accessibility** - contrast, focus states, ARIA
4. **Mobile-first** - design for 375px, scale up

### For AI Assistants
1. **Read relevant spec** before making changes
2. **Preserve existing patterns** - don't reinvent
3. **Flag inconsistencies** - if code deviates from spec
4. **Update specs** when intentionally changing design

---

## 🎯 KEY DESIGN PRINCIPLES

1. **Consistency** - Same component behaves identically everywhere
2. **Clarity** - Clear visual hierarchy, obvious actions
3. **Accessibility** - WCAG AA minimum, keyboard navigable
4. **Performance** - Minimal re-renders, optimized images
5. **Delight** - Subtle animations, smooth transitions
6. **Nepal Identity** - Balen City branding, Nepal flag, local context

---

## 📝 CHANGE LOG

| Date | Component | Change | Reason |
|------|-----------|--------|--------|
| 2024 | All | Initial specs created | Documentation baseline |

---

*Last Updated: 2024 | Version: 1.0.0 | Maintained by: BuildMySite Team*