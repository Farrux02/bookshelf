import httpRequest from "@/plugins/axios";
import { IHTTPResponse, ISignupRequest } from "@/types/api";

export const useSignupApi = () => {
  return {
    POST_SIGNUP(data: ISignupRequest): Promise<IHTTPResponse> {
      return httpRequest.post("/signup", data);
    },
    FETCH_USER_INFO(): Promise<IHTTPResponse> {
      return httpRequest.get("/myself");
    },
  };
};
