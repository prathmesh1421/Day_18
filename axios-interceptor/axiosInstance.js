import axios from "axios";

export const apiLogs = [];

const axiosInstance = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com"
});

// 🔹 Request Interceptor
axiosInstance.interceptors.request.use((config) => {
  apiLogs.push({
    type: "Request",
    url: config.url,
    method: config.method,
    time: new Date().toLocaleTimeString()
  });
  return config;
});

// 🔹 Response Interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    apiLogs.push({
      type: "Response",
      url: response.config.url,
      status: response.status,
      time: new Date().toLocaleTimeString()
    });
    return response;
  },
  (error) => {
    apiLogs.push({
      type: "Error",
      url: error.config?.url,
      status: error.response?.status || "Failed",
      time: new Date().toLocaleTimeString()
    });
    return Promise.reject(error);
  }
);

export default axiosInstance;
