# Authentication Flow Interaction Specification

## BuildMySite Auth System

Complete interaction specification for registration, login, session management, and protected routes.

---

## Overview

Auth flow uses JWT tokens stored in localStorage with React Context (`AuthProvider`) for global state management.

---

## User States

```typescript
type AuthState = 
  | { status: 'loading'; user: null }
  | { status: 'unauthenticated'; user: null }
  | { status: 'authenticated'; user: User };
```

**User Object**:
```typescript
interface User {
  id: string;
  email: string;
  name: string;
  subscription: {
    status: 'free' | 'pro' | 'enterprise';
    plan?: string;
  };
}
```

---

## Registration Flow (`/register`)

### Step-by-Step
```
1. User navigates to /register
2. Page renders → AuthProvider checks localStorage
3. User fills form (Name, Email, Password)
4. Client validation (required, email format, minLength 6)
4. Submit → register(email, password, name)
5. API POST /api/auth/register
6. Success → JWT + User returned
7. Store token + user in localStorage
8. Set AuthContext user
9. Redirect to /
```

### Form Validation
| Field | Rules | Error Messages |
|-------|-------|----------------|
| Name | Required, min 1 char | "Name is required" |
| Email | Required, valid email | "Invalid email format" |
| Password | Required, min 6 chars | "Password must be at least 6 characters" |

### Error Handling
```typescript
try {
  await register(email, password, name);
  router.push("/");
} catch (err: any) {
  setError(err.response?.data?.error || "Registration failed");
  // Common: "Email already registered"
}
```

### Loading States
- **Submit disabled**: `disabled={loading}`
- **Button text**: "Creating account..." with spinner
- **Form inputs**: Disabled during submit

### Success Redirect
```typescript
router.push("/");  // Home page (shows user-specific content)
```

---

## Login Flow (`/login`)

### Step-by-Step
```
1. User navigates to /login
2. Page renders → AuthProvider checks localStorage
3. If user exists → Redirect to /
4. User fills form (Email, Password)
5. Submit → login(email, password)
6. API POST /api/auth/login
7. Success → JWT + User returned
8. Store token + user in localStorage
9. Set AuthContext user
10. Redirect to /
```

### Form Validation
| Field | Rules | Error Messages |
|-------|-------|----------------|
| Email | Required, valid email | "Invalid email format" |
| Password | Required | "Password is required" |

### Error Handling
```typescript
try {
  await login(email, password);
  router.push("/");
} catch (err: any) {
  setError(err.response?.data?.error || "Login failed");
  // Common: "Invalid email or password"
}
```

### Loading States
- **Submit disabled**: `disabled={loading}`
- **Button text**: "Signing in..." with ArrowRight icon

---

## Session Management

### Token Storage
```typescript
// On login/register success
localStorage.setItem("token", jwtToken);
localStorage.setItem("user", JSON.stringify(userData));
```

### Auto-Verification (App Mount)
```typescript
useEffect(() => {
  const token = localStorage.getItem("token");
  const savedUser = localStorage.getItem("user");
  
  if (token && savedUser) {
    setUser(JSON.parse(savedUser));
    // Verify token still valid
    authAPI.me()
      .then(res => {
        setUser(res.data.user);
        localStorage.setItem("user", JSON.stringify(res.data.user));
      })
      .catch(() => {
        // Token invalid/expired
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setUser(null);
      })
      .finally(() => setLoading(false));
  } else {
    setLoading(false);
  }
}, []);
```

### Token Expiry Handling
- **JWT Expiry**: 7 days
- **401 Response**: Axios interceptor clears storage, redirects to /login
- **Auto-refresh**: Not implemented (could add refresh token)

---

## Protected Routes

### Client-Side Guards
```typescript
// Dashboard
useEffect(() => {
  if (!user) { router.push("/login"); return; }
  fetchWebsites();
}, [user]);

// Builder
useEffect(() => {
  if (!user) { router.push("/login"); return; }
  fetchWebsite();
}, [user]);

// Landing Generate Button
if (!user) {
  router.push("/login");
  return;
}
```

### Server-Side Validation
All API routes (except `/auth/*`, `/templates/*`, `/public/*`) use `authenticate` middleware:
```typescript
const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Authentication required" });
  }
  // Verify JWT...
};
```

