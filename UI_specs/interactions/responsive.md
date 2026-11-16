# Responsive Interaction Specification

## BuildMySite Responsive Behavior

Complete interaction specification for breakpoints, layout adaptations, and touch interactions across all devices.

---

## Breakpoints

```css
/* Tailwind defaults (rem-based) */
sm:  640px   /* Large phones, small tablets */
md:  768px   /* Tablets */
lg:  1024px  /* Laptops, small desktops */
xl:  1280px  /* Desktops */
2xl: 1536px  /* Large desktops */
```

---

## Global Layout Adaptations

### Container Widths
```tsx
// Page wrapper
<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

// Section inner
<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">

// Card grid
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
```

### Spacing Scale by Breakpoint
| Element | Mobile (<640) | Tablet (640-1023) | Desktop (≥1024) |
|---------|---------------|-------------------|-----------------|
| Section padding Y | 4rem (py-16) | 5rem (py-20) | 6rem (py-24) |
| Section padding X | 1rem (px-4) | 1.5rem (px-6) | 2rem (px-8) |
| Grid gap | 1.5rem (gap-6) | 1.5rem (gap-6) | 2rem (gap-8) |
| Text scale | Base | Base | lg (text-lg) |

---

## Page-Specific Responsive Behavior

### Landing Page (`/`)

#### Hero Section
```tsx
// Mobile: Stacked, centered
<div className="text-center px-4">
  <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl">
  <p className="text-lg sm:text-xl mt-4">
  <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
    <textarea className="w-full sm:w-96 h-32" />
    <button className="w-full sm:w-auto" />
  </div>
</div>

// Desktop: Large, side-by-side prompt + stats
```

#### Stats Bar
```tsx
// Mobile: 2x2 grid
<div className="grid grid-cols-2 gap-4">
  <Stat /> <Stat />
  <Stat /> <Stat />
</div>

// Desktop: 4 columns
<div className="grid grid-cols-4 gap-8">
```

#### Features Grid
```tsx
// Mobile: 1 column
// Tablet: 2 columns  
// Desktop: 4 columns
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
```

#### Testimonials
```tsx
// Mobile: Stacked cards
// Desktop: 3-column grid
<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
```

#### CTA Section
```tsx
// Mobile: Stacked buttons
<div className="flex flex-col gap-4">
  <Button size="lg" className="w-full" />
  <Button variant="outline" size="lg" className="w-full" />
</div>

// Desktop: Side-by-side
<div className="flex gap-4">
```

---

### Login/Register Pages (`/login`, `/register`)

```tsx
// All breakpoints: Centered card, max-width
<div className="min-h-screen flex items-center justify-center px-4">
  <div className="w-full max-w-md">
    {/* Card with form */}
  </div>
</div>

// Form inputs: Full width always
<input className="w-full" />

// Buttons: Full width on mobile, auto on desktop
<button className="w-full sm:w-auto" />
```

---

### Dashboard (`/dashboard`)

#### Header
```tsx
// Mobile: Stacked
<div className="flex flex-col gap-4">
  <div>Welcome, {name}</div>
  <div className="flex gap-2">
    <PromptInput />
    <Button>Generate</Button>
  </div>
</div>

// Desktop: Side-by-side
<div className="flex items-center justify-between">
  <div>Welcome, {name}</div>
  <div className="flex gap-4 w-1/2">
    <PromptInput />
    <Button>Generate</Button>
  </div>
</div>
```

#### Websites Grid
```tsx
// Mobile: 1 column
// Tablet: 2 columns
// Desktop: 3 columns
// Large: 4 columns
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
  {websites.map(w => <WebsiteCard />)}
</div>
```

#### Website Card
```tsx
// Mobile: Stacked actions
<div className="flex flex-col gap-2">
  <Button>Edit</Button>
  <Button variant="ghost">Delete</Button>
</div>

// Desktop: Inline actions
<div className="flex gap-2">
  <Button>Edit</Button>
  <Button variant="ghost">Delete</Button>
</div>
```

#### Empty State
```tsx
// Mobile: Full width prompt
<PromptInput className="w-full max-w-xs mx-auto" />

// Desktop: Centered prompt
<PromptInput className="w-full max-w-md mx-auto" />
```

---

### Builder (`/builder/[id]`)

#### Header Toolbar
```tsx
// Mobile: Collapsible, priority items only
<div className="flex items-center justify-between flex-wrap gap-2">
  <BackButton />
  <h2 className="text-lg truncate flex-1 min-w-0" />
  <div className="flex gap-1">
    <PublishButton />  {/* Primary */}
    <DarkModeToggle />
    <MenuButton />     {/* Opens drawer */}
  </div>
</div>

// Tablet: More items visible
// Desktop: All items visible
```

