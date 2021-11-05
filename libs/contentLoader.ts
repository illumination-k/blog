import fs from "fs";
import path from "path";

import glob from "glob";

import matter from "gray-matter";

const POSTDIRPATH = path.join(process.cwd(), "src", "pages", "posts");
import { CachedPost, Meta } from "./types";

export function getFileNames(categories, root = POSTDIRPATH) {
  // return mdx filenames (eg., make_blog_1.mdx)
  const postsDirPath = path.join(root, categories);
  const fileNames = fs
    .readdirSync(postsDirPath)
    .filter(
      (filename) =>
        path.parse(filename).ext === ".mdx" ||
        path.parse(filename).ext === ".md"
    );

  return fileNames;
}

export function getCategories(
  root = path.join(process.cwd(), "src", "pages", "posts")
) {
  const categories = fs.readdirSync(root).filter((name) => {
    const stats = fs.statSync(path.join(root, name));
    return stats.isDirectory();
  });

  return categories;
}

export function getAllPostsPath(root: string = POSTDIRPATH): string[] {
  const posts = glob
    .sync(path.join(root, "**", "*.md"))
    .map((p) => path.resolve(p));
  return posts;
}

export function getMeta(
  filepath: string,
  cachePath: string = path.join(process.cwd(), "cache", "data.json")
) {
  const file = fs.readFileSync(filepath);
  const posts: CachedPost[] = JSON.parse(fs.readFileSync(cachePath).toString());

  const raw = matter(file);
  const { title, description } = raw.data;
  const post = posts.filter(
    (post) => post.data.title == title && post.data.description == description
  );

  if (posts.length === 0) {
    throw "Error in libs/contentLoader/getMeta! There is no post in cache corresponding to title and description";
  }
  const { update, published, category } = post[0];

  const meta: Meta = Object.assign(raw.data, {
    update: update,
    published: published,
    category: category,
  });

  return meta;
}
