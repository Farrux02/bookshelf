import { useBookApi } from "@/api/useBookApi";
import { useMutation, useQueryClient } from "react-query";

export const useBookDeleteService = () => {
  const { DELETE_BOOK } = useBookApi();
  const queryClient = useQueryClient();

  const { mutate: deleteBook } = useMutation({
    mutationFn: (id: number) => DELETE_BOOK(id),
    onSuccess: () => {
      queryClient.invalidateQueries("books");
      //   queryClient.setQueryData("books", data.data);
    },
  });

  return { deleteBook };
};
