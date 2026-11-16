# Icons Design Tokens

## BuildMySite Icon System

Library: **Lucide React** (lucide-react v0.303.0)

---

## Icon Sizing

```css
:root {
  --icon-xs: 12px;      /* 12px - Tiny, inline with xs text */
  --icon-sm: 16px;      /* 16px - Small, inline with sm text */
  --icon-md: 20px;      /* 20px - Standard, inline with base text */
  --icon-lg: 24px;      /* 24px - Large, buttons, headers */
  --icon-xl: 32px;      /* 32px - Feature cards, logos */
  --icon-2xl: 48px;     /* 48px - Hero illustrations, empty states */
  --icon-3xl: 64px;     /* 64px - Major illustrations */
}
```

---

## Size Mapping by Context

| Context | Size | Tailwind | Lucide Prop |
|---------|------|----------|-------------|
| **Inline with caption (xs)** | 12px | `w-3 h-3` | `size={12}` |
| **Inline with body-sm** | 16px | `w-4 h-4` | `size={16}` |
| **Inline with body (default)** | 20px | `w-5 h-5` | `size={20}` |
| **Buttons (icon + text)** | 20px | `w-5 h-5` | `size={20}` |
| **Icon-only buttons** | 20px | `w-5 h-5` | `size={20}` |
| **Toolbar actions** | 20px | `w-5 h-5` | `size={20}` |
| **Form input icons** | 20px | `w-5 h-5` | `size={20}` |
| **Card feature icons** | 40px | `w-10 h-10` | `size={40}` |
| **Empty state illustrations** | 48px | `w-12 h-12` | `size={48}` |
| **Loading spinners** | 20px | `w-5 h-5` | `size={20}` |
| **Logo/brand** | 32px | `w-8 h-8` | `size={32}` |

---

## Icon Categories & Usage

### Navigation & UI
| Icon | Component | Usage |
|------|-----------|-------|
| `ArrowLeft` | Builder header | Back navigation |
| `ArrowRight` | Buttons | Forward action, submit |
| `LogOut` | Headers | User logout |
| `Menu` | Mobile nav | Hamburger menu (future) |
| `X` | Modals, drawers | Close/dismiss |
| `ChevronDown` | Dropdowns | Expand/collapse |
| `ChevronUp` | Dropdowns | Collapse |

### Actions
| Icon | Component | Usage |
|------|-----------|-------|
| `Plus` | Dashboard, Builder | Create new |
| `Edit` / `Edit2` | Website cards, Builder | Edit website |
| `Trash2` | Website cards | Delete website |
| `Globe` | Website cards, Builder | View live / Publish |
| `Eye` | Builder toolbar | Preview mode |
| `Copy` | Share/export | Copy to clipboard |
| `Download` | Export | Download code |
| `Share2` | Share | Share link |
| `RefreshCw` | Retry | Regenerate/refresh |

### Status & Feedback
| Icon | Component | Usage |
|------|-----------|-------|
| `Sparkles` | Logo, loading, AI | Brand, AI generation, loading |
| `CheckCircle` | Success states | Completed, published |
| `AlertCircle` | Error states | Errors, warnings |
| `Info` | Info states | Help, tooltips |
| `AlertTriangle` | Warnings | Destructive confirmations |
| `XCircle` | Failed states | Generation failed |

### Form & Input
| Icon | Component | Usage |
|------|-----------|-------|
| `Mail` | Email inputs | Email field |
| `Lock` | Password inputs | Password field |
| `User` | Name inputs | Name field |
| `Search` | Search inputs | Search field |
| `Link` | URL inputs | Website URL |
| `Eye` / `EyeOff` | Password toggle | Show/hide password |

### Features & Categories
| Icon | Component | Usage |
|------|-----------|-------|
| `Zap` | Landing features | Fast & Easy |
| `Palette` | Landing features | Beautiful Designs |
| `Globe` | Landing features | Publish Online |
| `Shield` | Landing features | Secure & Reliable |
| `Layout` | Dashboard empty | No websites |
| `Globe` | Template cards | Category images (fallback) |

### Social & External
| Icon | Component | Usage |
|------|-----------|-------|
| `Github` | Footer, auth | GitHub link |
| `Twitter` | Footer | Twitter link |
| `Linkedin` | Footer | LinkedIn link |
| `Facebook` | Footer | Facebook link |
| `Instagram` | Footer | Instagram link |
| `ExternalLink` | Outbound links | New tab indicator |

---

## Icon Styling

