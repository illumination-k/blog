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
  let posts = await (
    await BackendApi.postsGet(undefined, undefined, undefined, undefined)
  ).data;
  let recommend_post: Post[] = [];

  posts = shuffle(posts);
  if (uuid) {
    posts = posts.filter((p) => p.uuid !== uuid);
  }

  const left = size - recommend_post.length;

  if (left > 0) {
    for (let i = 0; i < left; i++) {
      recommend_post.push(posts[i]);
    }
  } else {
    recommend_post = recommend_post.slice(0, size);
  }

  const recommend = recommend_post.map((p) => ({
    title: p.title || "",
    description: trimDescription(p.description || "", 120),
    url: `/techblog/${p.slug}`,
    update: p.update_at,
    published: p.created_at,
    category: p.category,
  }));

  return recommend;
}

export default function handler(req, res) {
  const category = req.query.category;
  const uuid = req.query.uuid;
  const recommend = getRecommend(category, uuid, 5);

  res.status(200).json(recommend);
}
