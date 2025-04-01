import axios, { AxiosRequestConfig } from "axios";
// import Cookies from "js-cookie";

const apiClient = axios.create({
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 3000,
});

apiClient.interceptors.response.use(
  (response) => {
    // console.log(response.data);
    return response.data;
  },
  (error) => {
    if (error.response && error.response.data) {
      const status = error.response.status;
      switch (status) {
        case 400:
          console.error("Bad Request: ", error.response.data);
          break;
        // case 401:
        //   console.error("Unauthorized: ", error.response.data);
        //   window.location.href = "/login";
        //   break;
        case 404:
          console.error("Not Found: ", error.response.data);
          break;
        case 500:
          {
            console.error("Server Error: ", error.response.data);
            window.location.href = "/login";
          }
          break;
        default:
          console.error("Error: ", error.response.data);
      }
      return Promise.reject(error.response.data);
    }
    if (error.request) {
      return Promise.reject(
        "Network Error: No response received from the server"
      );
    }
  }
);

apiClient.interceptors.request.use(
  (config) => {
    // const accessToken = Cookies.get("accessToken");
    // console.log("🚀 ~ accessToken:", accessToken);
    const accessToken =
      "eyJhY2Nlc3MtdG9rZW4iOiI3QmxucTJ0UThoaXhDTGpjWEd4Z2NBIiwidG9rZW4tdHlwZSI6IkJlYXJlciIsImNsaWVudCI6Ii1KbTdfZUZ6dEtMRUZydzVKWF9tb2ciLCJleHBpcnkiOiIxNzQ0MTc0MTA2IiwidWlkIjoic3VwZXJfYWRtaW5AZ21haWwuY29tIn0=";
    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export const get = <T>({
  url,
  params,
  config,
}: {
  url: string;
  params?: AxiosRequestConfig["params"];
  config?: AxiosRequestConfig;
}): Promise<T> =>
  apiClient.get(url, {
    url,
    params,
    ...config,
  });

export const post = <T>({
  url,
  data,
  config,
}: {
  url: string;
  data?: unknown;
  config?: AxiosRequestConfig;
}): Promise<T> => apiClient.post(url, data, config);

export const update = ({
  url,
  data,
  config,
}: {
  url: string;
  data?: unknown;
  config?: AxiosRequestConfig;
}) => apiClient.put(url, data, config);

export const remove = ({ url }: { url: string }) => apiClient.delete(url);
