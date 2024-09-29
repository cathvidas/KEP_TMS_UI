import { API_ENDPOINTS } from "./apiEndpoints"
import fetchFromApi from "./apiUtil"

export const craeteModuleApi = async (data) =>{
    return await fetchFromApi(API_ENDPOINTS.CREATE_TRAINING_MODULE, "POST", data, {'Content-Type': 'multipart/form-data'})
}