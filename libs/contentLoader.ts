import fs from "fs";
import path from "path";
import glob from "glob";
import matter from "gray-matter";
import getHistory from "@libs/getGitHistory";
import getGitHistory from "@libs/getGitHistory";

const POSTDIRPATH = path.join(process.cwd(), "src", "pages", "posts");

export async function getFilePath(filename, categoryId) {
  return path.join(POSTDIRPATH, categoryId, filename);
}

export async function getFileNames(categories) {
  // return mdx filenames (eg., make_blog_1.mdx)
  const postsDirPath = path.join(POSTDIRPATH, categories);
  const fileNames = await fs
    .readdirSync(postsDirPath)
    .filter(
      (filename) =>
        path.parse(filename).ext === ".mdx" ||
        path.parse(filename).ext === ".md"
    );

  console.log(fileNames)
  return fileNames;
}

export async function getPathToFiles(categories) {
  // return full path to mdx files (eg., )
  const mdxFileNames = await getFileNames(categories);
  const pathToMdxFiles = mdxFileNames.map((filename) =>
    path.join(POSTDIRPATH, filename)
  );

  return pathToMdxFiles;
}

export async function getNames(categories) {
  // remove extensions from mdxFileNames (eg., make_blog_1)
  const mdxFileNames = await getFileNames(categories);
  const mdxNames = mdxFileNames.map((filename) =>
    filename.replace(/\.mdx*/, "")
  );

  return mdxNames;
}

export async function getCategories() {
  const dirPath = path.join(process.cwd(), "src", "pages", "posts");
  const categories = await fs.readdirSync(dirPath).filter((name) => {
    const stats = fs.statSync(path.join(dirPath, name));
    return stats.isDirectory();
  });

  return categories;
}

export async function getAllPosts() {
  const posts = await glob.sync(path.join(POSTDIRPATH, "**", "*.md"));
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

  const { update, published } = post[0];

  const meta = Object.assign(raw.data, {
    update: update,
    published: published,
  });

  return meta;
}
