import { useBookApi } from "@/api/useBookApi";
import { IHTTPResponse } from "@/types/api";
import { useQuery } from "react-query";

export const useBooksGetService = (title: string) => {
  const { FETCH_BOOKS } = useBookApi();

  return useQuery<IHTTPResponse, Error>({
    queryKey: ["books", title],
    queryFn: () => FETCH_BOOKS(title),
    retry: false,
  });
};
