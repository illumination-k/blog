const fs = require("fs");
const sitemap = require("nextjs-sitemap-generator");

const BUILD_ID = fs.readFileSync(".next/BUILD_ID").toString();

sitemap({
  baseUrl: "https://illumination-k.dev",
  pagesDirectory: __dirname + "/.next/server/pages",
  targetDirectory: "public/",
  ignoredExtensions: ["js", "map"],
  ignorePaths: ["[fallback]"],
});
