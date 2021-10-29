import path from "path"
import { getMeta } from "./contentLoader";

export function updateMapArray<K, V>(map: Map<K, V[]>, key: K, value: V) {
  const old: V[] = map.get(key) ?? new Array<V>();
  map.set(key, [...old, value]);
}

/**
 * return array until stop from 1
 * @param stop number 
 * @returns number[] 
 */
export function range(stop): number[] {
  return Array.from({ length: stop }, (_, i) => i + 1);
}

export function sortPost(
  post_info,
  sortedBy: "update" | "published" = "update"
) {
  return post_info.sort(function (a: any, b: any) {
    const a_date = new Date(a.meta[sortedBy]);
    const b_date = new Date(b.meta[sortedBy]);
    return b_date.valueOf() - a_date.valueOf();
  });
}

export async function getMetaFromAllPosts(all_posts: Array<string>) {
  return await Promise.all(
    all_posts.map(async (post) => {
      const meta = await getMeta(post);
      const { dir, name } = path.parse(post);
      const categoryId = path.basename(dir);
      return {
        name,
        categoryId,
        meta,
      };
    })
  );
}

export async function getPageInfo(
  all_posts: Array<string>,
  page: number,
  COUNT_PER_PAGE: number
) {
  const end = page * COUNT_PER_PAGE;
  const start = end - COUNT_PER_PAGE;

  const all_post_info = await Promise.all(
    all_posts.map(async (post) => {
      const meta = await getMeta(post);
      const { dir, name } = path.parse(post);
      const categoryId = path.basename(dir);
      return {
        name,
        categoryId,
        meta,
      };
    })
  );

  const all_sorted_post_info = sortPost(all_post_info);

  const post_info = all_sorted_post_info.slice(start, end);
  const total_pages = Math.ceil(all_posts.length / COUNT_PER_PAGE);

  return {
    post_info: post_info,
    page: page,
    total_pages: total_pages,
  };
}

export function get_formatted_date(date_string: string): string {
  if (date_string === "") {
    return date_string;
  }
  const date = new Date(date_string);
  const formatted = `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`.replace(/\n|\r/g, "");

  return formatted;
}

export function getDateKey(date_string: string): string {
  const date = new Date(date_string);
  const dateKey = `${date.getFullYear()}/${date.getMonth() + 1}`;
  return dateKey;
}

export function trimDescription(description: string, maxLength: number): string {
  if (description.length > maxLength) {
    return description.substring(0, maxLength) + "...";
  } else {
    return description;
  }
}
