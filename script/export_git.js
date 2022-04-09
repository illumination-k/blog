const fs = require("fs");
const path = require("path");
const glob = require("glob");
const getGitHistory = require("../libs/getGitHistory");


const POSTDIRPATH = path.join(process.cwd(), "src", "pages", "posts");

function getAllPostsPath(root = POSTDIRPATH) {
  const pattern = path.join(root, "**", "*.md");
  const posts = glob.sync(pattern);
  return posts;
}

function getFormattedDate(date_string) {
  if (date_string === "") {
    return date_string;
  }
  const date = new Date(date_string);
  const formatted = `${date.getFullYear()}/${
    date.getMonth() + 1
  }/${date.getDate()}`.replace(/\n|\r/g, "");

  return formatted;
}

function makeGitHistory(
  root = POSTDIRPATH,
  outdir = path.join(process.cwd(), "tmp")
) {
  const filepaths = getAllPostsPath(root);

  const dates = filepaths.map((p) => {
    const linux_path = String(p).split("/").slice(5, 7).join("/");
    const {update, published } = getGitHistory(p); 
    return {path: linux_path, updated_at: getFormattedDate(update), created_at: getFormattedDate(published)}})
  fs.writeFileSync("githistory.json", JSON.stringify(dates))
}

makeGitHistory()