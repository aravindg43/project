import axios from "axios";

const apiClient = axios.create({
  baseURL: process.env.NODE_ENV.includes("development")
    ? "http://localhost:3000"
    : process.env.NEXT_PUBLIC_DOTCOM,
  withCredentials: false,
  headers: {
    Accept: "application/json, text/plain, */*",
    "Content-Type": "application/json",
  },
});

// Request interceptor
apiClient.interceptors.request.use(
  function (config) {
    if (process.env.NODE_ENV.includes("development")) {
      config.method = "get";
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

// Response interceptor
apiClient.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if (error.response?.status === 401 || error.response?.status === 403) {
      if (typeof window !== "undefined") {
        window.location.href = "/";
      }
    }
    return Promise.reject(error);
  }
);

export { apiClient };