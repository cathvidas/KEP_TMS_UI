import { API_ENDPOINTS } from "./apiEndpoints";
import fetchFromApi from "./apiUtil";

export const getTrainingProviderById=async(providerId)=>{
    return await fetchFromApi(`${API_ENDPOINTS.GET_TRAINING_PROVIDER_BY_ID}?id=${providerId}`)
}
export const getAllTrainingProviders=async()=>{
    return await fetchFromApi(API_ENDPOINTS.GET_TRAINING_PROVIDERS);
}
