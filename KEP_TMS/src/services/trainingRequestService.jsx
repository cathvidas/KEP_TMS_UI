import { getCurrentRoutingActivityApi } from "../api/commonApi";
import { statusCode } from "../api/constants";
import { approveTrainingRequestApi, createTrainingRequestApi, getAllTrainingRequestsApi, getTrainingRequestApi, getTrainingRequestByApproverApi, getTrainingRequestByTraineeIdApi, getTrainingRequestsByRequestorApi, updateTrainingRequestApi } from "../api/trainingRequestApi"

const trainingRequestService = {
  approveTrainingRequest: async (data) => {
    const response = await approveTrainingRequestApi(data);
    return response;
  },
  getAllTrainingRequests: async () => {
    const response = await getAllTrainingRequestsApi();
    return response?.status === 1 ? response?.data : [];
  },
  getTrainingRequest: async (id) => {
    const response = id && await getTrainingRequestApi(id) ;
    return response?.status === 1 ? response?.data : [];
  },
  updateTrainingRequest: async (data) => {
    const response = await updateTrainingRequestApi(data);
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
    const response = await getTrainingRequestsByRequestorApi(id);
    return response?.status === 1 ? response?.data : [];
  },
  getCurrentRoutingActivity: async (transactId, activityIn) => {
    const response = transactId && await getCurrentRoutingActivityApi(transactId, activityIn);
    return response;
  },
  getTrainingRequestByApprover: async (id) => {
    const response = await getTrainingRequestByApproverApi(id);
    return response;
  },
  getTrainingRequestByTraineeId: async (id) => {
    const response = await getTrainingRequestByTraineeIdApi(id);
    return response?.status === 1 ? response?.data : [];
  },
  getTrainingRequestByParticipant: async (id, role) => {
    const response = await getAllTrainingRequestsApi(id);
    if (response.status !== 1) {
      return [];
    }
    let request = [];
    response?.data.forEach((item) => {
      let isParticipant = false;
      if (role === "trainer") {
        item?.trainingFacilitators?.map((x) => {
          if (x?.facilitatorBadge === id) {
            isParticipant = true;
          }
        });
      } else {
        item?.trainingParticipants?.map((x) => {
          if (x?.employeeBadge === id) {
            isParticipant = true;
          }
        });
      }
      if (isParticipant) {
        if (role === "trainer" && item?.status?.id === statusCode.APPROVED) {
          request.push(item);
        } else {
          request.push(item);
        }
      }
    });
    return request;
  },
};
export default trainingRequestService;