import { approveTrainingFormApi, disapproveActivityApi } from "../api/commonApi";
import {createTrainingRequestApi, getPagedTrainingRequestsApi, getTrainingRequestApi, getTrainingRequestByApproverApi, getTrainingRequestsByRequestorApi, GetTrainingRequestSummaryApi, GetTrainingsAttendedApi, GetTrainingsFacilitatedApi, updateTrainingRequestApi } from "../api/trainingRequestApi"

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
    return response?.status === 1 ? response?.data : null;
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
  getTrainingsAttended: async (id) => {
    const response = id && await GetTrainingsAttendedApi(id);
    return response?.status === 1 ? response?.data : [];
  },
  getTrainingsFacilitated: async (id) => {
    const response = id && await GetTrainingsFacilitatedApi(id);
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