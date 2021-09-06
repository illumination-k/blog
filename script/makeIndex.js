const { Document } = require("flexsearch");
const fs = require("fs");
const path = require("path");

function newIndex() {
  const index = new Document({
    tokenize: function (str) {
      return str.split(" ");
    },
    document: {
      id: "id",
      field: ["data:words"],
      store: [
        "category",
        "data:title",
        "data:description",
        "update",
        "published",
      ],
    },
  });

  return index;
}

function makeIndex(data) {
  let index = newIndex();
  for (let d of data) {
    index.add(d);
  }
  //console.log(index);
  return index;
}

const buf = fs.readFileSync(path.join(process.cwd(), "cache", "data.json"));
const data = JSON.parse(buf);
const index = makeIndex(data);
const result = index.search("rust", { enrich: true });

const flexSearchIndex = path.join(process.cwd(), "cache", "flexSearchIndex");

// index.export(function (key, data) {
//   console.log(key, data);
//   fs.writeFileSync(path.join(flexSearchIndex, key), JSON.stringify(data));
// });

function importIndex() {
  const flexSearchIndex = path.join(process.cwd(), "cache", "flexSearchIndex");
  const files = fs.readdirSync(flexSearchIndex);

  let index = newIndex();

  for (key of files) {
    const file_path = path.join(process.cwd(), "cache", "flexSearchIndex", key);

    const buf = fs.readFileSync(file_path);
    console.log("--------------------------------");
    console.log(file_path);
    const val = JSON.parse(buf);
    console.log(val);
  }
}
