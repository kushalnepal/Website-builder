# Prompt Input Component Specification

## Overview
The core AI interaction component - a textarea with generate button and quick suggestions. Used on landing page, dashboard, and builder.

## Variants

### 1. Landing Page Hero (Large)
**Location**: `/` - Main hero section

```tsx
<div className="max-w-2xl mx-auto">
  <div className="relative">
    <textarea
      value={prompt}
      onChange={...}
      placeholder="Describe your website... (e.g., A Nepali restaurant in Kathmandu called Himalayan Kitchen serving traditional momos and thali)"
      className="w-full h-32 p-4 pr-16 text-lg border-2 border-gray-200 dark:border-gray-700 rounded-2xl resize-none focus:border-primary-500 focus:outline-none transition bg-white dark:bg-gray-800 dark:text-white dark:placeholder-gray-400"
    />
    <button
      className="absolute bottom-4 right-4 px-6 py-2 bg-primary-600 text-white rounded-xl font-medium hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition flex items-center gap-2"
      disabled={loading || !prompt.trim()}
    >
      {loading ? (
        <> <Sparkles className="w-5 h-5 animate-spin" /> Generating... </>
      ) : (
        <> Generate <ArrowRight className="w-5 h-5" /> </>
      )}
    </button>
  </div>
  
  {/* Quick Suggestions */}
  <div className="mt-6 flex flex-wrap justify-center gap-2">
    {suggestions.map(tag => (
      <button
        key={tag}
        onClick={() => setPrompt(tag)}
        className="px-4 py-1 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 text-sm transition"
      >
        {tag}
      </button>
    ))}
  </div>
</div>
```

**Specs**:
- **Textarea**: h-32 (128px), text-lg, border-2, rounded-2xl
- **Button**: Absolute bottom-right, px-6 py-2, rounded-xl
- **Loading**: Sparkles animate-spin + "Generating..."
- **Suggestions**: 4 tags, rounded-full, gray background

### 2. Dashboard Create Website (Medium)
**Location**: `/dashboard` - Expandable section

```tsx
<div className="mt-4 bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6">
  <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
    Describe your website
  </h3>
  <textarea
    value={prompt}
    onChange={...}
    placeholder="A Nepali restaurant in Kathmandu..."
    className="w-full h-24 p-4 border border-gray-200 dark:border-gray-600 rounded-xl focus:border-primary-500 focus:outline-none resize-none bg-white dark:bg-gray-700 dark:text-white"
  />
  <button
    className="mt-4 w-full px-6 py-2 bg-primary-600 text-white rounded-xl hover:bg-primary-700 disabled:opacity-50"
    disabled={generating || !prompt.trim()}
  >
    {generating ? 'Generating...' : 'Generate Website'}
  </button>
</div>
```

**Specs**:
- **Textarea**: h-24 (96px), standard border, rounded-xl
- **Button**: Full width (w-full), mt-4
- **Container**: Card with shadow-sm, p-6

### 3. Builder Editor Sidebar (Compact)
**Location**: `/builder/[id]` - Editor sidebar

```tsx
<div className="space-y-4">
  <div>
    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
      What would you like to change?
    </label>
    <textarea
      value={editPrompt}
      onChange={...}
      placeholder="e.g., Change the hero section title to something more catchy"
      className="w-full h-24 p-3 border border-gray-200 dark:border-gray-600 rounded-lg focus:border-primary-500 focus:outline-none resize-none bg-white dark:bg-gray-700 dark:text-white"
    />
    <button
      className="mt-2 w-full py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50 transition"
      disabled={editing || !editPrompt.trim()}
    >
      {editing ? 'Applying...' : 'Apply Changes'}
    </button>
  </div>
</div>
```

**Specs**:
- **Textarea**: h-24, p-3, rounded-lg (smaller)
- **Button**: Rounded-lg, py-2 (shorter)
- **Label**: Above textarea, text-sm

## Shared Patterns

### Textarea Base
```css
/* Common */
w-full resize-none
focus:border-primary-500 focus:outline-none transition
bg-white dark:bg-gray-700/800 dark:text-white
placeholder:text-gray-400 dark:placeholder-gray-500

/* Dark Mode Backgrounds */
Landing: dark:bg-gray-800
Dashboard: dark:bg-gray-700
Builder: dark:bg-gray-700
```

### Generate Button Base
```css
/* Common */
bg-primary-600 text-white font-medium
hover:bg-primary-700 transition
disabled:opacity-50 disabled:cursor-not-allowed

/* Variants */
Landing: absolute bottom-4 right-4 px-6 py-2 rounded-xl
Dashboard: mt-4 w-full px-6 py-2 rounded-xl
Builder: mt-2 w-full py-2 rounded-lg
```

### Quick Suggestions (Landing Only)
```tsx
const suggestions = [
  "Restaurant in Kathmandu",
  "Trekking agency",
  "E-commerce shop",
  "Portfolio"
];

/* Tag Style */
px-4 py-1 bg-gray-100 dark:bg-gray-800 
text-gray-600 dark:text-gray-300 
rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 
text-sm transition
```

## States

| State | Textarea | Button |
|-------|----------|--------|
| Empty | Placeholder visible | Disabled (opacity-50) |
| Typing | Text input | Enabled |
| Loading | Disabled | Spinner + "Generating..." |
| Error | Border-red-500 (optional) | Enabled, show toast |
| Success | - | Redirects to builder |

## Accessibility
- **Label**: Implicit via placeholder or explicit label (builder)
- **Required**: No (but button disabled when empty)
- **Autocomplete**: off (prevent browser suggestions)
- **Enter Key**: 
  - Landing: Shift+Enter for newline, Enter to generate (if not shifted)
  - Dashboard/Builder: Enter for newline, button click to generate

## Responsive
- **Mobile**: Full width, stacked suggestions (flex-wrap)
- **Tablet**: Max-width constrained (max-w-2xl on landing)
- **Desktop**: Centered, comfortable line length

## Code Reference
- **Files**:
  - `frontend/src/app/page.tsx` (lines 178-222)
  - `frontend/src/app/dashboard/page.tsx` (lines 122-150)
  - `frontend/src/app/builder/[id]/page.tsx` (lines 177-195)

## Do's and Don'ts
| ✅ Do | ❌ Don't |
|-------|----------|
| Disable button when empty | Allow empty submissions |
| Show loading state | Leave button unchanged during AI call |
| Provide example placeholders | Generic "Enter text here" |
| Support keyboard submission | Require mouse click only |
| Clear prompt after generate (landing) | Keep old prompt confusing user |

## Future Enhancements
- Voice input (microphone button)
- Prompt history / recent prompts
- Prompt templates library
- Character/word count
- Auto-save draft
- Prompt enhancement suggestions
- Multi-language placeholder examples