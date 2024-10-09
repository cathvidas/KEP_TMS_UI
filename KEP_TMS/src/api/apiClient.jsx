import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:5030/api",
  // baseURL: "http://kep-testenvw16:2024/api",
  headers: {
    "Content-Type": "application/json",
  },
});
export default apiClient;
