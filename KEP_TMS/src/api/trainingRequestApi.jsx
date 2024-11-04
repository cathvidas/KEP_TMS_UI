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
    return await fetchFromApi(`/TrainingRequest/GetRequestByRequestor?badge=${id}`);
}
export const approveTrainingRequestApi = async (data) => {
    return await fetchFromApi("/Services/ApproveRequest", "POST", data);
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
