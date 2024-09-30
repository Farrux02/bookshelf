import axios, { AxiosError, AxiosInstance, AxiosResponse } from "axios";
import { toast } from "react-toastify";
import CryptoJS from "crypto-js";

const notify = (message: string) =>
  toast.error(message, {
    position: "bottom-right",
    autoClose: 4000,
    closeOnClick: false,
  });

const httpRequest: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_APP_API_URL,
});

const errorHandler = (error: AxiosError) => {
  if (error?.response?.status === 401) {
    // localStorage.removeItem("key");
    // window.location.reload();
  }

  if (error?.response && error.response?.data) {
    notify(error.response.data?.message);
  }

  return Promise.reject(error.response);
};

const generateSign = (
  method: string,
  url: string,
  body: any,
  secret: string
) => {
  const bodyStr =
    body && typeof body === "object" ? JSON.stringify(body) : body;
  const signStr = method + url + (bodyStr || "") + secret;
  return CryptoJS.MD5(signStr).toString();
};

httpRequest.interceptors.request.use((config) => {
  const key = localStorage.getItem("key");
  const secret = localStorage.getItem("secret");

  if (key && secret) {
    const method = config.method?.toUpperCase() || "GET";
    const url = config.url || "";
    const body = config.data;

    const sign = generateSign(method, url, body, secret);

    config.headers.Key = key;
    config.headers.Sign = sign;
  }

  return config;
});

httpRequest.interceptors.response.use(
  (response: AxiosResponse) => response.data,
  errorHandler
);

export default httpRequest;
