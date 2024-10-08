import {
  createTrainingEffectivenessApi,
  getAllEffectivenessApi,
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
  getForApprovalEffectiveness : async (id) =>{
    const response = await getEffectivenessByIdApi(id);
  }
};
export default effectivenessService;