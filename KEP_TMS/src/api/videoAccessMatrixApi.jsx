import fetchFromApi from "./apiUtil";

export const GetVideoAccessMatrixApi = async (id)=>{
    return await fetchFromApi(`VideoAccessMatrix/GetVideoAccessMatrix?id=${id}`);
}
export const GetAllVideoAccessMatrixApi = async ()=>{
    return await fetchFromApi(`VideoAccessMatrix/GetAllVideoAccessMatrices`);
}
export const CreateVideoAccessMatrixApi = async (data)=>{
    return await fetchFromApi(`VideoAccessMatrix/CreateVideoAccess`, "POST", data);
}
export const UpdateVideoAccessMatrixApi = async (data)=>{
    return await fetchFromApi(`VideoAccessMatrix/UpdateVideoAccess`, "PUT", data);
}
export const DeleteVideoAccessMatrixApi = async (data)=>{
    return await fetchFromApi(`VideoAccessMatrix/DeleteVideoAccess`, "DELETE", data);
}