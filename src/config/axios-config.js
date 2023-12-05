import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://127.0.0.1:8000/api/v1", // Set your API base URL here
  headers: {
    "Content-Type": "application/json",
    // You can set other default headers here
  },
});

// Set up an interceptor to add the bearer token to each request
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); // Replace with your actual bearer token
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default apiClient;
