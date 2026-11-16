# Input Field Component Specification

## Overview
Form input fields with consistent styling, icons, validation states, and dark mode support. Used across auth pages, dashboard, and builder.

## Visual Specification

### Container
- **Structure**: Relative wrapper with icon + input
- **Width**: 100% (w-full)
- **Label**: Block, text-sm, font-medium, text-gray-700 dark:text-gray-300, mb-2

### Input Base Styles
```css
/* Dimensions */
w-full pl-10 pr-4 py-3 (40px height minimum)

/* Typography */
text-base (16px) - prevents zoom on iOS

/* Border */
border border-gray-200 dark:border-gray-600
rounded-xl (12px)

/* Background */
bg-white dark:bg-gray-700

/* Text */
text-gray-900 dark:text-white
placeholder:text-gray-400 dark:placeholder-gray-500

/* Focus */
focus:border-primary-500 focus:outline-none
focus:ring-0 (rely on border color)

/* Transition */
transition (border-color 150ms ease)

/* Disabled */
disabled:bg-gray-100 dark:disabled:bg-gray-800
disabled:cursor-not-allowed
```

### Icon
- **Position**: Absolute, left-3, top-1/2 -translate-y-1/2
- **Size**: 20x20 (w-5 h-5)
- **Color**: text-gray-400
- **Padding**: pl-10 on input for icon space

### Icon Mapping
| Field Type | Icon | Lucide Name |
|------------|------|-------------|
| Email | Mail | Mail |
| Password | Lock | Lock |
| Name | User | User |
| Search | Search | Search |
| URL | Link | Link |

## Variants

### 1. Standard Input (Auth Pages)
```tsx
<div className="relative">
  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
  <input
    type="email"
    className="w-full pl-10 pr-4 py-3 border border-gray-200 dark:border-gray-600 rounded-xl focus:border-primary-500 focus:outline-none transition bg-white dark:bg-gray-700 dark:text-white"
    placeholder="you@example.com"
  />
</div>
```

### 2. Textarea (Prompt Inputs)
```tsx
/* Landing Page - Large */
textarea className="w-full h-32 p-4 pr-16 text-lg border-2 border-gray-200 dark:border-gray-700 rounded-2xl resize-none focus:border-primary-500 focus:outline-none transition bg-white dark:bg-gray-800 dark:text-white dark:placeholder-gray-400"

/* Dashboard - Medium */
textarea className="w-full h-24 p-4 border border-gray-200 dark:border-gray-600 rounded-xl focus:border-primary-500 focus:outline-none resize-none bg-white dark:bg-gray-700 dark:text-white"

/* Builder - Compact */
textarea className="w-full h-24 p-3 border border-gray-200 dark:border-gray-600 rounded-lg focus:border-primary-500 focus:outline-none resize-none bg-white dark:bg-gray-700 dark:text-white"
```

### 3. Quick Suggestion Tags (Landing)
```tsx
<button className="px-4 py-1 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 text-sm transition">
  {tag}
</button>
```

## Validation States

### Error State
```css
/* Input */
border-red-500 focus:border-red-500

/* Error Message */
mt-1 text-sm text-red-600 dark:text-red-400
/* Or inline: */
.p-3 bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-lg text-sm
```

### Success State (Optional)
```css
border-green-500 focus:border-green-500
```

### Character Counter (Password)
```tsx
/* Min length indicator */
minLength={6} // HTML5 validation
```

## Dark Mode Adaptations

| Property | Light | Dark |
|----------|-------|------|
| Background | bg-white | bg-gray-700 (inputs), bg-gray-800 (cards) |
| Border | border-gray-200 | border-gray-600 |
| Text | text-gray-900 | text-white |
| Placeholder | text-gray-400 | text-gray-500 |
| Label | text-gray-700 | text-gray-300 |
| Error BG | bg-red-50 | bg-red-900/30 |
| Error Text | text-red-600 | text-red-400 |

## Accessibility
- **Label**: Explicit `<label>` with `htmlFor` matching input `id`
- **Required**: `required` attribute + aria-required="true"
- **Error**: `aria-invalid="true"` + `aria-describedby` error ID
- **Autocomplete**: Proper autocomplete attributes (email, current-password, new-password, name)
- **Focus**: Visible focus state (border color change)

## Form Layout
- **Spacing**: space-y-6 between fields
- **Alignment**: Labels above inputs (stacked)
- **Width**: max-w-md (480px) for centered forms
- **Card Padding**: p-8 (32px) on auth pages

## Code Reference
- **Files**:
  - `frontend/src/app/login/page.tsx` (lines 88-120)
  - `frontend/src/app/register/page.tsx` (lines 89-139)
  - `frontend/src/app/dashboard/page.tsx` (lines 132-149)
  - `frontend/src/app/builder/[id]/page.tsx` (lines 178-194, 202-232)
  - `frontend/src/app/page.tsx` (lines 180-222)

## Do's and Don'ts
| ✅ Do | ❌ Don't |
|-------|----------|
| Use 16px font size (prevents iOS zoom) | Use smaller text |
| Include proper autocomplete | Leave autocomplete off |
| Show error message near field | Only show toast notification |
| Maintain icon alignment | Let icon drift |
| Test dark mode contrast | Assume light mode colors work |

## Future Enhancements
- Floating label animation
- Password strength meter
- Input masking (phone, currency)
- Auto-complete suggestions
- Clear button (X) for search/email
- Character counter for limited fields