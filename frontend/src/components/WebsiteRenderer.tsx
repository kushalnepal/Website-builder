"use client";

import { useEffect, useState } from "react";

interface WebsiteSection {
  type: string;
  [key: string]: any;
}

interface WebsiteData {
  website_name: string;
  business_type: string;
  tagline: string;
  target_audience: string;
  theme: {
    primary_color: string;
    secondary_color: string;
    accent_color: string;
    font_family: string;
    tone: string;
  };
  seo: {
    title: string;
    description: string;
    keywords: string[];
  };
  pages: Array<{
    name: string;
    slug: string;
    sections: WebsiteSection[];
  }>;
}

interface WebsiteRendererProps {
  data: WebsiteData;
}

export default function WebsiteRenderer({ data }: WebsiteRendererProps) {
  const [currentPage, setCurrentPage] = useState(0);
  const theme = data?.theme || {};
  const primaryColor = theme.primary_color || "#3b82f6";
  const secondaryColor = theme.secondary_color || "#1f2937";
  const accentColor = theme.accent_color || "#f59e0b";

  const page = data?.pages?.[currentPage];
  const sections = page?.sections || [];

  // Apply theme colors as CSS variables
  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty("--primary", primaryColor);
    root.style.setProperty("--secondary", secondaryColor);
    root.style.setProperty("--accent", accentColor);
  }, [primaryColor, secondaryColor, accentColor]);

  const renderSection = (section: WebsiteSection, index: number) => {
    switch (section.type) {
      case "navbar":
        return (
          <nav
            key={index}
            className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur shadow-sm"
          >
            <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
              <span
                className="text-xl font-bold"
                style={{ color: primaryColor }}
              >
                {section.logo_text || data.website_name}
              </span>
              <div className="hidden md:flex gap-6">
                {section.menu?.map((item: string, i: number) => (
                  <a
                    key={i}
                    href="#"
                    className="text-gray-600 hover:text-gray-900"
                  >
                    {item}
                  </a>
                ))}
              </div>
              {section.cta && (
                <a
                  href={section.cta.link}
                  className="px-4 py-2 rounded-lg font-medium text-white"
                  style={{ backgroundColor: primaryColor }}
                >
                  {section.cta.text}
                </a>
              )}
            </div>
          </nav>
        );

      case "hero":
        return (
          <section
            key={index}
            className="relative h-screen flex items-center justify-center text-center px-4"
            style={{
              backgroundImage: section.background_image
                ? `url(${section.background_image})`
                : undefined,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundColor: section.background_image ? undefined : primaryColor,
            }}
          >
            {(section.background_image && <div className="absolute inset-0 bg-black/50" />) || (
              <div className="absolute inset-0 bg-black/30" />
            )}
            <div className="relative z-10 max-w-4xl">
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
                {section.title}
              </h1>
              {section.subtitle && (
                <p className="text-xl text-white/90 mb-6">{section.subtitle}</p>
              )}
              {section.description && (
                <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto">
                  {section.description}
                </p>
              )}
              <div className="flex gap-4 justify-center">
                {section.cta?.primary && (
                  <a
                    href={section.cta.primary.action}
                    className="px-6 py-3 rounded-lg font-medium text-white"
                    style={{ backgroundColor: primaryColor }}
                  >
                    {section.cta.primary.text}
                  </a>
                )}
                {section.cta?.secondary && (
                  <a
                    href={section.cta.secondary.action}
                    className="px-6 py-3 rounded-lg font-medium bg-white text-gray-900"
                  >
                    {section.cta.secondary.text}
                  </a>
                )}
              </div>
            </div>
          </section>
        );

      case "about":
        return (
          <section key={index} className="py-20 px-4 bg-white">
            <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-12 items-center">
              <div className="flex-1">
                {section.image && (
                  <img
                    src={section.image}
                    alt={section.title}
                    className="rounded-2xl shadow-lg w-full"
                  />
                )}
              </div>
              <div className="flex-1">
                <h2
                  className="text-3xl font-bold mb-4"
                  style={{ color: secondaryColor }}
                >
                  {section.title}
                </h2>
                <p className="text-gray-600 leading-relaxed">
                  {section.description}
                </p>
              </div>
            </div>
          </section>
        );

      case "services":
        return (
          <section key={index} className="py-20 px-4 bg-gray-50">
            <div className="max-w-6xl mx-auto">
              <h2
                className="text-3xl font-bold text-center mb-12"
                style={{ color: secondaryColor }}
              >
                {section.title}
              </h2>
              <div className="grid md:grid-cols-3 gap-8">
                {section.items?.map((item: any, i: number) => (
                  <div
                    key={i}
                    className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition"
                  >
                    <h3
                      className="text-xl font-semibold mb-2"
                      style={{ color: primaryColor }}
                    >
                      {item.name}
                    </h3>
                    <p className="text-gray-600">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        );

      case "features":
        return (
          <section key={index} className="py-20 px-4 bg-white">
            <div className="max-w-6xl mx-auto">
              <h2
                className="text-3xl font-bold text-center mb-12"
                style={{ color: secondaryColor }}
              >
                {section.title}
              </h2>
              <div className="grid md:grid-cols-2 gap-8">
                {section.items?.map((item: any, i: number) => (
                  <div key={i} className="flex gap-4">
                    <div
                      className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: `${primaryColor}20` }}
                    >
                      <span
                        className="text-2xl"
                        style={{ color: primaryColor }}
                      >
                        ✓
                      </span>
                    </div>
                    <div>
                      <h3
                        className="font-semibold mb-1"
                        style={{ color: secondaryColor }}
                      >
                        {item.title}
                      </h3>
                      <p className="text-gray-600">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        );

      case "gallery":
        return (
          <section key={index} className="py-20 px-4 bg-gray-50">
            <div className="max-w-6xl mx-auto">
              <h2
                className="text-3xl font-bold text-center mb-12"
                style={{ color: secondaryColor }}
              >
                {section.title}
              </h2>
              <div className="grid md:grid-cols-3 gap-6">
                {section.images?.map((img: string, i: number) => (
                  <img
                    key={i}
                    src={img}
                    alt={`Gallery ${i + 1}`}
                    className="rounded-xl shadow-sm hover:shadow-lg transition w-full h-64 object-cover"
                  />
                ))}
              </div>
            </div>
          </section>
        );

      case "testimonials":
        return (
          <section key={index} className="py-20 px-4 bg-white">
            <div className="max-w-6xl mx-auto">
              <h2
                className="text-3xl font-bold text-center mb-12"
                style={{ color: secondaryColor }}
              >
                {section.title}
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {section.items?.map((item: any, i: number) => (
                  <div key={i} className="bg-gray-50 p-6 rounded-2xl">
                    <div className="flex gap-1 mb-2">
                      {Array.from({ length: item.rating || 5 }).map((_, j) => (
                        <span key={j} className="text-yellow-400">
                          ★
                        </span>
                      ))}
                    </div>
                    <p className="text-gray-600 mb-4">"{item.feedback}"</p>
                    <p
                      className="font-semibold"
                      style={{ color: primaryColor }}
                    >
                      {item.name}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        );

      case "contact":
        return (
          <section key={index} className="py-20 px-4 bg-gray-900 text-white">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12">
                {section.title}
              </h2>
              <div className="grid md:grid-cols-3 gap-8 text-center">
                {section.email && (
                  <div>
                    <p className="text-gray-400 mb-1">Email</p>
                    <p className="font-medium">{section.email}</p>
                  </div>
                )}
                {section.phone && (
                  <div>
                    <p className="text-gray-400 mb-1">Phone</p>
                    <p className="font-medium">{section.phone}</p>
                  </div>
                )}
                {section.address && (
                  <div>
                    <p className="text-gray-400 mb-1">Address</p>
                    <p className="font-medium">{section.address}</p>
                  </div>
                )}
              </div>
            </div>
          </section>
        );

      case "footer":
        return (
          <footer key={index} className="py-8 px-4 bg-gray-900 text-gray-400">
            <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center">
              <p>{section.text}</p>
              <div className="flex gap-4 mt-4 md:mt-0">
                {section.links?.map((link: string, i: number) => (
                  <a key={i} href="#" className="hover:text-white transition">
                    {link}
                  </a>
                ))}
              </div>
            </div>
          </footer>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {sections.map((section, index) => renderSection(section, index))}
    </div>
  );
}
