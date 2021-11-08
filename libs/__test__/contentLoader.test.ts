import path from "path";
import {
  getAllPostsPath,
  getCategories,
  getFileNames,
  getMeta,
} from "../contentLoader";

const TEST_POSTDIRPATH = path.join(process.cwd(), "test", "posts");
const TEST_CACHEDIR = path.join(process.cwd(), "test", "cache");
const isDate = (v) => !isNaN(new Date(v).getTime());

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

  it("getMeta: get metadata of filepath from cache", () => {
    const meta = getMeta(
      path.join(TEST_POSTDIRPATH, "a", "test_a.md"),
      path.join(TEST_CACHEDIR, "data.json")
    );
    expect(meta.category).toEqual("a");
    expect(isDate(meta.update)).toEqual(true);
    expect(isDate(meta.published)).toEqual(true);
  });

  it("getMeta:empty title. expect throw error", () => {
    expect(() =>
      getMeta(
        path.join(TEST_POSTDIRPATH, "a", "test_a.md"),
        path.join(TEST_CACHEDIR, "inconsistantData.json")
      )
    ).toThrow(
      "Error in libs/contentLoader/getMeta! There is no post in cache corresponding to title and description"
    );
  });
});
