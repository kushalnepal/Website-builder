# Button Component Specification

## Overview
Reusable button system with consistent styling across all variants. Built with Tailwind CSS, no separate component file (inline styles).

## Variants

### 1. Primary Button
**Use**: Main CTAs (Generate, Sign In, Create Account, Publish, Apply Changes)

```css
/* Base */
px-6 py-3 (lg: px-8 py-3) 
bg-primary-600 text-white 
rounded-xl font-medium

/* Hover */
hover:bg-primary-700

/* Disabled */
disabled:opacity-50 disabled:cursor-not-allowed

/* Transition */
transition (all 150ms ease)

/* Focus */
focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2
```

**Icon Support**: Flex items-center gap-2 (ArrowRight, Plus, Sparkles, Globe)

### 2. Secondary Button
**Use**: Alternative actions (View Menu, Book Table, Learn More)

```css
/* Base */
px-6 py-3 
bg-white text-gray-900 
rounded-lg font-medium border border-gray-300

/* Hover */
hover:bg-gray-50

/* Dark Mode */
dark:bg-gray-700 dark:text-white dark:border-gray-600 dark:hover:bg-gray-600
```

### 3. Ghost Button
**Use**: Subtle actions (Login link, navigation)

```css
/* Base */
text-gray-600 dark:text-gray-300

/* Hover */
hover:text-gray-900 dark:hover:text-white

/* With Padding */
px-4 py-2 (when standalone)
```

### 4. Icon Button
**Use**: Toolbar actions (Edit, Preview, Logout, DarkModeToggle)

```css
/* Base */
p-2 rounded-lg

/* Hover */
hover:bg-gray-100 dark:hover:bg-gray-800

/* Icon Size */
w-5 h-5 (20px)
```

### 5. Destructive Button
**Use**: Delete actions

```css
/* Base */
p-2 text-gray-400

/* Hover */
hover:text-red-600 dark:hover:text-red-400

/* Confirmation */
Always paired with confirm() dialog
```

### 6. Link Button
**Use**: Footer links, auth page switches

```css
/* Base */
text-primary-600 dark:text-primary-400 font-medium

/* Hover */
hover:text-primary-700 dark:hover:text-primary-300

/* Underline */
Optional: underline-offset-2 hover:underline
```

## Size Modifiers

| Size | Padding | Font Size | Use Case |
|------|---------|-----------|----------|
| Small | px-3 py-1.5 | text-sm | Badge actions, compact UIs |
| Default | px-4 py-2 | text-base | Standard forms, cards |
| Large | px-6 py-3 | text-lg | Hero CTAs, primary actions |
| XL | px-8 py-4 | text-xl | Landing page hero |

## States

| State | Visual |
|-------|--------|
| Default | Base styles |
| Hover | Color shift + subtle shadow |
| Active/Pressed | Scale 0.98 (optional) |
| Focus | Ring 2px primary-500 |
| Disabled | Opacity 50, no hover, cursor not-allowed |
| Loading | Spinner icon + "Loading..." text |

## Loading State Pattern
```tsx
{loading ? (
  <> 
    <Sparkles className="w-5 h-5 animate-spin" /> 
    Generating...
  </>
) : (
  <> Generate <ArrowRight className="w-5 h-5" /> </>
)}
```

## Icon Placement
- **Leading**: Icon before text (Plus, Sparkles)
- **Trailing**: Icon after text (ArrowRight, Globe)
- **Only**: Icon only (toolbar buttons)

## Accessibility
- **Type**: button (not anchor unless navigating)
- **ARIA**: aria-label for icon-only buttons
- **Disabled**: aria-disabled="true"
- **Focus**: Visible focus indicator
- **Keyboard**: Enter/Space activation

## Responsive
- **Mobile**: Full width on small screens (w-full sm:w-auto)
- **Touch**: Minimum 44x44px hit area
- **Text**: Responsive font sizes (text-base sm:text-lg)

## Color Tokens
```css
/* Primary */
--btn-primary-bg: #3b82f6 (Blue-600)
--btn-primary-hover: #2563eb (Blue-700)
--btn-primary-text: #ffffff

/* Secondary */
--btn-secondary-bg: #ffffff / #374151 (dark)
--btn-secondary-hover: #f9fafb / #4b5563 (dark)
--btn-secondary-text: #111827 / #f9fafb (dark)
--btn-secondary-border: #d1d5db / #4b5563 (dark)

/* Ghost */
--btn-ghost-text: #4b5563 / #d1d5db (dark)
--btn-ghost-hover: #111827 / #f9fafb (dark)

/* Destructive */
--btn-destructive-hover: #ef4444 / #f87171 (dark)
```

## Code Patterns

### Landing Hero Generate Button
```tsx
<button className="absolute bottom-4 right-4 px-6 py-2 bg-primary-600 text-white rounded-xl font-medium hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition flex items-center gap-2">
  {loading ? <Sparkles className="w-5 h-5 animate-spin" /> : <>Generate <ArrowRight className="w-5 h-5" /></>}
</button>
```

### Dashboard Create Button
```tsx
<button className="flex items-center gap-2 px-6 py-3 bg-primary-600 text-white rounded-xl hover:bg-primary-700 transition">
  <Plus className="w-5 h-5" /> Create New Website
</button>
```

### Toolbar Icon Button
```tsx
<button className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300" title="Edit Website">
  <Edit2 className="w-5 h-5" />
</button>
```

## Do's and Don'ts
| ✅ Do | ❌ Don't |
|-------|----------|
| Use consistent radius (rounded-xl for primary) | Mix radius values |
| Include transition on all | Skip transitions |
| Show loading state for async actions | Leave button unchanged during async |
| Maintain 44px minimum touch target | Make icon buttons too small |
| Use semantic colors (red for delete) | Use primary for destructive actions |

## Future Considerations
- Button group component (connected buttons)
- Split button (primary + dropdown)
- Toggle button (pressed state)
- Progress button (inline progress bar)