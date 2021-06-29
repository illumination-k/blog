const path = require("path");
import { getMeta } from "./contentLoader";

export function range(stop) {
  return Array.from({ length: stop }, (_, i) => i + 1);
}

export function sortPost(post_info) {
  return post_info.sort(function (a: any, b: any) {
    const a_date = new Date(a.meta.update);
    const b_date = new Date(b.meta.update);
    return b_date.valueOf() - a_date.valueOf();
  });
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

export function get_formatted_date(date_string: string) {
  if (date_string === "") {
    return date_string;
  }
  const date = new Date(date_string);
  const formatted = `
  ${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}
  `.replace(/\n|\r/g, "");

  return formatted;
}

export function trimDescription(description: string, maxLength: number) {
  if (description.length > maxLength) {
    return description.substring(0, maxLength) + "...";
  } else {
    return description;
  }
}
