import axios from "axios";

const instance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
});

instance.interceptors.request.use(
  (config) => {
    if (typeof window !== "undefined" && window.localStorage?.getItem("token")) {
      config.headers.Authorization = "Bearer " + window.localStorage.getItem("token");
    }
    return config;
  },
  (error) => Promise.reject(error),
);

instance.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error),
);

export default instance;
