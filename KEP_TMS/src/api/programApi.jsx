import { API_ENDPOINTS } from "./apiEndpoints"
import fetchFromApi from "./apiUtil";

export const getAllProgramsApi = async () => {
    return await fetchFromApi(API_ENDPOINTS.GET__PROGRAMS);
}
export const getProgramApi = async (programId) => {
    return await fetchFromApi(`${API_ENDPOINTS.GET__PROGRAM_BY_ID}?id=${programId}`);
}
export const createProgramApi = async (data) =>{
    return await fetchFromApi(API_ENDPOINTS.INSERT__PROGRAM, "POST", data);
}
export const deleteProgramApi = async (id) =>{
    return await fetchFromApi(`${API_ENDPOINTS.DELETE__PROGRAM}?id=${id}`, "DELETE");
}
export const updateProgramApi = async (data) =>{
    return await fetchFromApi(API_ENDPOINTS.UPDATE__PROGRAM, "PUT", data);
}
