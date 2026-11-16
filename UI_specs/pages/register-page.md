# Register Page Specification

## Route
`/register`

## File
`frontend/src/app/register/page.tsx` (165 lines)

## Purpose
New user registration - create account with name, email, password. Redirects authenticated users to home.

## Layout Structure
```
1. Fixed Header (minimal)
2. Balen City Banner
3. Centered Auth Card (max-w-md)
   - Title + Subtitle
   - Form (Name, Email, Password)
   - Error Display
   - Submit Button
   - Login Link
```

## Detailed Sections

### 1. Fixed Header
**Spec**: See `components/header.md` - Auth variant
- Logo (clickable → /) + DarkModeToggle only
- Identical to login page header

### 2. Balen City Banner
**Same as login/landing**: `py-2 text-center`, flag + "Balen City" text

### 3. Auth Card Container
**Identical to login**: max-w-md, p-8, rounded-2xl, shadow-sm, dark:bg-gray-800

### 4. Card Header
```tsx
<div className="text-center mb-8">
  <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Create Account</h1>
  <p className="text-gray-600 dark:text-gray-300 mt-2">Start building beautiful websites</p>
</div>
```

### 5. Form Fields
**Wrapper**: `space-y-6` (24px gap)

#### Name Field (Additional vs Login)
```tsx
<div>
  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Name</label>
  <div className="relative">
    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
    <input
      type="text"
      className="w-full pl-10 pr-4 py-3 border border-gray-200 dark:border-gray-600 rounded-xl focus:border-primary-500 focus:outline-none transition bg-white dark:bg-gray-700 dark:text-white"
      placeholder="John Doe"
      required
    />
  </div>
</div>
```
- **Icon**: User (lucide-react)
- **Validation**: Required, no min length

#### Email Field
**Identical to login**: Mail icon, type="email", autocomplete="email"

#### Password Field
```tsx
<input
  type="password"
  minLength={6}
  className="w-full pl-10 pr-4 py-3 border border-gray-200 dark:border-gray-600 rounded-xl focus:border-primary-500 focus:outline-none transition bg-white dark:bg-gray-700 dark:text-white"
  placeholder="••••••••"
  required
/>
```
- **Min Length**: 6 characters (HTML5 validation)
- **Icon**: Lock (lucide-react)

### 6. Error Display
**Identical to login**: Red background, rounded-lg, top of form

### 7. Submit Button
```tsx
<button type="submit" disabled={loading} className="w-full py-3 bg-primary-600 text-white rounded-xl font-medium hover:bg-primary-700 disabled:opacity-50 transition flex items-center justify-center gap-2">
  {loading ? "Creating account..." : "Create Account"}
  <ArrowRight className="w-5 h-5" />
</button>
```
- **Text**: "Create Account" / "Creating account..."
- **Icon**: ArrowRight trailing

### 8. Login Link
```tsx
<p className="mt-6 text-center text-gray-600 dark:text-gray-300">
  Already have an account?{" "}
  <button onClick={() => router.push("/login")} className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium">
    Sign in
  </button>
</p>
```

## Authentication Logic
```tsx
const { register, user } = useAuth();
const router = useRouter();

useEffect(() => {
  if (user) router.push("/");
}, [user, router]);

const handleSubmit = async (e) => {
  e.preventDefault();
  setError("");
  setLoading(true);
  try {
    await register(email, password, name);
    router.push("/");
  } catch (err) {
    setError(err.response?.data?.error || "Registration failed");
  } finally {
    setLoading(false);
  }
};
```
- **Fields**: name, email, password (vs login: email, password)
- **Auto-redirect**: If user exists → /
- **Error**: "Email already registered" from backend

## Differences from Login
| Aspect | Login | Register |
|--------|-------|----------|
| Fields | Email, Password | Name, Email, Password |
| Submit Text | "Sign In" | "Create Account" |
| Loading Text | "Signing in..." | "Creating account..." |
| Link | "Sign up" → /register | "Sign in" → /login |
| Validation | Email format | Email format + minLength 6 password |
| API Call | authAPI.login | authAPI.register |

## Dark Mode
**Identical to login page** - all `dark:` variants applied consistently

## Responsive
**Identical to login** - max-w-md centered card

## Accessibility
**Identical to login** plus:
- **Name Field**: autocomplete="name"
- **Password**: minLength=6 enforced by browser

## Code Reference
- **File**: `frontend/src/app/register/page.tsx` (lines 1-165)
- **Hooks**: useAuth, useTheme, useRouter, useState, useEffect
- **Icons**: ArrowRight, Lock, Mail, Sparkles, User (lucide-react)
- **API**: authAPI.register via useAuth

## Do's and Don'ts
| ✅ Do | ❌ Don't |
|-------|----------|
| Match login page layout exactly | Different spacing/alignment |
| Validate password length client-side | Only server-side validation |
| Show "Email already registered" error | Generic error for existing email |
| Auto-focus name field | No initial focus |
| Consistent with login dark mode | Different dark colors |

## Future Enhancements
- Password strength indicator
- Confirm password field
- Terms of Service checkbox
- Email verification flow
- Invite code field
- Social registration buttons
- Username availability check