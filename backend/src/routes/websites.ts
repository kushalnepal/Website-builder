import { Request, Response, Router } from "express";
import jwt from "jsonwebtoken";
import prisma from "../lib/prisma";
import { editWebsite, generateWebsite } from "../services/aiService";

const router = Router();

// Middleware to verify JWT token
const authenticate = (req: Request, res: Response, next: Function) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Authentication required" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "default-secret",
    ) as { userId: string };
    (req as any).userId = decoded.userId;
    next();
  } catch (error) {
    return res.status(401).json({ error: "Invalid token" });
  }
};

// Generate new website from prompt
router.post("/generate", authenticate, async (req: Request, res: Response) => {
  try {
    const { prompt, name } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: "Prompt is required" });
    }

    console.log("🎨 Generating website from prompt:", prompt);

    const websiteData = await generateWebsite(prompt);

    // Create slug from website name
    const slug =
      (websiteData.website_name || name || "my-website")
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "") +
      "-" +
      Date.now();

    // Save to database
    const website = await prisma.website.create({
      data: {
        userId: (req as any).userId,
        name: websiteData.website_name || name || "My Website",
        slug,
        websiteJson: websiteData,
        theme: {
          primaryColor: websiteData.theme?.primary_color,
          secondaryColor: websiteData.theme?.secondary_color,
          accentColor: websiteData.theme?.accent_color,
          fontFamily: websiteData.theme?.font_family,
        },
        status: "draft",
        analytics: {
          views: 0,
        },
      },
    });

    res.status(201).json({
      message: "Website generated successfully",
      website: {
        id: website.id,
        name: website.name,
        slug: website.slug,
        websiteJson: website.websiteJson,
        status: website.status,
        createdAt: website.createdAt,
      },
    });
  } catch (error: any) {
    console.error("Generate error:", error);
    res
      .status(500)
      .json({ error: error.message || "Failed to generate website" });
  }
});

// List user's websites
router.get("/", authenticate, async (req: Request, res: Response) => {
  try {
    const websites = await prisma.website.findMany({
      where: { userId: (req as any).userId },
      orderBy: { updatedAt: "desc" },
      select: {
        id: true,
        name: true,
        slug: true,
        status: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    res.json({ websites });
  } catch (error: any) {
    console.error("List websites error:", error);
    res.status(500).json({ error: "Failed to fetch websites" });
  }
});

// Get single website
router.get("/:id", authenticate, async (req: Request, res: Response) => {
  try {
    const website = await prisma.website.findFirst({
      where: {
        id: req.params.id,
        userId: (req as any).userId,
      },
    });

    if (!website) {
      return res.status(404).json({ error: "Website not found" });
    }

    res.json({ website });
  } catch (error: any) {
    console.error("Get website error:", error);
    res.status(500).json({ error: "Failed to fetch website" });
  }
});

// Update website
router.put("/:id", authenticate, async (req: Request, res: Response) => {
  try {
    const { name, websiteJson, theme } = req.body;

    const existingWebsite = await prisma.website.findFirst({
      where: {
        id: req.params.id,
        userId: (req as any).userId,
      },
    });

    if (!existingWebsite) {
      return res.status(404).json({ error: "Website not found" });
    }

    const updateData: any = {};
    if (name) updateData.name = name;
    if (websiteJson) updateData.websiteJson = websiteJson;
    if (theme) {
      const existingTheme = existingWebsite.theme as any;
      updateData.theme = {
        primaryColor: theme.primaryColor || existingTheme?.primaryColor,
        secondaryColor: theme.secondaryColor || existingTheme?.secondaryColor,
        accentColor: theme.accentColor || existingTheme?.accentColor,
        fontFamily: theme.fontFamily || existingTheme?.fontFamily,
      };
    }

    const website = await prisma.website.update({
      where: { id: req.params.id },
      data: updateData,
    });

    res.json({
      message: "Website updated",
      website: {
        id: website.id,
        name: website.name,
        slug: website.slug,
        status: website.status,
      },
    });
  } catch (error: any) {
    console.error("Update website error:", error);
    res.status(500).json({ error: "Failed to update website" });
  }
});

// Edit website with AI
router.post("/:id/edit", authenticate, async (req: Request, res: Response) => {
  try {
    const { instruction } = req.body;

    if (!instruction) {
      return res.status(400).json({ error: "Edit instruction is required" });
    }

    const website = await prisma.website.findFirst({
      where: {
        id: req.params.id,
        userId: (req as any).userId,
      },
    });

    if (!website) {
      return res.status(404).json({ error: "Website not found" });
    }

    console.log("🎨 Editing website with instruction:", instruction);

    const updatedWebsiteJson = await editWebsite(
      website.websiteJson as any,
      instruction,
    );

    await prisma.website.update({
      where: { id: req.params.id },
      data: { websiteJson: updatedWebsiteJson },
    });

    res.json({
      message: "Website updated",
      websiteJson: updatedWebsiteJson,
    });
  } catch (error: any) {
    console.error("Edit website error:", error);
    res.status(500).json({ error: error.message || "Failed to edit website" });
  }
});

// Publish website
router.post(
  "/:id/publish",
  authenticate,
  async (req: Request, res: Response) => {
    try {
      const website = await prisma.website.findFirst({
        where: {
          id: req.params.id,
          userId: (req as any).userId,
        },
      });

      if (!website) {
        return res.status(404).json({ error: "Website not found" });
      }

      website.status = "published";
      website.publishedUrl = `/site/${website.slug}`;

      await prisma.website.update({
        where: { id: req.params.id },
        data: {
          status: "published",
          publishedUrl: `/site/${website.slug}`,
        },
      });

      res.json({
        message: "Website published successfully",
        website: {
          id: website.id,
          name: website.name,
          slug: website.slug,
          status: "published",
          publishedUrl: website.publishedUrl,
        },
      });
    } catch (error: any) {
      console.error("Publish error:", error);
      res.status(500).json({ error: "Failed to publish website" });
    }
  },
);

// Delete website
router.delete("/:id", authenticate, async (req: Request, res: Response) => {
  try {
    const result = await prisma.website.deleteMany({
      where: {
        id: req.params.id,
        userId: (req as any).userId,
      },
    });

    if (result.count === 0) {
      return res.status(404).json({ error: "Website not found" });
    }

    res.json({ message: "Website deleted successfully" });
  } catch (error: any) {
    console.error("Delete error:", error);
    res.status(500).json({ error: "Failed to delete website" });
  }
});

// Public access to published website (no auth required)
router.get("/public/:slug", async (req: Request, res: Response) => {
  try {
    const website = await prisma.website.findFirst({
      where: {
        slug: req.params.slug,
        status: "published",
      },
    });

    if (!website) {
      return res.status(404).json({ error: "Website not found" });
    }

    // Increment view count
    const currentViews = (website.analytics as any)?.views || 0;
    await prisma.website.update({
      where: { id: website.id },
      data: {
        analytics: {
          views: currentViews + 1,
          lastVisited: new Date(),
        },
      },
    });

    res.json({ websiteJson: website.websiteJson, theme: website.theme });
  } catch (error: any) {
    console.error("Public website error:", error);
    res.status(500).json({ error: "Failed to fetch website" });
  }
});

export default router;
