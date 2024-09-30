import { useSignupApi } from "@/api/useSignupApi";
import { IHTTPResponse } from "@/types/api";
import { useQuery } from "react-query";

export const useUserService = () => {
  const { FETCH_USER_INFO } = useSignupApi();

  return useQuery<IHTTPResponse, Error>({
    queryKey: ["user"],
    queryFn: FETCH_USER_INFO,
    retry: false,
    staleTime: 1000 * 60 * 60,
  });
};
