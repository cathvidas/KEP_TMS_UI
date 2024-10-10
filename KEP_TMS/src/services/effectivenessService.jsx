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
    return response;
  },
  getEffectivenessById: async (id) => {
    const response = await getEffectivenessByIdApi(id);
    if (response?.status === 1) {
      return response?.data;
    } else {
      return {};
    }
  },
  getAllEffectiveness: async () => {
    const response = await getAllEffectivenessApi();
    return response;
  },
  getApproverAssignedEffectiveness: async (id) => {
    const response = await getApproverAssignedEffectivenessApi(id);
    return response;
  },
  approveTrainingEffectiveness: async (data)=>{
    console.log(data)
    const response = await approveTrainingFormApi(data);
    if(response.status !== 1){
      throw new Error('Failed to approve effectiveness');
    }
    return response;
  }
};
export default effectivenessService;
