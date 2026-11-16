# BuildMySite - AI Website Builder
## Complete Full-Stack Technical Documentation

---

## 📋 PROJECT OVERVIEW

**BuildMySite** is a full-stack AI-powered website builder SaaS platform that generates complete, production-ready websites from natural language prompts. Built for the **Web Community Nepal** with **Balen City** support.

### Core Value Proposition
- **Input**: Natural language description (e.g., "A Nepali restaurant in Kathmandu called Himalayan Kitchen")
- **Output**: Complete website JSON with all sections (navbar, hero, about, services, gallery, testimonials, contact, footer)
- **Deployment**: One-click publish with custom slug

---

## 🏗️ ARCHITECTURE

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                           BUILDMYSITE ARCHITECTURE                            │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  ┌──────────────────┐     HTTPS/REST API      ┌──────────────────┐         │
│  │   FRONTEND       │ ◄──────────────────────► │    BACKEND       │         │
│  │   (Next.js 14)   │                          │   (Express.js)   │         │
│  └──────────────────┘                          └──────────────────┘         │
│         │                                             │                     │
│         │                          ┌──────────────────┴──────────────────┐  │
│         │                          │           EXTERNAL SERVICES         │  │
│         │                          ├─────────────────────────────────────┤  │
│         │                          │  • Kilo AI API (Primary)            │  │
│         │                          │  • OpenAI API (Fallback)            │  │
│         │                          │  • MongoDB Atlas (via Prisma)       │  │
│         │                          │  • Unsplash (Stock Images)          │  │
│         │                          └─────────────────────────────────────┘  │
│         ▼                                             ▼                     │
│  ┌──────────────────┐                          ┌──────────────────┐         │
│  │   Browser        │                          │   Database       │         │
│  │   (Client)       │                          │   (MongoDB)      │         │
│  └──────────────────┘                          └──────────────────┘         │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 🎯 TECHNOLOGY STACK

### Frontend
| Layer | Technology | Version | Purpose |
|-------|------------|---------|---------|
| Framework | Next.js | 14.0.4 | App Router, SSR, API Routes |
| Language | TypeScript | 5.3.3 | Type safety |
| Styling | Tailwind CSS | 3.4.0 | Utility-first CSS |
| Animations | Framer Motion | 10.17.4 | Page transitions, animations |
| Icons | Lucide React | 0.303.0 | Consistent icon system |
| State | React Context + Hooks | 18.2.0 | Auth, Theme state |
| HTTP Client | Axios | 1.6.2 | API communication |

### Backend
| Layer | Technology | Version | Purpose |
|-------|------------|---------|---------|
| Runtime | Node.js | 18+ | JavaScript runtime |
| Framework | Express.js | 4.18.2 | REST API |
| Language | TypeScript | 5.3.3 | Type safety |
| Database ORM | Prisma | 5.7.1 | Type-safe database access |
| Database | MongoDB | Latest | Document database |
| Auth | JWT + bcryptjs | 9.0.2 / 2.4.3 | Secure authentication |
| AI Integration | Axios | 1.6.2 | Kilo/OpenAI API calls |

### DevOps & Tools
| Tool | Purpose |
|------|---------|
| npm | Package management |
| ESLint + Prettier | Code quality |
| ts-node-dev | Development server with hot reload |
| Prisma Migrate | Database migrations |

---

## 📁 PROJECT STRUCTURE

