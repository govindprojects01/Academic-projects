import type { MetadataRoute } from "next";

const baseUrl = "https://govindprojects01.github.io/Academic-projects";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    "",
    "/about",
    "/services",
    "/online-form",
    "/contact",
  ].map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date("2026-08-29"),
  }));
}
