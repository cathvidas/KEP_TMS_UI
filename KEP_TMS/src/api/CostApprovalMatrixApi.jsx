import fetchFromApi from "./apiUtil";

export const GetCostApprovalMatrixApi = async (id)=>{
    return await fetchFromApi(`CostApprovalMatrix/GetCostApprovalMatrix?id=${id}`);
}
export const GetAllCostApprovalMatrixApi = async ()=>{
    return await fetchFromApi(`CostApprovalMatrix/GetAllCostApprovalMatrix`);
}
export const CreateCostApprovalMatrixApi = async (data)=>{
    return await fetchFromApi(`CostApprovalMatrix/CreateCostApprovalMatrix`, "POST", data);
}
export const UpdateCostApprovalMatrixApi = async (data)=>{
    return await fetchFromApi(`CostApprovalMatrix/UpdateCostApprovalMatrix`, "PUT", data);
}