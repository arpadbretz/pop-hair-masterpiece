import type { MetadataRoute } from "next";
import { sanityFetch } from "@/sanity/lib/fetch";
import { blogPostSlugsQuery } from "@/sanity/lib/queries";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://pop-hair-pied.vercel.app";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes: MetadataRoute.Sitemap = [
    "",
    "/rolunk",
    "/szolgaltatasok",
    "/eskuvo",
    "/galeria",
    "/blog",
    "/kapcsolat",
    "/impresszum",
    "/adatvedelem",
  ].map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: new Date(),
    changeFrequency: path === "/blog" ? "weekly" : "monthly",
    priority: path === "" ? 1.0 : 0.8,
  }));

  const slugs = await sanityFetch<string[]>({
    query: blogPostSlugsQuery,
    tags: ["blogPost"],
  }).catch(() => [] as string[]);

  const blogRoutes: MetadataRoute.Sitemap = slugs.map((slug) => ({
    url: `${SITE_URL}/blog/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticRoutes, ...blogRoutes];
}
