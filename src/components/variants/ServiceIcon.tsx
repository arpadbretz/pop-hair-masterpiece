import { Scissors, Sparkles, RefreshCcw, Heart, Palette } from "lucide-react";
import type { LucideIcon } from "lucide-react";

const ICONS: Record<string, LucideIcon> = {
  scissors: Scissors,
  sparkles: Sparkles,
  refresh: RefreshCcw,
  heart: Heart,
  palette: Palette,
};

export function ServiceIcon({ name, size = 18, className }: { name?: string; size?: number; className?: string }) {
  const Icon = (name && ICONS[name]) || Sparkles;
  return <Icon size={size} strokeWidth={1.5} className={className} />;
}
