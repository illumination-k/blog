export default class Post {
  id: string;
  title: string;
  description: string;
  lang: string;
  text: string;
  category: string;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;

  constructor(
    id: string,
    title: string,
    description: string,
    lang: string,
    text: string,
    category: string,
    tags: string[] = [],
    createdAt: Date,
    updatedAt: Date,
  ) {
    this.id = id;
    this.title = title;
    this.lang = lang;
    this.text = text;
    this.description = description;
    this.category = category;
    this.tags = tags;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  get url() {
    return `/${this.category}/${this.id}`;
  }
}
