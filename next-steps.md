# Next Steps — BuildMySite Remaining Tasks

## Priority: HIGH (Core Product)

### T-001: Multi-Page Website Support
- **Description**: WebsiteRenderer currently only renders `pages[0]`. Add multi-page navigation.
- **Deliverable**: Page tabs/navigation in builder, renderer supports all pages
- **Effort**: Medium
- **Files**: `WebsiteRenderer.tsx`, `builder/[id]/page.tsx`

### T-002: Mobile Builder Support
- **Description**: Editor sidebar doesn't work on mobile (<1024px). Add slide-over drawer.
- **Deliverable**: Responsive editor sidebar with hamburger toggle
- **Effort**: Medium
- **Files**: `builder/[id]/page.tsx`, new `EditorDrawer.tsx`

### T-003: Input Validation Library
- **Description**: Only HTML5 validation. Add Zod schemas for all forms.
- **Deliverable**: Zod schemas + React Hook Form integration
- **Effort**: Small
- **Files**: New `lib/validations.ts`, update auth/builder pages

### T-004: Rate Limiting & Security Hardening
- **Description**: No rate limiting on auth endpoints, CORS open to all origins.
- **Deliverable**: express-rate-limit, helmet, restrictive CORS
- **Effort**: Small
- **Files**: `backend/src/index.ts`, new middleware

## Priority: MEDIUM (UX Polish)

### T-005: Image Upload & Optimization
- **Description**: AI generates Unsplash URLs. Add direct image upload with Next.js Image optimization.
- **Deliverable**: Upload API, image proxy, WebsiteRenderer uses Next/Image
- **Effort**: Medium
- **Files**: New `backend/src/routes/upload.ts`, `WebsiteRenderer.tsx`

### T-006: Website Version History
- **Description**: No undo/versioning. Add version snapshots on each edit.
- **Deliverable**: Version model, restore UI, diff preview
- **Effort**: Medium
- **Files**: New Prisma model, `websites.ts`, builder sidebar

### T-007: Custom Domain Publishing
- **Description**: Only `/site/:slug` subpath. Add custom domain support.
- **Deliverable**: Domain model, DNS verification, SSL (Let's Encrypt)
- **Effort**: Large
- **Files**: New models, routes, deployment config

### T-008: Analytics Dashboard
- **Description**: Only view count tracked. Add charts, time series, geographic data.
- **Deliverable**: Chart.js/Recharts dashboard, daily/weekly/monthly views
- **Effort**: Medium
- **Files**: New `analytics.ts` routes, dashboard page

## Priority: LOW (Nice to Have)

### T-009: Template Marketplace
- **Description**: User-submitted templates with preview, categories, ratings.
- **Deliverable**: Template submission flow, moderation, public gallery
- **Effort**: Large

### T-010: Code Export
- **Description**: Export generated website as Next.js/React/HTML project.
- **Deliverable**: Export API, zip download, dependency resolution
- **Effort**: Large

### T-011: Team Collaboration
- **Description**: Shared websites, roles (owner, editor, viewer), comments.
- **Deliverable**: Invite system, real-time presence, permission model
- **Effort**: Large

### T-012: A/B Testing
- **Description**: Create variants, traffic split, conversion tracking.
- **Deliverable**: Variant management, analytics comparison
- **Effort**: Medium

---

## Technical Debt

### TD-001: TypeScript `any` Usage
- **Locations**: `websites.ts` (req as any), `aiService.ts` (demo template)
- **Fix**: Proper typing for Prisma Json fields, request augmentation

### TD-002: No Test Suite
- **Missing**: Unit tests, integration tests, E2E tests
- **Fix**: Jest + React Testing Library, Playwright

### TD-003: Error Boundaries
- **Missing**: React error boundaries for graceful failures
- **Fix**: Class component boundary, fallback UI

### TD-004: Loading Skeletons
- **Current**: Spinners only
- **Fix**: Skeleton loaders for cards, forms, preview

### TD-005: Accessibility Audit
- **Missing**: ARIA labels, focus management, color contrast verification
- **Fix**: axe-core audit, manual testing

---

## Documentation Remaining

### D-001: Complete UI Specs
- [ ] Design system tokens (7 files)
- [ ] Interaction patterns (5 files)
- [ ] Log files (3 files) — **IN PROGRESS**

### D-002: API Documentation
- [ ] OpenAPI/Swagger spec
- [ ] Postman collection

### D-003: Deployment Guides
- [ ] Vercel (frontend)
- [ ] Railway/Render (backend)
- [ ] MongoDB Atlas setup
- [ ] Environment variables reference