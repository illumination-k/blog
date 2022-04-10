import { trimDescription } from "@libs/utils";
import BackendApi from "@libs/api";
import { Post } from "@libs/axios";

function shuffle(array) {
  for (let i = array.length; i > 1; i--) {
    const r = Math.floor(Math.random() * i);
    const temp = array[r];
    array[r] = array[i - 1];
    array[i - 1] = temp;
  }

  return array;
}

async function getRecommend(
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

export default async function handler(req, res) {
  const category = req.query.category;
  const uuid = req.query.uuid;
  const recommends = await getRecommend(category, uuid, 5);

  res.status(200).json(recommends);
}
