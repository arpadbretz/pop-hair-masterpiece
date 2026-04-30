import { client } from "./client";
import type { QueryParams } from "next-sanity";

const DEFAULT_REVALIDATE = 3600;

export async function sanityFetch<T>({
  query,
  params = {},
  tags = [],
  revalidate = DEFAULT_REVALIDATE,
}: {
  query: string;
  params?: QueryParams;
  tags?: string[];
  revalidate?: number | false;
}): Promise<T> {
  return client.fetch<T>(query, params, {
    next: {
      revalidate: tags.length ? false : revalidate,
      tags,
    },
  });
}
