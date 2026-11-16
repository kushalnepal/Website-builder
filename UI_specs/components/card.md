# Card Component Specification

## Overview
Versatile card system used for features, templates, websites, and content sections. Multiple variants with consistent base styling.

## Base Card Styles
```css
/* Container */
bg-white dark:bg-gray-700 (or gray-800)
rounded-2xl (16px) / rounded-xl (12px)
shadow-sm (subtle)

/* Hover Elevation */
hover:shadow-md transition (for interactive cards)

/* Padding */
p-6 (24px) - standard
p-4 (16px) - compact
p-8 (32px) - spacious
```

## Variants

### 1. Feature Card (Landing Page)
**Location**: Landing page features grid (5 columns)

```tsx
<div className="bg-white dark:bg-gray-700 p-6 rounded-2xl shadow-sm hover:shadow-md transition">
  <Icon className="w-10 h-10 text-primary-600 mb-4" />
  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">{title}</h3>
  <p className="text-gray-600 dark:text-gray-300 text-sm">{description}</p>
</div>
```

**Specs**:
- Icon: 40x40, primary-600, mb-4
- Title: font-semibold, text-gray-900/dark:text-white, mb-2
- Description: text-sm, text-gray-600/dark:text-gray-300
- Hover: shadow-md
- Grid: 5 columns on desktop, 1 on mobile

### 2. Template Card (Landing Page)
**Location**: Landing page templates grid (4 columns)

```tsx
<div className="group relative overflow-hidden rounded-2xl cursor-pointer">
  <img 
    src={image} 
    className="w-full h-64 object-cover group-hover:scale-105 transition duration-300"
  />
  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
  <div className="absolute bottom-4 left-4 text-white">
    <h3 className="text-xl font-semibold">{name}</h3>
    <p className="text-sm text-gray-300">{count}</p>
  </div>
</div>
```

**Specs**:
- Image: 256px height, object-cover, group-hover scale-105
- Overlay: Gradient from-black/70 to-transparent
- Content: Absolute bottom-left, white text
- Title: text-xl font-semibold
- Count: text-sm text-gray-300
- Border radius: rounded-2xl on container

### 3. Website Card (Dashboard)
**Location**: Dashboard websites grid (3 columns)

```tsx
<div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm overflow-hidden">
  {/* Header - 128px height */}
  <div className="h-32 bg-gradient-to-br from-primary-100 to-primary-200 dark:from-primary-900 dark:to-primary-800 flex items-center justify-center">
    <Layout className="w-12 h-12 text-primary-400" />
  </div>
  
  {/* Content */}
  <div className="p-4">
    <h3 className="font-semibold text-gray-900 dark:text-white mb-1">{name}</h3>
    <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
      Created {date.toLocaleDateString()}
    </p>
    
    {/* Actions Row */}
    <div className="flex items-center justify-between">
      <StatusBadge status={status} />
      <div className="flex gap-2">
        <IconButton icon={Edit} onClick={edit} />
        {status === 'published' && <IconButton icon={Globe} onClick={view} />}
        <IconButton icon={Trash2} onClick={delete} color="red" />
      </div>
    </div>
  </div>
</div>
```

**Specs**:
- Header: h-32 (128px), gradient background, centered icon (48x48)
- Gradient: from-primary-100 to-primary-200 / dark:from-primary-900 dark:to-primary-800
- Icon: Layout (lucide), w-12 h-12, text-primary-400
- Name: font-semibold, mb-1
- Date: text-sm, text-gray-500/dark:text-gray-400, mb-4
- Actions: Flex between status badge and icon buttons
- Status Badge: See `badge.md`

### 4. Empty State Card (Dashboard)
```tsx
<div className="text-center py-12 bg-white dark:bg-gray-800 rounded-2xl">
  <Layout className="w-12 h-12 text-gray-400 mx-auto mb-4" />
  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
    No websites yet
  </h3>
  <p className="text-gray-600 dark:text-gray-300">
    Create your first website to get started
  </p>
</div>
```

### 5. Prompt Card (Dashboard Expandable)
```tsx
<div className="mt-4 bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6">
  <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
    Describe your website
  </h3>
  <textarea ... />
  <button className="mt-4 w-full px-6 py-2 bg-primary-600 text-white rounded-xl hover:bg-primary-700 disabled:opacity-50">
    {generating ? 'Generating...' : 'Generate Website'}
  </button>
</div>
```

### 6. Builder Sidebar Section
```tsx
<div className="space-y-4">
  <div>
    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
      What would you like to change?
    </label>
    <textarea className="w-full h-24 p-3 border border-gray-200 dark:border-gray-600 rounded-lg focus:border-primary-500 focus:outline-none resize-none bg-white dark:bg-gray-700 dark:text-white" />
    <button className="mt-2 w-full py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50 transition">
      Apply Changes
    </button>
  </div>
  
  <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
    <h4 className="font-medium text-gray-900 dark:text-white mb-2">Quick Actions</h4>
    <QuickActionButton>Update Hero Title</QuickActionButton>
    <QuickActionButton>Add Services</QuickActionButton>
    <QuickActionButton>Change Colors</QuickActionButton>
  </div>
</div>
```

### 7. Auth Form Card
```tsx
<div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-8">
  {/* Form with space-y-6 */}
</div>
```

**Specs**:
- Padding: p-8 (32px) - more spacious
- Shadow: shadow-sm
- Radius: rounded-2xl
- Max width: max-w-md (480px)

## Dark Mode Colors

| Variant | Light BG | Dark BG | Light Border | Dark Border |
|---------|----------|---------|--------------|-------------|
| Default | white | gray-700 | - | - |
| Auth Card | white | gray-800 | - | - |
| Template | - | - | - | - |
| Website | white | gray-800 | - | - |
| Empty State | white | gray-800 | - | - |

## Responsive Grid

| Page | Mobile | Tablet | Desktop |
|------|--------|--------|---------|
| Features | 1 col | 2 col | 5 col |
| Templates | 1 col | 2 col | 4 col |
| Websites | 1 col | 2 col | 3 col |

```css
grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6 gap-8
```

## Interactive States

| State | Visual Change |
|-------|---------------|
| Default | Base shadow |
| Hover | shadow-md (interactive cards) |
| Active | Scale 0.98 (optional) |
| Focus | Ring on interactive elements |
| Loading | Opacity 70 + spinner |

## Do's and Don'ts
| ✅ Do | ❌ Don't |
|-------|----------|
| Use consistent radius (2xl for cards) | Mix radius values |
| Maintain hover elevation | Flat cards that don't respond |
| Use semantic shadows | Heavy shadows everywhere |
| Test dark mode backgrounds | Assume white works in dark |
| Keep content hierarchy clear | Cramp content |

## Future Variants
- Pricing card (with price, features, CTA)
- Testimonial card (avatar, quote, rating)
- Blog post card (image, excerpt, date)
- Team member card (photo, role, social)
- Stat card (metric, trend, label)