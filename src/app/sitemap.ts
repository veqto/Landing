import type { MetadataRoute } from "next";

const SITE_URL = "https://veqto.ai";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  // Rutas publicas indexables. Las paginas internas de la plataforma
  // (app.veqto.ai/admin, /aliado, /banco) NO se incluyen — son privadas.
  return [
    {
      url: SITE_URL,
      lastModified,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/solicitud-credito`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/solicitud-aliado`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/acceder`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${SITE_URL}/terminos-condiciones`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${SITE_URL}/politica-tratamiento-datos`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${SITE_URL}/autorizacion-datos`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${SITE_URL}/autorizacion-centrales`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];
}
