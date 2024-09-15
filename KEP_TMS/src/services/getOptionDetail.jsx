import { API_ENDPOINTS } from "../api/apiEndpoints";
import fetchFromApi from "../api/apiUtils";

const getProgramDetail = async (id) => {
  const response = await fetchFromApi(API_ENDPOINTS.)
  const data = await response.json();
  return data;
}