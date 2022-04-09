import React from "react";

export type MetaWithChildren = {
  meta: Meta;
  children: React.ReactNode;
};

export type Heading = {
  depth: number;
  value: string;
  url: string;
};

export type Meta = {
  headings: Heading[];
  title: string;
  description: string;
  slug: string;
  uuid: string;
  category: string;
  tags: string[];
  lang: "ja" | "en";
  created_at: string;
  updated_at: string;
};
