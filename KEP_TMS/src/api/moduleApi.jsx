import { API_ENDPOINTS } from "./apiEndpoints"
import fetchFromApi from "./apiUtil"

export const createModuleApi = async (data) =>{
    return await fetchFromApi(API_ENDPOINTS.CREATE_TRAINING_MODULE, "POST", data, {'Content-Type': 'multipart/form-data'})
}
export const getModulesByRequestIdApi = async (id) =>{
    return await fetchFromApi(`${API_ENDPOINTS.GET_MODULES_BY_REQUEST_ID}?requestId=${id}`)
}