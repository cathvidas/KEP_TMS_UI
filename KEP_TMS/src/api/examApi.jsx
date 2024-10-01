import { API_ENDPOINTS } from "./apiEndpoints";
import fetchFromApi from "./apiUtil";

export const createExamApi = async (data)=>{
    return await fetchFromApi(API_ENDPOINTS.CREATE_TRAINING_EXAM, "POST", data);
}
export const getExamByRequestIdApi = async (id)=>{
    return await fetchFromApi(`${API_ENDPOINTS.GET_EXAM_BY_REQUEST_ID}?requestId=${id}`);
}