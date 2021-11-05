import path from "path";
import { getAllPostsPath, getCategories, getFileNames } from "../contentLoader";

const TEST_POSTDIRPATH = path.join(process.cwd(), "test", "posts");

describe("lib/contentLoader.ts", () => {
  it("getAllPostsPath: return all posts from root dir", () => {
    const actual = getAllPostsPath(TEST_POSTDIRPATH);
    const expected = ["a/test_a.md", "b/test_b.md"].map((n) =>
      path.resolve(path.join(TEST_POSTDIRPATH, n))
    );
    expect(actual).toStrictEqual(expected);
  });

  it("getCategories: return all categories from rootdir", () => {
    const actual = getCategories(TEST_POSTDIRPATH);
    const expected = ["a", "b"];
    expect(JSON.stringify(actual)).toStrictEqual(JSON.stringify(expected));
  });

  it("getFileNames: return md file names", () => {
    const actual = getFileNames("a", TEST_POSTDIRPATH);
    const expected = ["test_a.md"];
    expect(JSON.stringify(actual)).toStrictEqual(JSON.stringify(expected));
  });
});
