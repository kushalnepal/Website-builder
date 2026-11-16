# Builder/Editor Page Specification

## Route
`/builder/[id]` (Dynamic route)

## File
`frontend/src/app/builder/[id]/page.tsx` (279 lines)

## Purpose
Visual website editor - AI-powered editing sidebar + live preview. Core value delivery page.

## Layout Structure
```
1. Fixed Header (sticky, z-50)
2. Balen City Banner
3. Split View (Flex)
   - Left: Editor Sidebar (320px, editor mode only)
   - Right: Preview Area (flex-1)
```

## Detailed Sections

### 1. Fixed Header
**Spec**: See `components/header.md` - Builder variant
```tsx
<header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="flex justify-between items-center h-16">
      {/* Left: Back + Breadcrumb */}
      <div className="flex items-center gap-4">
        <button onClick={backToDashboard} className="p-2 text-gray-400 hover:text-gray-600">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <button onClick={backToDashboard} className="flex items-center gap-2 hover:opacity-80">
          <Sparkles className="w-8 h-8 text-primary-600" />
          <span className="text-xl font-bold text-gray-900 dark:text-white">BuildMySite</span>
        </button>
        <span className="text-gray-400">/</span>
        <span className="text-gray-600 dark:text-gray-300">{website.name}</span>
      </div>
      
      {/* Right: Toolbar */}
      <div className="flex items-center gap-2">
        <DarkModeToggle />
        {/* Status Badge */}
        <span className={`px-2 py-1 text-xs rounded-full ${statusColors}`}>
          {website.status}
        </span>
        {/* View Mode Toggle */}
        <button onClick={() => setView("editor")} className="p-2 text-gray-400 hover:text-gray-600" title="Edit Website">
          <Edit2 className="w-5 h-5" />
        </button>
        <button onClick={() => setView("preview")} className="p-2 text-gray-400 hover:text-gray-600" title="Preview Mode">
          <Eye className="w-5 h-5" />
        </button>
        {/* Logout */}
        <button onClick={logout} className="p-2 text-gray-400 hover:text-gray-600">
          <LogOut className="w-5 h-5" />
        </button>
      </div>
    </div>
  </div>
</header>
```

**Key Elements**:
- **Back Button**: ArrowLeft, returns to /dashboard
- **Breadcrumb**: Logo / Website Name
- **Status Badge**: Green (published) / Yellow (draft)
- **View Toggle**: Edit2 (editor) / Eye (preview)
- **DarkModeToggle**: Standard
- **Logout**: LogOut icon

### 2. Balen City Banner
**Same pattern**: `py-2 text-center`, flag + text
- **Background**: `bg-gray-50 dark:bg-gray-900`

### 3. Split View Container
```tsx
<div className="flex">
  {/* Editor Sidebar - Conditional */}
  {view === "editor" && (
    <div className="w-80 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 h-[calc(100vh-120px)] overflow-y-auto">
      {/* Editor Content */}
    </div>
  )}
  
  {/* Preview Area - Always visible */}
  <div className={`${view === "editor" ? "w-[calc(100%-320px)]" : ""} flex-1`}>
    {/* Preview Content */}
  </div>
</div>
```

**Dimensions**:
- **Sidebar**: 320px (w-80), fixed height `calc(100vh - 120px)` (header + banner)
- **Preview**: `flex-1`, width `calc(100% - 320px)` in editor mode, full width in preview
- **Scroll**: Sidebar scrolls independently (`overflow-y-auto`)

---

## Editor Sidebar (View === "editor")

### Container
```tsx
<div className="w-80 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 h-[calc(100vh-120px)] overflow-y-auto">
  <div className="p-4">
    <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Edit Website</h3>
    {/* Edit Form */}
  </div>
</div>
```

### Edit Form
```tsx
<div className="space-y-4">
  {/* Instruction Input */}
  <div>
    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
      What would you like to change?
    </label>
    <textarea
      value={editPrompt}
      onChange={(e) => setEditPrompt(e.target.value)}
      placeholder="e.g., Change the hero section title to something more catchy"
      className="w-full h-24 p-3 border border-gray-200 dark:border-gray-600 rounded-lg focus:border-primary-500 focus:outline-none resize-none bg-white dark:bg-gray-700 dark:text-white"
    />
    <button
      onClick={handleEdit}
      disabled={editing || !editPrompt.trim()}
      className="mt-2 w-full py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50 transition"
    >
      {editing ? "Applying..." : "Apply Changes"}
    </button>
  </div>
  
  {/* Quick Actions */}
  <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
    <h4 className="font-medium text-gray-900 dark:text-white mb-2">Quick Actions</h4>
    <div className="space-y-2">
      <QuickActionButton 
        prompt="Change the hero section title to something more catchy"
      >
        Update Hero Title
      </QuickActionButton>
      <QuickActionButton 
        prompt="Add a new service section with 3 services"
      >
        Add Services
      </QuickActionButton>
      <QuickActionButton 
        prompt="Update the color theme to blue and white"
      >
        Change Colors
      </QuickActionButton>
    </div>
  </div>
</div>
```

### Quick Action Button
```tsx
<button
  onClick={() => setEditPrompt(prompt)}
  className="w-full text-left px-3 py-2 text-sm text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg"
>
  {label}
</button>
```

---

## Preview Area

