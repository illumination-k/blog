import { Post } from "./axios";
import { Meta } from "@components/BlogPostLayout/Props";

import { extractHeader } from "blog-remark/build";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkStringify from "remark-stringify";

export function post2meta(post: Post): Meta {
  const prosessor = unified()
    //@ts-ignore
    .use(remarkParse)
    .use(remarkStringify)
    .use(extractHeader);

  const vfile = prosessor.processSync(post.body || "");
  const headings = vfile.data.headings;
  const now = new Date();
  return {
    headings,
    title: post.title || "no title",
    description: post.description || "no description",
    slug: post.slug || "no slug",
    uuid: post.uuid || "no uuid",
    category: post.category || "no category",
    tags: post.tags || [],
    lang: post.lang || "ja",
    created_at: post.created_at || now.toString(),
    updated_at: post.update_at || now.toString(),
  };
}

export function updateMapArray<K, V>(map: Map<K, V[]>, key: K, value: V) {
  const old: V[] = map.get(key) ?? new Array<V>();
  map.set(key, [...old, value]);
}

export function getFormattedDate(date_string: string): string {
  if (date_string === "") {
    return date_string;
  }
  const date = new Date(date_string);
  const formatted = `${date.getFullYear()}/${
    date.getMonth() + 1
  }/${date.getDate()}`.replace(/\n|\r/g, "");

  return formatted;
}

export function getDateKey(date_string: string): string {
  const date = new Date(date_string);
  const dateKey = `${date.getFullYear()}/${date.getMonth() + 1}`;
  return dateKey;
}

export function trimDescription(
  description: string,
  maxLength: number
): string {
  if (description.length > maxLength) {
    return description.substring(0, maxLength) + "...";
  } else {
    return description;
  }
}
