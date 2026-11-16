# Dark Mode Interaction Specification

## BuildMySite Dark Mode System

Complete interaction specification for theme switching, persistence, and cross-component coordination.

---

## Overview

Dark mode is a global UI state managed by `ThemeProvider` context, persisted to localStorage, with system preference detection.

---

## State Management

### ThemeProvider (`ThemeProvider.tsx`)
```typescript
interface ThemeContextType {
  darkMode: boolean;
  toggleDarkMode: () => void;
}
```

**State**: `darkMode: boolean`
**Actions**: `toggleDarkMode()`
**Persistence**: localStorage key `"darkMode"`
**System Detection**: `prefers-color-scheme: dark`

### Initialization Flow
```
App Mount
    │
    ├─► Check localStorage.getItem("darkMode")
    │       ├─ Yes → Parse JSON → Set state
    │       └─ No  → Check window.matchMedia("(prefers-color-scheme: dark)")
    │                     ├─ Matches → Set darkMode = true
    │                     └─ No match → Set darkMode = false
    │
    └─► Effect: Apply .dark class to <html>
            └─► Save to localStorage on change
```

---

## DarkModeToggle Component (`DarkModeToggle.tsx`)

### Visual States
| State | Light Mode | Dark Mode |
|-------|------------|-----------|
| **Default** | Moon icon, gray-600 | Sun icon, gray-300 |
| **Hover** | Moon, gray-600 + bg-gray-100 | Sun, gray-300 + bg-gray-800 |
| **Focus** | Ring-2 primary-500 | Ring-2 primary-500 |
| **Transition** | 150ms ease-out | 150ms ease-out |

### Interaction
```tsx
<button
  onClick={toggleDarkMode}
  className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition"
  aria-label="Toggle dark mode"
>
  {darkMode ? <Sun /> : <Moon />}
</button>
```

### Keyboard Support
- **Tab**: Focusable
- **Enter/Space**: Toggle
- **Focus visible**: Ring indicator

---

## CSS Application

### Root Class Toggle
```typescript
useEffect(() => {
  if (darkMode) {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }
  localStorage.setItem("darkMode", JSON.stringify(darkMode));
}, [darkMode]);
```

### Tailwind Dark Variants
All components use `dark:` prefix:
```tsx
<div className="bg-white dark:bg-gray-800">
  <p className="text-gray-900 dark:text-white">Content</p>
</div>
```

### CSS Variables (Dynamic Themes)
```typescript
// WebsiteRenderer applies AI-generated colors
useEffect(() => {
  const root = document.documentElement;
  root.style.setProperty('--primary', primaryColor);
  root.style.setProperty('--secondary', secondaryColor);
  root.style.setProperty('--accent', accentColor);
}, [primaryColor, secondaryColor, accentColor]);
```

---

## Component Coordination

### Pages Using Dark Mode
All pages consume via `useTheme()`:
- `page.tsx` (Landing)
- `login/page.tsx`
- `register/page.tsx`
- `dashboard/page.tsx`
- `builder/[id]/page.tsx`

### Components Adapting
| Component | Light | Dark |
|-----------|-------|------|
| **Header/Navbar** | bg-white/80, border-gray-200 | bg-gray-900/80, border-gray-700 |
| **Cards** | bg-white, shadow-sm | bg-gray-700/800, shadow-sm |
| **Buttons (Primary)** | bg-primary-600 | bg-primary-600 (same) |
| **Buttons (Ghost)** | text-gray-600 | text-gray-300 |
| **Inputs** | bg-white, border-gray-200 | bg-gray-700, border-gray-600 |
| **Text** | text-gray-900/600 | text-white/300 |
| **Borders** | border-gray-200 | border-gray-700 |
| **Balen Banner** | PNG flag | SVG flag |
| **Preview Container** | bg-gray-200 | bg-gray-700 |

---

## Image Handling

