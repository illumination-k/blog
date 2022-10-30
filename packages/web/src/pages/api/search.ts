import BackendApi from "@libs/api";
import { getFormattedDate, post2meta, trimDescription } from "@libs/utils";
import { NextApiRequest, NextApiResponse } from "next/types";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  let query;
  if ("q" in req.query) {
    if (typeof req.query.q === "string") {
      query = req.query.q;
      if (query === "") {
        query = undefined;
      }
    } else {
      query = undefined;
    }
  } else {
    query = undefined;
  }

  const resp = await BackendApi.searchGet(query);

  if (resp.status !== 200) {
    console.error(resp);
  }

  const metas = resp.data.map((post) => {
    const meta = post2meta(post);
    let { description, category, created_at, updated_at, title, slug } = meta;
    const url = `/techblog/posts/${slug}`;
    const category_url = `/techblog/categories/${category}/1`;
    description = trimDescription(description, 120);
    created_at = getFormattedDate(created_at);
    updated_at = getFormattedDate(updated_at);
    return {
      title,
      url,
      category,
      category_url,
      description,
      created_at,
      updated_at,
    };
  });

  res.status(200).json(metas);
}
