import axios from "axios";
import { ApiConstant } from "./constants";

const apiClient = axios.create({
  baseURL: ApiConstant.BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});
export default apiClient;