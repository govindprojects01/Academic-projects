import type { MetadataRoute } from "next";

const baseUrl = "https://www.projectarea.online";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${baseUrl}/`,
      lastModified: new Date("2026-09-29"),
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date("2026-09-29"),
    },
    {
      url: `${baseUrl}/services`,
      lastModified: new Date("2026-09-29"),
    },
    {
      url: `${baseUrl}/online-form`,
      lastModified: new Date("2026-09-29"),
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date("2026-09-29"),
    },
  ];
}
