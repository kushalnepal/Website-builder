# Editor Interactions Specification

## BuildMySite Builder/Editor

Complete interaction specification for the split-view editor with AI-powered editing and live preview.

---

## Overview

The builder (`/builder/[id]`) is a split-view interface:
- **Left Sidebar (320px)**: AI editing controls (Editor mode only)
- **Right Panel (flex-1)**: Live preview with WebsiteRenderer
- **Toolbar**: View toggle, publish, dark mode, logout

---

## Layout & Responsive

### Desktop (≥1024px)
```
┌─────────────────────────────────────────────────────────────┐
│ Header (sticky)                                             │
├──────────────┬──────────────────────────────────────────────┤
│ Editor       │ Preview                                      │
│ Sidebar      │                                              │
│ (320px)      │ (calc(100% - 320px))                         │
│              │                                              │
│              │                                              │
└──────────────┴──────────────────────────────────────────────┘
```

### Tablet (768-1023px)
- Sidebar collapses to drawer (slide-over)
- Preview full width
- Hamburger menu in header to toggle

### Mobile (<768px)
- Editor mode: Full-screen drawer
- Preview mode: Full-screen preview
- Bottom sheet for quick actions

---

## Header Toolbar

### Elements (Left to Right)
```
[Back]  [Logo] / [Website Name]  [Status Badge]  [Edit] [Preview] [DarkMode] [Logout]
```

### Interactions

| Element | Action | State Change |
|---------|--------|--------------|
| Back Button | `router.push("/dashboard")` | Navigate away |
| Logo/Breadcrumb | `router.push("/dashboard")` | Navigate away |
| Status Badge | Display only | - |
| Edit Button | `setView("editor")` | Show sidebar |
| Preview Button | `setView("preview")` | Hide sidebar |
| DarkModeToggle | `toggleDarkMode()` | Theme toggle |
| Logout | `logout(); router.push("/")` | Clear auth, redirect |

### Status Badge States
```tsx
const statusColors = 
  website.status === 'published'
    ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
    : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400';
```

---

## Editor Sidebar (View === "editor")

### Layout
```tsx
<div className="w-80 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 
                h-[calc(100vh-120px)] overflow-y-auto">
  <div className="p-4">
    <h3>Edit Website</h3>
    {/* Edit Form */}
    {/* Quick Actions */}
  </div>
</div>
```

### Edit Form

#### Instruction Input
```tsx
<textarea
  placeholder="e.g., Change the hero section title to something more catchy"
  className="w-full h-24 p-3 border rounded-lg"
  value={editPrompt}
  onChange={e => setEditPrompt(e.target.value)}
/>
```

#### Apply Button
```tsx
<button 
  disabled={editing || !editPrompt.trim()}
  className="mt-2 w-full py-2 bg-primary-600 text-white rounded-lg disabled:opacity-50"
>
  {editing ? "Applying..." : "Apply Changes"}
</button>
```

#### Apply Flow
```
1. User types instruction
2. Button enables when text present
3. Click → setEditing(true)
4. API POST /websites/:id/edit { instruction }
5. Success → setWebsite(newData), setEditPrompt("")
6. Error → alert("Failed to edit website")
7. Finally → setEditing(false)
```

### Quick Actions
```tsx
const quickActions = [
  { label: "Update Hero Title", prompt: "Change the hero section title to something more catchy" },
  { label: "Add Services", prompt: "Add a new service section with 3 services" },
  { label: "Change Colors", prompt: "Update the color theme to blue and white" },
];

<div className="space-y-2">
  {quickActions.map(action => (
    <button
      key={action.label}
      onClick={() => setEditPrompt(action.prompt)}
      className="w-full text-left px-3 py-2 text-sm hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg"
    >
      {action.label}
    </button>
  ))}
</div>
```

**Behavior**: Click → Pre-fills textarea → User can modify → Click Apply

---

## Preview Area

### Header
```tsx
<div className="p-4">
  <div className="flex justify-between items-center mb-4">
    <h2>Preview</h2>
    <div className="flex gap-2">
      {website.publishedUrl ? (
        <a href={website.publishedUrl} target="_blank" className="bg-green-600...">
          <Globe /> View Live
        </a>
      ) : (
        <button onClick={handlePublish} className="bg-primary-600...">
          <Globe /> Publish
        </button>
      )}
    </div>
  </div>
```

### Publish Flow
```
1. Click "Publish" (draft) or "View Live" (published)
2. If draft:
   - POST /websites/:id/publish
   - Success → setWebsite(publishedData), alert("Published!")
   - Button changes to "View Live" link
3. If published:
   - Opens publishedUrl in new tab
```