### Header
```tsx
<div className="p-4">
  <div className="flex justify-between items-center mb-4">
    <h2 className="font-semibold text-gray-900 dark:text-white">Preview</h2>
    <div className="flex gap-2">
      {/* Published: View Live | Draft: Publish Button */}
      {website.publishedUrl ? (
        <a href={website.publishedUrl} target="_blank" rel="noopener noreferrer" className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition flex items-center gap-2">
          <Globe className="w-4 h-4" />
          View Live
        </a>
      ) : (
        <button onClick={handlePublish} className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition flex items-center gap-2">
          <Globe className="w-4 h-4" />
          Publish
        </button>
      )}
    </div>
  </div>
  
  {/* Renderer Container */}
  <div className="bg-gray-200 dark:bg-gray-700 rounded-xl overflow-hidden" style={{ height: "calc(100vh - 200px)" }}>
    <WebsiteRenderer data={website.websiteJson} />
  </div>
</div>
```

### Renderer Container
- **Background**: `bg-gray-200 dark:bg-gray-700` (contrasts with white website)
- **Radius**: rounded-xl
- **Height**: `calc(100vh - 200px)` (header + banner + padding)
- **Overflow**: Hidden (WebsiteRenderer handles internal scroll)
- **Component**: `<WebsiteRenderer data={website.websiteJson} />`

---

## State Management

```tsx
const [website, setWebsite] = useState<WebsiteData | null>(null);
const [loading, setLoading] = useState(true);
const [view, setView] = useState<"editor" | "preview">("editor");
const [editPrompt, setEditPrompt] = useState("");
const [editing, setEditing] = useState(false);
```

## Data Fetching
```tsx
const fetchWebsite = async () => {
  try {
    const res = await websitesAPI.get(params.id as string);
    setWebsite(res.data.website);
  } catch (error) {
    router.push("/dashboard");
  } finally {
    setLoading(false);
  }
};

useEffect(() => {
  if (!user) { router.push("/login"); return; }
  fetchWebsite();
}, [user]);
```

## AI Editing
```tsx
const handleEdit = async () => {
  if (!editPrompt.trim() || !website) return;
  setEditing(true);
  try {
    const res = await websitesAPI.edit(website.id, { instruction: editPrompt });
    setWebsite(res.data.website);
    setEditPrompt("");
  } catch (error) {
    alert("Failed to edit website");
  } finally {
    setEditing(false);
  }
};
```
- **Endpoint**: POST `/websites/:id/edit` with `{ instruction }`
- **Response**: Full updated websiteJson
- **State Update**: Replace entire website object

## Publishing
```tsx
const handlePublish = async () => {
  if (!website) return;
  try {
    const res = await websitesAPI.publish(website.id);
    setWebsite(res.data.website);
    alert("Website published successfully!");
  } catch (error) {
    alert("Failed to publish website");
  }
};
```
- **Endpoint**: POST `/websites/:id/publish`
- **Result**: status → "published", publishedUrl generated
- **UI Update**: Button changes to "View Live" link

## Loading State
```tsx
if (loading || !website) {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center">
      <div className="text-center">
        <Sparkles className="w-12 h-12 text-primary-600 mx-auto animate-pulse" />
        <p className="mt-4 text-gray-600 dark:text-gray-300">Loading website...</p>
      </div>
    </div>
  );
}
```

## Dark Mode
- **Page BG**: `bg-gray-100 dark:bg-gray-900`
- **Header**: `bg-white dark:bg-gray-800`, border `dark:border-gray-700`
- **Banner**: `bg-gray-50 dark:bg-gray-900`
- **Sidebar**: `bg-white dark:bg-gray-800`, border `dark:border-gray-700`
- **Preview BG**: `bg-gray-200 dark:bg-gray-700`
- **Quick Actions**: `dark:hover:bg-gray-700`
- **Textarea**: `dark:bg-gray-700`, `dark:border-gray-600`, `dark:text-white`

## Responsive Behavior
| Breakpoint | Sidebar | Preview |
|------------|---------|---------|
| < 1024px | Hidden (drawer?) | Full width |
| ≥ 1024px | 320px fixed | calc(100% - 320px) |
| Preview Mode | Hidden | 100% width |

**Current Limitation**: No mobile sidebar - editor mode requires desktop

## Keyboard Shortcuts (Future)
| Key | Action |
|-----|--------|
| E | Toggle Edit mode |
| P | Toggle Preview mode |
| Cmd/Ctrl + S | Save/Apply changes |
| Cmd/Ctrl + Enter | Publish |

## Code Reference
- **File**: `frontend/src/app/builder/[id]/page.tsx` (lines 1-279)
- **Components**: WebsiteRenderer, DarkModeToggle
- **API**: websitesAPI.get, edit, publish
- **Icons**: ArrowLeft, Edit2, Eye, Globe, LogOut, Sparkles

## Do's and Don'ts
| ✅ Do | ❌ Don't |
|-------|----------|
| Auto-save edit prompt | Lose prompt on view switch |
| Show loading during AI edit | Freeze UI without feedback |
| Optimistic preview update | Wait for full re-render |
| Disable apply when empty | Allow empty submissions |
| Preserve scroll position | Reset scroll on edit |

## Future Enhancements
- Mobile sidebar (slide-over drawer)
- Real-time collaboration
- Version history / undo
- Component inspector (click to edit)
- Drag-drop section reordering
- Responsive preview toggles
- Custom CSS injection
- Code export from builder
- Multi-page navigation
- Preview in new tab
- Share preview link (temporary)