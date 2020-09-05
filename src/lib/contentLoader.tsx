import fs from "fs";
import path from "path";

const POSTDIRPATH = path.join(process.cwd(), "src", "pages", "posts");

export async function getFilePath(filename) {
  return path.join(POSTDIRPATH, filename);
}

export async function getFileNames() {
  // return mdx filenames (eg., make_blog_1.mdx)
  const postsDirPath = POSTDIRPATH;
  const mdxFileNames = await fs
    .readdirSync(postsDirPath)
    .filter(
      (filename) =>
        path.parse(filename).ext === ".mdx" ||
        path.parse(filename).ext === ".md"
    );
  return mdxFileNames;
}

export async function getPathToFiles() {
  // return full path to mdx files (eg., )
  const mdxFileNames = await getFileNames();
  const pathToMdxFiles = mdxFileNames.map((filename) =>
    path.join(POSTDIRPATH, filename)
  );

  return pathToMdxFiles;
}

export async function getNames() {
  // remove extensions from mdxFileNames (eg., make_blog_1)
  const mdxFileNames = await getFileNames();
  const mdxNames = mdxFileNames.map((filename) =>
    filename.replace(/\.mdx*/, "")
  );

  return mdxNames;
}
