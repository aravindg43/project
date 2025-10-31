import axios from "axios";
import type { AxiosInstance, InternalAxiosRequestConfig, AxiosResponse } from "axios";

// We'll use a function to get the store to avoid circular dependencies
let getSessionToken: () => string = () => '';
let setSessionToken: (token: string) => void = () => {};

export const initializeApiClient = (
  getToken: () => string,
  setToken: (token: string) => void
) => {
  getSessionToken = getToken;
  setSessionToken = setToken;
};

const apiClient: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BUILD_ENV === 'dev'
    ? process.env.NEXT_PUBLIC_DOTCOM
    : process.env.NEXT_PUBLIC_DOTCOM + '/DotComServices/search/',
  withCredentials: false,
  headers: {
    Accept: "application/json, text/plain, */*",
    "Content-Type": "application/json"
  }
});

// Add a request interceptor
apiClient.interceptors.request.use(
  function(config: InternalAxiosRequestConfig): InternalAxiosRequestConfig {
    // Set the SESSION_TOKEN if we have one
    if (config.headers !== undefined) {
      const sessionToken = getSessionToken();
      if (!config.headers.SESSION_TOKEN && sessionToken) {
        config.headers.SESSION_TOKEN = sessionToken;
      }
    }
    return config;
  },
  function(error: unknown) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
apiClient.interceptors.response.use(
  function(response: AxiosResponse) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    if (response.headers.session_token) {
      setSessionToken(response.headers.session_token);
    }

    return response.data;
  },
  function(error: unknown) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger

    //Handle these here and redirect back to main page for login
    if (
      error &&
      typeof error === 'object' &&
      'response' in error &&
      error.response &&
      typeof error.response === 'object' &&
      'status' in error.response && (
      error.response.status == "400" ||
      error.response.status == "401" ||
      error.response.status == "403")
    ) {
      if (typeof window !== 'undefined') {
        window.location.href = "/BlueLand/home.jsp";
      }
    }

    return Promise.reject(error);
  }
);

export { apiClient };
