const fs = require("fs");
const path = require("path");
const matter = require("gray-matter");
const glob = require("glob");
const remark = require(`remark`);
const strip = require(`strip-markdown`);
const { tokenize } = require(`kuromojin`);

const getGitHistory = require("../libs/getGitHistory");

const POSTDIRPATH = path.join(process.cwd(), "src", "pages", "posts");
const POS_LIST = [`名詞`, `動詞`, `形容詞`];
const IGNORE_REGEX = /^[!-/:-@[-`{-~、-〜”’・]+$/;

function getAllPostsPath(root = POSTDIRPATH) {
  const pattern = path.join(root, "**", "*.md");
  const posts = glob.sync(pattern);
  return posts;
}

function parseArgv() {
  const argv = process.argv;

  if (argv.length < 3) {
    return "prd";
  }

  if (argv[2] === "test") {
    return "test";
  } else if (argv[2] === "prd") {
    return "prd";
  } else {
    throw "Please use prd or test for argv";
  }
}

function markdownToText(content) {
  let text;
  remark()
    .use(strip, { keep: ["code"] })
    .process(content, (err, file) => {
      if (err) throw err;
      text = file.contents;
    });
  return text;
}

async function filterToken(text) {
  // tokenize が Promiseを返すのでasyncは必要
  const res = tokenize(text)
    .then((res) => {
      return res
        .filter((token) => POS_LIST.includes(token.pos))
        .map((token) => token.surface_form)
        .filter((word) => !IGNORE_REGEX.test(word))
        .filter((word) => {
          if (word) {
            return word.length >= 2;
          }
          return false;
        })
        .map((word) => word.toLowerCase());
    })
    .catch((error) => {
      console.log(error);
    });
  return res;
}

async function makePostsCache(
  root = POSTDIRPATH,
  outdir = path.join(process.cwd(), "cache")
) {
  const filepaths = getAllPostsPath(root);

  const posts = await Promise.all(
    filepaths.map(async (filepath) => {
      console.log(filepath);
      const { update, published } = getGitHistory(filepath);
      const id = path.parse(filepath).base.replace(".md", "");
      const category = path.basename(path.parse(filepath).dir);
      const contents = fs.readFileSync(filepath);
      const matterResult = matter(contents);
      const text = markdownToText(matterResult.content);

      if (!text || !matterResult.data.title || !matterResult.data.description) {
        throw `Error in ${filepath}. title: ${matterResult.data.title}, description: ${matterResult.data.description}, text: ${text}, `
      }

      const text_words = await filterToken(text);
      const title_words = await filterToken(matterResult.data.title);
      const description_words = await filterToken(
        matterResult.data.description
      );
      const all_words = [
        ...text_words,
        ...title_words,
        ...description_words,
        category,
      ];
      const words = [...new Set(all_words)];

      return {
        id: id,
        category: category,
        update: update,
        url: `https://illumination-k.dev/posts/${category}/${id}`,
        published: published,
        data: {
          title: matterResult.data.title,
          description: matterResult.data.description,
          words: words.join(" "),
        },
      };
    })
  );

  // const index = posts.map((v) => ({ title: v.data.title, url: v.url, body: v.data.words }))
  // const indexJson = `${JSON.stringify(index)}`

  const jsonFileContents = `${JSON.stringify(posts)}`;
  const jsFileContents = `export const posts = ${jsonFileContents}`;
  // const outdir = path.join(process.cwd(), "cache");
  // fs.writeFileSync(path.join(outdir, "index.json"), indexJson)
  fs.writeFileSync(path.join(outdir, "data.json"), jsonFileContents);
  fs.writeFileSync(path.join(outdir, "data.js"), jsFileContents);
}

const mode = parseArgv()

let root;
let outdir;

if (mode === "prd") {
  root = POSTDIRPATH
  outdir = path.join(process.cwd(), "cache")
} else {
  root = path.join(process.cwd(), "test", "posts")
  outdir = path.join(process.cwd(), "test", "cache")
}

makePostsCache(root, outdir);
