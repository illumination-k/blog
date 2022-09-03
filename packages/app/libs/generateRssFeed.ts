import { Feed } from "feed";
import fs from "fs";
import path from "path";
import Api from "./api";
import { createTechblogPostUrl } from "./utils";

export default async function generateRssFeed() {
  const url = "https://www.illumination-k.dev";
  const now = new Date();

  const author = {
    name: "illumination-k",
    email: "illumination-k@gmail.com",
    link: url,
  };

  const feed = new Feed({
    title: "illumination-k.dev",
    description: "Feed/Rss/Atom for illumination-k.dev",
    author: author,
    id: url,
    link: url,
    updated: now,
    copyright: `All rights reserved ${now.getFullYear()}, ${author.name}`,
    feedLinks: {
      rss2: `${url}/rss/feed.xml`,
      json: `${url}/rss/feed.json`,
      atom: `${url}/rss/atom.xml`,
    },
  });

  const posts = await (await Api.postsGet()).data;

  posts.forEach((post) => {
    const postUrl = createTechblogPostUrl(post.slug, url);
    feed.addItem({
      title: post.title,
      description: post.description,
      id: postUrl,
      link: postUrl,
      date: new Date(post.updated_at),
    });
  });

  const rssDir = path.join(process.cwd(), "public", "rss");
  fs.mkdir(rssDir, { recursive: true }, (err) => {
    if (err) {
      throw err;
    }
  });

  fs.writeFile(path.join(rssDir, "feed.xml"), feed.rss2(), (err) => {
    if (err) {
      throw err;
    }
  });

  fs.writeFile(path.join(rssDir, "atom.xml"), feed.atom1(), (err) => {
    if (err) {
      throw err;
    }
  });

  fs.writeFile(path.join(rssDir, "feed.json"), feed.json1(), (err) => {
    if (err) {
      throw err;
    }
  });
}
