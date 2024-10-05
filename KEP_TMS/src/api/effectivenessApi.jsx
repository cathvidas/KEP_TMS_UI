import { API_ENDPOINTS } from "./apiEndpoints";
import fetchFromApi from "./apiUtil";

export const createTrainingEffectivenessApi = async (data)=>{
    return await fetchFromApi("TrainingEffectiveness/CreateTrainingEffectiveness", "POST", data);
}
export const getEffectivenessByIdApi = async (id)=>{
    return await fetchFromApi(`TrainingEffectiveness/GetTrainingEffectivenessById?requestId=${id}`);
}
export const getAllEffectiveness = async ()=>{
    return await fetchFromApi(`TrainingEffectiveness/GetAllTrainingEffectiveness`);
}