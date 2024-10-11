import { approveTrainingFormApi } from "../api/commonApi";
import {
  createTrainingEffectivenessApi,
  getAllEffectivenessApi,
  getApproverAssignedEffectivenessApi,
  getEffectivenessByIdApi,
} from "../api/effectivenessApi";
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
    return response.status === 1 ? response?.data : {};
  },
  getAllEffectiveness: async () => {
    const response = await getAllEffectivenessApi();
    return response.status === 1 ? response?.data : [];
  },
  getApproverAssignedEffectiveness: async (id) => {
    const response = await getApproverAssignedEffectivenessApi(id);
    return response.status === 1 ? response?.data : [];
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
