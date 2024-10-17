import { approveTrainingFormApi } from "../api/commonApi";
import { ActivityType } from "../api/constants";
import {
  createTrainingEffectivenessApi,
  getAllEffectivenessApi,
  getApproverAssignedEffectivenessApi,
  getEffectivenessByIdApi,
} from "../api/effectivenessApi";
import { getCurrentRoutingActivity } from "../api/trainingServices";
import commonService from "./commonService";
import userMapping from "./DataMapping/userMapping";
import userService from "./userService";
const effectivenessService = {
  createTrainingEffectiveness: async (data) => {
    const response = await createTrainingEffectivenessApi(data);
    if(response.status !== 1){
      throw new Error(response.message);
    }
    return response?.data;
  },
  getEffectivenessById: async (id) => {
    const response = await getEffectivenessByIdApi(id);
    if(response?.status === 1){
      const routings = await commonService.getRoutingActivityWithAuditTrail(response?.data?.id, ActivityType.EFFECTIVENESS);
      const routingWithDetail = await userMapping.mapUserIdList(routings, "assignedTo", [{label: "assignedName",value:"fullname"}]);
      const currentRouting = await getCurrentRoutingActivity(response?.data?.id, ActivityType.EFFECTIVENESS);
      const approverDetail =await userService.getUserById(currentRouting?.assignedTo)
      const auditTrail = await commonService.getAuditTrail(response?.data?.id, ActivityType.EFFECTIVENESS)
      return {...response?.data, routings: routingWithDetail, currentRouting: {...currentRouting, assignedDetail: approverDetail}, auditTrail};
    }
    return {};
  },
  getAllEffectiveness: async () => {
    const response = await getAllEffectivenessApi();
    return response.status === 1 ? response?.data : [];
  },
  getApproverAssignedEffectiveness: async (id) => {
    const response = await getApproverAssignedEffectivenessApi(id);
    response?.map( async item =>{
      const currentRouting = item?.routingActivity;
      const approverDetail =await userService.getUserById(currentRouting?.assignedTo);
      item.routingActivity = {...currentRouting, assignedDetail: approverDetail};
    })
    return response;
  },
  approveTrainingEffectiveness: async (data)=>{
    const response = await approveTrainingFormApi(data);
    if(response.status !== 1){
      throw new Error(response.message);
    }
    return response?.data;
  }
};
export default effectivenessService;
