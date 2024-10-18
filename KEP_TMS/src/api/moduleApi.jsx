import fetchFromApi from "./apiUtil"

export const createModuleApi = async (data) =>{
    return await fetchFromApi("TrainingModule/CreateTrainingModule", "POST", data, {'Content-Type': 'multipart/form-data'})
}
export const getModulesByRequestIdApi = async (id) =>{
    return await fetchFromApi(`/TrainingModule/GetTrainingModulesByRequestId?requestId=${id}`)
}