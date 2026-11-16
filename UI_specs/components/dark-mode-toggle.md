# Dark Mode Toggle Component Specification

## Overview
A compact toggle button to switch between light and dark themes. Persists preference to localStorage and respects system preference on first visit.

## Visual Specification

### Container
- **Size**: 40x40px (p-2 = 8px padding + 24px icon)
- **Shape**: rounded-lg (12px)
- **Background**: Transparent default
- **Hover**: `bg-gray-100 dark:hover:bg-gray-800`
- **Transition**: `transition` (150ms ease)

### Icons
- **Light Mode (Moon)**: 
  - Icon: Moon (lucide-react)
  - Size: 20x20 (w-5 h-5)
  - Color: text-gray-600

- **Dark Mode (Sun)**:
  - Icon: Sun (lucide-react)
  - Size: 20x20 (w-5 h-5)
  - Color: text-gray-600 dark:text-gray-300

### States

| State | Light Mode | Dark Mode |
|-------|------------|-----------|
| Default | Moon, gray-600 | Sun, gray-300 |
| Hover | Moon, gray-600 + bg-gray-100 | Sun, gray-300 + bg-gray-800 |
| Focus | Ring 2px primary-500 | Ring 2px primary-500 |
| Disabled | Opacity 50, no hover | Opacity 50, no hover |

## Behavior

### Toggle Action
1. Click → `toggleDarkMode()` from ThemeContext
2. Context updates `darkMode` state
3. Effect adds/removes `.dark` class on `<html>`
4. Preference saved to localStorage
5. Icon swaps immediately

### Persistence
- **localStorage key**: "darkMode"
- **Value**: "true" | "false" (JSON string)
- **Initial Load**: 
  1. Check localStorage
  2. Fallback to `prefers-color-scheme: dark`
  3. Default to false

### System Preference Detection
```javascript
window.matchMedia("(prefers-color-scheme: dark)").matches
```

## Accessibility
- **ARIA Label**: "Toggle dark mode"
- **Keyboard**: Enter/Space to toggle
- **Focus**: Visible focus ring (via browser default or custom)
- **Screen Reader**: Announces state change

## Placement
- **Landing**: Header right, before auth buttons
- **Auth Pages**: Header right, only element
- **Dashboard**: Header right, before user name
- **Builder**: Header right, in toolbar group

## Code Reference
- **File**: `frontend/src/components/DarkModeToggle.tsx`
- **Context**: `useTheme()` from `ThemeProvider.tsx`
- **Lines**: 1-22

## Integration with ThemeProvider
```typescript
// ThemeProvider sets .dark class on <html>
// Tailwind uses .dark selector for dark: variants
// CSS variables updated in WebsiteRenderer
```

## Do's and Don'ts
| ✅ Do | ❌ Don't |
|-------|----------|
| Use p-2 for touch target | Use smaller hit area |
| Respect system preference | Force light mode |
| Persist to localStorage | Lose preference on refresh |
| Smooth icon swap | Abrupt change without transition |
| Test both themes | Only test light mode |

## Related Components
- `ThemeProvider.tsx` - Context provider
- `globals.css` - Dark mode CSS variables
- All pages - Consume via `useTheme()`

## Future Enhancements
- System preference sync (auto-switch at sunset)
- Theme persistence per-device
- Custom theme colors (beyond light/dark)
- OS-level integration (Chrome theme-color)