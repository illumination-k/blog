import yargs from "yargs";

import { Post, PostMeta } from "common/post";

const args = yargs.command(
  "* <posts_root_dir>",
  "parsing all markdown posts in the root directory and output them as json",
  (yargs) => {
    yargs.positional("posts_root_dir", { describe: "root dir of posts", type: "string" });
  },
).argv;

console.log(args);
