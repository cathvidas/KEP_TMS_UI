import { API_ENDPOINTS } from "./apiEndpoints";
import fetchFromApi from "./apiUtil";

export const getTrainingRequestApi = async (requestId)=>{
    return await fetchFromApi(`${API_ENDPOINTS.GET_TRAINING_REQUEST_BY_ID}?id=${requestId}`);
}
export const getAllTrainingRequestsApi = async () => {
    return await fetchFromApi(API_ENDPOINTS.GET_TRAINING_REQUESTS);
}
export const craeteTrainingRequestApi = async (trainingRequest) => {
    return await fetchFromApi(API_ENDPOINTS.INSERT_TRAINING_REQUEST, "POST", trainingRequest);
}
export const approveTrainingRequestApi = async (formatData) => {
    return await fetchFromApi(API_ENDPOINTS.APPROVE_TRAINING_REQUEST, "POST", formatData);
}
export const updateTrainingRequestApi = async (data)=>{
    return await fetchFromApi(API_ENDPOINTS.UPDATE_TRAINING_REQUEST, "PUT", data);
}
