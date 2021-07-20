const visit = require("unist-util-visit");
const sizeOf = require("image-size");

const sr = require("sync-request");

function makeFixedValue(gh_card_url, repo_url, alt, dimensions) {
  const width = dimensions.width;
  const height = dimensions.height;
  const value = `
        <a href="${repo_url}">
            <amp-img
                layout="fixed"
                src="${gh_card_url}"
                alt="${alt}"
                height="${height}"
                width="${width}" 
            />
        </a>
        `;
  return value;
}

function transformToJsxNode(parent, index, value, position) {
  const newNode = {
    type: "jsx",
    value: value,
    postion: position,
  };

  parent.children[index] = newNode;
}

module.exports = toGithubRepoImage;

function toGithubRepoImage() {
  return transformer;

  function transformer(ast) {
    visit(ast, "image", visitor);

    function visitor(node, index, parent) {
      const url = node.url;
      const alt = node.alt;
      const position = node.position;

      if (!url.startsWith("github")) {
        return;
      }

      const repo_name = url.split(":")[1];
      const gh_card_url = `https://gh-card.dev/repos/${repo_name}.svg`;
      const repo_url = `https://github.com/${repo_name}`;

      const res = sr("GET", gh_card_url);
      const buf = Buffer.from(res.getBody());
      const dimensions = sizeOf(buf);

      const value = makeFixedValue(gh_card_url, repo_url, alt, dimensions);

      transformToJsxNode(parent, index, value, position);
    }
  }
}
