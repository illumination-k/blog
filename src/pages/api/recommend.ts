import { trimDescription } from "@libs/utils";
import BackendApi from "@libs/api";
import { Post } from "@libs/axios";
import { NextApiRequest, NextApiResponse } from "next/types";

function shuffle<T>(array: T[]): T[] {
  for (let i = array.length; i > 1; i--) {
    const r = Math.floor(Math.random() * i);
    const temp = array[r];
    array[r] = array[i - 1];
    array[i - 1] = temp;
  }

  return array;
}

async function getRecommends(
  category: string | undefined,
  uuid: string | undefined,
  size: number
) {
  let allPosts: Post[] = (await BackendApi.postsGet()).data;

  allPosts = shuffle(allPosts);

  if (uuid) {
    allPosts = allPosts.filter((p) => p.uuid !== uuid);
  }

  let recommend_posts = allPosts.filter((p) => p.category === category);

  const left = size - recommend_posts.length;

  if (left > 0) {
    for (let i = 0; i < left; i++) {
      recommend_posts.push(allPosts[i]);
    }
  } else {
    recommend_posts = allPosts.slice(0, size);
  }

  const recommends = recommend_posts.map((p) => {
    return {
      title: p.title,
      description: trimDescription(p.description, 120),
      url: `/techblog/posts/${p.slug}`,
      update: p.updated_at,
      published: p.created_at,
      category: p.category,
    };
  });

  return recommends;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  let category: string | undefined = undefined;
  let uuid: string | undefined = undefined;
  if ("category" in req.query) {
    if (typeof req.query.category === "string") {
      category = req.query.category;
    } else {
      res.status(400).json("Bad Request");
      return;
    }
  }

  if ("uuid" in req.query) {
    if (typeof req.query.uuid === "string") {
      uuid = req.query.uuid;
    } else {
      res.status(400).json("Bad Request");
      return;
    }
  }

  const recommends = await getRecommends(category, uuid, 5);

  res.status(200).json(recommends);
}
