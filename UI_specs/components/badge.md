# Badge / Status Component Specification

## Overview
Small status indicators used for website status (draft/published), subscription status, and category labels. Consistent pill-shaped design with semantic colors.

## Visual Specification

### Base Styles
```css
/* Structure */
px-2 py-1 (8px horizontal, 4px vertical)
text-xs (12px)
rounded-full (9999px)
font-medium (500)

/* Layout */
inline-flex items-center
gap-1 (if with icon)
```

### Status Variants

#### 1. Published (Success/Green)
```css
bg-green-100 text-green-700
dark:bg-green-900/30 dark:text-green-400
```
**Use**: Website published, active subscription, success states

#### 2. Draft (Warning/Yellow)
```css
bg-yellow-100 text-yellow-700
dark:bg-yellow-900/30 dark:text-yellow-400
```
**Use**: Website draft, pending review, trial status

#### 3. Archived/Inactive (Neutral/Gray)
```css
bg-gray-100 text-gray-700
dark:bg-gray-700 dark:text-gray-300
```
**Use**: Archived websites, cancelled subscription, inactive

#### 4. Premium/Pro (Purple)
```css
bg-purple-100 text-purple-700
dark:bg-purple-900/30 dark:text-purple-400
```
**Use**: Premium templates, pro features, paid plans

#### 4. Error/Failed (Red)
```css
bg-red-100 text-red-700
dark:bg-red-900/30 dark:text-red-400
```
**Use**: Failed generation, payment failed, errors

#### 5. Processing/Loading (Blue)
```css
bg-blue-100 text-blue-700
dark:bg-blue-900/30 dark:text-blue-400
```
**Use**: Generating, publishing, pending actions

### Size Variants

| Size | Padding | Font Size | Use Case |
|------|---------|-----------|----------|
| Small | px-2 py-0.5 | text-xs (11px) | Inline with text, table cells |
| Default | px-2 py-1 | text-xs (12px) | Standard status badges |
| Large | px-3 py-1 | text-sm (14px) | Prominent status, hero |

### With Icons
```tsx
<span className="inline-flex items-center gap-1 px-2 py-1 text-xs rounded-full bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">
  <CheckCircle className="w-3 h-3" />
  Published
</span>
```

### Dot Indicator (Alternative)
```tsx
<span className="inline-flex items-center gap-1.5 px-2 py-1 text-xs rounded-full bg-green-100 text-green-700">
  <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
  Published
</span>
```

## Placement Examples

### Website Card (Dashboard)
```tsx
<span className={`px-2 py-1 text-xs rounded-full ${
  status === 'published'
    ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
    : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'
}`}>
  {status}
</span>
```

### Builder Header
```tsx
<span className={`px-2 py-1 text-xs rounded-full ${
  website.status === 'published'
    ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
    : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'
}`}>
  {website.status}
</span>
```

### Template Premium Badge
```tsx
{isPremium && (
  <span className="px-2 py-1 text-xs rounded-full bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400">
    Pro
  </span>
)}
```

### Category Tag (Landing Quick Suggestions)
```tsx
<button className="px-4 py-1 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 text-sm transition">
  {category}
</button>
```

## Dark Mode Strategy
- **Background**: Use `/30` opacity for dark backgrounds (e.g., `bg-green-900/30`)
- **Text**: Use lighter shade (e.g., `text-green-400` instead of `text-green-700`)
- **Contrast**: Maintain WCAG AA minimum (4.5:1 for text)

## Accessibility
- **Color Alone**: Never rely solely on color - always include text label
- **Contrast**: Test both light/dark modes
- **Screen Reader**: Status announced via text content
- **Focus**: Not focusable (decorative), unless interactive

## Animation
- **Entrance**: Fade in + scale (optional)
- **Change**: Cross-fade between states
- **Duration**: 150ms ease

## Code Reference
- **Files**:
  - `frontend/src/app/dashboard/page.tsx` (lines 189-196)
  - `frontend/src/app/builder/[id]/page.tsx` (lines 123-130)

## Do's and Don'ts
| ✅ Do | ❌ Don't |
|-------|----------|
| Use semantic colors | Use primary blue for everything |
| Include text label | Icon-only badges (accessibility) |
| Test dark mode opacity | Solid dark backgrounds |
| Keep text short (1-2 words) | Long sentences in badges |
| Consistent rounding (rounded-full) | Mix radius values |

## Future Variants
- Animated pulse for "live" status
- Count badge (notifications, items)
- Progress badge (percentage ring)
- Removable tag (with X button)