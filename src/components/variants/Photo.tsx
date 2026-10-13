import Image from "next/image";
import { imgUrl, type SizedImage } from "@/lib/home-data";
import { cn } from "@/lib/cn";

/** Sanity photo with a server-computed crop. `ratio` = height / width;
 * omit it to keep the photo's natural proportions. */
export function Photo({
  img,
  width,
  ratio,
  sizes,
  className,
}: {
  img?: SizedImage;
  width: number;
  ratio?: number;
  sizes: string;
  className?: string;
}) {
  if (!img) return <div className={cn("h-full w-full bg-off-white", className)} />;
  const h = Math.round(width * (ratio ?? img.h / img.w));
  return (
    <Image
      src={imgUrl(img.image, width, ratio ? h : undefined)}
      alt={img.alt}
      width={width}
      height={h}
      sizes={sizes}
      className={cn("h-full w-full object-cover", className)}
    />
  );
}
