import { useSignupApi } from "@/api/useSignupApi";
import { IHTTPResponse, ISignupRequest } from "@/types/api";
import { useMutation, useQuery } from "react-query";
import { toast } from "react-toastify";

const notify = (message: string) =>
  toast.success(message, {
    position: "bottom-right",
    autoClose: 4000,
  });

export const useSessionService = () => {
  const { POST_SIGNUP, FETCH_USER_INFO } = useSignupApi();

  const { mutate: Signup, isLoading: busy } = useMutation({
    mutationFn: (data: ISignupRequest) => POST_SIGNUP(data),
    onSuccess: ({ data }) => {
      localStorage.setItem("key", data.key);
      localStorage.setItem("secret", data.secret);
      notify("Signed up successfully");
    },
  });

  const Logout = () => {
    localStorage.removeItem("key");
    window.location.reload();
  };

  const userInfo = useQuery<IHTTPResponse, Error>({
    queryKey: ["user"],
    queryFn: FETCH_USER_INFO,
    retry: false,
    staleTime: 1000 * 60 * 60,
    enabled: false
    // gcTime: 1000 * 60 * 60,
  });

  return { Signup, busy, Logout, userInfo };
};
