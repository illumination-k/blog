const fs = require("fs");
const path = require("path");
const matter = require("gray-matter");
const glob = require("glob");
const remark = require(`remark`);
const strip = require(`strip-markdown`);
const { tokenize } = require(`kuromojin`);

const getGitHistory = require("../libs/getGitHistory");

const POSTDIRPATH = path.join(process.cwd(), "src", "pages", "posts");

function getAllPosts() {
  const pattern = path.join(POSTDIRPATH, "**", "*.md");
  const posts = glob.sync(pattern);
  return posts;
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
  const res = await tokenize(text);
  const POS_LIST = [`名詞`, `動詞`, `形容詞`];
  const IGNORE_REGEX = /^[!-/:-@[-`{-~、-〜”’・]+$/;
  return res
    .filter((token) => POS_LIST.includes(token.pos))
    .map((token) => token.surface_form)
    .filter((word) => !IGNORE_REGEX.test(word))
    .filter((word) => word.length >= 2)
    .map((word) => word.toLowerCase());
}

async function makePostsCache() {
  const filepaths = getAllPosts();

  const posts = await Promise.all(
    filepaths.map(async (filepath) => {
      const { update, published } = getGitHistory(filepath);
      const id = path.parse(filepath).base.replace(".md", "");
      const category = path.basename(path.parse(filepath).dir);
      const contents = fs.readFileSync(filepath);
      const matterResult = matter(contents);
      const text = markdownToText(matterResult.content);

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
  
  const index = posts.map((v) => ({ title: v.data.title, url: v.url, body: v.data.words }))
  const indexJson = `${JSON.stringify(index)}`

  const jsonFileContents = `${JSON.stringify(posts)}`;
  const jsFileContents = `export const posts = ${jsonFileContents}`;
  const outdir = path.join(process.cwd(), "cache");
  fs.writeFileSync(path.join(outdir, "index.json"), indexJson)
  fs.writeFileSync(path.join(outdir, "data.json"), jsonFileContents);
  fs.writeFileSync(path.join(outdir, "data.js"), jsFileContents);
}

makePostsCache();
