# Header / Navigation Component Specification

## Overview
Fixed top navigation bar present on all authenticated and public pages. Contains logo, navigation links, dark mode toggle, and authentication actions.

## Variants

### 1. Public Pages (Landing, Login, Register)
```
Logo + Nav Links + DarkModeToggle + [Login | Get Started]
```

### 2. Authenticated Pages (Dashboard, Builder)
```
Logo + User Info + DarkModeToggle + Logout
```

### 3. Builder Page
```
Back Button + Logo/Breadcrumb + Status Badge + Toolbar (Edit/Preview/DarkMode/Logout)
```

## Visual Specification

### Container
- **Position**: Fixed top, z-index: 50
- **Height**: 64px (h-16)
- **Background**: `bg-white/80 dark:bg-gray-900/80 backdrop-blur-md`
- **Border**: `border-b border-gray-200 dark:border-gray-700`
- **Max Width**: 1280px (max-w-7xl), centered
- **Padding**: px-4 sm:px-6 lg:px-8

### Logo
- **Icon**: Sparkles (lucide-react), 32x32 (w-8 h-8), text-primary-600
- **Text**: "BuildMySite", text-xl, font-bold, text-gray-900 dark:text-white
- **Spacing**: gap-2 between icon and text
- **Link**: Navigates to / (landing) or /dashboard (builder)

### Navigation Links (Desktop only, hidden md:flex)
- **Items**: Features, Templates, Pricing (landing only)
- **Style**: text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white
- **Spacing**: gap-8

### DarkModeToggle
- **Position**: Right side, before auth buttons
- **Spec**: See `dark-mode-toggle.md`

### Auth Buttons (Public Pages)
#### Login Button (Ghost)
- **Style**: text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white
- **Action**: Router push to /login

#### Get Started Button (Primary)
- **Style**: px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition
- **Action**: Router push to /register

### User Menu (Authenticated Pages)
- **User Name**: text-gray-600 dark:text-gray-300
- **Logout Button**: p-2, text-gray-400 hover:text-gray-600 dark:hover:text-gray-300
- **Icon**: LogOut (lucide), w-5 h-5

### Builder Toolbar
- **Back Button**: ArrowLeft icon, p-2, hover:text-gray-600
- **Breadcrumb**: Logo + "/" + Website name
- **Status Badge**: See `components/badge.md`
- **Edit Button**: Edit2 icon, p-2, tooltip "Edit Website"
- **Preview Button**: Eye icon, p-2, tooltip "Preview Mode"
- **DarkModeToggle**: Standard
- **Logout**: LogOut icon, p-2

## Responsive Behavior
- **Mobile (<768px)**: Nav links hidden, only logo + DarkModeToggle + auth buttons
- **Tablet (768px+)**: Nav links visible
- **Desktop (1024px+)**: Full layout

## States

### Default
- Subtle backdrop blur, border bottom

### Scrolled
- Same as default (no shadow elevation change)

### Loading
- Buttons show disabled state with opacity-50

## Accessibility
- **ARIA**: Logo link has descriptive text
- **Focus**: Visible focus rings on all interactive elements
- **Keyboard**: Tab navigation through all actions
- **Screen Reader**: Button labels via aria-label

## Code Reference
- **Files**: 
  - `frontend/src/app/page.tsx` (lines 104-153)
  - `frontend/src/app/dashboard/page.tsx` (lines 83-107)
  - `frontend/src/app/builder/[id]/page.tsx` (lines 96-156)
  - `frontend/src/app/login/page.tsx` (lines 43-60)
  - `frontend/src/app/register/page.tsx` (lines 44-58)

## Do's and Don'ts
| ✅ Do | ❌ Don't |
|-------|----------|
| Use consistent height (h-16) | Change height per page |
| Maintain backdrop blur | Remove blur for "cleaner" look |
| Keep z-index 50 | Lower z-index causing overlap |
| Use transition on hover | Instant color changes |
| Preserve dark mode support | Hardcode light colors |

## Future Considerations
- Mobile hamburger menu for nav links
- User avatar dropdown (settings, billing, logout)
- Notification bell icon
- Search command palette (Cmd+K)