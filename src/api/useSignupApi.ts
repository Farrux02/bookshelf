import httpRequest from "@/plugins/axios";
import { IHTTPResponse, ISignupRequest } from "@/types/api";

export const useSignupApi = () => {
  const baseUrl = "/signup";

  return {
    POST_SIGNUP(data: ISignupRequest): Promise<IHTTPResponse> {
      return httpRequest.post(baseUrl, data);
    },
  };
};
