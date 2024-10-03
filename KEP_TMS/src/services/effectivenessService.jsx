import { createTrainingEffectivenessApi } from "../api/effectivenessApi";

const effectivenessService ={
    createTrainingEffectiveness: async (data) => {
        const response = await createTrainingEffectivenessApi(data);
        return response;
    }
}
export default effectivenessService;