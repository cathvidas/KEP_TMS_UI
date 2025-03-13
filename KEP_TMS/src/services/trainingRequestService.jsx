import { approveTrainingFormApi, disapproveActivityApi } from "../api/commonApi";
import {createTrainingRequestApi, getPagedTrainingRequestsApi, getTrainingRequestApi, getTrainingRequestByApproverApi, getTrainingRequestByFacilitatorIdApi, getTrainingRequestByTraineeIdApi, getTrainingRequestsByRequestorApi, GetTrainingRequestSummaryApi, updateTrainingRequestApi } from "../api/trainingRequestApi"

const trainingRequestService = {
  approveTrainingRequest: async (data) => {
    const response = await approveTrainingFormApi(data);
    return response;
  },
  disapproveTrainingRequest: async (data) => {
    const response = await disapproveActivityApi(data);
    return response;
  },
  getTrainingRequest: async (id) => {
    const response = id && await getTrainingRequestApi(id) ;
    return response?.status === 1 ? response?.data : {};
  },
  updateTrainingRequest: async (data) => {
    const response = await updateTrainingRequestApi(data);
    if(response.status !== 1){
      throw new Error(response.message);
    }
    return response;
  },
  createTrainingRequest: async (data) => {
    const response = await createTrainingRequestApi(data);
    if(response.status !== 1){
      throw new Error(response.message);
    }
    return response;
  },
  getTrainingRequestsByRequestor: async (id) => {
    const response = id && await getTrainingRequestsByRequestorApi(id);
    return response?.status === 1 ? response?.data : [];
  },
  getTrainingRequestByApprover: async (id) => {
    const response = id && await getTrainingRequestByApproverApi(id);
    return response;
  },
  getTrainingRequestByTraineeId: async (id) => {
    const response = id && await getTrainingRequestByTraineeIdApi(id);
    return response?.status === 1 ? response?.data : [];
  },
  getTrainingRequestByFacilitatorId: async (id) => {
    const response = id && await getTrainingRequestByFacilitatorIdApi(id);
    return response?.status === 1 ? response?.data : [];
  },
  getPagedTrainingRequest: async (pageNumber, pageSize, searchValue, secondSearchValue, thirdSerachValue, fourthSearchValue) => {
    const response =  await getPagedTrainingRequestsApi(pageNumber, pageSize, searchValue, secondSearchValue, thirdSerachValue, fourthSearchValue);
    return response;
  },
  getTrainingRequestSummary: async (id) => {
    const response =  await GetTrainingRequestSummaryApi(id);
    if(response.status !== 1){
      throw new Error(response.message);
    }
    return response?.data;
  },
};
export default trainingRequestService;