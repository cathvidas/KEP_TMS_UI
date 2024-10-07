import {
  createTrainingEffectivenessApi,
  getEffectivenessByIdApi,
} from "../api/effectivenessApi";
const effectivenessService = {
  createTrainingEffectiveness: async (data) => {
    const response = await createTrainingEffectivenessApi(data);
    return response;
  },
  getEffectivenessById: async (id) => {
    const response = await getEffectivenessByIdApi(id);
    console.log(response)
    return response;
  },
};
export default effectivenessService;