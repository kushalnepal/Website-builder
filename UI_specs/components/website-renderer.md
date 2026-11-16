# WebsiteRenderer Component Specification

## Overview
Core rendering engine that converts AI-generated website JSON into React components. Renders 9 section types with dynamic theming.

## Props Interface
```typescript
interface WebsiteData {
  website_name: string;
  business_type: string;
  tagline: string;
  target_audience: string;
  theme: {
    primary_color: string;
    secondary_color: string;
    accent_color: string;
    font_family: string;
    tone: string;
  };
  seo: { title, description, keywords[] };
  pages: Array<{
    name: string;
    slug: string;
    sections: WebsiteSection[];
  }>;
}

interface WebsiteSection {
  type: 'navbar' | 'hero' | 'about' | 'services' | 'features' | 'gallery' | 'testimonials' | 'contact' | 'footer';
  [key: string]: any;
}
```

## Theme Application
```typescript
// Applied on mount and theme change
useEffect(() => {
  const root = document.documentElement;
  root.style.setProperty('--primary', primaryColor);
  root.style.setProperty('--secondary', secondaryColor);
  root.style.setProperty('--accent', accentColor);
}, [primaryColor, secondaryColor, accentColor]);
```

**CSS Variables**: `--primary`, `--secondary`, `--accent`
**Fallback Colors**: Primary: #3b82f6, Secondary: #1f2937, Accent: #f59e0b

## Section Renderers

### 1. Navbar
```tsx
// Fixed top, z-50, backdrop blur
<nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur shadow-sm">
  <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
    {/* Logo */}
    <span className="text-xl font-bold" style={{color: primaryColor}}>
      {section.logo_text || data.website_name}
    </span>
    
    {/* Menu - Hidden mobile */}
    <div className="hidden md:flex gap-6">
      {section.menu?.map((item, i) => (
        <a key={i} href="#" className="text-gray-600 hover:text-gray-900">{item}</a>
      ))}
    </div>
    
    {/* CTA Button */}
    {section.cta && (
      <a href={section.cta.link} className="px-4 py-2 rounded-lg font-medium text-white" 
         style={{backgroundColor: primaryColor}}>
        {section.cta.text}
      </a>
    )}
  </div>
</nav>
```

**Props**: `logo_text`, `menu[]`, `cta{text, link}`, `style{layout, sticky}`

### 2. Hero
```tsx
<section className="relative h-screen flex items-center justify-center text-center px-4"
  style={{
    backgroundImage: section.background_image ? `url(${section.background_image})` : undefined,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundColor: section.background_image ? undefined : primaryColor,
  }}
>
  {/* Overlay */}
  {(section.background_image && <div className="absolute inset-0 bg-black/50" />) || (
    <div className="absolute inset-0 bg-black/30" />
  )}
  
  <div className="relative z-10 max-w-4xl">
    <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">{section.title}</h1>
    {section.subtitle && <p className="text-xl text-white/90 mb-6">{section.subtitle}</p>}
    {section.description && <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto">{section.description}</p>}
    
    {/* CTAs */}
    <div className="flex gap-4 justify-center">
      {section.cta?.primary && (
        <a href={section.cta.primary.action} className="px-6 py-3 rounded-lg font-medium text-white" 
           style={{backgroundColor: primaryColor}}>
          {section.cta.primary.text}
        </a>
      )}
      {section.cta?.secondary && (
        <a href={section.cta.secondary.action} className="px-6 py-3 rounded-lg font-medium bg-white text-gray-900">
          {section.cta.secondary.text}
        </a>
      )}
    </div>
  </div>
</section>
```

**Props**: `title`, `subtitle`, `description`, `cta{primary,secondary}{text,action}`, `background_image`, `style{layout,height}`

### 3. About
```tsx
<section className="py-20 px-4 bg-white">
  <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-12 items-center">
    {/* Image */}
    <div className="flex-1">
      {section.image && (
        <img src={section.image} alt={section.title} className="rounded-2xl shadow-lg w-full" />
      )}
    </div>
    {/* Content */}
    <div className="flex-1">
      <h2 className="text-3xl font-bold mb-4" style={{color: secondaryColor}}>{section.title}</h2>
      <p className="text-gray-600 leading-relaxed">{section.description}</p>
    </div>
  </div>
</section>
```

**Props**: `title`, `description`, `image`, `style{layout}`

### 4. Services (3-Column Grid)
```tsx
<section className="py-20 px-4 bg-gray-50">
  <div className="max-w-6xl mx-auto">
    <h2 className="text-3xl font-bold text-center mb-12" style={{color: secondaryColor}}>{section.title}</h2>
    <div className="grid md:grid-cols-3 gap-8">
      {section.items?.map((item, i) => (
        <div key={i} className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition">
          <h3 className="text-xl font-semibold mb-2" style={{color: primaryColor}}>{item.name}</h3>
          <p className="text-gray-600">{item.description}</p>
        </div>
      ))}
    </div>
  </div>
</section>
```

**Props**: `title`, `items[{name, description, icon}]`, `style{layout,columns}`

