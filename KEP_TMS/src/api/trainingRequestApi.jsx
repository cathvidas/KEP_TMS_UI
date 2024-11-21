import fetchFromApi from "./apiUtil";

export const getTrainingRequestApi = async (requestId)=>{
    return await fetchFromApi(`/TrainingRequest/GetTrainingRequestById?id=${requestId}`);
}
export const getAllTrainingRequestsApi = async () => {
    return await fetchFromApi("/TrainingRequest/GetAllTrainingRequests");
}
export const createTrainingRequestApi = async (trainingRequest) => {
    return await fetchFromApi("/TrainingRequest/CreateTrainingRequest", "POST", trainingRequest);
}
export const getTrainingRequestsByRequestorApi = async (id) => {
    return await fetchFromApi(`/TrainingRequest/GetRequestByRequester?badge=${id}`);
}
export const updateTrainingRequestApi = async (data)=>{
    return await fetchFromApi("/TrainingRequest/UpdateTrainingRequest", "PUT", data);
}
export const getTrainingRequestByApproverApi = async (id) =>{
    return await fetchFromApi(`Services/GetAssignedRequests?assignedTo=${id}`);
}
export const getTrainingRequestByTraineeIdApi = async (id) =>{
    return await fetchFromApi(`TrainingRequest/GetByParticipant?participantBadge=${id}`);
}
export const getPagedTrainingRequestApi = async (pageNumber, pageSize, searchValue) =>{
    return await fetchFromApi(`TrainingRequest/GetPagedTrainingRequests?pageNumber=${pageNumber}&pageSize=${pageSize}&searchValue=${searchValue}`);
}
