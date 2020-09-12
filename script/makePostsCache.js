const fs = require("fs");
const path = require("path");
const matter = require("gray-matter");
const glob = require("glob");
const Fuse = require("fuse.js");
const remark = require(`remark`);
const strip = require(`strip-markdown`);
const { tokenize } = require(`kuromojin`);

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
    .filter((word) => word.length >= 2);
}

async function makePostsCache() {
  const filepaths = getAllPosts();

  const posts = await Promise.all(
    filepaths.map(async (filepath) => {
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

      console.log(words);

      return {
        id: id,
        category: category,
        data: {
          title: matterResult.data.title,
          description: matterResult.data.description,
          words: words.join(" "),
        },
      };
    })
  );

  const fileContents = `export const posts = ${JSON.stringify(posts)}`;
  const outdir = path.join(process.cwd(), "cache");
  fs.writeFileSync(path.join(outdir, "data.js"), fileContents);
}

makePostsCache();