### 5. Features (2-Column with Checkmarks)
```tsx
<section className="py-20 px-4 bg-white">
  <div className="max-w-6xl mx-auto">
    <h2 className="text-3xl font-bold text-center mb-12" style={{color: secondaryColor}}>{section.title}</h2>
    <div className="grid md:grid-cols-2 gap-8">
      {section.items?.map((item, i) => (
        <div key={i} className="flex gap-4">
          <div className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0" 
               style={{backgroundColor: `${primaryColor}20`}}>
            <span className="text-2xl" style={{color: primaryColor}}>✓</span>
          </div>
          <div>
            <h3 className="font-semibold mb-1" style={{color: secondaryColor}}>{item.title}</h3>
            <p className="text-gray-600">{item.description}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>
```

**Props**: `title`, `items[{title, description}]`

### 6. Gallery (3-Column Image Grid)
```tsx
<section className="py-20 px-4 bg-gray-50">
  <div className="max-w-6xl mx-auto">
    <h2 className="text-3xl font-bold text-center mb-12" style={{color: secondaryColor}}>{section.title}</h2>
    <div className="grid md:grid-cols-3 gap-6">
      {section.images?.map((img, i) => (
        <img key={i} src={img} alt={`Gallery ${i+1}`} 
             className="rounded-xl shadow-sm hover:shadow-lg transition w-full h-64 object-cover" />
      ))}
    </div>
  </div>
</section>
```

**Props**: `title`, `images[]`

### 7. Testimonials (4-Column Cards)
```tsx
<section className="py-20 px-4 bg-white">
  <div className="max-w-6xl mx-auto">
    <h2 className="text-3xl font-bold text-center mb-12" style={{color: secondaryColor}}>{section.title}</h2>
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
      {section.items?.map((item, i) => (
        <div key={i} className="bg-gray-50 p-6 rounded-2xl">
          {/* Stars */}
          <div className="flex gap-1 mb-2">
            {Array.from({length: item.rating || 5}).map((_, j) => (
              <span key={j} className="text-yellow-400">★</span>
            ))}
          </div>
          <p className="text-gray-600 mb-4">"{item.feedback}"</p>
          <p className="font-semibold" style={{color: primaryColor}}>{item.name}</p>
        </div>
      ))}
    </div>
  </div>
</section>
```

**Props**: `title`, `items[{name, feedback, rating}]`

### 8. Contact (3-Column Info)
```tsx
<section className="py-20 px-4 bg-gray-900 text-white">
  <div className="max-w-6xl mx-auto">
    <h2 className="text-3xl font-bold text-center mb-12">{section.title}</h2>
    <div className="grid md:grid-cols-3 gap-8 text-center">
      {section.email && (
        <div>
          <p className="text-gray-400 mb-1">Email</p>
          <p className="font-medium">{section.email}</p>
        </div>
      )}
      {section.phone && (
        <div>
          <p className="text-gray-400 mb-1">Phone</p>
          <p className="font-medium">{section.phone}</p>
        </div>
      )}
      {section.address && (
        <div>
          <p className="text-gray-400 mb-1">Address</p>
          <p className="font-medium">{section.address}</p>
        </div>
      )}
    </div>
  </div>
</section>
```

**Props**: `title`, `email`, `phone`, `address`, `map_embed`, `style{layout}`

### 9. Footer
```tsx
<footer className="py-8 px-4 bg-gray-900 text-gray-400">
  <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center">
    <p>{section.text}</p>
    <div className="flex gap-4 mt-4 md:mt-0">
      {section.links?.map((link, i) => (
        <a key={i} href="#" className="hover:text-white transition">{link}</a>
      ))}
    </div>
  </div>
</footer>
```

**Props**: `text`, `links[]`, `socials[]`

## Multi-Page Support
```typescript
const [currentPage, setCurrentPage] = useState(0);
const page = data?.pages?.[currentPage];
const sections = page?.sections || [];
```
**Current**: Only renders `pages[0]` (Home page)
**Future**: Add pagination/navigation for multi-page sites

## Error Handling
- **Missing Data**: Returns null for unknown section types
- **Missing Theme**: Uses fallback colors
- **Missing Sections**: Renders empty container
- **Invalid JSON**: Caught at API level, falls back to demo template

## Performance
- **Memoization**: Not currently memoized (re-renders on parent change)
- **Images**: Uses external URLs (Unsplash), no optimization
- **CSS Variables**: Applied on every theme change (efficient)

## Code Reference
- **File**: `frontend/src/components/WebsiteRenderer.tsx` (360 lines)
- **Used In**: 
  - `frontend/src/app/builder/[id]/page.tsx` (preview)
  - Public page (future)

## Do's and Don'ts
| ✅ Do | ❌ Don't |
|-------|----------|
| Use CSS variables for theming | Hardcode colors in components |
| Handle missing props gracefully | Crash on missing data |
| Maintain semantic HTML | Use divs for everything |
| Test all 9 section types | Only test hero |
| Keep sections independent | Couple section logic |

## Future Enhancements
- Multi-page navigation
- Section reordering (drag-drop)
- Custom section types
- Animation on scroll (Framer Motion)
- Image optimization (Next.js Image)
- SEO meta tag injection
- Responsive preview modes (mobile/tablet/desktop)
- Edit-in-place (contentEditable)
- Code export (HTML/CSS/JS)