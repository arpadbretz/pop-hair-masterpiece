import { sanityFetch } from "./fetch";
import { siteSettingsQuery } from "./queries";
import { SITE_SETTINGS_FALLBACK } from "./defaults";
import type { SiteSettings } from "./types";

export async function getSiteSettings(): Promise<SiteSettings> {
  try {
    const data = await sanityFetch<SiteSettings | null>({
      query: siteSettingsQuery,
      tags: ["siteSettings"],
    });
    return data ?? SITE_SETTINGS_FALLBACK;
  } catch (err) {
    console.warn("Sanity fetch failed, using fallback site settings", err);
    return SITE_SETTINGS_FALLBACK;
  }
}
