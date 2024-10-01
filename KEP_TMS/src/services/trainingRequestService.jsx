import { approveTrainingRequestApi, getAllTrainingRequestsApi, getCurrentRoutingActivityApi, getTrainingRequestApi, getTrainingRequestByApproverApi, getTrainingRequestsByRequestorApi, updateTrainingRequestApi } from "../api/trainingRequestApi"

const trainingRequestService = {
  getAllTrainingRequests: async () => {
    const response = await getAllTrainingRequestsApi();
    return response;
  },
  getTrainingRequest: async (id) => {
    const response = await getTrainingRequestApi(id);
    return response.data;
  },
  updateTrainingRequest: async (data) => {
    const response = await updateTrainingRequestApi(data);
    return response;
  },
  getTrainingRequestsByRequestor: async (id) => {
    const response = await getTrainingRequestsByRequestorApi(id);
    return response;
  },
  getCurrentRoutingActivity: async (transactId, activityIn) => {
    const response = await getCurrentRoutingActivityApi(transactId, activityIn);
    return response;
  },
  approveTrainingRequest: async (data) =>{
    const response = await approveTrainingRequestApi(data);
    return response;
  },
  getTrainingRequestByApprover: async (id)=>{
    const response = await getTrainingRequestByApproverApi(id);
    return response;
  }
};
export default trainingRequestService;