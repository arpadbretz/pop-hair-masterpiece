import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { sanityFetch } from "@/sanity/lib/fetch";
import { blogPostsQuery } from "@/sanity/lib/queries";
import type { BlogPostListItem } from "@/sanity/lib/types";
import { urlForImage } from "@/sanity/lib/image";
import { SectionTitle } from "@/components/Common";
import { CATEGORY_LABELS, formatDateHu } from "@/lib/blog";

export const metadata = {
  title: "Blog & Vlog",
  description:
    "Stílustippek, hajápolási útmutatók és szalonéletünk a Pop Hair Salon blogján.",
};

export default async function BlogIndexPage() {
  const posts = await sanityFetch<BlogPostListItem[]>({
    query: blogPostsQuery,
    tags: ["blogPost"],
  }).catch(() => [] as BlogPostListItem[]);

  return (
    <div className="pt-48 pb-32 bg-white">
      <div className="max-w-7xl mx-auto px-8">
        <SectionTitle
          title="Blog & Vlog"
          subtitle="INSPIRÁCIÓ"
          align="center"
        />

        {posts.length === 0 ? (
          <div className="max-w-xl mx-auto text-center py-32">
            <p className="text-2xl font-serif italic text-gray-600 mb-6">
              Hamarosan érkeznek az első cikkek.
            </p>
            <p className="text-sm text-gray-600 font-light">
              Stílustippek, hajápolási útmutatók, szalonéletünk pillanatai.
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16">
            {posts.map((post) => (
              <Link
                key={post._id}
                href={`/blog/${post.slug}`}
                className="group flex flex-col"
              >
                <div className="relative aspect-[4/5] overflow-hidden mb-8 bg-off-white">
                  {post.coverImage ? (
                    <Image
                      src={urlForImage(post.coverImage).width(800).url()}
                      alt={post.coverImage.alt ?? post.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition-transform duration-[1500ms] group-hover:scale-110"
                    />
                  ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-luxury-gold/15 via-off-white to-luxury-gold/5 flex items-center justify-center">
                      <span className="text-luxury-gold/70 font-serif italic text-3xl">
                        Pop Hair
                      </span>
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-4 mb-4 text-[10px] uppercase tracking-[0.4em] font-bold">
                  {post.category && (
                    <span className="text-luxury-gold">
                      {CATEGORY_LABELS[post.category]}
                    </span>
                  )}
                  <span className="text-gray-600">
                    {formatDateHu(post.publishedAt)}
                  </span>
                </div>

                <h2 className="text-2xl md:text-3xl font-serif italic text-black leading-tight mb-4 group-hover:text-luxury-gold transition-colors">
                  {post.title}
                </h2>

                {post.excerpt && (
                  <p className="text-base font-light text-gray-700 leading-relaxed line-clamp-3 mb-6">
                    {post.excerpt}
                  </p>
                )}

                <span className="inline-flex items-center gap-3 text-[10px] uppercase font-bold tracking-[0.4em] text-black mt-auto group-hover:text-luxury-gold transition-colors">
                  Tovább olvasom
                  <ArrowRight
                    size={14}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </span>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