#### Layout Structure
```tsx
// Desktop (≥1024px): Side-by-side
<div className="flex h-[calc(100vh-120px)]">
  {view === 'editor' && <EditorSidebar />}  {/* w-80, fixed */}
  <PreviewArea className="flex-1" />
</div>

// Tablet (768-1023px): Drawer
<div className="relative h-[calc(100vh-120px)]">
  <PreviewArea className="h-full" />
  {showEditor && <EditorDrawer />}  {/* Fixed, slide-in */}
</div>

// Mobile (<768px): Full-screen modes
<div className="h-[calc(100vh-120px)]">
  {view === 'editor' ? <EditorFullScreen /> : <PreviewFullScreen />}
</div>
```

#### Editor Sidebar/Drawer
```tsx
// Sidebar (Desktop)
<div className="w-80 border-r h-full overflow-y-auto">

// Drawer (Tablet)
<div className="fixed inset-y-0 right-0 w-80 z-50 
                transform transition-transform duration-300
                bg-white dark:bg-gray-800 shadow-xl">
  {/* Swipe to close on touch */}
</div>

// Full-screen (Mobile)
<div className="h-full overflow-y-auto">
```

#### Preview Container
```tsx
// All breakpoints: Fluid height
<div className="h-[calc(100vh-200px)] min-h-[400px]">

// WebsiteRenderer: Responsive internally
<WebsiteRenderer data={websiteJson} />
```

---

### WebsiteRenderer (Preview Content)

#### Section Stacking
```tsx
// All sections: Full width, stacked vertically
// Content constrained by max-w-7xl mx-auto

// Navbar: Responsive collapse (future)
<nav className="flex items-center justify-between px-4 py-3">
  <Logo />
  <DesktopNav className="hidden md:flex" />
  <MobileMenuButton className="md:hidden" />
</nav>

// Hero: Responsive typography
<h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold">

// Grid sections (Features, Services, Gallery):
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

// Testimonials:
<div className="grid grid-cols-1 md:grid-cols-3 gap-6">

// Footer: Stacked on mobile, grid on desktop
<div className="grid grid-cols-1 md:grid-cols-4 gap-8">
```

---

## Touch Interactions

### Touch Targets
```css
/* Minimum 44x44px for all interactive elements */
button, a, input, select, textarea {
  min-height: 44px;
  min-width: 44px;
}

/* Exceptions: Dense toolbars */
.toolbar button { min-height: 40px; min-width: 40px; }
```

### Swipe Gestures

#### Builder Editor Drawer (Tablet)
```typescript
// Touch events for drawer
const handleTouchStart = (e) => { startX = e.touches[0].clientX; };
const handleTouchMove = (e) => { 
  const delta = e.touches[0].clientX - startX;
  if (delta < -50) closeDrawer();  // Swipe left to close
};
const handleTouchEnd = () => { startX = null; };

<div onTouchStart={handleTouchStart} 
     onTouchMove={handleTouchMove} 
     onTouchEnd={handleTouchEnd}>
```

#### Carousel/Swipeable Content (Future)
```typescript
// Gallery swipe
// Testimonials swipe
```

### Hover States (Desktop Only)
```tsx
// Buttons
hover:bg-primary-700
hover:shadow-lg
hover:scale-105

// Cards
hover:shadow-xl
hover:-translate-y-1

// Links
hover:text-primary-600
hover:underline

// Disable on touch
@media (hover: none) {
  .hover\:bg-primary-700:hover { background: unchanged; }
}
```

### Focus States (All Devices)
```tsx
// Visible on keyboard focus, hidden on mouse/touch focus
focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2
// Dark mode
dark:focus-visible:ring-offset-gray-900
```

---

## Navigation Patterns

### Mobile Navigation (Future)
```tsx
// Hamburger menu → Slide-out drawer
// Current: Not implemented (single-page scroll)
```

### Builder Navigation
```tsx
// Desktop: Persistent sidebar
// Tablet: Slide-over drawer (swipe/tap)
// Mobile: Full-screen mode toggle
```

---

## Image Handling

### Responsive Images
```tsx
// Unsplash (auto w/ params)
`https://images.unsplash.com/...?w=${width}&h=${height}&fit=crop`

// Width by breakpoint
const widths = { mobile: 400, tablet: 800, desktop: 1200 };

// srcSet for art direction
<img 
  srcSet={`
    ${url}?w=400 400w,
    ${url}?w=800 800w,
    ${url}?w=1200 1200w
  `}
  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
