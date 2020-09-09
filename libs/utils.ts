const path = require("path");
import { getAllPosts, getMeta } from "./contentLoader";

export function range(stop) {
  return Array.from({ length: stop }, (_, i) => i + 1);
}

export async function getPageInfo(page: number, COUNT_PER_PAGE: number) {
  const end = page * COUNT_PER_PAGE;
  const start = end - COUNT_PER_PAGE;
  const all_posts = await getAllPosts();
  const posts = all_posts.slice(start, end);
  const post_info = await Promise.all(
    posts.map(async (post) => {
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

  const total_pages = Math.ceil(all_posts.length / COUNT_PER_PAGE);

  return {
    post_info: post_info,
    page: page,
    total_pages: total_pages,
  };
}
