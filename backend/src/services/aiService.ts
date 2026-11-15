import axios from "axios";
import { buildPrompt, KiloChatMessage } from "../prompts/websitePrompt";

const KILO_API_URL =
  process.env.KILO_API_URL || "https://api.kilo.ai/v1/chat/completions";
const KILO_API_KEY = process.env.KILO_API_KEY;
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const OPENAI_API_URL = "https://api.openai.com/v1/chat/completions";

// Demo template for when AI services fail
const getDemoTemplate = (userPrompt: string) => {
  const lowerPrompt = userPrompt.toLowerCase();

  if (
    lowerPrompt.includes("restaurant") ||
    lowerPrompt.includes("food") ||
    lowerPrompt.includes("cafe") ||
    lowerPrompt.includes("nepali")
  ) {
    return {
      website_name: "Nepali Restaurant",
      business_type: "Restaurant",
      tagline: "Authentic Nepali Cuisine",
      target_audience: "Food lovers in Kathmandu",
      language: "English",
      theme: {
        primary_color: "#D32F2F",
        secondary_color: "#FF5722",
        accent_color: "#FFC107",
        font_family: "Poppins",
        tone: "friendly",
      },
      seo: {
        title: "Traditional Nepali Restaurant",
        description: "Experience authentic Nepali cuisine",
        keywords: ["nepali food", "momo", "thali", "kathmandu"],
      },
      pages: [
        {
          name: "Home",
          slug: "/",
          sections: [
            {
              type: "hero",
              title: "Welcome to Our Restaurant",
              subtitle: "Authentic Nepali Flavors",
              description:
                "Experience the rich taste of traditional Nepali cuisine with our homemade momos, dal bhat, and regional specialties.",
              cta: {
                primary: { text: "View Menu", action: "#menu" },
                secondary: { text: "Book Table", action: "#contact" },
              },
              background_image: "",
              style: { layout: "centered", height: "large" },
            },
          ],
        },
      ],
    };
  }

  // Default business template
  return {
    website_name: "My Business",
    business_type: "Business",
    tagline: "Your Trusted Partner",
    target_audience: "Local customers",
    language: "English",
    theme: {
      primary_color: "#2563EB",
      secondary_color: "#1E40AF",
      accent_color: "#06B6D4",
      font_family: "Inter",
      tone: "professional",
    },
    seo: {
      title: "My Business Website",
      description: "Professional business services",
      keywords: ["business", "services", "professional"],
    },
    pages: [
      {
        name: "Home",
        slug: "/",
        sections: [
          {
            type: "hero",
            title: "Welcome to Our Business",
            subtitle: "Professional Services",
            description:
              "We provide quality services to meet your needs. Contact us today to learn more about how we can help you.",
            cta: {
              primary: { text: "Get Started", action: "#contact" },
              secondary: { text: "Learn More", action: "#about" },
            },
            background_image: "",
            style: { layout: "centered", height: "large" },
          },
        ],
      },
    ],
  };
};

// Generate website using Kilo API (with OpenAI fallback)
export const generateWebsite = async (userPrompt: string): Promise<any> => {
  const fullPrompt = buildPrompt(userPrompt);

  const messages: KiloChatMessage[] = [
    {
      role: "user",
      content: fullPrompt,
    },
  ];

  const requestBody = {
    model: "gpt-4o",
    messages,
    temperature: 0.7,
    max_tokens: 4000,
  };

  // Try Kilo API first
  try {
    const headers: any = {
      "Content-Type": "application/json",
    };

    if (KILO_API_KEY) {
      headers["Authorization"] = `Bearer ${KILO_API_KEY}`;
    }

    console.log("🤖 Calling Kilo API for website generation...");

    const response = await axios.post(KILO_API_URL, requestBody, { headers });

    if (!response.data?.choices?.[0]?.message?.content) {
      throw new Error("Invalid response from AI API");
    }

    const jsonContent = response.data.choices[0].message.content;

    // Try to parse the JSON response
    try {
      // Handle if the response has markdown code blocks
      const cleanJson = jsonContent
        .replace(/```json\n?/g, "")
        .replace(/```\n?/g, "")
        .trim();
      const websiteData = JSON.parse(cleanJson);

      console.log("✅ Website generated successfully");
      return websiteData;
    } catch (parseError) {
      console.error("Failed to parse AI response as JSON:", parseError);
      throw new Error("AI response was not valid JSON");
    }
  } catch (kiloError: any) {
    console.log("Kilo API failed, trying OpenAI...");

    // Try OpenAI as fallback
    if (OPENAI_API_KEY) {
      try {
        const headers: any = {
          "Content-Type": "application/json",
          Authorization: `Bearer ${OPENAI_API_KEY}`,
        };

        const response = await axios.post(OPENAI_API_URL, requestBody, {
          headers,
        });

        if (!response.data?.choices?.[0]?.message?.content) {
          throw new Error("Invalid response from OpenAI API");
        }

        const jsonContent = response.data.choices[0].message.content;

        const cleanJson = jsonContent
          .replace(/```json\n?/g, "")
          .replace(/```\n?/g, "")
          .trim();
        const websiteData = JSON.parse(cleanJson);

        console.log("✅ Website generated successfully via OpenAI");
        return websiteData;
      } catch (openaiError: any) {
        console.error("❌ OpenAI API also failed:", openaiError.message);
        console.log("🎨 Using demo template as fallback...");
        return getDemoTemplate(userPrompt);
      }
    }

    console.log("🎨 Using demo template as fallback...");
    return getDemoTemplate(userPrompt);
  }
};

// Edit website using Kilo API
export const editWebsite = async (
  currentWebsite: any,
  editInstruction: string,
): Promise<any> => {
  try {
    const editPrompt = `
Current website structure:
${JSON.stringify(currentWebsite, null, 2)}

User instruction for editing:
${editInstruction}

Please provide the complete modified website JSON with the requested changes applied. Output only valid JSON, no explanations.
`;

    const messages: KiloChatMessage[] = [
      {
        role: "user",
        content: editPrompt,
      },
    ];

    const requestBody = {
      model: "gpt-4o",
      messages,
      temperature: 0.7,
      max_tokens: 4000,
    };

    const headers: any = {
      "Content-Type": "application/json",
    };

    if (KILO_API_KEY) {
      headers["Authorization"] = `Bearer ${KILO_API_KEY}`;
    }

    console.log("🤖 Calling Kilo API for website edit...");

    const response = await axios.post(KILO_API_URL, requestBody, { headers });

    if (!response.data?.choices?.[0]?.message?.content) {
      throw new Error("Invalid response from AI API");
    }

    const jsonContent = response.data.choices[0].message.content;

    try {
      const cleanJson = jsonContent
        .replace(/```json\n?/g, "")
        .replace(/```\n?/g, "")
        .trim();
      const websiteData = JSON.parse(cleanJson);

      console.log("✅ Website edited successfully");
      return websiteData;
    } catch (parseError) {
      throw new Error("AI response was not valid JSON");
    }
  } catch (error: any) {
    console.error("❌ Error editing website:", error.message);
    throw error;
  }
};
