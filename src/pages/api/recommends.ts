import path from "path"

function shuffle(array) {
    for(let i = array.length; i > 1; i--) {
      const r = Math.floor(Math.random() * i);
      const temp = array[r];
      array[r] = array[i-1];
      array[i-1] = temp;
    }

    return array
}

export default function handler(req, res) {
    const category = req.query.category;

    let { posts } = require("../../../cache/data");
    let recommend_post: any[] = []

    posts = shuffle(posts);
    if (category) {
        recommend_post = posts.filter((p) => { return p.category === category})
        posts = posts.filter((p) => p.category !== category);
    }

    const left = 3 - recommend_post.length;
    console.log(left)
    if (left > 0) {
        for (let i = 0; i < left; i++) {
            recommend_post.push(posts[i])
        }
    } else {
        recommend_post = recommend_post.slice(0, 2)
    }
    res.status(200).json(recommend_post) 
}