import { ActivityType } from "../api/constants";
import {
  createTrainingEffectivenessApi,
  getAllEffectivenessApi,
  getApproverAssignedEffectivenessApi,
  getEffectivenessByIdApi,
} from "../api/effectivenessApi";
const effectivenessService = {
  createTrainingEffectiveness: async (data) => {
    const response = await createTrainingEffectivenessApi(data);
    return response;
  },
  getEffectivenessById: async (id) => {
    const response = await getEffectivenessByIdApi(id);
    return response;
  },
  getAllEffectiveness: async()=>{
    const response = await getAllEffectivenessApi();
    return response;
  },
  getApproverAssignedEffectiveness : async (id) =>{
    const response = await getApproverAssignedEffectivenessApi(id);
    const filter = response?.filter(item => item?.routingActivity?.activityType === ActivityType.EFFECTIVENESS)
    return filter;
  }
};
export default effectivenessService;