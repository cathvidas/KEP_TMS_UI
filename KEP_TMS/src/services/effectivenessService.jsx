import { approveTrainingFormApi } from "../api/commonApi";
import { ActivityType } from "../api/constants";
import {
  createTrainingEffectivenessApi,
  getAllEffectivenessApi,
  getApproverAssignedEffectivenessApi,
  getEffectivenessByIdApi,
  getPagedEffectivenessApi,
  updateEffectivenessApi,
  updateProjectPerformanceEvaluationApi,
} from "../api/effectivenessApi";
import routingService from "./common/routingService";
import commonService from "./commonService";
import trainingRequestService from "./trainingRequestService";
import userService from "./userService";
const effectivenessService = {
  createTrainingEffectiveness: async (data) => {
    const response = await createTrainingEffectivenessApi(data);
    if (response.status !== 1) {
      throw new Error(response.message);
    }
    return response;
  },
  updateTrainingEffectiveness: async (data) => {
    const response = await updateEffectivenessApi(data);
    if (response.status !== 1) {
      throw new Error(response.message);
    }
    return response;
  },
  updateProjectPerformanceEvaluation: async (data) => {
    const response = await updateProjectPerformanceEvaluationApi(data);
    if (response.status !== 1) {
      throw new Error(response.message);
    }
    return response?.data;
  },
  getEffectivenessById: async (id) => {
    const response = await getEffectivenessByIdApi(id);
    if (response?.status === 1) {
      const approvers = await commonService.getActivityApprovers(
        response?.data?.createdBy,
        ActivityType.EFFECTIVENESS
      );
      const routings = await commonService.getRoutingActivityWithAuditTrail(
        response?.data?.id,
        ActivityType.EFFECTIVENESS
      );
      const currentRouting = await routingService.getCurrentApprover(
        approvers,
        routings
      );
      if (!currentRouting?.assignedDetail) {
        currentRouting.assignedDetail = await userService.getUserById(
          currentRouting?.assignedTo
        );
      }
      const auditTrail = await commonService.getAuditTrail(
        response?.data?.id,
        ActivityType.EFFECTIVENESS
      );
      return {
        ...response?.data,
        routings,
        currentRouting,
        auditTrail,
        approvers,
      };
    }
    return {};
  },
  getAllEffectiveness: async () => {
    const response = await getAllEffectivenessApi();
    return response.status === 1 ? response?.data : [];
  },
  getApproverAssignedEffectiveness: async (id) => {
    const response = await getApproverAssignedEffectivenessApi(id);
    return response;
  },
  getEvaluatorAssignedEffectiveness: async (id) => {
    const response = await getApproverAssignedEffectivenessApi(id);
    response?.map(async item=>{
      item.requestData = await trainingRequestService.getTrainingRequest(item?.trainingEffectiveness?.trainingRequestId)
    })
    return response;
  },
  approveTrainingEffectiveness: async (formData) => {
    const response = await approveTrainingFormApi(formData);
    if (response.status !== 1) {
      throw new Error(response.message);
    }
    return response?.data;
  },
  getPagedEffectiveness: async (pageNumber, pageSize, searhValue) => {
    const response = await getPagedEffectivenessApi(
      pageNumber,
      pageSize,
      searhValue
    );
    return response;
  },
};
export default effectivenessService;