```
website-builder/
├── frontend/                          # Next.js 14 Frontend
│   ├── src/
│   │   ├── app/                       # App Router Pages
│   │   │   ├── layout.tsx             # Root layout with providers
│   │   │   ├── globals.css            # Global styles + Tailwind
│   │   │   ├── page.tsx               # Landing page (Home)
│   │   │   ├── login/page.tsx         # Login page
│   │   │   │── register/page.tsx      # Registration page
│   │   │   ├── dashboard/page.tsx     # User dashboard
│   │   │   └── builder/[id]/page.tsx  # Website builder/editor
│   │   ├── components/                # Reusable UI Components
│   │   │   ├── WebsiteRenderer.tsx    # Renders website from JSON
│   │   │   ├── ThemeProvider.tsx      # Dark/Light theme context
│   │   │   ├── DarkModeToggle.tsx     # Theme toggle button
│   │   │   └── AuthProvider.tsx       # Authentication context
│   │   └── lib/
│   │       └── api.ts                 # Axios API client + interceptors
│   ├── package.json
│   ├── tailwind.config.ts
│   ├── tsconfig.json
│   ├── next.config.js
│   └── postcss.config.js
│
├── backend/                           # Express.js Backend
│   ├── src/
│   │   ├── index.ts                   # Express app entry point
│   │   ├── lib/
│   │   │   └── prisma.ts              # Prisma client singleton
│   │   ├── routes/
│   │   │   ├── auth.ts                # Authentication routes
│   │   │   ├── websites.ts            # Website CRUD + AI generation
│   │   │   ├── templates.ts           # Template management
│   │   │   └── analytics.ts           # Analytics tracking
│   │   ├── services/
│   │   │   └── aiService.ts           # AI generation (Kilo/OpenAI)
│   │   └── prompts/
│   │       └── websitePrompt.ts       # AI prompt engineering
│   ├── prisma/
│   │   └── schema.prisma              # Database schema
│   ├── package.json
│   └── tsconfig.json
│
├── README.md                          # Project documentation
├── FULLSTACK_DOCS.md                  # This file
└── UI_specs/                          # UI Specifications (NEW)
    ├── components/
    ├── pages/
    ├── design-system/
    └── interactions/
```

---

## 🔐 AUTHENTICATION SYSTEM

### Flow
```
1. User registers/logs in → Backend validates → Returns JWT + User object
2. Frontend stores token in localStorage + sets Authorization header
3. All API requests include Bearer token via axios interceptor
4. Backend validates token on each protected route
5. 401 response → Auto-logout + redirect to /login
```

### User Model
```typescript
interface User {
  id: string;
  email: string;
  name: string;
  subscription: {
    status: "free" | "pro" | "enterprise";
    plan?: string;
  };
}
```

### Endpoints
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register new user |
| POST | `/api/auth/login` | Login user |
| GET | `/api/auth/me` | Get current user |
| POST | `/api/auth/logout` | Logout (client-side) |

---

## 🤖 AI WEBSITE GENERATION

### Generation Flow
```
User Prompt → buildPrompt() → Kilo API (primary) → Parse JSON → Save to DB → Return Website ID
                    ↓
              OpenAI (fallback) → Parse JSON → Save to DB → Return Website ID
                    ↓
              Demo Template (last resort) → Save to DB → Return Website ID
```

### AI Prompt Structure
- **System Prompt**: 150+ lines defining JSON structure, color guidelines, Nepal context
- **User Input**: Natural language description
- **Output**: Strict JSON with all sections (navbar, hero, about, services, features, gallery, testimonials, contact, footer)

### Color Guidelines (AI)
| Business Type | Primary Color | Secondary | Accent |
|---------------|---------------|-----------|--------|
| Trekking/Nature | #059669 (Green) | #1F2937 | #F97316 |
| Tech/Corporate | #2563EB (Blue) | #1E40AF | #06B6D4 |
| Food/Restaurant | #F97316 (Orange) | #C41E3A | #FFC107 |
| Authentic Restaurant | #C41E3A (Red) | #1A1A2E | #FFD700 |
| Luxury/Premium | #1F2937 (Dark) | #111827 | #F59E0B |
| Creative/Portfolio | #7C3AED (Purple) | #5B21B6 | #F472B6 |

### Generated Website JSON Schema
```json
{
  "website_name": "string",
  "business_type": "restaurant|trekking|shop|portfolio|business|hotel|medical|education|other",
  "tagline": "string",
  "target_audience": "string",
  "language": "English",
  "theme": {
    "primary_color": "#HEX",
    "secondary_color": "#HEX",
    "accent_color": "#HEX",
    "font_family": "Inter",
    "tone": "modern|professional|friendly|luxury|minimal"
  },
  "seo": {
    "title": "string",
    "description": "string",
    "keywords": ["string"]
  },
  "pages": [{
    "name": "Home",
    "slug": "/",
    "sections": [
      { "type": "navbar", ... },
      { "type": "hero", ... },
      { "type": "about", ... },
      { "type": "services", ... },
      { "type": "features", ... },
      { "type": "gallery", ... },
      { "type": "testimonials", ... },
      { "type": "contact", ... },
      { "type": "footer", ... }
    ]
  }]
}
```

---

## 🌐 WEBSITE RENDERING (WebsiteRenderer.tsx)

