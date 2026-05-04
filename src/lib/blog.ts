import type { BlogPostCategory } from "@/sanity/lib/types";

export const CATEGORY_LABELS: Record<BlogPostCategory, string> = {
  tips: "Stílustippek",
  wedding: "Esküvő",
  care: "Hajápolás",
  trends: "Trendek",
  salon: "Szalon élet",
  vlog: "Vlog",
};

export function formatDateHu(iso: string): string {
  return new Date(iso).toLocaleDateString("hu-HU", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

type EmbedInfo = { type: "youtube" | "vimeo"; src: string } | null;

export function getVideoEmbed(url: string | undefined): EmbedInfo {
  if (!url) return null;
  const ytMatch = url.match(
    /(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([A-Za-z0-9_-]{11})/
  );
  if (ytMatch) {
    return { type: "youtube", src: `https://www.youtube.com/embed/${ytMatch[1]}` };
  }
  const vimeoMatch = url.match(/vimeo\.com\/(?:video\/)?(\d+)/);
  if (vimeoMatch) {
    return { type: "vimeo", src: `https://player.vimeo.com/video/${vimeoMatch[1]}` };
  }
  return null;
}
