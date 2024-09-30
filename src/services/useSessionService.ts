import { useSignupApi } from "@/api/useSignupApi";
import { ISignupRequest } from "@/types/api";
import { useMutation } from "react-query";
import { toast } from "react-toastify";

const notify = (message: string) =>
  toast.success(message, {
    position: "bottom-right",
    autoClose: 4000,
  });

export const useSessionService = () => {
  const { POST_SIGNUP } = useSignupApi();

  const { mutate: Signup, isLoading: busy } = useMutation({
    mutationFn: (data: ISignupRequest) => POST_SIGNUP(data),
    onSuccess: ({ data }) => {
      localStorage.setItem("key", data.key);
      notify("Signed up successfully");
    },
  });

  const Logout = () => {
    localStorage.removeItem("key");
    window.location.reload();
  };

  return { Signup, busy, Logout };
};