### Section Types Supported
| Type | Description | Key Props |
|------|-------------|-----------|
| `navbar` | Fixed top navigation | logo_text, menu[], cta, style |
| `hero` | Full-screen hero section | title, subtitle, description, cta, background_image, style |
| `about` | Split layout with image | title, description, image, style |
| `services` | 3-column grid | title, items[{name, description, icon}], style |
| `features` | 2-column with checkmarks | title, items[{title, description}], style |
| `gallery` | 3-column image grid | title, images[], style |
| `testimonials` | 4-column cards with ratings | title, items[{name, feedback, rating}], style |
| `contact` | 3-column contact info | title, email, phone, address, map_embed, style |
| `footer` | Simple footer | text, links[], socials[], style |

### Theme Application
- CSS Variables set on `document.documentElement`: `--primary`, `--secondary`, `--accent`
- Applied via inline styles on component elements
- Supports dynamic theme switching in editor

---

## 🎨 DESIGN SYSTEM

### Colors
```css
/* Light Mode */
--primary: #3b82f6 (Blue-600)
--secondary: #1f2937 (Gray-800)
--accent: #f59e0b (Amber-500)

/* Dark Mode (via .dark class) */
--background-start: #111827 (Gray-900)
--background-end: #111827 (Gray-900)
```

### Typography
- **Font**: Inter (Google Fonts) - weights 400, 500, 600, 700
- **Headings**: text-3xl to text-6xl, font-bold
- **Body**: text-base to text-lg, text-gray-600/300
- **UI**: text-sm for labels, text-xs for badges

### Spacing Scale
- Base unit: 4px (Tailwind default)
- Common: p-4, p-6, p-8, gap-4, gap-6, gap-8
- Section padding: py-20 (80px vertical)

### Border Radius
- Small: rounded-lg (8px)
- Medium: rounded-xl (12px)
- Large: rounded-2xl (16px)
- Full: rounded-full

### Shadows
- Subtle: shadow-sm
- Card: shadow-md
- Hover: shadow-lg

### Transitions
- Default: `transition` (150ms ease)
- Hover states: `hover:bg-`, `hover:text-`, `hover:shadow-`

---

## 📄 PAGE SPECIFICATIONS

### 1. Landing Page (`/`)
**File**: `frontend/src/app/page.tsx`

**Sections**:
1. **Fixed Header** - Logo, nav links, DarkModeToggle, Auth buttons
2. **Balen City Banner** - Nepal flag + "Balen City" text
3. **Hero** - Headline, AI prompt textarea, Generate button, Quick suggestion tags
4. **Features Grid** - 5 feature cards (AI-Powered, Fast, Beautiful, Publish, Secure)
5. **Templates Grid** - 4 category cards with Unsplash images
6. **CTA Section** - Blue background, Get Started button
7. **Footer** - Balen City link, Privacy/Terms/Contact links

**Key Interactions**:
- Prompt input → Enter or Generate button → Creates website → Redirects to builder
- Quick tags → Click to fill prompt
- Dark mode toggle → Persists to localStorage
- Auth guard → Unauthenticated users redirected to /login

### 2. Login Page (`/login`)
**File**: `frontend/src/app/login/page.tsx`

**Layout**: Centered card, max-w-md
**Fields**: Email (with Mail icon), Password (with Lock icon)
**Actions**: Sign In button, Link to Register
**Validation**: Required fields, API error display

### 3. Register Page (`/register`)
**File**: `frontend/src/app/register/page.tsx`

**Layout**: Centered card, max-w-md
**Fields**: Name (User icon), Email (Mail icon), Password (Lock icon, min 6 chars)
**Actions**: Create Account button, Link to Login

### 4. Dashboard (`/dashboard`)
**File**: `frontend/src/app/dashboard/page.tsx`

**Sections**:
1. **Header** - Logo, User name, DarkModeToggle, Logout
2. **Balen City Banner**
3. **Create New Website** - Expandable prompt form
4. **Websites Grid** - 3-column cards showing:
   - Website name, creation date, status badge
   - Edit (pencil), View Live (globe), Delete (trash) actions

**Empty State**: Illustration + "No websites yet" message

### 5. Builder/Editor (`/builder/[id]`)
**File**: `frontend/src/app/builder/[id]/page.tsx`

**Layout**: Two-column (Editor sidebar + Preview area)

**Header**:
- Back to Dashboard
- Website name breadcrumb
- Status badge (Draft/Published)
- Toolbar: Edit mode, Preview mode, DarkModeToggle, Logout

