import { useBookApi } from "@/api/useBookApi";
import { useMutation, useQueryClient } from "react-query";

export const useBookStatusService = () => {
  const { PATCH_BOOK } = useBookApi();
  const queryClient = useQueryClient();

  const { mutate: changeStatus } = useMutation({
    mutationFn: (data: { id: number; status: number }) => PATCH_BOOK(data),
    onSuccess: () => {
      queryClient.invalidateQueries("books");
    },
  });

  return { changeStatus };
};
