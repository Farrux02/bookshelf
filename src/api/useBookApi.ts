import httpRequest from "@/plugins/axios";
import { IHTTPResponse } from "@/types/api";
import { IBook } from "@/types/book";

export const useBookApi = () => {
  return {
    async FETCH_BOOKS(title: string): Promise<IHTTPResponse> {
      let response;
      if (title) {
        response = await httpRequest.get(`/books/${title}`);
        return response.data.map((book: IBook) => ({
          book,
          status: book.status || 1,
        }));
      }

      response = await httpRequest.get(`/books`);

      return response.data?.map((item: IBook) => ({
        book: item.book,
        status: item.status,
      }));
    },
    POST_BOOK(isbn: string): Promise<IHTTPResponse> {
      return httpRequest.post("/books", { isbn });
    },
    DELETE_BOOK(id: number): Promise<IHTTPResponse> {
      return httpRequest.delete(`/books/${id}`);
    },
    PATCH_BOOK(data: { id: number; status: number }): Promise<IHTTPResponse> {
      return httpRequest.patch(`/books/${data.id}`, { status: data.status });
    },
  };
};
