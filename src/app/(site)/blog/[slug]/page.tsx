import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { sanityFetch } from "@/sanity/lib/fetch";
import {
  blogPostBySlugQuery,
  blogPostSlugsQuery,
} from "@/sanity/lib/queries";
import type { BlogPost } from "@/sanity/lib/types";
import { urlForImage } from "@/sanity/lib/image";
import { PostBody } from "@/components/blog/PostBody";
import { CATEGORY_LABELS, formatDateHu, getVideoEmbed } from "@/lib/blog";

export async function generateStaticParams() {
  const slugs = await sanityFetch<string[]>({
    query: blogPostSlugsQuery,
    tags: ["blogPost"],
  }).catch(() => [] as string[]);
  return slugs.map((slug) => ({ slug }));
}

type Params = { slug: string };

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const post = await sanityFetch<BlogPost | null>({
    query: blogPostBySlugQuery,
    params: { slug },
    tags: ["blogPost"],
  }).catch(() => null);
  if (!post) return { title: "Blog poszt" };
  return {
    title: post.title,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const post = await sanityFetch<BlogPost | null>({
    query: blogPostBySlugQuery,
    params: { slug },
    tags: ["blogPost"],
  }).catch(() => null);

  if (!post) notFound();

  const embed = getVideoEmbed(post.videoUrl);

  return (
    <article className="pt-36 md:pt-44 pb-32 bg-white">
      <div className="max-w-3xl mx-auto px-8">
        <Link
          href="/blog"
          className="inline-flex items-center gap-3 text-[10px] uppercase font-bold tracking-[0.4em] text-gray-400 hover:text-luxury-gold transition-colors mb-12 mt-12"
        >
          <ArrowLeft size={14} />
          Vissza a Bloghoz
        </Link>

        <div className="flex items-center gap-4 mb-6 text-[10px] uppercase tracking-[0.4em] font-bold">
          {post.category && (
            <span className="text-luxury-gold">
              {CATEGORY_LABELS[post.category]}
            </span>
          )}
          <span className="text-gray-400">
            {formatDateHu(post.publishedAt)}
          </span>
        </div>

        <h1 className="text-4xl md:text-6xl font-serif italic text-black leading-tight mb-12 tracking-tighter">
          {post.title}
        </h1>

        {post.excerpt && (
          <p className="text-xl md:text-2xl font-light text-gray-500 leading-relaxed border-l border-luxury-gold/30 pl-8 mb-16 italic">
            {post.excerpt}
          </p>
        )}
      </div>

      {(embed || post.coverImage) && (
        <div className="max-w-5xl mx-auto px-8 mb-16">
          {embed ? (
            <div className="relative aspect-video overflow-hidden bg-black">
              <iframe
                src={embed.src}
                className="absolute inset-0 w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title={post.title}
              />
            </div>
          ) : post.coverImage ? (
            <div className="relative aspect-[16/10] overflow-hidden">
              <Image
                src={urlForImage(post.coverImage).width(2000).url()}
                alt={post.coverImage.alt ?? post.title}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 1000px"
                className="object-cover"
              />
            </div>
          ) : null}
        </div>
      )}

      <div className="max-w-3xl mx-auto px-8">
        <PostBody value={post.body} />
      </div>

      <div className="max-w-3xl mx-auto px-8 mt-32 pt-16 border-t border-black/5 text-center">
        <Link
          href="/blog"
          className="inline-flex items-center gap-3 text-[10px] uppercase font-bold tracking-[0.4em] text-black hover:text-luxury-gold transition-colors"
        >
          <ArrowLeft size={14} />
          Vissza a Bloghoz
        </Link>
      </div>
    </article>
  );
}
