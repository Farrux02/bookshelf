export interface IBook {
  book: {
    id: number;
    title: string;
    isbn: string;
    author: string;
    cover: string;
    published: number;
  };
  status: number;
}
