import { approveTrainingFormApi, sendEmailApi } from "../api/commonApi";
import { ActivityType } from "../api/constants";
import {
  createTrainingEffectivenessApi,
  getAllEffectivenessApi,
  getApproverAssignedEffectivenessApi,
  getEffectivenessByIdApi,
  updateEffectivenessApi,
  updateProjectPerformanceEvaluationApi,
} from "../api/effectivenessApi";
import commonService from "./commonService";
const effectivenessService = {
  createTrainingEffectiveness: async (data) => {
    const response = await createTrainingEffectivenessApi(data);
    if(response.status !== 1){
      throw new Error(response.message);
    }
    return response;
  },
  updateTrainingEffectiveness: async (data) => {
    const response = await updateEffectivenessApi(data);
    if(response.status !== 1){
      throw new Error(response.message);
    }
    return response;
  },
  updateProjectPerformanceEvaluation: async (data) => {
    const response = await updateProjectPerformanceEvaluationApi(data);
    if(response.status !== 1){
      throw new Error(response.message);
    }
    return response?.data;
  },
  getEffectivenessById: async (id) => {
    const response = await getEffectivenessByIdApi(id);
    if(response?.status === 1){
      const routings = await commonService.getRoutingActivityWithAuditTrail(response?.data?.id, ActivityType.EFFECTIVENESS);
      const currentRouting = await commonService.getCurrentRouting(response?.data?.id, ActivityType.EFFECTIVENESS);
      const auditTrail = await commonService.getAuditTrail(response?.data?.id, ActivityType.EFFECTIVENESS);
      return {...response?.data, routings, currentRouting, auditTrail};
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
  approveTrainingEffectiveness: async (formData)=>{
    const response = await approveTrainingFormApi(formData);
    if(response.status !== 1){
      throw new Error(response.message);
    }
    return response?.data;
  },
  sendEmail: async () => {
    const response = await sendEmailApi();
    if(response.status !== 1){
      throw new Error(response.message);
    }
    return response?.data;
  }
};
export default effectivenessService;
