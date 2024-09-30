import axios, { AxiosError, AxiosInstance, AxiosResponse } from "axios";
import { toast } from "react-toastify";

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
    localStorage.removeItem("key");
    window.location.reload();
  }

  if (error?.response && error.response?.data) {
    notify(error.response.data?.message);
  }

  return Promise.reject(error.response);
};

httpRequest.interceptors.request.use((config) => {
  const key = localStorage.getItem("key");
  if (key) {
    config.headers.Key = key;
    config.headers.Sign = import.meta.env.VITE_APP_SIGN_KEY;
  }
  return config;
});

httpRequest.interceptors.response.use(
  (response: AxiosResponse) => response.data,
  errorHandler
);

export default httpRequest;
