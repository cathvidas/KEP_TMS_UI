import fetchFromApi from "./apiUtil"

export const approveTrainingFormApi = async (data) => {
    return await fetchFromApi(`Services/ApproveForm`, "POST", data)
}
export const disapproveActivityApi = async (data) => {
    return await fetchFromApi(
      `Services/DisapproveForm?transactId=${data?.transactId}&activityIn=${data?.activityIn}&disapprovedBy=${data?.disapprovedBy}&remarks=${data?.remarks}`,
      "POST"
    );
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
export const getApprovedFormsApi = async (assignedTo, activityIn) =>{
    return await fetchFromApi(`/Services/GetApprovedForms?assignedTo=${assignedTo}&activityIn=${activityIn}`);
}
export const getActivityApproversApi = async (id, activityIn) =>{
    return await fetchFromApi(`/Services/GetApprovers?TransactId=${id}&ActivityIn=${activityIn}`);
}
export const getFaciliatorRatingApi = async (requestId, facilitatorBadge) =>{
    return await fetchFromApi(`/Services/GetFacilitatorRating?requestId=${requestId}&facilitatorBadge=${facilitatorBadge}`);
}
export const rerouteApproverApi = async (data) =>{
    return await fetchFromApi(`Services/AssignApprover`, "POST", data)
}