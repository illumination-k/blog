import { TypeOf, z } from "zod";

const bookShema = z.object({
  isbn: z.string(),
  asin: z.string(),
  title: z.string(),
  authors: z.array(z.string()),
});

export type Book = z.infer<typeof bookShema>;

export interface IBookService {
  get: (isbn: string[]) => Book[];
}
