import fs from "fs";
import path from "path";

const POSTDIRPATH = path.join(process.cwd(), "src", "pages", "posts");

export async function getFilePath(filename) {
  return path.join(POSTDIRPATH, filename);
}

export async function getMdxFileNames() {
  // return mdx filenames (eg., make_blog_1.mdx)
  const postsDirPath = POSTDIRPATH;
  const mdxFileNames = await fs
    .readdirSync(postsDirPath)
    .filter((filename) => path.parse(filename).ext === ".mdx");
  return mdxFileNames;
}

export async function getPathToMdxFiles() {
  // return full path to mdx files (eg., )
  const mdxFileNames = await getMdxFileNames();
  const pathToMdxFiles = mdxFileNames.map((filename) =>
    path.join(POSTDIRPATH, filename)
  );

  return pathToMdxFiles;
}

export async function getMdxNames() {
  // remove extensions from mdxFileNames (eg., make_blog_1)
  const mdxFileNames = await getMdxFileNames();
  const mdxNames = mdxFileNames.map((filename) =>
    filename.replace(/\.mdx*/, "")
  );

  return mdxNames;
}
