import { approveTrainingFormApi } from "../api/commonApi";
import { ActivityType } from "../api/constants";
import {
  createTrainingReportApi,
  getAllTrainingReportsApi,
  getApproverAssignedReportsApi,
  getTrainingReportByIdApi,
  updateTrainingReportApi,
} from "../api/trainingReportApi";
import routingService from "./common/routingService";
import commonService from "./commonService";
import userService from "./userService";

const trainingReportService = {
  createTrainingReport: async (data) => {
    const response = await createTrainingReportApi(data);
    if(response.status !== 1){
      throw new Error(response.message);
    }
    return response?.data;
  },
  updateTrainingReport: async (data) => {
    const response = await updateTrainingReportApi(data);
    if(response.status !== 1){
      throw new Error(response.message);
    }
    return response?.data;
  },
  getAllTrainingReports: async () => {
    const response = await getAllTrainingReportsApi();
    return response?.status === 1? response?.data: [];
  },
  getTrainingReportById: async (id) => {
    const response = await getTrainingReportByIdApi(id);
    if(response?.status === 1){
      const approvers = await commonService.getActivityApprovers(response?.data?.createdBy, ActivityType.REPORT)
      const routings = await commonService.getRoutingActivityWithAuditTrail(response?.data?.id, ActivityType.REPORT)
      const currentRouting = await routingService.getCurrentApprover(approvers, routings);
      if(!currentRouting?.assignedDetail){
        currentRouting.assignedDetail= await userService.getUserById(currentRouting?.assignedTo);
      }
      const auditTrail = await commonService.getAuditTrail(response?.data?.id, ActivityType.REPORT);
      return {...response?.data, routings, currentRouting, auditTrail, approvers};
    }
    return {};
  },
  getApproverAssignedReports: async (id) => {
    const response = await getApproverAssignedReportsApi(id);
    response?.map( async item =>{
      const currentRouting = item?.routingActivity;
      const approverDetail =await userService.getUserById(currentRouting?.assignedTo);
      item.routingActivity = {...currentRouting, assignedDetail: approverDetail};
    })
    return response;
  },
  approveTrainingReport: async (data)=>{
    const response = await approveTrainingFormApi(data);
    if(response.status !== 1){
      throw new Error(response.message);
    }
    return response?.data;
  }
};
export default trainingReportService;
