import fetchFromApi from "./apiUtil"

export const createModuleApi = async (data) =>{
    return await fetchFromApi("TrainingModule/CreateTrainingModule", "POST", data, {'Content-Type': 'multipart/form-data'})
}
export const updateModuleApi = async (data) =>{
    return await fetchFromApi("/TrainingModule/UpdateTrainingModule", "PUT", data)
}
export const getModulesByRequestIdApi = async (id) =>{
    return await fetchFromApi(`/TrainingModule/GetTrainingModulesByRequestId?requestId=${id}`)
}
export const deleteModuleApi = async (id) =>{
    return await fetchFromApi(`/TrainingModule/DeleteModule?id=${id}`, "DELETE")
}