---

## Logout Flow

### User Action
```typescript
const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  setUser(null);
};

// In header
<button onClick={() => { logout(); router.push("/"); }}>
  <LogOut />
</button>
```

### Server-Side (Optional)
```typescript
// POST /api/auth/logout
router.post("/logout", (req, res) => {
  res.json({ message: "Logged out successfully" });
  // Client handles token removal
});
```

---

## API Integration

### Axios Interceptors (`api.ts`)
```typescript
// Request: Add token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Response: Handle 401
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);
```

### API Endpoints
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/api/auth/register` | ❌ | Register |
| POST | `/api/auth/login` | ❌ | Login |
| GET | `/api/auth/me` | ✅ | Get current user |
| POST | `/api/auth/logout` | ❌ | Logout |

---

## UI States by Page

### Landing Page (`/`)
| User State | Header Shows |
|------------|--------------|
| Unauthenticated | Login + Get Started buttons |
| Authenticated | Dashboard button |

### Auth Pages (`/login`, `/register`)
| User State | Behavior |
|------------|----------|
| Unauthenticated | Show form |
| Authenticated | Redirect to / |

### Dashboard (`/dashboard`)
| User State | Behavior |
|------------|----------|
| Loading | Spinner |
| Unauthenticated | Redirect to /login |
| Authenticated | Show websites grid |

### Builder (`/builder/[id]`)
| User State | Behavior |
|------------|----------|
| Loading | Full-screen spinner |
| Unauthenticated | Redirect to /login |
| Authenticated (owner) | Full editor |
| Authenticated (not owner) | Redirect to /dashboard |

---

## Error Scenarios

| Scenario | User Experience | Recovery |
|----------|-----------------|----------|
| Invalid credentials | Inline error message | Retry with correct credentials |
| Email exists (register) | "Email already registered" | Login instead |
| Expired token | Auto-logout, redirect to /login | Login again |
| Network error | "Login failed" / "Registration failed" | Retry |
| Server 500 | Generic error message | Retry later |

---

## Security Considerations

### Current Implementation
- ✅ bcrypt password hashing (10 rounds)
- ✅ JWT with 7-day expiry
- ✅ HttpOnly not used (SPA requirement)
- ✅ 401 auto-logout
- ✅ Password never logged

### Recommended Improvements
- [ ] HttpOnly cookies for token storage
- [ ] Refresh token rotation
- [ ] Rate limiting on auth endpoints
- [ ] CSRF protection
- [ ] Password strength requirements
- [ ] Email verification flow
- [ ] 2FA support
- [ ] Account lockout after failed attempts

---

## Accessibility

### Form Accessibility
```tsx
<label htmlFor="email">Email</label>
<input id="email" type="email" autoComplete="email" required />

<label htmlFor="password">Password</label>
<input id="password" type="password" autoComplete="current-password" required />
```

### Error Announcements
```tsx
{error && (
  <div role="alert" className="p-3 bg-red-50...">
    {error}
  </div>
)}
```

### Focus Management
- Auto-focus first input on mount (not implemented)
- Logical tab order
- Visible focus rings

---

## Testing Scenarios

### Happy Path
- [ ] Register → Auto-login → Redirect to /
- [ ] Login → Redirect to /
- [ ] Refresh page → Session persists
- [ ] Logout → Redirect to /

### Edge Cases
- [ ] Expired token → Auto-logout → /login
- [ ] Invalid token → Auto-logout → /login
- [ ] Network failure → Error message
- [ ] Duplicate email → "Email already registered"
- [ ] Weak password → Client validation
- [ ] Malformed email → Client validation
- [ ] Direct /dashboard access (unauth) → /login
- [ ] Direct /builder access (unauth) → /login

---

## Related Files
- `frontend/src/components/AuthProvider.tsx`
- `frontend/src/app/login/page.tsx`
- `frontend/src/app/register/page.tsx`
- `frontend/src/app/dashboard/page.tsx`
- `frontend/src/app/builder/[id]/page.tsx`
- `frontend/src/lib/api.ts`
- `backend/src/routes/auth.ts`
- `UI_specs/components/input-field.md`
- `UI_specs/components/button.md`
- `UI_specs/pages/login-page.md`
- `UI_specs/pages/register-page.md`