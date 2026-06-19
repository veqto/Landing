import type { MetadataRoute } from "next";

const SITE_URL = "https://veqto.ai";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // Rutas privadas / de captura no deben indexarse. La plataforma vive
        // en subdominio app.veqto.ai (no en este sitio).
        disallow: [
          "/api/",
          "/_next/",
        ],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
