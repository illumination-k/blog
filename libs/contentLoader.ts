import fs from "fs";
import path from "path";

import glob from "glob";

import matter from "gray-matter";

const POSTDIRPATH = path.join(process.cwd(), "src", "pages", "posts");

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
  dirPath = path.join(process.cwd(), "src", "pages", "posts")
) {
  const categories = fs.readdirSync(dirPath).filter((name) => {
    const stats = fs.statSync(path.join(dirPath, name));
    return stats.isDirectory();
  });

  return categories;
}

export function getAllPosts(root: string = POSTDIRPATH) {
  const posts = glob.sync(path.join(root, "**", "*.md"));
  return posts;
}

export function getMeta(
  filepath: string,
  cachePath: string = path.join(process.cwd(), "cache", "data.json")
) {
  const file = fs.readFileSync(filepath);
  const posts = JSON.parse(fs.readFileSync(cachePath).toString());

  const raw = matter(file);
  const { title, description } = raw.data;
  const post = posts.filter(
    (post) => post.data.title == title && post.data.description == description
  );

  const { update, published, category } = post[0];

  const meta = Object.assign(raw.data, {
    update: update,
    published: published,
    category: category,
  });

  return meta;
}