**Editor Sidebar** (320px, editor mode only):
- Textarea for edit instructions
- Apply Changes button
- Quick Action buttons (Update Hero, Add Services, Change Colors)

**Preview Area**:
- Header with Publish/View Live button
- WebsiteRenderer in iframe-like container
- Height: calc(100vh - 200px)

---

## 🧩 COMPONENT SPECIFICATIONS

### ThemeProvider (`ThemeProvider.tsx`)
- **Context**: `darkMode: boolean`, `toggleDarkMode: () => void`
- **Persistence**: localStorage + system preference detection
- **DOM**: Adds/removes `.dark` class on `<html>`

### DarkModeToggle (`DarkModeToggle.tsx`)
- **Icon**: Moon (light) / Sun (dark)
- **Style**: p-2 rounded-lg, hover:bg-gray-100/800
- **Accessibility**: aria-label="Toggle dark mode"

### AuthProvider (`AuthProvider.tsx`)
- **Context**: user, loading, login, register, logout
- **Persistence**: localStorage (token + user)
- **Auto-verify**: Calls `/auth/me` on mount to validate token
- **Auto-redirect**: 401 → clear storage → redirect to /login

### WebsiteRenderer (`WebsiteRenderer.tsx`)
- **Props**: `data: WebsiteData` (full JSON)
- **State**: `currentPage` index for multi-page support
- **Theme**: Applies CSS variables from data.theme
- **Rendering**: Switch statement on section.type
- **Sections**: 9 types (navbar, hero, about, services, features, gallery, testimonials, contact, footer)

---

## 🔌 API SPECIFICATIONS

### Base URL
- Development: `http://localhost:5000/api`
- Production: `process.env.NEXT_PUBLIC_API_URL`

### Authentication
All protected routes require: `Authorization: Bearer <token>`

### Website Endpoints
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/websites/generate` | ✅ | Generate from prompt |
| GET | `/websites` | ✅ | List user websites |
| GET | `/websites/:id` | ✅ | Get single website |
| PUT | `/websites/:id` | ✅ | Update website |
| POST | `/websites/:id/edit` | ✅ | AI edit website |
| POST | `/websites/:id/publish` | ✅ | Publish website |
| DELETE | `/websites/:id` | ✅ | Delete website |
| GET | `/websites/public/:slug` | ❌ | Public access |

### Template Endpoints
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/templates` | ❌ | List templates |
| GET | `/templates/:id` | ❌ | Get template |
| GET | `/templates/category/:category` | ❌ | By category |
| POST | `/templates/save` | ❌ | Save as template |
| POST | `/templates/seed` | ❌ | Seed demo templates |

### Analytics Endpoints
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/analytics/track` | ❌ | Track view event |
| GET | `/analytics/:id/analytics` | ✅ | Get analytics |

---

## 🗄️ DATABASE SCHEMA (Prisma + MongoDB)

```prisma
model User {
  id           String        @id @default(auto()) @map("_id") @db.ObjectId
  email        String        @unique
  password     String
  name         String
  avatar       String?
  subscription Subscription?
  createdAt    DateTime      @default(now())
  updatedAt    DateTime      @updatedAt
  websites     Website[]
  @@map("users")
}

model Subscription {
  id               String    @id @default(auto()) @map("_id") @db.ObjectId
  status           String    @default("free")
  stripeCustomerId String?
  plan             String?
  expiresAt        DateTime?
  userId           String    @unique @db.ObjectId
  user             User      @relation(fields: [userId], references: [id], onDelete: Cascade)
  @@map("subscriptions")
}

model Website {
  id           String   @id @default(auto()) @map("_id") @db.ObjectId
  userId       String   @db.ObjectId
  name         String
  slug         String   @unique
  websiteJson  Json
  theme        Json?
  status       String   @default("draft")
  publishedUrl String?
  analytics    Json?
  createdAt    DateTime @default(now())
  updatedAt    DateTime @updatedAt
  user         User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  @@map("websites")
}

