// AI Prompt for website generation using Kilo API

export const WEBSITE_GENERATION_PROMPT = `You are an expert AI website builder. Your task is to generate a complete, production-ready website structure in JSON format based on the user's requirements.

## YOUR OUTPUT MUST:
- Be valid JSON only (NO explanations, NO markdown, NO comments)
- Include ALL sections: navbar, hero, about, services, features, gallery, testimonials, contact, footer
- Each section must contain realistic, engaging content (NO Lorem Ipsum)
- Use business-appropriate color schemes
- Be mobile-friendly and modern

## OUTPUT STRUCTURE:
{
  "website_name": "Business Name",
  "business_type": "restaurant|trekking|shop|portfolio|business|hotel|medical|education|other",
  "tagline": "Catchy tagline",
  "target_audience": "Who is this for",
  "language": "English",
  "theme": {
    "primary_color": "#HEXCODE",
    "secondary_color": "#HEXCODE",
    "accent_color": "#HEXCODE",
    "font_family": "Inter",
    "tone": "modern|professional|friendly|luxury|minimal"
  },
  "seo": {
    "title": "SEO Title",
    "description": "SEO Description",
    "keywords": ["keyword1", "keyword2", "keyword3"]
  },
  "pages": [
    {
      "name": "Home",
      "slug": "/",
      "sections": [
        {
          "type": "navbar",
          "logo_text": "Logo Name",
          "menu": ["Home", "About", "Services", "Contact"],
          "cta": { "text": "CTA Button", "link": "/contact" },
          "style": { "layout": "horizontal", "sticky": true }
        },
        {
          "type": "hero",
          "title": "Hero Title",
          "subtitle": "Hero Subtitle",
          "description": "Hero Description",
          "cta": {
            "primary": { "text": "Primary CTA", "action": "/action" },
            "secondary": { "text": "Secondary CTA", "action": "/action" }
          },
          "background_image": "https://images.unsplash.com/...",
          "style": { "layout": "centered", "height": "large" }
        },
        {
          "type": "about",
          "title": "About Section Title",
          "description": "About description...",
          "image": "https://images.unsplash.com/...",
          "style": { "layout": "split" }
        },
        {
          "type": "services",
          "title": "Services Section Title",
          "items": [
            { "name": "Service 1", "description": "...", "icon": "icon-name" }
          ],
          "style": { "layout": "grid", "columns": 3 }
        },
        {
          "type": "features",
          "title": "Features Section Title",
          "items": [
            { "title": "Feature 1", "description": "..." }
          ]
        },
        {
          "type": "gallery",
          "title": "Gallery Title",
          "images": ["url1", "url2", "url3"]
        },
        {
          "type": "testimonials",
          "title": "Testimonials Title",
          "items": [
            { "name": "Person Name", "feedback": "...", "rating": 5 }
          ]
        },
        {
          "type": "contact",
          "title": "Contact Title",
          "email": "email@example.com",
          "phone": "+977-1-xxxxxxx",
          "address": "Location, Nepal",
          "map_embed": "",
          "style": { "layout": "split" }
        },
        {
          "type": "footer",
          "text": "© 2024 Company Name",
          "links": ["Privacy", "Terms", "Contact"],
          "socials": ["facebook", "instagram", "twitter"]
        }
      ]
    }
  ]
}

## COLOR GUIDELINES:
- Green (#059669) → Nature/agriculture/trekking
- Blue (#2563EB) → Tech/corporate/professional
- Orange (#F97316) → Food/restaurant
- Red (#C41E3A) → Restaurant/authentic
- Dark (#1F2937) → Luxury/premium
- Purple (#7C3AED) → Creative/portfolio

## CONTEXT:
- If business is in Nepal, use Nepali context, phone format (+977), Kathmandu locations
- Use realistic business names and services
- Keep text concise but engaging
- Make it production-ready

USER REQUEST:
`;

// Function to build the full prompt with user input
export const buildPrompt = (userInput: string): string => {
  return WEBSITE_GENERATION_PROMPT + userInput;
};

// Kilo API request format
export interface KiloChatMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

export interface KiloChatRequest {
  model: string;
  messages: KiloChatMessage[];
  temperature?: number;
  max_tokens?: number;
}

export interface KiloChatResponse {
  id: string;
  choices: Array<{
    message: {
      role: string;
      content: string;
    };
    finish_reason: string;
  }>;
  usage?: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
}
