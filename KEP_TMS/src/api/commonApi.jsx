import fetchFromApi from "./apiUtil"

export const approveTrainingFormApi = async (data) => {
    return await fetchFromApi(`Services/ApproveReportOrEffectiveness`, "POST", data)
}
export const getAllDepartmentsApi = async()=>{
    return await fetchFromApi("Comboboxes/GetDepartments");
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
export const getAuditTrailApi =async(transactId, activityIn)=>{
    return await fetchFromApi(`/Services/GetAuditTrail?transactId=${transactId}&activityIn=${activityIn}`);
}
export const getRoutingActivityWithAuditTrailApi = async(transactId, activityIn)=>{
    return await fetchFromApi(`/Services/GetRoutingActivityWithAuditTrail?transactId=${transactId}&activityIn=${activityIn}`);
}
export const getCurrentRoutingActivityApi = async (transactId, activityIn) =>{
    return await fetchFromApi(`/Services/routing?transactId=${transactId}&activityIn=${activityIn}`);
}
