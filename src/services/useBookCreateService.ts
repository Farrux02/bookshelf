import { useBookApi } from "@/api/useBookApi";
import { useMutation } from "react-query";

export const useBookCreateService = () => {
  const { POST_BOOK } = useBookApi();

  const { mutate: createBook } = useMutation({
    mutationFn: (isbn: string) => POST_BOOK(isbn),
    onSuccess: (data) => {
      console.log(data);
    },
  });

  return { createBook };
};
