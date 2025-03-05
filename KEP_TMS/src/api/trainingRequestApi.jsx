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
export const getTrainingRequestByFacilitatorIdApi = async (id) =>{
    return await fetchFromApi(`TrainingRequest/GetByFacilitator?facilitatorBadge=${id}`);
}
export const GetTrainingRequestSummaryApi = async (id) =>{
    return await fetchFromApi(`TrainingRequest/GetTrainingRequestSummary?employeeBadge=${id}`);
}
export const getPagedTrainingRequestsApi = async (pageNumber, pageSize, searchValue, SecondSearchValue, thirdSearchValue, fourthSearchValue) =>{
    let url = `TrainingRequest/GetPagedTrainingRequests?pageNumber=${pageNumber}&pageSize=${pageSize}`
    if(searchValue){
        url += `&searchValue=${searchValue}`
    }
    if(SecondSearchValue){
        url += `&secondSearchValue=${SecondSearchValue}`
    }
    if(thirdSearchValue && thirdSearchValue !== 'null'){
        url += `&thirdSearchValue=${thirdSearchValue}`
    }
    if(fourthSearchValue){
        url += `&fourthSearchValue=${fourthSearchValue}`
    }
    return await fetchFromApi(url);
}
