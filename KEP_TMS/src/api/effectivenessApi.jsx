import { API_ENDPOINTS } from "./apiEndpoints";
import fetchFromApi from "./apiUtil";

export const createTrainingEffectivenessApi = async (data)=>{
    return await fetchFromApi("TrainingEffectiveness/CreateTrainingEffectiveness", "POST", data);
}
export const getExamByRequestIdApi = async (id)=>{
    return await fetchFromApi(`${API_ENDPOINTS.GET_EXAM_BY_REQUEST_ID}?requestId=${id}`);
}