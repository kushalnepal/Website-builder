# AI Generation Interaction Specification

## BuildMySite AI Website Generation

Complete interaction specification for prompt-to-website generation, editing, and publishing.

---

## Overview

AI generation is the core value proposition. Users describe their business in natural language, and the system generates a complete website JSON structure.

---

## Generation Flow

### User Journey
```
1. User enters prompt (Landing, Dashboard, or Builder)
2. Client validation (non-empty)
3. Auth check (redirect to /login if needed)
4. Loading state activated
5. API POST /api/websites/generate { prompt }
7. Backend: buildPrompt() → Kilo API → Parse JSON → Save to DB
8. Success → Redirect to /builder/[id]
9. Error → Toast/alert, loading cleared
```

### Landing Page Generation (`/`)
```typescript
const handleGenerate = async () => {
  if (!prompt.trim()) return;
  
  if (!user) {
    router.push("/login");  // Auth gate
    return;
  }
  
  setLoading(true);
  try {
    const res = await websitesAPI.generate({ prompt });
    router.push(`/builder/${res.data.website.id}`);
  } catch (error) {
    alert("Failed to generate website. Please try again.");
  } finally {
    setLoading(false);
  }
};
```

### Dashboard Generation (`/dashboard`)
```typescript
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

---

## Prompt Input Components

### Landing Hero (Large)
```tsx
<textarea
  placeholder="Describe your website... (e.g., A Nepali restaurant in Kathmandu called Himalayan Kitchen serving traditional momos and thali)"
  className="h-32 p-4 pr-16 text-lg border-2 rounded-2xl"
/>
<button className="absolute bottom-4 right-4">
  {loading ? <Sparkles className="animate-spin" /> : <ArrowRight />}
</button>
```

### Dashboard Expandable (Medium)
```tsx
<textarea
  placeholder="A Nepali restaurant in Kathmandu..."
  className="h-24 p-4 border rounded-xl"
/>
<button className="mt-4 w-full" disabled={generating}>
  {generating ? "Generating..." : "Generate Website"}
</button>
```

### Quick Suggestions (Landing Only)
```tsx
["Restaurant in Kathmandu", "Trekking agency", "E-commerce shop", "Portfolio"]
  .map(tag => (
    <button onClick={() => setPrompt(tag)} className="rounded-full px-4 py-1">
      {tag}
    </button>
  ))
```

---

## Backend AI Pipeline

### Prompt Engineering (`websitePrompt.ts`)
```typescript
const WEBSITE_GENERATION_PROMPT = `
You are an expert AI website builder. Generate complete website JSON.
- Valid JSON only (NO markdown, NO explanations)
- Include ALL sections: navbar, hero, about, services, features, gallery, testimonials, contact, footer
- Use business-appropriate color schemes
- Nepal context: +977 phone, Kathmandu locations
`;

export const buildPrompt = (userInput: string) => 
  WEBSITE_GENERATION_PROMPT + userInput;
```

### AI Service Chain (`aiService.ts`)
```
generateWebsite(prompt)
    │
    ├─► buildPrompt(prompt) → Full system prompt
    │
    ├─► Kilo API (Primary)
    │       POST https://api.kilo.ai/v1/chat/completions
    │       Model: gpt-4o, temp: 0.7, max_tokens: 4000
    │       Headers: Authorization: Bearer KILO_API_KEY
    │       ↓ Success: Parse JSON → Return
    │       ↓ Fail: Try OpenAI
    │
    ├─► OpenAI API (Fallback)
    │       POST https://api.openai.com/v1/chat/completions
    │       Same params, Authorization: Bearer OPENAI_API_KEY
    │       ↓ Success: Parse JSON → Return
    │       ↓ Fail: Use demo template
    │
    └─► Demo Template (Last Resort)
            Restaurant / Trekking / Business templates
            Returns hardcoded JSON matching schema
```

### JSON Parsing
```typescript
// Strip markdown code fences
const cleanJson = jsonContent
  .replace(/```json\n?/g, "")
  .replace(/```\n?/g, "")
  .trim();

const websiteData = JSON.parse(cleanJson);
// Validate required fields...
return websiteData;
```

---

## Loading States

### Button States
| State | Text | Icon | Disabled |
|-------|------|------|----------|
| Idle | "Generate" / "Generate Website" | ArrowRight | No |
| Loading | "Generating..." | Sparkles (spin) | Yes |
| Error | "Generate" | ArrowRight | No |

### Visual Feedback
```tsx
// Landing: Absolute button
<button disabled={loading || !prompt.trim()} className="disabled:opacity-50">
  {loading ? (
    <> <Sparkles className="w-5 h-5 animate-spin" /> Generating... </>
  ) : (
    <> Generate <ArrowRight className="w-5 h-5" /> </>
  )}
</button>

// Dashboard: Full-width button
<button disabled={generating || !prompt.trim()} className="disabled:opacity-50">
  {generating ? "Generating..." : "Generate Website"}