/>
```

### Balen Flag
```tsx
// Both versions responsive
<img 
  src={darkMode ? svgUrl : pngUrl} 
  alt="Balen City" 
  className="h-8 w-auto"
/>
```

---

## Typography Scale

### Fluid Typography (CSS Clamp - Future)
```css
/* Current: Breakpoint-based */
/* Future: Fluid */
h1 { font-size: clamp(2rem, 5vw, 4rem); }
h2 { font-size: clamp(1.5rem, 4vw, 3rem); }
p  { font-size: clamp(1rem, 2vw, 1.125rem); }
```

### Current Breakpoint Scale
| Element | Mobile | Tablet | Desktop |
|---------|--------|--------|---------|
| Hero H1 | 30px (text-3xl) | 36px (text-4xl) | 48px (text-5xl) |
| Section H2 | 24px (text-2xl) | 30px (text-3xl) | 36px (text-4xl) |
| Body | 16px (base) | 16px (base) | 18px (text-lg) |
| Small | 14px (sm) | 14px (sm) | 14px (sm) |

---

## Form Adaptations

### Input Sizing
```tsx
// Mobile: Full width, larger touch targets
<input className="w-full px-4 py-3 text-base" />

// Desktop: Same, but can be inline
<div className="flex gap-4">
  <input className="flex-1" />
  <input className="flex-1" />
</div>
```

### Textarea
```tsx
// Landing prompt: Taller on desktop
<textarea className="h-32 md:h-40 lg:h-48" />

// Builder edit: Fixed height
<textarea className="h-24" />
```

---

## Modal/Dialog Behavior

### Current: Native alert/confirm
```typescript
alert("Message");
confirm("Are you sure?");
```

### Future: Responsive Dialogs
```tsx
// Mobile: Full-screen bottom sheet
// Tablet: Centered, max-w-md
// Desktop: Centered, max-w-lg
<Dialog className="max-w-md sm:max-w-lg">
```

---

## Performance by Device

### Mobile Optimizations
- Lazy load images below fold
- Reduce animation complexity
- Defer non-critical JS
- Smaller image sizes via srcSet

### Desktop Enhancements
- Hover animations
- Larger images
- Multi-column layouts
- Parallel loading

---

## Testing Checklist

### Device Testing Matrix
| Feature | iPhone SE (375px) | iPhone 14 (390px) | iPad (768px) | iPad Pro (1024px) | Desktop (1440px) |
|---------|-------------------|-------------------|--------------|-------------------|------------------|
| Landing hero | ✓ | ✓ | ✓ | ✓ | ✓ |
| Prompt input | ✓ | ✓ | ✓ | ✓ | ✓ |
| Stats grid | ✓ | ✓ | ✓ | ✓ | ✓ |
| Features grid | ✓ | ✓ | ✓ | ✓ | ✓ |
| Testimonials | ✓ | ✓ | ✓ | ✓ | ✓ |
| Login/Register | ✓ | ✓ | ✓ | ✓ | ✓ |
| Dashboard grid | ✓ | ✓ | ✓ | ✓ | ✓ |
| Builder layout | N/A | N/A | Drawer | Split | Split |
| Preview render | ✓ | ✓ | ✓ | ✓ | ✓ |
| Touch targets | ✓ | ✓ | ✓ | ✓ | N/A |
| Keyboard nav | N/A | N/A | ✓ | ✓ | ✓ |

### Browser Testing
- [ ] Chrome Mobile
- [ ] Safari iOS
- [ ] Firefox Mobile
- [ ] Chrome Desktop
- [ ] Firefox Desktop
- [ ] Safari Desktop
- [ ] Edge Desktop

---

## Future Responsive Features

1. **Container Queries** - Component-level responsiveness
2. **Fluid Typography** - `clamp()` for smooth scaling
3. **Responsive Images** - `srcSet` + `sizes` everywhere
4. **Mobile Navigation** - Hamburger + drawer
5. **Touch Gestures** - Swipe navigation, pull-to-refresh
6. **PWA** - Install prompt, offline support
7. **Reduced Motion** - `prefers-reduced-motion` support
8. **High Contrast** - `prefers-contrast` support

---

## Related Files
- `frontend/tailwind.config.ts`
- `frontend/src/app/globals.css`
- `frontend/src/app/page.tsx`
- `frontend/src/app/login/page.tsx`
- `frontend/src/app/register/page.tsx`
- `frontend/src/app/dashboard/page.tsx`
- `frontend/src/app/builder/[id]/page.tsx`
- `frontend/src/components/WebsiteRenderer.tsx`
- `UI_specs/design-system/spacing.md`
- `UI_specs/design-system/transitions.md`