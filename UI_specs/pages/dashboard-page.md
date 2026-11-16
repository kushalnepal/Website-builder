# Dashboard Page Specification

## Route
`/dashboard`

## File
`frontend/src/app/dashboard/page.tsx` (225 lines)

## Purpose
Authenticated user dashboard - manage websites, create new ones, view status.

## Layout Structure
```
1. Fixed Header (user info, logout)
2. Balen City Banner
3. Main Content (max-w-7xl)
   - Create New Website (expandable)
   - Websites Grid (3-col) or Empty State
```

## Detailed Sections

### 1. Fixed Header
**Spec**: See `components/header.md` - Authenticated variant
- Logo + User name + DarkModeToggle + Logout button
- Background: `bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700`

### 2. Balen City Banner
```tsx
<div className="bg-gray-50 dark:bg-gray-900 py-2 text-center">
  <span className="text-sm font-medium text-gray-500">Powered by </span>
  <img src={flagUrl} alt="Balen City" className="h-6 w-auto inline mx-1" />
  <span className="text-sm font-medium text-gray-500">Balen City</span>
</div>
```
- **Background**: Matches page bg (gray-50/900)
- **Flag**: h-6, dynamic dark/light

### 3. Main Content
**Container**: `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8`

#### A. Create New Website Section
```tsx
<div className="mb-8">
  {/* Trigger Button */}
  <button className="flex items-center gap-2 px-6 py-3 bg-primary-600 text-white rounded-xl hover:bg-primary-700 transition">
    <Plus className="w-5 h-5" />
    Create New Website
  </button>
  
  {/* Expandable Form */}
  {showNewPrompt && (
    <div className="mt-4 bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6">
      <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Describe your website</h3>
      <textarea
        className="w-full h-24 p-4 border border-gray-200 dark:border-gray-600 rounded-xl focus:border-primary-500 focus:outline-none resize-none bg-white dark:bg-gray-700 dark:text-white"
        placeholder="A Nepali restaurant in Kathmandu..."
      />
      <button className="mt-4 px-6 py-2 bg-primary-600 text-white rounded-xl hover:bg-primary-700 disabled:opacity-50">
        {generating ? "Generating..." : "Generate Website"}
      </button>
    </div>
  )}
</div>
```
- **Trigger**: Primary button with Plus icon
- **Form**: Card with shadow-sm, p-6, appears on click
- **Textarea**: h-24 (96px), standard styling
- **Button**: Full width, mt-4

#### B. Websites Grid
**Heading**: `text-2xl font-bold text-gray-900 dark:text-white mb-6` - "Your Websites"

**Loading State**:
```tsx
<div className="text-center py-12">
  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
</div>
```

**Empty State**:
```tsx
<div className="text-center py-12 bg-white dark:bg-gray-800 rounded-2xl">
  <Layout className="w-12 h-12 text-gray-400 mx-auto mb-4" />
  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">No websites yet</h3>
  <p className="text-gray-600 dark:text-gray-300">Create your first website to get started</p>
</div>
```

**Grid**: `grid md:grid-cols-3 gap-6`

**Website Cards**: See `components/card.md` - Website variant
```tsx
<div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm overflow-hidden">
  {/* Header - 128px gradient */}
  <div className="h-32 bg-gradient-to-br from-primary-100 to-primary-200 dark:from-primary-900 dark:to-primary-800 flex items-center justify-center">
    <Layout className="w-12 h-12 text-primary-400" />
  </div>
  
  {/* Content */}
  <div className="p-4">
    <h3 className="font-semibold text-gray-900 dark:text-white mb-1">{name}</h3>
    <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
      Created {date.toLocaleDateString()}
    </p>
    <div className="flex items-center justify-between">
      {/* Status Badge */}
      <span className={`px-2 py-1 text-xs rounded-full ${
        status === 'published'
          ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
          : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'
      }`}>
        {status}
      </span>
      
      {/* Actions */}
      <div className="flex gap-2">
        <button onClick={edit} className="p-2 text-gray-400 hover:text-primary-600">
          <Edit className="w-4 h-4" />
        </button>
        {status === 'published' && (
          <button className="p-2 text-gray-400 hover:text-green-600">
            <Globe className="w-4 h-4" />
          </button>
        )}
        <button onClick={delete} className="p-2 text-gray-400 hover:text-red-600">
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  </div>
</div>
```

**Actions**:
- **Edit**: Navigate to `/builder/${id}`
- **View Live**: Only if published, opens publishedUrl
- **Delete**: Confirm dialog → API delete → Remove from list

## Data Fetching
```tsx
const fetchWebsites = async () => {
  try {
    const res = await websitesAPI.list();
    setWebsites(res.data.websites);
  } catch (error) {
    console.error("Failed to fetch websites:", error);
  } finally {
    setLoading(false);
  }
};

useEffect(() => {
  if (!user) { router.push("/login"); return; }
  fetchWebsites();
}, [user]);
```
- **Auto-fetch**: On mount + user change
- **Auth Guard**: Redirect to /login if no user
- **Order**: Backend returns `updatedAt desc`

## Generate New Website
```tsx
const handleGenerate = async () => {
  if (!prompt.trim()) return;
  setGenerating(true);
  try {
    const res = await websitesAPI.generate({ prompt });
    router.push(`/builder/${res.data.website.id}`);
  } catch (error) {
    alert("Failed to generate website");
  } finally {
    setGenerating(false);
  }
};
```
- **Redirect**: Direct to builder on success
- **Error**: Simple alert (could improve)

## Delete Website
```tsx
const handleDelete = async (id) => {
  if (!confirm("Are you sure you want to delete this website?")) return;
  try {
    await websitesAPI.delete(id);
    setWebsites(websites.filter(w => w.id !== id));
  } catch (error) {
    console.error("Failed to delete website:", error);
  }
};
```
- **Confirmation**: Native confirm dialog
- **Optimistic Update**: Filter local state

## Dark Mode
- **Page BG**: `bg-gray-50 dark:bg-gray-900`
- **Header**: `bg-white dark:bg-gray-800`, border `dark:border-gray-700`
- **Banner**: `bg-gray-50 dark:bg-gray-900`
- **Cards**: `bg-white dark:bg-gray-800`
- **Empty State**: `dark:bg-gray-800`
- **Form Card**: `dark:bg-gray-800`
- **Textarea**: `dark:bg-gray-700`, `dark:border-gray-600`, `dark:text-white`
- **Gradients**: `dark:from-primary-900 dark:to-primary-800`

## Responsive
| Element | Mobile | Tablet | Desktop |
|---------|--------|--------|---------|
| Grid | 1 col | 2 col | 3 col |
| Header | Compact | Full | Full |
| Form | Full width | Full width | Full width |

## Code Reference
- **File**: `frontend/src/app/dashboard/page.tsx` (lines 1-225)
- **Hooks**: useAuth, useTheme, useRouter, useState, useEffect
- **API**: websitesAPI.list, generate, delete
- **Icons**: Edit, Globe, Layout, LogOut, Plus, Sparkles, Trash2

## Do's and Don'ts
| ✅ Do | ❌ Don't |
|-------|----------|
| Show creation date | Show only ID |
| Confirm before delete | Delete without confirmation |
| Optimistic UI updates | Wait for server to update list |
| Show status badge clearly | Hide status |
| Redirect to builder on generate | Stay on dashboard |

## Future Enhancements
- Website search/filter
- Sort options (date, name, status)
- Pagination for many websites
- Duplicate website
- Website analytics preview
- Bulk actions (delete multiple)
- Template gallery integration
- Drag-drop reorder