model Template {
  id           String   @id @default(auto()) @map("_id") @db.ObjectId
  name         String   @unique
  category     String
  previewImage String
  websiteJson  Json
  isPremium    Boolean  @default(false)
  usageCount   Int      @default(0)
  createdAt    DateTime @default(now())
  @@map("templates")
}
```

---

## 🚀 DEPLOYMENT

### Environment Variables

**Frontend** (`.env.local`):
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

**Backend** (`.env`):
```env
DATABASE_URL=mongodb+srv://user:pass@cluster.mongodb.net/buildmysite
JWT_SECRET=your-super-secret-key
PORT=5000
KILO_API_KEY=your-kilo-key
KILO_API_URL=https://api.kilo.ai/v1/chat/completions
OPENAI_API_KEY=your-openai-key
```

### Build Commands
```bash
# Frontend
cd frontend && npm run build && npm start

# Backend
cd backend && npm run build && npm start

# Database
cd backend && npm run prisma:generate && npm run prisma:migrate
```

---

## 🔒 SECURITY CONSIDERATIONS

1. **Password Hashing**: bcrypt with 10 rounds
2. **JWT**: 7-day expiry, HttpOnly not used (SPA), stored in localStorage
3. **CORS**: `origin: true, credentials: true` (configure for production)
4. **Input Validation**: Basic checks, could add Zod
5. **Rate Limiting**: Not implemented (add for production)
6. **Helmet**: Not implemented (add for production)
7. **XSS**: React auto-escapes, but AI content rendered dangerously

---

## 🎯 FUTURE ENHANCEMENTS

1. **Multi-page support** - Currently only renders pages[0]
2. **Custom domain publishing** - Current: `/site/:slug`
3. **Team collaboration** - Shared websites
4. **Template marketplace** - User-submitted templates
5. **Analytics dashboard** - Charts, visitor tracking
6. **Export to code** - Next.js/React/HTML export
7. **Real-time editing** - WebSocket for live preview
8. **Image upload** - Replace Unsplash URLs
9. **SEO controls** - Per-page meta tags
10. **A/B testing** - Multiple versions

---

## 📝 AI PROMPT ENGINEERING DETAILS

### Prompt Structure (`websitePrompt.ts`)
- **Length**: ~150 lines system prompt
- **Sections**: Output requirements, JSON schema, color guidelines, context rules
- **Strictness**: "NO explanations, NO markdown, NO comments"
- **Nepal Context**: Auto-detects Nepali businesses, uses +977 format

### Fallback Chain
1. **Kilo API** (primary) - `gpt-4o` model, 4000 tokens, temp 0.7
2. **OpenAI API** (fallback) - Same params
3. **Demo Templates** (last resort) - Restaurant/Trekking/Business templates

### JSON Parsing
- Strips markdown code fences (```json ... ```)
- Trims whitespace
- JSON.parse with error handling
- Returns demo template on parse failure

---

## 🌍 NEPAL-SPECIFIC FEATURES

1. **Balen City Branding** - Flag + name in header, footer, dashboard
2. **Nepal Context in AI** - Auto-detects Nepali businesses
3. **Phone Format** - +977-1-xxxxxxx
4. **Locations** - Kathmandu, Pokhara, etc.
5. **Currency** - NPR (could be added)
6. **Language** - English/Nepali (could be added)

---

## 📚 KEY FILES REFERENCE

| File | Purpose |
|------|---------|
| `frontend/src/app/page.tsx` | Landing page |
| `frontend/src/app/dashboard/page.tsx` | User dashboard |
| `frontend/src/app/builder/[id]/page.tsx` | Editor/Preview |
| `frontend/src/components/WebsiteRenderer.tsx` | JSON → HTML renderer |
| `frontend/src/components/ThemeProvider.tsx` | Dark mode context |
| `frontend/src/components/AuthProvider.tsx` | Auth context |
| `frontend/src/lib/api.ts` | API client + interceptors |
| `backend/src/index.ts` | Express app entry |
| `backend/src/routes/websites.ts` | Website CRUD + AI |
| `backend/src/services/aiService.ts` | AI generation logic |
| `backend/src/prompts/websitePrompt.ts` | Prompt engineering |
| `backend/prisma/schema.prisma` | Database schema |

---

## 🏷️ VERSION & METADATA

- **Project**: BuildMySite
- **Version**: 1.0.0
- **Last Updated**: 2024
- **Framework**: Next.js 14 + Express + TypeScript
- **Database**: MongoDB + Prisma
- **AI**: Kilo API + OpenAI fallback
- **Community**: Web Community Nepal
- **Support**: Balen City

---

*This documentation captures the complete state of the BuildMySite platform as of the current commit. Use this as the single source of truth for architecture, components, APIs, and design decisions.*