### Balen City Flag
```tsx
<img
  src={
    darkMode 
      ? "https://images.mykhel.com/webp/common_dynamic/images/olympics/country_flag/NEP.svg"
      : "https://static.vecteezy.com/.../nepal-flag.png"
  }
  alt="Balen City"
/>
```
- **Light**: PNG with transparency
- **Dark**: SVG (scales better, cleaner on dark)

### AI-Generated Images
Unsplash URLs work in both modes (photographs). No special handling needed.

### Logo
```tsx
<Sparkles className="w-8 h-8 text-primary-600" />
```
Brand icon stays primary-600 in both modes for consistency.

---

## Persistence & Sync

### localStorage Schema
```json
{
  "darkMode": true
}
```

### Cross-Tab Sync
```typescript
// Optional: Listen for storage events
window.addEventListener('storage', (e) => {
  if (e.key === 'darkMode') {
    setDarkMode(JSON.parse(e.newValue));
  }
});
```

### Server-Side Rendering (Next.js)
```typescript
// Prevent hydration mismatch
const [mounted, setMounted] = useState(false);
useEffect(() => setMounted(true), []);
```
**Current**: Client-side only (`"use client"`), no SSR mismatch handling.

---

## System Preference Changes

### Dynamic Response
```typescript
// Optional: Listen for system preference changes
const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
mediaQuery.addEventListener('change', (e) => {
  if (!localStorage.getItem('darkMode')) {
    setDarkMode(e.matches);
  }
});
```

**Current**: Not implemented - only checks on initial load.

---

## Transition Animation

```css
/* Smooth theme transition */
* {
  transition: background-color var(--duration-normal) var(--ease-out),
              color var(--duration-normal) var(--ease-out),
              border-color var(--duration-normal) var(--ease-out);
}
```

**Current**: Individual component transitions, no global transition.

---

## Accessibility

### Color Contrast
| Element | Light Mode | Dark Mode | WCAG |
|---------|------------|-----------|------|
| Primary text on bg | 15.3:1 | 15.3:1 | AAA ✓ |
| Secondary text on bg | 7.3:1 | 7.3:1 | AAA ✓ |
| Muted text on bg | 4.5:1 | 4.5:1 | AA ✓ |
| Primary button | 4.5:1 | 4.5:1 | AA ✓ |
| Input borders | 3:1 | 3:1 | AA Large ✓ |

### Focus Indicators
```tsx
// All interactive elements
focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2
// Dark mode offset
dark:focus:ring-offset-gray-900
```

### Screen Readers
```tsx
<button aria-label="Toggle dark mode">
  {darkMode ? <Sun /> : <Moon />}
</button>
```

---

## Testing Checklist

### Manual Tests
- [ ] Toggle switches theme immediately
- [ ] Preference persists after refresh
- [ ] Preference persists across browser sessions
- [ ] System preference detected on first visit (no localStorage)
- [ ] All pages update correctly
- [ ] All components update correctly
- [ ] Images swap correctly (Balen flag)
- [ ] No flash of wrong theme on load
- [ ] Focus indicators visible in both modes
- [ ] Contrast meets WCAG AA minimum

### Automated Tests
- [ ] ThemeProvider initializes correctly
- [ ] Toggle updates state
- [ ] localStorage read/write works
- [ ] System preference detection works
- [ ] .dark class applied to html

---

## Future Enhancements

1. **Auto-switch at sunset** - Geolocation + time-based
2. **Per-page preference** - Override global for specific pages
3. **Theme customization** - User-selectable accent colors
4. **High contrast mode** - Accessibility variant
5. **SSR support** - Prevent flash with next-themes
6. **Cross-tab sync** - BroadcastChannel API

---

## Related Files
- `frontend/src/components/ThemeProvider.tsx`
- `frontend/src/components/DarkModeToggle.tsx`
- `frontend/src/app/globals.css`
- `frontend/tailwind.config.ts`
- `UI_specs/design-system/colors.md`
- `UI_specs/design-system/transitions.md`