### Color
```tsx
// Primary actions
<Sparkles className="text-primary-600" />

// Secondary/muted
<ArrowRight className="text-gray-400 hover:text-gray-600" />

// On dark backgrounds
<Globe className="text-white" />

// Status colors
<CheckCircle className="text-green-500" />
<AlertCircle className="text-red-500" />
<Info className="text-blue-500" />

// Input icons (always muted)
<Mail className="text-gray-400" />
<Lock className="text-gray-400" />
```

### Stroke Width
```tsx
// Default (2px stroke)
<IconName />

// Thin (1.5px) - for small sizes
<IconName strokeWidth={1.5} />

// Bold (2.5px) - for emphasis
<IconName strokeWidth={2.5} />
```

### Interactive States
```tsx
// Hover transition
<ButtonIcon className="transition-colors duration-150 
  text-gray-400 hover:text-gray-600 dark:hover:text-gray-300" />

// Active/pressed
<ButtonIcon className="active:scale-95 transition-transform duration-75" />

// Disabled
<ButtonIcon className="text-gray-300 dark:text-gray-600 cursor-not-allowed" />
```

### Loading/Animated
```tsx
// Spinning (generation)
<Sparkles className="animate-spin" />

// Pulse (loading skeleton)
<Icon className="animate-pulse" />

// Bounce (success)
<CheckCircle className="animate-bounce" />
```

---

## Icon Implementation Patterns

### Button with Icon
```tsx
// Trailing icon (most common)
<button className="flex items-center gap-2">
  Generate <ArrowRight className="w-5 h-5" />
</button>

// Leading icon
<button className="flex items-center gap-2">
  <Plus className="w-5 h-5" /> Create New Website
</button>

// Icon only (toolbar)
<button className="p-2" aria-label="Edit website">
  <Edit2 className="w-5 h-5" />
</button>
```

### Input with Icon
```tsx
<div className="relative">
  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
  <input className="pl-10 ..." />
</div>
```

### Status Badge with Icon
```tsx
<span className="inline-flex items-center gap-1 px-2 py-1 text-xs rounded-full bg-green-100 text-green-700">
  <CheckCircle className="w-3 h-3" />
  Published
</span>
```

### Empty State
```tsx
<div className="text-center py-12">
  <Layout className="w-12 h-12 text-gray-400 mx-auto mb-4" />
  <h3 className="text-lg font-semibold">No websites yet</h3>
</div>
```

### Loading State
```tsx
<button disabled className="flex items-center justify-center gap-2">
  <Sparkles className="w-5 h-5 animate-spin" />
  Generating...
</button>
```

---

## Dark Mode Icons

```tsx
// Auto-adapts via text color
<Icon className="text-gray-600 dark:text-gray-300" />

// Explicit dark mode
<Icon className="dark:text-gray-300" />

// Brand icons stay consistent
<Sparkles className="text-primary-600" />  /* Same in both modes */
```

---

## Accessibility

```tsx
// Decorative icons (hidden from screen readers)
<Icon className="w-5 h-5" aria-hidden="true" />

// Semantic icons (need label)
<button aria-label="Edit website">
  <Edit2 className="w-5 h-5" />
</button>

// Status icons (announced)
<span className="sr-only">Published</span>
<CheckCircle className="w-4 h-4 text-green-500" aria-hidden="true" />

// Loading announcement
<div aria-live="polite" aria-busy="true">
  <Sparkles className="animate-spin" aria-hidden="true" />
  <span className="sr-only">Generating website...</span>
</div>
```

---

## Adding New Icons

1. **Check Lucide React** - `lucide-react` package
2. **Import** - `import { IconName } from "lucide-react"`
3. **Follow sizing** - Use appropriate `w-* h-*` classes
4. **Add to this doc** - Update category tables above

---

## Do's and Don'ts

| ✅ Do | ❌ Don't |
|-------|----------|
| Use consistent sizing per context | Mix icon sizes in same component |
| Use `aria-hidden="true"` for decorative | Leave decorative icons accessible |
| Provide `aria-label` for icon-only buttons | Use icon-only buttons without labels |
| Use semantic colors (green=success) | Use primary color for all icons |
| Test at 12px minimum | Use icons smaller than 12px |

---

## Related Files
- `UI_specs/design-system/colors.md` (icon colors)
- `UI_specs/design-system/spacing.md` (icon gaps)
- `UI_specs/components/button.md` (button icons)
- `UI_specs/components/input-field.md` (input icons)
- `UI_specs/components/badge.md` (badge icons)
- `frontend/src/components/DarkModeToggle.tsx` (icon usage)
- `package.json` (lucide-react dependency)