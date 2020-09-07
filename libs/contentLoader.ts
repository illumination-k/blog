import fs from "fs";
import path from "path";
import glob from "glob"
import matter from "gray-matter"

const POSTDIRPATH = path.join(process.cwd(), "src", "pages", "posts");

export async function getFilePath(filename) {
  return path.join(POSTDIRPATH, filename);
}

export async function getFileNames(categories) {
  // return mdx filenames (eg., make_blog_1.mdx)
  const postsDirPath = path.join(POSTDIRPATH, categories);
  const mdxFileNames = await fs
    .readdirSync(postsDirPath)
    .filter(
      (filename) =>
        path.parse(filename).ext === ".mdx" ||
        path.parse(filename).ext === ".md"
    );
  return mdxFileNames;
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
  return posts
}

export async function getMeta(filepath) {
  const file = fs.readFileSync(filepath);
  const raw = matter(file);
  const meta = raw.data

  return meta
}