import { trimDescription } from "@libs/utils";

function shuffle(array) {
    for(let i = array.length; i > 1; i--) {
        const r = Math.floor(Math.random() * i);
        const temp = array[r];
        array[r] = array[i-1];
        array[i-1] = temp;
    }

    return array
}

function getRecommend(category: string | null, id: string | null, size: number) {
    let { posts } = require("../../../cache/data");
    let recommend_post: any[] = []

    posts = shuffle(posts);
    if (id) {
        posts = posts.filter((p) => p.id !== id);
    }

    if (category) {
        recommend_post = posts.filter((p) => { return p.category === category})
        posts = posts.filter((p) => p.category !== category);
    }

    const left = size - recommend_post.length;

    if (left > 0) {
        for (let i = 0; i < left; i++) {
            recommend_post.push(posts[i])
        }
    } else {
        recommend_post = recommend_post.slice(0, size)
    }

    const recommend = recommend_post.map((p) => ({
        title: p.data.title,
        description: trimDescription(p.data.description, 120),
        url: `/posts/${p.category}/${p.id}`,
        update: p.update,
        published: p.published,
        category: p.category,
    }))

    return recommend
}

export default function handler(req, res) {
    const category = req.query.category;
    const id = req.query.id;
    const recommend = getRecommend(category, id, 5);

    res.status(200).json(recommend) 
}