### Preview Container
```tsx
<div className="bg-gray-200 dark:bg-gray-700 rounded-xl overflow-hidden" 
     style={{ height: "calc(100vh - 200px)" }}>
  <WebsiteRenderer data={website.websiteJson} />
</div>
```

**Dimensions**:
- Height: `calc(100vh - 200px)` (accounts for header + banner + padding)
- Background: Gray-200/700 (contrasts with white website)
- Overflow: Hidden (WebsiteRenderer scrolls internally)

### WebsiteRenderer Integration
```tsx
<WebsiteRenderer data={website.websiteJson} />
```
- Receives full website JSON
- Renders sections dynamically
- Applies theme colors via CSS variables
- Supports multi-page (currently only page[0])

---

## View Modes

### Editor Mode (`view === "editor"`)
- Sidebar visible (320px)
- Preview width: `calc(100% - 320px)`
- Edit form active
- Quick actions available

### Preview Mode (`view === "preview"`)
- Sidebar hidden
- Preview width: 100%
- Clean preview experience
- No editing controls

### Toggle Behavior
```tsx
const [view, setView] = useState<"editor" | "preview">("editor");

<button onClick={() => setView("editor")} title="Edit Website">
  <Edit2 />
</button>
<button onClick={() => setView("preview")} title="Preview Mode">
  <Eye />
</button>
```

---

## Loading & Error States

### Initial Load
```tsx
if (loading || !website) {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <Sparkles className="w-12 h-12 text-primary-600 animate-pulse" />
      <p>Loading website...</p>
    </div>
  );
}
```

### Edit Error
```tsx
} catch (error) {
  alert("Failed to edit website");  // Could improve to toast
  // Input preserved for retry
} finally {
  setEditing(false);
}
```

### Publish Error
```tsx
} catch (error) {
  alert("Failed to publish website");
}
```

### Delete (from Dashboard)
```tsx
const handleDelete = async (id) => {
  if (!confirm("Are you sure you want to delete this website?")) return;
  await websitesAPI.delete(id);
  setWebsites(websites.filter(w => w.id !== id));
};
```

---

## Keyboard Shortcuts (Future)

| Shortcut | Action | Context |
|----------|--------|---------|
| `E` | Toggle Edit mode | Anywhere in builder |
| `P` | Toggle Preview mode | Anywhere in builder |
| `Cmd/Ctrl + S` | Apply changes | Editor mode, focus in textarea |
| `Cmd/Ctrl + Enter` | Publish | Anywhere |
| `Escape` | Close sidebar / Cancel edit | Editor mode |
| `Tab` | Navigate toolbar | Header focus |

---

## Auto-Save (Future)

### Current: Manual Apply
- User must click "Apply Changes"
- No auto-save

### Proposed: Auto-Save
```
1. User types in textarea
2. Debounce 2s
3. If text changed → Auto-apply
4. Show "Saving..." indicator
5. Success → "Saved" toast
6. Error → "Failed to save" + retry button
```

---

## Collaboration (Future)

### Real-time Presence
- Show other editors' cursors
- Lock sections being edited
- Conflict resolution

### Comments
- Click section → Add comment
- Threaded discussions
- @mentions

---

## Accessibility

### Focus Management
- Sidebar focus trap when open (mobile)
- Toolbar keyboard navigation
- Skip to preview link

### Screen Readers
```tsx
<button aria-label="Edit website" title="Edit Website">
  <Edit2 />
</button>

<button aria-label="Preview website" title="Preview Mode">
  <Eye />
</button>

<div role="region" aria-label="Website preview">
  <WebsiteRenderer />
</div>
```

### ARIA Live Regions
```tsx
<div aria-live="polite" aria-atomic="true">
  {editing && <span className="sr-only">Applying changes...</span>}
  {generating && <span className="sr-only">Generating website...</span>}
</div>
```

---

## Performance

### Current
- WebsiteRenderer re-renders on every `websiteJson` change
- No memoization
- Full re-render on edit

### Optimizations (Future)
- `React.memo(WebsiteRenderer)`
- `useMemo` for section components
- Virtualized rendering for long pages
- Debounced preview updates

---

## Related Files
- `frontend/src/app/builder/[id]/page.tsx`
- `frontend/src/components/WebsiteRenderer.tsx`
- `frontend/src/components/ThemeProvider.tsx`
- `frontend/src/components/DarkModeToggle.tsx`
- `frontend/src/lib/api.ts`
- `UI_specs/components/website-renderer.md`
- `UI_specs/pages/builder-page.md`
- `UI_specs/interactions/ai-generation.md`