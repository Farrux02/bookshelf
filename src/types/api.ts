export interface IHTTPResponse {
  data: Record<string, string>;
  isOk: boolean;
  message: string;
}

export interface ISignupRequest {
  name: string;
  email: string;
  key: string;
  secret: string;
}
