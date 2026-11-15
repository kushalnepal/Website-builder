import { Request, Response, Router } from "express";
import prisma from "../lib/prisma";

const router = Router();

// List all templates
router.get("/", async (req: Request, res: Response) => {
  try {
    const { category } = req.query;

    const where: any = {};
    if (category) {
      where.category = category as string;
    }

    const templates = await prisma.template.findMany({
      where,
      orderBy: { usageCount: "desc" },
      select: {
        id: true,
        name: true,
        category: true,
        previewImage: true,
        isPremium: true,
        usageCount: true,
        createdAt: true,
      },
    });

    res.json({ templates });
  } catch (error: any) {
    console.error("List templates error:", error);
    res.status(500).json({ error: "Failed to fetch templates" });
  }
});

// Get single template
router.get("/:id", async (req: Request, res: Response) => {
  try {
    const template = await prisma.template.findUnique({
      where: { id: req.params.id },
    });

    if (!template) {
      return res.status(404).json({ error: "Template not found" });
    }

    // Increment usage count
    await prisma.template.update({
      where: { id: req.params.id },
      data: { usageCount: { increment: 1 } },
    });

    res.json({ template });
  } catch (error: any) {
    console.error("Get template error:", error);
    res.status(500).json({ error: "Failed to fetch template" });
  }
});

// List templates by category
router.get("/category/:category", async (req: Request, res: Response) => {
  try {
    const templates = await prisma.template.findMany({
      where: { category: req.params.category },
      orderBy: { usageCount: "desc" },
      select: {
        id: true,
        name: true,
        category: true,
        previewImage: true,
        isPremium: true,
        usageCount: true,
      },
    });

    res.json({ templates });
  } catch (error: any) {
    console.error("Category templates error:", error);
    res.status(500).json({ error: "Failed to fetch templates" });
  }
});

// Save website as template (admin only in production)
router.post("/save", async (req: Request, res: Response) => {
  try {
    const { name, category, previewImage, websiteJson, isPremium } = req.body;

    // Check if template with same name exists
    const existing = await prisma.template.findUnique({
      where: { name },
    });

    if (existing) {
      return res
        .status(400)
        .json({ error: "Template with this name already exists" });
    }

    const template = await prisma.template.create({
      data: {
        name,
        category,
        previewImage,
        websiteJson,
        isPremium: isPremium || false,
      },
    });

    res.status(201).json({
      message: "Template saved successfully",
      template: {
        id: template.id,
        name: template.name,
        category: template.category,
      },
    });
  } catch (error: any) {
    console.error("Save template error:", error);
    res.status(500).json({ error: "Failed to save template" });
  }
});

// Seed initial templates (for development/demo)
router.post("/seed", async (req: Request, res: Response) => {
  try {
    const templates = [
      {
        name: "Himalayan Kitchen",
        category: "restaurant",
        previewImage:
          "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400",
        websiteJson: {
          website_name: "Himalayan Kitchen",
          business_type: "restaurant",
          tagline: "Authentic Nepali Cuisine",
          theme: {
            primary_color: "#C41E3A",
            secondary_color: "#1A1A2E",
            accent_color: "#FFD700",
            font_family: "Inter",
            tone: "modern",
          },
        },
        isPremium: false,
      },
      {
        name: "Summit Trekking",
        category: "trekking",
        previewImage:
          "https://images.unsplash.com/photo-1486911278844-a81c5267e227?w=400",
        websiteJson: {
          website_name: "Summit Nepal Trekking",
          business_type: "trekking",
          tagline: "Your Gateway to Himalayas",
          theme: {
            primary_color: "#059669",
            secondary_color: "#1F2937",
            accent_color: "#F97316",
            font_family: "Inter",
            tone: "adventurous",
          },
        },
        isPremium: false,
      },
      {
        name: "Tech Startup",
        category: "business",
        previewImage:
          "https://images.unsplash.com/photo-1497366216548-37526070297c?w=400",
        websiteJson: {
          website_name: "Tech Innovate",
          business_type: "business",
          tagline: "Innovation for Tomorrow",
          theme: {
            primary_color: "#2563EB",
            secondary_color: "#1E293B",
            accent_color: "#F59E0B",
            font_family: "Inter",
            tone: "professional",
          },
        },
        isPremium: false,
      },
    ];

    for (const templateData of templates) {
      const exists = await prisma.template.findUnique({
        where: { name: templateData.name },
      });

      if (!exists) {
        await prisma.template.create({
          data: templateData,
        });
      }
    }

    res.json({ message: "Templates seeded successfully" });
  } catch (error: any) {
    console.error("Seed templates error:", error);
    res.status(500).json({ error: "Failed to seed templates" });
  }
});

export default router;
