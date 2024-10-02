import { statusCode } from "../api/constants";
import { approveTrainingRequestApi, getAllTrainingRequestsApi, getCurrentRoutingActivityApi, getTrainingRequestApi, getTrainingRequestByApproverApi, getTrainingRequestsByRequestorApi, updateTrainingRequestApi } from "../api/trainingRequestApi"
import { SessionGetEmployeeId } from "./sessions";

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
    console.log(response);
    return response;
  },
  getCurrentRoutingActivity: async (transactId, activityIn) => {
    const response = await getCurrentRoutingActivityApi(transactId, activityIn);
    return response;
  },
  approveTrainingRequest: async (data) => {
    const response = await approveTrainingRequestApi(data);
    return response;
  },
  getTrainingRequestByApprover: async (id) => {
    const response = await getTrainingRequestByApproverApi(id);
    return response;
  },
  getTrainingRequestByParticipant: async (id, role) => {
    const response = await getAllTrainingRequestsApi(id);
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
        } else if (item?.status?.id === statusCode.PUBLISHED) {
          request.push(item);
        }
      }
    });
    return request;
  },
};
export default trainingRequestService;