</button>
```

### Global Loading (Could Add)
- Page-level loading bar (NProgress)
- Skeleton preview in builder
- Progress steps: "Analyzing prompt..." → "Designing layout..." → "Generating content..." → "Finalizing..."

---

## Error Handling

### Client-Side Errors
| Error | Message | Recovery |
|-------|---------|----------|
| Empty prompt | Button disabled | Enter prompt |
| Not authenticated | Redirect to /login | Login |
| Network failure | "Failed to generate website" | Retry button |
| Timeout | "Request timed out" | Retry |

### Server-Side Errors (Returned to Client)
| Error | HTTP | User Message |
|-------|------|--------------|
| Missing prompt | 400 | "Prompt is required" |
| AI API failure | 500 | "Failed to generate website" |
| JSON parse error | 500 | "Failed to generate website" |
| DB save error | 500 | "Failed to save website" |
| Quota exceeded | 429 | "Too many requests, try again later" |

### Fallback Chain Transparency
- **Not exposed to user** - seamless fallback
- **Logged server-side** for debugging
- **Demo template** matches user prompt type when possible

---

## AI Editing Flow (Builder)

### User Action
```
1. User in Builder → Editor mode
2. Types instruction: "Change hero title to Best Pizza in Town"
3. Clicks "Apply Changes"
4. Loading: "Applying..."
5. API POST /api/websites/:id/edit { instruction }
6. Backend: editWebsite(currentJSON, instruction) → New JSON
7. Success → Update WebsiteRenderer preview
8. Clear input field
```

### Quick Actions (Pre-filled Prompts)
```tsx
const quickActions = [
  { label: "Update Hero Title", prompt: "Change the hero section title to something more catchy" },
  { label: "Add Services", prompt: "Add a new service section with 3 services" },
  { label: "Change Colors", prompt: "Update the color theme to blue and white" },
];
```

### Edit Loading State
```tsx
<button disabled={editing || !editPrompt.trim()}>
  {editing ? "Applying..." : "Apply Changes"}
</button>
```

### Error Recovery
```typescript
try {
  const res = await websitesAPI.edit(website.id, { instruction: editPrompt });
  setWebsite(res.data.website);
  setEditPrompt("");
} catch (error) {
  alert("Failed to edit website");  // Could improve to toast
  // Input preserved for retry
} finally {
  setEditing(false);
}
```

---

## Prompt Guidelines (User Education)

### Good Prompts
- **Specific**: "A Nepali restaurant in Kathmandu called Himalayan Kitchen serving traditional momos and dal bhat"
- **Business type clear**: "Trekking agency offering Everest base camp tours"
- **Location included**: "Kathmandu", "Pokhara", "Chitwan"
- **Unique details**: "Family-run since 1995", "Organic ingredients"

### Poor Prompts
- **Vague**: "A website"
- **No business type**: "Make me a site"
- **No location**: "Restaurant"
- **Too abstract**: "Something modern and cool"

### Quick Suggestion Tags (Landing)
```tsx
const suggestions = [
  "Restaurant in Kathmandu",
  "Trekking agency", 
  "E-commerce shop",
  "Portfolio"
];
```

---

## AI Response Schema Validation

### Required Fields Check
```typescript
const requiredFields = [
  'website_name',
  'business_type',
  'tagline',
  'theme',
  'pages'
];

const requiredThemeFields = [
  'primary_color',
  'secondary_color', 
  'accent_color',
  'font_family',
  'tone'
];

const requiredPageSections = [
  'navbar', 'hero', 'about', 'services', 
  'features', 'gallery', 'testimonials', 'contact', 'footer'
];
```

### Fallback on Validation Failure
```typescript
if (!validationPassed) {
  console.warn("AI response missing required fields, using demo template");
  return getDemoTemplate(userPrompt);
}
```

---

## Performance Metrics

### Target Timings
| Operation | Target | Current |
|-----------|--------|---------|
| Prompt → API request | < 100ms | ~50ms |
| Kilo API response | < 10s | ~3-8s |
| OpenAI fallback | < 15s | ~5-12s |
| JSON parse + validate | < 100ms | ~20ms |
| DB save | < 500ms | ~100ms |
| **Total (success)** | **< 12s** | **~4-10s** |

### Optimization Opportunities
- [ ] Streaming response (show partial)
- [ ] Prompt caching for similar requests
- [ ] Parallel demo template preparation
- [ ] WebSocket for real-time progress

---

## Analytics & Monitoring

### Track Events
```typescript
// Generation started
analytics.track('generation_started', { promptLength, userId });

// Generation completed
analytics.track('generation_completed', { 
  duration, 
  provider: 'kilo' | 'openai' | 'demo',
  websiteId 
});

// Generation failed
analytics.track('generation_failed', { 
  error, 
  provider, 
  duration 
});
```

---

## Future Enhancements

1. **Streaming Generation** - Show sections as they're generated
2. **Prompt Templates** - Pre-built prompts for common types
3. **Iterative Refinement** - Chat-style "Make the hero bigger"
4. **Image Generation** - AI-generated hero images
5. **Multi-page Prompts** - "Create a 5-page site with blog"
6. **Style Transfer** - "Make it look like Apple.com"
7. **A/B Variants** - Generate 3 options, user picks
8. **Prompt History** - Recent prompts dropdown

---

## Related Files
- `backend/src/services/aiService.ts`
- `backend/src/prompts/websitePrompt.ts`
- `backend/src/routes/websites.ts`
- `frontend/src/app/page.tsx` (landing generation)
- `frontend/src/app/dashboard/page.tsx` (dashboard generation)
- `frontend/src/app/builder/[id]/page.tsx` (editing)
- `frontend/src/components/WebsiteRenderer.tsx` (rendering)
- `UI_specs/components/prompt-input.md`
- `UI_specs/pages/landing-page.md`
- `UI_specs/pages/dashboard-page.md`
- `UI_specs/pages/builder-page.md`