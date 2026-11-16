# Landing Page Specification

## Route
`/`

## File
`frontend/src/app/page.tsx` (339 lines)

## Purpose
Public marketing page that introduces BuildMySite, demonstrates AI generation, and converts visitors to registered users.

## Layout Structure
```
1. Fixed Header (z-50)
2. Balen City Banner (pt-16)
3. Hero Section (pt-32 pb-20)
4. Features Section (py-20, gray bg)
5. Templates Section (py-20)
6. CTA Section (py-20, primary bg)
7. Footer (py-12, gray-900)
```

## Detailed Sections

### 1. Fixed Header
**Spec**: See `components/header.md` - Public variant
- Logo + Nav (Features, Templates, Pricing) + DarkModeToggle + [Login | Get Started]
- Background: `bg-white/80 dark:bg-gray-900/80 backdrop-blur-md`
- Border: `border-b border-gray-200 dark:border-gray-700`

### 2. Balen City Banner
```tsx
<div className="pt-16 text-center">
  <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Powered by </span>
  <img src={flagUrl} alt="Balen City" className="h-6 w-auto inline mx-1" />
  <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Balen City</span>
</div>
```
- **Flag**: Dynamic based on dark mode (SVG vs PNG)
- **Size**: h-6 (24px)
- **Position**: Below fixed header (pt-16 = 64px)

### 3. Hero Section
**Container**: `pt-32 pb-20 px-4`, `max-w-4xl mx-auto text-center`

**Headline**:
```tsx
<h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6 animate-fade-in">
  Create Beautiful Websites
  <span className="text-primary-600"> with AI</span>
</h1>
```
- **Size**: text-4xl → text-6xl (responsive)
- **Highlight**: Primary color on "with AI"
- **Animation**: animate-fade-in (custom)

**Subheadline**:
```tsx
<p className="text-xl text-gray-600 dark:text-gray-300 mb-10 max-w-2xl mx-auto">
  Describe your business, and our AI will generate a stunning website in seconds. No coding required - just tell us what you need.
</p>
```

**Prompt Input**: See `components/prompt-input.md` - Landing variant
- **Height**: h-32 (128px)
- **Placeholder**: Nepal-specific example
- **Button**: Absolute bottom-right

**Quick Suggestions**:
```tsx
const suggestions = [
  "Restaurant in Kathmandu",
  "Trekking agency",
  "E-commerce shop",
  "Portfolio"
];
```
- **Style**: Rounded-full tags, gray background, click to fill prompt

### 4. Features Section
**Container**: `py-20 bg-gray-50 dark:bg-gray-800`, `max-w-7xl mx-auto px-4`

**Heading**:
```tsx
<h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
  Why Choose BuildMySite?
</h2>
```

**Grid**: 5 columns (md:grid-cols-5), gap-8

**Feature Cards**: See `components/card.md` - Feature variant
```tsx
const features = [
  { icon: Sparkles, title: "AI-Powered", desc: "Describe your business and let AI build your website instantly" },
  { icon: Zap, title: "Fast & Easy", desc: "Get a complete website in seconds, not hours" },
  { icon: Palette, title: "Beautiful Designs", desc: "Modern, responsive designs that look great on all devices" },
  { icon: Globe, title: "Publish Online", desc: "Share your website with the world instantly" },
  { icon: Shield, title: "Secure & Reliable", desc: "Your data is safe with enterprise-grade security" },
];
```
- **Icons**: 40x40, text-primary-600
- **Hover**: shadow-sm → shadow-md

### 5. Templates Section
**Container**: `py-20`, `max-w-7xl mx-auto px-4`

**Heading**:
```tsx
<h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-4">Popular Categories</h2>
<p className="text-center text-gray-600 dark:text-gray-300 mb-12">Start with a template and customize it to your needs</p>
```

**Grid**: 4 columns (md:grid-cols-4), gap-6

**Template Cards**: See `components/card.md` - Template variant
```tsx
const categories = [
  { name: "Restaurant", image: "unsplash/restaurant", count: "120+ templates" },
  { name: "Trekking", image: "unsplash/trekking", count: "80+ templates" },
  { name: "Shop", image: "unsplash/shop", count: "200+ templates" },
  { name: "Portfolio", image: "unsplash/portfolio", count: "150+ templates" },
];
```
- **Image**: h-64 (256px), object-cover, group-hover scale-105
- **Overlay**: Gradient from-black/70
- **Content**: Bottom-left, white text

### 6. CTA Section
**Container**: `py-20 bg-primary-600`, `max-w-4xl mx-auto px-4 text-center`

```tsx
<h2 className="text-3xl font-bold text-white mb-4">Ready to Build Your Website?</h2>
<p className="text-primary-100 mb-8 text-lg">Join thousands of businesses already using BuildMySite</p>
<button className="px-8 py-3 bg-white text-primary-600 rounded-xl font-semibold hover:bg-gray-100 transition">
  Get Started for Free
</button>
```
- **Button**: White background, primary text, hover gray-100
- **Action**: Router push to /dashboard (if authed) or /register

### 7. Footer
**Container**: `py-12 bg-gray-900 text-gray-400`, `max-w-7xl mx-auto px-4`

**Left**: Balen City link + flag + "Balen City" text (red-500, bold)
**Right**: Privacy | Terms | Contact links (hover:text-white)
**Bottom**: Copyright notice

## Authentication Flow
```tsx
const { user } = useAuth();
const router = useRouter();

const handleGenerate = async () => {
  if (!prompt.trim()) return;
  if (!user) {
    router.push("/login");  // Redirect to login
    return;
  }
  // ... generate website
};
```
- **Unauthenticated**: Generate → Redirect to /login
- **Authenticated**: Generate → Redirect to /builder/[id]

## Dark Mode
- All sections use `dark:` variants
- Flag image switches (SVG for dark, PNG for light)
- Gradients adapt (gray-50 → gray-800)

## Responsive Breakpoints
| Element | Mobile (<640px) | Tablet (640-1024px) | Desktop (>1024px) |
|---------|-----------------|---------------------|-------------------|
| Hero h1 | text-4xl | text-5xl | text-6xl |
| Features | 1 col | 2-3 col | 5 col |
| Templates | 1 col | 2 col | 4 col |
| Header nav | Hidden | Visible | Visible |

## Animations
- **Hero Title**: animate-fade-in (custom keyframes)
- **Template Images**: group-hover scale-105 duration-300
- **Feature Cards**: hover:shadow-md transition
- **Buttons**: hover:bg transition (150ms)

## SEO Meta (layout.tsx)
```typescript
export const metadata: Metadata = {
  title: "BuildMySite - AI Website Generator",
  description: "Create beautiful websites with AI. Just describe your business and let AI build it for you.",
};
```

## Code Reference
- **File**: `frontend/src/app/page.tsx` (lines 1-339)
- **Components Used**: AuthProvider, ThemeProvider, DarkModeToggle, websitesAPI
- **Icons**: ArrowRight, Globe, Palette, Shield, Sparkles, Zap (lucide-react)

## Do's and Don'ts
| ✅ Do | ❌ Don't |
|-------|----------|
| Keep hero focused on single action | Clutter with multiple CTAs |
| Use Nepal-specific examples | Generic "business" examples |
| Show value immediately | Hide features below fold |
| Optimize images (Unsplash w=400) | Use full-size images |
| Test auth redirect flow | Assume user is logged in |

## Future Enhancements
- Video background in hero
- Interactive demo (live preview)
- Pricing table section
- Customer logos/testimonials
- FAQ accordion
- Blog preview
- Newsletter signup