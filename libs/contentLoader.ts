import fs from "fs";
import path from "path";

import glob from "glob";

import matter from "gray-matter";

const POSTDIRPATH = path.join(process.cwd(), "src", "pages", "posts");

export function getFilePath(filename: string, categoryId: string): string {
  return path.join(POSTDIRPATH, categoryId, filename);
}

export function getFileNames(categories) {
  // return mdx filenames (eg., make_blog_1.mdx)
  const postsDirPath = path.join(POSTDIRPATH, categories);
  const fileNames = fs
    .readdirSync(postsDirPath)
    .filter(
      (filename) =>
        path.parse(filename).ext === ".mdx" ||
        path.parse(filename).ext === ".md"
    );

  return fileNames;
}

export function getPathToFiles(categories) {
  // return full path to mdx files (eg., )
  const mdxFileNames = getFileNames(categories);
  const pathToMdxFiles = mdxFileNames.map((filename) =>
    path.join(POSTDIRPATH, filename)
  );

  return pathToMdxFiles;
}

export function getNames(categories) {
  // remove extensions from mdxFileNames (eg., make_blog_1)
  const mdxFileNames = getFileNames(categories);
  const mdxNames = mdxFileNames.map((filename) =>
    filename.replace(/\.mdx*/, "")
  );

  return mdxNames;
}

export function getCategories() {
  const dirPath = path.join(process.cwd(), "src", "pages", "posts");
  const categories = fs.readdirSync(dirPath).filter((name) => {
    const stats = fs.statSync(path.join(dirPath, name));
    return stats.isDirectory();
  });

  return categories;
}

export function getAllPosts(rootPath: string = POSTDIRPATH) {
  const posts = glob.sync(path.join(rootPath, "**", "*.md"));
  return posts;
}

export async function getMeta(filepath: string) {
  const file = fs.readFileSync(filepath);
  const cachePath = path.join(process.cwd(), "cache", "data.json");
  const posts = JSON.parse(fs.readFileSync(cachePath).toString());
  // const date = getGitHistory(filepath);

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
