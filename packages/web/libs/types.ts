export type CachedPost = {
  id: string;
  category: string;
  update: string;
  url: string;
  published: string;
  data: {
    title: string;
    description: string;
    words: string;
  };
};

export type Meta = {
  [key: string]: any;
} & {
  update: string;
  published: string;
  category: string;
};

export type PostInfo = {
  name: string;
  categoryId: string;
  meta: Meta;
};
