import type { MetadataRoute } from "next";

const baseUrl = "https://www.projectarea.online";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date("2026-10-11");

  return [
    { url: `${baseUrl}/`, lastModified, changeFrequency: "weekly", priority: 1 },
    { url: `${baseUrl}/about`, lastModified, changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/services`, lastModified, changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/academic-projects`, lastModified, changeFrequency: "monthly", priority: 0.9 },
    { url: `${baseUrl}/thesis-dissertation`, lastModified, changeFrequency: "monthly", priority: 0.9 },
    { url: `${baseUrl}/thesis-synopsis`, lastModified, changeFrequency: "monthly", priority: 0.9 },
    { url: `${baseUrl}/online-form`, lastModified, changeFrequency: "monthly", priority: 0.6 },
    { url: `${baseUrl}/contact`, lastModified, changeFrequency: "monthly", priority: 0.8 },
  ];
}
