# Login Page Specification

## Route
`/login`

## File
`frontend/src/app/login/page.tsx` (146 lines)

## Purpose
User authentication - sign in with email/password. Redirects authenticated users to home.

## Layout Structure
```
1. Fixed Header (minimal)
2. Balen City Banner
3. Centered Auth Card (max-w-md)
   - Title + Subtitle
   - Form (Email, Password)
   - Error Display
   - Submit Button
   - Register Link
```

## Detailed Sections

### 1. Fixed Header
**Spec**: See `components/header.md` - Auth variant
- Logo (clickable → /) + DarkModeToggle only
- Height: h-16, backdrop blur, border bottom

### 2. Balen City Banner
**Same as landing**: `py-2 text-center`, flag + "Balen City" text
- Background: `bg-gray-50 dark:bg-gray-900`

### 3. Auth Card Container
```tsx
<div className="flex-1 flex items-center justify-center px-4 py-8">
  <div className="max-w-md w-full">
    {/* Card */}
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-8">
      {/* Form */}
    </div>
  </div>
</div>
```
- **Width**: max-w-md (480px)
- **Padding**: p-8 (32px)
- **Radius**: rounded-2xl
- **Shadow**: shadow-sm
- **Dark BG**: dark:bg-gray-800

### 4. Card Header
```tsx
<div className="text-center mb-8">
  <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Welcome Back</h1>
  <p className="text-gray-600 dark:text-gray-300 mt-2">Sign in to continue building</p>
</div>
```

### 5. Form Fields
**Wrapper**: `space-y-6` (24px gap)

#### Email Field
```tsx
<div>
  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Email</label>
  <div className="relative">
    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
    <input
      type="email"
      className="w-full pl-10 pr-4 py-3 border border-gray-200 dark:border-gray-600 rounded-xl focus:border-primary-500 focus:outline-none transition bg-white dark:bg-gray-700 dark:text-white"
      placeholder="you@example.com"
      required
    />
  </div>
</div>
```

#### Password Field
```tsx
<div>
  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Password</label>
  <div className="relative">
    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
    <input
      type="password"
      className="w-full pl-10 pr-4 py-3 border border-gray-200 dark:border-gray-600 rounded-xl focus:border-primary-500 focus:outline-none transition bg-white dark:bg-gray-700 dark:text-white"
      placeholder="••••••••"
      required
    />
  </div>
</div>
```

### 6. Error Display
```tsx
{error && (
  <div className="p-3 bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-lg text-sm">
    {error}
  </div>
)}
```
- **Position**: Top of form, before fields
- **Style**: Red background (10% opacity dark), rounded-lg

### 7. Submit Button
```tsx
<button type="submit" disabled={loading} className="w-full py-3 bg-primary-600 text-white rounded-xl font-medium hover:bg-primary-700 disabled:opacity-50 transition flex items-center justify-center gap-2">
  {loading ? "Signing in..." : "Sign In"}
  <ArrowRight className="w-5 h-5" />
</button>
```
- **Full Width**: w-full
- **Loading State**: Text change + disabled
- **Icon**: ArrowRight trailing

### 8. Register Link
```tsx
<p className="mt-6 text-center text-gray-600 dark:text-gray-300">
  Don't have an account?{" "}
  <button onClick={() => router.push("/register")} className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium">
    Sign up
  </button>
</p>
```

## Authentication Logic
```tsx
const { login, user } = useAuth();
const router = useRouter();

useEffect(() => {
  if (user) router.push("/");  // Redirect if already logged in
}, [user, router]);

const handleSubmit = async (e) => {
  e.preventDefault();
  setError("");
  setLoading(true);
  try {
    await login(email, password);
    router.push("/");
  } catch (err) {
    setError(err.response?.data?.error || "Login failed");
  } finally {
    setLoading(false);
  }
};
```
- **Auto-redirect**: If user exists → /
- **Error Handling**: API error → setError
- **Loading**: Disables button, shows "Signing in..."

## Dark Mode
- All colors use `dark:` variants
- Card: `dark:bg-gray-800`
- Inputs: `dark:bg-gray-700`, `dark:border-gray-600`, `dark:text-white`
- Labels: `dark:text-gray-300`
- Error: `dark:bg-red-900/30`, `dark:text-red-400`
- Links: `dark:text-primary-400`, `dark:hover:text-primary-300`

## Responsive
- **Mobile**: Full width card, stacked form
- **Tablet/Desktop**: Centered max-w-md card
- **Input Height**: 40px minimum (py-3) for touch

## Accessibility
- **Labels**: Explicit label + htmlFor (implicit via wrapping)
- **Required**: required attribute on both fields
- **Autocomplete**: email, current-password
- **Focus**: Border color change (primary-500)
- **Error**: aria-invalid on error (could add)
- **Keyboard**: Enter submits form

## Code Reference
- **File**: `frontend/src/app/login/page.tsx` (lines 1-146)
- **Hooks**: useAuth, useTheme, useRouter, useState, useEffect
- **Icons**: ArrowRight, Lock, Mail, Sparkles (lucide-react)
- **API**: authAPI.login via useAuth

## Do's and Don'ts
| ✅ Do | ❌ Don't |
|-------|----------|
| Redirect authenticated users | Show login to logged-in users |
| Show specific error messages | Generic "Error occurred" |
| Disable button during submit | Allow double submissions |
| Use proper input types | type="text" for password |
| Preserve dark mode preference | Reset theme on auth pages |

## Future Enhancements
- "Remember me" checkbox
- Forgot password link
- Social login (Google, GitHub)
- 2FA support
- Magic link login
- Password visibility toggle
- Rate limiting UI feedback