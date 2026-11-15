import { Request, Response, Router } from "express";
import jwt from "jsonwebtoken";
import prisma from "../lib/prisma";

const router = Router();

// Track website view (can be called from frontend or CDN)
router.post("/track", async (req: Request, res: Response) => {
  try {
    const { websiteId, slug, event } = req.body;

    let website;

    if (websiteId) {
      website = await prisma.website.findUnique({
        where: { id: websiteId },
      });
    } else if (slug) {
      website = await prisma.website.findFirst({
        where: { slug, status: "published" },
      });
    }

    if (!website) {
      return res.status(404).json({ error: "Website not found" });
    }

    // Update analytics based on event type
    const currentAnalytics = (website.analytics as any) || { views: 0 };

    if (event === "view") {
      await prisma.website.update({
        where: { id: website.id },
        data: {
          analytics: {
            views: (currentAnalytics.views || 0) + 1,
            lastVisited: new Date(),
          },
        },
      });
    }

    res.json({ success: true });
  } catch (error: any) {
    console.error("Analytics track error:", error);
    res.status(500).json({ error: "Failed to track event" });
  }
});

// Get website analytics (authenticated)
router.get("/:id/analytics", async (req: Request, res: Response) => {
  try {
    // Verify token
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ error: "Authentication required" });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "default-secret",
    ) as { userId: string };

    const website = await prisma.website.findFirst({
      where: {
        id: req.params.id,
        userId: decoded.userId,
      },
    });

    if (!website) {
      return res.status(404).json({ error: "Website not found" });
    }

    res.json({
      analytics: {
        views: (website.analytics as any)?.views || 0,
        lastVisited: (website.analytics as any)?.lastVisited,
        status: website.status,
      },
    });
  } catch (error: any) {
    console.error("Get analytics error:", error);
    res.status(500).json({ error: "Failed to fetch analytics" });
  }
});

export default router;
