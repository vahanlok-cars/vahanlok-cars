import type { MetadataRoute } from "next";
import { getAllCars } from "@/lib/cars";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://vahanlok-cars.vercel.app/";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const cars = getAllCars();

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${siteUrl}/`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${siteUrl}/cars`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.9,
    },
  ];

  const carRoutes: MetadataRoute.Sitemap = cars.map((car) => ({
    url: `${siteUrl}/cars/${car.id}`,
    lastModified: now,
    changeFrequency: "daily",
    priority: 0.8,
  }));

  return [...staticRoutes, ...carRoutes];
}
