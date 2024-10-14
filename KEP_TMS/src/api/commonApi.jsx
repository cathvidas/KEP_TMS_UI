import { API_ENDPOINTS } from "./apiEndpoints";
import fetchFromApi from "./apiUtil"

export const approveTrainingFormApi = async (data) => {
    return await fetchFromApi(`Services/ApproveReportOrEffectiveness`, "POST", data)
}
export const getAllDepartmentsApi = async()=>{
    return await fetchFromApi(API_ENDPOINTS.GET_DEPARTMENTS);
}
export const getAllRolesApi = async()=>{
    return await fetchFromApi(`Comboboxes/GetRoles`);
}
export const getAllPositionsApi = async()=>{
    return await fetchFromApi(`Comboboxes/GetPositions`);
}
export const getAllEmployeeTypesApi = async()=>{
    return await fetchFromApi(`Comboboxes/GetEmployeeTypes`);
}