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
    if(SecondSearchValue && searchValue && thirdSearchValue, fourthSearchValue){
        return await fetchFromApi(`TrainingRequest/GetPagedTrainingRequests?pageNumber=${pageNumber}&pageSize=${pageSize}&searchValue=${searchValue}&secondSearchValue=${SecondSearchValue}&thirdSearchValue=${thirdSearchValue}&FourthSearchValue=${fourthSearchValue}`);
    }else if(SecondSearchValue && searchValue && thirdSearchValue){
        return await fetchFromApi(`TrainingRequest/GetPagedTrainingRequests?pageNumber=${pageNumber}&pageSize=${pageSize}&searchValue=${searchValue}&secondSearchValue=${SecondSearchValue}&thirdSearchValue=${thirdSearchValue}`);
    }else if(SecondSearchValue && searchValue){
        return await fetchFromApi(`TrainingRequest/GetPagedTrainingRequests?pageNumber=${pageNumber}&pageSize=${pageSize}&searchValue=${searchValue}&secondSearchValue=${SecondSearchValue}`);
    }else if(searchValue){
      return await fetchFromApi(`TrainingRequest/GetPagedTrainingRequests?pageNumber=${pageNumber}&pageSize=${pageSize}&searchValue=${searchValue}`);
    }
    return await fetchFromApi(`TrainingRequest/GetPagedTrainingRequests?pageNumber=${pageNumber}&pageSize=${pageSize}`);
}
