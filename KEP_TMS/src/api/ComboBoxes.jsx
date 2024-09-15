import { API_ENDPOINTS } from "./apiEndpoints"
import fetchFromApi from "./apiUtils"

export const getAllDepartments = async()=>{
    return await fetchFromApi(API_ENDPOINTS.GET_DEPARTMENTS);
}